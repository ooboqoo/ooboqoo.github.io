# 异常和日志


## 异常处理

### 捕获异常

使用 try 和 catch 关键字可以捕获异常。try/catch 代码块放在异常可能发生的地方。

```java
try {
   // 程序代码
} catch(ExceptionName e1) {
   //Catch 块
}
```

### 多重捕获块

```java
try {
   // 程序代码
} catch(异常类型1 异常的变量名1) {
  // 程序代码
} catch(异常类型2 异常的变量名2) {
  // 程序代码
} catch(异常类型2 异常的变量名2) {
  // 程序代码
} finally {
  // 程序代码
}
```

### throws/throw 关键字

一个方法可以声明抛出多个异常，多个异常之间用逗号隔开。

```java
import java.io.*;
public class className {
   public void withdraw(double amount) throws RemoteException, InsufficientFundsException {
       // Method implementation
   }
   //Remainder of class definition
}
```

### 声明自定义异常



