# iOS

## Xcode

安装很简单，直接在苹果商店下，4.5G，下载中途暂停了就得从头开始，安装后占用 10G，装好后，开发所需的东东都在了。


## 自动升级

比较本地和服务器软件版本，如果有更新就通过 `openURL` 方法进行更新。


## 目录结构(Flutter)

```bash
# 使用 Xcode 打开项目
open ios/Runner.xcworkspace
```

> https://stackoverflow.com/questions/21631313/xcode-project-vs-xcode-workspace-differences  
> **Project**s contain files (code/resouces), settings, and targets that build products from those files and settings.
> **Workspace**s contain projects which can reference each other.  
> [CocoaPods](https://cocoapods.org/), which automatically handles 3rd party libraries for you, uses workspaces. 


```txt
ios
|- Flutter
|    |- App.framework
|    |- AppFrameworkInfo.plist
|    |- Flutter.framework
|    |- Debug.xcconfig
|    |- Release.xcconfig
|    |- Generated.xcconfig
|    \- ...
|- Runner
|    |- Assets.xcassets/
|    |    |- AppIcon.appiconset/       应用图标
|    |    \- LaunchImage.imageset/     启动画面
|    |- Base.lproj/    Xcode 是看不到这级目录的，里面内容会自动展开
|    |    |- LaunchScreen.storyboard   启动页
|    |    \- Main.stroyboard           主界面页
|    |- AppDelegate.swift              应用入口文件
|    |- Runner-Bridging-Header.h
|    |- GeneratedPluginRegistrant.h
|    |- GeneratedPluginRegistrant.m
|    \- Info.plist                     Information Property List，应用名称在这里改
|- Runner.xcodeproj/    虽然是个目录但在 Finder 下看是个文件，你就当它是个保存项目 Runner 的信息的文件就行了
|- Runner.xcworkspace/  这个在 Finder 下看也是个文件，保存的是工作区 Runner 的相关信息
|- Pods
|    |- Headers/
|    |- ...
|    \- Manifest.lock
|- Podfile
\- Podfile.lock
```

### Storyboard

**UIKit** is a built-in framework in iOS, in which important UI elements (Views and Controls) are implemented.

A **Storyboard** is where you implement the the UI of your app (which can also be done via coding). Storyboards offer many powerful tools for you to conveniently design your UI visually, and see how the screens in your app looks like.

**SwiftUI** 是新出的 UI 框架，使用流行的声明式 declarative 方式(vs 命令式 imperative)构建页面，但 iOS13 之前的系统不支持。

Xcode11 下创建 iOS 应用时，"User Interface" 项下提供了两个选项：Storyboard 和 SwiftUI。


## Flutter

* 使用 Xcode 打开 _ios/Runner.xcworkspace_ 工作区(文件夹)
* 点击项目 Runner 对项目进行配置
* 在配置页 _TARGETS/Runner/Signing & Capabilities_ 中配置证书(如何申请证书略)
* 首次 Run 时 iPhone 会阻止 开发模式的证书，在手机 _设置/通用/设备管理_ 中添加信任即可

