# SQL/MySQL 必知必会

<script>ooboqoo.contentsRegExp = /H[123]/;</script>


## 基础

### 数据库基础

**数据库 database** - 保存有组织的数据的容器(通常*是一个文件或一组文件*)  
**数据库管理系统 DBMS** - 数据库是通过 DBMS 创建和操纵的容器

**表 table** - 某种特定类型数据的结构化清单  
**模式 schema** - 关于数据库和表的布局及特性的信息

**列 column** - 表中的一个字段，所有表都是由一个或多个列组成的  
**数据类型 datatype** - 定义了列可以存储哪些数据种类。注: 数据类型及其名称是 SQL 不兼容的一个主要原因

**行 row** - 表中的一个记录 record

**主键 primary key** - 一列或一组列，其值能够唯一标识表中的每一行。(*唯一*、*非 NULL*) + (不可改、不重用)  
**外键 foreign key** - 某个表中的一列，它包含另一个表的主键值，定义了两个表之间的关系。

### SQL

SQL (发 S-Q-L 或 sequel)是结构化查询语言 Structured Query Language 的缩写。SQL 是一种专门用来与数据库沟通的语言。设计 SQL 的目的是提供一种从数据库中读写数据的简单有效的方法。SQL 简单易学但又很强大，灵活使用可进行非常复杂和高级的数据库操作。

标准 SQL 由 ANSI 标准委员会管理，称为 ANSI SQL。所有主要的 DBMS，即使有自己的扩展，也都支持 ANSI SQL。

关键字 keyword - 作为SQL组成部分的保留字，关键字不能用作表或列的名字。

### SQL 语法

*大小写* - SQL 关键字不区分大小写。但是表名、列名、值名会根据 DBMS 会有所不同。许多开发人员喜欢对 SQL 关键字使用大写，而对列名和表名使用小写，这样做使代码更易于阅读和调试。

关键字不能用作表或列的名字。

一行中有多个 SQL 需用 `;` 分隔，如果一行只有一个语句，是否可省略 `;` 视具体数据库而定。

*空格与换行* - 处理 SQL 语句时，所有空格都会被忽略，所以空格多少、是否分行都不影响。多数人认为将 SQL 语句分成多行跟容易阅读和调试。

*注释* - 支持行内注释 `-- 注释内容` 和多行注释 `/* 多行内容 */`

### 子句 clause

SQL 语句由子句构成，有些子句是必需的，有些则是可选的。一个子句通常由一个关键字加上所提供的数据组成。


## 检索数据 `SELECT`

*不能部分使用 DISTINCT* - DISTINCT 关键字应用于所有列而不仅是前置它的列。

### 排序 `ORDER BY`

*通过非选择列进行排序* - 一般 `ORDER BY` 子句使用某个显示列进行排序，但用非检索的列排序也是完全合法的。

*多个列排序* - 按多个列排序，只要指定列名，列名之间用逗号分开即可。排序完全按所规定的顺序进行，如对姓、名两列排序，会先按姓排序，然后再每个姓中再按名排序。

*在多个列上降序排序* - 如果想在多个列上进行降序排序，必须对每个列指定 `DESC` 关键字。

*区分大小写和排序顺序* - 在对文本性的数据进行排序时，A与a相同吗？a位于B之前还是位于Z之后？答案取决于数据库如何设置。

```sql
SELECT prod_id, prod_price, prod_name FROM product ORDER BY prod_price DESC, prod_name;
```

### 过滤 `WHERE`

`AND` 的优先级要高于 `OR`，可以通过圆括号 `()` 进行分组。任何同时使用 `AND` 和 `OR` 的 `WHERE` 查询子句，都应该使用 `()` 进行分组，这样有利于消除歧义。

`IN` 操作符用来指定条件范围，范围中的每个条件都可以进行匹配。`WHERE vend_id IN ('DLL01', 'BRS01')`


#### 通配符

* `%` 匹配 0 到 多个字符，注意无法匹配 `NULL`
* `_` 或 `?` 匹配单个字符，MySQL 用 `_`
* `[]` 匹配字符集

通配符是一种极其重要和有用的搜索工具，但要注意对性能的影响，尽量不用。


#### 正则表达式


### 函数

SQL 的数据处理函数在格式化、处理和过滤数据中非常有用，但各个 DBMS 的实现和支持情况差异较大，影响代码的可移植性。

```sql
/* 执行算术计算 */
SELECT 3 * 2; SELECT TRIM('  abc'); SELECT NOW();  -- 省略 FROM 子句后就是简单地访问和处理表达式
```

`SELECT` 语句为测试、检验函数和计算提供了很好的方法。如 `SELECT 3*2` 将返回 6。

### 别名 `AS`

别名 alias 是一个字段或值的替换名。如，当实际的表列名包含非法字符(如空格)时重命名，当原名字含混或容易误解时扩充它。

别名有时也称为导出列 derived column。别名用 `AS` 关键字赋予。

在很多 DBMS 中，`AS` 关键字是可选的，不过最好不要省略，这被视为一条最佳实践。

### 计算字段

通过函数计算得到的只是一个值，没有名字，因此客户端没法引用它，需要使用 `AS` 命名这个新字段。

计算字段可以对检索出的字段进行 *转换、计算、格式化*。计算字段是运行时在 SELECT 语句内动态创建的。

许多转换和格式化工作也可以放到客户端处理，但在数据库服务器上完成这些操作 *比客户端要快得多*。

```sql
/* 计算字段 & 别名 */
SELECT CONCAT(vend_name, ' (', vend_country, ')') AS vend_title FROM vendor ORDER BY vend_name;
```


## 汇总数据

## 分组数据 `GROUP BY`

### 创建分组

在使用 GROUP BY 子句前，需要知道一些重要的规定。

* GROUP BY 子句可以包含任意数目的列，因而可以对分组进行嵌套，更细致地进行数据分组。
* 如果在 GROUP BY 子句中嵌套了分组，数据将在最后指定的分组上进行汇总。换句话说，在建立分组时，指定的所有列都一起计算（所以不能从个别的列取回数据）。
* GROUP BY 子句中列出的每一列都必须是检索列或有效的表达式（但不能是聚集函数）。如果在 SELECT 中使用表达式，则必须在 GROUP BY 子句中指定相同的表达式。不能使用别名。
* 大多数 SQL 实现不允许 GROUP BY 列带有长度可变的数据类型（如文本或备注型字段）。
* 除聚集计算语句外， SELECT 语句中的每一列都必须在 GROUP BY 子句中给出。
* 如果分组列中包含具有 NULL 值的行，则 NULL 将作为一个分组返回。如果列中有多行 NULL 值，它们将分为一组。
* GROUP BY 子句必须出现在 WHERE 子句之后， ORDER BY 子句之前。

### 过滤分组 `HAVING`

因为 `WHERE` 过滤指定的是行而不是分组，为此 SQL 提供了 `HAVING` 子句。`HAVING` 非常类似于 `WHERE`。事实上，目前为止所学过的所有类型的 `WHERE` 子句都可以用 `HAVING` 来替代。唯一的差别是，`WHERE` 过滤行，而 `HAVING` 过滤分组。


## 子查询 `()`

### 利用子查询进行过滤

```sql
SELECT cust_id FROM orders WHERE order_num IN (
  SELECT order_num FROM order_items WHERE prod_id = 'RGAN01'
);
```

*SELECT 语句中的子查询总是「从内向外」处理*。在处理上面的 SELECT 语句时， DBMS 实际上执行了两个操作。

```sql
SELECT order_num FROM orderitems WHERE prod_id='RGAN01'
SELECT cust_id FROM orders WHERE order_num IN (20007, 20008)
```

在 `WHERE` 子句中使用子查询能够编写出功能很强且很灵活的 SQL 语句。对于能嵌套的子查询的数目没有限制，不过在实际使用时由于性能的限制，不能嵌套太多的子查询。

注：作为子查询的 `SELECT` 语句 *只能查询单个列*，企图检索多个列将返回错误。

### 作为计算字段使用子查询

```sql
SELECT cust_name, cust_state, (
  SELECT COUNT(*) FROM orders WHERE orders.cust_id = customers.cust_id
) AS order_num FROM customers ORDER BY cust_name;
```

注：虽然这里给出的样例代码运行良好，但它并不是解决这种数据检索的最有效方法。后面学习 `JOIN` 时还会遇到这个例子。


## 联结表

SQL 最强大的功能之一就是能在数据查询中执行联结。很好地理解联结及其语法是学习 SQL 的极为重要的部分。

[文氏图演示，一图看懂表联结:](https://www.w3xue.com/exp/article/20191/19727.html)

```sql
CREATE TABLE `a` (`id` INT(6) NOT NULL AUTO_INCREMENT, `mark` CHAR(8) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE `b` (`id` INT(6) NOT NULL AUTO_INCREMENT, `mark` CHAR(8) NOT NULL, PRIMARY KEY (`id`));

INSERT INTO a VALUES (1, 'ab'), (2, 'a');
INSERT INTO b VALUES (1, 'ab'), (3, 'b');

/* INNER JOIN */
SELECT a.id AS a_id, a.mark AS a_mark, b.id AS b_id, b.mark AS b_mark
FROM a INNER JOIN b ON a.mark = b.mark;

/* LEFT JOIN */
SELECT a.id AS a_id, a.mark AS a_mark, b.id AS b_id, b.mark AS b_mark
FROM a LEFT JOIN b ON a.mark = b.mark;

/* RIGHT JOIN */
SELECT a.id AS a_id, a.mark AS a_mark, b.id AS b_id, b.mark AS b_mark
FROM a RIGHT JOIN b ON a.mark = b.mark;

/* FULL OUTER JOIN (MySQL 不直接支持，通过 UNION 模拟实现) */
SELECT * FROM a LEFT JOIN b ON a.mark = b.mark
UNION
SELECT * FROM a RIGHT JOIN b ON a.mark = b.mark;

/* LEFT JOIN EXCLUDING INNER JOIN */
SELECT a.id AS a_id, a.mark AS a_mark, b.id AS b_id, b.mark AS b_mark
FROM a LEFT JOIN b ON a.mark = b.mark
WHERE b.mark IS NULL;

/* RIGHT JOIN EXCLUDING INNER JOIN */
SELECT a.id AS a_id, a.mark AS a_mark, b.id AS b_id, b.mark AS b_mark
FROM a RIGHT JOIN b ON a.mark = b.mark
WHERE a.mark IS NULL;

/* FULL OUTER JOIN EXCLUDING INNER JOIN */
SELECT * FROM a LEFT JOIN b ON a.mark = b.mark WHERE b.mark IS NULL
UNION ALL
SELECT * FROM a RIGHT JOIN b ON a.mark = b.mark WHERE a.mark IS NULL;
```

### 联结

#### 关系表

相同的数据出现多次决不是一件好事，这是关系数据库设计的基础。*关系表的设计就是要把信息分解成多个表，一类数据一个表*。各表通过某些共同的值互相关联(所以才叫关系数据库)。

关系数据可以有效地存储，方便地处理。因此，关系数据库的可伸缩性远比非关系数据库要好。

#### 为什么使用联结

如前所述，将数据分解为多个表能更有效地存储，更方便地处理，并且可伸缩性更好。但这些好处是有代价的。

如果数据存储在多个表中，怎样用一条 `SELECT` 语句就检索出数据呢？

答案是使用联结。简单说，联结是一种机制，用来在一条 `SELECT` 语句中关联表，因此称为联结。使用特殊的语法，可以联结多个表返回一组输出，联结在运行时关联表中正确的行。

### 创建联结

### WHERE 子句的重要性

在一条 SELECT 语句中联结几个表时，相应的关系是在运行中构造的。在数据库表的定义中没有指示 DBMS 如何对表进行联结的内容。你必须自己做这件事情。

在联结两个表时，实际要做的是将第一个表中的每一行与第二个表中的每一行配对。`WHERE` 子句作为过滤条件，只包含那些匹配给定条件（这里是联结条件）的行。没有 `WHERE` 子句，第一个表中的每一行将与第二个表中的每一行配对，而不管它们逻辑上是否能配在一起。

由没有联结条件的表关系返回的结果为笛卡儿积。检索出的行的数目将是第一个表中的行数乘以第二个表中的行数。

#### 内联结

等值联结，它基于两个表之间的相等测试。这种联结也称为内联结。

### 13.1 使用表别名

```sql
SELECT cust_name FROM customers AS t1, orders AS t2 WHERE t1.cust_id = t2.cust_id
```

### 自联结

自联结其实是内联结的一种特殊用法。

```sql
SELECT c1.cust_id, c1.cust_name, c1.cust_contact FROM Customers AS c1, Customers AS c2
    WHERE c1.cust_name = c2.cust_name AND c2.cust_contact = 'Jim Jones';
```

### 自然联结

无论何时对表进行联结，应该至少有一列不止出现在一个表中(被联结的列)。标准的联结返回所有数据，相同的列甚至多次出现。自然联结排除多次出现，使每一列只返回一次。怎样完成这项工作呢？答案是，系统不完成这项工作，由你自己完成它。

事实上，我们迄今为止建立的每个内联结都是自然联结，很可能永远都不会用到不是自然联结的内联结。

```sql
SELECT C.*, O.order_num, O.order_date, OI.prod_id, OI.quantity, OI.item_price
    FROM Customers AS C, Orders AS O, OrderItems AS OI
    WHERE C.cust_id = O.cust_id AND OI.order_num = O.order_num AND prod_id = 'RGAN01';
```

### 外联结

许多联结将一个表中的行与另一个表中的行相关联，但有时候需要包含没有关联行的那些行。例如，可能需要使用联结完成以下工作：

* 对每个顾客下的订单进行计数，包括那些至今尚未下订单的顾客；
* 列出所有产品以及订购数量，包括没有人订购的产品；
* 计算平均销售规模，包括那些至今尚未下订单的顾客。

在上述例子中，联结包含了那些在相关表中没有关联行的行。这种联结称为外联结。

在使用 `OUTER JOIN` 语法时，必须使用 `RIGHT` 或 `LEFT` 关键字指定包括其所有行的表。





## 组合查询 `UNION`

UNION 可把多条查询的结果作为一条组合查询返回。可极大简化复杂的 WHERE 子句，简化从多个表中检索数据的工作。

组合查询通常称为 **并 union** 或 **复合查询 compound query**。

有两种情况下需要使用组合查询：
* 在单个查询中从不同的表返回类似结构的数据
* 对单个表执行多个查询，按单个查询返回数据

```sql
/* 找出单价小于5的物品 + 供应商 1001 和 1002 生产的所有物品 */
SELECT vend_id, prod_id, prod_price FROM product WHERE prod_price < 5
UNION
SELECT vend_id, prod_id, prod_price FROM product WHERE vend_id IN (1001, 1002);

/* 或采用单条 SELECT 语句 */
SELECT vend_id, prod_id, prod_price FROM product
WHERE prod_price < 5 OR vend_id IN (1001, 1002);
```

### UNION ALL 与 UNION

`UNION` 会从查询结果集中 *自动去除重复的行*，它的行为与单条 SELECT 语句中使用多个 WHERE 子句条件一样。  
如果需要每个条件的匹配行全部出现(包括重复行)，则必须使用 `UNION ALL`。

### 对组合结果排序

在用 `UNION` 查询时，只能使用一条 `ORDER BY` 子句，它必须出现在最后一条 SELECT 语句之后。对于结果集，不存在用一种方式排序一部分，而又用另一种方式排序另一部分的情况。

```sql
SELECT vend_id, prod_id, prod_price FROM product WHERE prod_price < 5
UNION
SELECT vend_id, prod_id, prod_price FROM product WHERE vend_id IN (1001, 1002)
ORDER BY vend_id, prod_price;
```


## 全文本搜索



## 表操作

### 创建表

一般有两种创建表的方法：
  * 使用具有交互式创建和管理表的工具
  * 直接用 SQL 语句创建

```sql
CREATE TABLE `customers` (
  `cust_id` INT(11) NOT NULL AUTO_INCREMENT,
  `cust_name` CHAR(50) NOT NULL COMMENT '顾客姓名',
  `cust_email` CHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`cust_id`)
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=10006;
```

#### AUTO_INCREMENT

每个表只允许一个 AUTO_INCREMENT 列，而且它必须被索引(如，通过使它成为主键)。

覆盖 AUTO_INCREMENT - 你可以简单地在 INSERT 语句中指定一个值，只要它是唯一的，该值将被用来替代自动生成的值。后续的增量将开始使用该手工插入的值。

确定 AUTO_INCREMENT 值 - 可使用 last_insert_id() 函数获取

#### DEFAULT

许多数据库开发人员使用默认值而不是NULL列，特别是对用于计算或数据分组的列更是如此。

#### 引擎类型

每个 DBMS 内都有一个内部引擎来管理和处理数据，或者说都有一个内部引擎来出来 SQL 语句。MySQL 打包了多个引擎，它们具有各自不同的功能和特性，为不同的任务选择正确的引擎能获得良好的功能和灵活性。

InnoDB 是一个可靠的事务处理引擎，但不支持全文本搜索。  
MEMORY 的功能等同于 MyISAM，但由于数据存储在内存中，速度很快(特别适合于临时表)。  
MyISAM 是一个性能极高的引擎，它支持全文本搜索，但不支持事务处理。

*外键不能跨引擎* - 混用引擎类型有一个大缺陷，外键(用于强制实施引用完整性)不能跨引擎，即，使用一个引擎的表不能引用具有使用不同引擎的表的外键。

### 更新表

理想状态下，当表中存储数据以后，该表就不应该再被更新。在表的设计过程中需要花费大量时间来考虑，以便后期不对该表进行大的改动。

ALTER TABLE 的一种常见用途是定义外键。

```sql
ALTER TABLE vendors ADD vend_phone CHAR(20);

ALTER TABLE vendors DROP COLUMN vend_phone;

ALTER TABLE orders ADD CONSTRAINT fk_orders_customers
FOREIGN KEY (cust_id) REFERENCES customers (cust_id);
```

复杂的表结构更改一般需要手动删除过程，它涉及以下步骤：
* 用新的列布局创建一个新表
* 使用 INSERT SELECT 语句从旧表复制数据到新表。如有必要，可使用转换函数和计算字段
* 检验包含所需数据的新表
* 重命名旧表(如确定也可以删除它)
* 重命名新表
* 根据需要，重新创建触发器、存储过程、索引和外键

### 删除/重命名表

```sql
DROP TABLE customers2;

RENAME TABLE backup_customers TO customers,
             backup_vendors TO vendors;
```

## 索引

在关系数据库中，如果有上万甚至上亿条记录，在查找记录的时候，想要获得非常快的速度，就需要使用索引。

索引是关系数据库中对某一列或多个列的值进行预排序的数据结构。通过使用索引，可以让数据库系统不必扫描整个表，而是直接定位到符合条件的记录，这样就大大加快了查询速度。

*索引的效率取决于索引列的值是否散列*，即该列的值如果越互不相同，那么索引效率越高。反过来，如果记录的列存在大量相同的值，例如性别这种就没有意义。

可以对一张表创建多个索引。索引的优点是提高了查询效率，缺点是在插入、更新和删除记录时，需要同时修改索引，因此，索引越多，插入、更新和删除记录的速度就越慢。

```sql
ALTER TABLE student ADD INDEX idx_name_score (name, score);  -- 索引名称是任意的
```

### 唯一索引

在设计关系数据表的时候，看上去唯一的列，例如身份证号、邮箱地址等，因为他们具有业务含义，因此不宜作为主键。

但是，这些列根据业务要求，又具有唯一性约束：即不能出现两条记录存储了同一个身份证号。这个时候，就可以给该列添加一个唯一索引。例如，我们假设 student 表的 name 不能重复：

```sql
ALTER TABLE student ADD UNIQUE INDEX uni_name (name);
```

通过 `UNIQUE` 关键字我们就添加了一个唯一索引。

也可以只对某一列添加一个唯一约束而不创建唯一索引：

```sql
ALTER TABLE students ADD CONSTRAINT uni_name UNIQUE (name);
```

这种情况下，name 列没有索引，但仍然具有唯一性保证。

无论是否创建索引，对于用户和应用程序来说，使用关系数据库不会有任何区别。这里的意思是说，当我们在数据库中查询时，如果有相应的索引可用，数据库系统就会自动使用索引来提高查询效率，如果没有索引，查询也能正常执行，只是速度会变慢。因此，索引可以在使用数据库的过程中逐步优化。



## 视图

视图提供了一种封装 `SELECT` 语句的层次，可用来简化数据处理，重新格式化或保护基础数据。


## 游标


## 触发器


## 事务


