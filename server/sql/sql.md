# SQL

如何学习 SQL https://www.zhihu.com/question/19552975

## SQL 语法

SQL 关键字不区分大小写。

关键字不能用作表或列的名字。

一行中有多个 SQL 需用 `;` 分隔，如果一行只有一个语句，是否可省略 `;` 视具体数据库定。

### 子句 clause

SQL 语句由子句构成，有些子句是必需的，有些则是可选的。一个子句通常由一个关键字加上所提供的数据组成。

Some of The Most Important SQL Commands

* SELECT - extracts data from a database
* UPDATE - updates data in a database
* DELETE - deletes data from a database
* INSERT INTO - inserts new data into a database
* CREATE DATABASE - creates a new database
* ALTER DATABASE - modifies a database
* CREATE TABLE - creates a new table
* ALTER TABLE - modifies a table
* DROP TABLE - deletes a table
* CREATE INDEX - creates an index (search key)
* DROP INDEX - deletes an index

### 5 高级数据过滤

`AND` 的优先级高于 `OR`，可以通过圆括号 `()` 进行分组。任何同时使用 `AND` 和 `OR` 的 `WHERE` 查询子句，都应该使用 `()` 进行分组，这样有利于消除歧义。

`IN` 操作符用来指定条件范围，范围中的每个条件都可以进行匹配。`WHERE vend_id IN ('DLL01', 'BRS01')`

### 6 用通配符进行过滤

`%` 匹配 0 到 多个字符，注意无法匹配 `NULL`
以下这些通配符支持情况不同 `_` `?` 匹配单个字符；`[]` 匹配字符集

通配符是一种极其重要和有用的搜索工具，但要注意对性能的影响，尽量不用。

### 7 创建计算字段

`SELECT` 语句为测试、检验函数和计算提供了很好的方法。如 `SELECT 3*2` 将返回 6。

### 8 使用数据处理函数

SQL 的数据处理函数在格式化、处理和过滤数据中非常有用，但各个 DBMS 的实现和支持情况差异较大，影响代码的可移植性。

### 10 分组数据

因为 `WHERE` 过滤指定的是行而不是分组，维持 SQL 提供了 `HAVING` 子句。

`WHERE` 过滤行 `HAVING` 过滤分组，`HAVING` 支持所有 `WHERE` 操作。

### 11 子查询

作为子查询的 `SELECT` 语句只能查询单个列，企图检索多个列将返回错误。

### 13 创建高级联结

#### 13.1 使用表别名

```sql
SELECT cust_name FROM Customers AS C, Orders AS O WHERE C.cust_id = O.cust_id
```

注：Oracle 中没有 AS 关键字，直接指定列名即可，上面的语句，到 Oracle 中的写法：

```sql
SELECT cust_name FROM Customers C, Orders O WHERE C.cust_id = O.cust_id
```

#### 13.2 使用不同类型的联结

自联结、自然联结、外联结

### 14 组合查询

### 15 插入数据

#### 15.1.3 插入检索出的数据

```sql
INSERT INTO Customers(cust_id) SELECT cust_id FROM CustNew;
```

### 18 视图

视图提供了一种封装 `SELECT` 语句的层次，可用来简化数据处理，重新格式化或保护基础数据。



