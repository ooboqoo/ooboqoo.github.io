# 搭建开发环境

https://aaaaaashu.gitbooks.io/mac-dev-setup/content/index.html


## 快速配置

### Command Line Tools for Xcode

```bash
$ xcode-select --install    # 安装命令行工具

# 删除命令行工具
$ sudo rm -rf /Library/Developer/CommandLineTools
```

包含了一些基本的命令行开发工具，如 git, xcrun, xcodebuild，安装 Homebrew 的时候会提示安装。

也可登录 https://developer.apple.com/download/more/ 下载安装包安装。

注：不要装 Xcode，太大了，目前开发也用不到，而且频繁更新很烦人，动不动就 5 个 G。

```bash
# 如果装了 Xcode 可以切到 Xcode 的命令行工具，更完整，更新也更及时
$ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

### Homebrew

https://brew.sh/index_zh-cn.html

RedHat 有 yum，Ubuntu 有 apt-get，macOS 只有自己的苹果商店，但这个明显不够啊，于是有了第三方的 Homebrew。

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```bash
# Example usage:
$ brew install FORMULA...    # 软件安装位置 /usr/local/Cellar/
$ brew uninstall FORMULA...

$ brew outdated              # 检查安装的软件包是否有新版本
$ brew update                # 更新 brew 版本 + formulae 信息
$ brew upgrade [FORMULA...]  # 升级软件包
$ brew switch                # 在本机安装的多个新老版本软件包之间切换

$ brew unlink vim            # 临时使 vim 失效，即，只去链接不实际卸载
  # brew unlink -n vim           查看将会有哪些个链接会被删除，只是问问不实际删除
$ brew link [FORMULA]        # 重新创建链接

$ brew search --desc keyword # 也可以直接访问 formulae.brew.sh 查找包信息
$ brew (info|home|options) [FORMULA...]  # 如 `brew info git` 可查看本机安装的 git 相关信息
$ brew list [FORMULA...]     # 不带参数可列出安装的软件清单，带具体软件包名，可列出安装目录细节
$ brew cleanup               # brew 更新软件不会删除老版，需要定期手动清理
$ brew leaves                # 列出那些不被其他包依赖的软件包

$ man brew
$ brew help leaves

# Troubleshooting:
$ brew config
$ brew doctor
```

```bash
$ brew install google-chrome visual-studio-code
```

#### 设置代理

解决 Homebrew 网络太慢的问题，可使用使用国内镜像源，或者走代理。

```bash
# 解决安装 Homebrew 慢、`brew update` 慢的问题
$ echo proxy=socks5://127.0.0.1:1080 >> ~/.curlrc

# 解决安装软件时下载慢的问题，如装 icu4c 时下载奇慢，设置这个后下载就飞起
$ ALL_PROXY=socks5://127.0.0.1:1080 brew # 运行时改环境变量，也可以配成 alias
$ echo export ALL_PROXY=\"socks5://127.0.0.1:1080\" >> ~/.zshrc  # 还可以这样，但影响面有点大
```

#### 换源

```bash
$ cd $(brew --repo)
$ git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

$ cd $(brew --repo)/Library/Taps/homebrew/homebrew-core
$ git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

$ cd $(brew --repo)/Library/Taps/homebrew/homebrew-cask
$ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

### Node.js

可以通过 brew 来安装，也可以直接从官网下载安装包安装。

```bash
# 在安装的多个版本之间切换，如果不知道安装了那几个版本，可以随便写一个版本号，然后报错时会列出已安装版本信息
$ brew unlink node && brew switch node <version>
```

### Python

```bash
$ sudo easy_install pip
```


## Terminal 微调

macOS 中每开启一个终端，都会去调用 .bash_profile，所以在 .bash_profile 中并没有像 Linux 一样默认导入 .bashrc 配置项。所以将配置都放 .bash_profile 是可行的，但如果在 bash 中启动一个子 bash，这时就不会去加载 .bash_profile 中内容了。所以最好还是跟 Linux 习惯对其为好。

*.bash_profile*

```sh
# 自定义提示符 `man bash` 可查看详细说明
export PS1="\[\e[0;32m\]\u@\h \W $ \[\e[m\]"
# 确保控制台颜色更加丰富，如 ls 输出彩色信息
export CLICOLOR=1

if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

*.bashrc*

```sh
alias ll="ls -l"
```

### 升级 Bash

因为证书原因，macOS 中的 bash 版本一直停留在2007年发布的 v3 版，自己用还是升级到 v5 吧。

```bash
$ brew install bash
$ sudo vim /etc/shells         # 追加 /usr/local/bin/bash 这样添加白名单后新 bash 才能作为 login shell
$ chsh -s /usr/local/bin/bash  # 修改默认 shell
```
