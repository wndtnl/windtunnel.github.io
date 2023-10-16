# FAQ

## How are secret managers credentials stored?

The secret managers credentials are securely stored in the Bamboo database using the system-wide encryption facilities
offered by Bamboo since v6.0.0. The credentials are only decrypted in memory when requesting an access token from the secret manager.

For additional information, please refer to the [following Bamboo documentation page](https://confluence.atlassian.com/bamboo/system-wide-encryption-873930114.html).

## How are remote agents handled?

The secret managers credentials and their derived features (such as access tokens) are never shared with nor transferred to remote agents
to prevent abuse. The agents only see the resolved values of the secrets which are defined in the context of the running build
(global variables + plan variables or global variables + deployment variables).

However, the resolved secrets **are** being transferred from the Bamboo server to the agent, so it is important to
properly secure their connection, as well as configuring agent authentication.

For additional information, please refer to the [following Bamboo documentation page](https://confluence.atlassian.com/bamboo/agent-authentication-289277196.html).

## Are proxy settings honoured?

Yes. When connecting to external secret managers, the plugin will use the same proxy settings as configured for the hosting
Bamboo installation. No further configuration is needed.

For additional information, please refer to the [following Bamboo documentation page](https://confluence.atlassian.com/jirakb/configure-an-outbound-proxy-for-use-in-jira-server-247857187.html).
