# Classes and Objects

* modifier 修饰符 - 用于添加 **限定** 的场合
* annotation 注解，批注 - 用于添加 **元信息** 的场合
* decorator 装饰器 - 用于添加 **新功能** 的场合

## Classes and Inheritance

### 类定义

类定义由 类名 + 头部 + 定义体 3部分组成，class header 和 class body 都是可选的，如果没有定义体，则 `{}` 也可以省略。

```kt
class Empty   // {} 可省略
```

#### 构造函数

##### 主构造函数

* 一个类可以有一个主构造函数(位于定义头部)和多个构造函数
* 如果主构造函数没有 annotations 或 modifiers，`constructor` 关键字可省略
* 主构造函数无法包含代码，代码需要放到 `init` 打头的 initializer blocks 中
* 主构造函数中的参数，在整个类定义体中都是可见的，当然也可以直接添加 `var` 或 `val` 转成类属性

```kt
class Customer(name: String) {
    init {
        logger.info("Customer initialized with value ${name}")
    }
}

class Customer public @Inject constructor(name: String) { ... }  // 存在修饰器或修饰符时 constructor 不可省
```

```kt
class Customer(name: String) { val customerKey = name.toUpperCase() }  // 主构造参数在类定义体中可见
class Person(val firstName: String, val lastName: String, var age: Int) { }  // 简写方式
```

##### 普通构造函数

当同时存在主构造函数和普通构造函数时，普通构造函数必须委托(直接或间接)给主构造函数。

```kt
// 没有主构造函数
class Person {
    constructor(parent: Person) {  // 普通构造函数用 constructor 关键字声明
        parent.children.add(this)
    }
}

// 主构造函数和普通构造函数并存
class Person(val name: String) {
    constructor(name: String, parent: Person) : this(name) {  // 委托给主构造函数时用 this 指代主构造函数
        parent.children.add(this)
    }
}
```

##### 无构造函数

当一个非抽象类没有定义构造函数时，会自动获得一个 public 的无参主构造函数，如果需要私有的主构造函数，则须显式声明。

JVM环境下，当主构造函数的所有参数都有默认值时，Kotlin 也会自动添加一个无参构造函数，方便后续消费。

```kt
class DontCreateMe private constructor () { }  // 私有主构造函数
```

#### 创建实例

Kotlin 中创建实例没有 `new` 关键字

```kt
val customer = Customer("Joe Smith")
```

#### 类成员

类成员可以是
  * [Constructors and initializer blocks](https://kotlinlang.org/docs/reference/classes.html#constructors)
  * [Functions](https://kotlinlang.org/docs/reference/functions.html)
  * [Properties](https://kotlinlang.org/docs/reference/properties.html)
  * [Nested and Inner Classes](https://kotlinlang.org/docs/reference/nested-classes.html)
  * [Object Declarations](https://kotlinlang.org/docs/reference/object-declarations.html)

### 继承

所有的 Kotlin 类都有一个共同的、默认的超类 `Any`，注意，`Any` 跟 `java.lang.Object` 是不同的，`Any` 只有 `equals()` `hashCode()` `toString()` 3个方法。

```kt
class Example  // {} // Implicitly inherits from Any
```

如果一个类拥有主构造函数，则必须在那里初始化父类，否则，在普通构造函数中使用 `super` 关键字来初始化父类。

```kt
class Derived(p: Int) : Base(p)

class MyView : View {
    constructor(ctx: Context) : super(ctx)
    constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
}
```

Kotlin 中的类默认是 `final` 的，如果需要被继承，则需要添加 `open` 注解。

#### 覆写方法

跟 Java 不同的是，Kotlin 希望事情变得更明显、直观，在覆写方法时，强制要求使用 `open` `override` 注解。

```kt
open class Base {
    open fun v() {}  // 可被覆写方法必须用 open 修饰
    fun nv() {}
}
class Derived() : Base() {
    override fun v() {}  // 覆写方法必须用 override 修饰
    final override fun vv() { }  // 带 override 的方法默认是 open 的，如果要阻止覆写，可添加 final
}
```

#### 覆写属性

覆写属性跟覆写方法一样，也需要使用 `open` `override` 显式声明。

```kt
open class Foo {
    open val x: Int get() { ... }
}

class Bar1 : Foo() {
    override var x: Int = 0  // var 可用来覆写 val，反之不行
}

class Bar1(override val count: Int) : Foo  // 也可以直接在主构造函数中覆写
```

#### 调用超类成员

在子类中覆写超类成员后，直接使用标识符调用的是子类成员，如果要在子类中调用超类，须采用 `super.xxx`：

```kt
open class Foo {
    open fun f() { println("Foo.f()") }
    open val x: Int get() = 1
}

class Bar : Foo() {
    override fun f() { super.f(); println("Bar.f()") }
    override val x: Int get() = super.x + 1
}
```

内部类调用外部类的超类 `super@Xxx.xxx`：

```kt
class Bar : Foo() {
    override fun f() { /* ... */ }
    override val x: Int get() = 0
    
    inner class Baz {
        fun g() {
            super@Bar.f()  // Calls Foo's implementation of f()
            println(super@Bar.x)  // Uses Foo's implementation of x's getter
        }
    }
}
```

#### 覆写规则

> 区分不同来源，用的是 `super<Xxx>` 而区分不同的外部层级，用的是 `super@Xxx`，这个应该是跟 label 做的统一吧。

当子类从不同来源继承了冲突成员时，必须进行覆写，使用 `super<来源>` 的格式来区分来源：

```kt
open class A {
    open fun f() { print("A") }
    fun a() { print("a") }
}

interface B {
    fun f() { print("B") } // interface members are 'open' by default
    fun b() { print("b") }
}

class C() : A(), B {
    // 存在歧义时要求必须覆写 The compiler requires f() to be overridden:
    override fun f() {
        super<A>.f()  // call to A.f()
        super<B>.f()  // call to B.f()
    }
}
```

### 抽象类

抽象类使用 `abstract` 关键字声明，用 `abstract` 修饰的类或方法都自带 `open` 属性。

抽象类可继承非抽象类；也可以用抽象成员覆盖非抽象成员。

```kt
open class Base {
    open fun f() {}
}

abstract class Derived : Base() {
    open val id = 123          // 没有 abstract 修饰的成员想要被覆写，还是要添加 open
    override abstract fun f()
}

class AAA: Derived() {
    override var id = 321
    override fun f() {
        println("f in Derived")
        println(id)
    }
}
```

### 伴生对象

> 伴生对象即 JS 中类即对象的概念，跟 JS 中的原型没有关系，只能通过类名访问，无法通过实例来访问。

Kotlin 中的类没有静态方法，多数情况下推荐使用包级 package-level 函数。

Kotlin 中的每个类内都可以定义一个伴生对象，在伴生对象中定义的成员，可以像 Java 中调用静态方法一样通过 `ClassName.method` 的形式来直接通过类标识符调用。

* 伴生对象声明 `companion object { ... }`
* 伴生对象声明时名称可省略，此时会被赋予默认的名称 `Companion`
* 伴生对象跟类的静态方法存在本质的区别，它是一个真实的对象，可以实现接口等
* 在 JVM 使用场景下，可以通过 `@JvmStatic` 注解来生成真实的静态成员

```kt
abstract class Derived : Base() {
    companion object {               // 伴生对象用 companion 来与普通成员作区分
        val id = 456
        fun printID() { println(id) }
    }
    open val id = 123
    override abstract fun f()
}
Derived.printID()
Derived.Companion   // 伴生对象的名字可省略，此时会被赋予名称 Companion
```

对象表达式在执行时立即初始化，而对象声明在首次实际使用时才初始化。伴生对象在类加载时初始化。


## Properties and Fields

> 属性与字段
> 
> 属性和字段，是 C# 中的说法。Java 中的属性，通常可以理解为 getter 和 setter，而字段通常叫做类成员或类成员变量。  
> C#中，公共字段只是类用 public 修饰符所公开的简单公共变量，而属性则是对字段的封装，它使用 get 和 set 访问器来控制如何设置或返回字段值。

### 声明属性

类中使用 `var` `val` 来声明属性

```kt
class Address {
    val name: String = ...
    var street: String = ...
}
```

### Getter 和 Setters

完整的属性声明格式

```text
var <propertyName>[: <PropertyType>] [= <property_initializer>]
    [<getter>]
    [<setter>]
```

```kt
var allByDefault: Int? // error: explicit initializer required, default getter and setter implied
var initialized = 1    // has type Int, default getter and setter

var setterVisibility: String = "abc"
    private set // the setter is private and has the default implementation
```

#### Backing Fields

Kotlin 中的类没有字段 fields，但在自定义存取器时往往需要这么一个支持字段，此类情况下 Kotlin 通过 `field` 关键字自动提供支持字段。注意，`field` 只在 getter 和 setter 中有效。

当属性的任一访问器使用了默认实现，或者是自定义访问器中使用了 `field`，Kotlin 都会自动生成一个对应的支持字段。

```kt
var counter = 0 // the initializer value is written directly to the backing field
    set(value) {
        if (value >= 0) field = value
    }

// 此场景下不会生成支持字段
val isEmpty: Boolean
    get() = this.size == 0
```

转成Java代码：

```java
public final class Outer {
   private int counter;                                    // 自动生成私有属性，也即文档里的支持字段概念
   public final int getCounter() { return this.counter; }  // getter+setter，即文档里的属性概念
   public final void setCounter(int value) {
      if (value >= 0) { this.counter = value; }
   }
}
```

#### Backing Properties

在无法满足 "implicit backing field" 使用条件时，后备属性始终是可用的

```kt
private var _table: Map<String, Int>? = null
public val table: Map<String, Int>
    get() {
        if (_table == null) _table = HashMap()
        return _table ?: throw AssertionError("Set to null by another thread")
    }
```

### 编译期常量

编译期常量使用 `const` 来修饰，编译期常量必须满足以下条件
  * 顶级变量或是 `object` 的成员
  * 立即初始化为 String 或 原始值类型
  * 没有自定义 getter

```kt
const val SUBSYSTEM_DEPRECATED: String = "This subsystem is deprecated"
@Deprecated(SUBSYSTEM_DEPRECATED) fun foo() { ... }
```

### 延迟初始化属性或变量

正常 non-null 型属性必须立即初始化，但也许你希望通过依赖注入或在测试套件中设置属性值，此时可以使用 `latainit` 关键字来延迟初始化。

`lateinit` 仅适用于
  * class 定义体中 `var` 声明的属性，主构造函数内不行，且不能有 getter 和 setter
  * 顶级属性和本地变量  // 自 1.2 开始
  * 属性或变量必须是 non-null(nullable时就不存在延迟初始化需求了)，且不能是原始值类型

```kt
public class MyTest {
    lateinit var subject: TestSubject
    @SetUp fun setup() { subject = TestSubject() }
    @Test fun test() { subject.method()  /* dereference directly */ }
}
```

当在 `lateinit` 属性在初始化之前被访问时，会抛出异常，从 1.2 开始，可以通过 isInitialized 属性来判断是否已初始化：

```kt
if (foo::bar.isInitialized) println(foo.bar)
```


## Interfaces

Kotlin 中的接口跟 Java8 很像。接口可以包含抽象方法声明，也可以包含具体的方法实现。

接口与抽象类不同的地方是，接口不能存储状态，也就是说接口只能有抽象属性或只包含访问器实现。

```kt
interface MyInterface {
    val prop: Int // abstract

    val propertyWithImplementation: String
        get() = "foo"

    fun foo() { print(prop) }
    fun bar()
}

class Child : MyInterface {
    override fun bar() { /* body */ }
}
```


## Visibility Modifiers

Classes, objects, interfaces, constructors, functions, properties and their setters can have visibility modifiers. (Getters 的可见性始终同属性) Kotlin 中有4类访问控制符: `private` `protected` `internal` `public`，默认为 `public`.

### Packages

Functions, properties and classes, objects and interfaces can be declared on the "top-level", i.e. directly inside a package:

|||
|-------------|------------------------------
| `private`   | 当前文件内可见
| `protected` | top-level 声明不支持此修饰符
| `internal`  | 同 module 内可见
| `public`    | 默认

### Classes and Interfaces

|||
|-------------|-------------------
| `private`   | 当前类内可见
| `protected` | 当前类及其子类可见
| `internal`  | 当前 module 内可见
| `public`    | 默认

注：跟Java不同的是，在Kotlin中外部类无法看到其内部类中的 `private` 成员。

当覆写一个 `protected` 成员时，新的成员也是 `protected` 的。override 一个 protected 的属性时，只能向上改成 public 而无法改成其他可见性。

#### 本地声明

本地 变量、函数、类 不适用可见性修饰符。

### Modules

`internal` 修饰符修饰的成员在模块内可见。一个模块就是编译到一起的特定Kotlin文件集合：
  * an IntelliJ IDEA module;
  * a Maven project;
  * a Gradle source set;
  * a set of files compiled with one invocation of the Ant task.


## Extensions

当我们想要扩充一个类时，在继承类或者使用装饰者模式之外，Kotlin 提供了一种直接扩充类功能的能力，称之为扩展。Kotlin支持给类扩充函数和属性。

扩展类时，其实没有给类添加成员，而只是给所有类实例添加了可通过 `.` 语法调用的函数而已。

### 扩展方法

```kt
class A {
    var id = 12
    fun foo() { println("A") }
}

val A.name        // 
    get() = "me"

fun main(args: Array<String>) {
    var a = A()
    a.foo(12)    // 报错，不应该传参
    fun A.foo(int: Int) { println(this.id + int) }  // this 工作正常
    val A.age    // 报错，Local extension properties are not allowed
    a.foo(45)    // 57
    println(a.name)  // me
}
```

### 扩展属性

扩展属性时，因为属性并不是作为成员实际插入到类中的，所以没办法生成 backing field，因此扩展属性不能初始化，只能显式提供 getter 和 setter。

### 扩展伴生对象

```kt
class MyClass {
    companion object { }  // will be called "Companion"
}
fun MyClass.Companion.foo() { /* ... */ }  // 扩展
MyClass.foo()  // 调用
```

### 其他

其他主题待补充


## Data Classes

我们会经常创建一些主要是用来存储数据的类，Kotlin专门提供了 数据类 来方便此类使用场景。

```kt
data class User(val name: String, val age: Int)
```

数据类都将获得以下方法：
  * 继承自 Any 的 `equals()` `hashCode()` `toString()`
  * `componentN()` 系列方法
  * `copy()`

```kt
data class User(val name: String, val age: Int)

fun main(args: Array<String>) {
    var gavin = User("gavin", 32)
    var ivan = User("ivan", 18)
    println(gavin.component1())    // gavin
    println(gavin.copy(age = 23))  // user(name=gavin, age=23)
}
```

为确保一致性和有意义，数据类必须满足以下条件：
  * 主构造函数至少要有一个参数
  * 主构造中的所有参数都应该是属性
  * 数据类不能是 `abstract` `open` `sealed` `inner`

从 1.1 开始，数据类可继承其他类。


## Sealed Classes

密封类用于限定子类，主要用在 when expression 中。

```kt
sealed class Expr
data class Const(val number: Double) : Expr()
data class Sum(val e1: Expr, val e2: Expr) : Expr()
object NotANumber : Expr()

fun eval(expr: Expr): Double = when(expr) {
    is Const -> expr.number
    is Sum -> eval(expr.e1) + eval(expr.e2)
    NotANumber -> Double.NaN
    // the `else` clause is not required because we've covered all the cases
}
```


## Generics

```kt
class Box<T>(t: T) {
    var value = t
}
val box: Box<Int> = Box<Int>(1)
val box = Box(1)  // 如果类型可以自动推断出来，可不写
```

### Variance

Java的类型系统中存在诡异的通配符，而Kotlin中没有采用通配符，而是使用了 declaration-site variance 和 type projections

### Type projections

### Generic functions

### Generic constraints


## Nested Classes

```kt
class Outer {
    private val bar: Int = 1
    class Nested {
        fun foo() = 2
        fun bar() = bar  // 报错，普通内嵌类无法读取外部类的成员
    }
    inner class Inner {  // 添加 inner 关键字将普通内嵌类转为内部类
        fun foo() = bar
    }
}
fun main(args: Array<String>) {
    val demo1 = Outer.Nested().foo()  // == 2
    val demo2 = Outer().Inner().foo() // == 1
}
```


## Enum Classes

```kt
enum class Color(val rgb: Int) {
        RED(0xFF0000),
        GREEN(0x00FF00),
        BLUE(0x0000FF)
}
```


## Objects

有时我们需要创建某个类的对象，但希望稍做修改但又不想声明一个新的子类。Java使用匿名内部类来处理这种情况。Kotlin用为解决此类问题引入了对象表达式和对象声明这两个概念。

### Object expressions

```kt
open class A(x: Int) {
    public open val y: Int = x
}
interface B {...}
val ab: A = object : A(1), B {  // 继承+实现或多实现时用逗号分隔
    override val y = 15
}

fun foo() {
    val adHoc = object {        // 不需要继承任何超类
        var x: Int = 0
        var y: Int = 0
    }
    print(adHoc.x + adHoc.y)
}
```

Note that anonymous objects can be used as types only in local and private declarations. 

```kt
class C {
    // Private function, so the return type is the anonymous object type
    private fun foo() = object { val x: String = "x"}
    // Public function, so the return type is Any
    fun publicFoo() = object { val x: String = "x" }

    fun bar() {
        val x1 = foo().x        // Works
        val x2 = publicFoo().x  // ERROR: Unresolved reference 'x'
    }
}
```

### Object declarations

对象声明时需要指定对象名，而对象表达式则不允许出现对象名。所以Kotlin文档说对象声明不能当成对象表达式使用。

类的伴生对象用的是对象声明，而不是对象表达式。

```kt
object obj { }
val obj2 = object obj3 {  }  // 报错对象表达式不能绑定名字
```

对象声明和对象表达式在语义上的区别
  * 对象表达式在代码处立即初始化
  * 对象声明是延迟初始化的，首次使用时才初始化

因此对象声明和对象表达式在使用上也有所不同
  * 对象声明不能是 local 的，如出现在函数内
  * 对象表达式只能出现在 local 场景，或是 private 声明中


## Delegation

http://www.runoob.com/kotlin/kotlin-delegated.html

委托模式是软件设计模式中的一项基本技巧。在委托模式中，有两个对象参与处理同一个请求，接受请求的对象将请求委托给另一个对象来处理。Kotlin 直接支持委托模式，无需写一堆形式性的代码，更加优雅，简洁。Kotlin 通过关键字 `by` 实现委托。

```kt
interface Base {
    fun print()
}

class BaseImpl(val x: Int) : Base {
    override fun print() { print(x) }
}

class Derived(b: Base) : Base by b

fun main(args: Array<String>) {
    val b = BaseImpl(10)
    Derived(b).print()  // prints 10
}
```


## Delegated Properties

所谓的委托属性，就是对其属性值的操作不再依赖于其自身的 getter / setter，而是将其托付给一个代理类，从而每个使用类中的该属性可以通过代理类统一管理，再也不用在每个类中，对其声明重复的操作方法。

当我们使用属性的get或者set的时候，属性委托的getValue和setValue就会被调用。

```kt
val lazyValue: String by lazy {
    println("computed!")
    "Hello"
}

fun main(args: Array<String>) {
    println(lazyValue)  // computed!\nHello
    println(lazyValue)  // Hello
}
```
