# Releases

> This information can also be found at the Atlassian Marketplace [version page](https://marketplace.atlassian.com/apps/1221965/secret-managers-for-bamboo/version-history).

## Version 1.7.38

*Released* 26/11/2020

*Summary* Implicit AWS credentials

*Notes*

- In addition to specifying credentials explicitly (using Access Key Id and Secret Access Key) from the Bamboo UI, it is now possible to specify credentials implicitly.
In this case, the credentials must be provided by environment variables (AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY), java system properties (aws.accessKeyId/aws.secretKey),
a web identity token, the default credential profiles file, ECS container credentials or instance profile credentials.

## Version 1.7.37

*Released* 11/11/2020

*Summary* Improved Thycotic Secret Server support

*Notes*

- Support for spaces and non-ascii characters in the *Thycotic Secret Server* secret path.
- Support for spaces and non-ascii characters in the *AWS Secrets Managers*, *HashiCorp Vault* & *Thycotic Secret Server* secret names.

## Version 1.7.36

*Released* 26/10/2020

*Summary* Secret discriminators and support for Thycotic Secret Server

*Notes*

- Introduction of [secret discriminators](/topics/syntax.md?part-3-secret-discriminator), which extend the current ```%<secret-manager-name>:<secret-path>%``` syntax to allow the
optional specification of a discriminator as follows: ```%<secret-manager-name>:<secret-path>:<secret-discriminator>%```. The discriminator
values are specific to the secret manager, but correspond in the majority of cases to the version identifier of the secret.
- Initial support for [Thycotic Secret Server](https://thycotic.com/products/secret-server).

## Version 1.6.34

*Released* 16/10/2020

*Summary* Support for Oracle Cloud Vault

*Notes*

- Support for [Oracle Cloud Vault](https://www.oracle.com/security/cloud-security/key-management).

## Version 1.5.33

*Released* 18/08/2020

*Summary* Bugfix

*Notes*

- Bugfix: avoid secret resolution timeout after plugin updates or plugin enable/disable cycles. When experiencing the build or
 deployment error "Could not resolve secrets within set time limit", please update to this version. From this version on, the plugin
 depends on a resolvable "Base URL" of the Bamboo server (as configured in the Administrative section below System > General configuration).

## Version 1.5.32

*Released* 15/08/2020

*Summary* Bugfix

*Notes*

- Bugfix: prevent leaking secrets in the logs through extra environment variable(s) when building or deploying on remote agents.

## Version 1.5.31

*Released* 14/08/2020

*Summary* Support for Bamboo 7.1.X

*Notes*

- Support for Bamboo 7.1.X (released July 24).
- Bugfix: support for HashiCorp Vault versions before 0.11.2.

## Version 1.5.30

*Released* 04/06/2020

*Summary* Support for HashiCorp Vault K/V v1

*Notes*

- Choose between [HashiCorp Vault](https://www.vaultproject.io/) secrets engine
[K/V version 1](https://www.vaultproject.io/docs/secrets/kv/kv-v1) and [K/V version 2](https://www.vaultproject.io/docs/secrets/kv/kv-v2).
- Azure Key Vault Client Secret validation loosened, as the GUID format is not strictly required.

## Version 1.4.28

*Released* 08/05/2020

*Summary* Support for CyberArk Conjur

*Notes*

- Connect with [CyberArk Conjur](https://www.conjur.org) or
[CyberArk Dynamic Access Provider (DAP)](https://docs.cyberark.com/Product-Doc/OnlineHelp/AAM-DAP/Latest/en).

## Version 1.3.26

*Released* 30/04/2020

*Summary* Performance improvements

*Notes*

- Constant-time project and deployment search for scope autocomplete.

## Version 1.3.24

*Released* 21/04/2020

*Summary* Bugfix

*Notes*

- Url validation loosened, as to accept 'internal' urls with non-official TLD's as well.

## Version 1.3.23

*Released* 10/04/2020

*Summary* Webhooks and Support for GCP Secret Manager

*Notes*

- Connect with [GCP Secret Manager](https://cloud.google.com/secret-manager).
- Enable secret rotation through secret manager [Webhooks](https://windtunnel.io/products/smb/#/topics/webhooks).
- Support for AWS Secrets Manager *plaintext* secrets (in addition to *key/value*).

## Version 1.2.14

*Released* 27/03/2020

*Summary* Compatibility update

*Notes*

- Compatibility with Bamboo +7.0.
- Documentation of plugin [REST API](https://windtunnel.io/products/smb/#/topics/rest-api).

## Version 1.1.8

*Released* 03/03/2020

*Summary* Minor increment

*Notes*

- Fix scoping bug related to deployment environments.
- Global settings: set connection timeout.

## Version 1.1.0

*Released* 18/02/2020

*Summary* Scoping and Support for AWS Secrets Manager

*Notes*

- Connect with [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/).
- Scope secret managers to specific projects, builds, deployments or environments.
- Global settings: fail build or deployment when secret resolution fails.

## Version 1.0.0

*Released* 31/01/2020

*Summary* Initial Release

*Notes*

- Connect with [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/) (Secrets)
- Connect with [HashiCorp Vault](https://www.vaultproject.io/) (K/V v2)
- Integration with global, plan and deployment variables
- Resolution of external variables during builds and deployments
