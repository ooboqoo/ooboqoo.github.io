# SQL 速查表

<style>#md h4 { color: #c33; } #md h4 small { color: #000; }</style>
<script>ooboqoo.contentsRegExp = /H[123]/;</script>

https://www.w3schools.com/sql/sql_insert.asp

笔记主要基于 ANSI SQL，但很多地方带有很浓的 MySQL 色彩。


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
SELECT prod_id, prod_name, prod_price FROM Products;  -- 检索出指定的列
SELECT DISTINCT vend_id FROM Products;  -- 去重，只返回不同的值
SELECT prod_name FROM Products LIMIT 2 OFFSET 3;  -- [MySQL] 跳过3行后的2行记录，限定可简写为 `LIMIT3, 2`
/* 排序 ORDER BY */
SELECT prod_price, prod_name FROM Products ORDER BY prod_price, prod_name;  -- 多列排序，先价格后名称
SELECT prod_id, prod_price, prod_name FROM Products ORDER BY 2, 3;  -- 按列位置排序(从1开始计数)
SELECT prod_id, prod_price, prod_name FROM Products ORDER BY prod_price DESC, 3;  -- 降序排序
/* 过滤数据 WHERE */
SELECT prod_name, prod_price FROM Products WHERE prod_price = 3.49;
/* 计算字段 & 别名 */
SELECT Concat(vend_name, ' (', vend_country, ')') AS vend_title FROM Vendors ORDER BY vend_name;
/* 执行算术计算 */
SELECT 3 * 2; SELECT Trim('  abc'); SELECT Now();  -- 省略 FROM 子句后就是简单地访问和处理表达式
```

#### UPDATE <small>更新记录</small>

```sql
UPDATE [LOW_PRIORITY] [IGNORE] table_name SET column1=new_value [, column2=new_value...]  
    [WHERE column_name=some_value];
```

```sql
UPDATE Customers SET ContactName='Alfred', City='Hamburg' WHERE CustomerName='Alfreds';
```

注: 如果不小心忘记了 `WHERE` 子句，后果很严重......

#### INSERT INTO <small>插入记录</small>

```sql
/* INSERT */
INSERT INTO tablename [(columns, ...)] VALUES(values, ...);

/* INSERT SELECT */
INSERT INTO tablename [(columns, ...)] SELECT columns, ... FROM tablename, ... [WHERE ...];
```

```sql
INSERT INTO table_name VALUES (value1, value2,...);                                   -- 完整字段插入
INSERT INTO table_name (column_name1, column_name2,...) VALUES (value1, value2,...);  -- 部分字段插入

INSERT INTO table2 SELECT * FROM table1;                                -- 插入所有列，两张表列数要相等
INSERT INTO table2 (column_name(s)) SELECT column_name(s) FROM table1;  -- 插入指定列
```

```sql
INSERT INTO Customers (CustomerName, City, Country) VALUES ('Cardinal', 'Stavanger', 'Norway');
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
SELECT prod_name, prod_price FROM Products WHERE prod_price < 10;  -- 检查单个值
SELECT * FROM orders WHERE order_date BETWEEN '2012-02-01' AND '2012-02-18';  -- 范围检查
SELECT cust_name FROM CUSTOMERS WHERE cust_email IS NULL;  -- 空值检查。注: 空值不会出现在不等于的过滤结果中
```

#### IN 操作符

`IN` 操作符用来指定条件范围，范围中的每个条件都可以进行匹配。`IN` 取一组由逗号分隔、括在圆括号中的合法值。

`IN` 的最大优点是可以包含其他 `SELECT` 语句，能够更动态地建立 `WHERE` 子句。

```sql
SELECT column_name(s) FROM table_name WHERE column_name IN (value1, value2, ..);
```

```sql
SELECT * FROM Customers WHERE City IN ('Paris', 'London');
SELECT cust_id FROM Orders WHERE order_num IN (
    SELECT order_num FROM OrderItems WHERE prod_id = 'RGAN01'  -- 子查询
);
```

#### NOT 操作符

大多数 DBMS 允许使用 `NOT` 否定任何条件。在复杂的子句中，`NOT` 是非常有用的。

`NOT` 关键字可以用在要过滤的列前，而不仅是在其后。

```sql
SELECT prod_name FROM Products WHERE NOT vend_id = 'DLL01' ORDER BY prod_name;
SELECT * FROM Products WHERE prod_price NOT BETWEEN 10 AND 20;
```

#### 逻辑操作符 AND / OR

SQL 允许设定多个过滤条件，这些条件通过 `AND` 或 `OR` 联结。`AND` 的优先级要高于 `OR`，可以通过圆括号 `()` 进行分组。

```sql
SELECT * FROM Customers WHERE Country='Germany' AND (City='Berlin' OR City='Munchen');
```

#### 通配符过滤 LIKE

利用通配符，可以创建比较特定数据的搜索模式。通配符本身实际上是 SQL 的 `WHERE` 子句中有特殊含义的字符，SQL 支持几种通配符。为在搜索子句中使用通配符，必须使用 `LIKE` 操作符。

注：操作符何时不是操作符？答案是，它作为谓词时。从技术上说，`LIKE` 是谓词而不是操作符。  
注: MySQL 还支持使用 `REGEXP` 进行正则过滤。

```sql
SELECT column_name(s) FROM table_name WHERE column_name (NOT) LIKE pattern;
```

```sql
SELECT * FROM Customers WHERE City LIKE 's%';
SELECT * FROM Customers WHERE Country NOT LIKE '%land%';
```

##### Wildcards:

* `%` A substitute for zero or more characters; 注: 无法匹配 `NULL`
* `_` A substitute for a single character;

### 计算字段与别名

#### AS (alias for column)

```sql
SELECT column_name AS column_alias FROM table_name
SELECT CustomerName AS Customer, ContactName AS [Contact Person] FROM Customers;
```

Tips: It requires quotation marks or square brackets if the column name contains spaces

```sql
SELECT column_name + ... AS column_alias FROM table_name     -- SQLServer 
SELECT CONCAT(column_names) AS column_alias FROM table_name  -- MySQL 
```

```sql
SELECT CustomerName, Address+', '+City+', '+PostalCode+', '+Country AS Address FROM Customers;
SELECT CustomerName, CONCAT(Address,', ',City,', ',PostalCode,', ',Country) AS Address FROM Customers;
```

#### AS (alias for table)

```sql
SELECT column_name FROM table_name AS table_alias
```

```sql
SELECT o.OrderID, o.OrderDate, c.CustomerName FROM Customers AS c, Orders AS o
    WHERE c.CustomerName="Around the Horn" AND c.CustomerID=o.CustomerID;
```

Remarks: Here we have used aliases to make the SQL shorter

Aliases can be useful when:

* There are more than one table involved in a query
* Functions are used in the query
* Column names are big or not very readable
* Two or more columns are combined together

### 汇总数据

详见聚集函数小节。

```sql
SELECT COUNT(DISTINCT cust_email) AS num_cust FROM customers;
```

### 分组数据 GROUP BY

分组数据涉及两个新 `SELECT` 语句子句：`GROUP BY` 和 `HAVING`。

```sql
SELECT vend_id, COUNT(*) AS num_prods FROM Products WHERE prod_price >= 4
    GROUP BY vend_id HAVING COUNT(*) > 2;
SELECT order_num, COUNT(*) AS items FROM OrderItems
    GROUP BY order_num HAVING COUNT(*) >= 3 ORDER BY items, order_num;
```

### 子查询 (SELECT...)

```sql
/* 利用子查询进行过滤 */
SELECT cust_id FROM Orders WHERE order_num IN (
    SELECT order_num FROM OrderItems WHERE prod_id = 'RGAN01'  -- 先执行子查询，完成后再执行父查询
);
/* 作为计算字段使用子查询，正常应使用联结，一般 DBMS 处理联结远比处理子查询要快地多。 */
SELECT cust_name, cust_state, (
    SELECT COUNT(*) FROM Orders WHERE Orders.cust_id = Customers.cust_id
) AS orders FROM Customers ORDER BY cust_name;
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
    FROM Vendors, Products WHERE Vendors.vend_id = Products.vend_id;
/* 内联结 */
SELECT vend_name, prod_name, prod_price
    FROM Vendors INNER JOIN Products ON Vendors.vend_id = Products.vend_id;
/* 多表联结 */
SELECT prod_name, vend_name, prod_price, quantity FROM OrderItems, Products, Vendors
    WHERE Products.vend_id = Vendors.vend_id AND OrderItems.prod_id = Products.prod_id;
```

#### 自联结

自联结其实是内联结的一种特殊用法。

```sql
SELECT c1.cust_id, c1.cust_name, c1.cust_contact FROM Customers AS c1, Customers AS c2
    WHERE c1.cust_name = c2.cust_name AND c2.cust_contact = 'Jim Jones';
```

#### 外联结

* LEFT JOIN 跟 

```sql
SELECT column_name(s) FROM table1 LEFT JOIN table2 ON table1.column_name=table2.column_name;
SELECT column_name(s) FROM table1 RIGHT JOIN table2 ON table1.column_name=table2.column_name;
```

PS: In some databases LEFT JOIN is called LEFT OUTER JOIN.

#### RIGHT JOIN

```sql

```

PS: In some databases RIGHT JOIN is called RIGHT OUTER JOIN.



### 组合查询 UNION

```sql
SELECT column_name(s) FROM table1 UNION (ALL) SELECT column_name(s) FROM table2
```

PS: UNION returns only distinct values, and UNION ALL returns duplicate values also

```sql
SELECT City, Country FROM Customers WHERE Country='Germany' UNION ALL
SELECT City, Country FROM Suppliers WHERE Country='Germany' ORDER BY City;
```

#### SELECT INTO (used to create backup copies of tables)

```sql
SELECT column_name(s) INTO new_table_name [IN externaldb] FROM original_table_name
```

```sql
SELECT CustomerName, ContactName AS NewName INTO CustomersBackup2013 FROM Customers;
```

#### INSERT INTO SELECT

```sql
INSERT INTO table2 (column_name(s)) SELECT column_name(s) FROM table1;
```

```sql
INSERT INTO Customers (CustomerName, Country) SELECT SupplierName, Country FROM Suppliers WHERE Country='Germany';
```


## Administer

#### 命令行批处理

```bash
# mysql -u root -p < filename.sql
```

```sql
CREAT DATABASE database_name
```

#### DROP DATABASE

```sql
DROP DATABASE database_name
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

#### GRANT

```sql
GRANT privileges [columns] ON item TO user_name [IDENTIFIED BY 'password']  
  [REQUIRE ssl_options] [WITH [GRANT OPTION | limit_options] ]
```

#### REVOKE

```sql
REVOKE privileges [(columns)] ON item FROM user_name  
REVOKE ALL PRIVILEGES, GRANT FROM user_name
```

#### LOAD DATA INFILE

```sql
LOAD DATA INFILE "filename" INTO TABLE tablename
```

#### OPTIMIZE

```sql
OPTIMIZE TABLE tablename
```


## TABLE &amp; INDEX

#### CREATE TABLE

```sql
CREATE TABLE table_name (column_name1 data_type(size), column_name2 data_type(size),....);
```

```sql
CREATE TABLE Persons (PersonID int unsigned not null auto_increment primary
key, LastName varchar(255), FirstName varchar(255)) ENGINE=InnoDB;
```

#### ALTER TABLE

```sql
ALTER TABLE table_name ADD column_name datatype  
ALTER TABLE table_name DROP COLUMN column_name  
ALTER TABLE table_name MODIFY COLUMN column_name datatype  
ALTER TABLE table_name CHANGE COLUMN column_name new_column_name
```

#### DROP TABLE

```sql
DROP TABLE table_name
```

#### TRUNCATE TABLE

```sql
TRUNCATE TABLE table_name (deletes only the data inside the table)
```

#### CREATE INDEX

```sql
CREATE [UNIQUE] INDEX index_name ON table_name (column_name)
```

```sql
CREATE INDEX PIndex ON Persons (LastName, FirstName)
```

#### DROP INDEX

```sql
ALTER TABLE table_name DROP INDEX index_name  -- MySQL
```

#### VIEW

```sql
CREATE VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition  
CREATE OR REPLACE VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition
DROP VIEW view_name
```


## 约束 Constraints

NOT NULL, UNIQUE, PRIMARY, FOREIGN, CHECK, DEFAULT

#### UNIQUE

```sql
CREATE TABLE Persons (P_Id int NOT NULL UNIQUE,...)        -- SQLServer / Oracle / Access
CREATE TABLE Persons(P_Id int NOT NULL,...,UNIQUE (P_Id))  -- MySQL
```

```sql
ALTER TABLE Persons ADD UNIQUE (P_Id)
ALTER TABLE Persons ADD CONSTRAINT uc_PersonID UNIQUE (P_Id,LastName)
ALTER TABLE Persons DROP CONSTRAINT uc_PersonID  -- SQLServer / Oracle / Access
ALTER TABLE Persons DROP INDEX uc_PersonID       -- MySQL
```

#### PRIMARY KEY

```sql
SQLServer / Oracle / Access: CREATE TABLE Persons (P_Id int NOT NULL PRIMARY
KEY,...)

MySQL: CREATE TABLE Persons(P_Id int NOT NULL,...,PRIMARY KEY (P_Id))

ALTER TABLE Persons ADD PRIMARY KEY (P_Id)

ALTER TABLE Persons ADD CONSTRAINT pk_PersonID PRIMARY KEY (P_Id,LastName)

SQLServer / Oracle / Access: ALTER TABLE Persons DROP CONSTRAINT pk_PersonID

MySQL: ALTER TABLE Persons DROP PRIMARY KEY
```

#### FOREIGN KEY

```sql
MySQL: CREATE TABLE Orders (...,FOREIGN KEY (P_Id) REFERENCES Persons(P_Id))

ALTER TABLE Orders ADD FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)
```

To allow naming of a FOREIGN KEY constraint, and for defining constraint on multiple columns:

```sql
ALTER TABLE Orders ADD CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)

MySQL: ALTER TABLE Orders DROP FOREIGN KEY fk_PerOrders
```

#### CHECK

```sql
MySQL: CREATE TABLE Persons (P_Id int NOT NULL,...,CHECK (P_Id>0))

ALTER TABLE Persons ADD CHECK (P_Id>0)

ALTER TABLE Persons ADD CONSTRAINT chk_Person CHECK (P_Id>0 AND
City='Sandnes')

MySQL: ALTER TABLE Persons DROP CHECK chk_Person
```

#### DEFAULT

```sql
CREATE TABLE Persons (...,City varchar(255) DEFAULT 'Sandnes')

CREATE TABLE Orders (...,OrderDate date DEFAULT GETDATE())

MySQL: ALTER TABLE Persons ALTER City SET DEFAULT 'SANDNES'

MySQL: ALTER TABLE Persons ALTER City DROP DEFAULT
```

#### AUTO_INCREMENT

```sql
CREATE TABLE Persons(ID int NOT NULL AUTO_INCREMENT,...);  -- MySQL
```

```sql
ALTER TABLE Persons AUTO_INCREMENT=100;  -- MySQL
```

#### NULL / NOT NULL

```sql
SELECT LastName,FirstName,Address FROM Persons WHERE Address IS [NOT] NULL
```

Note: It is not possible to compare NULL and 0; they are not equivalent.

#### NULL Functions

```sql
MySQL: SELECT ProductName,UnitPrice*(UnitsInStock+IFNULL(UnitsOnOrder,0)) FROM Products
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
SELECT prod_name, DATE_FORMAT(NOW(), "%Y-%m-%d") AS per_date FROM Products
```

### 聚集函数 Aggregate Functions

我们经常需要汇总数据而不用把它们实际检索出来，为此 SQL 提供了专门的聚集函数。

```sql
COUNT() AVG() SUM() MAX() MIN()  -- 可带 DISTINCT 参数
```

```sql
SELECT COUNT(cust_email) AS num_cust FROM customers;  -- 会忽略值为 `NULL` 的行; `COUNT(*)` 统计所有行数
SELECT ProductName, Price FROM Products WHERE Price > (SELECT AVG(DISTINCT Price) FROM Products);
SELECT SUM(Quantity) AS TotalItemsOrdered FROM OrderDetails;
SELECT COUNT(*) AS num_items, MIN(prod_price) AS price_min FROM Products;  -- 组合使用聚集函数
```
