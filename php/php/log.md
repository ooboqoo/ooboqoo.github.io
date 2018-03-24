# PHP 问题处理日志

#### 2016/4/8 PDO_MYSQL 缺失

今天要用到数据库，上传代码到CentOS7.2主机，报错"could not find the driver"。查看phpinfo
PDO扩展里确实没有mysql。
再想着改php.ini，结果找不到网上说的"extension=php_pdo_mysql.dll"，再查看/usr/lib64/php/modules
目录，根本就没有这个扩展。 然后查手册然后安装 "yum install php-mysql"，啥配置也不用改，重启apache解决。

#### 2016/4/21 中文乱码解决方案

看视频教程时，碰到调试时出现中文乱码的问题，解决方法就是把输出内容放到html代码里，再有甚者每次调浏览器编码，今天看到个更简单的方法，直接发送个 header 头就解决了。

```php
header('Content-Type:text/html;Charset=utf-8');
```

#### 2016/3/24 系统权限

php 一般是以 apache 用户身份去执行的，把 apache 加入到存储你文件的父文件夹属组里去，然后改该父文件夹权限为775，这样属组成员就有写的权限，而 apache 属于这个组就可以改写该目录下所有文件的权限，当然，属组最好不要是 root，你可以为该文件夹改个其它普通用户组。

#### 2016/3/4 Apache vhost 配置

关于vhost的设置, 碰到各种问题, 花了一个多小时才搞定, 要点记录如下:  
1, 确保 http.conf 文件中 "Include conf/extra/httpd-vhosts.conf" 没有被注释掉  
2, 编辑 httpd-vhosts.conf in the apache\conf\extra\ subdirectory, 加入如下内容  

```ini
<VirtualHost 52web:80>
  DocumentRoot "D:/Meifeng/Documents/52web"  # 52web后面不能加/不然php在使用fopen()时会出错
  ServerName 52web
  <Directory "D:/Meifeng/Documents/52web/">  # 一直提示没有权限, 最终搜索网络, 要给目录加权限
  Require all granted   
  </Directory>
</VirtualHost>
```

3, 重启Apache服务, 使设置生效  
4, 编辑hosts in C:\windows\system32\drivers\etc, 添加 127.0.0.1 52web  
5, 完成设置过程