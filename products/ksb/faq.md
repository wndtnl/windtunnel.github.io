# FAQ

# How are cluster and image credentials stored?

The cluster and image credentials are securely stored in the Bamboo database using the system-wide encryption facilities
offered by Bamboo since v6.0.0. The credentials are only decrypted in memory during interactions with the cluster API server.

For additional information, please refer to the Bamboo article at https://confluence.atlassian.com/bamboo/system-wide-encryption-873930114.html.

# What is the difference with Elastic Bamboo?

The goals behind [Elastic Bamboo](https://confluence.atlassian.com/bamboo/about-elastic-bamboo-289277118.html) and the
Kubernetes (Agents) for Bamboo plugin are very similar: making management of remote Bamboo agents easier and flexible, and where possible
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
- Cannot have remote agent authentication enabled.
- Breaks some standard Bamboo functionality, as mentioned in [Ceaveats and gotchas](https://bitbucket.org/atlassian/per-build-container/src/9317cea702776f9f6737457e33a9c837f88a36fa/bamboo-isolated-docker-plugin/README.md).