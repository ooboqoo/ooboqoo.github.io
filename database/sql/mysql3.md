# MySQL 实战教程

<script>ooboqoo.contentsRegExp = /H[123]/;</script>

## 安装配置

### 安装

Windows

双击安装，安装完毕后打开 HeidiSQL 操作数据库。

CentOS

```bash
$ yum install mariadb-server mariadb
$ systemctl enable mariadb                # 设置开机启动
$ systemctl start/stop/restart mariadb    # 启动/停止/重启 MariaDB
$ systemctl status mariadb                # 查看服务状态信息
```

Ubuntu

```bash
$ apt install mysql-server
```

macOS

图形界面 https://sequelpro.com/test-builds

```bash
$ brew install mariadb
$ mysql.server start           # 单次启动
$ brew services start mariadb  # 配置开机启动
```

Docker

```bash
docker pull mysql
docker run --name mysql -e MYSQL_ROOT_PASSWORD=abc123 -d mysql
```

### CLI

mysql 命令行实用程序是使用最多的客户机，它对于快速测试和执行脚本非常有价值。请注意：

* 命令输入在 `mysql>` 之后
* 命令用 `;` 或 `\g` 结束，仅按 `Enter` 不执行命令
* 输入 `help` 或 `\h` 获得帮助，如 `help select`
* 输入 `quit` 或 `exit` 退出

### 数据库管理工具

推荐使用 CloudBeaver – Cloud Database Manager

```bash
docker pull dbeaver/cloudbeaver
docker run -d --name cloudbeaver --rm -ti -p 8080:8978
```

### 初始环境设定

#### 配置编码

https://mariadb.com/kb/en/library/setting-character-sets-and-collations/

```sql
> show global variables like 'character%';
```

_/etc/mysql/my.cnf_

```text
[mysqld]
    character-set-server=utf8mb4
```

#### 设置账户密码

```sql
> select user, host, password from mysql.user;  -- 查看用户信息
> set password for root@localhost=password('在这里填入root密码');
```

忘记 root 密码解救方法

```text
[mysqld]
    skip-grant-tables  # 添加这个设置就可以直接登录，改密码后再注释掉这句
```

```sql
update mysql.user set password=password('newpassword') where user='root'
```

### 测试 MySQL

```sql
-- 建立对test数据库有完全操作权限的名为centospub的用户
mysql> grant all privileges on test.* to centospub@localhost identified by '密码';
mysql> select user from mysql.user where user='centospub';  -- 确认centospub用户的存在与否
mysql> quit;

[root@sample ~]# mysql -u centospub -p  -- 用新建立的centospub用户登录MySQL服务器
mysql> create database test;  -- 建立名为test的数据库
mysql> show databases;  -- 查看系统已存在的数据库

mysql> use test  -- 连接到数据库
mysql> create table test(num int, name varchar(50));  -- 在数据库中建立表
mysql> show tables;  -- 查看数据库中已存在的表

mysql> insert into test values(1,'Hello World!');  -- 插入一个值到表中
mysql> select * from test;  -- 查看数据库中的表的信息

mysql> update test set name='Hello Everyone!';  -- 更新表的信息，赋予新的值
mysql> select * from test;  -- 查看数据库中的表的信息
mysql> delete from test where num=1;  -- 删除表内的值
mysql> select * from test;  -- 确认删除结果

mysql> drop table test;  -- 删除表
mysql> show tables;  -- 查看表信息

mysql> drop database test;  -- 删除名为test的数据库
mysql> show databases;  -- 查看已存在的数据库

mysql> exit  -- 退出MySQL服务器

mysql> revoke all privileges on *.* from centospub@localhost;  -- 取消centospub用户对数据库的操作权限
mysql> delete from mysql.user where user='centospub' and host='localhost';  -- 删除centospub用户
mysql> select user from mysql.user where user='centospub';  -- 查找用户centospub，确认已删除与否
mysql> exit  -- 退出MySQL服务器

[root@sample ~]# /etc/rc.d/init.d/httpd restart  -- 重新启动HTTP服务，让php-mysql反映到HTTP服务中。
```


## MySQL Tutorial

### 3.1 Connecting to and Disconnecting from the Server

```bash
shell> mysql --help   # for help
shell> mysql -h host -u user -p    # login, enter password after the prompt
shell> mysql -u user -p            # you can ommit the -h if on the same machine
mysql> quit           # logout, and "exit" also works
```

### 3.2 Entering Queries

```bash
mysql> select version(), current_date; select now();
mysql> select sin(pi()/4,(4+1)*5;    # You can use mysql as a simple calculator;
mysql> select user()                 # show the user logined now
```

A query normally consists of an SQL statement followed by a semicolon;<br>Keywords may bee entered in any lettercase;

### 3.3 Creating and Using a Database

```sql
mysql> show databases;
mysql> use testdb  -- USE, like QUIT, does not require a semicolon, but it does no harm to add a ";"
mysql> GRANT ALL ON testdb.* TO 'your_mysql_name'@'your_host';  -- MySQL administrator used to give permission

# 3.3.1 Creating and Selecting a Database
mysql> create database testdb;
mysql> use testdb
shell> mysql -h host -u user -p testdb  -- select the database when invok mysql
mysql> select database();  -- show the database currently selected

# 3.3.2 Creating a Table
mysql> show tables;
mysql> creat table user (id int not nul auto_increment, name varchar(20), password varchar(20), primary key (id));
mysql> describe user;

# 3.3.3 Loading Data into a Table
# 3.3.4 Retieving Information from a Table
# 3.3.4.1 Selecting All Data
# 3.3.4.2 Selecting Particular Rows
# 3.3.4.3 Selecting Particular Columns
# 3.3.4.4 Sorting Rows
# 3.3.4.5 Data Calculation
# 3.3.4.6 Working with NULL Values
# 3.3.4.7 Pattern Matching
# 3.3.4.8 Counting Rows
# 3.3.4.9 Using More Than one Table
```

### 3.4 Getting Information About Databases and Tables

```sql
mysql> select database();
mysql> show tables;
mysql> describe user;
```

### 3.5 Using mysql in Batch Mode

### 3.6 Examples of Common Queries

```bash
# 3.6.1 The Maximum Value for a Column
mysql> SELECT MAX(article) AS article FROM shop;
# 3.6.2 The Row Holding the Maximum of a Certain Column
mysql> SELECT article, dealer, price FROM shop WHERE price=(SELECT MAX(price) FROM shop);
mysql> SELECT s1.article, s1.dealer, s1.price FROM shop s1 LEFT JOIN shop s2 ON s1.price &lt; s2.price WHERE s2.article IS NULL;
mysql> SELECT article, dealer, price FROM shop ORDER BY price DESC LIMIT 1;
# 3.6.3 Maximum of Column per Group
mysql> SELECT article, MAX(price) AS price FROM shop GROUP BY article;
# 3.6.4 The Rows Holding the Group-wise Maximum of a Certain Columm
# 3.6.5 Using User-Defined Variables
# 3.6.6 Using Foreign Keys
# 3.6.7 Searching on Two Keys
# 3.6.8 Calculating Visits Per Day
# 3.6.9 Using AUTO_INCREMENT
```

### 3.7 Using MySQL with Apache

### 6.3.2 Adding User Accounts

```sql
mysql> create user 'gavin'@'localhost' identified by 'some_pass';
mysql> grant all privileges on some_table.* 'gavin'@'localhost';
mysql> grant all privileges on some_table.* to gavin@localhost identified by 'some_pass'  # a substitute for convenience 
mysql> show grants for 'gavin'@'localhost';
```

### 6.3.3 Removing User Accounts

```bash
mysql> drop user 'gavin'@'localhost';
```
