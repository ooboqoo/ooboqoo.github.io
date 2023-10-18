# Linux 系统设置

## 基本配置

### 配置文件位置

* `/etc/profile.d` - 配置全局环境变量，添加个 .sh 文件，里面的设置会被 /etc/profile 读取，影响所有用户
* `~/.bash_profile` - 保存用户配置，只在登录时执行一次，此文件会调用 .bashrc，适合存放环境变量和初始化用的代码
* `~/.bashrc` - 保存用户配置，每开一个命令窗口都会执行一遍，命令别名等应放此处

```sh
# .bash_profile

# User specific environment and startup programs
export PATH=$PATH:$HOME/bin
export LANG="en_US.UTF-8"
export TERM="xterm-256color"
export CLICOLOR=1

export html="/var/www/html"
cd $html

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
```

注：没有 `export` 的自定义变量或者给环境变量赋的新值，作用域仅限于当前 shell，子 shell 中看不到。

```sh
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
fi

# User specific aliases and functions
alias ll='ls -lA'
alias gitpush='git add . && git commit -m "update" && git push $*'
```


#### 时区设置

```bash
$ date                                                     # 查看当前时间
$ ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime  # 修改设置
$ shutdown -r 0                                            # 重启使所有应用都使用最新时间设置
```

#### 颜色设置

```bash
# ~/.bash_profile
export TERM="xterm-256color"
export CLICOLOR=1      # Set CLICOLOR if you want Ansi Colors

# ~/.vimrc
set t_Co=256
```

#### 语言设置

```bash
$ locale            # 查看地域偏好设置
$ LANG=en_US.UTF-8  # 临时设置环境变量，重新登录失效

# ~/.bash_profile   # 修改配置文件，影响以后每次登录
export LANG="en_US.UTF-8"
```

#### 其他偏好配置

```bash
# ~/.bash_profile
export PS1="\[\e[0;32m\]\u@\h \W $ \[\e[m\]"  # 自定义提示符 `man bash` 可查看详细说明
  # \[ \] - 如果要用控制字符，务必用\[和\]包裹，否则算行宽度时会出错，导致不换行等问题
  # \u – Username \h – Hostname \w – Full path of the cwd
  # \e[  – Indicates the beginning of color prompt
  # x;ym – Indicates color code. Use the color code values mentioned below.
  # \e[m – indicates the end of color prompt
```

详细的终端颜色配置说明 http://misc.flogisoft.com/bash/tip_colors_and_formatting

再附一篇教程：https://www.ibm.com/developerworks/linux/library/l-tip-prompt/


## macOS

### DNS

修改 _/etc/hosts_ 文件后，使用 `dig` `host` `nslookup` 等工具是无法看到效果的，they bypass the system's resolver and do row DNS lookups.

```bash
# 清理 NDS 缓存
$ sudo killall -HUP mDNSResponder

# 查询 DNS 解析结果

# The official way to do a lookup through the system resolver in macOS
$ dscacheutil -q host -a name www.example.com
# or just use `ping` instead for quick 
$ ping www.example.com
```

#### Search Domains

https://superuser.com/questions/184361/what-is-the-search-domains-field-for-in-the-tcp-ip-dns-settings-control-panel

DNS searches can only look at a Fully Qualified Domain Name, such as `mymachine.example.com.` But, it's a pain to type out mymachine.example.com, you want to be able to just type `mymachine`.

Using Search Domains is the mechanism to do this. If you type a name that *does not end with a period*, it knows it needs to add the search domains for the lookup. So, lets say your Search Domains list was: `example.org`, `example.com`

1. 输入 `mymachine` (注意：最后不能出现 `.`)
2. 系统尝试 `mymachine.example.org`
3. 如果没找到再尝试 `mymachine.example.com`

