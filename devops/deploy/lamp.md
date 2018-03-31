# LAMP / LEMP

LAMP = Linux + Apache + MySQL + PHP, LEMP = Linux + Nginx + MySQL + PHP


## Apache

### 多站点配置

正常是要单独建立 httpd-vhosts.conf 配置文件的，这里图省事，直接全部放 /etc/httpd/conf/httpd.conf

```text
# 先修改原配置，修改前为 "/var/www/html"
DocumentRoot "/var/www"

# 然后添加以下配置
<VirtualHost *:80>
    ServerName www.ngapps.cn
    DocumentRoot "/var/www/ooboqoo.github.io"
</VirtualHost>

<VirtualHost *:80>
    ServerName jpn.ngapps.cn
    DocumentRoot "/var/www/html"
</VirtualHost>

<Directory "/var/www/ooboqoo.github.io">
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>
```

### SSL 连接设置

教程，其他再看看：http://www.blogdaren.com/post-228.html


## Nginx

详细配置参见单独的 Nginx 笔记。

```bash
$ yum install nginx 
$ yum install php-fpm  # 提供 php 调用接口

$ systemctl enable nginx php-fpm  # 设置开机启动
$ systemctl start nginx php-fpm   # 先进行配置，然后执行此命令启动服务
```

```bash
$ nginx                                     # 启动
$ nginx -s [stop | quit | reload | reopen]  # 启动后就可以通过 -s 执行后续操作了
```


## MySQL

http://cnzhx.net/blog/centos-rhel-install-lamp-phpmyadmin/

### 安装及启动

```bash
# 安装
$ yum install mariadb-server mariadb  # MariaDB 数据库管理系统替代原 MySQL

# 配置编码
$ vim /etc/my.cnf　 # 编辑 MySQL 的配置文件，添加：
    # [mysqld] default-character-set = utf8　// 设置默认编码 MySQL 用
    # [mysqld] character_set_server=utf8     // 设置默认编码 MariaDB 用

# 启动服务
$ systemctl start/stop/restart mariadb  // 启动/停止/重启 MariaDB
$ systemctl enable mariadb   // 设置开机启动
$ systemctl status mariadb   // 查看服务状态信息
```

### 初始环境设定

#### 设置根账户密码

为 root 用户设置密码，root 用户默认是没有密码的。

```bash
$ mysql -u root    # 用 root 用户登录 MySQL 服务器
```

```sql
mysql> select user,host,password from mysql.user;    # 查看用户信息
mysql> set password for root@localhost=password('在这里填入root密码');    # 设置root密码
mysql> set password for root@'sample.centospub.com'=password('在这里填入root密码');    # 设置root密码
mysql> select user,host,password from mysql.user;    # 查看用户信息
mysql> exit    # 退出MySQL服务器
```

#### 删除匿名用户

MySQL 初始安装存在用户名、密码为空的用户。这使得数据库服务器有无需密码被登录的可能性。为消除隐患，将匿名用户删除。

```sql
select user,host from mysql.user;　     -- 查看用户信息
delete from mysql.user where user='';　 -- 删除匿名用户
```

### 安装 phpMyAdmin

```bash
$ yum -y install phpmyadmin
```

/etc/httpd/conf.d/phpMyAdmin.conf

```text
# Apache 2.4 // 需要改两处
  <RequireAny>
    # Require ip 127.0.0.1
    # Require ip ::1
    Require all granted
  </RequireAny>
```

```bash
$ systemctl restart httpd.service    # 重启 httpd
```

Now open http://serverIP/phpmyadmin in your browser. You can login using root as username and mysql root password.

```php
// 修改 /etc/phpMyAdmin/config.inc.php
$cfg['Servers'][$i]['AllowNoPassword'] = TRUE;  // 允许 phpMyAdmin 无密码登录
```


## 搭建 Discuz 论坛

### Nginx + PHP + MySQL

/etc/nginx/nginx.conf

```text
    server {
        listen         80;
        server_name    www.hjsc.ren hjsc.ren;
        root           /var/www/hjsc.ren;
    }

    server {
        listen         80;
        server_name    bbs.hjsc.ren;
        root           /var/www/hjsc.ren/bbs;
        location ~ \.php$ {
            fastcgi_pass     127.0.0.1:9000;
            fastcgi_index    index.php;
            fastcgi_param    SCRIPT_FILENAME   $document_root$fastcgi_script_name;
            include          fastcgi_params;
        }
    }
```

数据库配置

```bash
$ 
```

### Discuz

```bash
# 安装包下载并解压
$ cd hsjc.ren
$ wget http://download.comsenz.com/DiscuzX/3.4/Discuz_X3.4_SC_GBK.zip
$ unzip Discuz_X3.4_SC_GBK.zip
$ mv upload bbs
$ cd bbs; chmod -R 777 data config uc_client uc_server

# 通过浏览器登录设置 http://bbs.hjsc.ren/install/index.php
```
