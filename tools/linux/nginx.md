# Nginx + NodeJS + MongoDB

PM2 quickstart: http://pm2.keymetrics.io/docs/usage/quick-start/

## 安装

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


## 配置

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


## NodeJS + MongoDB + PM2 安装

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


## Koa 自动部署

```bash
$ mkdir koa-mongo.git
$ cd koa-mongo.git
$ git init --bare

$ cat > hooks/post-receive
  #!/bin/sh
  GIT_WORK_TREE=/var/www/koa-mongo git checkout -f
  cd /var/www/koa-mongo
  tsc                                 # 下行代码是为保护服务器，毕竟源码都是开放的
  cp ../default.json config/default.json  # 注，先手动试下，centos 默认 `alias cp='cp -i'`
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

