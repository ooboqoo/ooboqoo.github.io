# MySQL 速查表2


## 数据类型

#### 串数据类型 Text types:

||
|--------------------|-----------------------
| `CHAR(n=1)`        | 1~255 个字符的定长串
| `VARCHAR(n=255)`   | 长度可变，最长不超过 n, n: (0, 255]
| `TINYTEXT`         | 最大长度为 255 字节
| `TEXT`             | 最大长度为 16KB / 65,535字符 的变长文本
| `MEDIUMTEXT`       | 最大长度为 64KB
| `LONGTEXT`         | 最大长度为 4GB
| `ENUM(x,y,z,etc.)` | 接受最多 64K 个串组成的一个预定义集合的某个串
| `SET('X','Y','Z')` | 接受最多 64 个串组成的一个预定义集合的零个或多个串

||
|--------------|----------
| `TINYBLOB`   | 255B
| `BLOB`       | 64KB
| `MEDIUMBLOB` | 16MB
| `LONGBLOB`   | 4GB

MySQL 处理定长列远比处理变长列快地多，且 MySQL 不允许对变长列(或一个列的可变部分)进行索引。  
不管使用何种形式的串数据类型，串值都必须括在引号内(通常单引号更好)  
当数值不是数值时，如电话号码和邮政编码，应该存储为串。

#### 数值数据类型 Number types:

||
|-------------------|---------------------------------------------------
| `TINYINT(size)`   | 整数值，8 位，支持 -128~127 或 0~255
| `SMALLINT(size)`  | 整数值，16位，支持 -32768~32767 或 0~65535
| `MEDIUMINT(size)` | 整数值，24位，支持 -8388608~8388607 或 0~16777215
| `INT(size)`       | 整数值，32位，支持 -2147483648~2147483647 或 0~4294967295
| `BIGINT(size)`    | 整数值，64位
| `FLOAT(size,d)`   | 单进度浮点数
| `DOUBLE(size,d)`  | 双精度浮点数
| `DECIMAL(size,d)` | 精度可变的浮点数

MySQL 中的 `BOOLEAN` 类型是 `TINYINT(1)` 的别名  
MySQL 中没有专门存储货币的数据类型，一般情况下使用 `DECIMAL(8, 2)`  
The integer types have an extra option called `UNSIGNED`

```sql
CREATE TABLE `test_number` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `test_bool` TINYINT(1) NOT NULL DEFAULT '0',
  `my_int` INT UNSIGNED NOT NULL,
)
```

#### 日期和时间数据类型 Date types:

||
|-------------|----------------------------------------------------------
| `DATE`      | 格式为 YYYY-MM-DD
| `TIME`      | 格式为 HH:MM:SS
| `DATETIME`  | DATE 和 TIME 的组合
| `TIMESTAMP` | 时间戳，`INSERT` `UPDATE` 时能自动更新
| `YEAR`      | 用2位数字表示 70(1970)~69(2069); 用4位数字表示 1901~2155年


## 函数 Functions

与大多数其他计算机语言一样，SQL 也可以用函数来处理数据。利用 DBMS 提供的函数，可以方便高效地完成一些功能。但问题是，每个 DBMS 提供的函数都不尽相同，使用函数将严重影响代码的可移植性。

### 常用函数

```sql
/* 文本处理函数 */
LENGTH() UPPER() LOWER() TRIM() TRIM() LTRIM() RTRIM() SUBSTRING()
/* 日期和时间处理函数 */
NOW() CURDATE() CURTIME() DATE() YEAR() MONTH() DAY() DATE_ADD() DATE_SUB() DATE_FORMAT() DATEDIFF()
/* 数值处理函数 */
ABS() ROUND() EXP() SQRT() PI() SIN() COS() TAN()
```

```sql
SELECT prod_name, DATE_FORMAT(NOW(), "%Y-%m-%d") AS per_date FROM product;

INSERT INTO lesson_plan (plan_start_time, plan_end_time) VALUES (NOW(), ADDTIME(NOW(), '0:30:00'));
```

### 聚集函数 Aggregate Functions

我们经常需要汇总数据而不用把它们实际检索出来，为此 SQL 提供了专门的聚集函数。

```sql
COUNT() AVG() SUM() MAX() MIN()  -- 可带 DISTINCT 参数
```

```sql
SELECT COUNT(cust_email) AS cust_num FROM customer; -- 会忽略值为 `NULL` 的行; `COUNT(*)` 统计所有行数
SELECT prod_name, price FROM product WHERE price > (SELECT AVG(DISTINCT price) FROM product);
SELECT SUM(quantity) AS total_items_ordered FROM order_detail;
SELECT COUNT(*) AS item_num, MIN(price) AS min_price FROM product; -- 组合使用聚集函数
```
