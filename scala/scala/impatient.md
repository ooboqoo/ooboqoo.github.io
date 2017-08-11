# 快学 Scala

##  1. 基础

#### 1.1 解析器

* `sbt console`，命令行中可以使用 tab 补全，上下键调用历史命令，`:help` 查看帮助
* IDEA 创建工作表单 worksheet，录入命令后在右侧即可看到执行输出

#### 1.2 声明值和变量

* `val` 定义常量，`var` 定义变量，推荐优先使用 `val`
* 声明时无需指定类型，可以从初始化值中自动推断，当然在必要时可以显式指定类型
* 声明值或变量必须立即初始化

```scala
val xmax, ymax = 10   // xmax 和 ymax 被同时赋初始值 10，注意与 JS 区分
var greeting, message: String = null
```

注：Scala 中不推荐在行尾添加 `;` 仅当同一行代码中存在多条语句时才需要用分号隔开。

#### 1.3 常用类型

和 Java 一样，Scala 有七种数值类型：Byte Char Short Int Long Float Double 和 Boolean 类型。但 Scala 并不区分基本类型和引用类型。

Scala 用底层的 java.lang.String 类来表示字符串，不过，它通过 StringOps 类给字符串追加了上百种操作。

Scala 还提供了 RichInt RichDouble RichChar 等，它们分别提供了 Int Double Char 所不具备的便捷方法。

注：在 Scala 中使用方法，而不是强制类型转换来做数值类型之间的转换。

#### 1.4 算术和操作符重载

Scala 中的操作符，实际上是方法，如 `a + b` 实际上执行的是 `a.+(b)`。这个设计所带来的几个副作用是：
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
math.sqrt(2)        // scala 开头的包，可以省略 scala
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


## 2. 控制结构和函数

在 Java 或 C++ 中，我们把表达式和语句看作两样不同的东西。表达式有值，而语句执行动作。在 Scala 中，**几乎所有构造出来的语法结构都有值**。这个特性是的程序更加精简，也更易读。

本章的要点包括：
  * if 表达式有值
  * 块也有值--是它最后一个表达式的值
  * for 循环更像是增强版的 Java for 循环
  * 分号在绝大多数的情况下不是必需的
  * Java 中的 void 类型在 Scala 中是 Unit
  * 函数中只有需要中途跳出时才使用 `return`
  * Scala 中没有受检异常

#### 2.1 条件表达式

Scala 的 if/else 将在 Java 和 C++ 中分开的两个语法结构 if/else 个 ?: 结合在了一起。

```scala
val s = if (x > 0) 1 else -1
```

Scala 中每个表达式都有一个类型：

```scala
if (x > 0) 1 else -1           // 类型为 Int，因为两个分支都为 Int
if (x > 0) "positive" else -1  // 类型为 Any，因为 String 和 Int 的公共超类为 Any
if (x > 0) 1 else ()           // 当分支缺失时，那么有可能 if 语句没有返回任何值，这时需要引入一个 Unit 类解决
```

Unit 类只有一个值 `()`，与 JS 中的 null 和 undefined 或者是 Java 和 C++ 中的 void 类似。从技术上讲，void 没有值但 Unit 有一个表示 "无值" 的值，更加接近于 JS 的 null。

Scala 中没有 switch 语句，不过它有一个强大地多的模式匹配机制。

#### 2.2 语句终止

Scala 中不推荐在语句末尾添加分号，除非需要在一行中写下多个语句。

如果你在写较长的语句，需要分两行来写的话，就要确保第一行以一个不能用作语句结尾的符号结尾。

```scala
if (n > 0) { r = r * n; n -= 1 }
s = s0 + (v - v0) * t +  // 长语句在操作符处断行
  0.5 * (a -a0) * t * t
```

#### 2.3 块表达式和赋值

Scala 中块 `{ }` 包含一系列表达式，其结果也是一个表达式。块中最后一个表达式的值就是块的值。

Scala 中，赋值动作本身是没有值的，或者，更严格地说，它们的值是 `()`，所以 `x = y = 1` 这种用法是错误的。

```scala
x = y = 1  // 相当于 y = 1; x = ()
```

#### 2.4 输入和输出

要打印一个值，我们用 `print` 或 `println` 函数，另外，还有一个带有 C 风格格式化字符串的 `printf` 函数。

Scala 类库预定义的三个字符串插值器：
  * `f` 字符串可以包含表达式和格式化指令
  * `s` 字符串可以包含表达式但不能包含格式化指令
  * `raw` 转义序列不会被求值

你可以用 scala.io.StdIn 的 `readLine` 方法从控制台读取一行输入，如果要读取数字、布尔值或者是字符，可以用 `readInt` `readDouble` `readByte` `readShort` `readLong` `readFloat` `readBoolean` 或者 `readChar`。

```scala
import scala.io
val name = StdIn.readLine("Your name:")
print("Your age:")
val age = StdIn.readInt()
println(s"Hello, $name! Next year, you will be ${age + 1}.")
```

#### 2.5 循环

Scala 拥有与 Java 和 C++ 相同的 while 和 do 循环。但 Scala 没有与 `for(int;check;update)` 循环直接对应的结构，如果需要这样的结构，有两个选择：
  * 使用 while 循环
  * 使用 `for(i <- 表达式)` 形式的 for 语句，如 `for(i <- 1 to n)`

Scala 中也没有提供 `break` 或 `continue` 来退出循环，有三个替代的选项：
  * 使用 Boolean 型的控制变量
  * 使用嵌套函数，从函数当中 return
  * 使用 Breaks 对象中的 break 方法

#### 2.6 高级 for 循环

```scala
for (i <- 1 to 3; j <- 1 to 3) print(s"${i * 10 + j} ")            // 11 12 13 21 22 23 31 32 33
for (i <- 1 to 3; j <- 1 to 3 if i != j) print(s"${i * 10 + j} ")     // 12 13 21 23 31 32
for (i <- 1 to 3; from = 4 - i; j <- from to 3) print(s"${i * 10 + j} ")  // 13 22 23 31 32 33
for (i <- 1 to 10) yield i % 3  // Vector(1, 2, 0, 1, 2, 0, 1, 2, 0, 1)
```

#### 2.7 函数

除方法外 Scala 还支持函数，方法对对象进行操作，而函数则不是。C++ 中也有函数，不过在 Java 中我们只能用静态方法来模拟。

要定义函数，需要给出函数的名称、参数和函数体，参数必须指定类型，而只要函数不是递归的，就不需要指定返回类型。

```scala
def abs(x: Double) = if (x >= 0) x else -x
def noParam = x * x   // 无参函数，可以省掉 ()
```

#### 2.8 默认参数和带名参数

```scala
def decorate(str: String, left: String = "[", right: String = "]") = left + str + right
```

#### 2.9 变长参数

```scala
def sum(args: Int*) = {
  var result = 0
  for (arg <- args) result += arg
  result
}
```

上例中的 sum 函数调用时，只能传入多个数字，而不能是一个整数区间。如果是整数区间，则要附加 `: _*`，有点类似于 JS 中的 `...` 展开符：

```scala
val s = sum(1 to 5: _*)
```

#### 2.10 过程

Scala 对于不返回值的函数有特殊的表示法。如果函数体包含在花括号当中但没有前面的 `=` 号，那么返回类型就是 Unit，这样的函数被称作过程 procedure，过程不返回值，我们调用它仅仅是为了它的副作用。

```scala
def box(s: String) { println(s) }         // 没有等号，大括号不能省
def box2(s: String): Unit = println(s)    // 有等号，大括号可以省
```

#### 2.11 懒值

当 val 被声明为 lazy 时，它的初始化将被推迟，知道我们首次对它取值。懒值对于开销较大的初始化语句而言十分有用

```scala
lazy val words = io.Source.fromFile("/path/to/file").mkString
```

#### 2.12 异常

Scala 异常的工作机制和 Java 或 C++ 一样，和 Java 一样，抛出的对象必须是 java.lang.Throwable 的子类。不过，与 Java 不同的是，Scala 没有 "受检" 异常--你不需要声明函数或方法可能会抛出的异常类型，编译期不会做检查。

编译期检查可能抛出的异常类型，就要求程序员必须去思考哪些异常应该在哪里处理，但同时也催生出怪兽般的方法签名，综合考虑，Scala 的设计者决定放弃编译器异常检查。

```scala
val url = new URL("http://example.com/any.gif")
try {
  process(url)
} catch {
  case _: MalformedURLException => println(s"Bad URL: $url")
  case ex: IOException => ex.printStackTrace()
}
```


## 3. 数组相关操作

本章要点：
  * 若长度固定则使用 Array，若长度可能变化则使用 ArrayBuffer
  * 提供初始值时不要使用 `new`
  * 用 `()` 来访问元素
  * 用 `for (elem <- arr)` 来遍历元素
  * 用 `for (elem <- arr if ...) yield ...` 来将原数组转型为新数组

#### 3.1 定长数组

```scala
val nums = new Array[Int](10)
val s = Array("Hello", "World")  // 当已提供初始值时，就不需要 new 了
```

在 JVM 中，Scala 的 Array 以 Java 数组方式实现。

#### 3.2 变长数组

```scala
import scala.collection.mutable.ArrayBuffer
val a = ArrayBuffer[Int]()    //
val b = new ArrayBuffer[Int]  // 两种写法都行
b += 1                  // 添加单个元素
b += (1, 2, 3)          // 添加多个元素
b ++= Array(8, 13, 21)  // 追加任何集合
b.trimEnd(5)            // 移除最后5个元素
b.insert(2, 6, 8)       // 在下标2之前插入2个元素
b.remove(2, 3)          // 从下标2开始移除3个元素
b.toArray               // 转换成数组
```

在数组缓冲的尾端添加或移除元素是一个高效的操作，当然也可以在任意位置插入或移除元素，但这样的操作并不那么高效--所有在那个位置之后的元素都必须被平移。

#### 3.3 遍历数组和数组缓冲

```scala
for (i <- 0 until a.length) println(s"$i: ${a(i)}")  // unitl 方法跟 to 很像，只不过它排除了最后一个元素
    0 unitl a.length by 2    // 每2个元素一跳
    0 until a.length by -1   // 从数组尾端开始

for (elem <- a) println(elem)
```

#### 3.4 数组转换

数组转换不会修改原始数组，而是返回新的数组。

```scala
val a = Array(2, 3, 7)
val result = for (elem <- a) yield 2 * elem      // result: Array[Int] = Array(4, 6, 14)
for (elem <- a if elem % 2 == 1) yield 2 * elem  // res5: Array[Int] = Array(6, 14)
```

假定我们想从一个整数的数组缓冲移除所有的负元素，传统的顺序(递增)执行方案性能底下，采用逆向(递减)方案会高效很多，而采用 for/yield 生成一个新的数组是更好的选择。如果非要修改原数组，则通过记住索引，再一次性对数组元素进行移动操作会好些。

#### 3.5 常见算法

```scala
Array(1, 7, 2, 9).sum
ArrayBuffer("Mary", "had", "a", "little").max  // res10: String = little

val b = ArrayBuffer(1, 2, 7, 9)
val bSorted = b.sorted  //  ArrayBuffer(1, 2, 7, 9)
val bDescending = b.sortWith(_ > _)  // 提供比较函数进行降序排序 ArrayBuffer(9, 7, 2, 1)

val a = Array(1, 7, 2, 9)
scala.util.Sorting.quickSort(a)  // 只能对数组排序(修改数组本身)，不能对数组缓冲排序
a.mkString("<", ", ", ">")  // res7: String = <1, 2, 7, 9>
a.toString                  // res8: String = [I@ead7db3          ]
```

#### 3.7 多维数组

多维数组是通过数组的数组来实现的，多维数组中的数组可以是不规则的(长度可以不同)。

```scala
val matrix = Array.ofDim[Double](3, 4)  // 三行四列
matrix(row)(column)  // 访问其中元素 row column 用下标替换

```

#### 3.8 与 Java 互操作


## 映射和元组

























