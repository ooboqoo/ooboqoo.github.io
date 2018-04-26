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

可以通过 brew 来安装，也可以直接从官网下载安装包安装。

### Python

```bash
$ sudo easy_install pip
```


## 控制台细调

macOS 中每开启一个终端，都会去调用 .bash_profile，所以在 .bash_profile 中并没有像 Linux 一样默认导入 .bashrc 配置项。所以将配置都放 .bash_profile 是可行的，但如果在 bash 中启动一个子 bash，这时就不会去加载 .bash_profile 中内容了。所以最好还是跟 Linux 习惯对其为好。

.bash_profile

```sh
# 自定义提示符 `man bash` 可查看详细说明
PS1="\[\e[0;32m\]\u@\h \W $ \[\e[m\]"
# 确保控制台颜色更加丰富，如 ls 输出彩色信息
export CLICOLOR=1

if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

.bashrc

```sh
alias ll="ls -l"
```


## 其他

### brew update 慢

方法1：使用国内镜像源

方法2：走代理

```bash
$ echo socket5 = \"127.0.0.1:1086\" >> ~/.curlrc
```
