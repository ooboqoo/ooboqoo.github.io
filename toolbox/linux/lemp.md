# LAMP/LEMP 服务器部署

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


## Nginx

### 安装

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


### 配置

http://nginx.org/en/docs/beginners_guide.html

配置文件位置：/etc/nginx/nginx.conf

```
http {
    client_max_body_size 120M;                     ## 支持大文件上传
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  www.ngapps.cn;
        root         /var/www/ooboqoo.github.io;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location /api {                            ## 配置反向代理
          proxy_pass  http://127.0.0.1:3300;
        }

        location ~ \.(jpg|jpeg|png|ico|js|css)$ {  ## 配置缓存时间
            expires 30d;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

    server {
        listen       80;
        server_name  jpn.ngapps.cn;
        root         /var/www/html;
        location ~ \.php$ {                        ## 配置支持 php
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
    }
}
```


### 部署 HTTPS

https://letsencrypt.org/getting-started/   
https://linuxstory.org/deploy-lets-encrypt-ssl-certificate-with-certbot/ 此文章值得参考下

```bash
$ yum install certbot       # 安装 Let's Encrypt 官方证书配置工具(自动化的获取、部署和更新安全证书)
$ certbot certonly          # 安装 ssl 证书，需要根据具体情况回答问题，也可以像下面那样提前设置答案
$ certbot certonly --webroot -w /var/www/example -d e.com -d www.e.com -w /var/www/thing thing.cn
$ certbot renew --dry-run   # 测试能否自动更新证书
# 添加包含左侧命令到一个 cron or systemd job 建议每天随机运行2次
$ certbot renew --quiet --post-hook "nginx -s reload"
```

然后更新 Nginx 配置文件，添加

```
listen 443 ssl;
server_name ngapps.cn www.ngapps.cn;
root  /var/www/ngapps.cn;

ssl_certificate      /etc/letsencrypt/live/ngapps.cn/fullchain.pem;
ssl_certificate_key  /etc/letsencrypt/live/ngapps.cn/privkey.pem;
```

还可以更进一步，将所有到 80 端口的普通访问进行跳转

```
server {
    listen 80;
    server_name ngapps.cn www.ngapps.cn;
    return 301 https://$server_name$request_uri;
}
```

### 启用 gzip 压缩

新建 /etc/nginx/conf.d/gzip.conf 并添加以下内容：

```
gzip            on;   # 启用 gzip 压缩功能
gzip_vary       on;   # 
gzip_comp_level 3;    # 压缩级别1-9，1压缩比最小速度最快
gzip_proxied    any;  # 做前端代理时启用该项，表示无论后端服务器的headers头返回什么信息，都启用压缩
gzip_min_length 1024; # 最小压缩的页面，如果页面过于小，可能会越压越大，这里规定大于1K的页面才启用压缩

# 需压缩的 MIME 类型, application/octet-stream 是针对 .md 文件的，另外 text/html 是默认添加的，加了反而报重
gzip_types text/plain text/css application/json application/javascript application/octet-stream;
```

测试配置是否生效：

```bash
# You should see content-encoding: gzip
curl -H "Accept-Encoding: gzip" -I http://www.ngapps.cn/
```

### location 写法

```
location  [=|~|~*|^~] /uri/  {...}
```

location modifier

* (None) 不写，匹配以指定的 pattern 开头的 URI
* `=` 精确的URI匹配(注意 url 和 uri 的区别)
* `~` 区分大小写的正则匹配
* `~*` 不区分大小写的正则匹配
* `^~` 正则匹配以指定 pattern 开头的 URI


## Tomcat


## MySQL

http://cnzhx.net/blog/centos-rhel-install-lamp-phpmyadmin/

### 安装及启动

```bash
# 安装
$ yum install mariadb-server mariadb  # MariaDB 数据库管理系统替代原 MySQL

# 配置编码
$ vim /etc/my.cnf　 # 编辑MySQL的配置文件，添加：
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

```
[root@sample ~]# mysql -u root    # 用root用户登录MySQL服务器
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


## NodeJS + MongoDB + PM2

http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/

直接使用 `yum install` 安装的包相对比较老(稳定)些，如果需要安装最新的版本，需要手动配置软件源：

```bash
# 下载并执行 NodeJS 配置脚本
$ curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -
# 配置 MongoDB 源
$ cat > /etc/yum.repos.d/mongodb-org-3.4.repo
  [mongodb-org-3.4]
  name=MongoDB Repository
  baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
  gpgcheck=1
  enabled=1
  gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc  Ctrl+D
```

最后执行安装：

```bash
$ yum install -y nodejs mongodb-org   # mongod 安装时会自己设置开机启动，但首次需手动启动
$ node -v   # 查看 node 版本
$ mongo     # 跑下 mongodb shell

$ npm install pm2 typescript -g
```


### Koa 自动部署

```bash
$ mkdir koa-mongo.git
$ cd koa-mongo.git
$ git init --bare

$ cat > hooks/post-receive
  #!/bin/sh
  GIT_WORK_TREE=/var/www/koa-mongo git checkout -f
  cd /var/www/koa-mongo
  if [[ $(diff package.json ../package.json) != '' ]]; then
    cp -f package.json ..
    npm i
  fi
  tsc
  pm2 restart dist/app.js      Ctrl+D

$ chmod +x hooks/post-receive
$ cd /var/www
$ mkdir koa-mongo
# 切换到本地仓库 git push 然后继续:
$ pm2 start dist/app.js
$ pm2 save               # 保存当前进程列表
$ pm2 startup            # 配置 pm2 开机启动
```

至此自动部署就完成了，以后只要在本地 `git push`，服务器就会自动编译和更新了。但有一点需要注意的是，脚本里没有添加 `npm install`，所以项目有引入新包的话，还得去服务器手动操作下。


### PM2 常用命令

```bash
$ pm2 help               # 获取帮助

# Listing
$ pm2 list               # Display all processes status
$ pm2 describe 0         # Display all informations about a specific process

# Logs
$ pm2 logs all           # Display all processes logs in streaming
$ pm2 flush              # Empty all log file
$ pm2 reset              # reset counters for process

# Actions
$ pm2 <stop|restart|reload> <name|id|all>

# Misc
$ pm2 delete 0           # Will remove process from pm2 list
$ pm2 dump|save          # 这一步会保存进程的环境变量等，并把这些设置锁死，要跟新配置，须先 delete 再 save

# update PM2
$ npm update -g pm2@latest  # Install the latest pm2 version
$ pm2 updatePM2             # Then update the in-memory PM2
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

