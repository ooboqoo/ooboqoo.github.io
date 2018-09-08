# Git & GitHub

## Git

文档：https://git-scm.com/doc  
Pro Git：官方推荐免费教程中文版 https://git-scm.com/book/zh/v2  
Git for Windows: Git 的 windows 版本，包含 Git 版本控制工具核心、Git Bash 和 Git GUI

![简明图解](/resource/images/project/git.jpg)  
[在线动态解析各部分之间的联系](http://ndpsoftware.com/git-cheatsheet.html)：Stash - Workspace - Index - LocalRepository - UpstreamRepository

工作目录下的 .git 文件夹存放的就是本地 Git 仓库，可以进去琢磨琢磨：

* objects 目录 存储所有数据内容；
* refs 目录 存储指向数据（分支）的提交对象的指针；
* HEAD 文件 指示目前被检出的分支；
* index 文件 保存暂存区信息。

### 命令速查表

### 最常用命令

```bash
$ git pull   # 拉取代码 或
$ git fetch
$ git fetch bwh
$ git merge bwh/tabview
$ git push   # 上传代码
$ git add .  # 添加更改到 staged

$ git reset        # 用最近一次 commit 的内容覆盖 index，相当于撤销 git add . 操作
$ git reset HEAD~2 # 用最近第2次 commit 的内容覆盖 index
$ git reset --hard # 清空工作目录中已跟踪文件到上次提交状态
$ git clean -df    # 清空工作目录中新增的文件，含目录不含 .gitignore 中的文件
$ git stash  # 临时保存还没有提交的工作(工作目录 + 暂存区)并恢复到初始状态，注意未 track 的新文件还留在工作目录
$ git stash pop     # 恢复最近一次 stash 的内容，注意是保存的变动追加在目前状态之上，而非覆盖目前状态

# 撤销一次远程提交
$ git reset HEAD~1  # 回退一次提交
$ git push -f       # 强制推送到远程仓库
# 分支操作
$ git branch -a  # 列出本地和远程所有的分支
$ git checkout -b newBrach master  # 创建并切换到新分支

$ git push origin :newbranch  # 删除一个远程分支(冒号前为空，即推送一个空白分支到远程分支)
$ git branch -d newbranch     # 删除一个本地分支
# patch 操作
$ git diff > ..\patch1023  # 生成一个 patch 文件，文件放到父目录
$ git apply ..\patch1023   # 在另一个地方导入这些更改
$ git cherry-pick <commitA>..<commitB>  # 将其他分支的多次连续提交复用到当前分支
# 修改 commit message
$ git commit --amend       # 修改最近一次提交
$ git rebase -i HEAD~num   # 批量修改最近 num 次提交
$ git fetch & git rebase origin/master & git push  # 避免合并冲突时产生冗余提交记录
```

#### 设置与帮助

```bash
$ git config --global user.name "<name>"            # 指定全局默认用户名
$ git config --global user.email "<email address>"  # 指定全局默认用户邮箱
$ git config --global color.ui auto                 # 指定终端输出颜色
$ git config --global alias.co checkout             # 设定命令别名，git 不会在输入部分命令时自动推断命令
$ git config --global alias.st status               # 设定命令别名，所以将一些常用操作设定别名会很方便
$ git config --global credential.helper wincred     # 设定免密码登录(记住密码) [注1]
$ git config --global https.proxy 'socks5://127.0.0.1:1080'  # git 使用 ss 代理加速
$ git config --global gui.encoding utf-8            # 解决图形界面乱码
$ git config --global pull.rebase true              # pull 时用 rebase 替代默认 merge

# 配置使用 meld 作为 diff & merge 外部工具，注意需要添加 meld 路径到 PATH
# 如果命令行执行不成功，则手动修改 .gitconfig 文件
$ git config --global merge.tool meld
$ git config --global mergetool.meld.cmd 'meld.exe \"$BASE\" \"$LOCAL\" \"$REMOTE\" \"$MERGED\"'
$ git config --global diff.tool meld
$ git config --global difftool.meld.cmd 'meld.exe \"$LOCAL\" \"$REMOTE\"'

$ git config --list --global       # 查看全局设置

$ git config user.name "Gavin"     # 配置单个仓库的用户名
$ git config user.name             # 查看当前仓库使用的用户名

$ git <command> -h       # 在终端显示指令的简明帮助
$ git <command> --help   # 通过指令的 help 选项来获取帮助，另开网页显示
$ git help <command>     # 通过 help 指令来获取帮助，另开网页显示
```

注1：GitHub 自动登录介绍 https://help.github.com/articles/caching-your-github-password-in-git/

```text
[diff]
  tool = meld
[difftool "meld"]
  cmd = meld.exe $LOCAL $REMOTE
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
$ git add .                # 添加所有文件到暂存区

$ git rm <file>                   # 将文件移出 index，并删除本地文件
$ git rm --cached <file>          # 将文件移出 index，但保留本地文件

$ git mv <oldname> <newfilename>  # 修改文件名并调整 index
  # 相当于运行了3条命令： `$ mv oldname newfilename` `$ git rm oldname` `$ git add newfilename`

$ git commit -m <description>  # 提交记录到仓库 注：录入带空格的文字时，只能用双引号不能用单引号包裹
$ git commit -a                # 提交前自动完成 add 或 rm 已跟踪文件，但未跟踪文件不受影响 
$ git commit --amend           # 重做(替换)最近一次提交，修改 commit message 很好用

# reset 重置 HEAD 到指定状态，HEAD 指示目前被检出的分支，reset 用于撤销一些提交（转为悬挂提交，然后再垃圾回收）
$ git reset <paths>      # 用最近一次提交的内容覆盖 index，相当于撤销一个 add 操作，工作目录中文件不会变化
$ git reset [<mode>] [<commit>]  # 将 HEAD 回退到指定的 commit，暂存区和工作区内容是否变化取决于 mode 设定：
  #         --soft   只回退 HEAD 指针到指定 commit，不影响 index 和工作目录
  #         --mixed  默认项，重置 index 但不会影响工作目录内容
  #         --hard   重置暂存区和工作目录，全部回到指定 commit 时的状态，会丢失工作内容

$ git revert <commit>  # 生成一次新的提交来撤销某个指定 commit，reset 会丢失提交记录，而 revert 不会

# rebase 变基会修改 commit 变更历史
$ git rebase origin/master      # 以变基的形式合并分支
$ git rebase --continue         # 如变基出现冲突，冲突解决后继续
$ git rebase --skip             # 如变基出现冲突，也可以直接跳过这步的 commit 继续 reapply 下一个 commit
$ git rebase --abort            # 取消变基操作
$ git rebase -i HEAD~commit_count # 批量修改 commit message 很好用
$ git rebase --onto master topicA topicB  # 更换 topicB 的上游分支 topicA 为 master 分支，具体见使用文档

# reset（回退） 用于私人分支，revert（撤销） 用于公共分支，rebase（变基） 适用于还没有 push 的提交
```

#### 查询操作

```bash
$ git ls-remote  # List references in a remote repository
  # -h --heads     # 列出远端分支信息
  # -t --tags      # 列出远端标签信息

# diff 显示不同提交之间，提交与工作目录，暂存区与工作目录之间的差别
# meld 提供了图形化显示比较信息，使用前须配置(见上文配置部分)
$ git diff                 # 查看工作目录与暂存区的差异
$ git diff --staged        # 查看暂存区与最近一次提交之间的差异
$ git diff master branchB  # 比较两个不同提交之间的差异，此处的不同分支指向不同的提交
$ git difftool             # 不想使用内置的 git diff 时，启动一个外部工具来显示差异
# 注1 阮一峰的 diff 讲解：http://www.ruanyifeng.com/blog/2012/08/how_to_read_diff.html
# 注2 git show 默认会调用 git diff，而 git log 只有在提供 `-p` 或 `--name-only` 等选项时才会调 git diff

# 显示工作目录状态
$ git status               # 显示当前状态
$ git status -s            # 以简洁的形式显示当前状态，`-s` 同 `--short` 参数

# log 显示提交历史
$ git log                       # 显示当前分支的提交记录
$ git log --graph               # 图形化展现提交历史，即左侧有树状图案
$ git log --oneline             # 显示提交记录，每条记录只占一行
$ git log --grep=<pattern>      # 过滤输出记录
$ git log --follow <file>       # 跟踪一个文件的修改历史，包括重命名前后的情况
$ git log --all -- path/to/file # 查找单个文件的提交历史，--all 选项可以找出已删除文件的提交历史
$ git log -L <start>,<end>:<file>  # 跟踪 file 文件的特定部分的变更记录，参数可以是行号或者正则
$ git log -L "/function ajax/",/}/:main.js  # 跟踪 main.js 文件中的 ajax 函数的变更记录, 正则有空格的要带引号
$ git log --pretty="%h %s"  # 精细输出格式

# blame 是调试指令，可以跟 log 指令配合使用
$ git blame -L 12,22 sth.cs     # 查看 sth.cs 的 12-22行 都有谁在什么时候做了哪些修改

$ git show     # 查看数据对象 blob 数对象 tree 提交对象 commit 标签对象 tag 等的内容

# 周工作量统计
$ git log --author="gavin" --since=2018-1-1 --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

#### 分支操作

```bash
# branch 列出/创建/删除分支
$ git branch                    # 列出本地分支
  # `-r` 列出远程分支，`-a` 列出本地 + 远程分支, `-v` 显示详细信息
$ git branch testing            # 创建 testing 分支
$ git branch -d testing         # 删除 testing 分支
$ git branch -m [<oldbranch>] <newbranch>  # 重命名分支
$ git branch --set-upstream master origin/next  # 手动建立本地 master 与 origin/next 间的追踪关系
$ git fetch -p  # 当删除远程分支后，本地还是能看到 origin/branchname，就可以通过这条命令删除

# checkout 切换分支或恢复工作目录文件
$ git checkout <branch-name>    # 切换到某个分支
$ git checkout HEAD~2           # 往回退2个commit，这对于快速查看项目旧版本来说非常有用
  # 此时工作在 detached HEAD 模式，所做的修改在切换到普通分支后将无法找回，除非你新建分支 checkout -b
$ git checkout -b newBrach origin/master  # 在 fetch 下来的 origin/master 的基础上创建一个新分支
$ git checkout <files>          # 从最近的一次提交中取回文件并覆盖工作目录中的文件
  # 示例  git checkout -- a.txt b.txt  /  git checkout -- "path/to/*.txt"

$ git merge origin/master       # 将刚拉取下来的 master 合并到本地分支
$ git merge topic               # 合并 topic 分支内容到当前分支
$ git merge --no-ff future-name # 合并 future 分支到 master 分支，且不允许 fast-forward
```

#### 远程同步

```bash
# Fetch branches and/or tags (collectively, "refs") 
$ git fetch <远程仓库名>  # 获取远程仓库所有更新内容，取回内容通过 远程仓库名/分支 读取
$ git fetch <远程仓库名> <分支名>  # 仅获取特定分支的更新内容，然后可 merge 也可 checkout -b
$ git fetch origin master # 获取 origin 仓库的 master 分支，取回的内容要用 origin/master 读取
$ git fetch origin +pu:pu maint:tmp  # 获取 origin 仓库的 pu 和 maint 分支，并更新/新建本地 pu tmp 分支
  # pu 前的 + 加号表示，即使不能 fast-forward 也强制更新(自动 merge)

$ git pull <远程仓库名> <远程分支名>:<本地分支名>
$ git pull           # 获取最新版本并合并，相当于 `git fetch` + `git merge`
$ git pull --rebase  # 相当于 `git fetch` + `git rebase --onto`，推荐使用这种方式
$ git pull origin next:master
$ git pull -p  # `-p` 告诉 pull 如果远程仓库已经删除了该分支，那么可以将本地分支删除

$ git push [选项] <远程仓库名> <本地分支>:<远程分支>
    # --all 推送所有分支
    # -f | --force 如果远程仓库比本地版本新，Git 会报错，用 --force 可强制覆盖
    # -u | --set-upstream 
    # -d | --delete
    # --prune 如果远程仓库存在本地没有的分支，就将其删除
    # --tags  在 push 时一并更新标签（默认不会推送标签）
$ git push -u origin master    # 将本地的 master 分支推送到 origin/master 并添加跟踪关系
$ git push -d origin master    # 删除远程 master 分支
$ git push origin              # 如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略
$ git push                     # 如果当前分支只有一个追踪分支，那么仓库名都可以省略

$ git push origin HEAD:master  # 将当前分支推送到 origin/master
$ git push origin     :master  # 推送一个空的分支到 origin/master，即相当于删除远程 master 分支

# 管理远程仓库
$ git remote -v                     # 列出所有远程仓库别名，并显示网址
$ git remote add <仓库别名> <网址>  # 添加远程仓库
$ git remote rm <仓库别名>          # 删除一个仓库别名，并一同删除本地的相关分支内容和配置
$ git remote show <仓库别名>        # 查看远程仓库的详细信息
$ git remote rename <原仓库名> <新仓库名>  # 修改指向远程仓库的别名

  # 实现一个 git push 同时推送到多个远程仓库
  $ git remote set-url --add --push origin git://original/repo.git
  $ git remote set-url --add --push origin git://another/repo.git
```

#### 暂存 stash

```bash
# stash 藏匿/储存变动
$ git stash    # 临时保存还没有提交的工作(工作目录 + 暂存区)并恢复到初始状态，注意未 track 的新文件还留在工作目录
$ git stash list  # 列出所有 stash
$ git stash pop   # 恢复最近一次 stash 的内容，注意是保存的变动追加在目前状态之上，而非覆盖目前状态
$ git stash apply # 恢复最近一次 stash 的内容，与 pop 的区别是，pop 之后该 stash 就删除了，而 apply 则不删
$ git stash show stash@{1} # 查看最近的第二次 stash 的具体内容
$ git stash show -p        # --patch 显示 stash@{0} 的详细内容
$ gitk stash               # 使用图形界面查看 stash@{0} 的详细内容
$ git stash branch <branchname> [<stash>]  # 根据 stash 生成新的分支以还原当时现场
$ git stash drop  # 删除最近一次 stash
$ git stash clear # 清空所有 stash 的内容
```

#### 标签 tag

```bash
# tag 创建/列出/删除/修改 标签对象
$ git tag -a v1.4 -m 'version 1.4'  # 创建一个附注标签 annotated，包含创建时间、创建者等详细信息
$ git tag v1.4                      # 创建一个轻量标签 lightweight，不包含详细信息，适用于临时标签
$ git show v1.4                     # 查看标签信息
$ git tag -a v1.2 9fceb02           # 给历史提交补打标签，需提供 SHA-1 校验值
$ git tag -d v1.4                   # 删除一个标签
$ git tag -f v1.4                   # 删除原有的 v1.4 标签重新在当前提交上打标签
$ git tag                           # 查看本地标签
$ git ls-remote --tags origin       # 列出远端所有标签
$ git push origin v1.5              # git push 命令并不会传送标签, 你必须显式地推送标签到远程服务器
$ git push origin --tags            # 也可以一次性推送所有不在远程服务器上的标签
$ git push -d origin <tagname>      # 删除远端标签
$ git push origin :tagname          # 删除远端标签
# Git 中你并不能真的检出一个标签，因为它们并不能像分支一样来回移动。如果你想要工作目录与仓库中特定的标签版本完全一样，可以使用 `git checkout -b [branchname] [tagname]` 在特定的标签上创建一个新分支：
$ git checkout -b version2 v2.0.0
```

#### 其他操作

```bash
# clean 清理工作目录
$ git clean         # 从工作区中移除未跟踪的文件，.gitignore 中文件不受影响
$ git clean -X      # 移除未跟踪的文件和目录，.gitignore 中的文件也会一并移除
$ git clean -df     # 移除未跟踪的文件和目录
$ git clean <path>  # 在 path 范围内移除未跟踪的文件

# ls-files 显示暂存区和工作目录内文件的信息
$ git ls-files -u      # 显示冲突的文件，-s 则显示标记为冲突已解决的文件
$ git ls-files --stage # 检查保存在 stage 的文件

$ git cat-file -p d67046  # 查看一个 Git 对象的内容，用于研究 Git 内部机制
```

#### 图形化操作

在安装 Git 的同时，你也装好了它提供的可视化工具，gitk 和 git-gui。

```bash
$ git gui      # 调出图形界面

$ gitk [git log options]                  # 调用图形界面查看历史提交的详细信息
$ gitk stash                              # 查看 stash 的详细变更信息
$ git config --global gui.encoding utf-8  # 解决 gitk 中文乱码
```

**gitk**

```bash
$ gitk --first-parent    # 查看存在频繁合并的分支记录非常有用
```

gitk 是一个历史记录的图形化查看器。你可以把它当作是基于 `git log` 和 `git grep` 命令的一个强大的图形操作界面。当你需要查找过去发生的某次记录，或是可视化查看项目历史的时候，你将会用到这个工具。

常用操作：
  * 查看合并记录的文件变更 - 选中父提交并在当前合并提交右键调出 `Diff selected -> this`
  * 利用外部工具查看具体文件变更 - 选择单个文档，右键调出 `External diff`

#### GitHub 操作

```bash
# 在 GitHub 上先新建项目仓库，然后
$ git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/ooboqoo/primeng-webpack.git  # 如果是现有项目，可以直接从这开始
git push -u origin master  # -u / --set-upstream 具体讲解如下：
```

一般只有同时存在多个远程仓库时才会用到--set-upstream。每个git branch可以有个对应的upstream。假设你有两个upstream，分别叫server1和server2，本地master branch的upstream是server1上的master，那么当你不带参数直接输入git pull或者git push时，默认是对server1进行pull/push。如果你成功运行"git push -u server2 master"，那么除了本地branch会被push到server2之外，还会把server2设置成upstream。

### 配置 .gitignore

文件 .gitignore 的格式规范如下：

* 所有空行或者以 `#` 开头的行都会被 Git 忽略。
* 可以使用标准的 glob 模式匹配，如 `*.[oa]` 会匹配以 .o 或 .a 结尾的文件。
* 匹配模式可以以 `/` 开头防止递归。
* 匹配模式可以以 `/` 结尾指定目录。
* 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号 `!` 取反。

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

#### .gitkeep

这只是个空文件，貌似也不是官方的用法，而更像是一个 hack，目的就是让 git 忽略其所在目录的同时保留该空目录。

## Git 流程规范化

http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html   
http://www.ruanyifeng.com/blog/2015/12/git-workflow.html   
https://cattail.me/tech/2016/06/06/git-commit-message-and-branching-model.html   

### Commit message 规范化

Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。

```bash
$ git commit -m "hello world"  # -m 参数，就是用来指定 commit mesage 的
$ git commit                   # 如果一行不够，可以只执行 git commit，就会跳出文本编辑器，让你写多行。
```

Commit message 内容可以随便写，但一般来说，应该清晰明地说明本次提交的目的。

目前，社区有多种 Commit message 的写法规范，其中 Angular 规范是目前使用最广的写法，比较合理和系统化，并有配套的工具。

#### Commit message 的作用

* 提供更多的历史信息，方便快速浏览
* 可以直接从 commit 生成 changelog (见下文)

```bash
$ git log <last tag> HEAD --pretty=format:%s  # 利用 pretty 配置单行显示
$ git log <last release> HEAD --grep feature  # 利用 grep 筛选
```


#### Angular 规范

##### Commit Message Format

```
<type>(<scope>): <subject>     # 必填，其中的 scope 是可选的
    // 空一行                      # 每行长度不的超过 100 个字符
<body>                         # 可选
    // 空一行
<footer>                       # 可选
```

##### Type

|||
|---------|------------------------------------------------------------------------------------------
| `feat`  | 新功能 A new feature
| `fix`   | bug 修复 A bug fix
| `docs`  | 文档 Documentation only changes
| `style` | 格式调整 Changes that do not affect the meaning of the code (white-space, formatting, etc)
| `refactor` | 重构 A code change that neither fixes a bug nor adds a feature
| `perf`  | 性能优化 A code change that improves performance
| `test`  | 测试 Adding missing tests or correcting existing tests
| `build` | 编译配置 Changes that affect the build system, CI configuration or external dependencies
| `chore` | 杂项 Other changes that don't modify src or test files

##### Scope

用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

##### Subject

subject 是 commit 目的的简短描述，写法上须注意以下几点：

* 以动词开头，使用第一人称现在时: `change` not `changed` nor `changes`
* 首字母不要用大写
* 末尾不要叫句号 `.`

##### Body

##### Footer

Footer 部分只用于两种情况：不兼容变动 和 关闭 issues。

不兼容变动以 `BREAKING CHANGE:` 开头，后面是对变动的描述以及变动理由和迁移方法。

如果提交修复了 issue，那么以 `Closes` 开头，后面跟 Issue编号，如 `Closes #123, #321`

```txt
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.

Closes #123, #245, #992
```


##### Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以 `revert:` 开头，后面跟着被撤销 Commit 的 Header。

Body 部分的格式是固定的，必须写成 `This reverts commit <hash>`，其中的 hash 是被撤销 commit 的 SHA 标识符。

```txt
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

#### Commitizen

Commitizen是一个撰写合格 Commit message 的工具。安装及使用方法如下：

```bash
$ npm install -g commitizen  # 全局安装
$ commitizen init cz-conventional-changelog --save-dev --save-exact  # 初始化项目 commitizen 相关配置
$ git cz      # 以后，凡是用到 git commit 命令的地方一律改为使用 git cz
```

使用中发现输入多行 description 时，不知道怎么换行，Ctrl/Shift + Enter 试了都不行，最后发现应该用 `\n\n` 这样是能解决换行问题，但对其处理不直观，所以多行输入还是 `git commit` 调出文本编辑器来编辑比较靠谱。

#### 生成 changelog

如果所有 Commit 都符合 Angular 格式，那么发布新版本时，changelog 就可以用脚本自动生成，为了方便使用，可以将命令写入 package.json 的 scripts 字段。

特别注意，CLI 需要 tag 来区分不同阶段，而且 tag 的格式一定要对，要是把 v0.1.0 写成 v0.1 就不认。所以完整步骤是：
  * conventional-changelog 生成 CHANGELOG.md
  * 更新 package.json 中版本号
  * commit 更改内容
  * 给 commit 打上版本号，如 `git tag -a v0.1.0 -m "Initial testing release."`

```bash
$ npm install -g conventional-changelog-cli
$ cd my-project
# 方式1：在 CHANGELOG.md 的头部加上自从上次发布以来的变动
$ conventional-changelog -p angular -i CHANGELOG.md -s
# 方式2：生成所有发布的 Change log
$ conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

### Git flow

简单说，git-flow 就是在 `git branch` `git tag` 基础上封装出来的代码分支管理模型，把实际开发模拟成 master develop feature release hotfix support 几种场景，其中 master 和 develop 是长期分支，分别对应 线上 和 开发，而其他几个则是临时分支。

* master  - 永远处于即将发布状态
* develop - 最新的开发状态
* feature - 开发新功能的分支，基于 develop，完了 merge 回 develop 分支
* release - 准备要发布版本的分支，用来修复 bug，完成后 merge 回 develop 和 master
* hotfix  - 修复 master 上的 bug，基于 master，完成后 merge 回 develop 和 master
* support - 测试版本，不建议使用

```txt
$ git flow -| init    
            | feature | | strat   |- NAME
            | bugfix  | | finish  |
            | release |-| publish |
            | hotfix  | | track   |
            | support | | pull    |
            | version   | delete  |
            | config    | [list]
            | log     
```

```bash
# 帮助
$ git flow <subcommand> help

# 初始化项目
$ git flow init  # 先建好 master 和 develop 分支，然后输入此行命令，再一路回车完成

# 特性开发
$ git flow feature start MYFEATURE   # 开始新特性开发
  $ git add .
  $ git cz
$ git flow feature finish MYFEATURE  # 完成新特性开发

# 特性开发 - 协作开发补充指令
$ git flow feature publish MYFEATURE      # 将分支推送到服务器供多人协同开发
$ git flow feature pull origin MYFEATURE  # 获取他人建立的服务器特性分支
$ git flow feature track MYFEATURE        # 同上行

# bug 修复
$ git flow bugfix start BUGFIX    # 如 git flow bugfix start #1123
$ git flow bugfix finish BUGFIX

# 准备发布版本
$ git flow release start RELEASE [BASE]   # 如 git flow release start 1.0.1
  # 可选参数 BASE，可以指定基于 develop 的某个特定提交记录 sha-1 hash 来开启动 release 分支
$ git flow release publish RELEASE        # 创建分支后立即发布以允许其它用户向这个 release 分支提交内容
$ git flow release track RELEASE          # 协作者拉取分支
$ git flow release finish RELEASE         # 完成发布版本，此时会自动用分支名打 tag
```


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


## Git Server

教程：https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server

```bash
# 远程主机
$ mkdir website.git && cd website.git
$ git init --bare  # 创建裸仓库(一个不包含当前工作目录的仓库)

# 本地仓库操作
$ git remote add web ssh://root@104.128.85.201:28379/opt/git/website.git
$ git push web
```

搭建私人自用的 git 服务器就这么简单，最关键的是要设置好 SSH。

## 使用 git 自动部署 web 服务器

教程：http://toroid.org/git-website-howto

The one-line summary:  
push into a remote repository that has a detached work tree, and a post-receive hook that runs "git checkout -f".

```bash
# 远程主机操作
$ mkdir ooboqoo.github.io.git && cd ooboqoo.github.io.git
$ git init --bare  # 创建裸仓库(一个不包含当前工作目录的仓库)

$ cat > hooks/post-receive  # 操作目录还是位于 ooboqoo.github.io.git
#!/bin/sh
GIT_WORK_TREE=/var/www/ooboqoo.github.io git checkout -f
$ chmod +x hooks/post-receive

$ mkdir /var/www/ooboqoo.github.io  # 创建web服务器目录
$ vi /etc/httpd/conf/httpd.conf     # 修改 Apache 相关配置

# 本地仓库操作
$ git remote add web ssh://root@45.32.60.84:22/opt/git/ooboqoo.github.io.git
$ git push web  # 完成站点部署/更新，打开浏览器验证下吧！
```


## Git 进阶

### git merge 与 git rebase

merge 可以理解成是 多源继承，操作简单，future 分支合入 master 时也比较直观。但碰到多分支同时开发时，合来合去，很难跟踪变更记录，借助 `gitk --first-parent` 可有效改善跟踪体验。

rebase 确保了单源继承，提交历史清晰直观，但如果一个分支多人同时开发时，如果你用 rebase 合了最新 master 代码，那么其他同事都必须得用 `git pull --rebase` 拉取代码，对使用能力有一定要求。

#### 查看 merge 信息

https://stackoverflow.com/questions/37801342/using-git-log-to-display-files-changed-during-merge

在 `gitk` 中点击某次 commit 时，调用的 `git show` 来显示具体提交信息的。至于具体的文件变更，则要进一步调用 `git diff` 来提取信息。对于普通的提交，碰不到啥问题，但是对于 Merge 提交，处理方式跟普通提交存在较大差异。

一次 merge commit 存在两个或多个 parents，这就意味着 `git log` `git show` 需要跑两次或多次 `git diff`。但实际上，`git show` 确实会这么做，但还会进一步处理为 [combined diff](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/git-diff-tree.html#_combined_diff_format)(which shows only those files whose merge-commit version differs from both parents.)。`git log` 碰到有多个 parents 的合并提交，即使提供了 `-p` 或 `--name-status` 等开启 diff 的参数，也会忽略，只有碰到 `-m` 参数才会执行 `git diff`。

> Using `-m` by itself always works. This flag essentially tells `git log` (and `git show`) to break up a merge into multiple separate "virtual commits". That is, if commit M is a merge with parents P1 and P2, then—for the purpose of the diff at least—Git acts as though there was a commit MP1 with parent P1, and a second commit MP2 with parent P2. You get two diffs (and two commit IDs in the diff headers).
> 
> Besides `-m`, you can supply `-c` or `--cc` to `git log` to get it to produce a combined diff, just like `git show`.

```bash
$ git log -m --oneline --follow -- <filename>  # 追踪文件变更记录，不带 `-m` 无法看到合并中的更改
$ git log -m -p --oneline --merges --follow -- <filename>  # 排查某个文件合并中出现的问题，显示具体变更内容
```

