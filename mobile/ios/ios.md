# iOS

## Xcode

安装很简单，直接在苹果商店下，4.5G，下载中途暂停了就得从头开始，安装后占用 10G，装好后，开发所需的东东都在了。


## 自动升级

比较本地和服务器软件版本，如果有更新就通过 `openURL` 方法进行更新。


## Flutter

* 使用 Xcode 打开项目中 _ios/Runner.xcodeproj_ 项目(文件夹) 
* 点击项目顶层 Runner 对项目进行配置
* 在配置页 _TARGETS/Runner/Signing & Capabilities_ 中配置证书(如何申请证书略)
* 首次 Run 时 iPhone 会阻止 开发模式的证书，在手机 _设置/通用/设备管理_ 中添加信任即可
