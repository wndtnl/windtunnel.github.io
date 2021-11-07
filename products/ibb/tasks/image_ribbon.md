# Add Image Ribbon

- [Options](/tasks/image_ribbon?id=options)
- [Advanced Options](/tasks/image_ribbon?id=advanced-options)

## Options

***Source files***

Selects the files to process.
The field accepts one or more relative paths or [Ant expressions](https://confluence.atlassian.com/fisheye/pattern-matching-guide-960155410.html).
The task will print each matching file to the build logs for verification.

***Position***

The corner position of the ribbon: *Top left*, *Top right*, *Bottom left* or *Bottom right*.

The task only allows the specification of a single position. When multiple ribbons are needed in different positions,
the task can be repeated multiple times acting on the same image(s) in sequence.

***Text***

The text as show in the ribbon. This field accepts dynamic values in the form of Bamboo variables.

***Text color***

Color of the text in hexadecimal format. The accepted formats are (#)RGB, (#)RRGGBB and (#)RRGGBBAA, the latter allowing
specification of transparency.

This field is optional, and the default value is #FFFFFF (white).

***Background color***

Color of the ribbon background in hexadecimal format. 

This field is optional, and the default value is #555555 (dark grey).

## Advanced Options

***Ignore warnings***

This allows the build to continue in light of recoverable issues.
For example, selecting an image with a non-supported format is considered a warning.

The default is not to ignore any warnings, as they most often stem from faulty task configuration.

***Working subdirectory***

Optional relative path, which will be prefixed to any path or expression as defined in the *Source files* field.