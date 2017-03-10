# LAMP 安装与配置

## 安装 LAMP + phpMyAdmin

http://cnzhx.net/blog/centos-rhel-install-lamp-phpmyadmin/


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


## install phpmyadmin on centos 7

By default, centos 7 repository does not contains phpmyadmin package. we need to enable EPEL repository. Find the latest EPEL for centos 7 from [EPEL for Centos 7](http://download.fedoraproject.org/pub/epel/7/x86_64/repoview/epel-release.html).

Step 1 Download and install epel-release-7-x.noarch.rpm file . or install directly by copying the rpm link.

```bash
$ rpm -ivh http://mirrors.opencas.cn/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
```

Step 2 Update repositories by issuing below command.

```bash
$ yum check-update
```

Step 3 Now install phpmyadmin package along with dependencies.

```bash
$ yum -y install phpmyadmin
```

Step 4 After installation, Open /etc/httpd/conf.d/phpMyAdmin.conf file ( Apache config file for phpmyadmin ) and edit as follows.

```bash
# Apache 2.4 // 需要改两处
  <RequireAny>
    # Require ip 127.0.0.1
    # Require ip ::1
    Require all granted
  </RequireAny>
```

Step 5 Restart Apache service.

```bash
$ systemctl restart httpd.service
```

Step 6 Now open http://serverIP/phpmyadmin in your browser. You can login using root as username and mysql root password. 允许 phpMyAdmin 无密码登录:

```php
// 修改 /etc/phpMyAdmin/config.inc.php
$cfg['Servers'][$i]['AllowNoPassword'] = TRUE;
```

