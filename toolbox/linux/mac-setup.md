# VM 安装 Sierra

## 安装

https://techsviewer.com/install-macos-sierra-virtualbox-windows/

链接已经给出了详细的步骤和虚拟机资源，我跟着教程搞了大半天才搞好，其实本来很简单的，但是，复制命令的时候，原先复制的地方空格有变化，输命令时没注意，导致一直重新引导，进不去界面。

```text
cd "C:\Program Files\Oracle\VirtualBox\"
VBoxManage.exe modifyvm "MacOS" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac11,3"
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Iloveapple"
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
VBoxManage setextradata "MacOS" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```

#### 修改分辨率

```text
cd "C:\Program Files\Oracle\Virtualbox"
VBoxManage setextradata "MacOS" VBoxInternal2/EfiGopMode N
使用 数字替换命令行最后的 N：    0        1         2          3         4         5
                              640x480, 800x600, 1024x768, 1280x1024, 1440x900, 1900x1200
```

#### 网络设置

System Preferences -> Network -> Advanced -> Proxies -> SOCKS Proxy

SOCKS Proxy Server 192.168.1.101:1080  
Bypass localhost, 127.0.0.1 (这里不设置，影响前端调试)

#### 声音问题

能发声，但失真超厉害，聊胜于无，以后看能不能解决。

### 性能优化

#### 关闭一些无用的特效

#### 清理磁盘

Apple Menu –> About this Mac –> Storage

#### 删除一些没用的软件


## 设置

#### 输入法设置

System Preferences -> Keyboard -> Input Sources

#### 快捷键设置

同上 

### 开发环境配置

#### Homebrew

https://brew.sh/index_zh-cn.html

RedHat 有 yum，Ubuntu 有 apt-get，macOS 只有自己的苹果商店，但这个明显不够啊，于是有了第三方的 Homebrew。

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

```bash
# Example usage:
$ brew search [TEXT|/REGEX/]
$ brew (info|home|options) [FORMULA...]
$ brew install FORMULA...
$ brew update
$ brew upgrade [FORMULA...]
$ brew uninstall FORMULA...
$ brew list [FORMULA...]

# Troubleshooting:
$ brew config
$ brew doctor
```

```bash
$ brew install google-chrome visual-studio-code
```

#### Node.js

可以通过 brew 来安装，但感觉这么重要的东东，还是直接从官网下载安装包安装吧。
