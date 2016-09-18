# Linux 系统配置

## 基本配置

时区设置

```bash
date                                                     # 查看当前时间
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime  # 修改设置
shutdown -r 0                                            # 重启使所有应用都使用最新时间设置
```

语言设置

```bash
locale                   # 查看地域偏好设置
export LANG=en_US.UTF-8  # 临时设置环境变量，重新登录失效
# ~/.bash_profile        # 修改配置文件，影响以后每次登录
LANG='en_US.UTF-8'
```

其他偏好配置

```bash
# ~/.bash_profile    # System wide environment and startup programs, for login setup
html='var/www/html'
cd $html

# ~/.bashrc          # System wide functions and aliases
alias cp='cp -i'
alias ll='ls -lA'
```