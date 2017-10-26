# MySQL 教程

## 安装配置

### 安装

下载：https://downloads.mariadb.org/mariadb/

#### Windows

选择 MSI 版本，另有 ZIP 版。

双击安装，安装完毕后打开 HeidiSQL 操作数据库。

#### CentOS

http://cnzhx.net/blog/centos-rhel-install-lamp-phpmyadmin/

```bash
$ yum install mariadb-server mariadb
$ systemctl enable mariadb                # 设置开机启动
$ systemctl start/stop/restart mariadb    # 启动/停止/重启 MariaDB
$ systemctl status mariadb                # 查看服务状态信息
```

### 初始环境设定

#### 配置编码

Windows: C:\Program Files\MariaDB 10.2\data\my.ini  
Linux: /etc/my.cnf

```text
    [mysqld] default-character-set = utf8  # 设置默认编码 MySQL 用
    [mysqld] character-set-server=utf8     # 设置默认编码 MariaDB 用
```

#### 设置根账户密码

为 root 用户设置密码，root 用户默认是没有密码的。

```
[root@sample ~]# mysql -u root　 ← 用root用户登录MySQL服务器
mysql> select user,host,password from mysql.user;　 ← 查看用户信息
mysql> set password for root@localhost=password('在这里填入root密码');　 ← 设置root密码
mysql> set password for root@'sample.centospub.com'=password('在这里填入root密码');　 ← 设置root密码
mysql> select user,host,password from mysql.user;　 ← 查看用户信息
mysql> exit　 ← 退出MySQL服务器
```

#### 删除匿名用户

MySQL 初始安装存在用户名、密码为空的用户。这使得数据库服务器有无需密码被登录的可能性。为消除隐患，将匿名用户删除。

```sql
select user,host from mysql.user;　     -- 查看用户信息
delete from mysql.user where user='';　 -- 删除匿名用户
```

### 测试 MySQL

```sql
mysql> grant all privileges on test.* to centospub@localhost identified by '密码';　 ← 建立对test数据库有完全操作权限的名为centospub的用户
mysql> select user from mysql.user where user='centospub';　 ← 确认centospub用户的存在与否
mysql> quit;

[root@sample ~]# mysql -u centospub -p　 ← 用新建立的centospub用户登录MySQL服务器
mysql> create database test;　 ← 建立名为test的数据库
mysql> show databases;　 ← 查看系统已存在的数据库

mysql> use test　 ← 连接到数据库
mysql> create table test(num int, name varchar(50));　 ← 在数据库中建立表
mysql> show tables;　 ← 查看数据库中已存在的表

mysql> insert into test values(1,'Hello World!');　 ← 插入一个值到表中
mysql> select * from test;　 ← 查看数据库中的表的信息

mysql> update test set name='Hello Everyone!';　 ← 更新表的信息，赋予新的值
mysql> select * from test;　 ← 查看数据库中的表的信息
mysql> delete from test where num=1;　 ← 删除表内的值
mysql> select * from test;　 ← 确认删除结果

mysql> drop table test;　 ← 删除表
mysql> show tables;　 ← 查看表信息

mysql> drop database test;　 ← 删除名为test的数据库
mysql> show databases;　 ← 查看已存在的数据库

mysql> exit　 ← 退出MySQL服务器

mysql> revoke all privileges on *.* from centospub@localhost;　 ← 取消centospub用户对数据库的操作权限
mysql> delete from mysql.user where user='centospub' and host='localhost';　 ← 删除centospub用户
mysql> select user from mysql.user where user='centospub';　 ← 查找用户centospub，确认已删除与否
mysql> exit　 ← 退出MySQL服务器

[root@sample ~]# /etc/rc.d/init.d/httpd restart　 ← 重新启动HTTP服务，让php-mysql反映到HTTP服务中。
```

### 其他项

#### 忘记 root 密码解救方法

/etc/my.cnf

```text
[mysqld] skip-grant-tables  # 添加这个设置就可以直接登录，改密码后再注释掉这句
```

```sql
update mysql.user set password=password('newpassword') where user='root'
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

```bash
mysql> show databases;
mysql> use testdb    //USE, like QUIT, does not require a semicolon, but it does no harm to add a ";"
mysql> GRANT ALL ON testdb.* TO 'your_mysql_name'@'your_host';    //MySQL administrator used to give permission

# 3.3.1 Creating and Selecting a Database
mysql> create database testdb;
mysql> use testdb
shell> mysql -h host -u user -p testdb    // select the database when invok mysql
mysql> select database();    //show the database currently selected

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

```bash
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

```bash
mysql> create user 'gavin'@'localhost' identified by 'some_pass';
mysql> grant all privileges on some_table.* 'gavin'@'localhost';
mysql> grant all privileges on some_table.* to gavin@localhost identified by 'some_pass'  # a substitute for convenience 
# mysql> show grants for 'gavin'@'localhost';
```

### 6.3.3 Removing User Accounts

```bash
mysql> drop user 'gavin'@'localhost';
```


## MySQL Data Types

In MySQL there are three main types : text, number, and Date/Time types.

<b>Text types:</b>

<table class="dataintable">
    <tbody>
    <tr>
      <th>Data type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>CHAR(size)</td>
      <td>Holds a fixed length string (can contain letters, numbers, and special characters). The fixed size is specified in parenthesis. Can store up to 255 characters</td>
    </tr>
    <tr>
      <td>VARCHAR(size)</td>
      <td>Holds a variable length string (can contain letters, numbers, and special characters). The maximum size is specified in parenthesis. Can store up to 255 characters. <b>Note:</b> If you put a greater value than 255 it will be converted to a TEXT type</td>
    </tr>
    <tr>
      <td>TINYTEXT</td>
      <td>Holds a string with a maximum length of 255 characters</td>
    </tr>
    <tr>
      <td>TEXT</td>
      <td>Holds a string with a maximum length of 65,535 characters</td>
    </tr>
    <tr>
      <td>BLOB</td>
      <td>For BLOBs (Binary Large OBjects). Holds up to 65,535 bytes of data</td>
    </tr>
    <tr>
      <td>MEDIUMTEXT</td>
      <td>Holds a string with a maximum length of 16,777,215 characters</td>
    </tr>
    <tr>
      <td>MEDIUMBLOB</td>
      <td>For BLOBs (Binary Large OBjects). Holds up to 16,777,215 bytes of data</td>
    </tr>
    <tr>
      <td>LONGTEXT</td>
      <td>Holds a string with a maximum length of 4,294,967,295 characters</td>
    </tr>
    <tr>
      <td>LONGBLOB</td>
      <td>For BLOBs (Binary Large OBjects). Holds up to 4,294,967,295 bytes of data</td>
    </tr>
    <tr>
      <td>ENUM(x,y,z,etc.)</td>
      <td>Let you enter a list of possible values. You can list up to 65535 values in an ENUM list. If a value is inserted that is not in the list, a blank value will be inserted.
        <p><b>Note:</b> The values are sorted in the order you enter them.</p>
        <p>You enter the possible values in this format: ENUM('X','Y','Z')</p>
      </td>
    </tr>
    <tr>
      <td>SET</td>
      <td>Similar to ENUM except that SET may contain up to 64 list items and can store more than one choice</td>
    </tr>
</tbody></table>

<b>Number types:</b>
<table class="dataintable">
    <tbody><tr>
      <th>Data type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>TINYINT(size)</td>
      <td>-128 to 127 normal. 0 to 255 UNSIGNED*. The maximum number of digits may be specified in parenthesis</td>
    </tr>
    <tr>
      <td>SMALLINT(size)</td>
      <td>-32768 to 32767 normal. 0 to 65535 UNSIGNED*. The maximum number of digits may be specified in parenthesis</td>
    </tr>
    <tr>
      <td>MEDIUMINT(size)</td>
      <td>-8388608 to 8388607 normal. 0 to 16777215 UNSIGNED*. The maximum number of digits may be specified in parenthesis</td>
    </tr>
    <tr>
      <td>INT(size)</td>
      <td>-2147483648 to 2147483647 normal. 0 to 4294967295 UNSIGNED*. The maximum number of digits may be specified in parenthesis</td>
    </tr>
    <tr>
      <td>BIGINT(size)</td>
      <td>-9223372036854775808 to 9223372036854775807 normal. 0 to 18446744073709551615 UNSIGNED*. The maximum number of digits may be specified in parenthesis</td>
    </tr>
    <tr>
      <td>FLOAT(size,d)</td>
      <td>A small number with a floating decimal point. The maximum number of digits may be specified in the size parameter. The maximum number of digits to the right of the decimal point is specified in the d parameter</td>
    </tr>
    <tr>
      <td>DOUBLE(size,d)</td>
      <td>A large number with a floating decimal point. The maximum number of digits may be specified in the size parameter. The maximum number of digits to the right of the decimal point is specified in the d parameter</td>
    </tr>
    <tr>
      <td>DECIMAL(size,d)</td>
      <td>A DOUBLE stored as a string , allowing for a fixed decimal point. The maximum number of digits may be specified in the size parameter. The maximum number of digits to the right of the decimal point is specified in the d parameter</td>
    </tr>
    </tbody></table>
  
  <p>*The integer types have an extra option called UNSIGNED. Normally, the 
integer goes from an negative to positive value. Adding the UNSIGNED attribute 
will move that range up so it starts at zero instead of a negative number. </p>
<p><b>Date types:</b></p>

<table class="dataintable">
    <tbody><tr>
      <th>Data type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>DATE()</td>
      <td>A date. Format: YYYY-MM-DD<p><b>Note:</b> The supported range is from '1000-01-01' to '9999-12-31'</p></td>
    </tr>
    <tr>
      <td>DATETIME()</td>
      <td>*A date and time combination. Format: YYYY-MM-DD HH:MI:SS<p><b>Note:</b> 
    The supported range is from '1000-01-01 00:00:00' to '9999-12-31 23:59:59'</p></td>
    </tr>
    <tr>
      <td>TIMESTAMP()</td>
      <td>*A timestamp. TIMESTAMP values are stored as the number of seconds 
    since the Unix epoch ('1970-01-01 00:00:00' UTC). Format: YYYY-MM-DD 
    HH:MI:SS<p><b>Note:</b> The supported range is from '1970-01-01 00:00:01' 
    UTC to '2038-01-09 03:14:07' UTC</p></td>
    </tr>
    <tr>
      <td>TIME()</td>
      <td>A time. Format: HH:MI:SS<p><b>Note:</b> The supported range is from 
    '-838:59:59' to '838:59:59'</p></td>
    </tr>
    <tr>
      <td>YEAR()</td>
      <td>A year in two-digit or four-digit format.<p>
    <b>Note:</b> Values allowed in four-digit format: 1901 to 2155. Values allowed in two-digit format: 70 to 69, representing years from 1970 to 2069</p></td>
    </tr>
    </tbody></table>
  <p>*Even if DATETIME and TIMESTAMP return the same format, they work very differently. In an INSERT or UPDATE query, the TIMESTAMP automatically set itself to the current date and time. TIMESTAMP also accepts various formats, like YYYYMMDDHHMISS, YYMMDDHHMISS, YYYYMMDD, or YYMMDD.</p>

