# FAQ

# How are cluster and image credentials stored?

The cluster and image credentials are securely stored in the Bamboo database using the system-wide encryption facilities
offered by Bamboo since v6.0.0. The credentials are only decrypted in memory during interactions with the cluster API server.

For additional information, please refer to the Bamboo article at https://confluence.atlassian.com/bamboo/system-wide-encryption-873930114.html.

# How to ensure secure agent connections?

When using the Kubernetes for Bamboo plugin, we advice using at least [secure token verification](https://confluence.atlassian.com/bamboo/agent-authentication-289277196.html#Agentauthentication-SecuritytokenverificationSecuritytokenverification).
When this feature is enabled, the plugin will automatically add the *SECURITY_TOKEN* environment variable to the instance agent container spec with the correct secure token value.
This environment value is picked up by the default agent run script, and used to communicate with the Bamboo server. This feature should work transparently.

If [agent authentication](https://confluence.atlassian.com/bamboo/agent-authentication-289277196.html) is desired (or required), the following needs to be taken into account:

- The plugin will automatically approve all instance agents connecting from a 'localhost' address (*127.0.0.1* for IPv4 and *::1* for IPv6).
- Instance agents connecting form a non-localhost address will need to be manually approved at least once.
    - If the agent keeps the same IP-address, even between start/stop cycles of the corresponding instance, nothing else needs to be done.
    - In the more likely scenario where the pod hosting the agent is assigned different IP-addresses between instance start/stop cycles, the allowed IP-addresses can be whitelisted to avoid manual approval each time.
    This can be done from the Agents > Remote Agents > Agent Authentication tab in the administration environment.
    Use the *Edit IP address* button. In highly dynamic or complex network environments, the special value "\*...\*" can be used to allow re-connecting from any IP-address.

# What is the difference with Elastic Bamboo?

The goals behind [Elastic Bamboo](https://confluence.atlassian.com/bamboo/about-elastic-bamboo-289277118.html) and the
Kubernetes for Bamboo plugin are very similar: making management of remote Bamboo agents easier and flexible, and where possible
elastic by automating their lifecycle. To this end Elastic Bamboo instruments EC2 based virtual machines in AWS,
while this plugin instruments PVC's, Secrets and Pods in Kubernetes clusters.

# What is the difference with the Per-Build-Container project from Atlassian?

The [Per-Build-Container](https://bitbucket.org/atlassian/per-build-container/src/master/)(PBC) project originated as an internal tool of
Atlassian build engineering, and is now offered as a set of open-source Bamboo plugins. The PBC projects supports a number of 'backends', of which Kubernetes is one.
Specific to Kubernetes, PBC will create a new Bamboo agent encapsulated in a Pod for each build Job.
The lifecycle of the agent is bound to the Job it executes and is typically very short.  

PBC comes with some unique advantages and capabilities, at the cost of increased complexity. It should be considered by organizations
with highly dynamic build requirements (both in terms of tooling as well as job load).

As important points of distinction, PBC:

- Does not offer commercial support.
- Relies on *kubectl* and *kubeconfig* for cluster interaction.
- Breaks some standard Bamboo functionality, as mentioned in [Ceaveats and gotchas](https://bitbucket.org/atlassian/per-build-container/src/9317cea702776f9f6737457e33a9c837f88a36fa/bamboo-isolated-docker-plugin/README.md).
