# CocoaPods


CocoaPods is a dependency manager for Swift and Objective-C Cocoa projects.

```bash
# 先用 Xcode 创建一个工程 App，然后
$ cd App
$ ls
    App/
    App.xcodeproj/
$ pod init
$ vim Podfile
    target 'App' do
      use_frameworks!
      pod 'SwiftyJSON', '~> 2.3'
    end
$ pod install
$ ls -l
    Podfile
    Podfile.lock
    Pods/
    App/
    App.xcodeproj
    App.xcworkspace
# Make sure to always open the Xcode workspace instead of the project file when building your project
$ open App.xcworkspace
```
