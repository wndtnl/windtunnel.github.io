# Releases

> This information can also be found at the Atlassian Marketplace [version page](https://marketplace.atlassian.com/apps/1222674/kubernetes-agents-for-bamboo/version-history).

## Version 1.1.25

*Released* 27/01/2021

*Summary* Improved YAML merging

*Notes*

The YAML merging of the instance 'Spec merge' field was revisited, as its original implementation did not support certain
use-cases. Depending on your current use of the 'Spec merge' field, this might be a breaking (but easily resolvable) change.
Please have a look at the new [Adjust Agent Pod Spec](/tutorials/agent_pod_spec.md) tutorial for details.

## Version 1.1.24

*Released* 26/12/2020

*Summary* Several new tasks and instance pod spec yaml merging

*Notes*

- Feature: specification of cluster connection *purpose* (Agents = existing purpose, Builds = new purpose which allows
interacting with the cluster form builds and deployments using the new *write cluster config* task).
- Feature: task for dumping cluster connection details to a *kubeconfig* file, to be used with cluster connections of purpose *Builds*.
- Feature: tasks for downloading *kubectl* and *helm* binaries.
- Feature: the instance *node assignment* field has been generalized to accept any YAML to be merged with the generated pod spec.
- Bugfix: the client certificate authentication method now requires the private key data.

## Version 1.0.22

*Released* 18/12/2020

*Summary* Instance storage class

*Notes*

- Feature: allow specification of a [storage class name](https://kubernetes.io/docs/concepts/storage/storage-classes/) when creating an instance.
- Feature: updated client libraries, improved Kubernetes 1.18 and 1.19 compatibility.
- Bugfix: incompatibility for Bamboo installations using Microsoft SQL Server.
- Bugfix: cluster certificate authority, token and client certificate fields now accept base64-encoded values as well.
- Bugfix: UI issue when editing fields of stopped instances. 

## Version 1.0.19

*Released* 22/09/2020

*Summary* Node assignments

*Notes*

- Allow specification of instance node assignment using [Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/), [Node selector](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) and/or [Affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity).
- Allow editing certain fields of stopped instances (image, size and node assignment).
- Tested on [Azure Kubernetes Service](https://azure.microsoft.com/en-us/services/kubernetes-service/).


## Version 0.9.15

*Released* 18/06/2020

*Summary* Hotfix release

*Notes*

- Bugfix: issue when detecting Bamboo license remote agent support.
- Bugfix: issue when auto-approving Bamboo agents.

## Version 0.9.13

*Released* 18/06/2020

*Summary* Production candidate

*Notes*

- Improved validation of docker image names.
- Support for coarse-grained instance size specification (RAM/CPU).
- Support for instance storage size specification (PVC).
- Support for auto-inactivation of 'Task Pool' instances.
- Instance 'Automatic Pool', which autonomously manages instance state based on build queue.
- Instance settings: idle time and grace period.
- Bugfix: event temporal order.

## Version 0.2.10

*Released* 04/06/2020

*Summary* Major update towards v1

*Notes*

- Instance 'Task Pool', with start and stop tasks.
- Support for private docker image repositories.
- Support for Docker-in-Docker.
- Improved instance error reporting.
- Instance 'Prune' action.
- Improved cluster token validation.
- Inform about running build when instance is deleted.

## Version 0.1.4

*Released* 14/05/2020

*Summary* Initial release

*Notes*

- Connect with Kubernetes clusters, supporting client certificate and token authentication.
- Define build agent docker images.
- Manually create, start, stop and delete instances.
- Support for security token verification and auto-authorization.
- Cluster and instance state event log.