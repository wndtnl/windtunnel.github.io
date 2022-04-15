# Prewarm Agent Image

- [Introduction](/tutorials/prewarm_image.md?id=introduction)
- [Prerequisites](/tutorials/prewarm_image.md?id=prerequisites)
- [Build Files](/tutorials/prewarm_image.md?id=build-files)
    - [Dockerfile](/tutorials/prewarm_image.md?id=dockerfile)
    - [Prewarm Agent Script](/tutorials/prewarm_image.md?id=prewarm-agent-script)
    - [Run Agent Script](/tutorials/prewarm_image.md?id=run-agent-script)
- [Image Build](/tutorials/prewarm_image.md?id=image-build)
- [Result](/tutorials/prewarm_image.md?id=result)

## Introduction

When a (remote) Bamboo agent loads, it first synchronizes its libraries with the Bamboo server. The synchronization compares
the existence and version of the local libraries with the list of required agent libraries as published by the server.
When a library is missing or does not match, it is downloaded from the server to the agent installation directory.
Only when all libraries are aligned between server and agent, the agent is actually booted.
This process ensures agents are upgraded (and downgraded) automatically, and stay compatible, whenever the version of the server changes.

Because there are a few hundred agent libraries, accounting for at least 150MB of data, the initial load sequence of an
agent can take some time and is largely determined by this process of synchronization. In order to speed up the initial agent boot time
a technique known as *agent prewarming* can be used. The idea is to execute the initial load of libraries in advance as part of building
the agent Docker image. As such, the (majority of) libraries are distributed with the agent image and no longer need to be downloaded from the server.

> It is important to understand the prewarming of an agent image is specific to a particular Bamboo server version,
> as the list of agent libraries and library versions will be specific to the Bamboo server version used.
> The process of prewarming needs to be repeated for every Bamboo server version supported.

In the context of this plugin, prewarming agent images is less of a concern because the plugin controlled agents keep a stable identity and their home folder is persisted
even between start/stop cycles of the instance. However, the process is discussed here because it can be a real time saver during experimentation where instances are
frequently created and destroyed.

## Prerequisites

We assume a running Bamboo server, accessible from inside the container(s) used during the image build process.  When
the image build and the Bamboo server are co-located, the server can be reached on the Docker host address (172.17.0.1 or host.docker.internal, depending
on your platform).

## Build Files

### Dockerfile

We start by creating a Dockerfile which extends the Atlassian provided [agent base image](https://hub.docker.com/r/atlassian/bamboo-agent-base).
The Dockerfile accepts the location of the Bamboo server as a (build) argument, which is set as the BAMBOO_SERVER variable.

Next, the *prewarm-agent.sh* script is copied in and executed, and finally we overwrite the existing *runAgent.sh* script (from the base image)
with a slightly modified version. Both scripts are detailed in the following sections.

```
FROM atlassian/bamboo-agent-base:6.8.0

ARG BAMBOO_SERVER

# Pre-warm the Agent
ENV BAMBOO_PREWARM_DIR=${BAMBOO_USER_HOME}/prewarm

COPY --chown=bamboo:bamboo prewarm-agent.sh prewarm-agent.sh
RUN ./prewarm-agent.sh

RUN rm -f ./prewarm-agent.log
RUN rm -f ./prewarm-agent.sh

# Overwrite runAgent
COPY --chown=bamboo:bamboo runAgent.sh runAgent.sh
```

### Prewarm Agent Script

In the same folder as the Dockerfile, we create the *prewarm-agent.sh* script with the following
contents:

```
#!/bin/sh
set -eufx
if [ -n "${BASH_VERSION:+x}" -o -n "${ZSH_VERSION:+x}" ]; then
  set -o pipefail
fi

# Download
set +e
java -Dbamboo.home="${BAMBOO_PREWARM_DIR}" -jar "${AGENT_JAR}" "${BAMBOO_SERVER}/agentServer" | tee prewarm-agent.log | while read LOGLINE
do
  if echo "${LOGLINE}" | grep -q 'Registering agent on the server'; then
    pkill -P $$ java
  fi
done
set -e

# Cleanup
rm -f "${BAMBOO_PREWARM_DIR}/bamboo-agent.cfg.xml"
rm -f "${BAMBOO_PREWARM_DIR}/atlassian-bamboo-agent.log"
rm -f "${BAMBOO_PREWARM_DIR}/installer.properties"
rm -rf "${BAMBOO_PREWARM_DIR}/bin/"
rm -rf "${BAMBOO_PREWARM_DIR}/conf/"
rm -rf "${BAMBOO_PREWARM_DIR}/caches/"
rm -rf "${BAMBOO_PREWARM_DIR}/lib/"
rm -rf "${BAMBOO_PREWARM_DIR}/logs/"
rm -rf "${BAMBOO_PREWARM_DIR}/plugins/user-installed"
```

This script will perform the following:

- Trigger the installation of a Bamboo agent in the BAMBOO_PREWARM_DIR against the provided Bamboo server.
The BAMBOO_PREWARM_DIR (/home/bamboo/prewarm) is an isolated directory in the Bamboo user home folder (/home/bamboo) specified by the Atlassian agent base image.

- Wait for the *Registering agent on the server* log line to appear. This line flags the end of the synchronization process, and the download of all agent libraries.
The agent installation can be aborted at this point.

- Cleanup any files and folders in the BAMBOO_PREWARM_DIR which were generated as part of the regular installation process but are not libraries.
To make the image a bit more generic, we also delete the user installed / plugin libraries (but this line can be omitted if desired).

As a result of executing this script, the */home/bamboo/prewarm* folder will contain (all but the user provided) agent libraries in the */classpath*,
*/framework-bundles* and */plugins/system-provided* child folders.

### Run Agent Script

Next, we create the *runAgent.sh* script in the same folder holding:

```
#!/bin/bash
set -euo pipefail

export LC_ALL=C.UTF-8
export LANG=C.UTF-8
export LANGUAGE=C.UTF-8

if [ -z ${1+x} ]; then
    echo "Please run the Docker image with Bamboo URL as the first argument"
    exit 1
fi

if [ -d "$BAMBOO_PREWARM_DIR" ]; then
  if [ -d "$BAMBOO_AGENT_HOME/classpath" ]; then
    echo "Directory $BAMBOO_AGENT_HOME/classpath exists, skipping prewarm copy"
  else
    echo "Directory $BAMBOO_AGENT_HOME/classpath does not exist, executing prewarm copy"
    cp -R $BAMBOO_PREWARM_DIR/* $BAMBOO_AGENT_HOME
  fi
fi

if [ ! -f ${BAMBOO_CAPABILITIES} ]; then
    mkdir -p ${BAMBOO_AGENT_HOME}/bin
    cp ${INIT_BAMBOO_CAPABILITIES} ${BAMBOO_CAPABILITIES}
fi

if [ -z ${SECURITY_TOKEN+x} ]; then
    exec java ${VM_OPTS:-} -Dbamboo.home="${BAMBOO_AGENT_HOME}" -jar "${AGENT_JAR}" "${1}/agentServer/"
else
    exec java ${VM_OPTS:-} -Dbamboo.home="${BAMBOO_AGENT_HOME}" -jar "${AGENT_JAR}" "${1}/agentServer/" -t "${SECURITY_TOKEN}"
fi
```

This script will eventually launch the agent JAR, but the important addition here is the BAMBOO_PREWARM_DIR block.
In this block it is checked if the */classpath* folder already exists in the agent installation directory (below /home/bamboo//bamboo-agent-home).
If this folder does not exist, the agent was not booted before. When this condition holds, the contents of the BAMBOO_PREWARM_DIR
are copied into the installation directory. When the agent subsequently check its local libraries against the server,
it will notice most (if not all) are already present.

## Image Build

Once the three files are in place, we can trigger the image build process as follows:

```
$ docker build \
    --progress=plain \
    --no-cache \
    --build-arg BAMBOO_SERVER=http://host.docker.internal:6990/bamboo \
    -t bamboo-agent-standalone:6.8.0 .
```

This will result in the local, prewarmed image *bamboo-agent-standalone:6.8.0*. We can subsequently
tag and push this image to a remote repository:

```
$ docker tag bamboo-agent-standalone:6.8.0 wndtnl/bamboo-agent-standalone:6.8.0
$ docker push wndtnl/bamboo-agent-standalone:6.8.0
```

These commands make the image available on the [WindTunnel Dockerhub account](https://hub.docker.com/u/wndtnl).
You are free to use this pre-built image, or to adjust the commands and distribute the image to your own repository.

## Result

When using a prewarmed agent image, the agent log output should look similar at initial load:

```
...
INFO Syncing /home/bamboo/bamboo-agent-home with http://company.com/bamboo/agentServer/bootstrap/classpath/manifest
INFO Server publishes 363 files, we need to download 1
INFO Downloaded: classpath/bamboo-additional-config.jar 4846 bytes
INFO Collection classpath downloaded
...
```

In this case, only a single library is flagged for download: a user-installed plugin which we excluded from the *prewarm-agent.sh* script above.
By agent image prewarming, we prevented the download of 362 files accounting for over 170MB.
