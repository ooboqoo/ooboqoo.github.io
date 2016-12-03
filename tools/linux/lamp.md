# LAMP 配置细节

## Apache2.4 配置

### SSL 连接设置

教程，其他再看看：http://www.blogdaren.com/post-228.html

### 设置多个子站点

正常是要单独建立 httpd-vhosts.conf 配置文件的，这里图省事，直接全部放 /etc/httpd/conf/httpd.conf

```bash
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

