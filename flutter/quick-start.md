# Flutter

### 资源索引

了解手机端每个组件的作用和用法：https://material.io/components/  
Flutter 下能用的 Icon 列表：https://material.io/resources/icons/  

Flutter1.12  https://medium.com/flutter/announcing-flutter-1-12-what-a-year-22c256ba525d?  


### Flutter SDK

```bash
$ flutter doctor     # 检查开发环境是否已配置好
$ flutter upgrade    # 升级 SDK，如果在项目根目录执行此命令还会同时升级项目依赖
$ flutter help <command>  # Display help information about a command
```

```bash
$ flutter create my_first_app
$ open -a Simulator
$ cd my_first_app && flutter run
```

```bash
$ flutter pub get      # 获取项目依赖，without unnecessary updates
$ flutter pub upgrade  # 升级项目依赖
```

从 Flutter Clock 项目中学到的项目文件清理与传递方法

```bash
$ cd my_clock
$ rm -rf ios android
$ flutter clean       # Delete the build/ and .dart_tool/ directories

$ cd my_clock
$ flutter create .    # If run on a project that already exists, this will repair the project
$ flutter run
```

```bash
# Configuring Flutter to use a mirror site
$ export PUB_HOSTED_URL=https://pub.flutter-io.cn
$ export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```


### 项目目录结构

```txt
|- .idea
|- .vscode
|- android      // Android 项目专用代码，必要时可以用 Android Studio 打开此项目进行编辑或配置
|- ios          // Xcode 项目专用代码，必要时可以用 Xcode 打开此项目进行编辑或配置
|- build        // 编译后的代码
|- lib          // 我们自己写的 Dart 代码都在这  ⭐️
|- test         // 测试文件目录
|- .gitignore   // 默认内容包含 .idea .vscode build .packages android/部分内容 ios/部分内容  不含 .metadata
|- .metadata    // Flutter SDK 自动生成
|- .packages    // Flutter SDK 自动生成
|- pubspec.lock // 相当于前端的 yarn.lock
\- pubspec.yaml // 相当于前端的 package.json  ⭐️
```

### Debug

VSCode 打断点调试代码。使用 DevTools/Inspector 调试界面。

iOS Simulator 下可以用 `cmd + k` 切换软键盘是否可见。

VSCode 下默认不调试外部包，如有需要，在 "Settings > Extensions > Dart Configuration" 中开启 "Debug External Libraries" 选项。


### VSCode

`cmd + .` 快速更正 Quick Fixes  
`F4` Dart: Show Type Hierarchy  

`stless`: `StatelessWidget` snippet  
`stfull`: `StatefulWidget` snippet  
`stanim`: snippet `StetefulWidget` with `AnimationController`  


### 问题解决

Waiting for another flutter command to release the startup lock...

```bash
$ rm ~/Application/Flutter/bin/cache/lockfile
```





