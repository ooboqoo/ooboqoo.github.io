# Ionic2

## 环境配置

### Android 开发平台配置

指南：https://cordova.apache.org/docs/en/6.x/guide/platforms/android/

#### 安装 JDK - Java Development Kit

下载并安装 http://www.oracle.com/technetwork/java/javase/downloads/index.html

##### 设置环境变量：

* `JAVA_HOME` 设置为安装路径，如 `C:\Program Files\Java\jdk1.8.0_112`
* 然后推荐在 `Path` 变量添加 `%JAVA_HOME%\jre\bin`

#### 安装 Android SDK

下载并安装 `Android Stand-alone SDK Tools` or `Android Studio`, 如果没特殊需求，安装前者就足够了。

##### Adding SDK Packages

安装完 Android SDK 后需要通过 Android SDK Manager 来下载所需的开发包：

* Android Platform SDK for your targeted version of Android
* Android SDK build-tools version 19.1.0 or higher
* Android Support Repository (found under "Extras")

##### 设置环境变量

* `ANDROID_HOME` 设置为安装路径，如 `C:\Program Files (x86)\Android\android-sdk`
* 然后推荐在 `Path` 变量添加 Android SDK's tools and platform-tools directories
  `%ANDROID_HOME%\platform-tools; %ANDROID_HOME%\tools`

### Ionic2 配置

```bash
# Install Ionic
$ npm install -g cordova ionic
# Start a project
$ ionic start --v2 myApp sidemenu  # 指定版本不能漏
# Run it
cd myApp
$ ionic platform add android
$ ionic build android
$ ionic emulate android
```

