# 7 函数

## 7.1 递归

## 7.2 闭包（closure）

<div>
<p><strong>闭包的使用场合：</strong>需要一个全局变量，但这个全局变量只能通过一个函数调用。如果定义一个全局变量，那么，其他任何函数都可以改变这个全局变量的值；如果使用内部变量，函数运行完后，变量值无法保留；采用闭包技术，将一个变量隐藏到一个函数内部，再通过该函数的子函数来操作该变量，任务达成。</p>


<h2>Self-Invoking Functions</h2>
<p>Function expressions can be made "self-invoking".</p>
<p>A self-invoking expression is invoked (started) automatically, without being called.</p>
<p>Function expressions will execute automatically if the expression is followed by ().</p>
<p>You cannot self-invoke a function declaration. You have to add parentheses around the function to indicate that it is a function expression:</p>
<pre>
(function () {
    var x = "Hello!!";      // I will invoke myself
})();
</pre>
<p>The function above is actually an anonymous self-invoking function (function without name).</p>

<h2>JavaScript Closures</h2>
<p>Remember self-invoking functions? What does this function do?</p>
<pre>
var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

add();
add();
add();
// the counter is now 3 
</pre>
<p>The variable <strong>add</strong> is assigned the return value of a self-invoking 
function.</p>
<p>The self-invoking function only runs once. It sets the counter to zero (0), 
and returns a function expression.</p>
<p>This way add becomes a function. The "wonderful" part is that it can access 
the counter in the parent scope. </p>
<p>This is called a JavaScript <strong>closure.</strong> It makes it possible 
for a function to have "<strong>private</strong>" variables.</p>
<p>The counter is protected by the scope of the anonymous function, 
and can only be changed using the add function.</p>
</div>


## 7.3 模仿块级作用域

## 7.4 私有变量

## 7.5 小结



<div>
<p>在JavaScript编程中，函数表达式是一种非常有用的技术。使用函数表达式可以无须对函数命名，从而实现动态编程。匿名函数，也称为拉姆达函数，是一种使用JavaScript函数的强大方式。以下总结了函数表达式的特点：</p>
<ul>
<li>函数表达式不同于函数声明。函数声明要求有名字，但函数表达式不需要。没有名字的函数表达式也叫作匿名函数。</li>
<li>在无法确定如何引用函数的情况下，递归函数就会变得比较复杂；</li>
<li>递归函数应该始终使用 arguments.callee 来递归调用自身，不要使用函数名——函数名可能会发生变化。</li>
</ul>

<P>当在函数内部定义了其他函数时，就创建了闭包。闭包有权访问包含函数内部的所有变量，原理如下：</P>
<ul>
<li>在后台执行环境中，闭包的作用域链包含着它自己的作用域、包含函数的作用域 和 全局作用域；</li>
<li>通常，函数的作用域及其所有变量都会在函数执行结束后销毁；但是，当函数返回了一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。</li>
</ul>

<p>使用闭包可以在JS中模仿块级作用域，要点如下</p>
<ul>
<li>创建并立即调用一个函数，这样既可以执行其中的代码，又不会在内存中留下对该函数的引用；</li>
<li>结果就是函数内部的所有变量都会被立即销毁——除非将某些变量赋值给了包含作用域（即外部作用域）中的变量。</li>
</ul>

<p>闭包还可以用于在对象中创建私有变量，相关概念和要点如下</p>
<ul>
<li>即使JS中没有正式的私有对象属性的概念，但可以使用闭包来实现公有方法，而通过公有方法可以访问在包含作用域中定义的变量。</li>
<li>有权访问私有变量的公有方法叫做特权方法。</li>
<li>可以使用构造函数模式、原型模式来实现自定义类型的特权方法，也可以使用模块模式、增强的模块模式来实现单例的特权方法。</li>
</ul>
<p>JS中的函数表达式和闭包都有极其有用的特性，利用他们可以实现很多功能。不过，因为创建闭包必须维护额外的作用域，所以过度使用它们可能会占用大量内存。</p>

</div>

<h1>JavaScript 闭包</h1>
<div>
<p>简单地说，<b>闭包（closure）</b>是一个函数在<b>创建</b>时允许该函数访问并操作该函数之外的变量时所创建的<b>作用域</b>。闭包不仅包含函数声明，还包含了函数声明的那一时刻点上该作用域中的所有变量。闭包相当于一个“安全气泡”，这个气泡包含了函数及其变量，即函数执行操作所需的所有资源。</p>
</div>
<div>
<h2>A.1 创建内部函数</h2>
<p>许多传统的编程语言（例如C），都会把全部函数集中在顶级作用域中。而支持内部函数的语言，则允许开发者在必要的地方集合小型实用函数，以避免污染命名空间。</p>
<p>所谓内部函数，就是定义在另一个函数中的函数。内部函数特别适合于小型、单用途的函数。例如，递归但却带有非递归API包装的算法通常最适合通过内部函数来表达。</p>

<h3>A.1.1 在任何地方调用内部函数</h3>
JavaScript 允许开发人员像传递任何类型的数据一样传递函数。也就是说，JavaScript中的内部函数能够逃脱定义它们的外部函数。逃脱的方式有很多种。例如，可以将内部函数指定给一个全局变量：
<pre class="js">
var globalVar;
function outerFn() {
  console.log('Outer function');
  function innerFn() { console.log('Inner function'); }
  <code>globalVar = innerFn;</code>
}
outerFn();  // 输出 Outer functio' 并将 innerFn 传递给 globalVar
globalVar();  // 输出 Inner function
</pre>
<p>另外，也可以通过在父函数中返回值来“营救出”内部函数的引用：</p>
<pre class="js">
function outerFn() {
  console.log('Outer function');
  function innerFn() { console.log('Inner function'); }
  <code>return innerFn;</code>
}
var fnRef = outerFn();
fnRef();
</pre>

<h3>A.1.2 理解变量作用域</h3>
<p>内部函数可以拥有自己的变量，只不过这些变量都被限制在内部函数的作用域中。每当通过引用或其他方式调用这个内部函数时，都会创建一个新的 innerVar 变量。</p>
<p>内部函数可以像其他函数一样引用全局变量。</p>
<p>但是，如果这个变量是父函数的局部变量又会怎样呢？因为内部函数会继承父函数的作用域，所以内部函数也可以引用这个变量：</p>
<pre class="js">
function outerFn() {
  <code>var outerVar</code> = 0;
  function innerFn() {
    outerVar++;
    console.log('outerVar = ' + outerVar);
  }
  <code>return innerFn;</code>
}
var fnRef = outerFn();
fnRef();  // outerVar = 1
fnRef();  // outerVar = 2
var fnRef2 = outerFn();
fnRef2();  // outerVar = 1
fnRef2();  // outerVar = 2
</pre>
<p>通过每个引用调用 innerFn() 都会独立地递增outerVar 。也就是说，第二次调用 outerFn() 没有继续沿用 outerVar 的值，而是在<b>第二次函数调用的作用域中创建并绑定了一个新的 outerVar 的实例</b>。结果，就造成了在上面的代码中调用两次 fnRef() 之后，再调用 fnRef2() 会输出1。这两个计数器完全是无关的。
</p>
<p>当内部函数在定义它的作用域的外部被引用时，就创建了该内部函数的一个闭包。在这种情况下，我们称既不是内部函数局部变量，也不是其参数的变量为自由变量，称外部函数的调用环境为封闭闭包的环境。从本质上讲，如果内部函数引用了位于外部函数中的变量，相当于授权该变量能够被延迟使用。因此，<b>当外部函数调用完成后，这些变量的内存不会被释放，因为闭包仍然需要使用它们</b>。</p>
</div>

<div>
<h2>A.2 处理闭包之间的交互</h2>
<pre class="js">
function outerFn() {
  var outerVar = 0;
  function innerFn1() {
    outerVar++;
    console.log('(1) outerVar = ' + outerVar);
  }
  function innerFn2() {
    outerVar += 2;  
    console.log('(2) outerVar = ' + outerVar);
  }
  return {'fn1': innerFn1, 'fn2': innerFn2};
}
var fnRef = outerFn();
fnRef.fn1();  // outerVar = 1
fnRef.fn2();  // outerVar = 3
fnRef.fn1();  // outerVar = 4
var fnRef2 = outerFn();
fnRef2.fn1();  // outerVar = 1
fnRef2.fn2();  // outerVar = 3
fnRef2.fn1();  // outerVar = 4
</pre>
<p>这里，<b>我们通过对象返回两个内部函数的引用</b>（这也示范了内部函数的引用逃脱父函数的另一种方式）。可以通过返回的引用调用任何一个内部函数。这两个内部函数引用了同一个局部变量，因此它们共享同一个封闭环境。当 innerFn1() 为outerVar 递增1时，就为调用 innerFn2() 设置了 outerVar 的新的起点值，反之亦然。同样，我们也看到对 outerFn() 的后续调用还会创建这些闭包的新实例，同时也会创建相应的新封闭环境。面向对象编程的爱好者们会注意到，<code>这在本质上是创建了一个新对象，自由变量就是这个对象的实例变量，而闭包就是这个对象的实例方法</code>。而且，这些变量也是私有的，因为不能在封装它们的作用域外部直接引用这些变量，从而确保了面向对象的数据专有特性。</p>
<p class="tip"><span>提示：</span><code>这里的外部函数，其实完全可以看成是工厂函数，或者说是专门负责定义闭包的工厂函数。</code></p>
</div>

<div>
<h2>A.3 在jQuery中创建闭包</h2>

</div>

<div>
<h2>A.4 应对内存泄漏的风险</h2>
<p>JavaScript 是一门具有自动垃圾收集机制的编程语言，开发人员不必关心内存分配和回收问题。</p>
<p>“标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存；另一种不常用的垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数；当代码中存在循环引用现象时，“引用计数”算法就会导致问题；</p>

<h3>A.4.1 闭包中的引用循环</h3>
<pre class="js">
function outerFn() {
  var outerVar = {};
  function innerFn() { console.log('hello'); } // 闭包虽然没有引用变量，但仍然存在隐含引用
  outerVar.fn = innerFn;   // 变量显式地引用了闭包
  return innerFn;
};
</pre>
<p>即使 innerFn() 没有引用 outerVar ，outerVar 也仍然位于 innerFn() 的封闭环境中。由于闭包的原因，位于 outerFn() 中的所有变量都隐含地被 innerFn() 所引用。因此，闭包会使意外地创建这些引用循环变得易如反掌。</p>
<p>好在上述这些情况通常不是什么问题，因为JavaScript能够检测到这些情况并在它们孤立时将其清除。</p>

<h3>A.4.2 控制DOM与JavaScript的循环</h3>
<p>在IE8以之前版本中，虽然 JavaScript引擎是使用标记清除策略来实现的，但JavaScript访问的COM对象依然是基于引用计数策略的。换句话说，只要在IE中涉及COM对象，就会存在循环引用的问题。IE9把BOM和DOM对象都转成了真正的JavaScript对象，从而解决了循环引用问题。</p>
<p>当一个循环中同时包含 DOM 元素和常规 JavaScript 对象时，IE 无法释放任何一个对象——因为这两类对象是由不同的内存管理程序负责管理的。换句话说，除非关闭浏览器，否则这种循环在 IE 中永远得不到释放。为此，随着时间的推移，这可能会导致大量内存被无效地占用。导致这种循环的一个常见原因是简单的事件处理程序：</p>
<pre class="js">
$(document).ready(function() {
var button = document.getElementById('button-1');
button.onclick = function() {
console.log('hello');
return false;
};
});
</pre>
<p>当指定单击事件处理程序时，就创建了一个在其封闭的环境中包含 button 变量的闭包。而且，现在的 button 也包含一个指向闭包（ onclick 属性自身）的引用。这样，就导致了在 IE 中即使离开当前页面也不会释放这个循环。为了释放内存，就需要断开循环引用，例如在关闭窗口关删除 onclick 属性（此时必须注意不要在 window 及其 onunload 处理程序间引入新的循环）。另外，也可以像下面这样重写代码来避免这种闭包：</p>
<pre class="js">
function hello() {
console.log('hello');
return false;
}
$(document).ready(function() {
var button = document.getElementById('button-1');
button.onclick = hello;
});
</pre>
</div>

<div>
<h2>A.5 小结</h2>
<p>JavaScript闭包是一种强大的语言特性。通过使用这个语言特性来隐藏变量，可以避免覆盖其他地方使用的同名变量。由于jQuery经常依赖于把函数作为方法的参数，所以在编写jQuery代码时也会经常在不经意间创建闭包。理解闭包有助于编写出更有效也更简洁的代码，如果再加上一些小心并利用好jQuery内置的安全措施，则可以有效地防止闭包可能引发的内存泄漏问题。</p>
<p>因为 hello() 函数不再包含 button ，引用就成了单向的（从 button 到 hello ）、不存在的循环，所以就不会造成内存泄漏了。</p>
<h3>用jQuery化解引用循环</h3>
<p>下面，我们通过常规的jQuery结构来编写同样的代码：</p>
<pre class="js">
$(document).ready(function() {
  var $button = $('#button-1');
  $button.click(function(event) {
    event.preventDefault();
    console.log('hello');
  });
});
</pre>
<p>即使此时仍然会创建一个闭包，并且也会导致同前面一样的循环，但这里的代码却不会使 IE 发生内存泄漏。由于 jQuery 考虑到了内存泄漏的潜在危害，所以它会手动释放自己指定的所有事件处理程序。只要坚持使用 jQuery 的事件绑定方法，就无需为这种特定的常见原因导致的内存泄  漏而担心。</p>
<p>但是，这并不意味着我们完全脱离了险境。当对DOM元素进行其他操作时，仍然要处处留心。只要是将 JavaScript 对象指定给 DOM 元素，就可能在旧版本 IE 中导致内存泄漏。jQuery 只是有助于减少发生这种情况的可能性。</p>
<p>有鉴于此，jQuery为我们提供了另一个避免这种泄漏的工具。在第12章中我们曾看到过，使用 .data() 方法可以像使用扩展属性（expando）一样，将信息附加到DOM元素。由于这里的数据并非直接保存在扩展属性中（jQuery使用一个内部对象并通过它创建的ID来保存这里所说的数据），因此永远也不会构成引用循环，从而有效回避了内存泄漏问题。无论什么时候，当我们觉得扩展属性好像是一种方便的数据存储机制时，都应该首选 .data() 这种更安全可靠的替代方案。</p>
</div>

