<h1>第9章 忍者点金术：运行时代码求值</h1>

<div>
<h2>9.1 代码求值机制</h2>
<p>代码求值是一个很强大、但经常被误用的功能。理解能够且应该使用代码求值的场景，以及使用它的最佳技术，在创建高级应用程序代码时，会有很明显的优势。</p>

<h3>9.1.1 用 eval() 方法进行求值</h3>
<p>eval() 方法将在当前上下文内，执行所传入字符串形式的代码，执行返回结果则是最后一个表达式的执行结果。</p>
<p>eval() 是一个高级功能，但也带来了安全性 和 性能方面的问题，所以如非必要就不要使用。</p>
<h4>求值结果</h4>
<p>任何不是 简单变量、原始值、赋值语句的内容都需要在外面包装一个括号，以便返回正确的结果。</p>
<pre class="js">
var o = eval(' {ninja:1} ');  // 生成了 值为1 的 window.ninja 变量
var o = eval('({ninja:1})');  // 能够正确生成对象
</pre>

<h3>9.1.2 用函数构造器进行求值</h3>
<pre class="js">
var add = new Function('a','b','return a+b;');
var add = function(a,b){ return a+b; };
// Function 构造器可变参数的最后一个参数为函数体内容，上面两行代码效果相同。
</pre>
<p>通过 Function 构造器可以在运行时通过所提供的字符串创建新函数。</p>
<p>另外一个极其重要的实现区别是，使用 Function 构造器创建函数的时候，不会创建闭包。在不想承担任何不相关闭包的开销时，这可能是一件好事。</p>

<h3>9.1.3 用定时器进行求值</h3>
<p>我们通常给定时器传递一个内联函数或函数引用，这是 setTimeout() 和 setInterval() 方法推荐使用的方式，但这些方法也可以接受字符串的传入，从而在定时器触发的时候进行求值。</p>
<pre class="js">var tick = window.setTimeout('alert("Hi!")',100);
// 这种用法很罕见，大致相当于 new Function() 的使用方式。</pre>
<pre>
/* 另外的例子，下面三句效果一样，但最后一句其实跟前两句的中间过程是有所不同的 */
&lt;script&gt;xxx.onclick = function(){ alert("xxx");}&lt;/script&gt;
&lt;input type="button" onclick="alert('btn1')" value="btn1" /&gt;
&lt;input type="button" onclick="(function(){ alert ('btn2');})()" value="btn2" /&gt;
</pre>

<h3>9.1.4 全局作用域内的求值操作（动态&lt;script&gt;块）</h3>
<p>求值执行的作用域就是调用 eval() 时的作用域，但通常我们希望代码字符串在全局作用域内进行求值。</p>
<pre>
&lt;script&gt;
function globalEval(data) {
  data = data.replace(/^\s*|\s*$/g, "");
  if (data) {
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
    var script = document.createElement("script");
    script.text = data;
    head.appendChild(script);  // 将script节点附加到DOM上
    head.removeChild(script);  // 执行完去除
  }
}  // 将 script 元素添加到 head 元素，将会导致该脚本在全局作用域内进行求值
window.onload = function() {  // 验证效果
  (function() { globalEval("var test = 5;"); })();
  assert(test === 5, "The code was evaluated globally.");
};
&lt;/script&gt;
</pre>
<p>这段代码最常见的场景是动态执行从服务器端返回的代码，它几乎总是要求代码在全局作用域内执行。</p>
<blockquote>
<p>If you use the eval function indirectly, by invoking it via a reference other than eval, as of ECMAScript 5 it works at global scope rather than local scope; this means, for instance, that function declarations create global functions, and that the code being evaluated doesn't have access to local variables within the scope where it's being called. (From <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Don't_use_eval_needlessly!">Mozilla MDN</a>)</p>
<pre class='js'>
function test() {
  var x = 2, y = 4;
  console.log(eval("x + y"));  // Direct call, uses local scope, result is 6
  var geval = eval;
  console.log(geval("x + y")); // Indirect call, uses global scope, throws ReferenceError
}
</pre>
</blockquote>

<h3>9.1.5 安全的代码求值</h3>
<p>关于代码求值，经常出现的一个问题是，如何安全地执行外部代码，一般来说，这个问题的答案是“无解”，但也并不是没有希望。</p>
<p>渴望安全地执行随机 JavaScript 代码，通常源于想要创建混合网站和嵌入性广告，而又不担心信息安全泄露。在这个领域，<a href="http://code.google.com/p/google-caja/">Google Caja</a>可能就是领导者。</p>

<h2>9.2 函数反编译</h2>
<p>大多数 JavaScript 实现，还提供了一种将已求值过的 JS 代码进行“反编译”的功能。在第6章，我们称这一过程为序列化 serialization，但这一过程也可以称为反编译 decompile。</p>
<p>反编译听起来很复杂，其实很简单，是由函数的 toString() 方法来执行。</p>

<h2>9.3 代码求值实战</h2>
<h3>9.3.1 JSON 转化</h3>
<p>大多数现代浏览器都支持带有 parse() 和 stringify() 方法的原生 JSON 对象，但早期的一些浏览器却不提供这样的 JSON 对象，对于这些浏览器，我们可以采用 eval() 求值。</p>
<pre class="js">var object = eval("(" + json + ")");  // 一定不要忘记用小括号包装 json</pre>
<p>就像前面提到的，采用 eval() 求值时始终要关注安全性，JSON 标记的创造者 Douglas Crockford 给我们提供了一个不错的 <a href="http://github.com/douglascrockford/JSON-js">JSON 转换器脚本</a></p>

<h3>9.3.2 导入有命名空间的代码</h3>
<pre>
&lt;script&gt;
base2.namespace =                                     //定义要导入的名称
  "var Base=base2.Base;var Package=base2.Package;" +
  "var Abstract=base2.Abstract;var Module=base2.Module;" +
  "var doc=base2.doc;";
assert(typeof Base === "undefined",  //求值前先测试，确保要定义的名称不存在
       "The Base object doesn't exist." );
eval(base2.namespace);                           //对要导入的内容进行求值
assert(typeof Base === "function",            //导入后再测试，名称已经可用
       "And now the namespace is imported." );
&lt;/script&gt;
</pre>

<h3>9.3.3 JavaScript 压缩和混淆</h3>
<p>Dean Edwards 的 Packer 可以被用来压缩代码，压缩后的代码体积更小，且使代码难以被有不轨图谋的人利用。</p>
<p>压缩后的代码虽然体积更小，但必须在客户端先解压，这样，虽节约了下载时间，但总的加载时间不一定是最少的。</p>
<p>如果我们只关注性能，那么，最小化才是最佳选择，可以通过 YUI Compressor 来最小化代码。</p>

<h3>9.3.4 动态重写代码</h3>
<h3>9.3.5 面向切面的脚本标签</h3>
<p>AOP 技术可以在运行时将代码进行注入并执行一些“横切”代码，如日志记录、缓存、安全性检查等。</p>
<p>前面的缓存记忆示例就是在 JavaScript 中应用 AOP 的一个很好示例。</p>
<p>在页面的脚本标记中使用无效的类型属性，包含一些不想让浏览器触碰的新数据，我们可以把这个概念更进一步具体化，使用它增强现有的 JavaScript。</p>
<pre>
&lt;script type="x/onload"&gt; assert(true,"Executed on page load");&lt;/script&gt;
&lt;script&gt;  // 创建自定义类型脚本，强制浏览器完全忽视这个脚本块
window.onload = function(){
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i &lt; scripts.length; i++) {
    if (scripts[i].type == "x/onload") { globalEval(scripts[i].innerHTML); }
  }  // 用前面开发的 globalEval() 函数在全局作用域内对脚本块的内容进行求值
};
&lt;/script&gt;
</pre>

<h3>9.3.6 元语言和领域特定语言</h3>
<p>利用运行时代码求值，甚至可以创建领域特定语言（DSL）如：Processing.js 和 Objective-J</p>
</div>

<h1>第10章 with 语句</h1>

<div>
<p>with 语句是一个强大的、但经常被误解的、有争议的 JavaScript 特性。with 语句允许我们将一个对象的所有属性引用到当前作用域，允许我们无需使用拥有者对象的前缀，就可以对这些属性进行引用和赋值操作。</p>

<h2>10.1 with 是怎么回事</h2>
<h3>10.1.1 在 with 作用域内引用属性、进行赋值操作</h3>
<pre>
&lt;script&gt;
// 试验结论：
// 函数上下文（this）不受 with 语句影响
// 读取和修改属性，受 with 语句影响
// 新建属性，不受 with 语句影响，对with作用域内不存在的属性赋值，将创建全局变量
var use = "other";
var katana = {
  isSharp: true,
  use: function(){ this.isSharp = !this.isSharp; }
};
with (katana) {  // 测试：读取属性
  assert(use !== "other" && typeof use == "function",
        "use is a function from the katana object.");
  assert(this !== katana,   // this 不受影响，保留原值 window
        "context isn't changed; keeps its original value");
}
with (katana) {  // 测试：修改属性 和 新建属性
  isSharp = false;  // 修改属性正常
  cut = function(){ isSharp = false; }; // 新建属性，结果创建了全局变量
  assert(katana.isSharp === false, "properties can be assigned");
  assert(typeof window.cut == "function",
      "new properties are created in the global scope");
}
&lt;/script&gt;
</pre>
<h3>10.1.3 性能方面的注意事项</h3>
<p>使用 with 将严重降低相关代码的执行性能，书中示例测试降速达41倍。</p>

<h2>10.2 真实示例</h2>
<pre class="js">
Object.extend(String.prototype.escapeHTML,{
  div: document.createElement('div'),
  text: document.createElement('')
});
with (String.prototype.escapeHTML) div.appendChild(text);
// 取自 Prototype 的例子，使用 with 简化了语句。其实我们可以换用即时函数来替代：
(function(s){ s.div.appendChild(s.text); })(String.prototype.escapeHTML);
</pre>

<h2>10.3 导入有命名空间的代码</h2>
<h2>10.4 测试</h2>
<h2>10.5 使用 with 进行模板化</h2>
<pre>
&lt;script&gt;  // 一个简单的模板系统实现
(function () {
  var cache = {};
  this.tmpl = function tmpl(str, data) {
    var fn = !/\W/.test(str) ?  // 判断传入的是 模板内容 还是 模板id
      cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :
      new Function("obj", // 第一个参数接收data，第二参数即为由模板内容转换成的JS代码
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" + // 使用 with(obj) 来简化属性引用
        str // 将模板文件转换成纯净的 JavaScript 代码
          .replace(/[\r\t\n]/g, " ")
          .split("&lt;%").join("\t")
          .replace(/((^|%&gt;)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%&gt;/g, "',$1,'")
          .split("\t").join("');")
          .split("%&gt;").join("p.push('")
          .split("\r").join("\\'") + 
        "');}return p.join('');");  //Function定义完成'
    return data ? fn(data) : fn;  // 提供函数柯里化功能 fn=tmpl(str)
  };
})();
assert(tmpl("Hello, &lt;%= name %&gt;!", {name:"world"}) == "Hello, world!", "Do simple variable inclusion.");
var hello = tmpl("Hello, &lt;%= name %&gt;!");
assert(hello({name:"world"}) == "Hello, world!", "Use a pre-compiled template.");
&lt;/script&gt;
</pre>
<pre class="js">
(function(obj) {
var p=[], print=function(){p.push.apply(p,arguments);};
with(obj){p.push('Hello, ', name ,'!');}return p.join('');
})  // 上面断言示例转换成的 fn
</pre>
<p>总的来说，一个易于使用的模板系统，在很大程度上，取决于with语句的能力。</p>
<p>一个完整的模板系统是将嵌入式模板的使用结合在一起。我们可以使用脚本包含模板，将脚本的类型指定为“text/tmpl”（或其他任何浏览器不认识的类型），并赋值一个唯一ID，稍后再使用模板系统来抽取这些模板内容。</p>
<pre>
&lt;html&gt; &lt;head&gt;  &lt;!-- 完整的模板应用示例 --&gt;
&lt;script script src="tmpl.js"&gt;&lt;/script&gt;
&lt;script type="text/tmpl" id="colors"&gt;  // 模板文件
&lt;p&gt;Here's a list of &lt;%= items.length %&gt; items:&lt;/p&gt;
&lt;ul&gt;
  &lt;% for (var i=0; i &lt; items.length; i++) { %&gt;
  &lt;li style='color:&lt;%= colors[i % colors.length] %&gt;'&gt;
    &lt;%= items[i] %&gt;&lt;/li&gt;
  &lt;% } %&gt;
&lt;/ul&gt;
and here's another...
&lt;/script&gt;
&lt;script&gt;
var colorsArray = ['red', 'green', 'blue', 'orange'];
var items = [];
for ( var i = 0; i &lt; 20; i++ ) items.push( "test" );
function replaceContent(name) {
  document.getElementById('content').innerHTML = tmpl(name, {colors: colorsArray, items: items});
}
&lt;/script&gt;
&lt;/head&gt; &lt;body&gt;
&lt;input type="button" value="Run Colors" onclick="replaceContent('colors')"&gt;
&lt;p id="content"&gt;Replaced Content will go here&lt;/p&gt;
&lt;/body&gt; &lt;/html&gt;
</pre>
<p>这里有篇关于本实现的解读的网络文章，<a href="http://www.cnblogs.com/dolphinX/p/3489269.html">点击</a></p>

<h2>10.6 总结</h2>
<ul>
<li>最明显的一点，with 语句的主要目标是简化复杂的代码，可以使得包含很多对象属性引用的代码变得更加简洁且更容易理解。</li>
<li>我们列举了现实中的示例，这种简化方式应用到了命名空间、测试，甚至是模板系统构建、库等领域中。</li>
<li>与所有强大的工具一样，使用 with 时应该谨慎，使用该功能精简代码的时候，同时很容易让代码变得很模糊迷乱。</li>
<li>with 语句，在其整个生命周期内都很有争议，没有前景，应该避免在新代码中使用。</li>
</ul>
</div>

<h1>第11章 开发跨浏览器策略</h1>

<div>
<h2>11.1 选择要支持的浏览器</h2>

<h2>11.2 五大开发关注点</h2>
<p>对于 Javascript 可重用代码来说，有5个重要的关注点是最大的挑战：浏览器的bug；浏览器的bug修复；浏览器缺失的功能；外部代码；浏览器回归。</p>
<p>分析我们的目标受众、开发资源以及进度，这些都是我们的决定因素。</p>
<p>当努力开发可重用的 JavaScript 代码时，我们必须考虑所有的点，而且要关注当前已有的最流行的浏览器。然后，还必须考虑浏览器在未来版本中的变化。而且还必须努力维护旧版浏览器的兼容性，对于整个支持集，要在不牺牲质量或性能的情况下，支持尽可能多的功能。</p>

<h3>11.2.1 浏览器 bug 和浏览器差异</h3>
<h3>11.2.2 浏览器 bug 修复</h3>
<p>假设某个浏览器将永远有一个特定的bug非常愚蠢——大部分浏览器的bug最终都会得到修复，依靠bug的存在是一个危险的开发策略。</p>
<p>在确定一个功能是否是bug时，始终要用规范对它进行验证。</p>
<p>浏览器bug也不同于一个不规范的API。一个不规范的API的实现在任何时候（尤其是尝试成为标准的时候）都有可能改变。</p>

<h3>11.2.3 与外部代码（标记）一起共存</h3>
<p>任何可重用的代码必须与围绕它的代码共存。我们编写的代码不仅要承受编写得很糟糕的代码，还要负责自己不受这些共存代码的影响。</p>
<h4>封装代码</h4>
<p>要防止我们的代码影响页面上加载的其他代码片段，最好是采用封装。</p>
<p>jQuery就是一个很好的例子，它只引入了名为jQuery的全局变量（函数），以及该全局变量的一个别名$。在jQuery中，几乎所有的操作都是通过jQuery函数进行的。其他所有函数[所谓的实用函数]都是作为jQuery的属性来定义的。</p>
<p>我们可以定义一个全局函数或普通对象作为命名空间。</p>
<p>为了让代码封装起来，我们希望避免采用的另外一个实践是修改任何现有的变量、函数原型，甚至是DOM元素。除了我们自己的代码以外，页面上任何地方的修改，都有可能造成潜在的冲突和混乱。</p>
<h4>处理不太典范的代码</h4>
<p>当我们的代码与我们控制不了的代码共存时，为了安全起见，我们应做最坏的打算，后面几节将介绍这些防御措施。</p>
<h4>避免植入属性</h4>
<p>在Object的原型上添加属性将是一个陷阱，我们可以通过 hasOwnProperty() 函数来越过这个陷阱。</p>
<h4>贪婪 ID 复制</h4>
<p>当表单内输入元素（如input）的id与form的特性名同名时（如id="action"），from.action将指向 input 元素，而不是 form.action 特性。同样的事情也发生在 from.submit上。</p>
<p>幸运的是，通过在HTML标记中避免声明和标准属性名一样的id值，就可以避免这个问题。</p>
<h4>样式表排序</h4>
<p>在JavaScript代码执行时，确保定义CSS样式表提供的规则的一个最佳方法是，将外部样式表在外部脚本文件之前进行引用。</p>

<h3>11.2.4 缺失的功能</h3>
<h4>优雅降级</h4>
<p>当碰到支持列表以外的浏览器，缺少我们必须的功能，在我们不能提供完整的功能时，进行优雅的失败处理。</p>
<h4>向后兼容</h4>
<p>一个更好的策略是，将我们的代码尽可能设计成向后兼容，并主动获知失败的浏览器，从而将页面或网站替换成另外一个版本。Yahoo!会将不支持浏览器的访问引导至一个纯HTML版本的程序上（没有css 没有JS）。</p>

<h3>11.2.5 回归</h3>
<p>这里我们使用术语“回归”的传统定义：过去有效的特性不再像预期一样有效。回归是我们遇到的最困难的问题之一，我们能做的，就是勤勤恳恳地做跟踪，这是我们在本书强调进行代码测试的一个非常重要的原因。</p>
<h4>期待变化</h4>
<h4>不可预知的 bug</h4>

<h2>11.3 实现策略</h2>
<p>知道哪些问题需要注意只是成功的一半——找出处理这些问题的有效策略，并利用这些策略实现健壮的跨浏览器代码，则是另外一半。</p>
<h3>11.3.1 安全的跨浏览器修复</h3>
<p>最简单的（并且最安全的）跨浏览器修复方式，都具有如下两个重要特征：</p>
<ul>
<li>对其他浏览器来说，没有负面影响或副作用</li>
<li>不需要进行浏览器检测或特性检测</li>
</ul>
<p>能够使用这种方式进行修复的场景可能很少见，但他们是一种策略，我们应该尽力采用这种方式的解决方案。</p>

<h3>11.3.2 对象检测 object detection</h3>
<p>在编写跨浏览器代码时，对象检测是一种常用的方法，这种方式不仅简单，而且通常很有效。确定某一对象或对象的属性是否存在，如果存在，则假设它包含了暗指的功能。</p>

<h3>11.3.3 特征仿真 feature simulation</h3>
<p>处理回归的另外一种形式，也是检测浏览器bug修复的最有效手段，它就是特性仿真。与只是进行对象/属性查找的对象检测相比，特征仿真要执行完整的特征运行，以确保它可以按期望运行。</p>
<p>使用特征仿真时要考虑的最重要的一点就是折衷。在初始仿真中支付的额外性能开销，以及我们程序中的额外代码，带给我们的好处是，可以让一个可疑特性在所有支持的浏览器中都能按预期工作，并且使我们的代码不因未来的bug修复而受到破坏。这种豁免权对创建可重用代码库来说绝对是无价的。</p>

<h3>11.3.4 不可检测的浏览器问题</h3>
<p>很可惜，在 JavaScript 和 DOM 上，有很多可能出现的问题没办法进行测试或测试很昂贵。</p>
<h4>事件处理绑定</h4>
<p>无法确定一个事件处理程序是否被绑定，除非对我们所有已创建的绑定处理程序的引用进行维护。</p>
<h4>事件触发</h4>
<p>另外一个更严重的问题是，无法确定一个事件是否被触发。</p>
<h4>CSS属性效果</h4>
<p>另外一个难点是，确定修改特定的CSS属性是否会影响页面展示。</p>
<h4>浏览器崩溃</h4>
<h4>不一致的API</h4>
<h4>API性能</h4>
<h4>AJAX问题</h4>

<h2>11.4 减少假设</h2>
<p>在我们编码中，我们应该努力减少所做的假设，有效地减少出错的可能性。但通常，减少假设的数量会增加代码库的大小和复杂性。</p>

</div>

<h1>第12章 洞悉特性、属性和样式</h1>

<div>
<h2>12.1 DOM 特性和 DOM 属性</h2>
<p>特性 attribute 是 DOM 构建的一个组成部分，而属性 property 是元素保持运行时信息的主要手段，并且通过属性可以访问这些运行时信息。</p>
<p>在访问元素的特性值时，有两种选择：使用传统的 DOM 方法 getAttribute 和 setAttribute，或使用 DOM 对象上与之对应的属性。</p>
<p>特性和对应的属性虽然有联系，但并不总是相同的。</p>
<pre class='js'>
var image = document.getElementsByTagName('img')[0];
var div = document.getElementsByTagName("div")[0];
/* 测试更改 img 的 src 属性，特性也会被更改，但表现形式不一样 */
var newSrc = '../resource/images/ninja-with-pole.png';
image.src = newSrc;
assert(true, image.src);  // http://localhost:.../ninja-with-pole.png
assert(true, image.getAttribute('src'));  // ../resource/images/ninja-with-pole.png
/* 测试更改 div 的 id 属性或特性，另外一个也会被更改，且表现形式一样 */
div.setAttribute("id","ninja-1");
assert(true, div.id);  // ninja-1
div.id = "ninja-2";
assert(true, div.getAttribute('id')); // ninja-2
</pre>

<h3>12.1.1 跨浏览器命名</h3>
<p>在谈到特性和相应属性的命名时，属性的名称在不同的浏览器上通常更加一致。不同浏览器之间，属性命名之间虽然会有一些差异，但特性和属性命名之间的差异则会更多。</p>
<p>举个例子，在大多数浏览器中都可以用 class 获取到 class 特性，但 IE 却要使用 className。而浏览器中与 class 特性的对应的属性名是一样的，都是 className。</p>
<p>像 jQuery 这样的库，会在幕后做必要的转换工作，帮助我们规范化这些命名差异，但如果没有库的支持，我们也应该可以意识到它们之间的差别。</p>

<h3>12.1.2 命名限制</h3>
<p>特性，表示为传递给 DOM 方法的字符串，其命名规范是非常自由的，但属性名称，由于可以作为标识符使用点表示法进行访问，所以其命名必须符合标识符的规则。</p>
<p>ECMAScript 规范指出，由于某些关键词不能作为属性名称，所以定义了一些替代方式。另外，由多个单词组成的特性名称由“驼峰式”的属性名称来表示。</p>
<table>
<tr><th>特性名称 attribute</th><th>属性名称 property</th></tr>
<tr><td>for</td><td>htmlFor</td></tr>
<tr><td>class</td><td>className</td></tr>
<tr><td>readonly</td><td>readOnly</td></tr>
<tr><td>maxlength</td><td>maxLength</td></tr>
</table>

<h3>12.1.3 XML 与 HTML 之间的差异</h3>
<p>属性自动和特性对应的整体概念是 HTML DOM 的一个特性。但在处理一个 XML DOM 时，不会在元素上自动创建属性值来表示特性值。因此，我们需要使用传统的 DOM 特性方法来获取特性的值。</p>

<h3>12.1.4 自定义特性的行为</h3>
<p>当我们在页面元素上定义自定义特性时，不会自动转换为元素属性的表示方式，要想访问这些自定义特性值，需要使用 DOM 方法 getAttribute() 和 setAttribute()</p>
<p>提示：在 HTML5 中，对所有的自定义特性使用 data- 前缀，以便遵守 HTML5 的规范。</p>

<h3>12.1.5 性能注意事项</h3>
<p>总的来说，属性的访问速度比相应的 DOM 特性方法的访问速度要快，特别是在 IE 中。</p>

<h2>12.2 跨浏览器的 attribute 问题</h2>
<h3>12.2.1 DOM 中的 id/name 膨胀</h3>
<p>前面提到的，浏览器都会将表单 input 元素的 id 和 name 特性作为 form 元素的属性值进行引用。产生的这些属性，会主动覆盖 form 元素上已经存在的同名属性。此外，IE 不仅会替换属性值，甚至还会替换该属性上的特性值。</p>
<p>但我们可以获取描述元素特性本身的原始 DOM 节点，该节点仍然没有被浏览器所修改</p>
<pre class='js'>var actionValue = element.getAttributeNode('action').nodeValue;</pre>

<h3>12.2.2 URL 规范化</h3>
<pre class='js'>
/* 对于获取标签的原始值，节点方法是对靠谱的 */
var link = document.getElementById('testSubject');
var linkHref = link.getAttributeNode('href').nodeValue;
console.log(linkHref);  // listing-11.5.html
console.log(link.href);  // http://.../listing-11.5.html
console.log(link.getAttribute('href'));  // listing-11.5.html
</pre>
<p>这些测试的结果，不仅展示了问题的本质，同时也提供了解决方案：当我们想获取不被修改的特性值时，我们可以使用 DOM 节点法这样的技巧来获得这样的值。</p>
<p>对于IE 8之前的版本，对 getAttribute() 方法还有另外一个专有扩展，向该方法传递第二个参数，值为2，强制获取未被规划化的值，不过，在传递第二个参数时，Opera 会无缘无故崩溃。</p>

<h3>12.2.3 style 特性</h3>
<p>如果我们想获取元素上设置的原有 style 字符串的话，则更有挑战性，style 属性根本没用，因为它是一个对象，将包含原始字符串的解析结果。</p>
<p>尽管 getAttribute('style') 可以在大多数浏览器上使用，但在 IE 浏览器上却无法使用。而在 IE 中的style 对象上，有一个名为 cssText 的属性记录的是原始字符串。</p>

<h3>12.2.4 type 特性</h3>
<p>另外还有一个 IE 陷阱，IE8及之前版本，修改 input 元素的 type 特性时会抛出一个异常。为保持统一性，不要尝试修改type，而是创建一个 input 元素替换原有元素，但是这样可能会导致一些信息丢失。</p>

<h3>12.2.5 tab index 问题</h3>
<p>如果不显示设置 tab index，我们就无法获取到一个元素的 tab index。</p>

<h3>12.2.6 节点名称</h3>
<p>节点名称大小写敏感性的变化取决于检测的文件类型。如果是一个普通的 HTML 文档，nodeName 属性返回的元素名称都将是大写，但如果是 XML 或 XHTML 文档，nodeName 属性返回的名称则是用户指定的名称。</p>
<p>解决该问题的传统方法是，在比较之前进行规范化，如都转换成小写。但我们明确知道代码执行的文档类型时，就没有必要再担心大小写的情况了。</p>

<h2>12.3 令人头疼的样式特性</h2>
<h3>12.3.1 样式在何处</h3>
<p>通过 style 对象只能获取直接定义在该元素上的style特性，而无法获取&lt;style&gt;元素的值，而且外部样式表上的定义也无法获取。</p>
<p>另外需要指出的是，一个元素的 style 属性中任何一个样式的优先级都要高于样式表中所继承的样式（即便样式表中使用了!important 注解规则）。</p>

<h3>12.3.2 样式属性命名</h3>
<p>因为 JavaScript 解析器会将连字符作为减法运算符，多个单词的 CSS 样式名称作为属性名称时，需转换为驼峰格式。</p>

<h3>12.3.3 float 样式属性</h3>
<p>因为 float 是保留关键字，几乎所有的浏览器都选择使用 cssFloat 这个名字作为替代名称，但 IE 浏览器却选择使用 styleFloat。</p>

<h3>12.3.4 像素值的转换过程</h3>
<p>在废弃特性上指定像素值时，我们指定一个数字，然后让浏览器来处理数字的单位，如&lt;img&gt;标签的height特性。</p>
<p>为 style 属性设置数字值时，必须要指定单位，以便在所有的浏览器上都能工作。</p>

<h3>12.3.5 测量元素的高度和宽度</h3>
<p>如果一个元素不显示的话，它就没有尺寸，但我们可以通过以下步骤获取：</p>
<ol>
<li>将 position 设置为 absolute （避免留白，将元素移出正常的显示流）</li>
<li>将 visibility 设置为 hidden （不让显示）</li>
<li>将 display 属性设置为 block</li>
<li>获取元素尺寸</li>
<li>恢复先前更改的属性</li>
</ol>
<p class="tip"><span>提示：</span>检查offsetWidth 和 offsetHeight 属性值是否为 0，可以非常有效地确定一个元素的可见性。</p>

<h3>12.3.6 通过 opacity 看透明度</h3>
<p>所有现代的浏览器都原生支持 opacity 属性，但在 IE8 及之前版本中则使用专用的 alpha 过滤法。</p>
<p>标准用法是，取值范围是从0.0 到 1.0 来表示元素的不透明度，而 alpha 过滤法则使用整数百分比从 0 到 100 来表示不透明度。</p>
<pre>&lt; style="opacity:0.5;filter:alpha(opacity=50);"&gt;Hello&lt;/div&gt;  // 为兼容 IE8 版本重复声明</pre>
<p>当尝试获取这些值时，我们面对的问题是双重的：</p>
<ul>
<li>除了 alpha 之外，有很多不同类型的过滤器，如转换，所以我们必须处理很多过滤器类型，不能假定过滤器总是指定透明度。</li>
<li>尽管IE8及早期版本不支持 opacity，通过style.opacity 属性取值时，返回的依然是 opacity 值，即使浏览器完全忽略了 opacity 值。</li>
</ul>
<p>后面这一点使得我们难以确认浏览器是否原始支持opacity。事实证明，支持opacity的浏览器，总会将opacity值规范成小于1.0且以0开头的值。例如，如果将opacity指定为 .5，原生支持的浏览器会将该值规范为0.5，而原生不支持的浏览器则直接返回 .5。这意味着我们可以利用特性仿真来判断浏览器是否原生支持 opacity。</p>
<pre>
var div = document.createElement("div");
div. setAttribute('style','opacity:.5');
var OPACITY_SUPPORTED = div.style.opacity === "0.5";
assert(OPACITY_SUPPORTED, "Opacity is supported.");
</pre>

<h3>12.3.7 颜色属性</h3>
<p>页面开发人员在表达颜色信息方面有很大的灵活性，有很多格式的颜色可以在现代浏览器中进行渲染</p>
<table>
<tr><th>格式</th><th>描述</th></tr>
<tr><td>keyword</td><td>任何HTML可识别的颜色关键字，扩展的SVG颜色关键字，或者是关键字 transparent</td></tr>
<tr><td>#rgb</td><td>短十六进制RGB颜色值</td></tr>
<tr><td>#rrggbb</td><td>长十六进制RGB颜色值</td></tr>
<tr><td>rgb(r,g,b)</td><td>每部分的小数值都是从0到255，或者从0%到100%的RGB表示法</td></tr>
<tr><td>rgba(r,g,b,a)</td><td>带有额外的alpha通道的RGB表示法，alpha值的范围从0.0（透明）到1.0（完全不透明）</td></tr>
<tr><td>hsl(h,s,l)</td><td>其三个值表示的是色相、饱和度、明度。色相值从0到360，其他两值从0%到100%</td></tr>
<tr><td>hsla(h,s,l,a)</td><td>带有额外 alpha 通道的 HSL 表示法</td></tr>
</table>
<p>当在获取颜色信息时，开发人员就比较悲剧了。P272的实验结果显示了不同浏览器平台在处理不同颜色格式时的方式完全不同，当然我们可以使用大篇幅来编写 getColor(element,property)这样的函数，也可以直接使用 jQuery Color 这样的插件。</p>

<h2>12.4 获取计算样式</h2>
<p>所有现代浏览器（包括IE9）都实现了 window.getComputedStyle() 方法获取计算样式，进而再通过该接口的 getPropertyValue() 方法检索特定样式属性的计算样式。</p>
<p>IE8及早先版本提供了一个专有技术来访问元素的计算样式：附加到所有元素上的 currentStyle 属性。</p>
<pre class='js'>
function fetchComputedStyle(element,property) {
  if (window.getComputedStyle) {
    var computedStyles = window.getComputedStyle(element);
    if (computedStyles) {
      property = property.replace(/([A-Z])/g,'-$1').toLowerCase();
      // getPropertyValue 方法接受的是 CSS 属性名称，而非驼峰式名称
      return computedStyles.getPropertyValue(property);
    }
  }
  else if (element.currentStyle) {
    property = property.replace(/-([a-z])/ig, function(all,letter){ return letter.toUpperCase(); });
    return element.currentStyle[ property ]; // IE 则接收的是 驼峰式名称
  }
}
</pre>
<p>在处理样式属性的时候，还有一个问题我们需要注意：混合属性。CSS 允许我们使用快捷方式表示混合属性，比如 border 属性，但在获取属性时，我们需要检索的是底层的单个属性。</p>
</div>


<h1>第13章 不老事件</h1>

<div>
<h2>13.1 绑定和解绑事件处理程序</h2>
<h2>13.2 Event 对象</h2>
<pre class='js'>
/* 规范化 Event 对象实例 */
</pre>
  
<h2>13.3 处理程序的管理</h2>
<h3>13.3.1 集中存储相关信息</h3>
<pre class="js">
/* 实现一个中央对象用于保存 DOM 元素信息 */
(function () {
var cache = {},  // 一个中央对象用于保存和元素相关联的数据
    guidCounter = 1, // 一个用于生成元素 GUID 的计数器
    expando = "data" + (new Date).getTime();
    // 一个属性名称，使用当前时间戳做名称可以防止与用户自定义名称有潜在的冲突
this.getData = function (elem) {  // 定义 getData 函数
  var guid = elem[expando];
  if (!guid) {
    guid = elem[expando] = guidCounter++;
    cache[guid] = {};
  }
  return cache[guid];
};
this.removeData = function (elem) {  // 定义 removeData 函数
  var guid = elem[expando];
  if (!guid) return;
  delete cache[guid];
  try { delete elem[expando]; } // 某些情况下删除 expando 可能会失败
  catch (e) {
    if (elem.removeAttribute) elem.removeAttribute(expando);
  }
};
})();
</pre>
<h3>13.3.2 管理事件处理程序</h3>
<h4>绑定事件处理程序</h4>
<pre class='js'>
(function(){
  var nextGuid = 1;
  this.addEvent = function (elem, type, fn) {
    var data = getData(elem);                           //#1
    if (!data.handlers) data.handlers = {};             //#2
    if (!data.handlers[type])                           //#3
    data.handlers[type] = [];                           //#3
    if (!fn.guid) fn.guid = nextGuid++;                 //#4
    data.handlers[type].push(fn);                       //#5
    if (!data.dispatcher) {                            // #6
      data.disabled = false;
      data.dispatcher = function (event) {

        if (data.disabled) return;
        event = fixEvent(event);

        var handlers = data.handlers[event.type];       //#7
        if (handlers) {
          for (var n = 0; n &lt; handlers.length; n++) {   //#7
            handlers[n].call(elem, event);              //#7
          }
        }
      };
    }
    if (data.handlers[type].length == 1) {              //#8
      if (document.addEventListener) {
        elem.addEventListener(type, data.dispatcher, false);
      }
      else if (document.attachEvent) {
        elem.attachEvent("on" + type, data.dispatcher);
      }
    }
  };
})();
</pre>
<h4>清理资源</h4>
<h4>解绑事件处理程序</h4>
<h4>冒烟测试</h4>

<h2>13.4 事件触发</h2>
<h4>自定义事件</h4>
<h4>松耦合</h4>
<h4>一个 Ajax 示例</h4>
<h4>触发自定义事件</h4>

<h2>13.5 冒泡与委托</h2>
<h3>13.5.1 将事件委托给祖先元素</h3>
<h3>13.5.2 修复浏览器的不足</h3>
<h4>冒泡 submit 事件</h4>
<h4>冒泡 change 事件</h4>
<h4>实现 focusin 和 focusout 事件</h4>
<h4>实现 mouseenter 和 mouseleave 事件</h4>

<h3></h3>

<h2>13.6 文档就绪事件（document ready）</h2>

</div>

<h1>第14章 DOM 操作</h1>

<div>
<h2>14.1 向 DOM 中注入 HTML</h2>
<h3>14.1.1 将 HTML 转换成 DOM</h3>
<h4>预处理 XML/HTML 源字符串</h4>
<h4>HTML 包装</h4>
<h4>生成 DOM</h4>

<h3>14.1.2 将 DOM 插入到文档中</h3>
<h3>14.1.3 脚本执行</h3>
<h4>全局上下文中的代码求值</h4>

<h2>14.2 克隆元素</h2>

<h2>14.3 删除元素</h2>

<h2>14.4 文本内容</h2>
<h3>14.4.1 设置文本</h3>
<h3>14.4.2 获取文本</h3>



</div>

<h1>第15章 CSS 选择器引擎</h1>

<div>
<h2>15.1 W3C Selectors API</h2>

<h2>15.2 利用 Xpath 查找元素</h2>

<h2>15.3 纯 DOM 实现</h2>
<h3>15.3.1 对选择器进行解析</h3>
<h3>15.3.2 查找元素</h3>
<h3>15.3.3 过滤结果集</h3>
<h3>15.3.4 递归和合并</h3>
<h3>15.3.5 自下而上的选择器引用</h3>



</div>

