# Ionic2

## 环境配置总结

> 网络好的话，直接按此步骤操作下来就能跑起来，如果网络不好，cordova 笔记里还有额外的参考。 2016/12/01

看官方文档貌似很简单，但真得要把 `ionic build android` 跑起来，路还很远，要下载N多东西，而且还得对着报错一步步去补充，最终跑起来了，具体依赖安装总结如下：

### 安装 JDK 8

1. 下载 JDK 8 并安装
2. 配置环境变量 `JAVA_HOME` 为安装路径，如 `C:\Program Files\Java\jdk1.8.0_112`
3. `Path` 环境变量添加 `%JAVA_HOME%\bin`

### 安装 Android SDK

1. 下载并安装 *Android Stand-alone SDK Tools*，注意不要安装到系统盘，不然一堆权限问题。
2. 使用新安装的 *Android SDK Manager* 来下载所需的其他开发子包：
    * Android SDK Platform-tools 25.0.1  // 装最新版本
    * Android SDK Build-tools 25.0.1     // 装最新版本
    * SDK Platform 24 (Android 7.0)  // 设置打包版本为 6 时装这个，错一个版本，不知道为什么
    * SDK Platform 23 (Android 7.0)  // 设置打包版本为 5.1.1 时装这个
    * Android Support Repository     // 这个是看文档说必须装，貌似可以不装，没试
3. 配置环境变量 `ANDROID_HOME` 为安装路径，如 `D:\Program Files\Android\android-sdk`
4. `Path` 环境变量添加 `%ANDROID_HOME%\platform-tools` 和 `%ANDROID_HOME%\tools`

### 全局安装 Ionic

```bash
$ npm install -g cordova ionic
```


## Ionic2 操作

```bash
# Start a project
$ ionic start --v2 ionic2App sidemenu  # 不要忘记指定版本；另外另个内置可选模板是 blank 和 tabs

# Run it
$ cd ionic2App
$ ionic serve

# Platform Guides
$ ionic platform add android@5.0.0  # 如果不指定版本，默认安装的是 6.0.0
$ ionic build android
$ ionic emulate android # 这步还没跑起来，还得配置安卓虚拟机
```

### `ionic serve` 注意点

https://www.thepolyglotdeveloper.com/2016/02/why-you-should-not-use-ionic-serve-for-hybrid-apps/

使用 `ionic serve` 调试一些 html 样式啥的可能是比较方便的，但浏览器环境跟 native 环境完全不同，所以多数时候不要嫌麻烦，应该直接在真机上测试，绝多数问题，都是在浏览器中会报错，但部署到手机就好了。


## 部署到设备

使用 `ionic serve` 开启浏览器调试或者使用模拟器都是比较简便的方式，但可能你还必须到真机上测试一遍，不仅因为你能看到 app 的实际表现，更关键的是 Ionic Native 插件只能在真实环境下工作。

### Android Devices

在安卓设备上调试还是很方便的，你只要开启设备的 USB 调试模式 和 开发模式，然后再敲一行命令就可搞定：

```bash
$ ionic run android --device
```

### adb 工具使用

https://www.thepolyglotdeveloper.com/2014/12/debugging-android-source-code-adb/
