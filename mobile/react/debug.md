# 开发调试


## Android

### 编译并下载到手机

```bash
$ react-native init xxxproject  # 这一步奇慢，百度后换下淘宝源就很快了
    $ npm config set registry https://registry.npm.taobao.org
$ cd xxxproject
$ react-native run-android      # 这一步，编译完成后会报 "无法安装到设备" 错误，不用管
$ adb install ./android/app/build/outputs/apk/app-debug.apk  # 只要连好手机开启 debug 就安装到手机了
```

### 调试步骤

1. 你的设备通过USB数据线连接到电脑上，并开启USB调试
2. `react-native start` 启动开发服务器(即时编译器)
3. `adb reverse tcp:8081 tcp:8081` 建立一个设备到电脑的映射端口 (安卓5.0以上版本)
4. 摇晃设备，或运行 `adb shell input keyevent 82`，调出 APP 开发者菜单
5. 选择 "Reload" 或 双击键盘 `R` 来(从开发服务器)加载最新 js 文件
6. 选择 "Debug in Chrome" 可开启 Chrome 调试，调试地址 `http://localhost:8081/debugger-ui`

安卓 5.0 以下的版本，不支持 `adb reverse`，须通过 WiFi 方式连接：

1. 调出开发者菜单，选 Dev Settings -> Debug server host for device.
2. 输入开发服务器的 IP 和端口，如 `192.168.1.101:8081`


## iOS

```bash
$ react-native run-ios  # 会自动启动虚拟机开始开发，这一点比安卓开发的体验好
```


## APP 内操作

### 自动刷新

选择开发菜单中的 "Enable Live Reload" 可以开启自动刷新，这样可以节省你开发中的时间。

更神奇的是，通过开启 "Hot Reloading" 选项，在刷新时还可以保持应用的当前运行状态。

### 红屏和黄屏

应用内的报错会以全屏红色显示在应用中，我们称为红屏 red box 报错。你可以使用 `console.error()` 来手动触发红屏错误。

应用内的警告会以全屏黄色显示在应用中，我们称为黄屏 yellow box 报错。你可以使用 `console.warn()` 来手动触发黄屏警告。

红屏或黄屏提示都只会在开发版本中显示，在发布版 release/production 中都是自动禁用的。

在默认情况下，开发模式中启用了黄屏警告。可以通过以下代码关闭：

```js
console.disableYellowBox = true;
```

你也可以通过代码屏蔽指定的警告，像下面这样设置一个数组：

```js
console.ignoredYellowBox = ['Warning: ...'];
```

数组中的字符串就是要屏蔽的警告的开头的内容。（例如上面的代码会屏蔽掉所有以Warning开头的警告内容）

### 访问控制台日志

在运行RN应用时，可以在终端中运行如下命令来查看控制台的日志：

```bash
$ react-native log-ios
$ react-native log-android
```

此外，你也可以在 iOS 模拟器的菜单中选择 `Debug → Open System Log...` 来查看。如果是 Android 应用，还可以通过在终端命令行里运行 `adb logcat *:S ReactNative:V ReactNativeJS:V` 命令来查看。

### 性能监测

你可以在开发者菜单中选择 "Pref Monitor" 选项以开启一个悬浮层，其中会显示应用的当前帧数。


## 调试问题及注意项

* 当连接了多个设备(含模拟器)，一些操作可能会失败，所以调试最好只连接一台设备。
* 在真机上运行时可能会遇到白屏的情况，请找到并开启 "悬浮窗权限"。
* 还有可能出现红屏，调出开发者菜单完成进一步配置即可解决。
* `react-native run-android --variant=release` 可以安装 release 版，在 debug 和 release 版本间来回切换安装时会报错 "签名不匹配"，需要先卸载再安装
* 在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上查看结果。
* 大部分现代安卓设备已经没有硬件 Menu 按键，可以通过摇晃设备来打开 APP 开发者菜单
* 应用刷新：如果只是修改 JS 代码的话，Reload JS 就够了，如果修改了项目的资源文件或其他代码，那么就要重新打包了。


## Chrome开发者工具

在开发者菜单中选择 "Debug JS Remotely" 选项，即可以开始在 Chrome 中调试 JS 代码。点击这个选项的同时会自动打开调试页面 `http://localhost:8081/debugger-ui`.

在 Chrome 的菜单中选择 "Tools → Developer Tools" 可以打开开发者工具。打开有异常时暂停 "Pause On Caught Exceptions" 选项，能够获得更好的开发体验。

注：Chrome 中并不能直接看到 App 的用户界面，而只能提供 console 的输出，以及在 sources 项中断点调试 js 脚本。
