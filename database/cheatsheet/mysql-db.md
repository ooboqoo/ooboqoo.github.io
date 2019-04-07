# MySQL 速查表 2


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
LOAD DATA INFILE 'filename' INTO TABLE table_name;
```

#### OPTIMIZE

```sql
OPTIMIZE TABLE table_name;
```

