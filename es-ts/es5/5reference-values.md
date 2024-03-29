# 5 引用类型

## 引用类型

引用类型的值（对象）是引用类型的一个实例。在ES中，引用类型是一种数据结构，用于将数据和功能组织在一起。引用类型也被称为“对象定义”，逻辑上等价于其他程序设
计语言中的类。本章会讨论大量的 ECMAScript 预定义引用类型。

新对象是由 new 操作符后跟一个构造函数来创建的。构造函数本身就是一个函数，只不过该函数是出于创建新对象的目的而定义的。

<div>
<h2>5.1 Object 类型</h2>
<p>Object 是ES中使用最多的一个类型。虽然 Object 的实例不具备多少功能，但对于在应用程序中存储和传输数据而言，他们确实是非常理想的选择。</p>

<h4>创建对象</h4>
<p>创建 Object 的实例有两种方式：</p>
<ul>
<li>第一种是使用new操作符后跟 Object 构造函数（可以省略new操作符，效果相同）；</li>
<li>另一种方式是使用对象字面量表示法</li>
</ul>
<p>开发人员更青睐对象字面量语法，因为这种语法要求的代码量少，而且能够给人封装数据的感觉。实际上，对象字面量也是向函数传递大量可选参数的首选方式。</p>
<pre>
displayInfo(args){
  alert(args.name + args.age);
}
displayInfo({ name: "Nicholas", age: 29 });
</pre>
<p class="tip"><span>提示：</span>这种传递参数的模式最适合需要向函数传入大量可选参数的情形。一般来讲，形参虽然容易处理，但在有多个可选参数的情况下就会显示不够灵活。<strong>最好的做法是对那些必须值使用形参，而使用对象字面量来封装多个可选参数。</strong></p>

<h4>访问属性</h4>
<p>一般来说，访问对象属性时使用的是点表示法，这也是很多面向对象语言的通用语法。不过，在JS中也可以使用方括号表示法来访问对象的属性。方括号语法的主要优点是可以通过变量来访问属性。如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以使用方括号表示法。</p>
<p>通常，除非必须使用变量来访问属性，否则我们建议使用点表示法。</p>

<p class="note"><span>注释：</span>关于 Object 的属性和方法请查阅手册。</p>
</div>

<div>
<h2>5.2 Array 类型</h2>
<p>注意：JS 中的数组不支持键值对形式的数组，不能跟PHP的数组混淆了。</p>
<p>除了 Object 之外，Array 类型恐怕是 ES 中最常见的类型了。而且，ES中的数组与其他多数语言中的数组有着相当大的区别：</p>
<ul>
<li>数组的每一项都可以保存任何类型的数据；</li>
<li>数组的大小是可以动态调整的，可以随着数据的添加自动增长以容纳新数据。</li>
</ul>
<p>创建数组的基本方式有两种：</p>
<ul>
<li>使用Array构造函数，并且可以省略new操作符，效果相同；</li>
<li>使用数组字面量表示法创建数组。</li>
</ul>
<pre>var values = [1,2,]  // 不要这样，正常会创建2项，但IE8及之前版本会创建3项</pre>

<h4>length 属性</h4>
<p>数组的项数保存在length属性中，length 值会跟随数组项目变化自动增减；</p>
<p>可以通过设置 length 属性增减数组的项目数量；</p>
<p>利用length属性也可以方便地在数组末尾添加新项。</p>
<pre>
var colors = ["red","blue"];
colors[colors.length] = "green";  // 数组序号是从0开始的，所以length正好是新添加的项的序号
</pre>

<h3>5.2.1 检测数组 -- Array.isArray()</h3>
<h3>5.2.2 转换方法-- toLocaleString() toString() valueOf() join()</h3>
<h3>5.2.3 栈方法 -- push() pop()</h3>
<h3>5.2.4 队列方法 -- push() shift() ; unshift() pop()</h3>
<h3>5.2.5 重排序方法 -- reverse() sort()</h3>
<h3>5.2.6 操作方法 -- concat() slice() splice()</h3>
<h3>5.2.7 位置方法 -- indexOf() lastIndexOf()</h3>
<h3>5.2.8 迭代方法 -- every() filter() forEach() map() some()</h3>
<h3>5.2.9 归并方法 -- reduce() reduceRight()</h3>

</div>

<div>
<h2>5.3 Date 类型</h2>
<p>Date 类型使用自 UTC 1970.1.1 0:00 开始经过的毫秒数来保存日期。</p>
<p>在调用Date构造函数而不传递参数的情况下，新创建的对象自动获得当前日期和时间。如果想根据特定日期和时间创建日期对象，必须传入表示该日期的毫秒数。为了简化计算，ES提供了两个方法： Date.parse() 和 Date.UTC()</p>
<p>Date.parse() 方法接收一个表示日期的字符串函数，然后尝试根据这个字符串返回相应日期的毫秒数。ES没有定义该函数应该支持哪种日期格式，因此这个方法的行为因实现而异，而且通常是因地区而异。如果传入Date.parse()方法的字符串不能表示日期，那么它们会返回NaN。实际上，如果直接将表示日期的字符串传递给Date构造函数，也会在后台调用Date.parse()</p>
<p>Date.UTC() 方法同样也返回表示日期的毫秒数，但参数分别是年份、基于0的月份、月中的哪一天、小时数、分钟、秒以及毫秒数，这些参数中只有年和月是必须的。如同模仿Date.parse()一样，Date构造函数也会模仿 Date.UTC()，但有一点明显不同：日期和时间都基于本地时区而非GMT来创建。</p>
<p>ES5添加了 Date.now() 方法，返回表示调用这个方法时的日期和时间的毫秒数。使用 + 操作符获取对象的时间戳，也可以达到同样的目的。</p>
<pre>
var now = new Date();  // 创建新对象并自动获得当前日期和时间
var date1 = new Date("May 25, 2014");  // 传递日期字符串，构造函数会自动调用 Date.parse()
var date2 = new Date(Date.UTC(2014,4,25))  // Sun May 25 <code>08</code>:00:00 UTC+0800 2014
var date2 = new Date(2014,4,25)  // Sun May 25 <code>00</code>:00:00 UTC+0800 2014
var start = Date.now();
var  stop = +new Date();
</pre>
<p class="note"><span>注释：</span>Date 类型相关方法请查阅手册。</p>
</div>

<div>
<h2>5.4 RegExp 类型</h2>
<pre>var expression = /pattern/flags;</pre>
<p>其中的模式 pattern 部分可以是任何简单或复杂得正则表达式，可以包含字符类、限定符、分组、向前查找以及反向引用。每个正则表达式都可带有一或多个标志flags，用以标明正则表达式的行为。</p>
<ul>
<li>g：表示全局 global 模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；</li>
<li>i：表示不区分大小写（case-insensitive）模式；</li>
<li>m：表示多行（multiline）模式。</li>
</ul>
<p>创建正则表达式的方式有2种：</p>
<ul>
<li>以字面量形式来定义正则表达式</li>
<li>使用 RegExp 构造函数，它接收2个参数：一个是要匹配的字符串模式，另一个是可选的标志字符串。</li>
</ul>
<p>ES3 中，正则表达式字面量始终会共享同一个 RegExp 实例，而使用构造函数创建的每一个新 RegExp 实例都是一个新实例。</p>
<p>ES5 明确规定，使用正则表达式字面量必须像直接调用 RegExp 构造函数一样，每次都创建新的 RegExp 实例。</p>
<h3>5.4.2 RegExp 实例方法</h3>
<p>RegExp 对象的主要方法是 exec()，该方法是专门为捕获组而设计的。exec() 接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；如果没有匹配返回null。返回的数组虽然是 Array 实例，但包含两个额外属性：index 和 input。</p>
<p>对于exec() 方法而言，即使在模式中设置了全局标志，它每次也只返回一个匹配项。在不设置全局标志的情况下，每次调用都返回第一个匹配项信息，而设置了全局标志后，每次调用 exec() 后会在字符串中继续查找新匹配项。</p>
<p>正则表达式的第二个方法是 test()，它接受一个字符串参数。在模式与该参数匹配的情况下返回 true 否则false。test() 方法经常被用于if语句中，用于验证用户输入。</p>
<p>RegExp 实例继承的 toLocaleString() 和 toString() 方法会返回正则表达式的字面量。</p>
<p>正则表达式的 valueOf() 方法返回正则表达式本身（对象）。</p>
</div>

<div>
<h2>5.5 Function 类型</h2>
<p>ES 中最有意思的事莫过于函数，而这根源，则在于函数实际上是对象。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。</p>
<p>函数通常是由函数声明语法定义的，这与使用函数表达式定义函数的方式相差无几。另外，函数可以通过 Function 构造函数定义，虽然不推荐，但对于理解“函数是对象，函数名是指针”是很有帮助的。</p>
<p>使用函数表达式定义函数时，注意函数末尾有一个分号，就像声明其他变量时一样。</p>
<p>由于函数名仅仅是指向函数的指针，因此一个函数可以有多个名字。</p>
<p>使用不带圆括号的函数名只是访问函数指针，而并非调用函数。</p>

<h3>5.5.1 没有重载</h3>
<p>正因为函数名只是指向函数的指针，所以ES中没有函数重载的概念。当使用同一个函数名重新定义函数时，实际是将变量指向了另外一个新定义的函数对象。</p>

<h3>5.5.2 函数声明与函数表达式</h3>
<p>解析器在加载数据时，对函数声明和函数表达式并非一视同仁。</p>
<ul>
<li>解析器会率先读取函数声明，并将它们提升到源代码树的顶部，使其在执行任何代码之前可用（可访问）。</li>
<li>至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解析执行。</li>
</ul>

<h3>5.5.3 作为值的函数</h3>
<p>因为ES中函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递函数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。</p>

<h3>5.5.4 函数内部属性</h3>
<p>在函数内部，有两个特殊的对象：arguments 和 this。</p>
<p>其中，<code>arguments</code> 是一个类数组对象，包含着传入函数中的所有参数，该对象里有一个名叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。当在函数内部需要使用函数自身时，应该使用 <code>arguments.callee</code> 来代替函数名。</p>
<p>函数内部的另一个特殊对象时<code>this</code>，引用的是函数据以执行的环境对象。当在全局域中使用函数时，this对象引用的就是window 。</p>
<p>ES5 还规范化了另外一个<strong>函数对象的属性</strong> <code>caller</code>，这个属性中保存着对调用当前函数的函数的引用，如果在全局环境中调用当前函数，它的值为null。</p>
<pre>
function outer(){ inner(); }
function inner(){ alert(arguments.callee.caller); }
outer();  //输出 function outer(){ inner(); }
</pre>
<p>当函数在严格模式下运行时，访问arguments.callee 会导致错误。ES5 还定义了arguments.caller 属性，但在严格模式下访问它会导致错误，而在非严格模式下这个属性始终是undefined，定义这个属性是为了分清arguments.caller 与函数的caller属性。以上变化都是为了加强这门语言的安全性，这样第三方代码就不能在相同的环境里窥视其他代码了。</p>

<h3>5.5.5 函数属性和方法</h3>
<p>ES中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：<code>length</code> 和 <code>prototype</code>。</p>
<p>length 属性表示函数希望接收的形参个数。</p>
<p>对于ES中的引用类型而言，prototype 是保存他们所有实例的共享属性和方法的真正所在。在创建自定义引用类型以及实现继承时，prototype属性的作用是极为重要的。ES5 中，prototype属性是不可枚举的，因此使用for-in无法发现。</p>
<p>每个函数都包含两个继承而来的方法：<code>apply()</code> 和 <code>call()</code>。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。</p>
<p> apply() 方法接收两个参数：一个指定作用域，另一个是参数数组。其中第二个参数可以是Array的实例，也可以是arguments对象。</p>
<p>call() 方法与apply() 方法的作用相同，他们的区别仅在于接收参数的方式不同。对于call() 而言，第一参数是this值没有变化，变化的是其余参数都是直接传递给函数。换句话说，使用call() 方法时，传递给函数的参数必须逐个列举出来。</p>
<p>至于是使用 apply() 还是 call()，完全取决于你希望采用哪种参数传递方式。</p>
<p>事实上，传递参数并非 apply() 和 call() 真正的用武之地，他们真正强大的地方是能够扩充函数赖以运行的作用域。使用它们扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系。</p>
<p>ES5 还定义了一个方法 <code>bind()</code>，它会创建一个函数的实例，其this值会被绑定到传给 bind() 函数的值。</p>
<pre>
window.color = "red";
var o = {color:"blue"};

function sayColor(){
  alert(this.color);
}

sayColor();  // red
sayColor.call(o);  // blue

var sayColor2 = sayColor.bind(o);
sayColor2();  // blue
</pre>
<p>每个函数继承的 toLocaleString() toString() valueOf() 方法始终都返回函数的代码。</p>
</div>

<h1>5.6 基本包装类型</h1>
<div>
<p>为了便于操作基本类型值，ES 还提供了3个特殊的引用类型：Boolean、Number 和 String。每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据。</p>
<p>引用类型与基本包装类型的主要区别就是对象的生存期。使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。</p>
<p>当然，可以显示地调用Boolean Number 和 Sting 来创建基本包装类型的对象。不过，应该在绝对必要的情况下再这样做，因为这种做法很容易让人分不清自己是在处理基本类型还是引用类型的值。</p>
<p>也可以使用 Object 构造函数创建基本包装类型对象，它可以根据传入值的类型返回相应基本包装类型的实例。</p>
<p>要注意的是，使用 new 调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的。</p>
</div>
<div>
<h2>5.6.1 Boolean 对象</h2>
<p>理解基本类型的布尔值与Boolean对象之间的区别非常重要——当然，我们的建议是永远不要使用Boolean对象。</p>
<pre>
var oFalseObject = new Boolean(false);
var bResult = oFalseObject &amp;&amp; true;	//输出 true
var aResult = false &amp;&amp; true;	//输出 false
</pre>
</div>

<div>
<h2>5.6.2 Number 对象</h2>
<p>与Boolean类型一样，Number 类型也重写了 valueOf() toLocaleString() 和 toString()方法。重写后的valueOf() 返回对象表示的基本类型的数值，另外两个方法则返回字符串形式的数值。</p>
<p>除了从 Object 对象继承的标准方法外，Number 对象还有几个处理数值的专用方法。</p>
<h3>toFixed() 方法</h3>
<p>toFixed() 方法返回的是具有指定位数小数的数字的字符串表示。例如：</p>
<pre>var onumberObject = new Number(68);
alert(onumberObject.toFixed(2));  <span>//输出 "68.00"</span>
</pre>
<p>对于处理货币的应用程序，该方法非常有用。toFixed() 方法可以表示具有 0 到 20 个小数位的数值。</p>
<h3>toExponential() 方法</h3>
<p>toExponential() 返回的是用科学计数法表示的数字的字符串形式。toExponential() 方法也有一个参数，指定要输出的小数的位数。例如：</p>
<pre>var onumberObject = new Number(68);
alert(onumberObject.toExponential(1));  <span>//输出 "6.8e+1"
</span></pre>
<h3>toPrecision() 方法</h3>
<p>对于一个数值来说，toPrecision()方法可能会返回固定大小（fixed）格式，也可能返回指数格式，具体看哪种格式最合适。它有一个参数，即表示数值的所有数字的位数（不包括指数部分）。</p>
<pre>
var onumberObject = new Number(68);
alert(onumberObject.toPrecision(1));  //输出 "7e+1"
alert(onumberObject.toPrecision(2));  //输出 "68"
alert(onumberObject.toPrecision(3));  //输出 "68.0"
</pre>
</p><p>toFixed()、toExponential() 和 toPrecision() 方法都会进行舍入操作。
</div>

<div>
<h2>5.6.3 String 对象</h2>
<p>String 对象的方法也可以在所有基本的字符串值中访问到。其中，继承的 valueOf() toLocaleString() 和 toString() 方法，都返回对象所表示的基本字符串值。</p>
<p class="note"><span>注释：</span>具体对象方法请查阅查考手册。</p>
</div>

## 5.7 单体内置对象

ECMA-262 对内置对象的定义是：由ECMAScript实现提供的、不依赖于宿主环境的对象，这些对象在ES程序执行之前就已经存在了。

前面我们已经介绍了大多数内置对象，如 Object Array 和 String 等。 ECMA-262还定义了两个单体内置对象：Global 和
Math。（内置对象 = 内置构造函数对象 + 内置单体对象）

### 5.7.1 Global 对象

所有在全局作用域中定义的属性和函数，都是 Global 对象的属性。

ES 虽然没有指出如何直接访问 Global 对象，但 Web 浏览器都是将这个全局对象作为 window
对象的一部分加以实现的。因此，在全局作用域中声明的所有变量和函数，就都成为了 window 对象的属性。

另一种取得 Global 对象的方法就是使用如下代码：

```js
var global = function(){return this;}();
```

### 5.7.2 Math 对象

ES 还为保存数学公式和信息提供了一个公共位置，即Math对象。Math 只是普通内置对象，不是构造函数，无法使用 new 操作符生成新实例。


