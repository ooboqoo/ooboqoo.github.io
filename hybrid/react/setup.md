# 环境配置与调试

## 环境配置

### JDK

Android Studio  依赖 Java Development Kit [JDK] 1.8 或更高版本。

### Android SDK

React Native 要求 Android Studio 2.0 或更高版本。

```bash
$ android sdk
```

选择并安装 3个必选项目 (目前 RN 编译基于 Android 6.0)
  * Tools -> Android SDK Build-tools 23.0.1
  * Android 6.0 (API 23) -> SDK Platform 23
  * Extras -> Android Support Repository

其他配置项参见 Android-SDK 配置笔记。


## 调试

### 编译并下载到手机

```bash
$ npm config set registry https://registry.npm.taobao.org
$ react-native init xxxproject  # 这一步奇慢，百度后换下淘宝源就很快了
$ cd xxxproject
$ react-native run-android          # 这一步，编译完成后会报 "无法安装到设备" 错误，不管
$ adb install ./android/app/build/outputs/apk/app-debug.apk  # 只要连好手机开启 debug 就安装到手机了
```

### 常用调试命令

```bash
$ adb devices  # 查看联机设备
$ adb logcat *:S ReactNative:V ReactNativeJS:V  # 查看应用日志
```

### 调试步骤

1. 你的设备通过USB数据线连接到电脑上，并开启USB调试
2. `react-native start` 启动开发服务器(即时编译器)
3. `adb reverse tcp:8081 tcp:8081` 建立一个设备到电脑的映射端口
4. 摇晃设备，或运行 `adb shell input keyevent 82`，调出 APP 开发者菜单
5. 选择 "Reload JS"(实时加载最新 js 文件) 或其他开发选项
6. 选择 "Debug in Chrome" 可开启 Chrome 调试，调试地址 `http://localhost:8081/debugger-ui`

注：以上调试步骤只适用 安卓 5.0 以上版本

### 调试问题及注意项

* 当连接了多个设备(含模拟器)，一些操作可能会失败，所以调试最好只连接一台设备。
* 在真机上运行时可能会遇到白屏的情况，请找到并开启 "悬浮窗权限"。
* 还有可能出现红屏，调出开发者菜单完成进一步配置即可解决。
* `react-native run-android --variant=release` 可以安装 release 版，在 debug 和 release 版本间来回切换安装时会报错 "签名不匹配"，需要先卸载再安装
* 在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上查看结果。
* 大部分现代安卓设备已经没有硬件 Menu 按键，可以通过摇晃设备来打开 APP 开发者菜单
* 应用刷新：如果只是修改 JS 代码的话，Reload JS 就够了，如果修改了项目的资源文件或其他代码，那么就要重新打包了。

