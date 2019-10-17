# 浏览器的 JavaScript 执行机制

## 执行上下文

只有理解了 JavaScrip 的执行上下文，你才能更好地理解 JavaScript 语言本身，比如变量提升、作用域和闭包等。不仅如此，理解执行上下文和调用栈的概念还能助你成为一名更合格的前端开发者。

```js
showName()
console.log(myName)
var myName = 0
var myName = 'Gavin'
console.log(myAge)
function showName () {
  console.log('showName 被执行')
}

// showName 被执行
// undefined
// ReferenceError: myAge is not defined
```

从上面的试验可以得出一下三个结论：
* 若执行过程中使用了未声明的变量，那么 JS 执行报错
* 在一个变量定义之前使用它，不会报错，但变量的值为 undefined 而不是定义时的值
* 在一个函数定义之前使用它，不会出错，且函数能正确执行
* 重复声明相同变量不会报错，重复声明函数以最后声明的为准

### 变量提升

```js
// JS 中的声明与赋值
var myName = 'Gavin'  // 这段代码可以看成是下面两行代码组成的

var myName            // 声明部分
myName = 'Gavin'      // 赋值部分

// 这是一个完整的函数声明，不包含赋值部分
function foo () {
  console.log('foo')
}
// 这里则包含了声明和赋值两部分
var bar = function () {
  console.log('bar')
}
```

所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的行为。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。

### JavaScript 代码的执行流程

从概念的字面意义上来看，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，正如我们所模拟的那样。但，这并不准确。*实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中*。一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段。

![](images/browser/js.png)

从上图可以看出，输入一段代码，经过编译后，会生成两部分内容：**执行上下文(Execution context)** 和 **可执行代码**。*执行上下文是 JavaScript 执行一段代码时的运行环境*，比如调用一个函数，就会进入这个函数的执行上下文，确定该函数在执行期间用到的诸如 this、变量、对象以及函数等。

#### 编译阶段

碰到 `var` 声明的变量，JS 引擎将在环境对象中创建一个属性，并使用 `undefined` 对其进行初始化。  
碰到直接使用 `function` 声明的函数，会将函数定义存储到 堆(HEAP) 中，然后在环境对象中创建一个属性，该属性值指向堆中函数的位置。  
生成 **变量环境对象** 后，JS 引擎会把声明以外的代码编译为 *字节码*。

#### 执行阶段

编译完成就有了执行上下文和可执行代码了，那么接下来就到了执行阶段了。JS 引擎会按照顺序一行一行地执行。


## 调用栈

* 每调用一个函数，JavaScript 引擎会为其创建执行上下文，并把该执行上下文压入调用栈，然后 JavaScript 引擎开始执行函数代码。
* 如果在一个函数 A 中调用了另外一个函数 B，那么 JavaScript 引擎会为 B 函数创建执行上下文，并将 B 函数的执行上下文压入栈顶。
* 当前函数执行完毕后，JavaScript 引擎会将该函数的执行上下文弹出栈。
* 当分配的调用栈空间被占满时，会引发“堆栈溢出”问题。

栈是一种非常重要的数据结构，不光应用在 JavaScript 语言中，其他的编程语言，如 C/C++、Java、Python 等语言，在执行过程中也都使用了栈来管理函数之间的调用关系。所以栈是非常基础且重要的知识点，你必须得掌握。

调用栈有两个指标，最大栈容量和最大调用深度，满足其中任意一个就会栈溢出，不过具体多大和多深，这个要自己测下。


## 块级作用域

<p>在 ES6 之前，ES 的作用域只有两种：全局作用域和函数作用域。</p>
<ul>
<li><strong>全局作用域</strong>中的对象在代码中的任何地方都能访问，其生命周期伴随着页面的生命周期。</li>
<li><strong>函数作用域</strong>就是在函数内部定义的变量或者函数，并且定义的变量或者函数只能在函数内部被访问。函数执行结束之后，函数内部定义的变量会被销毁。</li>
</ul>

<p>在 ES6 之前，JavaScript 只支持这两种作用域，相较而言，其他语言则都普遍支持<strong>块级作用域</strong>。块级作用域就是使用一对大括号包裹的一段代码，比如函数、判断语句、循环语句，甚至单独的一个{}都可以被看作是一个块级作用域。</p>

```js
var myname = " 极客时间 "
function showName(){
  console.log(myname);
  if(0){
   var myname = " 极客邦 "
  }
  console.log(myname);
}
showName()
// undefined
// undefined
```

<img src="images/browser/variable-scope.png" width="571">

<p>由于 JavaScript 的变量提升存在着变量覆盖、变量污染等设计缺陷，所以 ES6 引入了块级作用域关键字来解决这些问题。</p>

<p>之后我们还通过对变量环境和词法环境的介绍，分析了 JavaScript 引擎是如何同时支持变量提升和块级作用域的。</p>

```js
let myname= '极客时间'
{
  console.log(myname) 
  let myname= '极客邦'
}
// VM6277:3 Uncaught ReferenceError: Cannot access 'myname' before initialization
// 在块作用域内，let声明的变量被提升，但变量只是创建被提升，初始化并没有被提升，在初始化之前使用变量，就会形成一个暂时性死区。
```

【拓展】
var的创建和初始化被提升，赋值不会被提升。
let的创建被提升，初始化和赋值不会被提升。
function的创建、初始化和赋值均会被提升。


## 作用域链和闭包

![](images/browser/scope-chain.png)

**词法作用域**就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。
词法作用域是代码阶段就决定好的，和函数是怎么调用的没有关系。


### 闭包

<img src="images/browser/closure-1.png" width="230">
<img src="images/browser/closure-2.png" width="230">
<img src="images/browser/closure-3.png" width="230">
<img src="images/browser/closure-4.png" width="230">

从上图可以看出，foo 函数执行完成之后，其执行上下文从栈顶弹出了(这部分内容在 V8 GC 中讲)，但是由于返回的 setName 和 getName 方法中使用了 foo 函数内部的变量 myName 和 test1，所以这两个变量依然保存在内存中。这像极了 setName 和 getName 方法背的一个 *专属背包*，无论在哪里调用了 setName 和 getName 方法，它们都会背着这个 foo 函数的专属背包。

#### 闭包是怎么回收

如果引用闭包的函数是个局部变量，等函数销毁后，在下次 JavaScript 引擎执行垃圾回收时，判断闭包这块内容如果已经不再被使用了，那么 JavaScript 引擎的垃圾回收器就会回收这块内存。


## this

<ol>
<li>当函数作为对象的方法调用时，函数中的 this 就是该对象；</li>
<li>当函数被正常调用时，在严格模式下，this 值是 undefined，非严格模式下 this 指向的是全局对象 window；</li>
<li>嵌套函数中的 this 不会继承外层函数的 this 值。</li>
</ol>


<p>执行这段代码，你会发现它也输出了我们想要的结果，也就是箭头函数 bar 里面的 this 是指向 myObj 对象的。这是因为 ES6 中的箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。</p>