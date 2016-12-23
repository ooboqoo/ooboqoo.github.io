# 打包与部署

## 准备安卓签名文件

### 签名文件的作用

平时我们的程序可以在模拟器上安装并运行，是因为在应用程序开发期间，由于是以 Debug 面试进行编译的，因此ADT 根据会自动用默认的密钥和证书来进行签名，而在以发布模式编译时，apk 文件就不会得到自动签名，这样就需要进行手工签名。

给apk 签名可以带来以下好处：

1. 应用程序升级：如果你希望用户无缝升级到新的版本，那么你必须用同一个证书进行签名。这是由于只有以同一个证书签名，系统才会允许安装升级的应用程序。 如果你采用了不同的证书，那么系统会要求你的应用程序采用不同的包名称，在这种情况下相当于安装了一个全新的应用程序。如果想升级应用程序，签名证书要相同，包名称要相同！
2. 应用程序模块化：Android 系统可以允许同一个证书签名的多个应用程序在一个进程里运行，系统实际把他们作为一个单个的应用程序，此时就可以把我们的应用程序以模块的方式进行部署，而用户可以独立的升级其中的一个模块
3. 代码或者数据共享：Android 提供了基于签名的权限机制，那么一个应用程序就可以为另一个以相同证书签名的应用程序公开自己的功能。以同一个证书对多个应用程序进行签名，利用基于签名的权限检查，你就可以在应用程序间以安全的方式共享代码和数据了。
4. 不同的应用程序之间，想共享数据，或者共享代码，那么要让他们运行在同一个进程中，而且要让他们用相同的证书签名。

### 生成密匙对

```bash
$ keytool -genkeypair -v -keystore filename.keystore -alias hzqx -keyalg RSA -keysize 2048 -validity 10000
  # 具体各参数说明通过 `keytool -genkey -help` 查看
  # filename.keystore 是一个密匙库，可以包含很多个密匙，而 hzqx 则是单个密匙的名字
$ keytool -list -keystore hzqx.keystore -alias hzqx -v
  # 查看 hzqx.keystore 密匙库内 hzqx 密匙的详细信息，需要输入密码
```

## 打包发行版

```bash
# 生成为签名的生产版
$ ionic build android --release --prod --browserify
  # `--release` translates to release mode
  # `--prod` AoT and minification are used
# 对 APP 进行签名
$ jarsigner -verbose -keystore hzqx.keystore -signedjar hzqx.apk android-release-unsigned.apk hzqx
  # 格式： jarsigner [选项] jar-file 别名
  # 具体参数说明通过 `jarsigner -help` 查看
```

### 配置自动签名

When you want to publish your app on the Google Play Store you have to build the apk in release mode, sign it with a key of your keystore and zipalign the package to optimize it.

在 `platforms/android` 文件夹下新建 `release-signing.properties` 文件，然后将 `hzqx.keystore` 秘钥库一并放在此处，后续打包就能实现自动签名了。

`release-signing.properties` 文件内容：

```
key.store=hzqx.keystore
key.store.password=www.baidu.com
key.alias=hzqx
key.alias.password=www.baidu.com
```

完成以上配置后，以后每次打包只需要运行 `ionic build android --release --prod --browserify`