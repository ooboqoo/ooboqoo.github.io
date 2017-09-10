# 异常和日志

## 异常的捕获及处理

Java 程序中的错误主要是语法错误、语义错误。

一个程序即使在编译时没有错误信息产生，但运行时会出现各种错误导致的程序退出，这些错误被统一为异常。

```java
try {
  // 有可能出现异常的语句
} catch (异常类型1 异常变量名1) {
  // 异常处理
} catch (异常类型2 异常变量名2) {
  // 异常处理
} finally {
  // 不管是否出现异常，都执行这里的代码
}

// 如果出现的异常未被捕获，那么久不会执行到这个位置，程序已提前退出了
```

如果 try catch 结构内出现了没有捕获的异常，后续的代码就不会执行，但 finally 依然会执行，finally 往往是在开发中进行一些资源释放操作。

### 异常的处理流程

```text
java.lang.Object
  \- java.lang.Throwable
       \- java.lang.Exception
           \- java.lang.RuntimeException
               \- java.lang.ArithmeticException
```

Throwable 下有两个子类：
  * Error - 指的是 JVM 错误，这时的程序并没有执行，开发者无法处理
  * Exception - 指的是程序运行中产出的异常，开发者需要对此进行处理

注: Java 中错误和异常的命名都会使用 XxxError 或 XxxException 的形式，从名称上帮助开发者区分。

[!异常处理完整流程]()

捕获异常时，`catch(Exception e)` 能捕获所有异常类型，相应引出两个问题：

#### 统一捕获还是分开捕获

虽然可以使用 Exception 简化异常的处理操作，但实际开发中是统一捕获还是分别捕获要视开发要求是否严格来决定。

如果项目开发环境严谨，基本上都会要求针对每一种异常分别进行处理，并且要详细记录下异常产生的时间以及产生的位置，这样就可以方便程序维护人员进行代码的维护。

#### 捕获顺序

处理多个异常时，捕获范围小的异常要放在捕获范围大的异常之前处理。

如果说项目代码中既要处理 ArithmeticException 异常，又要处理 Exception 异常，因为 ArithmeticException 是 Exception 的子类，所以在编写异常处理时，Exception 的捕获一定要放在 ArithmeticException 捕获之后，否则编译报错。


## `throw` 和 `throws`

`throw` 指的是在方法中人为抛出一个异常类对象(这个异常类对象可能是自己实例化或者是抛出已存在的)。

`throws` 在方法声明上使用，表示此方法在调用时必须处理异常。

```java
public class Test {
    public static void main(String[] args) {
        try {
            int result = division(10,0);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static int division(int x, int y) throws Exception {
        System.out.println("计算开始，等价于资源打开");
        int result;
        try {
            result = x / y;
        } catch (Exception e) {
            throw e;                // 抛出异常，交由调用处处理
        } finally {
            System.out.println("计算结束，等价于资源关闭");
        }
        return result;
    }
}
```

## `RuntimeException` 类

所有的 `RuntimeException` 子类对象都可以根据用户的需要进行有选择性的处理，所以调用时不处理也不会有任何编译语法错误。

常见的 `RuntimeException` 有 `NumberFormatException` `ClassCastException` `NullPointerException` `ArithmeticException` `ArrayIndexOutOfBoundsException`。

## `assert` 关键字

```java
public class TestDemo {
  public static void main(String[] args) {
    int num = 10;
    assert num == 20 : "num的内容不是20"  // 开启断言再运行程序，这里就会报错 java.lang.AssertionError
  }
}
```

Java 在默认情况下不开启断言，如要开启断言，需要增加选项：

```bash
$ java -ea TestDemo
```

## 自定义异常

Java 本身已经提供了大量的异常，但在实际工作中往往不够用，此时需要用户自己定义异常类。

要想实现自定义异常类，只需要继承 `Exception`(强制异常处理) 或 `RuntimeException`(选择性异常处理) 父类即可。
