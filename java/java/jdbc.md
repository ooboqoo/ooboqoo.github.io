# Java 数据库编程

https://www.javatpoint.com/steps-to-connect-to-the-database-in-java

Java 数据库连接技术 Java Database Connective 是由 Java 提供的一组与平台无关的数据库的操作标准，其本身由一组类与接口组成，并且在操作中将按照严格的顺序执行。

## java.sql

### java.sql.Connection

```java
public interface Connection extends Wrapper, AutoCloseable {
    Statement createStatement() throws SQLException;
    PreparedStatement prepareStatement(String sql) throws SQLException;
    void close() throws SQLException;
    void commit() throws SQLException;    // 事务提交
    void rollback() throws SQLException;  // 事务回滚
    void setAutoCommit(boolean autoCommit) throws SQLException;  // 设置是否为自动提交
}
```

### java.sql.Statement

```java
public interface Statement extends Wrapper, AutoCloseable {
    int executeUpdate(String sql) throws SQLException;
    ResultSet executeQuery(String sql) throws SQLException;
    void addBatch(String sql) throws SQLException;
    int[] executeBatch() throws SQLException;
}
```

#### java.sql.PreparedStatement

```java
public interface PreparedStatement extends Statement {
    void addBatch() throws SQLException;
}
```

### java.sql.ResultSet

```java
public interface ResultSet extends Wrapper, AutoCloseable {
    boolean next() throws SQLException;
    int getInt(int columnIndex) throws SQLException;           // 根据列号抓数据
    String getString(String columnLabel) throws SQLException;  // 根据列名抓数据
    java.sql.Date getDate(String columnLabel) throws SQLException;
}
```


## 连接数据库

在 JDBC 技术范畴规定了以下4种 Java 数据库操作的形式：
  * JDBC-ODBC 桥接技术
  * JDBC 本地驱动
  * JDBC 网络驱动
  * JDBC 协议驱动

要进行数据库的连接操作，就要使用 java.sql 包中提供的程序类，此包提供了以下核心类与接口：
  * DriverManagers 类：提供数据库的驱动管理，主要负责数据库的连接对象取得；
  * Connection 接口：用于描述数据库的连接，并且可以通过此接口关闭连接；
  * Statement 接口：数据库的操作接口，通过连接对象打开；
  * PreparedStatement 接口：数据库预处理操作接口，通过连接对象打开；
  * ResultSet 接口：数据查询结果集描述，通过此接口取得查询结果。

实际的操作中 JDBC 的操作步骤具体分为如下四步：
  1. 向容器中加载数据库驱动程序
  2. 通过 DriverManager 类根据指定的数据库连接地址、用户名、密码取得数据库连接
  3. 利用 Statement、PreparedStatement、ResultSet 实现数据的 CRUD 操作
  4. 释放占用资源

```java
import java.sql.*;
class MysqlCon {
    public static void main(String args[]) {
        try {
            // 1. 加载数据库驱动程序，此时不需要实例化，由容器自己负责管理
            Class.forName("com.mysql.jdbc.Driver");
                // 下载解压并添加驱动 https://dev.mysql.com/downloads/connector/j/5.1.html
            // 2. 根据连接协议、用户名、密码连接数据库
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/dbname", "root", "root");
            // 3. 实现数据库 CRUD 操作
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from emp");
            while (rs.next())
                System.out.println(rs.getInt(1) + "  " + rs.getString(2) + "  " + rs.getString(3));
            // 4. 关闭连接
            con.close();
        } catch (Exception e) { System.out.println(e); }
    }
}
```


## Stetement 接口


## PreparedStatement 接口

虽然 Statement 接口可以实现数据库中数据的操作，但是其本身却存在一个致命的问题：如果传入数据要采用拼凑 SQL 的形式完成，这样会为程序带来严重的安全隐患。为了解决这样的问题，定义了一个 Statement 的子接口 PreparedStatement接口。

Statement 执行的关键性的问题在于它需要一个完整的字符串来定义要使用的 SQL 语句，所以这就导致在使用中需要大量地进行 SQL 的拼凑。而 PreparedStatement 与 Statement 不同的地方在于，它执行的是一个完整的具备特殊占位标记的 SQL 语句，并且可以动态地设置所需要的数据。

> **关于 Date 的操作**  
> java.util.Date 下有3个子类，并且都定义在 java.sql 包中，即 java.sql.Date 日期、java.sql.Time 时间、java.sql.Timestamp 时间戳。

```java
String sql = "INSERT INTO contacts values (?,?,?)";  // 使用占位符设置预处理数据
PreparedStatement pstmt = con.prepareStatement(sql);
pstmt.setInt(1, 5); pstmt.setString(2, "gavin"); pstmt.setString(3, "1351575584");
int length = pstmt.executeUpdate();
System.out.println("Affected rows: " + length);

String sql = "SELECT id, name, phone FROM contacts ORDER BY id";
PreparedStatement pstmt = con.prepareStatement(sql);
ResultSet rs = pstmt.executeQuery();
```


## 批处理和事务处理

所谓批处理指的是一次性向数据库中发出多条操作命令，而后所有的 SQL 语句将一起执行。

JDBC 提供事务处理操作来进行手工的事务控制，所有的操作方法都在 Connection 接口里定义。








