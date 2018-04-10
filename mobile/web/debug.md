# 开发调试

## 安卓设备远程调试

### Chrome 连接设备调试

系统要求：Chrome 版本必须高于 32，其次你的测试机 Android 系统高于 4.4。

步骤：

1. 先用数据线将 Android 测试机连接到电脑上。需要打开测试机的 “USB 调试” 功能。
2. 手机进入一个 webview 页面
3. 在 Chrome 地址栏中输入 `chrome://inspect` 选择相应条目下的 `inspect` 即可

### Remote Debugging

https://docs.ionic.io/tools/developer/

The following guides help you set up development devices for remote debugging with a browser’s dev tools.

Chrome Inspector
The Chrome Inspector can be used to debug your app on a physical Android device or emulator, just like it can be used on any web application.
 
Prerequisites

* For Windows, install the necessary USB drivers.
* A USB cable to connect your device.
* Chrome for Android installed and running on your device.
* USB debugging enabled on your device.

Debugging

* In Chrome, go to chrome://inspect in the URL bar.
* Click inspect in your app’s WebView on your device.


## 浏览器调试

### Chrome

Win 下按 `F12` Mac 下按 `cmd+option+I` 进入开发者工具界面。

### Safari


## 代理工具

Mac 下用 Charles / Win 下用 Fiddler


## 多终端同步

多设备浏览器同步测试工具 BrowserSync

Emmet LiveStyle 是一款样式实时预览 Chrome 插件


## 模拟器调试

比较常用的 Android 模拟器软件推荐 Genymotion。

iOS 模拟器需要借助 Mac 系统下的 Xcode 工具。

Manymo 是一款在线 Android 模拟器，免费使用。


## 多平台调试

网站响应式设计测试工具 Ghostlab

移动端 Web 开发调试工具 Weinre

JavaScript 远程调试和测试工具 Vorlon.JS


## 云真机调试

浏览器兼容性云端测试应用 BrowserStack，是一个多系统跨浏览器兼容性的在线测试工具，支持 1100多种真机和桌面浏览器的云端在线测试。

Web 端移动设备管理控制工具 STF (Smartphone Test Farm)，是一个可以很舒适地在浏览器中远程调试和管理智能手机、智能手表和其他小工具的 Web 应用程序。

多浏览器兼容性测试平台 F2etest，可以很方便的在浏览器中远程访问云测试服务器上的浏览器测试页面。


## React 调试

React Developer Tools / Redux DevTools



