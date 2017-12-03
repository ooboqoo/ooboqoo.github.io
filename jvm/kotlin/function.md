# Functions and Lambdas

## Functions

### Function Declarations

Kotlin中函数使用 `fun` 关键字声明 `fun double(x: Int): Int { return 2 * x }`。

### Function Usage

普通函数的调用方法 `println("hello")`。

成员函数即方法的调用方法 `Sample().foo()`。

函数参数定义采用 Pascal notation，如 `name: type`，多个参数采用 `,` 分隔。

函数参数可以设置一个默认值，如 `count: Int = 0`，这样可以减少重载的使用。  
覆写带默认值的方法时，不允许重新设置默认值。  
带默认值的参数最好出现在最后，如果出现在其他参数之前，则每次调用时，传参必须指定参数名。当最后一个参数是lanmbda函数，且放到 `()` 后面传递时，则不受此约束。

```kt
open class A {
    open fun foo(i: Int = 10) { ... }
}
class B : A() {
    override fun foo(i: Int) { ... }  // no default value allowed
}

fun foo(bar: Int = 0, baz: Int = 1, qux: () -> Unit) { /* ... */ }
foo(1) { println("hello") } // Uses the default value baz = 1 
```

当一个函数没有任何返回值时，返回类型时 `Unit`，此时可以不用注明返回类型。

当函数体只与一个表达式时，`{}` 可省略，取而代之的是直接用 `=`， 如 `fun double(x: Int) = x * 2`

当函数返回类型不是 `Unit` 时，必须显式声明，Kotlin禁用了此情况下的自动类型推断，目的是使代码更易读。

函数的参数(往往是最后一个参数)，可以采用 `vararg` 修饰符，如此一来，就可以传递变长参数了。

传递参数时，支持 spread 运算符 `*`，如 `val list = asList(-1, 0, arrayOf(1, 2, 3), 4)`

当满足以下条件时，函数可用中缀符 infix notation 的形式来调用：
  * 是 member function 或 extension function
  * 有且只有一个参数
  * 使用 `infix` 关键字声明

```kt
infix fun Int.myadd(x: Int) = this + x
val a = 1 myadd 2
val b = 3.myadd(4)
```

### Function Scope

Kotlin中支持直接在文件内顶层声明函数，这点与 Java C# Scala 是不同的。另外，函数还可以作为 local、member function、extension function 存在。

### Generic Functions

函数支持泛型参数，使用 `<>` 在函数名之前定义，具体参见泛型相关介绍。

```kt
fun <T> singletonList(item: T): List<T> {
    // ...
}
```

### Tail recursive functions

Kotlin支持尾递归优化，当递归符合尾递归情形时，通过 `tailrec` 关键字告诉编译期将尾递归转换成循环的形式，这样既保证的代码的易读性，又避免了堆栈溢出的风险。

```kt
// 递归版本
tailrec fun findFixPoint(x: Double = 1.0): Double
        = if (x == Math.cos(x)) x else findFixPoint(Math.cos(x))

// 转换成循环版本
private fun findFixPoint(): Double {
    var x = 1.0
    while (true) {
        val y = Math.cos(x)
        if (x == y) return x
        x = y
    }
}
```


## Lambdas

### Higher-Order Functions

高阶函数是 以函数为参数或者返回新函数 的函数。

```kt
fun <T> lock(lock: Lock, body: () -> T): T {
    lock.lock()
    try { return body() }
    finally { lock.unlock() }
}
```

### Lambda Expressions and Anonymous Functions

一个lambda表达式 lambda expression 或匿名函数 anonymous function 是一个函数字面量 function literal。

```kt
max(strings, { a, b -> a.length < b.length })                     // lambda 表达式版本
fun compare(a: String, b: String): Boolean = a.length < b.length  // 普通函数版本
```

#### Function Types

当一个函数作为参数传递给其他函数时，我们须指明函数类型，如上面的 max 的声明

```kt
fun <T> max(collection: Collection<T>, less: (T, T) -> Boolean): T? {
    var max: T? = null
    for (it in collection)
        if (max == null || less(max, it))
            max = it
    return max
}
```

函数类型的几种写法：

```kt
val compare: (T, T) -> Int { /* */ }        // 常见写法
val compare: (x: T, y: T) -> Int { /* */ }  // 带参数名的写法
var sum: ((Int, Int) -> Int)? = null        // 可 null 型的写法 `(函数类型)?`
```

#### Lambda Expression Syntax

* 始终由一对 `{}` 包裹
* 完整的参数定义格式 `name: type, name: type`，外面没有括号，类型可不写
* 参数和body以 `->` 分隔，如果没有参数，则 `->` 可省略，只剩 body
* 如果只有一个参数，则可以省去参数部分，直接在 lambda body 中使用 `it` 来指代参数
* 如果表达式的返回值非 `Unit` 则最后一个表达式的值作为整个 lambda 表达式的返回值
* 表达式体中，也可以使用 qualified return，即 `return@someFunc` 显式声明返回值，注意与 `return` 的区别
* 如果表达式是函数的最后一个参数，则表达式可以单独放到 `()` 后面

```kt
fun foo() {
    ints.forEach {
        if (it == 0) return@forEach  // return@forEach 跳出表达式，return 则跳出 foo
        print(it)
    }
}
```

#### Anonymous Functions

lambda 表达式无法指明返回值类型，多数时候这是不需要的，但真的需要显式声明，则可以用匿名函数。

```kt
fun(x: Int, y: Int): Int = x + y

ints.filter(fun(item) = item > 0)  // 使用匿名函数替代 lambda 表达式
```

匿名函数与lambda表达式之间的主要区别是
  * 匿名函数只能放在调用函数的 `()` 内传递，而无法像lambda表达式那样单独提出来放到 `()` 后面
  * 匿名函数中的 `return` 会如预期工作，而lambda则需要采用 `return@func` 的形式来控制跳出层级

#### Closures

闭包，跟JS一个用法，不多说。

#### Function Literals with Receiver

这种用法跟 extention function 的用法有点类似，...

```kt
val sum = fun Int.(other: Int): Int = this + other
1.sum(2)
```

当可以从上下文中推断出 receiver type 时，lambda表达式也支持这种用法：

```kt
class HTML {
    fun body() { ... }
}

fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()  // create the receiver object
    html.init()        // pass the receiver object to the lambda
    return html
}


html {       // lambda with receiver begins here
    body()   // calling a method on the receiver object
}
```

## Inline Functions

使用 inline function 可能会使编译后的代码量增大，但只要合理使用，相比获得的性能优势，还是非常值得的。

```kt
inline fun <T> lock(lock: Lock, body: () -> T): T {
    // ...
}

lock(l) { foo() }  // 会编译成以下代码

l.lock()
try {
    foo()
}
finally {
    l.unlock()
}
```

未完待续...


## Coroutines

https://www.zhihu.com/question/20511233






