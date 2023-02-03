# REST API

- [General](/topics/rest-api?id=general)
- [Entity: Cluster](/topics/rest-api?id=entity-cluster)
    - [Read All](/topics/rest-api?id=read-all)
    - [Read One](/topics/rest-api?id=read-one)
    - [Create](/topics/rest-api?id=create)
    - [Update](/topics/rest-api?id=update)
    - [Delete](/topics/rest-api?id=delete)
- [Entity: Image](/topics/rest-api?id=entity-image)
    - [Read All](/topics/rest-api?id=read-all-1)
    - [Read One](/topics/rest-api?id=read-one-1)
    - [Create](/topics/rest-api?id=create-1)
    - [Update](/topics/rest-api?id=update-1)
    - [Delete](/topics/rest-api?id=delete-1)
- [Entity: Instance](/topics/rest-api?id=entity-instance)
    - [Read All](/topics/rest-api?id=read-all-2)
    - [Read One](/topics/rest-api?id=read-one-2)
    - [Create](/topics/rest-api?id=create-2)
    - [Update](/topics/rest-api?id=update-2)
    - [Start](/topics/rest-api?id=start)
    - [Stop](/topics/rest-api?id=stop)
    - [Delete](/topics/rest-api?id=delete-2)
    - [Purge](/topics/rest-api?id=purge)

## General

The *Kubernetes (Agents) for Bamboo* plugin exposes a REST API allowing programmatic management of the administrative entities.

> It is important to note this REST API was created for internal use by the plugin. It is not designed with external consumers in mind.
> This interface is documented here and provided 'as-is', in the hopes it could be useful for certain administrative tasks.

All endpoints follow these principles:

- Only users with administrative permissions (members of the *bamboo-admin* group) are authorized. The user should identify using a *basic authentication* header as described in [the following article](https://developer.atlassian.com/server/jira/platform/basic-authentication).
- A JSON-formatted body is expected as input (as needed), and JSON is returned as output. Each call should therefore include the *Accept* header with value *application/json*. JSON fields use the *lowerCamelCase* formatting.
- The base url of the API is defined as *[bamboo-root]/rest/kubernetes/1.0/*, for example *https://bamboo.company.com/rest/kubernetes/1.0/*. All defined endpoints are relative to this base url.
- For security reasons, (cluster & image) credentials are never returned as output. Their values will be empty, even though a value was previously set. Credentials can only be created or (explicitly) updated.

## Entity: Cluster

### Read All

#### Endpoint

```
GET /cluster
```

This endpoint returns a list of all defined clusters.

#### Example Input

```
curl "http://localhost:8085/rest/kubernetes/1.0/cluster" \
     -H 'Accept: application/json' \
     -u 'admin:admin'
```

#### Example Output

> Note: some fields were removed form the output as they are of no value to external clients.

```

[
  {
    "id": "abbe9c3d-a126-4316-bc6d-beb06a6e4521",
    "name": "Azure Cluster",
    "apiServerUrl": "https://bamboo.hcp.westeurope.azmk8s.io:443",
    "certificateAuthority": "",
    "namespace": "bamboo",
    "authData": {
      "token": "",
      "strategy": "token",
      ...
    },
    ...
    "purpose": "agents",
    ...
  }
]
```

### Read One

#### Endpoint

```
GET /cluster/<cluster-id>
```

This endpoint returns a single cluster, based on its (internal) ID. The entity output is identical to the *Read All* endpoint.

### Create

#### Endpoint

```
POST /cluster
```

This endpoint allows creating a cluster. An example payload, with token authentication:

```
{
  "id": "",
  "name": "Azure",
  "purpose": "agents",
  "apiServerUrl": "https://bamboo.hcp.westeurope.azmk8s.io:443",
  "certificateAuthority": "LS0tL...",
  "namespace": "bamboo",
  "authData": {
    "strategy": "token",
    "token": "eyJhbGc..."
  }
}
```

### Update

#### Endpoint

```
PUT /cluster/<cluster-id>
```

This endpoint allows updating a cluster. An example payload:

```
{
  "id": "ff14a13e-3d2b-4439-a577-fec3000b2715",
  "name": "Azure",
  "purpose": "agents",
  "apiServerUrl": "https://bamboo-7e8297d2.hcp.westeurope.azmk8s.io:443",
  "certificateAuthority": "",
  "namespace": "bamboo",
  "authData": {
    "strategy": "token",
    "token": "eyJhbGciOiJSUz...."
  },
  "withChangeCa": false,
  "withChangeAuth": true
}
```

### Delete

#### Endpoint

```
DELETE /cluster/<cluster-id>
```

This endpoint allows deleting a cluster, based on its (internal) ID.

## Entity: Image

### Read All

#### Endpoint

```
GET /image
```

This endpoint returns a list of all defined images.

#### Example Output

```
[
  {
    "id": "625c0735-1b48-462e-a062-c0502b6971dd",
    "name": "dind",
    "agentImage": "wndtnl/ksb-bamboo-agent:nix-9.1.0-prewarm-dind",
    "operatingSystem": "linux",
    "useDinD": true,
    "dockerImage": "docker:20.10.22-dind",
    "username": "",
    "password": "",
    "withCredentials": false,
    "isPrivate": false
  }
  ...
]
```

### Read One

#### Endpoint

```
GET /image/<image-id>
```

This endpoint returns a single image, based on its (internal) ID. The entity output is identical to the *Read All* endpoint.

### Create

#### Endpoint

```
POST /image
```

This endpoint allows creating an image. An example payload:

```
{
  "name": "company-default-dind",
  "agentImage": "wndtnl/ksb-bamboo-agent:nix-9.1.0-prewarm-dind",
  "operatingSystem": "linux",
  "useDinD": true,
  "dockerImage": "docker:20.10.22-dind",
  "username": "",
  "password": "",
  "withCredentials": false
}
```

### Update

#### Endpoint

```
PUT /image/<image-id>
```

This endpoint allows updating an image. An example payload:

```
{
  "id": "d584dd47-d358-4ffa-a0de-28f13f197af1",
  "name": "company-default-dind",
  "agentImage": "wndtnl/ksb-bamboo-agent:nix-9.1.0-prewarm-dind",
  "operatingSystem": "linux",
  "useDinD": true,
  "dockerImage": "docker:20.10.22-dind",
  "username": "image-user",
  "password": "super-secret",
  "withCredentials": true
}
```

### Delete

#### Endpoint

```
DELETE /image/<image-id>
```

This endpoint allows deleting an image, based on its (internal) ID.

## Entity: Instance

### Read All

#### Endpoint

```
GET /instance
```

This endpoint returns a list of all defined images.

#### Example Output

```
[
  {
    "id": "be7e5a52-b0db-4b1a-a05a-3fc60557f1c7",
    "name": "kubernetes-agent-abug5",
    "clusterId": "abbe9c3d-a126-4316-bc6d-beb06a6e4521",
    "clusterName": "azure",
    "imageId": "625c0735-1b48-462e-a062-c0502b6971dd",
    "imageName": "dind",
    "state": {
      "id": "be7e5a52-b0db-4b1a-a05a-3fc60557f1c7",
      "currentKey": "error",
      ...
      "desiredKey": "active",
      ...
      "message": "Could not fetch existing pvcs...",
      "isStartEnabled": false,
      "isStopEnabled": true,
      "isEditEnabled": false,
      "isDeleteEnabled": true,
      "isPurgeEnabled": false
    },
    "pool": "manual",
    "poolName": "Manual",
    "stopWhenIdle": false,
    "size": "medium",
    "sizeName": "Medium",
    "storage": 25,
    "storageClass": "",
    "specMerge": ""
  }
]
```

### Read One

#### Endpoint

```
GET /instance/<instance-id>
```

This endpoint returns a single instance, based on its (internal) ID. The entity output is identical to the *Read All* endpoint.

### Create

#### Endpoint

```
POST /instance
```

This endpoint allows creating an instance. An example payload, with task pool:

```
{
  "prefix": "bamboo",
  "clusterId": "abbe9c3d-a126-4316-bc6d-beb06a6e4521",
  "imageId": "968afb20-d152-4529-a920-73ddbbeda433",
  "pool": "task",
  "stopWhenIdle": true,
  "size": "medium",
  "storage": "25",
  "storageClass": "ssd",
  "specMerge": "",
  "shouldStart": false
}
```

### Update

#### Endpoint

```
PUT /instance/<instance-id>
```

This endpoint allows updating an instance. An example payload:

```
{
  "id": "99c8b8b6-506c-40c9-aa24-70ca46a02b3b"
  "prefix": "bamboo",
  "clusterId": "abbe9c3d-a126-4316-bc6d-beb06a6e4521",
  "imageId": "968afb20-d152-4529-a920-73ddbbeda433",
  "pool": "task",
  "stopWhenIdle": false,
  "size": "medium",
  "storage": "25",
  "storageClass": "ssd",
  "specMerge": ""
}
```

### Start

#### Endpoint

```
POST /instance/<instance-id>/start
```

This endpoint sets the instance desired state to 'Active'. No payload.

### Stop

#### Endpoint

```
POST /instance/<instance-id>/stop
```

This endpoint sets the instance desired state to 'Inactive'. No payload.

### Delete

#### Endpoint

```
DELETE /instance/<instance-id>
```

This endpoint sets the instance desired state to 'Deleted'. No payload.

### Purge

#### Endpoint

```
DELETE /instance/<instance-id>/purge
```

This endpoint purges the instance. No payload.
