# 严格模式

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode  

ES5 最早引入了 "严格模式" 的概念。通过严格模式，可以在函数内部选择进行较为严格的全局或局部的错误条件检测。使用严格模式的好处是可以提早知道代码中存在的错误，及时捕获一些可能导致编程错误的行为。

ES6 类和模块的内部，只有默认的严格模式可用。未来的代码都将运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

## 概述

### 10.2.1 Strict Mode Code

An ECMAScript Script syntactic unit may be processed using either unrestricted or strict mode syntax and semantics. Code is interpreted as strict mode code in the following situations:

* 当首行进行了 `'use strict';` 声明，全局所有代码都处于严格模式
* Module 模块内部始终处于严格模式，无需声明
* Class 类定义内部始终处于严格模式
* Eval 内的代码以 `"use strict";` 开头，或者 eval() 函数本身处于严格模式环境内，代码以严格模式执行
* 函数内部代码，如果处于全局严格模式内部，或者首行使用了 `'use strict';` 声明，则处于严格模式
* 向 Function 构造函数传递的 body 以`"use strict";` 开头，函数以严格模式执行 

### 设计目的

设立 "严格模式" 的目的，主要有以下几个。

* 增加更多报错的场合，消除代码运行的一些不安全之处。
* 明确禁止一些不合理、不严谨的语法，提高编译器效率，增加运行速度。
* 禁止一些未来版本可能更新的功能，提供一种过渡机制。

"严格模式" 体现了 JavaScript 更合理、更安全、更严谨的发展方向

### 声明严格模式

使用编译指示 `"use strict";` 来声明严格模式。

严格模式可以应用到全局或函数中，不支持单独设置代码块的模式。

`eval()` `Function()` `setTimeout()` 中传入的字符串中支持设定严格模式。

需要注意的是：
  * 声明严格模式须将 `"use strict"` 放在脚本文件的第一行，否则无效。(前面可以有空白行或注释)
  * 同样的，要给某个函数开启严格模式，得把 `'use strict'` 声明放在函数体所有语句之前
  * 合并全局严格模式代码和非严格模式代码时，会导致严格模式失效或者把非严格模式的代码也改成严格模式


## 具体变更项

### 报错 Converting mistakes into errors

1. 严格模式下不会意外创建全局变量，所有变量必须显式声明后才能使用，否则报错;
    * 发现使用 `typeof notexitvar` 不会报错，而 `!notexistvar` 报错，而 `!window.notexitvar` 正常
2. 严格模式下任何在正常模式下引起静默失败的赋值操作都会抛出异常，如修改只读属性;
3. 在严格模式下, 试图删除不可删除的属性时会抛出异常(之前这种操作不会产生任何效果);
4. 在严格模式下使用字面量定义对象时，属性名不能重复，重名属性被认为是语法错误;
5. 严格模式要求函数的参数名唯一，重名参数被认为是语法错误;
6. 严格模式也去掉了八进制字面量，以 `0` 开头的数值会被认为是十进制的。(ES6 又添加了八进制字面量，但改成了 `0o` 开头)
7. `delete` 操作符只能被用来删除属性，删除变量会报错，普通模式下只是静默失败(返回 false)。

```js
function sum(num, num) {}  // 严格模式下，重名参数会抛出错误
                           // 非严格模式下通过参数名只能访问第二个参数，要访问第一个参数必须通过 arguments 对象
```

### 变量 Simplifying variable uses

* 禁用 `with`。`with` 的使用，导致到运行时才能最终确定一个 标识名 的具体所指，并且还要区分是对象的属性名 还是 变量名，这导致很难做优化且执行效率低下。禁用后，可以通过将变量赋值给一个简短的变量再进行后续操作，也很方便。
* 严格模式下的 `eval` 不会给上下文引入新变量。

```js
eval("var x = 10");
alert(x);  // 严格模式下会抛出 ReferenceError，非严格模式下显示 10
```

### Making eval and arguments simpler

1. 禁止使用 `eval` 和 `arguments` 作为标识符。
2. 形参名与 arguments 之间联系被切断，互不影响，而普通模式下，形参名只是 arguments 对应位置值的别名。
3. `argumets.callee` 属性被禁用

```js
'use strict';
var eval = 1, arguments = 2;  // SyntaxError: Unexpected eval or arguments in strict mode

(function f(a) {
  a = 1; arguments[0] = 2;         // 在普通模式下，a 只是 arguments[0] 的别名
  console.log([a, arguments[0]]);  // [1, 2]
})(8);
```

### 增强的安全措施 "Securing" JavaScript

现在很多网站运行用户输入代码来执行，这些代码可能会与其他用户共享，这样，增加安全性是非常紧要的事情。

1. 函数的 `this` 值始终是指定的值\对象\undefined，不会转换。普通模式下，原始值会被转换为对应对象，而 `null` 或 `undefined` 会转换为全局对象。用户输入代码(不安全代码)内部无法通过定义函数获取 window 对象信息。
2. 禁止通过 `foo.caller` `foo.arguments` 读到调用栈上其他函数的信息。
3. `auguments.caller` 的存在严重影响安全性和性能优化，已经被废弃。

```js
var str = 'console.log(this, window);' +                      // 输出 undefined undefined
          '(function () { console.log(this, window); })();';  // 输出 undefined undefined
    foo = Function('window', '"use strict";' + str);
foo();                                                        // 注入代码无法获取 window 对象信息

'use strict';
function fun() { return this; }
fun() === undefined;        // 普通模式 window
fun.call(2) === 2;          // 普通模式 Number 对象
fun.apply(null) === null;   // 普通模式 window
fun.bind(true)() === true;  // 普通模式 Boolean 对象
```

### 向未来版本过渡 Paving the way for future ECMAScript versions

ES6 会引入 "块级作用域"，为了与新版本接轨，严格模式只允许在全局作用域或函数作用域声明函数。也就是说，在 if 等语句内部声明函数会导致语法错误。

ES5 严格模式新增了一些保留字：implements, interface, let, package, private, protected, public, static, yield。
