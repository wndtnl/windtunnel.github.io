# REST API

- [General](/topics/rest-api?id=general)
- [Entity: Source](/topics/rest-api?id=entity-source)
    - [Read All](/topics/rest-api?id=read-all)
    - [Read One](/topics/rest-api?id=read-one)
    - [Create](/topics/rest-api?id=create)
    - [Update](/topics/rest-api?id=update)
    - [Delete](/topics/rest-api?id=delete)
- [Entity: Scope](/topics/rest-api?id=entity-scope)
    - [Read](/topics/rest-api?id=read)
    - [Update](/topics/rest-api?id=update-1)
- [Entity: Webhook](/topics/rest-api?id=entity-webhook)    
    - [Read](/topics/rest-api?id=read-1)
    - [Update](/topics/rest-api?id=update-2)

## General

The *Secret Managers for Bamboo* plugin exposes a REST API allowing programmatic management of the administrative entities.

All endpoints follow these principles:

- Only users with administrative permissions (members of the *bamboo-admin* group) are authorized. The user should identify using a *basic authentication* header as described in [the following article](https://developer.atlassian.com/server/jira/platform/basic-authentication).
- A JSON-formatted body is expected as input (as needed), and JSON is returned as output. Each call should therefore include the *Accept* header with value *application/json*. JSON fields use the *lowerCamelCase* formatting.
- The base url of the API is defined as *[bamboo-root]/rest/secret-managers/1.0/*, for example *https://bamboo.company.com/rest/secret-managers/1.0/*. All defined endpoints are relative to this base url.
- For security reasons, secret manager credentials are never returned as output. Their values will be empty, even though a value was previously set. Credentials can only be created or (explicitly) updated.

## Entity: Source

Secret managers are defined as *Source* entities.

### Read All

#### Endpoint

```
GET /source
```

This endpoint returns a list of all defined sources.
Each entity in the list contains a fixed set of fields, and a variable number of fields depending on 'type' value.

#### Example Input

```
curl "http://localhost:8080/bamboo/rest/secret-managers/1.0/source" \
     -H 'Accept: application/json' \
     -u 'admin:admin'
```

#### Example Output

> Note: some fields were removed form the output as they are of no value to external clients.

```
[
  {
    "id": "a749b013-b5df-4f7f-9bcf-f17f2f62154e",
    "name": "azure",
    "type": "akv",
    "typeName": "Azure Key Vault",
    "isScopeGlobal": true,
    "scopeKeys": [],
    "isWebhookEnabled": true,
    "webhookUrl": "https://en0ks40r47u3ge.x.pipedream.net",
    "webhookTriggerType": "both",
    "tenantId": "b6891ba5-127a-487e-a51b-5985cdfcce7d",
    "vault": "bamboo",
    "clientId": "",
    "clientSecret": ""
  },
  {
    "id": "5aa5cf75-88f1-4f88-8830-caa6ea697b62",
    "name": "hashi",
    "type": "hcv",
    "typeName": "HashiCorp Vault",
    "isScopeGlobal": true,
    "scopeKeys": [],
    "isWebhookEnabled": true,
    "webhookUrl": "https://en0ks40r47u3ge.x.pipedream.net",
    "webhookTriggerType": "both",
    "rootUrl": "https://vault.company.com",
    "authPath": "approle",
    "enginePath": "bamboo",
    "secretPath": "",
    "roleId": "",
    "secretId": ""
  }
]
```

### Read One

#### Endpoint

```
GET /source/<source-id>
```

This endpoint returns a single source, based on its (internal) ID. The entity output is identical to the *Read All* endpoint.

#### Example Input

```
curl "http://localhost:8080/bamboo/rest/secret-managers/1.0/source/a749b013-b5df-4f7f-9bcf-f17f2f62154e" \
     -H 'Accept: application/json' \
     -u 'admin:admin'
```

#### Example Output

> Note: some fields were removed form the output as they are of no value to external clients.

```
{
  "id": "a749b013-b5df-4f7f-9bcf-f17f2f62154e",
  "name": "azure",
  "type": "akv",
  "typeName": "Azure Key Vault",
  "isScopeGlobal": true,
  "scopeKeys": [],
  "isWebhookEnabled": true,
  "webhookUrl": "https://en0ks40r47u3ge.x.pipedream.net",
  "webhookTriggerType": "both",
  "tenantId": "b6891ba5-127a-487e-a51b-5985cdfcce7d",
  "vault": "bamboo",
  "clientId": "",
  "clientSecret": ""
}
```

### Create

#### Endpoint

```
POST /source
```

This endpoint allows creating a source.

The endpoint expects the same fields as provided through the Bamboo user interface,
with the addition of the *type* field with one of the following values: *akv* (Azure Key Vault), *asm* (AWS Secrets Manager), *hcv* (HashiCorp Vault), *gsm* (GCP Secret Manager), *cac* (CyberArk Conjur), *ocv* (Oracle Cloud Vault) or *tss* (Thycotic Secret Server).

#### Example Input

```
curl -X "POST" "http://localhost:8080/bamboo/rest/secret-managers/1.0/source" \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -u 'admin:admin' \
     -d $'{
  "name": "azure",
  "type": "akv",
  "clientSecret": "245ba81d-6077-44d7-b487-b1873ec2d7e9",
  "clientId": "2626bc26-35e6-44d0-aa96-d7d0f367fa6e",
  "vault": "bamboo",
  "tenantId": "997a0b66-7a9c-41c0-92e5-7ec2997ba100"
}'
```

#### Example Output

> Note: some fields were removed form the output as they are of no value to external clients.

```
{
  "id": "287ff048-99ea-4d3a-9d99-79207a18fca9",
  "name": "azure",
  "type": "akv",
  "typeName": "Azure Key Vault",
  "isScopeGlobal": true,
  "scopeKeys": [],
  "isWebhookEnabled": false,
  "webhookUrl": "",
  "webhookTriggerType": "both",
  "tenantId": "997a0b66-7a9c-41c0-92e5-7ec2997ba100",
  "vault": "bamboo",
  "clientId": "",
  "clientSecret": ""
}
```

### Update

#### Endpoint

```
PUT /source/<source-id>
```

This endpoint allows updating a single source, based on its (internal) ID.

The endpoint expects the same fields as when creating a source, with special handling of the credentials controlled through the *withCredentials* field. 
When this boolean field is *false* (the default), the credentials related fields (e.g. clientId and clientSecret for Azure Key Vault) are ignored and not updated. 
When the field is *true*, these fields are required and result in an update of the credentials as well.

#### Example Input

```
curl -X "PUT" "http://localhost:8080/bamboo/rest/secret-managers/1.0/source/287ff048-99ea-4d3a-9d99-79207a18fca9" \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -u 'admin:admin' \
     -d $'{
  "id": "287ff048-99ea-4d3a-9d99-79207a18fca9",
  "name": "azure",
  "type": "akv",
  "withCredentials": true,
  "tenantId": "997a0b66-7a9c-41c0-92e5-7ec2997ba100",
  "vault": "projectx"
  "clientId": "274bb17e-5b08-46c0-badb-3b68ebff7877",  
  "clientSecret": "4fdc49d6-8a0b-45cd-b479-34974b94fc4c"
}'
```

#### Example Output

> Note: some fields were removed form the output as they are of no value to external clients.

```
{
  "id": "287ff048-99ea-4d3a-9d99-79207a18fca9",
  "name": "azure",
  "type": "akv",
  "typeName": "Azure Key Vault",
  "isScopeGlobal": true,
  "scopeKeys": [],
  "tenantId": "997a0b66-7a9c-41c0-92e5-7ec2997ba100",
  "vault": "projectx",
  "clientId": "",
  "clientSecret": ""
}
```

### Delete

#### Endpoint

```
DELETE /source/<source-id>
```

This endpoint allows deleting a single source, based on its (internal) ID.

#### Example Input

```
curl -X "DELETE" "http://localhost:8080/bamboo/rest/secret-managers/1.0/source/287ff048-99ea-4d3a-9d99-79207a18fca9" \
     -u 'admin:admin'
```

#### Example Output

```
HTTP 200 OK
```

## Entity: Scope

The [Scope](/topics/scoping) of a *Source* is defined as a sub-entity.
The *Source* must be created first, after which the scope can be adjusted.
The *Scope* of a *Source* is defined by a list of Project, Plan, Deployment or Environment keys as known to Bamboo.
These keys can be retrieved from the Bamboo user interface, or from the existing [REST API endpoints](https://docs.atlassian.com/atlassian-bamboo/REST/latest).

### Read

#### Endpoint

```
GET /source/<source-id>/scope
```

This endpoint returns the scope of a single source, based on its (internal) ID.

#### Example Input

```
curl "http://localhost:8080/bamboo/rest/secret-managers/1.0/source/5aa5cf75-88f1-4f88-8830-caa6ea697b62/scope" \
     -H 'Accept: application/json' \
     -u 'admin:admin'
```

#### Example Output

```
{
  "id": "5aa5cf75-88f1-4f88-8830-caa6ea697b62",
  "isScopeGlobal": false,
  "scopes": [
    {
      "key": "PROJECTX",
      "name": "ProjectX",
      "type": "project"
    },
    {
      "key": "PROJECTX-API",
      "name": "ProjectX / Api",
      "type": "plan"
    },
    {
      "key": "3375106",
      "name": "ProjectX - Api",
      "type": "deployment"
    },
    {
      "key": "3375109-3440645",
      "name": "ProjectY - Api / Production",
      "type": "environment"
    }
  ]
}
```

### Update

#### Endpoint

```
PUT /source/<source-id>/scope
```

This endpoint allows updating the scope of a single source, based on its (internal) ID.

#### Example Input

```
curl -X "PUT" "http://localhost:8080/bamboo/rest/secret-managers/1.0/source/5aa5cf75-88f1-4f88-8830-caa6ea697b62/scope" \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -u 'admin:admin' \
     -d $'{
  "id": "5aa5cf75-88f1-4f88-8830-caa6ea697b62",
  "isScopeGlobal": false,
  "keys": [
    "PROJECTX",
    "PROJECTX-API",
    "3375106",
    "3375109-3440645",
    "3375107-3440643"
  ]
}'
```

#### Example Output

```
{
  "id": "5aa5cf75-88f1-4f88-8830-caa6ea697b62",
  "isScopeGlobal": false,
  "scopes": [
    {
      "key": "PROJECTX",
      "name": "ProjectX",
      "type": "project"
    },
    {
      "key": "PROJECTX-API",
      "name": "ProjectX / Api",
      "type": "plan"
    },
    {
      "key": "3375106",
      "name": "ProjectX - Api",
      "type": "deployment"
    },
    {
      "key": "3375107-3440643",
      "name": "ProjectX - Mobile / Production",
      "type": "environment"
    },
    {
      "key": "3375109-3440645",
      "name": "ProjectY - Api / Production",
      "type": "environment"
    }
  ]
}
```

## Entity: Webhook

The [Webhook](/topics/webhooks) of a *Source* is defined as a sub-entity.
The *Source* must be created first, after which the webhook can be adjusted.

### Read

#### Endpoint

```
GET /source/<source-id>/webhook
```

This endpoint returns the webhook of a single source, based on its (internal) ID.

#### Example Input

```
curl "http://localhost:8080/bamboo/rest/secret-managers/1.0/source/5aa5cf75-88f1-4f88-8830-caa6ea697b62/webhook" \
     -H 'Accept: application/json' \
     -u 'admin:admin'
```

#### Example Output

```
{
  "id": "5aa5cf75-88f1-4f88-8830-caa6ea697b62",
  "isWebhookEnabled": true,
  "webhookUrl": "https://en0ks40r47u3ge.x.pipedream.net",
  "webhookTriggerType": "both"
}
```

### Update

#### Endpoint

```
PUT /source/<source-id>/webhook
```

This endpoint allows updating the webhook of a single source, based on its (internal) ID.

#### Example Input

```
curl -X "PUT" "http://localhost:8080/bamboo/rest/secret-managers/1.0/source/5aa5cf75-88f1-4f88-8830-caa6ea697b62/webhook" \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -u 'admin:admin' \
     -d $'{
  "id": "5aa5cf75-88f1-4f88-8830-caa6ea697b62",
  "isWebhookEnabled": true,
  "webhookUrl": "https://en0ks40r47u3ge.x.pipedream.net",
  "webhookTriggerType": "deployment"
}'
```

#### Example Output

```
HTTP 200 OK
```
