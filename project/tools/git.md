# Git & Cmder & GitHub

* Git for Windows: git 的 window 版本，包含 Git 版本控制工具核心、Git Bash 和 Git GUI
* Git Bash: 在 Win10 原生 Bash 正式推出之前，这个绝对是各种命令行操作的福音。
* Git GUI: 比较简陋的版本，没鸟用，下面的 GitHub Desktop 才是好用的 GUI。
* GitHub Desktop: GitHub 网站出品的客户端。
- - -

## Git

主站：https://git-scm.com/  
文档：https://git-scm.com/doc  
官方推荐的免费教程 Pro Git（中文）：https://git-scm.com/book/zh/v2  
git 简明指南: http://rogerdudler.github.io/git-guide/index.zh.html

![简明图解](/images/project/git.jpg)  
[在线动态解析各部分之间的联系](http://ndpsoftware.com/git-cheatsheet.html)：Stash - Workspace - Index - LocalRepository - UpstreamRepository  
工作目录下的 .git 文件夹存放的就是本地 Git 仓库，可以进去琢磨琢磨：

* objects 目录存储所有数据内容；
* refs 目录存储指向数据（分支）的提交对象的指针；
* HEAD 文件指示目前被检出的分支；
* index 文件保存暂存区信息。

### 命令速查表

#### 设置与帮助

```bash
$ git config --global user.name "<name>"            # 指定全局默认用户名
$ git config --global user.email "<email address>"  # 指定全局默认用户邮箱
$ git config --global color.ui auto                 # 指定终端输出颜色
$ git config --global alias.co checkout             # 设定命令别名，git 不会在输入部分命令时自动推断命令
$ git config --global alias.st status               # 设定命令别名，所以将一些常用操作设定别名会很方便

$ git <command> -h       # 在终端显示指令的简明帮助
$ git <command> --help   # 通过指令的 help 选项来获取帮助，另开网页显示
$ git help <command>     # 通过 help 指令来获取帮助，另开网页显示
```

#### 获取或新建仓库

```bash
$ git init <project-name>  # 将现有目录初始化成 Git 仓库
$ git clone <url>          # 克隆远程仓库，会下载该仓库的所有历史版本
$ git clone <网址> <本地目录名>  # 克隆时可以指定本地仓库目录名
$ git clone -o jq https://github.com/jquery/jquery.git  # 克隆并指定远程仓库别名为 jq 而非默认的 origin
$ git clone --depth 1

# GitHub clone 快速下载项目分支，指定 depth 会自动开启 --single-branch，实现最小下载，--branch 指定具体分支
$ git clone --branch v4-dev --depth 1 https://github.com/twbs/bootstrap.git  # 快速下载 bootsrap/ve-dev
```

git clone 实际上封装了多个命令：创建新目录，切换到新目录，初始化，为 URL 添加一个仓库别名，针对远程仓库执行 git fetch，最后通过 git checkout 将远程仓库的最新提交检出到工作目录。

#### 变更操作

```bash
$ git add *.js index.html  # 添加所有 js 文件和 index.html 到暂存区

$ git rm <file>                   # 将文件移出 index，并删除本地文件
$ git rm --cached <file>          # 将文件移出 index，但保留本地文件

$ git mv <oldname> <newfilename>  # 修改文件名并调整 index
  # 相当于运行了3条命令： `$ mv oldname newfilename` `$ git rm oldname` `$ git add newfilename`

$ git commit -m <description>  # 提交记录到仓库
$ git commit -a                # 提交前自动完成 add 或 rm 已跟踪文件，但未跟踪文件不受影响 
$ git commit --amend           # 重做(替换)最近一次提交

# reset 重置 HEAD 到指定状态，HEAD 文件指示目前被检出的分支
$ git reset <paths>      # 用最近一次提交的内容覆盖 index，相当于撤销一个 add 操作，工作目录中文件不会变化
$ git reset [<mode>] [<commit>]  # 将 HEAD 回退到指定的 commit，暂存区和工作区内容是否变化取决于 mode 设定：
  #         --soft   只回退 HEAD 指针到指定 commit，不影响 index 和工作目录
  #         --mixed  默认项，重置 inde 但不会影响工作目录内容
  #         --hard   重置暂存区和工作目录，全部回到指定 commit 时的状态，会丢失工作内容

$ git revert <commit>  # 生成一次新的提交来撤销某个指定 commit，reset 会丢失提交记录，而 revert 不会
```

#### 查询操作

```bash
# diff 显示不同提交之间，提交与工作目录，暂存区与工作目录之间的差别
$ git diff                 # 查看工作目录与暂存区的差异
$ git diff --staged        # 查看暂存区与最近一次提交之间的差异
$ git diff master branchB  # 比较两个不同提交之间的差异，此处的不同分支指向不同的提交
$ git difftool             # 不想使用内置的 git diff 时，启动一个外部工具来显示差异

# 显示工作目录状态
$ git status               # 显示当前状态
$ git status -s            # 以简洁的形式显示当前状态，`-s` 同 `--short` 参数

# log 显示提交历史
$ git log                       # 显示当前分支的提交记录
$ git log --oneline             # 显示提交记录，每条记录只占一行
$ git log --follow <file>       # 跟踪一个文件的修改历史，包括重命名前后的情况
$ git log -L <start>,<end>:<file>  # 跟踪 file 文件的特定部分的变更记录，参数可以是行号或者正则
$ git log -L "/function ajax/",/}/:main.js  # 跟踪 main.js 文件中的 ajax 函数的变更记录, 正则有空格的要带引号

# blame 是调试指令，可以跟 log 指令配合使用
$ git blame -L 12,22 sth.cs     # 查看 sth.cs 的 12-22行 都有谁在什么时候做了哪些修改

$ git show     # 查看数据对象 blob 数对象 tree 提交对象 commit 标签对象 tag 等的内容
```

#### 分支操作

```bash
# branch 列出/创建/删除分支
$ git branch                    # 列出本地分支，`-r` 列出远程分支，`-a` 列出本地 + 远程分支
$ git branch testing            # 创建 testing 分支
$ git branch -d testing         # 删除 testing 分支
$ git branch -m [<oldbranch>] <newbranch>  # 重命名分支
$ git branch --set-upstream master origin/next  # 手动建立本地 master 与 origin/next 间的追踪关系

# checkout 切换分支或恢复工作目录文件
$ git checkout <branch-name>    # 切换到某个分支
$ git checkout HEAD~2           # 往回退2个commit，这对于快速查看项目旧版本来说非常有用
  # 此时工作在 detached HEAD 模式，所做的修改在切换到普通分支后将无法找回，除非你新建分支 checkout -b
$ git checkout -b newBrach origin/master  # 在 fetch 下来的 origin/master 的基础上创建一个新分支
$ git checkout <file>           # 从最近的一次提交中取回文件并覆盖工作目录中的文件

$ git merge origin/master       # 将刚拉取下来的 master 合并到本地分支
$ git merge topic               # 合并 topic 分支内容到当前分支

# rebase 变基会修改 commit 变更历史 http://blog.csdn.net/hudashi/article/details/7664631/
$ git rebase origin/master      # 以变基的形式合并分支
$ git rebase --continue         # 如果变基出现冲突，冲突解决后继续
$ git rebase --abort            # 取消变基操作

# stash 藏匿/储存变动
$ git stash    # 临时保存还没有提交的工作(工作目录 + 暂存区)并恢复到初始状态，注意未 track 的新文件还留在工作目录
$ git stash list  # 列出所有 stash
$ git stash pop   # 恢复最近一次 stash 的内容，注意是保存的变动追加在目前状态之上，而非覆盖目前状态
$ git stash apply # 恢复最近一次 stash 的内容，与 pop 的区别是，pop 之后该 stash 就删除了，而 apply 则不删
$ git stash show stash@{1} # 查看最近的第二次 stash 的具体内容
$ git stash drop  # 删除最近一次 stash

# tag 创建/列出/删除/修改 标签对象
$ git tag -a v1.4 -m 'version 1.4'  # 创建一个附注标签 annotated，包含创建时间、创建者等详细信息
$ git tag v1.4                      # 创建一个轻量标签 lightweight，不包含详细信息，适用于临时标签
$ git show v1.4                     # 查看标签信息
$ git tag -a v1.2 9fceb02           # 给历史提交补打标签，需提供 SHA-1 校验值
$ git push origin v1.5              # git push 命令并不会传送标签, 你必须显式地推送标签到远程服务器
$ git push origin --tags            # 也可以一次性推送所有不在远程服务器上的标签
# Git 中你并不能真的检出一个标签，因为它们并不能像分支一样来回移动。如果你想要工作目录与仓库中特定的标签版本完全一样，可以使用 `git checkout -b [branchname] [tagname]` 在特定的标签上创建一个新分支：
$ git checkout -b version2 v2.0.0
```

#### 远程同步

```bash
# Fetch branches and/or tags (collectively, "refs") 
$ git fetch <远程仓库名>  # 获取远程仓库所有更新内容，取回内容通过 远程仓库名/分支 读取
$ git fetch <远程仓库名> <分支名>  # 仅获取特定分支的更新内容，然后可 merge 也可 checkout -b
$ git fetch origin master # 获取 origin 仓库的 master 分支，取回的内容要用 origin/master 读取
$ git fetch origin +pu:pu maint:tmp  # 获取 origin 仓库的 pu 和 maint 分支，并更新/新建本地 pu tmp 分支
  # pu 前的 + 加号表示，即使不能 fast-forward 也强制更新(自动 merge)

$ git pull  # 获取最新版本并合并，相当于 fetch + merge
$ git pull <远程仓库名> <远程分支名>:<本地分支名>
$ git pull origin next:master
$ git pull -p  # `-p` 告诉 pull 如果远程仓库已经删除了该分支，那么可以将本地分支删除

$ git push <远程仓库名> <本地分支>:<远程分支>
$ git push origin master  # 将本地的 master 分支推送到 origin 的 master 分支，如后者不存在则会被新建
$ git push origin :master # 推送一个空的分支到 origin/master，即相当于删除远程 master 分支
$ git push origin --delete master  # 删除远程 master 分支，效果同上行
$ git push origin         # 如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略
$ git push                # 如果当前分支只有一个追踪分支，那么仓库名都可以省略
$ git push --force origin # 如果远程仓库比本地版本新，Git 会报错，用 --force 可强制覆盖，后果自负
$ git push origin --tags  # 使用--tags 选项可以在 push 时一并更新标签

# 管理远程仓库
$ git remote -v                     # 列出所有远程仓库别名，并显示网址
$ git remote add <仓库别名> <网址>  # 添加远程仓库
$ git remote rm <仓库别名>          # 删除一个仓库别名，并一同删除本地的相关分支内容和配置
$ git remote show <仓库别名>        # 查看远程仓库的详细信息
$ git remote rename <原仓库名> <新仓库名>  # 修改指向远程仓库的别名
```

#### 其他操作

```bash
# clean 清理工作目录
$ git clean         # 从工作区中移除未跟踪的文件，.gitignore 中文件不受影响
$ git clean -X      # 移除未跟踪的文件和目录，.gitignore 中的文件也会一并移除
$ git clean -d      # 移除未跟踪的文件和目录
$ git clean <path>  # 在 path 范围内移除未跟踪的文件

# ls-files 显示暂存区和工作目录内文件的信息
$ git ls-files -u      # 显示冲突的文件，-s 则显示标记为冲突已解决的文件
$ git ls-files --stage # 检查保存在 stage 的文件

$ git cat-file -p d67046  # 查看一个 Git 对象的内容，用于研究 Git 内部机制
```

### 配置 .gitignore

文件 .gitignore 的格式规范如下：

* 所有空行或者以 ＃ 开头的行都会被 Git 忽略。
* 可以使用标准的 glob 模式匹配，如 `*.[oa]` 会匹配以 .o 或 .a 结尾的文件。
* 匹配模式可以以（/）开头防止递归。
* 匹配模式可以以（/）结尾指定目录。
* 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。

* `*` 星号匹配零个或多个任意字符；
* `?` 问号只匹配一个任意字符；
* `[]` 方括号提供一个可匹配的字符集合，如 `[abc]` 会匹配 a b c 这三个字符；
* `-` 方括号中用短划线分隔两个字符，匹配这两个字符范围内所有字符，如 `[0-9]` 表示匹配所有数字；
* `**` 使用两个星号表示匹配任意中间目录，比如 `a/**/z` 可以匹配 a/z, a/b/z 或 a/b/c/z 等。

```ini
# no .a files
*.a

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in the build/ directory
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```

## Git Bash

##### 右键点击 xterm 标题栏可设置项:
字体，前景色，背景色，终端选择等

##### Git/etc/bash.bashrc 设置:
* 调整终端颜色
* 开启 DIR_COLORS 项目，并设置 Git/etc/DIR_COLORS
* 自定义 prompt

##### Git Bash 的不足
* 在使用中，一些要求在 cmd 环境下操作的命令无法使用
* 无法显示进度条等内容

## cmder

Yeoman 推荐的，确实好用。

Cmder 是 windows 下的命令行模拟器，不仅能模拟 cmd 而且还自带了 Git Bash，修补了 Bash 的不足，且界面设置也很 sexy。

各选项过一遍，调整下，方便的，其实也不用怎么调整，初始目录、提示符、标题栏、状态栏 等之类的调下就好。

关于提示符：设置在 `config -> user-startup.cmd` 另外，作者的 cmder.lua 脚本写得有问题，直接删除或改名即可。

## GitHub

GitHub Desktop: https://desktop.github.com/

GitHub 发布的本地客户端，相比网站操作提供了更多功能，也避免了 git 命令操作的各种麻烦和不给力。

> 龙猫关于多人合作项目的经验分享：
> 
> * 多用客户端和工具，少用命令行，除非是在 linux 服务器上直接开发。
> * 每次提交前，diff 自己的代码，以免提交错误代码或测试代码。
> * 下班回家前，整理好自己的工作区并提交。
> * 并行的项目，使用分支开发。
> * 遇到冲突时，搞明白冲突的原因，千万不要随意丢弃别人的代码。
> * 产品发布后，记得打 tag，方便将来拉分支修 bug。

