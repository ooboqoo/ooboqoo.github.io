# Android 开发环境配置


## 安装 JDK - Java Development Kit

下载并安装 http://www.oracle.com/technetwork/java/javase/downloads/index.html

### 版本

现在的大版本 Java SE 8.0 (1.8.0) 发布于 2014 年。

JDK (Java Development Kit) 是 Java 语言的软件开发工具包 (SDK)。

* SE(J2SE)，standard edition，标准版，是我们通常用的一个版本，从 JDK 5.0 开始改名为 Java SE。
* EE(J2EE)，enterprise edition，企业版，使用这种 JDK 开发 J2EE 应用程序，从 JDK 5.0 开始改名为 Java EE。
* ME(J2ME)，micro edition，主要用于移动设备、嵌入式设备上的 java 应用程序，从 JDK 5.0 开始改名为 Java ME。

没有 JDK 的话，无法编译 Java 程序，如果想只运行 Java 程序，要确保已安装相应的 JRE。

### 常用基本工具

* javac: Java 源程序编译器，将 Java 源代码转换成字节码。
* java: Java 解释器，直接从字节码文件 (又称为类文件) 执行 Java 应用程序的字节代码。
* jar: Java 应用程序打包工具，可将多个类文件合并为单个 JAR 归档文件。
* Javadoc: Java API 文档生成器，从 Java 源程序代码注释中提取文档，生成 API 文档 HTML 页。
* jdb: Java 调试器 (debugger)，可以逐行执行程序、设置断点和检查变量。

### 设置环境变量：

* `JAVA_HOME` 设置为安装路径，如 `C:\Program Files\Java\jdk1.8.0_112`
* 然后在 `Path` 变量添加 `%JAVA_HOME%\bin`


## 安装 Android SDK

https://developer.android.com/studio/index.html

下载并安装 `Android Stand-alone SDK Tools` 或 `Android Studio`，如果没特殊需求，安装前者就足够了。2017/4/19 发现可以只下载工具 Tool 然后再按需下载 SDK，这样下载量可以减小不少。

> 如果安装到 C 盘，在下载包和使用过程中会频繁出现权限问题，所以应该安装到其他盘，如 D 盘。

### 目录结构

* tools           开发工具，`android` 命令在此目录
* platform-tools  各版本 SDK 通用工具，如 adb aapt aidl dx 等
* platforms       各版本 SDK
* build-tools     各版本编译工具
* extras   扩展开发包
* add-ons  第三方库，如 GoogleMaps
* docs     开发文档
* temp     缓存的目录，一般在更新 SDK 时用到

### Adding SDK Packages

安装完 Android SDK 后需要通过 Android SDK Manager 来下载所需的开发包：

  * Platform SDK，目前选 Android 6.0 (API 23) -> SDK Platform 23
  * 构建工具，目前选 Tools -> Android SDK Build-tools 23.0.1
  * Extras -> Android Support Repository

> 如果下载太慢，可以设置通过代理下载 `Tools > Options > Proxy Settings`

#### 设置环境变量

* `ANDROID_HOME` 设置为安装路径，如 `D:\Program Files\Android\android-sdk`
* 然后在 `Path` 变量添加 `%ANDROID_HOME%\platform-tools` 和 `%ANDROID_HOME%\tools`

## Configuring Gradle

不同版本的 android 需要下载不同版本的 gradle，自动下载奇慢，先让自动下载，然后有目录后，再手动下载，并放到目录，然后重新开打包，就自动读取了。

然后，这个 gradle 自动打包工具又要去下载一堆东西，这个就只有等着了，还好这个下的东西不多，不用等太久。

### 方法 2

虽然你装了gradle了但cordova还是要去再下一个，而且下个半天下不下来。我们可以到..\platforms\android\cordova\lib\builders文件下找到GradleBuilder.js文件将

```
var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'http\\://services.gradle.org/distributions/gradle-2.13-all.zip';
```
修改成
```
var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'file:///C:/Users/User/Desktop/gradle-2.13-all.zip';//自己的gradle路径
```


## 故障排除

1. ionic 自动下载 gradle 奇慢

自己下载压缩包，并放到以下目录：

```
C:\Users\gavin\.gradle\wrapper\dists\gradle-2.14.1-all\53l0mv9mggp9q5m2ip574m21oh\gradle-2.14.1-all.zip
```

安装完 gradle 之后还要下一堆东西，如果多电脑安装的话，一台电脑装好之后，可以考虑直接复制 gradle 文件夹，安装过程中的报错信息供参考：

Failed to move file 'C:\Users\gavin\AppData\Local\Temp\gradle_download2801739738413062969bin' into filestore at 'C:\Users\gavin\.gradle\caches\modules-2\files-2.1\org.antlr\antlr\3.5.2\c4a65c950bfc3e7d04309c515b2177c00baf7764\antlr-3.5.2.jar'

2. you have not accepted the license agreements of the following sdk components android sdk platform 24

http://stackoverflow.com/questions/40383323/cant-accept-license-agreement-android-sdk-platform-24

```
mkdir "%ANDROID_HOME%\licenses"
echo |set /p="8933bad161af4178b1185d1a37fbf41ea5269c55" > "%ANDROID_HOME%\licenses\android-sdk-license"
```
