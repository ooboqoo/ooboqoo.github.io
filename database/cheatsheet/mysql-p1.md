# MySQL 速查表1

<style>#md h4 { color: #c33; } #md h4 small { color: #000; }</style>
<script>ooboqoo.contentsRegExp = /H[123]/;</script>


## 常用

```sql
/* 查询 */
SELECT DISTINCT vend_id FROM product WHERE ...;
/* 更新记录 */
UPDATE table_name SET column_name1 = value1, column_name2 = value2 WHERE column_name3 = value3;
/* 删除记录 */
DELETE FROM table_name [WHERE ...];
/* 插入记录 */
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...), (value1, value2, ...);
INSERT INTO table_name (column1, column2)
    SELECT column1, column2 FROM table_name2, table_name3 WHERE ...;
```


## 增删改查

#### SELECT <small>选择记录</small>

```sql
SELECT [options] items [INTO file_details]
    FROM table_name [WHERE conditions]
    [GROUP BY group_type] [HAVING where_definition] [ORDER BY order_type]
    [LIMIT limit_criteria] [PROCEDURE pro_name(arguments)] [lock_options];
```

```sql
SELECT * FROM table_name;  -- 检索所有列
SELECT prod_id, prod_name, prod_price FROM product;  -- 检索出指定的列
SELECT DISTINCT vend_id FROM product;  -- 去重，只返回不同的值
SELECT prod_name FROM product LIMIT 2 OFFSET 3;  -- 跳过3行后的2行记录，可简写为 `LIMIT3, 2`
/* 排序 ORDER BY */
SELECT prod_price, prod_name FROM product ORDER BY prod_price, prod_name;  -- 多列排序，先价格后名称
SELECT prod_id, prod_price, prod_name FROM product ORDER BY 2, 3;  -- 按列位置排序(从1开始计数)
SELECT prod_id, prod_price, prod_name FROM product ORDER BY prod_price DESC, 3;  -- 降序排序
/* 过滤数据 WHERE */
SELECT prod_name, prod_price FROM product WHERE prod_price = 3.49;
/* 计算字段 & 别名 */
SELECT CONCAT(vend_name, ' (', vend_country, ')') AS vend_title FROM vendor ORDER BY vend_name;
/* 执行算术计算 */
SELECT 3 * 2; SELECT TRIM('  abc'); SELECT NOW();  -- 省略 FROM 子句后就是简单地访问和处理表达式
```

#### UPDATE <small>更新记录</small>

```sql
UPDATE [LOW_PRIORITY] [IGNORE] table_name SET column1=new_value [, column2=new_value...]  
    [WHERE column_name=some_value];
```

```sql
UPDATE customer SET contact_name='Alfred', city='Hamburg' WHERE customer_name='Alfreds';
```

注: 如果不小心忘记了 `WHERE` 子句，后果很严重......

#### INSERT INTO <small>插入记录</small>

```sql
/* INSERT */
INSERT INTO table_name [(columns, ...)] VALUES (values, ...);

/* INSERT SELECT */
INSERT INTO table_name [(columns, ...)] SELECT columns, ... FROM table_name, ... [WHERE ...];
```

```sql
INSERT INTO table_name VALUES (value1, value2, ...);                                   -- 完整字段插入
INSERT INTO table_name (column_name1, column_name2, ...) VALUES (value1, value2,...);  -- 部分字段插入

INSERT INTO table2 SELECT * FROM table1;                                -- 插入所有列，两张表列数要相等
INSERT INTO table2 (column_name(s)) SELECT column_name(s) FROM table1;  -- 插入指定列
```

```sql
INSERT INTO customer (customer_name, city, country) VALUES
  ('Cardinal', 'Stavanger', 'Norway'),
  ('Gavin', 'Shanghai', 'China');
```

#### DELETE FROM <small>删除记录</small>

```sql
DELETE FROM table_name WHERE condition;
```


## 高级查询

### 过滤数据

```sql
SELECT column_name(s) FROM table_name WHERE condition(column_name operator value);
```

#### 关系运算符

`=` `>` `<` `>=` `<=` `<> 或 !=` `IS NULL` `BETWEEN`

```sql
SELECT prod_name, prod_price FROM product WHERE prod_price < 10;  -- 检查单个值
SELECT * FROM order WHERE order_date BETWEEN '2012-02-01' AND '2012-02-18';  -- 范围检查
SELECT cust_name FROM customer WHERE cust_email IS NULL;  -- 空值检查。注: 空值不会出现在不等于的过滤结果中
```

#### IN 操作符

`IN` 操作符用来指定条件范围，范围中的每个条件都可以进行匹配。`IN` 取一组由逗号分隔、括在圆括号中的合法值。

`IN` 的最大优点是可以包含其他 `SELECT` 语句，能够更动态地建立 `WHERE` 子句。

```sql
SELECT column_name(s) FROM table_name WHERE column_name IN (value1, value2, ..);
```

```sql
SELECT * FROM customer WHERE city IN ('Paris', 'London');
SELECT cust_id FROM order WHERE order_num IN (
    SELECT order_num FROM order_item WHERE prod_id = 'RGAN01'  -- 子查询
);
```

#### NOT 操作符

大多数 DBMS 允许使用 `NOT` 否定任何条件。在复杂的子句中，`NOT` 是非常有用的。

`NOT` 关键字可以用在要过滤的列前，而不仅是在其后。

```sql
SELECT prod_name FROM product WHERE NOT vend_id = 'DLL01' ORDER BY prod_name;
SELECT * FROM product WHERE prod_price NOT BETWEEN 10 AND 20;
```

#### 逻辑操作符 AND / OR

SQL 允许设定多个过滤条件，这些条件通过 `AND` 或 `OR` 联结。`AND` 的优先级要高于 `OR`，可以通过圆括号 `()` 进行分组。

```sql
SELECT * FROM customer WHERE country='Germany' AND (city='Berlin' OR city='Munchen');
```

#### 通配符过滤 LIKE

利用通配符，可以创建比较特定数据的搜索模式。通配符本身实际上是 SQL 的 `WHERE` 子句中有特殊含义的字符，SQL 支持几种通配符。为在搜索子句中使用通配符，必须使用 `LIKE` 操作符。

注：操作符何时不是操作符？答案是，它作为谓词时。从技术上说，`LIKE` 是谓词而不是操作符。  
注: MySQL 还支持使用 `REGEXP` 进行正则过滤。

```sql
SELECT column_name(s) FROM table_name WHERE column_name (NOT) LIKE pattern;
```

```sql
SELECT * FROM customer WHERE city LIKE 's%';
SELECT * FROM customer WHERE country NOT LIKE '%land%';
```

##### Wildcards:

* `%` A substitute for zero or more characters; 注: 无法匹配 `NULL`
* `_` A substitute for a single character;

### 计算字段与别名

#### AS (alias for column)

```sql
SELECT column_name AS column_alias FROM table_name;
SELECT CONCAT(column_name1, column_name2, ...) AS column_alias FROM table_name;
```

```sql
SELECT customer_name AS customer, contact_name AS 'contact person' FROM customer;
SELECT customer_name, CONCAT(address, ', ', city, ', ', country) AS address FROM customer;
```

#### AS (alias for table)

```sql
SELECT column_name FROM table_name AS table_alias
```

```sql
SELECT o.order_id, o.order_date, c.customer_name FROM customer AS c, order AS o
    WHERE c.customer_name='Around the Horn' AND c.customer_id=o.customer_id;
```

Aliases can be useful when:
  - There are more than one table involved in a query
  - Functions are used in the query
  - Column names are big or not very readable
  - Two or more columns are combined together

### 汇总数据

详见聚集函数小节。

```sql
SELECT COUNT(DISTINCT cust_email) AS cust_num FROM customer;
```

### 分组数据 GROUP BY

分组数据涉及两个新 `SELECT` 语句子句：`GROUP BY` 和 `HAVING`。

```sql
SELECT vend_id, COUNT(*) AS prod_num FROM product WHERE prod_price >= 4
    GROUP BY vend_id HAVING COUNT(*) > 2;
SELECT order_num, COUNT(*) AS item_num FROM order_item
    GROUP BY order_num HAVING COUNT(*) >= 3 ORDER BY item_num, order_num;
```

### 子查询 (SELECT...)

```sql
/* 利用子查询进行过滤 */
SELECT cust_id FROM order WHERE order_num IN (
    SELECT order_num FROM order_item WHERE prod_id = 'RGAN01'  -- 先执行子查询，完成后再执行父查询
);
/* 作为计算字段使用子查询，正常应使用联结，一般 DBMS 处理联结远比处理子查询要快地多。 */
SELECT cust_name, cust_state, (
    SELECT COUNT(*) FROM order WHERE order.cust_id = customer.cust_id
) AS order_num FROM customer ORDER BY cust_name;
```

### 表联结 JOIN

很好地理解联结及其语法是学习 SQL 的极为重要的部分。

#### 等值联结/内联结

```sql
SELECT column_name(s) FROM table1 INNER JOIN table2 ON table1.col_name = table2.col_name;  -- INNER 可省略
```

```sql
/* 等值联结 */
SELECT vend_name, prod_name, prod_price
    FROM vendor, product WHERE vendor.vend_id = product.vend_id;
/* 内联结 */
SELECT vend_name, prod_name, prod_price
    FROM vendor INNER JOIN product ON vendor.vend_id = product.vend_id;
/* 多表联结 */
SELECT prod_name, vend_name, prod_price, quantity FROM order_item, product, vendor
    WHERE product.vend_id = vendor.vend_id AND order_item.prod_id = product.prod_id;
```

#### 自联结

自联结其实是内联结的一种特殊用法。

```sql
SELECT c1.cust_id, c1.cust_name, c1.cust_contact FROM customer AS c1, customer AS c2
    WHERE c1.cust_name = c2.cust_name AND c2.cust_contact = 'Jim Jones';
```

#### 外联结

* LEFT JOIN 跟 

```sql
SELECT column_name(s) FROM table1 LEFT JOIN table2 ON table1.column_name=table2.column_name;
SELECT column_name(s) FROM table1 RIGHT JOIN table2 ON table1.column_name=table2.column_name;
```

#### RIGHT JOIN

```sql

```

### 组合查询 UNION

```sql
SELECT column_name(s) FROM table1 UNION (ALL) SELECT column_name(s) FROM table2;
```

PS: UNION returns only distinct values, and UNION ALL returns duplicate values also

```sql
SELECT City, Country FROM customer WHERE Country='Germany' UNION ALL
SELECT City, Country FROM Suppliers WHERE Country='Germany' ORDER BY City;
```

#### SELECT INTO (used to create backup copies of tables)

```sql
SELECT column_name(s) INTO new_table_name [IN externaldb] FROM original_table_name;
```

```sql
SELECT CustomerName, ContactName AS NewName INTO customerBackup2013 FROM customer;
```

#### INSERT INTO SELECT

```sql
INSERT INTO table2 (column_name(s)) SELECT column_name(s) FROM table1;
```

```sql
INSERT INTO customer (CustomerName, Country) SELECT SupplierName, Country FROM Suppliers WHERE Country='Germany';
```


## Administer

#### 命令行批处理

```bash
# mysql -u root -p < filename.sql
```

```sql
source file_name.sql
```

#### CREATE/DROP DATABASE

```sql
CREATE DATABASE database_name;

DROP DATABASE database_name;
```

```sql
CREATE USER username[@hostname]  [IDENTIFIED BY 'password'];
```

#### SHOW

```sql
SHOW DATABASES [like_or_where]
SHOW TABLES [FROM database][like_or_where]
SHOW COLUMS FROM table [FROM database][like_or_where]
SHOW INDEX FROM table [FROM database]
SHOW GRANTS FOR user
DESCRIBE table [column]
```

```sql
show databases;  -- 显示数据库列表
show tables;     -- 显示当前数据库内的列表
show columns from <table_name>;  -- 显示当前表的列
describe <table_name>;           -- 效果同上
show grants;    -- 显示授予用户的权限
```

#### GRANT

```sql
GRANT privileges [columns] ON item TO user_name [IDENTIFIED BY 'password']  
  [REQUIRE ssl_options] [WITH [GRANT OPTION | limit_options] ]
```

#### REVOKE

```sql
REVOKE privileges [(columns)] ON item FROM user_name;
REVOKE ALL PRIVILEGES, GRANT FROM user_name;
```

#### LOAD DATA INFILE

```sql
LOAD DATA INFILE "filename" INTO TABLE tablename;
```

#### OPTIMIZE

```sql
OPTIMIZE TABLE tablename;
```


## TABLE & INDEX

#### CREATE TABLE

```sql
CREATE TABLE tablename (
  column  datatype  [NULL|NOT NULL]  [CONSTRAINTS],
  column  datatype  [NULL|NOT NULL]  [CONSTRAINTS],
);
```

```sql
CREATE TABLE person (
    person_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(255),
    first_name VARCHAR(255),
) ENGINE=InnoDB;
```

#### ALTER TABLE

```sql
ALTER TABLE table_name ADD column_name datatype;
ALTER TABLE table_name DROP COLUMN column_name;
ALTER TABLE table_name MODIFY COLUMN column_name datatype;
ALTER TABLE table_name CHANGE COLUMN column_name new_column_name;
```
```sql
ALTER TABLE tablename (
  ADD   column           datatype  [NULL|NOT NULL]  [CONSTRAINTS],
  ADD   column1 column2  datatype  [NULL|NOT NULL]  [CONSTRAINTS],
  DROP  column,
);
```

#### DROP TABLE

```sql
DROP TABLE table_name;
```

#### TRUNCATE TABLE

```sql
TRUNCATE TABLE table_name (deletes only the data inside the table);
```

#### CREATE INDEX

```sql
CREATE [UNIQUE] INDEX index_name ON table_name (column_name [DESC], ...);
```

```sql
CREATE INDEX PIndex ON Persons (LastName, FirstName);
```

#### DROP INDEX

```sql
ALTER TABLE table_name DROP INDEX index_name;
```

#### VIEW

```sql
CREATE VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition;
CREATE [OR REPLACE] VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition;
DROP VIEW view_name;
```


## 约束 Constraints

NOT NULL, UNIQUE, PRIMARY, FOREIGN, CHECK, DEFAULT

#### UNIQUE

```sql
CREATE TABLE Persons(P_Id int NOT NULL,...,UNIQUE (P_Id));
```

```sql
ALTER TABLE Persons ADD UNIQUE (P_Id);
ALTER TABLE Persons ADD CONSTRAINT uc_PersonID UNIQUE (P_Id,LastName);
ALTER TABLE Persons DROP INDEX uc_PersonID;
```

#### PRIMARY KEY

```sql
CREATE TABLE Persons(P_Id int NOT NULL,...,PRIMARY KEY (P_Id));

ALTER TABLE Persons ADD PRIMARY KEY (P_Id);

ALTER TABLE Persons ADD CONSTRAINT pk_PersonID PRIMARY KEY (P_Id,LastName);

ALTER TABLE Persons DROP PRIMARY KEY;
```

#### FOREIGN KEY

```sql
MySQL: CREATE TABLE Orders (...,FOREIGN KEY (P_Id) REFERENCES Persons(P_Id));

ALTER TABLE Orders ADD FOREIGN KEY (P_Id) REFERENCES Persons(P_Id);
```

To allow naming of a FOREIGN KEY constraint, and for defining constraint on multiple columns:

```sql
ALTER TABLE Orders ADD CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id) REFERENCES Persons(P_Id);

ALTER TABLE Orders DROP FOREIGN KEY fk_PerOrders;
```

#### CHECK

```sql
CREATE TABLE Persons (P_Id int NOT NULL,...,CHECK (P_Id>0));

ALTER TABLE Persons ADD CHECK (P_Id>0);

ALTER TABLE Persons ADD CONSTRAINT chk_Person CHECK (P_Id>0 AND city='Sandnes');

ALTER TABLE Persons DROP CHECK chk_Person;
```

#### DEFAULT

```sql
CREATE TABLE Persons (...,City varchar(255) DEFAULT 'Sandnes');

CREATE TABLE Orders (...,OrderDate date DEFAULT GETDATE());

ALTER TABLE Persons ALTER City SET DEFAULT 'SANDNES';

ALTER TABLE Persons ALTER City DROP DEFAULT;
```

#### AUTO_INCREMENT

```sql
CREATE TABLE Persons(ID int NOT NULL AUTO_INCREMENT,...);
```

```sql
ALTER TABLE Persons AUTO_INCREMENT=100;
```

#### NULL / NOT NULL

```sql
SELECT LastName,FirstName,Address FROM Persons WHERE Address IS [NOT] NULL;
```

Note: It is not possible to compare NULL and 0; they are not equivalent.

#### NULL Functions

```sql
SELECT ProductName,UnitPrice*(UnitsInStock+IFNULL(UnitsOnOrder,0)) FROM product;
```

