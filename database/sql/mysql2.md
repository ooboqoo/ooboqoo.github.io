# SQL/MySQL 必知必会 2

如何学习 SQL https://www.zhihu.com/question/19552975


## 增/删/改记录

### 插入记录

```sql
INSERT INTO Customers(cust_id) SELECT cust_id FROM CustNew;
```

### 更新记录

### 删除记录


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


## 视图

视图提供了一种封装 `SELECT` 语句的层次，可用来简化数据处理，重新格式化或保护基础数据。


## 存储过程


## 游标


## 触发器


## 事务


## 改善性能

* MySQL 是一个多用户多线程的 DBMS，换言之，它经常同时执行多个任务。如果这些任务中的某一个执行缓慢，则所有请求都会执行缓慢。如果你遇到显著的性能不良，可使用 `SHOW PROCESSLIST` 显示所有活动进程。你还可以用 `KILL` 命令终结某个特定的进程。
* 总是有不止一种方法编写同一条 SELECT 语句。应该试验连接、并、子查询等，找出最佳的方法。
* 使用 EXPLAIN 语句让 MySQL 解析它将如何执行一条 SELECT 语句。
* 一般来说，存储过程执行得比一条一条地执行其中的各条语句要快。
* 应该重视使用正确的数据类型。
* 绝不要检索比需求还要多的数据。换言之，尽量避免使用 `SELECT *`
* 有的操作，包括 INSERT，支持一个可选的 DELAYED 关键字，如果使用它，将把控制立即返回给调用程序，并且一旦有可能就实际执行该操作。
* 在导入数据时，应该关闭自动提交。你可能还想删除索引，然后在导入完成后再重建它们。
* 必须建立索引数据库表以改善数据检索的性能。确定索引什么，需要分析使用的 SELECT 语句以找出重复的 WHERE 和 OEDER BY 子句。如果一个简单的 WHERE 子句返回结果所花的时间太长，则可以断定其中使用的列(或几个列)就是需要索引的对象。
* 你的 SELECT 语句中有一系列复杂的 OR 条件吗？通过使用多条 SELECT 语句和连接它们的 UNION 语句，你能看到极大的性能改进。
* 索引改善数据检索的性能，但损害数据插入、删除和更新性能。如果你有一些表，它们收集数据且不经常被搜索，则在有必要之前不要索引它们。(索引可根据需要灵活添加和删除)
* LIKE 很慢。一般来说，最好是使用 FULLTEXT 而不是 LIKE。
* 数据库是不断变化的实体。一组优化良好的表一会儿后可能就面目全非了。由于表的使用和内容的更改，理想的优化和配置也会改变。
* 最重要的规则就是，每条规则在某些条件下都会被打破。

```sql
查看当前设置
SHOW VARIABLES;
SHOW STATUS;

显示所有活动进程
SHOW PROCESSLIST;
KILL

EXPLAIN
```


