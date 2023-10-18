# SQL DDL 定义数据


## TABLE & INDEX

#### TABLE

```sql
/* 建表 */
CREATE TABLE table_name (
  column_name1  datatype  [CONSTRAINTS],
  column_name2  datatype  [CONSTRAINTS]
);

/* 获取 DDL */
SHOW CREATE TABLE table_name;

/* 删表 */
DROP TABLE table_name;

/* 清空表格内容 */
TRUNCATE TABLE table_name;  -- 清空数据，但不删除表定义
```

```sql
/* 示例 */
CREATE TABLE student (
    id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sid char(8) COMMENT '学号',
    last_name varchar(63),
    first_name varchar(63)  -- 末行不能出现 `,`
);
```

#### COLUMN

```sql
ALTER TABLE table_name ADD [COLUMN] column_name datatype  [CONSTRAINTS];
ALTER TABLE table_name DROP [COLUMN] column_name;
ALTER TABLE table_name MODIFY [COLUMN] column_name datatype;
ALTER TABLE table_name CHANGE [COLUMN] column_name new_column_name datatype;
```

```sql
/* 示例 */
ALTER TABLE student
    ADD     age tinyint unsigned,
    MODIFY  last_name char(255),
    CHANGE  first_name family_name char(255),
    DROP    middle_name;
```

#### INDEX

```sql
/* 新建索引 */
CREATE INDEX idx_last_name ON person (last_name);

/* 删除索引 */
ALTER TABLE student DROP INDEX idx_last_name;

/* 查看索引详情 */
SHOW INDEX FROM student;
```

索引是对某一列或多列的值进行预排序的数据结构 BTree O(logN)。使用索引可以快速定位到记录，大幅提示查询速度 。

#### VIEW

```sql
CREATE VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition;
CREATE [OR REPLACE] VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition;
DROP VIEW view_name;
```


## 约束 Constraints

#### 主键 `PRIMARY KEY`

```sql
CREATE TABLE student3(
  id int NOT NULL,
  sid int NOT NULL COMMENT '学号可能会改格式',
  PRIMARY KEY (id),
  UNIQUE KEY (sid)
);

ALTER TABLE student DROP PRIMARY KEY;
```

主键是关系表中记录的唯一标识。主键的选取非常重要：*主键不要带有业务含义*，而应该使用 BIGINT自增 或 GUID 类型。

主键最关键的一点：记录一旦插入到表中，主键最好 *不要再修改*，因为主键是用来唯一定位记录的，修改主键会造成一系列影响。

联合主键：关系数据库实际上还允许通过多个字段唯一标识记录。应避免使用联合主键，它会导致复杂度上升。

#### 外键 `FOREIGN KEY`

```sql
/* 在「学生」表中，通过外键 class_id 与 「班级」表关联起来 */
ALTER TABLE student ADD CONSTRAINT fk_class_id FOREIGN KEY (class_id) REFERENCES class (id);

/* 删除一个外键约束 */
ALTER TABLE student DROP FOREIGN KEY fk_class_id;
```

外键约束可以保证无法插入无效的数据。即如果 classe 表不存在 id=99 的记录，student 表就无法插入 class_id=99 的记录。

*外键约束会降低数据库的性能*，大部分互联网应用为了追求速度并不设置外键约束，仅靠应用程序自身来保证逻辑的正确性。

#### 唯一 `UNIQUE KEY`

```sql
CREATE TABLE student(
  sid int NOT NULL,
  UNIQUE KEY (sid)
);

ALTER TABLE student ADD UNIQUE (sid);

ALTER TABLE student DROP INDEX sid;  -- PRIMARY KEY 和 UNIQUE KEY 都是 INDEX
```

#### DEFAULT

```sql
CREATE TABLE student (
  ...,
  city varchar(255) DEFAULT 'Hangzhou',
  admission_date date DEFAULT CURRENT_DATE COMMENT '入学时间'
);

ALTER TABLE student ALTER city SET DEFAULT 'HZ';

ALTER TABLE student ALTER city DROP DEFAULT;
```

#### CHECK

```sql
CREATE TABLE student (
  sid int NOT NULL,
  ...,
  CHECK (sid>0)
);

ALTER TABLE student ADD CHECK (sid>0);

ALTER TABLE student ADD CONSTRAINT ck_student CHECK (sid>0 AND city='HZ');

ALTER TABLE student DROP CHECK ck_student;
```

#### AUTO_INCREMENT

```sql
CREATE TABLE student (id int unsigned NOT NULL AUTO_INCREMENT, ...);
```

```sql
ALTER TABLE student AUTO_INCREMENT=100;  -- AUTO_INCREMENT 记录在数据库中，表示下一次自增时使用的值
```

#### NULL / NOT NULL

```sql
SELECT last_name, first_name, address FROM student WHERE address IS [NOT] NULL;
```

#### NULL Functions

```sql
SELECT prod_name, unit_price * (units_in_stock + IFNULL(units_on_order, 0)) FROM product;
```


## Administer

#### 命令行批处理

```bash
$ mysql -u root -p < filename.sql
```

```sql
SOURCE file_name.sql
```

#### CREATE/DROP DATABASE

```sql
CREATE DATABASE database_name;

DROP DATABASE database_name;
```

```sql
CREATE USER username[@hostname]  [IDENTIFIED BY 'password'];

DROP username;  -- 删除用户
```

#### SHOW

https://dev.mysql.com/doc/refman/8.0/en/show.html

```sql
SHOW DATABASE databases [like_or_where];  -- 显示数据库列表
    SELECT database();  -- 查看当前数据库名；利用 SELECT 还可以进行数值计算等，有种 console.log 的感觉
SHOW TABLES [FROM db_name] [LIKE 'pattern' | WHERE expr];
SHOW COLUMNS [FROM table_name][FROM db_name] [like_or_where];
    DESCRIBE table_name [column_name];  -- 效果同上
    DESC     table_name [column_name];  -- 同上
SHOW INDEX [FROM table_name][FROM database_name] [like_or_where];
SHOW GRANTS [FOR user_name];    -- 显示授予用户的权限
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
LOAD DATA INFILE 'filename' INTO TABLE table_name;
```

#### OPTIMIZE

```sql
OPTIMIZE TABLE table_name;
```

