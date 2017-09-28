# SQL 速查表

https://www.w3schools.com/sql/sql_insert.asp

## Most Common

### SELECT

```sql
SELECT [options] items [INTO file_details] FROM tables [WHERE conditions]
  [GROUP BY group_type] [HAVING where_definition] [ORDER BY order_type]
  [LIMIT limit_criteria] [PROCEDURE pro_name(arguments)] [lock_options];
```

```sql
SELECT * FROM table_name;
SELECT CustomerName, City FROM Customers;
```

### UPDATE

```sql
UPDATE [LOW_PRIORITY] [IGNORE] tablename SET column1=new_value [, column2=new_value...]  
  [WHERE column_name=some_value];
```

```sql
UPDATE Customers SET ContactName='Alfred', City='Hamburg' WHERE CustomerName='Alfreds';
```

> !! Be careful when updating records. If we had omitted the WHERE clause...

### INSERT INTO

```sql
INSERT INTO table_name VALUES (value1, value2,...);
INSERT INTO table_name (column_name1, column_name2,...) VALUES (value1, value2,...);
```

```sql
INSERT INTO Customers (CustomerName, City, Country) VALUES ('Cardinal', 'Stavanger', 'Norway');
```

### DELETE FROM

```sql
DELETE FROM table_name (_Note: _Deletes the entire table!!);
```

```sql
DELETE FROM table_name WHERE condition;
```

### DISTINCT

```sql
SELECT DISTINCT column_name(s) FROM table_name;
```

```sql
SELECT DISTINCT City FROM Customers;
```

### WHERE

```sql
SELECT column_name(s) FROM table_name WHERE condition(column_name operator value);
```

```sql
SELECT * FROM Customers WHERE Country='Mexico' AND CustomerID=1;
```

Operators: `=` `>` `<` `>=` `<=` `<> 或 !=` `IS NULL` `IS NOT NULL` `BETWEEN` `IN` `NOT IN` `LIKE` `NOT LIKE` `REGEXP`

### AND / OR

```sql
SELECT column_name(s) FROM table_name WHERE condition1 AND|OR condition2;
```

```sql
SELECT * FROM Customers WHERE Country='Germany' AND (City='Berlin' OR City='Munchen');
```

## ADVANCED

### TOP / LIMIT / WHERE ROWNUM

```sql
SELECT column_name(s) FROM table_name LIMIT number;  -- MySQL
```

```sql
SELECT TOP 2 * FROM Customers;
SELECT TOP 50 PERCENT * FROM Customers;
```

### LIKE

```sql
SELECT column_name(s) FROM table_name WHERE column_name (NOT) LIKE pattern;
```

```sql
SELECT * FROM Customers WHERE City LIKE 's%';
SELECT * FROM Customers WHERE Country NOT LIKE '%land%';
```

Wildcards:

* `%` A substitute for zero or more characters;  
* `_` A substitute for a single character;  
* `[...]` Sets and ranges of characters to match;  
* `[^...]` or `[!...]` Matches only a character NOT specified within the brackets

### IN

```sql
SELECT column_name(s) FROM table_nameWHERE column_name IN (value1,value2,..);
```

```sql
SELECT * FROM Customers WHERE City IN ('Paris','London');
```

### BETWEEN

```sql
SELECT column_name(s) FROM table_name  
  WHERE column_name (NOT) BETWEEN value1 AND value2;
```

```sql
SELECT * FROM Products WHERE (Price BETWEEN 10 AND 20) AND NOT CategoryID IN (1,2,3);
SELECT * FROM Products WHERE ProductName NOT BETWEEN 'C' AND 'M';
SELECT * FROM Orders WHERE OrderDate BETWEEN #07/04/1996# AND #07/09/1996#;
```

### AS (alias for column)

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

### AS (alias for table)

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

### INNER JOIN

```sql
SELECT column_name(s) FROM table1 <del>INNER</del> JOIN table2 ON table1.column_name=table2.column_name;
```

PS: INNER JOIN is the same as JOIN.

```sql
SELECT Customers.CustomerName, Orders.OrderID FROM Customers INNER JOIN Orders
ON Customers.CustomerID=Orders.CustomerID ORDER BY Customers.CustomerName;
```

### LEFT JOIN

```sql
SELECT column_name(s) FROM table1 LEFT JOIN table2  
ON table1.column_name=table2.column_name;
```

PS: In some databases LEFT JOIN is called LEFT OUTER JOIN.

### RIGHT JOIN

```sql
SELECT column_name(s) FROM table1 RIGHT JOIN table2  
ON table1.column_name=table2.column_name;
```

PS: In some databases RIGHT JOIN is called RIGHT OUTER JOIN.

### FULL OUTER JOIN

```sql
SELECT column_name(s)FROM table1 FULL OUTER JOIN table2  
ON table1.column_name=table2.column_name;
```


### 自连接是指使用表的别名实现表与其自身连接的查询方法

c27案列根据其他用户推荐书签的例子，具体自连接效果可通过mysql命令行查看效果

```sql
select bm_URL from bookmark where username in
(select distinct(b2.username) from bookmark <del>AS</del> b1, bookmark <del>AS</del> b2
where b1.username="someone" and b1.username != b2.username and b1.bm_URL = b2.bm_URL)
and bm_URL not in (select bm_URL from bookmark where username="someone")
group by bm_url having count(bm_url)>1;
```

### UNION

```sql
SELECT column_name(s) FROM table1 UNION (ALL) SELECT column_name(s) FROM table2
```

PS: UNION returns only distinct values, and UNION ALL returns duplicate values also

```sql
SELECT City, Country FROM Customers WHERE Country='Germany' UNION ALL
SELECT City, Country FROM Suppliers WHERE Country='Germany' ORDER BY City;
```

### SELECT INTO (used to create backup copies of tables)

```sql
SELECT column_name(s) INTO new_table_name [IN externaldb] FROM original_table_name
```

```sql
SELECT CustomerName, ContactName AS NewName INTO CustomersBackup2013 FROM Customers;
```

### INSERT INTO SELECT

```sql
INSERT INTO table2 (column_name(s)) SELECT column_name(s) FROM table1;
```

```sql
INSERT INTO Customers (CustomerName, Country) SELECT SupplierName, Country FROM Suppliers WHERE Country='Germany';
```


## Administer

### 命令行批处理

```bash
# mysql -u root -p < filename.sql
```

```sql
CREAT DATABASE database_name
```

### DROP DATABASE

```sql
DROP DATABASE database_name
```

### SHOW

```sql
SHOW DATABASES [like_or_where]  
SHOW TABLES [FROM database][like_or_where]  
SHOW COLUMS FROM table [FROM database][like_or_where]  
SHOW INDEX FROM table [FROM database]  
SHOW GRANTS FOR user  
DESCRIBE table [column]
```

### GRANT

```sql
GRANT privileges [columns] ON item TO user_name [IDENTIFIED BY 'password']  
  [REQUIRE ssl_options] [WITH [GRANT OPTION | limit_options] ]
```

### REVOKE

```sql
REVOKE privileges [(columns)] ON item FROM user_name  
REVOKE ALL PRIVILEGES, GRANT FROM user_name
```

### LOAD DATA INFILE

```sql
LOAD DATA INFILE "filename" INTO TABLE tablename
```

### OPTIMIZE

```sql
OPTIMIZE TABLE tablename
```


## TABLE &amp; INDEX

### CREATE TABLE

```sql
CREATE TABLE table_name (column_name1 data_type(size), column_name2 data_type(size),....);
```

```sql
CREATE TABLE Persons (PersonID int unsigned not null auto_increment primary
key, LastName varchar(255), FirstName varchar(255)) ENGINE=InnoDB;
```

### ALTER TABLE

```sql
ALTER TABLE table_name ADD column_name datatype  
ALTER TABLE table_name DROP COLUMN column_name  
ALTER TABLE table_name MODIFY COLUMN column_name datatype  
ALTER TABLE table_name CHANGE COLUMN column_name new_column_name
```

### DROP TABLE

```sql
DROP TABLE table_name
```

### TRUNCATE TABLE

```sql
TRUNCATE TABLE table_name (deletes only the data inside the table)
```

### CREATE INDEX

```sql
CREATE [UNIQUE] INDEX index_name ON table_name (column_name)
```

```sql
CREATE INDEX PIndex ON Persons (LastName, FirstName)
```

### DROP INDEX

```sql
ALTER TABLE table_name DROP INDEX index_name  -- MySQL
```

### VIEW

```sql
CREATE VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition  
CREATE OR REPLACE VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition
DROP VIEW view_name
```


## Constraints

NOT NULL, UNIQUE, PRIMARY, FOREIGN, CHECK, DEFAULT

### UNIQUE

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

### PRIMARY KEY

```sql
SQLServer / Oracle / Access: CREATE TABLE Persons (P_Id int NOT NULL PRIMARY
KEY,...)

MySQL: CREATE TABLE Persons(P_Id int NOT NULL,...,PRIMARY KEY (P_Id))

ALTER TABLE Persons ADD PRIMARY KEY (P_Id)

ALTER TABLE Persons ADD CONSTRAINT pk_PersonID PRIMARY KEY (P_Id,LastName)

SQLServer / Oracle / Access: ALTER TABLE Persons DROP CONSTRAINT pk_PersonID

MySQL: ALTER TABLE Persons DROP PRIMARY KEY
```

### FOREIGN KEY

```sql
MySQL: CREATE TABLE Orders (...,FOREIGN KEY (P_Id) REFERENCES Persons(P_Id))

ALTER TABLE Orders ADD FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)
```

To allow naming of a FOREIGN KEY constraint, and for defining constraint on multiple columns:

```sql
ALTER TABLE Orders ADD CONSTRAINT fk_PerOrders FOREIGN KEY (P_Id) REFERENCES Persons(P_Id)

MySQL: ALTER TABLE Orders DROP FOREIGN KEY fk_PerOrders
```

### CHECK

```sql
MySQL: CREATE TABLE Persons (P_Id int NOT NULL,...,CHECK (P_Id>0))

ALTER TABLE Persons ADD CHECK (P_Id>0)

ALTER TABLE Persons ADD CONSTRAINT chk_Person CHECK (P_Id>0 AND
City='Sandnes')

MySQL: ALTER TABLE Persons DROP CHECK chk_Person
```

### DEFAULT

```sql
CREATE TABLE Persons (...,City varchar(255) DEFAULT 'Sandnes')

CREATE TABLE Orders (...,OrderDate date DEFAULT GETDATE())

MySQL: ALTER TABLE Persons ALTER City SET DEFAULT 'SANDNES'

MySQL: ALTER TABLE Persons ALTER City DROP DEFAULT
```

### AUTO_INCREMENT

```sql
CREATE TABLE Persons(ID int NOT NULL AUTO_INCREMENT,...);  -- MySQL
```

```sql
ALTER TABLE Persons AUTO_INCREMENT=100;  -- MySQL
```

### NULL / NOT NULL

```sql
SELECT LastName,FirstName,Address FROM Persons WHERE Address IS [NOT] NULL
```

Note: It is not possible to compare NULL and 0; they are not equivalent.

### NULL Functions

```sql
MySQL: SELECT ProductName,UnitPrice*(UnitsInStock+IFNULL(UnitsOnOrder,0)) FROM Products
```

### Dates

```sql
MySQL: NOW(), CURDATE(), CURTIME(), DATE(), EXTRACT(), DATE_ADD(), DATE_SUB(), DATEDIFF(), DATE_FORMAT()
```


## Aggregate Functions

### AVG()

```sql
SELECT AVG(column_name) FROM table_name
```

```sql
SELECT ProductName, Price FROM Products WHERE Price>(SELECT AVG(Price) FROM Products);
```

### COUNT()

```sql
SELECT COUNT((DISTINCT) column_name) FROM table_name
```

```sql
SELECT COUNT(CustomerID) AS OrdersFromCustomerID7 FROM Orders WHERE CustomerID=7;
```

### FIRST() & LAST()

The `FIRST()` / `LAST()` function is only supported in MS Access, substitute method of MySQL:

```sql
SELECT column_name FROM table_name ORDER BY column_name DESC LIMIT 1;
```

### MAX() & MIN()

```sql
SELECT MAX(column_name) FROM table_name;
```

```sql
SELECT MAX(Price) AS HighestPrice FROM Products;
```

### SUM()

```sql
SELECT SUM(column_name) FROM table_name;
```

```sql
SELECT SUM(Quantity) AS TotalItemsOrdered FROM OrderDetails;
```


## Scalar Functions

### UCASE() & LCASE()

```sql
SELECT UCASE(column_name) FROM table_name;
SELECT UPPER(column_name) FROM table_name;  -- SQLServer UPPER() / LOWER() 
```

```sql
SELECT UCASE(CustomerName) AS Customer, City FROM Customers;
```

### MID()

```sql
SELECT MID(column_name,start,[length]) AS some_name FROM table_name;
SELECT SUBSTRING(column_name,start,length) AS some_name FROM table_name;  -- SQLServer
```

```sql
SELECT MID(City,1,4) AS ShortCity FROM Customers;
```

### LEN()

```sql
SELECT LEN(column_name) FROM table_name;
```

```sql
SELECT CustomerName,LEN(Address) as LengthOfAddress FROM Customers;
```

### ROUND()

```sql
SELECT ROUND(column_name,decimals) FROM table_name;
```

!! Many database systems round half to even, so make sure 0.5 to 0 or 1 ?

```sql
SELECT ProductName, ROUND(Price,0) AS RoundedPrice FROM Products;
```

### NOW()

```sql
SELECT NOW() FROM table_name;
```

```sql
SELECT ProductName, Price, Now() AS PerDate FROM Products;
```

### FORMAT()

```sql
SELECT FORMAT(column_name,format) FROM table_name;
```

```sql
SELECT ProductName, Price, FORMAT(Now(),'YYYY-MM-DD') AS PerDate FROM Products;
```
