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
* Java中没有区间
* 都是 `ClosedRange` 接口的子类，`IntRange` 最常用
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

* 运行时常量 `val = x = getX()` 编译时不知道实际值，所以常量名保留，在运行时只能赋值一次
* 编译期常量 `const val x=2` 编译时就知道常量的值，所以编译后常量会被实际值替换
* 变量 `var x = "Hello"; x = "Hi"` 变量可以被再次赋值

注：Kotlin 不支持用 `,` 来同时声明多个变量。

```java
public class javaMain {
  public final String FINAL_HELLO_WORLD = "HelloWorld";  // 编译期常量
  public String helloWorld = "HelloWorld";               // 可变属性
}
```

```kt
const val HELLO_WORLD_FINAL = "HelloWorldFinal"  // 编译期常量，本地变量不支持，所以必须写在外面

fun main(args: Array<String>) {
    val HELLO_WORLD = "HelloWorld"  // 普通常量 value
    var hello = "Hello"             // 变量 variable
    println(HELLO_WORLD_FINAL); println(HELLO_WORLD); println(hello)
}
```

注：可通过查看字节码加深理解，需要安装插件，然后 Ctrl+Shift+A -> show Bytecode

#### Kotlin 中的类型推导

只要编译器能够推导出类型，就可以不写。

### 函数

函数是以特定功能组织起来的代码块
  * `fun [函数名]([参数列表]): [返回值类型] { [函数体] }`
  * `fun [函数名]([参数列表]) = [表达式]`

编写函数的注意事项
  * 功能要单一
  * 函数名要做到见名知义
  * 参数个数不要太多

```kt
fun sum(arg1: Int, arg2: Int): Int {  // 返回类型 Int 也不能省，只有当返回类型时 Unit 是才允许省略
    return arg1 + arg2  // 函数内还是得用 return 返回值，return 不能省
}

// 简写方式
fun sum(arg1: Int, arg2: Int) = arg1 + arg2

// 匿名函数
val int2Long = fun(x: Int) = x.toLong()
```

函数无返回时，返回值类型为 `Unit` 即Java中的 `void`

#### 函数的类型

```kt
fun sum(arg1: Int, arg2: Int) = arg1 + arg2
fun main(args: Array<String>) {
    val minus = fun(arg1: Int, arg2: Int) = arg1 - arg2
    println(::sum)  // fun sum(kotlin.Int, kotlin.Int): kotlin.Int
    println(minus)  // (kotlin.Int, kotlin.Int) -> kotlin.Int
    println(::sum is (Int, Int) -> Int)  // ture
}
```

### Lambda 表达式

* Lambda 表达式其实就是匿名函数。
* 格式 `{[参数列表] -> [函数体, 最后一行是返回值]}`
* Lambda 表达式的调用：用 `()` 调用，等价于 `invoke()`

```kt
// 常见写法
val sum = {arg1: Int, arg2: Int -> arg1 + arg2}

// 无参写法
val printHello = { print("Hello") }

// 可以有多行
val sum = {
  arg1: Int, arg2: Int ->
  println("$arg1 + $arg2 = ${arg1 + arg2}")
  arg1 + arg2  // 最后一行的值就是表达式的值
}
```

Lambda 表达式的简化
  * 函数调用时最后一个 Lambda 可以移出
  * 函数参数只有一个 Lambda，调用时小括号可省略
  * Lambda 只有一个参数可默认为 `it`
  * 入参、返回值与形参一致的函数可以用函数引用的方式作为实参传入

```kt
fun main(args: Array<String>) {
  args.forEach({ println(it) })   // 标准写法
  args.forEach() { println(it) }  // 表达式移到 () 外
  args.forEach { println(it) }    // 省略 ()
  args.forEach(::println)               // 函数引用
  args.forEach { arg -> println(arg) }  // 自定义迭代变量名
}
```

Lambda 表达式 是 表达式，在其中 return 会退出外层 fun 执行

```kt
fun myprint(vararg args: String) {
  args.forEach { if (it == "q") return; println(it) }
  println("The End")
}

myprint("s", "q", "5")  // 输出 "s" 没有 "The End"
```

### 类成员

* 属性：或者说成员变量，类范围内的变量
* 方法：或者说成员函数，类范围内的函数

```java
// Java 中只存在方法而不叫函数，还真没办法弄个纯粹的函数出来。
public class JavaA {
    private int b = 0;
    public int getB() {
        System.out.println("b getter");
        return b;
    }
    public void setB(int value) {
        System.out.println("b setter");
        this.b = value;
    }

    public void mymethod(Object a) { System.out.println(a); }
}
```

```kt
class KotlinA {
    var b = 0
        get() { println("b getter"); return field }
        set(value) { println("b setter"); field = value }
    var c = 0
        private set  // 外部可读不可写，默认为 public
    lateinit var s: String  // 延迟初始化
    val a: JavaA by lazy { JavaA() }  // 使用到才进行初始化

    fun mymethod(a: Any) = println(a)
}
```

函数和方法的区别
  * 函数强调功能本身，不考虑从属
  * 方法的称呼通常是从类的角度出发
  * 多数情况下只是叫法不同，不用深究

定义属性
  * 构造方法参数中 `var` `val` 修饰的都是属性
  * 类内部也可以定义属性

```kt
class Hello(val aField: Int, notField: Int) {  // aField 是一个属性，而 notField 只是一个参数不是属性
    var anotherField: Float = 3f
}
```

属性的访问控制：使用 getter 和 setter

属性的初始化
  * 属性的初始化尽量在构造方法中完成
  * 无法在构造方法中初始化，尝试降级为局部变量
  * `var` 用 `lateinit` 延迟初始化，`val` 用 `lazy`
  * 可空类型谨慎用 `null` 直接初始化

### 基本运算符

https://kotlinlang.org/docs/reference/operator-overloading.html

* 任何类可以定义或重载父类的基本运算符
* 通过运算符对应的具名函数来定义
* 对参数个数作要求，对参数和返回值类型不作要求
* 不能像 Scala 一样定义任意运算符

```kt
// 运算符的覆写和重载
class Complex(var real: Double, var imaginary: Double) {
    operator fun plus(other: Complex): Complex {
        return Complex(real + other.real, imaginary + other.imaginary)
    }
    operator fun plus(other: Int): Complex = Complex(real + other, imaginary)

    operator fun invoke(): Double = Math.hypot(real, imaginary)
    override fun toString(): String = "$real + ${imaginary}i"
}

val c1 = Complex(3.0, 4.0)
val c2 = Complex(2.0, 7.5)
println(c1 + c2)  // 5.0 + 11.5i
println(c1())     // 5
```

```kt
fun main(args: Array<String>) {
  // 读取参数的用法，挺好留作参考
  if ("-name" in args) { println(args[args.indexOf("-name") + 1]) }  // -name <Name>
}
```

### 表达式

https://msdn.microsoft.com/en-us/library/1t054cy7.aspx

A **statement** is an instruction that the Python interpreter can execute: while statements, for statements, if statements, and import statements etc.

An **expression** is a combination of values, variables, operators, and calls to functions. Expressions need to be evaluated. If you ask Python to print an expression, the interpreter evaluates the expression and displays the result.

中缀表达式
  * 只有一个参数，且用 `infix` 修饰的函数

```kt
calss Book { infix fun on (place: String) { /* ... */ } }
Book() on "My Desk"
```

分支表达式(非分支语句)

```kt
val mode = if (args.isNotEmpty() && args[0] == "1") DEBUG else USER
val mode = when {args.isNotEmpty() && args[0] == "1" -> DEBUG else -> USER}
```

### 循环语句

```kt
public interface Iterator<out T> {
    public operator fun next(): T
    public operator fun hasNext(): Boolean
}
```

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
fun main(args: Array<String>) {
    while (true) {
        try {
            println("请输入算式例如： 3 + 4")
            val input = readLine() ?: break
            val splits = input.trim().split(" ")
            if (splits.size < 3) { throw IllegalArgumentException("参数个数不对") }
            val arg1 = splits[0].toDouble()
            val op = splits[1]
            val arg2 = splits[2].toDouble()
            println("$arg1 $op $arg2 = ${Operator(op)(arg1, arg2)}")
        } catch (e: NumberFormatException) {
            println("您确定输入的是数字吗？")
        } catch (e: IllegalArgumentException) {
            println("您确定输入的是三个参数吗？或者您确定您的输入是用空格分隔的吗？")
        } catch (e: Exception) {
            println("程序遇到了未知的异常，${e.message}")
        }
        println("再来一发?[Y]")
        val cmd = readLine()
        if (cmd == null || cmd.toLowerCase() != "y") break
    }
    println("感谢您的使用，再见")
}

class Operator(op: String) {
    private val opFun: (left: Double, right: Double) -> Double
    init {
        opFun = when (op) {
            "+" -> { l, r -> l + r }
            "-" -> { l, r -> l - r }
            else -> { throw UnsupportedOperationException(op) }
        }
    }
    operator fun invoke(left: Double, right: Double): Double = opFun(left, right)
}
```

导出可执行程序


## 4.面向对象

### 面向对象的基本概念

* 本质上就是解决如何用程序描述世界的问题
* 讨论如何把实际存在的东西映射成程序的类和对象
* 一种程序设计的思路、思想、方法
* 程序设计层面的概念
* 设计模式：前人的程序设计经验

### 抽象类与接口

接口
  * 直观理解就是一种约定
  * 接口不能有状态
  * 必须由类对它实现之后才能使用

抽象类
  * 实现了一部分协议的半成品
  * 可以有状态，可以有方法实现
  * 必须由子类继承后使用

抽象类和接口的区别
  * 抽象类有状态，接口没有状态
  * 抽象类有方法实现，接口只能有无状态的默认实现
  * 抽象类只能单继承，接口可以多实现
  * 抽象类反应本质，接口体现能力

```kt
interface InputDevice {
    fun input(event: Any)
}

interface USBInputDevice: InputDevice

abstract class USBMouse(val name: String): USBInputDevice, OpticalMouse {
    override fun input(event: Any) { }
    override fun toString(): String { return name }
}

class LogitechMouse: USBMouse("罗技鼠标") { }

class Computer {
    fun addUSBInputDevice(inputDevice: USBInputDevice) {
        println("add usb input device: $inputDevice")
    }
}

fun main(args: Array<String>) {
    val computer = Computer()
    val mouse = LogitechMouse()
    computer.addInputDevice(mouse)
}
```

### 继承

继承/实现 的语法要点
  * 父类需要 `open` 才可以被继承
  * 父类方法、属性需要 `open` 才可以被覆写
  * 接口、接口方法、抽象类默认为 `open`
  * 覆写父类/接口成员需要 `override` 关键字
  * `class D: A(), B, C`
  * 注意继承类时实际上调用了父类构造方法
  * 类只能单继承，接口可以多实现

#### 接口代理

接口方法实现交给代理类实现

```kt
interface Drive {
    fun start()
    fun beep() { println("di--di--") }
}

class Driver: Drive {
    override fun start() { println("start") }
}

class Manager(driver: Driver): Drive by driver {      // 经理把开车的所有事务交给司机处理
    override fun start() { println("manager start") }
}

fun main(args: Array<String>) {
    val driver = Driver()
    val manager = Manager(driver)
    driver.start()   // start
    manager.start()  // manager start
    manager.beep()   // di--di--
}
```

#### 接口方法冲突


### 类及其成员的可见性

|    Kotlin   |    Java       ||
|-------------|---------------|--------------
| private     | private       ||
| protected   | protected     ||
| -           | default       | 包内可见
| internal    | -             | 模块内可见
| public      | public        | Kotlin 默认 public

### object

* 只有一个实例的类
* 不能自定义构造方法
* 可以实现接口、继承父类
* 本质上就是单例模式最基本的实现

```kt
object MusicPlayer {
    val state: Int = 0
    fun play(url: String) {  }
    fun stop() {  }
}
```

```java
public calss MusicPlayer {
    public static MusciPlayer INSTANCE = new MusicPlayer();
    private MusicPlayer() { }
}
```

### 伴生对象与静态成员

每个类对应一个伴生对象，伴生对象的成员全局独一份

伴生对象与静态成员
  * 静态成员考虑用包级函数、变量替代
  * `@JvmField` 和 `@JvmStatic` 的使用

```kt
class Latitude private constructor(val value: Double) {
    companion object {
        @JvmStatic    // 添加此注解，在 Java 中就可以跟普通静态方法一样使用
        fun ofDouble(double: Double): Latitude = Latitude(double)
        fun ofLatitude(latitude: Latitude): Latitude = Latitude(latitude.value)
        @JvmField
        val TAG = "Latitude"
    }
}
```

### 方法重载与默认参数

* 重载 overload，覆写 override
* 名称相同、参数不同的方法
* Jvm 函数签名的概念：只跟函数名、参数列表有关，跟返回值没有关系

```kt
class Overloads {
    @JvmOverloads  // Kotlin 中能用默认参数就不用重载，添加此注解方便 Java 中调用
    fun a(int: Int = 0): Int = int
}
```

JDK 中不好的设计：`List.remove(int)` `List.remove(Object)` 碰到数值时存在歧义。

### 扩展成员

为现有类添加方法、属性
  * `fun X.y(): Z {  }`
  * `val X.m` 注意扩展属性不能初始化，类似接口属性

```kt
// Extends.kt
operator fun String.times(int: Int): String {
    val stringBuilder = StringBuilder()
    for (i in 0 unitl int) stringBuilder.append(this)
    return stringBuilder.toString()
}
println("abc" * 3)  // "abcabcabc"
```

```java
ExtendsKt.times("abc", 16);
```

### 属性代理

定义方法 `val/var <property name>: <Type> by <expression>`  
代理者需要实现相应的 `setValue` / `getValue` 方法

```kt
class X {  // 常用的实际示例为 Lazy
    private var value: String? = null
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String { return value?: "h" }
//  operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) { this.value = value }
}

val hello by X()
var world by X()
```

### 数据类

* 与 JavaBean 的差异以及 allOpen 和 noArg 插件的使用
* 默认实现了 `copy` `toString` 等方法
* `componentN` 方法

```kt
data class Country(val id: Int, val name: String)

val china = Country(0, "中国")
println(china)
```

### 内部类

* 内部类是定义在类内部的类
* 与类成员有相似的访问控制
* Java 中默认是非静态内部类，而 Kotlin 中默认是静态内部类。
* `this@Outter` 和 `this@Inner` 的用法

匿名内部类
  * 没有定义名字的内部类
  * 类名编译时生成，类似 `Outter$1.class`
  * 可继承父类、实现多个接口，注意与 Java 的区别

```kt
class Outter {
  val a: Int = 0
    inner class InnerNotStatic {
        val a: Int = 5
        fun myprint() { println(this@Outter.a) }
    }
    class InnerStatic {  }
}
```

### 枚举

* 实例可数的类，注意枚举也是类
* 可以修改构造，添加成员
* 可以提升代码的表现力，也有一定的性能开销

```kt
enum class LogLevel { VERBOSE, DEBUG, INFO, WARN, ERROR, ASSERT }
```

### 密封类

枚举类是实例可数，而密封类是子类固定。

```kt
sealed class PlayerCmd {
    class Play(val url: String, val position: Long = 0): PlayerCmd()
    calss Seek(val position: Long): PlayerCmd
    object Pause: PlayCmd()
}
```


<script>ooboqoo.contentsRegExp = /H[123]/;</script>
