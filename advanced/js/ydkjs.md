# YDKJS

## 作用域和闭包

### 作用域是什么

### 词法作用域

### 函数作用域和块作用域

立即执行函数的两种写法，功能一致

```js
(function IIFE () { })()
(function IIFE () { }())
```

try/catch 中的 catch 分句会创建一个块作用域

```js
try { undefined() } catch (err) {
  var a = 1         // 这个 a 在外部能被正常访问
  console.log(err)  // err 无法被外部访问
}
console.log(err)  // ReferenceError: err not found
```

### 提升

`var a = 2` 实际上可以看成两个表达式 `var a` + `a = 2`，前者在编译阶段执行，后者在执行阶段执行。这个过程就好像变量和函数声明被移动到了所在代码顶部，这个过程就叫作提升。只有声明本身会被提升，赋值或其他运行逻辑则还保留在原地。

```js
foo() // 1
var foo
function foo () { console.log(1) }
foo = function () { console.log(2) }
foo()  // 2
```

### 作用域闭包

闭包是基于词法作用域书写代码时所产生的自然结果。当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

```js
for (var i = 0; i < 6; i++) {
  setTimeout(function timer () {
    console.log(i)  // 6 6 6 6 6 6
  }, i * 1000)
}

for (let i = 0; i < 6; i++) {  // 闭包的块作用域！每次迭代都会声明一次变量
  setTimeout(() => { console.log(i) }, i * 1000 )  // 0 1 2 3 4 5
}
```

#### 模块

ES6 的模块没有 "行内" 格式，必须被定义在独立的文件中(一个文件一个模块)。模块文件中的内容会被当做好像包含在作用域闭包中一样来处理，就和前面介绍的函数闭包模块一样。

### 附录

动态作用域

我们对比了动态作用域和词法作用域模型，JavaScript 中的作用域就是词法作用域。实际上，动态作用域是 JavaScript 中另一个重要机制 this 的表亲。

this 词法

胖箭头函数不仅可以让我们少敲几下键盘，还放弃了原有的 this 绑定规则，取而代之的是用词法作用域覆盖了 this 本来的值。箭头函数另外一个特点是，只能是匿名的，无法做到具名。

注：胖箭头函数的 this 无法通过 bind() 修改。


## this 和对象原型

### 关于 this

### this 全面解析

### 对象

### 混合对象 "类"

### 原型

### 行为委托





