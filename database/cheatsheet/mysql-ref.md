# MySQL 速查表

## 数据类型 Data Types

https://dev.mysql.com/doc/refman/8.0/en/data-types.html

### String Data Types

|||
|--------------------|-----------------------
| `CHAR(n=1)`        | 1~255 个字符的定长字符串
| `VARCHAR(n=255)`   | 长度可变，最长不超过 n, n: (0, 65,535] 即受限于 maximum row size (65,535 bytes) [注1]
| `ENUM(x,y,z,etc.)` | 接受最多 65,535 个字符串组成的一个预定义集合的 *某个字符串*
| `SET('X','Y','Z')` | 接受最多 64 个字符串组成的一个预定义集合的 *零个或多个字符串*

注1：最佳实践，VARCHAR 文本长度超过 5000 就要改用 TEXT，独立出来一张表，用主键来对应，避免影响其它字段索引率。
注：当数值不是数值时，如电话号码和邮政编码，应该存储为字符串。

```sql
CREATE TABLE shirts (
    name VARCHAR(40),
    size ENUM('x-small', 'small', 'medium', 'large', 'x-large')
);
INSERT INTO shirts (name, size) VALUES ('dress shirt','large'), ('t-shirt','medium');
SELECT name, size FROM shirts WHERE size = 'medium';
```

|||
|---------------------------|----------
| `TINYBLOB`   `TINYTEXT`   | 255B, L + 1 bytes, where L < 2^8
| `BLOB`       `TEXT`       | 64KB, L + 2 bytes, where L < 2^16
| `MEDIUMBLOB` `MEDIUMTEXT` | 16MB, L + 3 bytes, where L < 2^24
| `LONGBLOB`   `LONGTEXT`   | 4GB, L + 4 bytes, where L < 2^32

* BLOB values are treated as binary strings (byte strings).
* TEXT values are treated as nonbinary strings (character strings), they have a character set other than `binary`

注：TEXT数据不存储在数据库服务器的内存中，因此，每当查询TEXT数据时，MySQL都必须从磁盘读取它，这与 CHAR 和 VARCHAR 相比要慢得多。Instances of BLOB or TEXT columns in the result of a query that is processed using a temporary table causes the server to use a table on disk rather than in memory because the MEMORY storage engine does not support those data types. Use of disk incurs a performance penalty, so include BLOB or TEXT columns in the query result only if they are really needed.

```sql
-- For indexes on BLOB and TEXT columns, you must specify an index prefix length.
CREATE INDEX idx_remark ON student (remark(20));
```

### Numeric Data Types

|||
|-------------------|---------------------------------------------------
| `TINYINT(size)`   | 整数值，8 位，支持 -128~127 或 0~255  [注1]
| `SMALLINT(size)`  | 整数值，16位，支持 -32768~32767 或 0~65535
| `MEDIUMINT(size)` | 整数值，24位，支持 -8388608~8388607 或 0~16777215
| `INT(size)`       | 整数值，32位，支持 -2147483648~2147483647 或 0~4294967295
| `BIGINT(size)`    | 整数值，64位
| ~`FLOAT(size,d)`~   | 单进度浮点数，存在精度丢失问题，禁用 [注2]
| ~`DOUBLE(size,d)`~  | 双精度浮点数，存在精度丢失问题，禁用
| `DECIMAL(size,d)` | 精度可变的浮点数。size 最大支持到 65；示例 DECIMAL(5,2) 取值范围 [-999.99, 999.99]

注1：`TINYINY(M)` 取值范围为 [-128, 127]，the `(M)` indicates the column display width (如果客户端支持的话)。不同值的显示效果如下

```txt
| v   | (1) | (2) | (3) |
+-----+-----+-----+-----+
| 1   | 1   |  1  |   1 |        tinyint(3) 且值为 1 时，显示为 xx1
| 100 | 100 | 100 | 100 |
```

注2：最佳实践：禁用 FLOAT 和 DOUBLE，含小数只能用 DECIMAL

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

### Date and Time Data Types

|||
|-------------|----------------------------------------------------------
| `DATE`      | 格式为 YYYY-MM-DD
| `TIME`      | 格式为 HH:MM:SS
| `DATETIME`  | DATE 和 TIME 的组合
| `TIMESTAMP` | 时间戳，`INSERT` `UPDATE` 时能自动更新
| `YEAR`      | 用2位数字表示 70(1970)~69(2069); 用4位数字表示 1901~2155年

```sql
CREATE TABLE class (
   id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name varchar(255),
   create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT id, name, CONVERT_TZ(update_time, 'UTC', '+8:00') AS local_update_time FROM class;
```

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
