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

https://nginx.org/en/docs/beginners_guide.html  
https://docs.nginx.com/nginx/admin-guide/basic-functionality/managing-configuration-files/  

配置文件位置：/etc/nginx/nginx.conf

```nginx
http {
  client_max_body_size 120M;                     # 支持大文件上传
  server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name ngapps.cn www.ngapps.cn;
    root /var/www/ooboqoo.github.io;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    # 示例 - 配置反向代理
    location /api {
      proxy_pass http://127.0.0.1:3300;
    }

    # 示例 - 配置子路径访问不同目录
    location ^~ /static {
      alias /var/www/static
    }

    # 示例 - 配置缓存时间
    location ~ \.(jpg|jpeg|png|ico|js|css)$ {
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

    # 示例 - 配置支持 PHP
    location ~ \.php$ {
      fastcgi_pass   127.0.0.1:9000;
      fastcgi_index  index.php;
      fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
      include        fastcgi_params;
    }
  }
}
```


### Location

https://nginx.org/en/docs/http/ngx_http_core_module.html#location  
https://docs.nginx.com/nginx/admin-guide/web-server/web-server/#location_priority  

```nginx
location [ = | ~ | ~* | ^~ ] uri { ... }
```

modifier

||||
-----|------------------------------------|-----
`=`  | 精确匹配，常见用法 `= /`               | P0
`^~` | 前缀匹配                             | P1
`~`  | 正则匹配(区分大小写)                   | P2
`~*` | 正则匹配(不区分大小写)                 | P2
空   | 通用匹配(优先级比正则匹配低的「前缀匹配」) | P3

There are two types of parameter to the `location` directive: **prefix strings** (pathnames) and **regular expressions**.

For a request URI to match a prefix string, it must *start with* the prefix string.

```nginx
location /some/path { ... }
# matches request URIs that begin with /some/path
# - match `/some/path/document.html`
# - NOT match `/my-site/some/path`, because `/some/path` does not occur at the start of that URI
```

NGINX Location Priority

1. Test the URI against all prefix strings. 筛选出非「正则匹配」的项目（精确匹配 + 前缀匹配 + 通用匹配）
2. The `=` (equals sign) modifier defines an exact match of the URI and a prefix string. If the exact match is found, the search stops. 上一步过滤出来的条目，有精确匹配项，且匹配，则立即结束匹配
3. If the `^~` (caret-tilde) modifier prepends the longest matching prefix string, the regular expressions are not checked. 带 `^~` 修饰符的条目的 prefix string 在步骤 1 里过滤出来的条目里最长，立即结束匹配
4. Store the longest matching prefix string. 记录 prefix string 最长的一条（必然来自「通用匹配」）
5. Test the URI against regular expressions. 开始正则匹配(即带 `~` 或 `~*` modifier 的条目)
6. Stop processing when the first matching regular expression is found and use the corresponding location. 正则匹配上就立即结束匹配
7. If no regular expression matches, use the location corresponding to the stored prefix string. 正则都没有匹配的就用步骤 4 的那一条

Let’s illustrate the above by an example:

```nginx
#        规则                              最终匹配规则的 URI
location = / { ... }                      /
location / { ... }                        /index.html
location /documents/ { ... }              /documents/document.html
location /images/abc/ { ... }             /images/abc/1.webp
location ^~ /images/ { ... }              /images/1.gif
location ~* \.(gif|jpg|jpeg)$ { ... }     /images/abc/1.jpg
```

### 部署 HTTPS

https://letsencrypt.org/getting-started/   
https://linuxstory.org/deploy-lets-encrypt-ssl-certificate-with-certbot/ 此文章值得参考下  
https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx

注：对于接入阿里云和腾讯云的网址，每家可以申请1年有效期的证书，在平台上手动配置，可以免去这里维护的麻烦。

#### SSL/TLS知识

==证书基础知识==

```bash
# 查看证书信息 https://www.openssl.org/docs/man1.1.1/man1/x509.html
$ openssl x509 -text -noout -in xxx.crt
```

证书(Certificate) -  xxx.crt  证书包含公钥  
私钥(Private Key) - xxx.key  

常见证书编码方式 `PEM` base64编码; `DER` 二进制编码  
常见的PEM编码证书后缀: `.pem` `.crt`  

CA Certificate Authority 证书颁发机构。（CA 类比工商局 证书类比营业执照）IE、Chrome、Firefox 中内置有一些CA，经过这些CA颁发验证过的证书都是可以信的，否则就会提示你不安全。

==SSL 工作原理==

https://www.tutorialsteacher.com/https/how-ssl-works

SSL uses asymmetric cryptography to initiate the communication which is known as **SSL handshake**. Most commonly used asymmetric key encryption algorithms include EIGamal, **RSA**, **DSA**, Elliptic curve techniques and PKCS.

SSL uses symmetric cryptography using the session key after the initial handshake is done. The most widely used symmetric algorithms are **AES-128**, AES-192 and **AES-256**.

SSL Handshake Steps

1. The client sends a "client hello" message. This includes the client's SSL version number, cipher settings, session-specific data and other information that the server needs to communicate with the client using SSL.
2. The server responds with a "server hello" message. This includes the server's SSL version number, cipher settings, session-specific data, an SSL certificate with a public key and other information that the client needs to communicate with the server over SSL.
3. The client verifies the server's SSL certificate from CA (Certificate Authority) and authenticates the server. If the authentication fails, then the client refuses the SSL connection and throws an exception. If the authentication succeeds, then proceed to step 4.
4. The client creates a session key, encrypts it with the server's public key and sends it to the server. If the server has requested client authentication (mostly in server to server communication), then the client sends his own certificate to the server.
5. The server decrypts the session key with its private key and sends the acknowledgement to the client encrypted with the session key.

==OpenSSL==

**OpenSSL** is a robust, commercial-grade, and full-featured toolkit for the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols. It is also a general-purpose cryptography library.

==TLS==

SSL/TLS protocol = SSL protocol + TLS protocol

SSL（Secure Sockets Layer 安全套接层）
TLS（Transport Layer Security 安全传输层协议）

SSL更新到3.0时，IETF对SSL3.0进行了标准化，并更名为TLS1.0，可以说 TLS1.0 就是 SSL3.1

==HTTPS==

Hypertext Transfer Protocol Secure (or HTTP over TLS or HTTP over SSL)

SSL/TLS secures the information that is sent and received over HTTP. SSL/TLS offers point-to-point protection to ensure that the data is secure during transport.

The benefits of SSL/TLS include encryption, authenticity, integrity, and much more.

#### 获取证书

自动获取证书

```bash
$ snap install --classic certbot  # 安装 Let's Encrypt 官方证书配置工具(自动化的获取、部署和更新安全证书)
$ certbot --nginx  # certbot 会自动通过分析配置文件获取证书
```

手动获取证书

```bash
$ certbot certonly               # 安装 ssl 证书，需要根据具体情况回答问题，也可以像下面这样提前设置答案
# 提前回答好答案，当某个证书需要加域名时，也是用这行命令，把需要加的域名都写全工具能自动识别
$ certbot certonly --webroot -w /var/www/example -d e.com -d www.e.com -w /var/www/thing thing.cn
$ certbot renew --dry-run        # 测试能否自动更新证书
$ certbot renew --force-renewal  # 强更，有时会碰到浏览器说证书已过期但工具说没过期，此时可以强更下
# 添加包含左侧命令到一个 cron or systemd job 建议每天随机运行2次
$ certbot renew --quiet --post-hook "nginx -s reload"
# 新装的 certbot 已经默认配置好了定时更新任务，可通过以下方法确认
$ systemctl list-unit-files --type timer  # /etc/systemd/system/snap.certbot.renew.timer
```

The HTTP auth works like this:

* Certbot places a file in a directory
* Then a remote server tries to fetch that from `.well-known/acme-challenge/<filename>`，通过 80 端口获取
* If it is successful, you proved ownership of the domain and get the certificate

#### 定时更新证书

```bash
# 默认配好的定时任务没配重启 Nginx，导致实际在用的证书还是会报过期
$ vim /etc/letsencrypt/renewal/ngapps.cn.conf
# 然后在 [renewalparams] 栏下添加参数
deploy_hook = nginx -s reload
```

手动配置 systemd 定时任务更新证书:

```bash
$ vim /usr/lib/systemd/system/certbot.timer
```

```
[Unit]
  Description=Run certbot twice daily

[Timer]
  OnCalendar=*-*-* 00,12:00:00
  RandomizedDelaySec=43200
  Persistent=true

[Install]
  WantedBy=timers.target
```

```bash
$ vim /usr/lib/systemd/system/certbot.service
```

```
[Unit]
  Description=Certbot
  Documentation=file:///usr/share/doc/python-certbot-doc/html/index.html
  Documentation=https://letsencrypt.readthedocs.io/en/latest/
[Service]
  Type=oneshot
  ExecStart=/usr/bin/certbot renew --quiet --deploy-hook "nginx -s reload"
  PrivateTmp=true
```

#### Nginx 配置

然后更新 Nginx 配置文件，添加

```nginx
server {
  listen 443 ssl;
  server_name ngapps.cn www.ngapps.cn;
  root /var/www/ngapps.cn;

  ssl_certificate      /etc/letsencrypt/live/ngapps.cn/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/ngapps.cn/privkey.pem;
}
```

还可以更进一步，将所有到 80 端口的普通访问进行跳转

```nginx
server {
  listen 80;
  server_name ngapps.cn www.ngapps.cn;
  return 301 https://$server_name$request_uri;
}
```

#### HTTP/2

配置好 HTTPS 再配 HTTP2 就太简单了

```nginx
server {
  listen 443 ssl http2;  # 就是在 https 的配置基础上加一个 http2 就完了
  server_name ngapps.cn www.ngapps.cn;
  # ...
}
```

#### 签发本地开发用证书

https://letsencrypt.org/docs/certificates-for-localhost/  
https://github.com/FiloSottile/mkcert  
https://www.linode.com/docs/security/ssl/create-a-self-signed-tls-certificate/

```bash
openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365
  -nodes -subj '/CN-localhost'
  -out local.crt -keyout local.key
```

_cert/config.js_

```js
const fs = require("fs")
module.exports = {
  cert: fs.readFileSync(__dirname + '/local.cert'),
  key: fs.readFileSync(__dirname + '/local.key')
}
```

```bash
$ live-server --https=cert/config
```


### 启用 gzip 压缩

新建 /etc/nginx/conf.d/gzip.conf 并添加以下内容：

```
gzip            on;   # 启用 gzip 压缩功能
gzip_vary       on;   # 
gzip_comp_level 3;    # 压缩级别1-9，1压缩比最小速度最快
gzip_proxied    any;  # 做前端代理时启用该项，表示无论后端服务器的headers头返回什么信息，都启用压缩
gzip_min_length 1024; # 最小压缩的页面，如果页面过于小，可能会越压越大，这里规定大于1K的页面才启用压缩

# 需压缩的 MIME 类型, application/octet-stream 是针对 .md 文件的，另外 text/html 已默认添加，加了报重复
gzip_types text/plain text/css application/json application/javascript application/octet-stream;
```

测试配置是否生效：

```bash
# You should see content-encoding: gzip
curl -H "Accept-Encoding: gzip" -I http://www.ngapps.cn/
```


### WebSocket 代理

http://nginx.org/en/docs/http/websocket.html

我配置时想把那个 map 干掉，结果就是不通，老老实实用就 OK

```nginx
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


### 反向代理与负载均衡

https://juejin.im/entry/57fb07b0816dfa0056c0ada8

正向代理与反向代理: 正向代理是为客户端做代理，代替客户端去访问服务器，而反向代理是为服务器做代理，代替服务器接受客户端请求～

```nginx
http {
  upstream my_cluster {             # upstream模块，在此配服务器集群
    ip_hash;  # 用户第一次访问后就跟服务器绑定
    server 127.0.0.1:9001 down;     # 暂不参与负载
    server 127.0.0.1:9002 backup;   # 其它非backup机器down或忙时才启用
    server 127.0.0.1:9003 weight=2; # 值越大负载的权重就越大
    server 127.0.0.1:9004 max_fails=2 fail_timeout=60s;
  }
  server {
    listen 8080;
    location / {
      proxy_pass http://my_cluster; # 配置反向代理
    }
  }
}
```

```nginx
# 转发 Header 配置示例，具体参见 http://nginx.org/en/docs/http/ngx_http_proxy_module.html
location / {
    proxy_pass                      http://example.com;
    proxy_set_header                Host example.com;
    proxy_set_header                HTTP_Country-Code $geoip_country_code;
    proxy_pass_request_headers      on;
}
```

### 访问验证

使用 htpasswd 命令生成密码文件，之后会提示输入密码。

```bash
$ htpasswd -c /etc/nginx/passwd any_user_name
```

添加 Nginx 配置

```nginx
server {
  listen 80;
  server_name private.ngapps.cn;
  root /srv/nginx/private;
  auth_basic "Not for Public";
  auth_basic_user_file /etc/nginx/passwd;
}
```

### 配置文件结构

TL;DR;
* sites-available 和 sites-enabled 是 Debian 发行版特有的目录，非 Nginx 官方习惯
* 部分人不支持使用这种非标方案，通过 *修改 conf.d 下的配置文件后缀* 也可达到同样的效果
* 两者都是用来组织 Virtual Host 配置的有效方式

/etc/nginx/
  - nginx.conf
  - conf.d/
  - sites-available/
  - sites-enabled/

/etc/nginx/nginx.conf from Debian/Ubuntu:

```nginx
include /etc/nginx/modules-enabled/*.conf;

http {
  # ...

  ## 
  # Virtual Host Configs
  ##

  include /etc/nginx/config.d/*.conf;
  include /etc/nginx/sites-enabled/*;   # 注意这里末尾是 *

  server {
    # ...
  }
}
```

使用 conf.d 来管理 vhosts

```bash
# 禁用站点
sudo mv -i /etc/nginx/conf.d/example.com.conf{,.disabled}
# 启用站点
sudo mv -i /etc/nginx/conf.d/example.com.conf{.disabled,}
```

#### sites-available & sites-enabled

The sites-* folders in are managed by nginx_ensite and nginx_dissite. For Apache httpd users who find this with a search, the equivalents is a2ensite/a2dissite.

The sites-available folder is for storing all of your vhost configurations, whether or not they’re currently enabled.

The sites-enabled folder contains symlinks to files in the sites-available folder. This allows you to selectively disable vhosts by removing the symlink. 不要直接在这里放配置文件（原因：用编辑器打开中途意外退出，可能会多出一份 temp 文件，导致配置重复，进而导致 Nginix 启动报错）

[观点1] conf.d does the job, but you have to move something out of the folder, delete it, or make changes to it when you need to disable something. The sites-* folder abstraction makes things a little more organized and allows you to manage them with separate support scripts. Typically, the sites-enabled folder is used for virtual host definitions, while conf.d is used for global server configuration.

[观点2] You should be using /etc/nginx/conf.d, as that’s a standard convention, and should work anywhere. If you need to disable a site, simply rename the filename to no longer have a .conf suffix, very easy, straightforward and error-proof...


### 其他

访问路径自动加 .html

```nginx
try_files $uri/index.html $uri.html $uri/ $uri =404;
```

直接响应请求 https://serverfault.com/questions/196929/how-to-reply-with-200-from-nginx-without-serving-a-file

```nginx
location /ping {
  default_type text/plain;
  return 200 'pong\n';
}

location /json {
  # 如果外部设置了 default_type，add_header 会导致出现多个 content-type 头
  add_header Content-Type application/json;
  return 200 '{"message": "pong"}';
}
```


## 插件

### Lua

https://openresty.org/en/

xxx 的底层接入目前是基于 OpenResty（Nginx + Lua）改造的，Lua 上面承担了每个请求大量的主流程逻辑 + 可插拔逻辑（插件）

插件应用场景：限速限流、鉴权、签名 等

### njs

https://www.nginx.com/blog/harnessing-power-convenience-of-javascript-for-each-request-with-nginx-javascript-module/


