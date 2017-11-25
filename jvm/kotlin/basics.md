# Basics

https://kotlinlang.org/docs/reference/basic-types.html

## Basic Type

Kotlin 中一切皆对象，Kotlin 中的任何变量都可以直接调用其属性和方法。numbers, characters, booleans, arrays, and strings 这些个原始值类型在调用属性和方法时会自动装箱。

### Numbers

| Type   |  Bit width | Literal Constants            | 
|--------|------------|------------------------------|-------------------------------------
| Double | 64         | `123.5` `123.5e10`           | 
| Float  | 32         | `123.5f`                     | 
| Long   | 64         | `123L` `1_000_000` `0xFF_EC` | 
| Int    | 32         | `123` `0x0f` `0b00001011`    | 支持10 16 2进制，不支持8进制表示法
| Short  | 16         | `0b11010010_01101001`        | 
| Byte   | 8          | `0b11010010`                 ||

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
val a: Int? = 1
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

#### Floating Point Numbers Comparison

(待补)

* `NaN` is considered equal to itself
* `NaN` is considered greater than any other element including `POSITIVE_INFINITY`
* `-0.0` is considered less than `0.0`

### Characters

Kotlin 中 `Char` 不会被当成数值，`fun check(c: Char){ if (c == 1) { } }` 报错。转数字需使用 `c.toInt()`。

Char 字面量用单引号，如 `'1'`。

特殊字符加反斜杠，但仅支持 `\t` `\b` `\n` `\r` `\'` `\"` `\\` `\$`，其他特殊字符须使用 UNICode 表示法 `'\uFF00'`

### Booleans

`Boolean` 支持3种运算符 `||` lazy disjunction, `&&` lazy conjunction, `!` negation

### Arrays

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
val arrayOfNulls() 
val asc = Array(5, { i -> (i * i).toString() })  // [0, 1, 4, 9, 16]

val arrayOfInt: IntArray = intArrayOf(1,3,5,7)
val arrayOfChar: CharArray = charArrayOf('H', 'e','l','l','o','W','o','r','l','d')
val arrayOfString: Array<String> = arrayOf("我", "是", "码农")
val arrayOf书记: Array<市委书记> = arrayOf(市委书记("章"), 市委书记("赵"), 市委书记("黄"))

println(arrayOfInt.size)
for(int in arrayOfInt){ println(int) }

println(arrayOf书记[1])
arrayOf书记[1] = 市委书记("方")
println(arrayOf书记[1])

println(arrayOfChar.joinToString())
println(arrayOfInt.slice(1..2))
```

### Strings

`String` 类型是不可变的 immutable，字符串字面量采用 `"` 包裹。

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

原始字符串不支持 `\` 转义，`\` 被认为是不同的字符，没有转义功能。

##### 字符串模板 String Templates

```kt
val s = "abc"
val str = "$s.length is ${s.length}" // evaluates to "abc.length is 3"
```

原始字符串中也支持字符串模板，因为在原始字符串中不支持转义，所以想输出 `$` 字面量，必须这样 `${'$'}`。


## Packages and Imports

### Packages

```kt
package foo.bar
fun baz() { }  // 完整名称 foo.bar.baz
```

包即命名空间，可以在首行声明，声明之后，文件内的所有内容都处于该命名空间下，如果一个文件没有指定包，则所有内容都属于 default 包，默认包没有名字。

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

(待补充)

```kt
for (item in collection) print(item)

for (i in array.indices) { print(array[i]) }

for ((index, value) in array.withIndex()) { println("the element at $index is $value") }
```

### While Loops

`while` 和 `do...while` 还是老用法，没啥变化。

```kt
while (x > 0) {
    x--
}

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
    ints.forEach lit@ {
        if (it == 0) return@lit
        print(it)
    }
}

// 也可以是使用 implicit label 的形式
fun foo() {
    ints.forEach {
        if (it == 0) return@forEach
        print(it)
    }
}
```


