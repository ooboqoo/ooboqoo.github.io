# 快学 Scala

##  1. 基础

#### 1.1 解析器

* `sbt console`，命令行中可以使用 tab 不全，上下键调用历史命令，`:help` 查看帮助
* IDEA 创建工作表单 worksheet，录入命令后在右侧即可看到执行输出

#### 1.2 声明值和变量

* `val` 定义常量，`var` 定义变量，推荐优先使用 `val`
* 声明时无需指定类型，可以从初始化值中自动推断，当然在必要时可以显示指定类型
* 声明值或变量必须立即初始化

```scala
val xmax, ymax = 10   // xmax 和 ymax 被同时赋初始值 10，注意与 JS 区分
var greeting, message: String = null
```

注：Scala 中不推荐在行尾添加 `;` 仅当同一行代码中存在多条语句时才需要用分号隔开。

#### 1.3 常用类型

和 Java 一样，Scala 有七种数值类型：Byte Char Short Int Long Float Double 和 Boolean 类型。但 Scala 并不可以区分基本类型和引用类型。

Scala 用底层的 java.lang.String 类来表示字符串，不过，它通过 StringOps 类给字符串追加了上百种操作。

Scala 还提供了 RichInt RichDouble RichChar 等，它们分别提供了 Int Double Char 所不具备的便捷方法。

注：在 Scala 中使用方法，而不是强制类型转换来做数值类型之间的转换。

#### 1.4 算术和操作符重载

Scala 中的操作符，实际上是方法 `a + b` 实际上执行的是 `a.+(b)`。这个设计所带来的几个附作用是：
  * 你可以使用几乎任何符号来为方法命名
  * Scala 中并没有提供 `++` 和 `--` 操作符，因为 Int 类是不可变的
  * 你可以自定义操作符

#### 1.5 关于方法调用

* 如果一个无参方法并不修改对象，调用时就不用写括号
* Scala 中的每个类都有一个伴生对象 companion object，其方法就跟 Java 中的静态方法一样 (就是 JS 中的原型)
* 包也可以有包对象 package object，这种情况下，你可以引入这个包，然后不带任何前缀使用包对象里的方法

```scala
import scala.math._    // 在 scala 中 _ 是通配符，类似于 Java 中的 *
sqrt(2)             // 引入后直接使用
scala.math.sqrt(2)  // 如果不引入包，可以通过包名调用
math.sqrt(2)        // scala 开头的包，scala 可以省略
```

#### 1.6 apply 方法

Scala 中采用 `"some string"(2)` 的形式来获取第3个字符( C++ 中用 `s[i]` Java 中用 `s.charAt(i)` 的形式)。

其实 `s(i)` 是 `s.apply(i)` 的简写形式。

用 `Array(2, 5, 4, 9, 7)` 创建一个数组时，用的也是 Array 伴生对象的 apply 方法。

注：`()` 标识法偶尔会跟另一个 Scala 特性 --隐式参数-- 冲突，如 `"Bonjour".sorted(3)` 就会报错，可以通过 `("Bonjour".sorted)(3)` 或 `"Bonjour".sorted.apply(3)` 规避。

#### 1.7 Scaladoc

与 Javadoc 相比，浏览 Scaladoc 更具挑战性，Scala 类通常比 Java 类拥有多得多的便携方法。

Scaladoc 的类清单是按照包来组织的，如果知道某个类名或方法名，可以通过入口页顶部的搜索栏快速定位。

注意每个类名旁边的 `C` 和 `O`，他们分别连接到对应的类 `C` 和伴生对象 `O`。

请记住以下这些小窍门：

* 数值看 RichInt 和 RichDouble，字符串看 StringOps
* 数学函数位于 scala.math 包中
* BigInt 有一个方法叫 `unary_-` 这个是前置的负操作符
* 方法可以接受函数作为参数，如 StringOps 的 count 方法 `def count(p: (Char) => Boolean) : Int` `s.count(_.isUpper)`
* Scala 中用方括号来表示类型参数，如 `Seq[A]` 是元素类型为某个类型 A 的序列。
* 有许多相互之间有细微差异的类型表示序列，如 GenSeq GenIterable GenTraversableOnce 等，它们之间的差别通常没那么重要
* 别被这么多方法吓倒了，这是 Scala 对应各种应用场景的方式，当需要时再去找你需要的方法就是
* 有些方法带有隐式参数 (其实就是默认参数啦)
* 当对某个方法感到困惑时，在 REPL 里试下就好


## 控制结构和函数


















