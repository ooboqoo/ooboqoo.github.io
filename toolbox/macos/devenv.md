# 搭建开发环境

https://aaaaaashu.gitbooks.io/mac-dev-setup/content/index.html


## 快速配置

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
$ brew update                # 更新 brew 自身
$ brew upgrade [FORMULA...]  # 更新软件
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


## 控制台细调

.bash_profile (本来理想的位置是 .bashrc，但试了没效果)

```bash
export PS1="\[\e[0;32m\]\u@\h \W $ \[\e[m\]"  # 自定义提示符 `man bash` 可查看详细说明
export CLICOLOR=1  # 让控制台颜色更加丰富
```


## 其他

### brew update 慢

方法1：使用国内镜像源

方法2：走代理

```bash
$ echo socket5 = \"127.0.0.1:1086\" >> ~/.curlrc
```
