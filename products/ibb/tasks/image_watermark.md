# Add Image Watermark

- [Options](/tasks/image_watermark?id=options)
- [Advanced Options](/tasks/image_watermark?id=advanced-options)

## Options

***Source files***

Selects the files to process.
The field accepts one or more relative paths or [Ant expressions](https://confluence.atlassian.com/fisheye/pattern-matching-guide-960155410.html).
The task will print each matching file to the build logs for verification.

***Text direction***

The direction of the watermark text, which can be 45 degrees *Upward*, 45 degrees *Downward*, *Horizontal* or *Vertical*.

***Text***

The text as repeatedly show in the watermark. This field accepts dynamic values in the form of Bamboo variables.

***Text color***

Color of the text in hexadecimal format. The accepted formats are (#)RGB, (#)RRGGBB and (#)RRGGBBAA, the latter allowing
specification of transparency.

This field is optional, and the default value is #FFFFFF (white).

## Advanced Options

***Ignore warnings***

This allows the build to continue in light of recoverable issues.
For example, selecting an image with a non-supported format is considered a warning.

The default is not to ignore any warnings, as they most often stem from faulty task configuration.

***Working subdirectory***

Optional relative path, which will be prefixed to any path or expression as defined in the *Source files* field.