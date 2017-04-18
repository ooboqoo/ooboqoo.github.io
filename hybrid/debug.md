# 开发与调试

## 常用调试命令

```bash
$ android --help    # 帮助文档
$ android sdk       # 打开 SDK Manager
$ android list avd  # 查看连接的安卓模拟器
```

```bash
$ adb help          # 帮助信息
$ adb devices       # 查看联机设备清单
$ adb install app.apk  # 安装 APP
$ adb uninstall app    # 卸载 APP
```

```
$ adb shell input keyevent 82                   # 触发设备摇晃，调出 RN 开发者菜单
$ adb logcat *:S ReactNative:V ReactNativeJS:V  # 查看 RN 应用日志
```


## ADB

adb (Android debug bridge)，用于管理模拟器或真机。包括三个部分：adb客户端(PC)，adb服务器(PC)，adbd(设备)。

运行 adb 客户端时，会检测 adb 服务器进程是否运行，如没运行会自动启动服务器。服务器会绑定到本地 TCP5037 端口，并监听从 adb 客户端发来的命令。

adb 服务器通过扫描 5555—5585 之间的奇数端口来搜索模拟器或真机，一旦发现 adb 守护进程，就进行连接。每台设备使用一对端口，奇数端口用于 adb 连接，偶数端口用于控制台连接。

```text
global options:
 -a         listen on all network interfaces, not just localhost
 -d         use USB device (error if multiple devices connected)
 -e         use TCP/IP device (error if multiple TCP/IP devices available)
 -s SERIAL
     use device with given serial number (overrides $ANDROID_SERIAL)
 -p PRODUCT
     name or path ('angler'/'out/target/product/angler');
     default $ANDROID_PRODUCT_OUT
 -H         name of adb server host [default=localhost]
 -P         port of adb server [default=5037]
 -L SOCKET  listen on given socket for adb server [default=tcp:localhost:5037]

app installation:
 install [-lrtsdg] PACKAGE
 install-multiple [-lrtsdpg] PACKAGE...
     push package(s) to the device and install them
     -l: forward lock application
     -r: replace existing application
     -t: allow test packages
     -s: install application on sdcard
     -d: allow version code downgrade (debuggable packages only)
     -p: partial application install (install-multiple only)
     -g: grant all runtime permissions
 uninstall [-k] PACKAGE
     remove this app package from the device
     '-k': keep the data and cache directories

file transfer:
 push LOCAL... REMOTE
     copy local files/directories to device
 pull [-a] REMOTE... LOCAL
     copy files/dirs from device
     -a: preserve file timestamp and mode
 sync [DIR]
     copy all changed files to device; if DIR is "system", "vendor", "oem",
     or "data", only sync that partition (default all)
     -l: list but don't copy

debugging:
 bugreport [PATH]
     write bugreport to given PATH [default=bugreport.zip];
     if PATH is a directory, the bug report is saved in that directory.
     devices that don't support zipped bug reports output to stdout.
 jdwp                     list pids of processes hosting a JDWP transport
 logcat                   show device log (logcat --help for more)

security:
 disable-verity           disable dm-verity checking on userdebug builds
 enable-verity            re-enable dm-verity checking on userdebug builds
 keygen FILE
     generate adb public/private key; private key stored in FILE,
     public key stored in FILE.pub (existing files overwritten)

internal debugging:
 start-server             ensure that there is a server running
 kill-server              kill the server if it is running
 reconnect                kick connection from host side to force reconnect
 reconnect device         kick connection from device side to force reconnect
```


## Android Virtual Device

> 模拟器占用资源相当大，我 8G 内存有点扛不住，选择 Memory 1GB RAM 的虚拟机，内存占用会好点。

### VS Emulator for Android

https://www.visualstudio.com/zh-hans/vs/msft-android-emulator/

微软的东东，免费，试用下感觉还不错啊

##### `adb devices` 无法找到虚拟设备

找到 `HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Android SDK Tools` 项，添加条目 `Path  /  REG_SZ / D:\Program Files\Android\android-sdk` (根据实际安装目录填写) 再 `adb kill-server` 即可解决。

##### 快速启动

每次打开启动器再选择虚拟机，这个过程挺麻烦的，直接设置了下命令别名，方便启动：

```
alias emulator="C:\Program Files (x86)\Microsoft Emulator Manager\1.0\emulatorcmd.exe" launch /sku:Android /id:3207E9FF-43A9-4D76-890A-8C585C4D88E0
```
