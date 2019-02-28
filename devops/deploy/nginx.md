# Nginx


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

$ tail /var/log/nginx/error.log   # 查看错误日志
$ tail /var/log/nginx/access.log  # 查看普通日志
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
        server_name  ngapps.cn www.ngapps.cn;
        root         /var/www/ooboqoo.github.io;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location /api {                            ## 配置反向代理
            proxy_pass  http://127.0.0.1:3300;
        }

        location ^~ /static {                      ## 配置子路径访问不同目录
            alias /var/www/static
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

### location

https://nginx.org/en/docs/http/ngx_http_core_module.html#location

```
location [=|~|~*|^~] /uri/ { … }
```

语法规则：
  * `=`  - 精确匹配
  * `^~` - 以某个字符串开头
  * `~`  - 区分大小写的正则匹配
  * `~*` - 不区分大小写的正则匹配
  * `!~` 和 `!~*` - 上面两者的基础上取反，即不匹配的写法

多个location配置的情况下匹配顺序为：
  * 首先匹配 `=`
  * 其次匹配 `^~`
  * 其次是按文件中顺序的正则匹配
  * 最后是交给通用匹配`/`
  * 匹配成功即停止匹配

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

### 配置 Combo 合并请求


### WebSocket 代理

http://nginx.org/en/docs/http/websocket.html

我配置时想把那个 map 干掉，结果就是不通，老老实实用就 OK

```
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }
    server {
        ...
        location /chat/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }
    }
}
```

