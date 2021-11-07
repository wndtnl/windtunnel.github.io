# JSON Reader

- [General](/tasks/json_reader?id=general)
- [Options](/tasks/json_reader?id=options)
- [Advanced Options](/tasks/json_reader?id=advanced-options)

## General

The *JSON Reader* task allows reading one or more field values from a JSON-based file into [Bamboo variables](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html).
Fields are selected using [JSONPath](https://goessner.net/articles/JsonPath) expressions.

## Options

***Source file***

Selects the file to process. The field accepts a relative path.

***Scope of the variable(s)***

Allows setting the scope of the variables created. *Local* variables will only be available to the tasks of the current Job,
while *Result* variables carry over to all subsequent stages and releases.

***Namespace***

The namespace will be used as a prefix for all variable names created, using the following format:

```
${bamboo.[namespace].[name]}
```

A namespace can contain alphanumeric-characters, as well as the underscore (_) and dot (.) characters.

The namespace is an aid in variable isolation, and avoids accidentally overriding pre-existing and pre-defined variables.

***Field path***

JSONPath expression selecting a field from the JSON document.
Both the dot-notation and the bracket-notation are supported, so the following expressions are equivalent:

```
$.application.authors[0].name
$['application'].['authors'][0].['name']
```

The bracket-notation is more verbose, but the only option when the path keys contain dots themselves.
When using the dot-notation, the *$.* prefix is optional so the following expressions are equivalent:

```
$.application.authors[0].name
application.authors[0].name
```

A field path ***can*** select a complex object, in which case the corresponding JSON subtree will be loaded as variable value.

A field path ***cannot*** select multiple fields (an *indefinite* path), as this would render the result undefined.

***Variable name***

The name of the variable to be created, as used in the following format:

```
${bamboo.[namespace].[name]}
```

A variable name can contain alphanumeric-characters, as well as the underscore (_) and dot (.) characters.

***Value regex***

This field is optional, and accepts a [Regular Expression](https://en.wikipedia.org/wiki/Regular_expression).

When left empty, the (full) value of the selected field will be loaded into a single variable.

When a *regex* is provided, the field value will be matched against the regex and each match will result in a distinct variable holding the value of the match.
The name of each variable will be suffixed by the index of the match, using the following format:

```
${bamboo.[namespace].[name].[regex-index]}
```

The index is zero based. A variable will be created for each full match, as well as for the individual group matches as defined in the regex (if any).

> Exception: when a regex is provided but only a single match is found (and no groups were defined), there will be no index suffix. The variable naming is identical to the case where no regex is defined.

As an example, assume the following options:

- Namespace: ns
- Variable name: version
- Value regex: *(\d+).(\d+).(\d+)*

And the following field value: *[1.4.0,2.0.0)*

As there are two full-regex matches and each match contains 3 groups, this will result in a total of 8 variables for which the names and values are provided below:

```
ns.version.0 => 1.4.0
ns.version.1 => 1
ns.version.2 => 4
ns.version.3 => 0
ns.version.4 => 2.0.0
ns.version.5 => 2
ns.version.6 => 0
ns.version.7 => 0
```

## Advanced Options

***Ignore warnings***

This allows the build to continue in light of recoverable issues.
For example, a path expression not matching any field is considered a warning.

The default is not to ignore any warnings, as they most often stem from faulty task configuration.

***Working subdirectory***

Optional relative path, which will be prefixed to the path as defined in the *Source file* field.