# JSON Writer

- [General](/tasks/json_writer?id=general)
- [Options](/tasks/json_writer?id=options)
- [Advanced Options](/tasks/json_writer?id=advanced-options)

## General

The *JSON Writer* task allows updating one or more field values in one or more JSON-based files.
Fields are selected using [JSONPath](https://goessner.net/articles/JsonPath) expressions.
Both path expressions and field values can use any [Bamboo variable](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html) defined at the point of execution.

## Options

***Source files***

Selects the files to process.
The field accepts one or more relative paths or [Ant expressions](https://confluence.atlassian.com/fisheye/pattern-matching-guide-960155410.html).
The task will print each matching file to the build logs for verification.

***Field path***

JSONPath expression selecting one or more fields from the JSON document.
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

A field path can select:

- *Multiple fields*: for example, the expression *application.authors[*].name* might select more than one field. In this case, the same value will be written to each match.
- *A subtree*: the expression might select a complex object in the JSON document. In this case, the full subtree representing the object will be replaced by the provided value.

***Field value***

The field value can be any string, including previously specified or pre-defined Bamboo variable expressions.

The field value can evaluate to a JSON document itself, which allows inserting or replacing a JSON subtree at a certain position in the processed file(s).

## Advanced Options

***Ignore warnings***

This allows the build to continue in light of recoverable issues.
For example, a path expression not matching any field is considered a warning.

The default is not to ignore any warnings, as they most often stem from faulty task configuration.

***Minify output***

When the task processes a file, it parses its contents in memory. When writing the updated document back to the file on disk, the formatting can be influenced.

The default is to expand (i.e. pretty-print) the output, but this option allows to compress (i.e. minify) the result.

***Working subdirectory***

Optional relative path, which will be prefixed to any path or expression as defined in the *Source files* field.