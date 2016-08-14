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

### Git Cheat Sheet [.pdf](https://services.github.com/kit/downloads/github-git-cheat-sheet.pdf)

<tag>div class=dl</tag>

#### CONFIGURE TOOLING
Configure user information for all local repositories
##### $ git config --global user.name "[name]"
Sets the name you want atached to your commit transactions
##### $ git config --global user.email "[email address]"
Sets the email you want atached to your commit transactions
##### $ git config --global color.ui auto
Enables helpful colorization of command line output

#### CREATE REPOSITORIES
Start a new repository or obtain one from an existing URL
##### $ git init [project-name]
Creates a new local repository with the specified name
##### $ git clone [url]
Downloads a project and its entire version history

#### MAKE CHANGES
Review edits and craf a commit transaction
##### $ git status
Lists all new or modified files to be commited
##### $ git add [file]
Snapshots the file in preparation for versioning
##### $ git reset [file]
Unstages the file, but preserve its contents
##### $ git diff
Shows file differences not yet staged
##### $ git diff --staged
Shows file differences between staging and the last file version
##### $ git commit -m "[descriptive message]"
Records file snapshots permanently in version history

#### GROUP CHANGES
Name a series of commits and combine completed efforts
##### $ git branch
Lists all local branches in the current repository
##### $ git branch [branch-name]
Creates a new branch
##### $ git checkout [branch-name]
Switches to the specified branch and updates the working directory
##### $ git merge [branch]
Combines the specified branch’s history into the current branch
##### $ git branch -d [branch-name]
Deletes the specified branch

#### REFACTOR FILENAMES
Relocate and remove versioned files
##### $ git rm [file]
Deletes the file from the working directory and stages the deletion
##### $ git rm --cached [file]
Removes the file from version control but preserves the file locally
##### $ git mv [file-original] [file-renamed]
Changes the file name and prepares it for commit

#### SUPPRESS TRACKING
Exclude temporary files and paths: \*.log build/ temp-\*   
A text file named .gitignore suppresses accidental versioning of files and paths matching the specified paterns
##### $ git ls-files --other --ignored --exclude-standard
Lists all ignored files in this project

#### SAVE FRAGMENTS
Shelve and restore incomplete changes
##### $ git stash
Temporarily stores all modified tracked files
##### $ git stash list
Lists all stashed changesets
##### $ git stash pop
Restores the most recently stashed files
##### $ git stash drop
Discards the most recently stashed changeset

#### REVIEW HISTORY
Browse and inspect the evolution of project files
##### $ git log
Lists version history for the current branch
##### $ git log --follow [file]
Lists version history for a file, including renames
##### $ git diff [first-branch]...[second-branch]
Shows content differences between two branches
##### $ git show [commit]
Outputs metadata and content changes of the specified commit

#### REDO COMMITS
Erase mistakes and craf replacement history
##### $ git reset [commit]
Undoes all commits afer [commit], preserving changes locally
##### $ git reset --hard [commit]
Discards all history and changes back to the specified commit

#### SYNCHRONIZE CHANGES
Register a repository bookmark and exchange version history
##### $ git fetch [bookmark]
Downloads all history from the repository bookmark
##### $ git merge [bookmark]/[branch]
Combines bookmark’s branch into current local branch
##### $ git push [alias] [branch]
Uploads all local branch commits to GitHub
##### $ git pull
Downloads bookmark history and incorporates changes

<tag>/div</tag>

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

## cmder (Yeoman recommend)

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

学习时碰到的一些好的文章教程  
GotGitHub 电子书在线阅读：[GotGitHub](http://www.worldhello.net/gotgithub/index.html)  
文科妹子的 github [知乎回答](https://www.zhihu.com/question/20070065)
