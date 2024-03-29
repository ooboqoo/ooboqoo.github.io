# 13 事件

JavaScript 与 HTML 之间的交互是通过事件实现的，事件支持页面的行为（JS代码）与页面的外观（HTML&CSS;代码）之间的松散耦合。


## 13.1 事件流

事件流描述的是从页面中接收事件的顺序。根据方向，事件流分 事件冒泡流 和 事件捕获流 两种。

“DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。



<div>
<h2>13.2 事件处理程序</h2>
<p>事件就是用户或浏览器自身执行的某种动作，诸如 click load 和 mouseover，都是事件的名字。而响应某个事件的函数就叫做事件处理程序（事件侦听器）。事件处理程序的名字以“on”开头。为事件指定处理程序的方式有好几种。</p>

<h3>13.2.1 HTML 事件处理程序</h3>
<pre>&lt;input type="button" value="Click Me" onclick="alert(event.type + this.value)" /&gt;</pre>
<p>这样指定事件处理程序的优缺点：</p>
<ul>
<li>事件处理程序中的代码在执行时，有权访问全局作用域中的任何代码。</li>
<li>事件处理函数中有一个局部变量 event，通过该变量可以直接访问事件对象。</li>
<li>这个动态创建的函数扩展了作用域，在函数内部可以通过 this 访问事件的目标元素</li>
<li>缺点1：存在一个时差问题，触发事件时可能尚不具备执行条件。</li>
<li>缺点2：HTML 与 JavaScript 代码紧密耦合。</li>
</ul>

<h3>13.2.2 DOM0 级事件处理程序</h3>
<pre>document.getElementById("id").<code>onclick</code> = function(){alert(event.type + this.id)}</pre>

<h3>13.2.3 DOM2 级事件处理程序</h3>
<pre>
document.getElementById("id").<code>addEventListener</code>(<code>"click"</code>,function(){
  alert(event.type + this.id);
},false);
</pre>
<p>“DOM2级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener() 和 removeEventListener()，它们都接受3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值如果是true 表示在捕获阶段调用事件处理程序；如果是false 表示在冒泡阶段调用。使用DOM2级方法添加事件处理程序的主要好处是可以添加多个事件处理程序。</p>
<p>通过addEventListener() 添加的事件处理程序只能使用 removeEventListener() 来移除；移除时传入的参数和添加处理程序时使用的参数相同。添加的匿名函数将无法移除，因为移除时无法提供指针指向匿名函数。</p>
<p>大多数情况下，都是将事件处理程序添加到事件流的冒泡阶段，这样可以最大限度地兼容各种浏览器。</p>

<h3>13.2.4 IE事件处理程序</h3>
<p>IE实现了与DOM类似的两个方法：attachEvent() 和 detachEvent()。</p>

<h3>13.2.5 跨浏览器的事件处理程序</h3>
<pre>
var EventUtil = {
  addHandler: function(element,type,handler){
    if (element.addEventListener) element.addEventListener(type,handler,false);
    else if (element.attachEvent) element.attachEvent("on"+type,handler);
    else element["on"+type] = handler;
  },
  removeHandler: function(element,type,handler){
    if (element.removeEventListener) element.removeEventListener(type,handler,false);
    else if (element.detachEvent) element.detachEvent("on"+type,handler);
    else element["on"+type] = null;
 }
};
</pre>
<p>以上没有考虑所有的浏览器问题，例如在IE中的作用域问题，不过，使用它们添加和移除事件处理程序还是足够了。此外，DOM0 级对每个事件只支持一个事件处理程序，好在只支持DOM0 级的浏览器不多了，所以问题也不大。</p>
</div>

<div>
<h2>13.3 事件对象</h2>
<p>在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。</p>
<h3>13.3.1 DOM 中的事件对象</h3>
<table>
<tr><th>属性/方法</th><th>类型</th><th>读/写</th><th>说明</th></tr>
<tr><td>target</td><td>Element</td><td>只读</td><td>事件的目标</td></tr>
<tr><td>relatedTarget</td><td> </td><td> </td><td>事件触发时的关联元素（如mouseover 或 mouseout）在IE中则是 toElement 和 fromElement</td></tr>
<tr><td>currentTarget</td><td>Element</td><td>只读</td><td>当前元素</td></tr>
<tr><td>preventDefault()</td><td>Function</td><td>只读</td><td>取消事件的默认行为</td></tr>
<tr><td>defaultPrevented</td><td>Boolean</td><td>只读</td><td>是否已经调用了preventDefault()</td></tr>
<tr><td>detail</td><td>Integer</td><td>只读</td><td>与事件相关的细节信息</td></tr>
<tr><td>eventPhase</td><td>Integer</td><td>只读</td><td>调用事件处理程序的阶段：1捕获 2处于 3冒泡</td></tr>
<tr><td>stopPropagation()</td><td>Function</td><td>只读</td><td>取消事件的进一步捕获或冒泡</td></tr>
<tr><td>trusted</td><td>Boolean</td><td>只读</td><td>是浏览器生成还是开发人员创建</td></tr>
<tr><td>bubbles</td><td>Boolean</td><td>只读</td><td>表明事件是否冒泡</td></tr>
<tr><td>cancelable</td><td>Boolean</td><td>只读</td><td>是否可以取消事件的默认行为</td></tr>
<tr><td>type</td><td>String</td><td>只读</td><td>被触发事件的类型</td></tr>
<tr><td>which</td><td> </td><td> </td><td>相当于键盘事件时所按键的键盘码。IE中可以通过charCode 和 keyCode 属性获取到</td></tr>
<tr><td>button</td><td></td><td></td><td>表示鼠标事件发生时，用户单击的鼠标按键。IE返回的值有所不同。</td></tr>
</table>
<p>在事件处理程序内部，对象this 始终等于currentTarget 的值。如果事件处理程序存在于父节点中，那么currentTarget为父节点，而target为目标节点。</p>
<p>在需要通过一个函数处理多个事件时，可以使用type属性+ switch语句</p>

<h3>13.3.2 IE中的事件对象</h3>
<table>
<tr><th>属性/方法</th><th>类型</th><th>读/写</th><th>说明</th><th>对应 DOM 属性/方法</th></tr>
<tr><td>cancelBubble</td><td>Boolean</td><td>读/写</td><td>默认false，设为true取消事件冒泡</td><td>stopPropagation()</td></tr>
<tr><td>returnValue</td><td>Boolean</td><td>读/写</td><td>默认true，设为false取消事件的默认行为</td><td>preventDefault()</td></tr>
<tr><td>srcElement</td><td>Element</td><td>只读</td><td>事件的目标</td><td>target</td></tr>
<tr><td>type</td><td>String</td><td>只读</td><td>被触发事件的类型</td><td>type</td></tr>
</table>

<h3>13.3.3 跨浏览器的事件对象</h3>
<p>虽然 DOM 和 IE 中的event 对象不同，但基于他们之间的相似性依旧可以拿出跨浏览器的方案来。</p>
<pre>代码略 P360</pre>

<h3>补充</h3>
<pre>
btn.onclick = function(e){  // 下面3者显示的是同一事件对象
  console.log(e);
  console.log(event);
  console.log(window.event);
  console.log(arguments);  // 显示传入了一个event对象
};
</pre>
<p>以上试验说明，当产生事件时，会在window下面产生一个event对象，然后将该对象传递给事件处理程序。</p>
</div>

<div>
<h2>13.4 事件类型</h2>
<h3>13.4.1 UI事件</h3>
<h3>13.4.2 焦点事件</h3>
<h3>13.4.3 鼠标与滚轮事件</h3>
<p>DOM3 中定义了9个鼠标事件：</p>
<ul>
<li>click: </li>
<li>dblclick: </li>
<li>mousedown: </li>
<li>mouseenter: </li>
<li>mouseleave: </li>
<li>mousemove: </li>
<li>mouseout: </li>
<li>mouseover: </li>
<li>mouseup: </li>
</ul>
<p>页面上的所有元素都支持鼠标事件。除了 mouseenter 和 mouseleave，所有鼠标事件都会冒泡。</p>

<h4>1. 视口坐标位置：clientX clientY</h4>
<h4>2. 页面坐标位置：pageX pageY</h4>
<h4>3. 屏幕坐标位置： screenX screenY</h4>

<h4>9. 触摸设备</h4>
<p>iOS 和 Android 设备的实现非常特别，因为这些设备没有鼠标。在面向 iPhone 和 iPad 中的 Safari 开发时，要记住以下几点：</p>
<ul>
<li>不支持dbclick事件。双击浏览器窗口会放大画面，而且没有办法改变该行为。</li>
<li>轻击可单击元素会触发mousemove事件，如果此操作会导致内容变化，将不再有其他事件发生；如果屏幕没有因此变化，那么会依次发生mousedown mouseup click 事件。轻击不可单击的元素不会发生任何事件。可单击的元素是指那些单击可产生默认操作的元素或者那些已经被指定了onclick事件处理程序的元素。</li>
<li>mousemove 事件也会触发 mouseover 和 mouseout事件。</li>
<li>两个手指放在屏幕上且页面随手指移动而滚动时会触发 mousewheel 和 scroll事件。</li>
</ul>


<h3>13.4.4 键盘与文本事件</h3>
<p>DOM3 级有3个键盘事件和1个文本事件</p>
<ul>
<li>keydown: 当用户按下<strong>任意键</strong>触发，如果按着不放，会重复触发此事件。</li>
<li>keypress: 当用户按下<strong>字符键</strong>触发，如果按着不放，会重复触发此事件。</li>
<li>keyup: 当用户释放键盘上的键时触发。</li>
<li>textInput: 在文本插入文本框之前会触发该事件</li>
</ul>
<p>当用户在一个文本框内按下一个字符键，事件的触发顺序为：keydown，keypress，textInput，keyup。</p>
<p>键码可通过event的 keyCode 或 which 属性跟踪，字符编码可通过 charCode 跟踪（在chrome上试验，keycode which 正常显示编码；code 会显示"KeyF" "ArrowRight" 等字符描述；charCode 始终为0）</p>
<h3>13.4.5 复合事件</h3>
<h3>13.4.6 变动事件</h3>
<h3>13.4.7 HTML5事件</h3>
<h3>13.4.8 设备事件</h3>
<h3>13.4.9 触摸与手势事件</h3>
<p>在触摸屏幕上的元素时，这些事件（包括鼠标事件）发生的顺序如下：touchstart mouseover mousemove（一次） mousedown mouseup click touchend。</p>
<p>iOS2.0中的Safari还引入了一组手势事件。当两个手指触摸屏幕时就会产生手势，手势通常会改变显示项的大小，或者旋转显示项，有三个手势事件：gesturestart gesturechange gestureend。</p>
</div>

<div>
<h2>13.5 内存和性能</h2>
<p>在 JavaScript 中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。首先，每个函数都是对象，都会占用内存；内存中的对象越多，性能越差。其次，必须事先指定所有事件处理程序而导致的DOM访问次数，会延迟整个页面的交互就绪时间。</p>
<h3>13.5.1 事件委托</h3>
<p>对“事件处理程序过多”问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如，click事件会一直冒泡到document层次。使用事件委托，只需在DOM树中尽量最高的层次上添加一个事件处理程序。</p>
<p>如果可行的话，也可以考虑为 document 对象添加一个事件处理程序，用以处理页面上发生的某种特定类型的事件。这样做具有如下优点：</p>
<ul>
<li>document 对象很快就可以访问，而且可以在页面生命周期的任何时点上为它添加事件处理程序。也就是说，只要可单击的元素呈现在页面上，就可以立即具备适当的功能。</li>
<li>只添加一个事件处理程序所需的DOM引用更少，所花的时间也更少。</li>
<li>整个页面占用的内存空间更少，能够提升整体性能。</li>
</ul>
<p>最适合采用事件委托技术的事件包括：click mousedown mouseup keydown keyup 和 keypress，虽然mouseover 和 mouseout 事件也冒泡，但要适当处理他们并不容易，而且经常需要计算元素的位置。</p>

<h3>13.5.2 移除事件处理程序</h3>
<p>每当将事件处理程序指定给元素时，运行中的浏览器代码与支持页面交互的JS代码之间就会建立一个连接，这种连接越多，页面执行起来就越慢。如前所述，可以采用事件委托技术，限制建立的连接数量，另外，在不需要的时候移除事件处理程序，也是解决这个问题的一种方案。</p>
<p>内存中留有那些过时不用的“空事件处理程序”也是造成web应用程序内存与性能问题的主要原因。在两种情况下，可能会造成上述问题，第一种情况就是从文档中移除带有事件处理程序的元素时。如果带有事件处理程序的元素被 innerHTML 删除了，那么原来添加到元素中的事件处理程序极有可能无法被当做垃圾回收。另外一种情况，就是卸载页面的时候。</p>
</div>

<div>
<h2>13.6 模拟时间</h2>
<p>可以使用 JavaScript 在任意时刻来触发特定的事件，而此时的事件就如同浏览器创建的事件一样。在测试Web应用程序时，模拟触发事件是一种及其有用的技术。</p>
<h3>13.6.1 DOM 中的事件模拟</h3>
<p>可以在 document 对象上使用 createEvent() 方法创建 event 对象。这个方法接收一个参数，即表示要创建的事件类型的字符串。在 DOM2 级中，所有这些字符串都使用英文复数形式，而在 DOM3 级中都变成了单数。</p>
<ul>
<li>UIEvents: 一般化的UI事件，鼠标事件和键盘事件都继承自UI事件。DOM3 中是 UIEvent</li>
<li>MouseEvents: 一般化的鼠标事件。DOM3 中是 MouseEvent</li>
<li>MutationEvents: 一般化的 DOM 变动事件。DOM3 中是 MutationEvent</li>
<li>HTMLEvents: 一般化的 HTML 事件。没有对应的 DOM3 事件。</li>
</ul>
<h4>模拟鼠标事件</h4>
<pre>
var btn = document.getElementById("myBtn");  //具体见 P406
var event = document.createEvent("MouseEvents");
event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
btn.dispatchEvent(event);
</pre>
<h4>模拟键盘事件</h4>
</div>


