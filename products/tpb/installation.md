# Installation

## Bamboo

The only thing to do on the Bamboo side is to ensure the plugin is correctly installed,
and has a valid license. The plugin exposes its API at:

```
<bamboo-root-url>/rest/tpb/1.0/<resource>
```

which is used by the Terraform provider to instrument Bamboo.

## Terraform

Installation and usage instructions can be found on the provider documentation pages at
the official [Terraform registry](https://registry.terraform.io/providers/wndtnl/bamboo/latest/docs).

## Versioning

When using the Bamboo plugin with the Terraform provider, it is important to match the versions
as to avoid incompatibilities. Plugin and provider versions with the same major and minor version
numbers are ensured compatible. When up- or downgrading, it is important to keep them aligned.

As examples:

- Plugin v1.0.4 and provider v1.0.0 are guaranteed compatible.
- Plugin v1.1.6 and provider v1.0.2 are *not* guaranteed compatible.
