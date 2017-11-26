# Kotlin 入门与进阶


## 1.课程介绍

### HelloKotlin

New Project -> Gradle + Java + Kotlin -> GroupId:com.demo + ArtifactId:kotlin -> KotlinDemo

src/main/kotlin -> New Package + com.demo.kotlin -> New -> Kotlin File/Class + HelloKotlin

```kt
package com.demo.kotlin
fun main(args: Array<String>) {
    println("Hello Kotlin")
}
```


## 2.数据类型

### 2.5 类和对象

什么是类
  * 类是一个抽象的概念
  * 具有某些特征的事物的概括
  * 不特定指代任何一个具体的事物
  * 例子：人、车、书
  * 写法：`class <类名> { <成员> }`

什么是对象
  * 是一个具体的概念，与类相对
  * 描述某一种类的具体个体
  * 例子：某些人、某辆车

类与对象的关系
  * 一个类通常可以有很多个具体的对象
  * 一个对象本质上只能从属于一个类
  * 对象也经常被称作 "类的对象" 或者 "类的实例"

类的继承
  * 提取多个类的共性得到一个更抽象的类，即父类
  * 子类拥有父类的一切特征
  * 子类也可以自定义自己的特征
  * 所有类都最终继承自 `Any`

```kt
class 妹子(性格: String, 长相: String, 声音: String) : 人(性格, 长相, 声音)
open class 人(var 性格: String, var 长相: String, var 声音: String) {
    init { println("new 了一个${this.javaClass.simpleName}, ta性格$性格, 长相$长相, 声音$声音") }
}
fun main(args: Array<String>) {
    val 我喜欢的妹子: 妹子 = 妹子("温柔", "甜美", "动人")
    println(我喜欢的妹子 is 人)
}
```

### 2.6 空类型和智能类型转换

#### 空类型

任意类型都有可空和不可空两种
  * `val notNull: String = null    // 错误，不能为空`
  * `val nullable: String? = null  // 正确，可以为空`
  * `notNull.length  // 正确，不为空的值可以直接使用`
  * `nullable.length  // 错误，可能为空，不能直接获取长度`
  * `nullable!!.length  // 正确，强制认定 nullable 不为空`
  * `nullable?.length   // 正确，若 nullable 为空，返回空`

```java
public class NullUnsafe {
    public static void main(String[] args) {
        System.out.println(getName().length());  // 空指针异常
    }
    public static String getName() { return null; }
}
```

```kt
fun getName(): String {
    return null   // 编译报错：Null can not be a value of a non-null type String
}

fun getNameNullable(): String? { return null }
val name = getNameNullable()
println(name?.length)  // safe call 写法，输出 null
val name2 = getNameNullable() ?: return  // 免去 if...return 的写法
println(name2.length)  // 这里不需要 safe call，因为上行已经拦截，编辑器可智能类型推断

val str: String? = "Hello"
println(str!!.length)  // 当我们确定为非 null 时，可用断言告诉编译器 !!.
```

#### 类型转换

* 强制类型转换 `val sub: SubClass = parent as SubClass  // 失败会抛出异常`
* 安全类型转换 `val sub: SubClass = parent as? SubClass // 转换失败不会抛出异常`
* 智能类型转换 `if (parent is SubClass) parent.<子类成员>  // 智能类型推断避免冗余的类型转换`

```java
public class TypeCast {
  public static void main(String[] args) {
    Parent parent = new Child();
    if (parent instanceof Child) {
      System.out.println(((Child)parent).getName());  // Java 没有智能类型推断，强转冗余
    }
  }
}
```

```kt
val parent: Parent = Child()
if (parent is Child) println(parent.name)  // Kotlin smart cast

val str: String? = "Hello"
if (str != null) println(str.length)  // 使用 if 判断后就不再需要 safe call 了

val parent = Parent()
val child: Child? = parent as Child   // 强转失败，抛出异常
val child: Child? = parent as? Child  // 安全类型转换，如果转换失败也不抛异常
```

### 2.8 区间

* 一个数学上的概念，表示范围
* Java 中没有区间
* `ClosedRange` 接口的子类，`IntRange` 最常用
* 基本写法：
  - `0..100` 表示闭区间 `[0, 100]`
  - `0 until 100` 表示半开区间 `[0, 100)`
  - `i in 0..100` 判断 i 是否在区间 `[0, 100]` 中

```kt
val range: IntRange = 0..1024                // [0, 1024]
val range_exclusive: IntRange = 0 until 1024 // [0, 1024) = [0, 1023]
val emptyRange: IntRange = 0..-1

println(emptyRange.isEmpty())
println(range.contains(50)); println(50 in range)
for (i in range_exclusive) { print("$i, ") }
```


## 3.程序结构

### 常量与变量

### 函数

### Lambda 表达式

### 类成员

### 基本运算符

### 表达式

### 循环语句

### 异常捕获

try...catch 也是表达式，可以用来赋值

```kt
val result = try {
    args[0].toInt() / args[1].toInt()
} catch (e: NumberFormatException) {
    println("请输入两个整数")
} catch (e: Exception) {  // 如果已经被前面捕获，这里不会重复处理
    e.printStackTrace()
    0      // 如果异常在这里被捕获，则表达式的返回值为 0，否则返回值为 kotlin.Unit
} finally {               // 这里始终会执行
    println("谢谢使用加法计算器")
}
println(result)
```

### 参数

#### 具名参数

```kt
fun sum(a: Int, b: Int) = "" + a + b
println(sum(b = 5, a = 4))  // 45
```

#### 变长参数

* 某个参数可以接收多个值
* 可以不为最后一个参数
* 如果传参时有歧义，需要使用具名参数

##### Spread Operator

* 目前只支持展开数组
* 只用于变长参数列表的实参
* 不能重载，跟一般意义上的运算符不同

```kt
fun hi(vararg args: String, count: Int) {
    var str = "Hi, you " + count
    for (name in args) str += ", " + name
    println(str)
}
val list = arrayOf("lili", "poly")
hi(*list, count = 2)  // 展开符为一个星号
```

#### 默认参数

```kt
fun hi(vararg args: String, count: Int = 3)
```

### 小案例

计算器案例

```kt


```

导出可执行程序




## 4.面向对象


## 5.高阶函数


## 6.领域特定语言 DSL


## 7.协程 Coroutline



## 8.Kotlin与Java混合开发


## 9.案例展示



