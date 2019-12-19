# Packages


## Pub commands

```
pub cache
pub deps
pub downgrade
pub get
pub global
pub publish
pub run
pub upgrade
pub uploader
```


## How to use packages

At a minimum, *a Dart package is a directory containing a pubspec file*. The pubspec contains some metadata about the package. Additionally, a package can contain dependencies (listed in the pubspec), Dart libraries, apps, resources, tests, images, and examples.



## Creating packages

The Dart ecosystem uses packages to share software such as libraries and tools. The minimal requirements for a library package are:
* pubspec file: The _pubspec.yaml_ file for a library is the same as for an application package.
* _lib_ directory: the library code lives under the _lib_ directory and is public to other packages. You can create any hierarchy under _lib_, as needed. By convention, implementation code is placed under _lib/src_. Code under _lib/src_ is considered private. To make APIs under _lib/src_ public, you can export _lib/src_ files from a file that’s directly under _lib_. When the `library` directive isn’t specified, a unique tag is generated for each library based on its path and filename. Therefore, we suggest that you omit the `library` directive from your code unless you plan to generate library-level documentation.

### Organizing a library package

Library packages are easiest to maintain, extend, and test when you create small, individual libraries, referred to as **mini libraries**. In most cases, each class should be in its own mini library, unless you have a situation where two classes are tightly coupled. 翻译下，就是说一个 _.dart_ 文件里只放一个类定义。

Create a “main” library file directly under lib, lib/your-package-name.dart, that exports all of the public APIs. This allows the user to get all of a library’s functionality by importing a single file. The lib directory might also include other importable, non-src, libraries.

### Importing library files

### Conditionally importing and exporting library files

```dart
export 'src/hw_none.dart' // Stub implementation
    if (dart.library.io) 'src/hw_io.dart' // dart:io implementation
    if (dart.library.html) 'src/hw_html.dart'; // dart:html implementation
```



## Package reference

### Glossary of package terms

**application package** Opposite to the library package, the application package never depended on themselves. Application packages should check their lockfiles _pubspec.lock_ into source control.

**dependency** Another package that your package relies on. Dependencies are specified in your package's _pubspec.yaml_, and you can use `pub deps` to see the dependency hierarchy.

**library package** A package that other packages can depend on. Library packages can have dependencies on other packages and can be dependencies themselves. They can also include scripts to be run directly. The opposite of a library package is an application package. Don’t check the lockfile  _pubspec.lock_ of a library package into source control. The version constraints of a library package’s immediate dependencies should be as wide as possible while still ensuring that the dependencies will be compatible with the versions that were tested against.

**immediate dependency** The dependencies you list in your _pubspec.yaml_ are your package’s immediate dependencies. All other dependencies are **transitive dependencies**.

**lockfile** A file named _pubspec.lock_ that specifies the concrete versions and other identifying information for every immediate and transitive dependency a package relies on.

**entrypoint** An entrypoint is a Dart library that is directly invoked by a Dart implementation, it's usually the _.dart_ file that contains `main()`.

**entrypoint directory** A directory inside your package that is allowed to contain Dart entrypoints. Pub has a whitelist of these directories: _benchmark_, _bin_, _example_, _test_, _tool_, and _web_. Any subdirectories of those(except _bin_) may also contain entrypoints.

**source** A kind of place tha pub can get packages from, i.e. pub.dev or some specific Git URL.

**system cache** When pub gets a remote package, it downloads it into a single system cache directory maintained by pub. It defaults to _~/.pub-cache_ or _%APPDATA%\Pub\Cache\bin_. You can specify a different location using the `PUB_CACHE` environment variable. Once packages are in the system cache, pub creates a _.packages_ file that maps each package used by your application to the corresponding package in the cache. You only have to download a given version of a package once and can then reuse it in as many packages as you would like. You can delete and regenerate your _.packages_ file without having to access the network.

### Package layout conventions

Here’s what a complete package (named enchilada) that uses every corner of these guidelines might look like:

```
enchilada/
|- .dart_tool/ *    // exists after `pub get`, don't check into source control
|- .packages *      // exists after `pub get`, don't check into source control
|- pubspec.yaml
|- pubspec.lock **  // exists after `pub get`, check into source control only in application package
|- LICENSE
|- README.md
|- CHANGELOG.md
|- benchmark/
|    \- make_lunch.dart
|- bin/
|    \- enchilada         // public tools (any programs that can be run directly from the command line)
|- doc/
|    |- api/ ***    // exits after run dartdoc, don't check into source control
|    \- getting_started.md
|- example/
|    \- main.dart
|- lib/
|    |- enchilada.dart    // public library
|    |- tortilla.dart     // another public library
|    |- guacamole.css     // public assets
|    \- src/
|         |- beans.dart       // implementation files
|         \- queso.dart
|- test/
|    |- enchilada_test.dart
|    \- tortilla_test.dart
|- tool/
|    \- generate_docs.dart    // internal tools and scripts that people run while dev the package itself
\- web/
     |- index.html
     |- main.dart
     \- style.css
```

### Pub environment variables

`PUB_CACHE` 本地集中存放下载的依赖包的目录  
`PUB_HOSTED_URL` 仓库网址，默认是 pub.dev  

### Pubspec file

A pubspec can have the following fields:

```txt
name                  Required for every package.
version               Required for packages that are hosted on the pub.dev site.
description           Required for packages that are hosted on the pub.dev site.
homepage              Optional. URL pointing to the package’s homepage (or source code repository).
repository            Optional. URL pointing to the package’s source code repository.
issue_tracker         Optional. URL pointing to an issue tracker for the package.
documentation         Optional. URL pointing to documentation for the package.
dependencies          Can be omitted if your package has no dependencies.
dev_dependencies      Can be omitted if your package has no dev dependencies.
dependency_overrides  Can be omitted if you do not need to override any dependencies.
environment           Required as of Dart 2.
executables           Optional. Used to put a package’s executables on your PATH.
publish_to            Optional. Specify where to publish a package.
```

Pub ignores all other fields. Pubspecs for Flutter apps can have a few additional fields for managing assets.

```yaml
name: newtify
version: 1.2.3
description: >-
  Have you been turned into a newt?  Would you like to be?
  This package can help. It has all of the
  newt-transmogrification functionality you have been looking
  for.
homepage: https://example-pet-store.com/newtify
documentation: https://example-pet-store.com/newtify/docs
environment:
  sdk: '>=2.0.0 <3.0.0'
dependencies:
  efts: ^2.0.4
  transmogrify: ^0.4.0
dev_dependencies:
  test: '>=0.6.0 <0.12.0'
```

