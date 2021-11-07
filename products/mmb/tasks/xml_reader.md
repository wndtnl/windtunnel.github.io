# XML Reader

- [General](/tasks/xml_reader?id=general)
- [Examples](/tasks/xml_reader?id=examples)
    - [Apple Property List](/tasks/xml_reader?id=apple-property-list)
    - [Dotnet .nuspec/.csproj](/tasks/xml_reader?id=dotnet-nuspeccsproj)
    - [Android Manifest](/tasks/xml_reader?id=android-manifest)

## General

The *XML Reader* task allows reading one or more field values from an XML-based file into [Bamboo variables](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html).
Fields are selected using [XPath](https://www.w3.org/TR/xpath-3/) expressions.

> Except for the usage of XPath expressions for the field path instead of JSONPath, the XML Reader task is identical to the JSON Reader task.
> Please consult the [JSON Reader](/tasks/json_reader.md) documentation for an in-depth discussion.

## Examples

Because the XPath syntax might be unfamiliar and for quick reference, some common examples and use-cases are provided below.

### Apple Property List

The [Apple Property List File](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) or *plist*
is an XML file so it can be processed using XPath.

Provided the *plist* file below, a common use-case would be to read or write the *bundle-identifier* and *bundle-version* fields.

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>items</key>
        <array>
            <dict>
                <key>metadata</key>
                <dict>
                    <key>bundle-identifier</key>
                    <string>io.windtunnel.app</string>
                    <key>bundle-version</key>
                    <string>1.0</string>
                    <key>kind</key>
                    <string>software</string>
                    <key>title</key>
                    <string>Mobile Friendly</string>
                </dict>
            </dict>
        </array>
    </dict>
</plist>
```

These fields can be selected using the following XPath expressions:

```
//key[contains(.,'bundle-identifier')]/following-sibling::string[1]
//key[contains(.,'bundle-version')]/following-sibling::string[1]
```

### Dotnet .nuspec/.csproj

Building a C# library in the form of a [nuget](https://www.nuget.org) package requires a *.nuspec file (or a *.csproj for dotnet core based projects),
including a number of library metadata fields. As both files are XML-based, they can be processed using XPath.

Provided the *nuspec* file below, a common use-case would be to read or write the *version* and *releaseNotes* fields.

```
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2013/05/nuspec.xsd">
  <metadata minClientVersion="2.12">
    <id>WindTunnel</id>
    <version>1.0.0.0</version>
    <authors>Development Team</authors>
    <owners>Development Team</owners>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <iconUrl>https://windtunnel.io/assets/images/logo_full.png</iconUrl>
    <releaseNotes></releaseNotes>
    <dependencies>
      <group targetFramework=".NETStandard1.0" />
    </dependencies>
  </metadata>
  <files>
    <file src="files/version.txt" target="/" />
  </files>
</package>
```

These fields can be selected using the following XPath expressions:

```
/package/metadata/version
/package/metadata/releaseNotes
```

Alternatively, in a more succinct form as relative paths:

```
//version
//releaseNotes
```

### Android Manifest

Given the *[AndroidManifest.xml](https://developer.android.com/guide/topics/manifest/manifest-intro)* below,
a common use-case would be to adjust the package identifier (*io.windtunnel.app* in the example)
depending on the environment (QA, Staging...) for which the application is built.
Also, the *versionCode* and *versionName* would probably be adjusted during CI, as described in the [tutorial](tutorial.md).

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="io.windtunnel.app"
    android:versionCode="1"
    android:versionName="1.0.0">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

These three fields are attributes of the root-level manifest node, they can be selected using the following XPath expressions:

```
/manifest/@package
/manifest/@*[name()='android:versionCode']
/manifest/@*[name()='android:versionName']
```
