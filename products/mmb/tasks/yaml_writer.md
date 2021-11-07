# YAML Writer

- [General](/tasks/yaml_writer?id=general)
- [Multi-document](/tasks/yaml_writer?id=multi-document)

## General

The *YAML Writer* task allows updating one or more field values in one or more YAML-based files.
Fields are selected using [JSONPath](https://goessner.net/articles/JsonPath) expressions.
Both path expressions and field values can use any [Bamboo variable](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html) defined at the point of execution.

> The YAML Writer task is practically identical to the JSON Writer task, except for the handling of multi-document YAML files as discussed below.
> Please consult the [JSON Writer](/tasks/json_writer.md) documentation first for an in-depth discussion.

## Multi-document

The [YAML specification](https://yaml.org/spec/1.2/spec.html) allows the specification of multiple documents in the same file,
separated by three dashes ('---'). When the plugin encounters multiple documents in the same file, it will process each document
individually and write the same value in each document where the provided path expression matches.