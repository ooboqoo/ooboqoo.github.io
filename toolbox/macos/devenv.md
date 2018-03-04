# 搭建开发环境

https://aaaaaashu.gitbooks.io/mac-dev-setup/content/index.html


### Homebrew

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

### Node.js

可以通过 brew 来安装，但感觉这么重要的东东，还是直接从官网下载安装包安装吧。


### Python

```bash
$ sudo easy_install pip
```
















