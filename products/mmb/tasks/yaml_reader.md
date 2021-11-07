# YAML Reader

- [General](/tasks/yaml_reader?id=general)
- [Multi-document](/tasks/yaml_reader?id=multi-document)

## General

The *YAML Reader* task allows reading one or more field values from a YAML-based file into [Bamboo variables](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html).

As there is no well-defined *YAMLPath* specification to be used, the plugin will convert the provided YAML documetns to the JSON format before processing.
As such, the selection of fields can be done using [JSONPath](https://goessner.net/articles/JsonPath) expressions, identical to the JSON Reader task.

> The YAML Reader task is practically identical to the JSON Reader task, except for the handling of multi-document YAML files as discussed below.
> Please consult the [JSON Reader](/tasks/json_reader.md) documentation first for an in-depth discussion.

## Multi-document

The [YAML specification](https://yaml.org/spec/1.2/spec.html) allows the specification of multiple documents in the same file,
separated by three dashes ('---'). When the plugin encounters multiple documents in the same file, it will process each document
individually and assign variable names prefixed with the zero-based document index.

When no value regex is specified, the format looks as follows:

```
${bamboo.[namespace].[document-index].[name]}
```

And in the most general case with regex matches:

```
${bamboo.[namespace].[document-index].[name].[regex-index]}
```

As an example, assume the following YAML file:

```
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rss-site
  labels:
    app: web
...
---
apiVersion: v1
kind: Pod
metadata:
  name: rss-app
  labels:
    app: web
...
```

And these (contrived) task options:

- Namepace: ns
- Field path: /metadata/name
- Variable name: name
- Value regex: *([a-z]+)-([a-z]+)*

Processing the file will result in a total of 6 variables, 3 from each of the two documents:

```
ns.0.name.0 => rss-site
ns.0.name.1 => rss
ns.0.name.2 => site
ns.1.name.0 => rss-app
ns.1.name.1 => rss
ns.1.name.2 => app
```

