# Basics

https://kotlinlang.org/docs/reference/basic-types.html

## Basic Type

Kotlin 中一切皆对象，Kotlin 中的任何变量都可以直接调用其属性和方法。numbers, characters, booleans, arrays, and strings 这些个原始值类型在调用属性和方法时会自动装箱。

### Numbers

| 分类 | Type   | 装箱类型 |  Bit width | Literal Constants            | 
|------|--------|----------|------------|------------------------------|-------------------------------------
| 浮点 | Double |          | 64         | `123.5` `123.5e10`           | 
| 浮点 | Float  |          | 32         | `123.5f`                     | 
| 整型 | Long   |          | 64         | `123L` `1_000_000` `0xFF_EC` | 
| 整型 | Int    |  Integer | 32         | `123` `0x0f` `0b00001011`    | 支持10 16 2进制，不支持8进制表示法
| 整型 | Short  |          | 16         | `0b11010010_01101001`        | 
| 字节 | Byte   |          | 8          | `0b11010010`                 ||

```kt
val anInt: Int = 8
val maxInt: Int = Int.MAX_VALUE
val minInt = Int.MIN_VALUE
val aFloat = 1E3F
val aDouble = 1E3
println(Float.MIN_VALUE)         // 1.4E-45 正数，非常小的小数
println(Float.NaN == Float.NaN)  // false
```

#### Underscores in numeric literals

v1.1 添加了 `_` 标记，用于对长数字进行分组，便于阅读，如 `1_000_000` `1234_5678_9012_3456L` `0xFF_EC_DE_5E`。

#### 体现形式 Representation

通常数字是以原始值类型存储的，但当 need a nullable number reference (e.g. `Int?`) or generics are involved，会自动装箱。

```kt
val a: Int = 1000
val boxedA: Int? = a
val anotherBoxedA: Int? = a
print(boxedA === anotherBoxedA) // !!!Prints 'false'!!!
print(boxedA == anotherBoxedA)  // Prints 'true'
```

注：Kotlin 中的 `==` 和 `===` 更接近于 JS，而 Java 中是不存在 `===` 符号的。

#### 显式转换 Explicit Conversions

```kt
val a: Int? = 1   // 类型后带 ? 表示 nullable
val b: Long? = a  // 编译错误，与 Java 不同，Kotlin 不会自动向上转换
val b: Long? = a?.toLong()  // 显式转换，编译通过
```

number 类型支持以下转换方法： `toByte()` `toShort()` `toInt()` `toLong()` `toFloat()` `toDouble()` `toChar()`

Kotlin 对隐式转换的限制极少会被察觉，因为这种限制只会在可能出错的情况下出现，其他情况都是智能通过的：

```kt
val l = 1L + 3 // Long + Int => Long
```

#### 运算符 Operations

Kotlin 支持常规的算术运算符，但是不支持位运算符。`Int` 和 `Long` 类型支持位运算，但是运算符都统一成文字形式：

* `shl(bits)` – signed shift left (Java's <<)
* `shr(bits)` – signed shift right (Java's >>)
* `ushr(bits)` – unsigned shift right (Java's >>>)
* `and(bits)` – bitwise and
* `or(bits)` – bitwise or
* `xor(bits)` – bitwise xor
* `inv()` – bitwise inversion

#### 浮点型数值比较 Floating Point Numbers Comparison

(待补)

* `NaN` is considered equal to itself
* `NaN` is considered greater than any other element including `POSITIVE_INFINITY`
* `-0.0` is considered less than `0.0`

```kt
println(Float.NaN == Float.NaN)       // false
println(Float.NaN.equals(Float.NaN))  // true
```

### Characters

Kotlin 中 `Char` 不会被当成数值，`fun check(c: Char){ if (c == 1) { } }` 报错。转数字需使用 `c.toInt()`。

`Char` 字面量用单引号，如 `'1'`。装箱类型为 `Character`。

特殊字符加反斜杠，但仅支持 `\t` `\b` `\n` `\r` `\'` `\"` `\\` `\$`，其他特殊字符须使用 UNICode 表示法 `'\uFF00'`

```kt
val c1 = '0'; val c2 = 'a'; val c3 = '中'; val c4 = '\u2154'
```

### Booleans

`Boolean` 支持3种运算符 `||` lazy disjunction, `&&` lazy conjunction, `!` negation

### Arrays

基本写法：
  - `val array: Array<String> = arrayOf(...)`

基本操作：
  - `print array[i]` 输出第 i 个成员
  - `array[i] = "Hello"` 给第 i 个成员赋值
  - `array.size` 数组的长度

基本类型的数组:
为了避免不必要的装箱和拆箱，基本类型的数组是定制的

|   Java   | Kotlin
|----------|------------
| int[]    | IntArray
| short[]  | ShortArray
| long[]   | LongArray
| float[]  | FloatArray
| double[] | DoubleArray
| char[]   | CharArray

```kt
class Array<T> private constructor() {
    val size: Int
    operator fun get(index: Int): T
    operator fun set(index: Int, value: T): Unit

    operator fun iterator(): Iterator<T>
    // ...
}
```

```kt
val arrayOfString: Array<String> = arrayOf("我", "是", "码农")
val arr = arrayOfNulls<String>(5); arr[1] = "1"  // [null, "1", null, null, null]
val asc = Array(5, { i -> (i * i).toString() })  // [0, 1, 4, 9, 16]

val arrayOfInt: IntArray = intArrayOf(1,3,5,7)  // 基本数据类型都有专用的经过优化的方法
val arrayOfChar: CharArray = charArrayOf('H','e','l','l','o','W','o','r','l','d')

val arrayOf书记: Array<市委书记> = arrayOf(市委书记("章"), 市委书记("赵"), 市委书记("黄"))

println(arrayOfInt.size)
for (int in arrayOfInt) { println(int) }

println(arrayOf书记[1])
arrayOf书记[1] = 市委书记("方")
println(arrayOf书记[1])

println(arrayOfChar.joinToString())
println(arrayOfInt.slice(1..2))
```

### Strings

`String` 类型是不可变的 immutable，字符串字面量采用一对 `"` 包裹。

##### 原始字符串 Raw String

```kt
val text = """
    |Tell me and I forget.
    |Teach me and I remember.
    |Involve me and I learn.
    |(Benjamin Franklin)
    """.trimMargin()
```

原始字符串采用一对 `"""` 包裹，可以使用 `trimMargin()` 方法去除前缀的空白，默认用 `|` 标示 margin，也可自定义，如 `.trimMargin(">")`。

原始字符串不支持 `\` 转义，`\` 被认为是普通字符，没有转义功能。

##### 字符串模板 String Templates

```kt
val s = "abc"
val str = "$s.length is ${s.length}" // evaluates to "abc.length is 3"
```

原始字符串中也支持字符串模板，因为在原始字符串中不支持转义，所以想输出 `$` 字面量，必须这样 `${'$'}`。


## Packages and Imports

### Packages

包即命名空间，可以在首行声明，声明之后，文件内的所有内容都处于该命名空间下，如果一个文件没有指定包，则所有内容都属于 default 包，默认包没有名字。

```kt
package com.demo.市委书记.北京
import com.demo.市委书记.上海.市委书记 as 茶水大王

fun main(args: Array<String>) {
    val 北京市市委书记: 市委书记 = 市委书记("张")
    val 上海市市委书记: 茶水大王 = 茶水大王("李")
    val 天津市市委书记 = com.demo.市委书记.天津.市委书记("赵")
}
```

注：命名空间一般都与路径对应，虽然不是强制的，但命名空间与实际路径不一致容易导致混乱。

### Default Imports

每个 .kt 文件默认会导入以下包：

* [kotlin.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/index.html)
* [kotlin.annotation.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.annotation/index.html)
* [kotlin.collections.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/index.html)
* [kotlin.comparisons.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.comparisons/index.html) (since 1.1)
* [kotlin.io.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.io/index.html)
* [kotlin.ranges.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.ranges/index.html)
* [kotlin.sequences.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/index.html)
* [kotlin.text.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/index.html)

另外，根据平台不同，还会导入以下包：

* JVM:
  - java.lang.*
  - [kotlin.jvm.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.jvm/index.html)
* JS:
  - [kotlin.js.*](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.js/index.html)

### Imports

```kt
import foo.Bar // Bar is now accessible without qualification
import foo.* // everything in 'foo' becomes accessible
import bar.Bar as bBar // bBar stands for 'bar.Bar'
```

注：Kotlin 中没有 Java 中的 `import static` 句法。


## Control Flow

### If Expression

Kotlin 中存在 if 表达式，所以没有 `?:` 三元操作符。

```kt
// As expression 
val max = if (a > b) a else b
val max = if (a > b) {
    print("Choose a")
    a  // 采用块形式时，最后一个表达式的值为块的值
} else {
    print("Choose b")
    b
}
```

if 语句可以没有 `else`，但 if 表达式必须符合格式 `if ... else ...`。

### When Expression

Kotlin 采用 when 替换了 C-like 语言中的 switch case 结构。

when 跟 if 一样，存在 表达式 expression 和 语句 statement 两种用法。

`else` 是强制的，不可省略，除非编译器能确认 case 集合覆盖了所有可能情况。

```kt
when (x) {
    1 -> print("x == 1")
    2 -> print("x == 2")
    3, 4 -> print("x is either 3 or 4")
    parseInt(s) -> print("s encodes x")
    else -> { // Note the block
        print("fallback")
    }
}

when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
}

fun hasPrefix(x: Any) = when(x) {
    is String -> x.startsWith("prefix")
    else -> false
}

when {
    x.isOdd() -> print("x is odd")
    x.isEven() -> print("x is even")
    else -> print("x is funny")
}
```

### For Loops

```kt
for (item in collection) print(item)
for (i in array.indices) { print(array[i]) }
for ((index, value) in array.withIndex()) { println("the element at $index is $value") }  // 用到了解构赋值
  // for (entity in array.withIndex()) { println("the element at ${entity.index} is ${entity.value}") }
```

### While Loops

`while` 和 `do...while` 跟Java的用法完全一样。

```kt
while (i > 0) println(i--)

do {
    val y = retrieveData()
} while (y != null) // y is visible here!
```


## Returns and Jumps

Kotlin 中有3个跳转表达式：`return` `break` `continue`

### Break and Continue Labels

```kt
loop@ for (i in 1..100) {
    for (j in 1..100) {
        if (...) break@loop
    }
}
```

### Return at Labels

lambda 表达式

```kt
fun foo() {
    ints.forEach lit@ { if (it == 0) return@lit; print(it) }
}

// 也可以是使用 implicit label 的形式
fun foo() {
    ints.forEach { if (it == 0) return@forEach; print(it) }
}
```


