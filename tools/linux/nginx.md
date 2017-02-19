# Nginx + NodeJS + MongoDB

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
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  www.ngapps.cn;
        root         /var/www/ooboqoo.github.io;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location /api {                            // 配置反向代理
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
        location ~ \.php$ {                           // 配置支持 php
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
    }
```


## Koa

http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/

