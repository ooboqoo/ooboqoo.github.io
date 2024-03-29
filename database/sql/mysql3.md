# SQL 进阶


## SQL 规范

https://github.com/alibaba/p3c

### 一、基础规范

1. 表存储引擎必须使用 InnoDB。
2. 表字符集默认使用 utf8，必要时候使用 utf8mb4(emoji表情时)。
3. 禁止使用 存储过程，视图，触发器，Event。
4. 禁止在数据库中存储大文件(二进制及大文本)。
5. 禁止在线上环境做数据库压力测试。
6. 测试，开发，线上数据库环境必须隔离。

### 二、命名规范

原则：命名应该有意义，简短。

1. 数据库名、表名、字段名 都必须用小写或数字，采用下划线分隔。
2. 数据库名尽量跟应用名保持一致。
2. 表名为单数形式。
3. 表名最好遵循 `业务名称_表的作用` 格式
3. 主键索引名为 `pk_字段名` 唯一索引名为 `uk_字段名` 普通索引名为 `idx_字段名`。
4. 库备份命名 `bak_xxx_日期`。

### 三、设计规范

1. 所有表必须有注释，描述该表作用。
2. 除通用列外的其它列必须有注释，描述该列作用。
    * 如 `id` `create_time` `update_time` 这些通用字段没有特殊意义时，可以不用加注释。
    * 需要为当作枚举使用的列注释其所有可能出现值的意义。如tinyint(1): 0为a,1为b,2为c。

#### 表设计规范

1. 表必须有主键，数字主键统一使用长整型 `bigint`，长度为`20`，字段名称建议为 `id`。
2. 表必备三字段 `id` `create_time` `update_time`
    * `create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT`
    * `update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT`
3. 不得使用外键与级联，一切外键概念必须在应用层解决。外键与级联更新适用于单机低并发，不适合分布式、高并发集群；级联更新是强阻塞，存在数据库更新风暴的风险；外键影响数据库的插入速度。
4. 适当数据冗余，减少表关联查询。
5. 建议将大字段，访问频度低的字段拆分到单独的表中存储，分离冷热数据。
6. 控制单表数量，合理分表，单表行数超过 500W 或单表容量超过 2GB 才推荐分库分表。

#### 列设计规范

1. 根据业务区分使用 `tinyint`/`int`/`bigint`，分别会占用1/4/8字节。
2. 根据业务区分使用 `char`/`varchar`。
3. 所有字段定义不允许为 `NULL`，业务非必填字段请设默认值。
4. 使用 `tinyint` 来代替 `enum`。
5. 小数类型为 `decimal`，禁止使用 `float` 和 `double`。在存储的时候，`float` 和 `double` 都存在精度损失的问题，很可能在比较值的时候，得到不正确的结果。

#### 索引规范

1. 唯一索引使用 `uniq_表名_[字段名]` 来命名。
2. 非唯一索引使用 `idx_表名_[字段名]` 来命名。
3. 单张表索引数量建议控制在5个以内。
4. 组合索引字段数不建议超过5个。
5. 不建议在频繁更新的字段上建立索引。
6. 建索引的列必须保证其离散值。
7. 业务上具有唯一特性的字段，即使是组合字段，都必须建立唯一索引。
8. 在 varchar 字段上建立索引时，必须指定索引长度，没必要对全字段建立索引。一般长度为20的索引，区分度会高达90%以上，可以使用 `count(distinct left(列名,索引长度)) / count(*)` 的区分度来确定。

建组合索引的时候，区分度最高的在最左边。
正例:如果 where a = ? and b = ?，a 列的几乎接近于唯一值，那么只需要单建 idx_a 索引即可。 说明:存在非等号和等号混合判断条件时，在建索引时，请把等号条件的列前置。如:where c > ? and d = ? 那么即使 c 的区分度更高，也必须把 d 放在索引的最前列，即建立组合索引 idx_d_c。

### 四、SQL 使用规范

1. 禁止使用 `SELECT *`，只获取必要字段。
2. 禁止在where条件列使用函数或者表达式：减少数据库的计算，把需要计算的内容尽可能计算好当参数传入。
3. 禁止全表扫描，除明确知道表数据量非常小，并且后续不会线性增加。
4. 正常表关联查询不允许超过三张。
5. 禁止负向查询以及左模糊匹配查询。禁止进行大数据量模糊匹配。
6. OR改写为 `IN()`，或者 `UNION`
7. 使用批量操作代替多个单条操作(批量insert，批量查询)。
8. 分页操作时，必须保证其limit的高效，能够迅速定位到起始页。
9. 所写的SQL，必须了解其执行计划，明确该SQL的有效执行。
10. 线上禁止在业务繁忙的时间进行大批量数据更新。


不能使用物理删除，要使用逻辑删除，方便追溯到行为操作。

超过3个表禁止 join。需要join 的字段，数据类型保持绝对一致；多表关联查询时，保证被关联的字段需要有索引。

页面搜索严禁左模糊或者全模糊，如果需要请走搜索引擎来解决。索引文件具有 B-Tree 的最左前缀匹配特性，如果左边的值未确定，那么无法使用此索引。


如果有 order by 的场景，请注意利用索引的有序性。order by 最后的字段是组合索引的一部分，并且放在索引组合顺序的最后，避免出现 filesort 的情况，影响查询性能。反例:索引如果存在范围查询，那么索引有序性无法利用，如:WHERE a > 10 ORDER BY b;索引 a_b 无法排序。

查询尽量使用 覆盖索引，避免回表。即，explain 查询语句，在 extra 列能看到 using index。

利用延迟关联或子查询优化超多分页场景。
说明:MySQL 并不是跳过 offset 行，而是取 offset+N 行，然后返回放弃前 offset 行，返回 N 行，那当 offset 特别大 的时候，效率就非常的低下，要么控制返回的总页数，要么对超过特定阈值的页数进行 SQL 改写。 正例:先快速定位需要获取的 id 段，然后再关联:
`SELECT t1.* FROM 表 1 as t1 , (select id from 表 1 where 条件 LIMIT 100000 , 20) as t2 where t1.id = t2.id`


SQL 语句

1. 不要使用 count(列名) 或 count(常量) 来替代 `count(*)`，`count(*)` 是 SQL92 定义的标准统计行数的语法
2. count(distinct col) 计算该列除 NULL 之外的不重复行数，注意 count(distinct col1 , col2) 如果其中一列全为 NULL，那么即使另一列有不同的值，也返回为 0。
3. 当某一列的值全是 NULL 时，count(col) 的返回结果为 0;但 sum(col) 的返回结果为 NULL，因 此使用 sum() 时需注意 NPE 问题。
4. 禁止使用存储过程，存储过程难以调试和扩展，更没有移植性。
5. 数据订正(特别是删除或修改记录操作)时，要先 select，避免出现误删除的情况，确认无误才能执行更新语句。
6. SQL 语句中表的别名前加 as。别名可以是表的简称，或者以 t1、t2、t3、...的顺序依次命名。
7. in 操作能避免则避免，若实在避免不了，需要仔细评估 in 后边的集合元素数量，控制在 1000 个之内。

## 性能

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

### 慢查询治理

```sql
-- 查看数据库设置
show global variables like "%slow_query_log%";
-- 开启慢查询日志
set global slow_query_log="ON";
-- 查看慢查询设置
show global variables like "%long_query%";
-- 修改慢查询定义，这里修改为 2s
set global long_query_time=2;
```


## 其他

如何书写优雅漂亮的 SQL 脚本  https://www.cnblogs.com/kerrycode/archive/2010/08/16/1800334.html
