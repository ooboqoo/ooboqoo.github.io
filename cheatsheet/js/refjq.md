# jQuery References

<style>
  td:first-child { color: red; }
  td[colspan] { color: initial; font-weight: 600; }
  em { color: gray; }
</style>

## jQuery 选择器

jQuery 选择器是 CSS 选择器的超集，像“匹配元素间定位”、属性选择器中的“!=” 以及“其他选择符”中的一些选择符 CSS 中没有。

### 简单选择器

 选择器         |     示 例     | 描 述
 -------------- | ------------- | -------
 $('#_id_')     | $('#article') | 根据给定的 id 匹配一个元素
 $('._class_')  | $('.intro')   | 根据给定的类目匹配元素
 $('_element_') | $('p')        | 根据给定的元素名匹配元素
 $('*')         | $('*')        | 匹配所有元素
 $('_selector1_, _selector2_, ...') | $('h1, div, p') | 将每一个选择器匹配到的元素合并后一起返回

### 层次选择器

 选择器                       |     示 例      | 描 述
 ---------------------------- | -------------- | -------
 $('_ancestor_ _descendant_') | $('div .demo') | 后代元素，注意区别 $("div .demo") 与 $("div.demo")
 $('_parent_>_child_')        | $('div>p')     | 子代元素
 $('_prev_+_next_')           | $('div+p')     | 紧邻元素
 $('_prev_~_siblings_')       | $('div~p')     | 兄弟元素

### 过滤选择器 - 匹配元素间定位

 选择器 |    示 例     | 描 述
 ------ | ------------ | -------
 :first | $('p:first') | 选取第一个元素
 :last  | $('p:last')  | 选取最后一个元素
 :even  | $('tr:even') | 选取索引是偶数的所有元素，索引从0开始
 :odd   | $('tr:odd')  | 选取索引是奇数的所有元素，索引从0开始
 :eq(_index_)     | $('ul li:eq(3)')       | 选取索引等于 index 的元素，索引从0开始
 :gt(_no_)        | $('ul li:gt(3)')       | 选取索引等于 no 的元素，索引从0开始
 :lt(_no_)        | $('ul li:lt(3)')       | 选取索引等于 no 的元素，索引从0开始
 :not(_selector_) | $('input:not(:empty)') | 去除所有与给定选择器匹配的元素

### 过滤选择器 - 同辈元素间定位

   选择器    |     示 例      | 描 述
 -------------------- | -------------- | -------
 :first-child         | $('p:first-child')    | 选取每个父元素的第一个子元素
 :last-child          | $('p:last-child')     | 选取每个父元素的最后一个子元素
 :only-child          | $('p:only-child')     | 如果某个元素是其父元素中的唯一元素，则匹配
 :nth-child(_n_)      | $('p:nth-child(2)')   | <span style="color: #00f;">从1开始计数</span>
 :nth-last-child(_n_) | $('p:nth-last-child(2)') | 从后往前数；取值：index even odd 或公式
 :first-of-type       | $('p:first-of-type')  | 
 :last-of-type        | $('p:last-of-type')   | 
 :only-of-type        | $('p:only-of-type')   | 
 :nth-of-type(_n_)    | $('p:nth-of-type(2)') | 
 :nth-last-of-type(_n_) | $('p:nth-last-of-type(2)') | 

特别注意 :nth-child() 是唯一一个从1开始计数的，另外，括号内可以是公式，如 2n 2n+1 3n 等

### 过滤选择器 - 其他

   选择器    |     示 例      | 描 述
 ----------- | -------------- | -------
 :root       | $(':root')     | 选取根元素，即 html
 :header     | $(':header')   | 选取所有标题元素，如 h1, h2 ...
 :contains(_text_) | $(':contains("Hello")') | 选取含有特定文本内容的元素
 :empty      | $(':empty')    | 选取不包含子元素或者文本的元素
 :has(_selector_)  | $('div:has(p)')         | 选取含有选择器所匹配元素的元素
 :parent     | $(':parent')   | 选取所有包含子元素或文本元素的元素
 :focus      | $(':focus')    | 选取当前获取焦点的元素
 :animated   | $(':animated') | 选取当前正在执行动画的元素
 :hidden     | $('p:hidden')  | 选取所有不可见的元素
 :visible    | $('p:visible') | 选取所有可见元素
 :target     | $('p:target')  | 当前激活标签元素
 :lang(_language_) | $('p:lang(de)')         | 包含特定语言定义的元素

### 属性选择器 

   选择器    |     示 例      | 描 述
 -------------------- | -------------- | -------
 [_attribute_] | $('[href]') | 选取拥有此属性的元素
 [_attribute_="_value_"] | $('[href="default.htm"]') | 严相等
 [_attribute_!="_value_"] | $('[href!="default.htm"]') | 不等
 [_attribute_^=_"value"_] | $('[title^="Tom"]') | 开头
 [_attribute_$=_"value"_] | $('[href$=".jpg"]') | 结尾
 [_attribute_&#124;=_"value"_] | $('[title&#124;="Tomorrow"]') | 宽相等，可接连字符 `-`
 [_attribute_~=_"value"_] | $('[title~="hello"]') | 独立单词
 [_attribute_*=_"value"_] | $('[title*="hello"]') | 片段
 [_attribute1_][_attribute2_] | $('[title][href]') | 组合属性选择器

### 表单选择器

   选择器  |     示 例      | 描 述
 --------- | -------------- | -------
 :input    | $(':input')    | 选取所有 `<input> <textarea> <select> <button>` 元素
 :text     | $(':text')     | 选取所有的单行文本框 type="text"
 :password | $(':password') | 选取所有的密码框 type="password"
 :radio    | $(':radio')    | 选取所有的单选框 type="radio"
 :checkbox | $(':checkbox') | 选取所有的复选框 type="checkbox"
 :submit   | $(':submit')   | 选取所有的提交按钮 type="submit"
 :reset    | $(':reset')    | 选取所有的重置按钮 type="reset"
 :button   | $(':button')   | 选取所有的按钮 type="button"
 :image    | $(':image')    | 选取所有的图像按钮 type="image"
 :file     | $(':file')     | 选取所有的上传域 type="file"
 :enabled  | $(':enabled')  | 选取所有可用元素
 :disabled | $(':disabled') | 选取所有不可用元素
 :checked  | $(':checked')  | 选取所有被选中元素（单选 复选）
 :selected | $(':selected') | 选取所有被选中的选项元素（下拉列表）

:enabled :disabled :selected :checked 这4项属于属性过滤选择器，另外请注意 `:input` 与 `input` 的区别。

## jQuery DOM 遍历

### 筛选元素

 选择器                       | 描 述
 ---------------------------- | -------
 .filter(_selector / filter_) | 通过选择器或测试函数筛选
 .not(_selector_)             | 删除与选择器匹配的元素
 .has(_selector_)             | 选取具有特定后代元素的元素
 .eq(_index_)                 | 从匹配的元素集合中取得一个指定位置的元素，从0开始计数
 .first()                     | 获取元素集合中的第一个元素
 .last()                      | 选取元素集合中的最后一个元素
 .slice(_start, [end]_)       | 截取给定范围内的元素，从0开始计数

### 后代元素

 选择器                  | 描 述
 ----------------------- | -------
 .find(_selector_)       | 获得匹配元素的 **后代元素**
 .children([_selector_]) | 取得匹配元素的 **子元素(不含文本和注释节点)**
 .contents()             | 取得匹配元素的 **子元素(包含文本和注释节点)**

### 同辈元素

 选择器                             | 描 述
 ---------------------------------- | -------
 .siblings(_[selector]_)            | Returns all sibling elements of the selected element
 .next(_[selector]_)                | Returns the next sibling element of the selected element
 .nextAll(_[selector]_)             | Returns all next sibling elements of the selected element
 .nextUntil(_[selector], [filter]_) | Returns all next sibling elements between two given arguments
 .prev(_[selector]_)                | Returns the previous sibling element of the selected element
 .prevAll(_[selector]_)             | Returns all previous sibling elements of the selected element
 .prevUntil(_[selector], [filter]_) | Returns all previous sibling elements between two given arguments

### 祖先元素

 选择器                             | 描 述
 ---------------------------------- | -------
 .parent(_[selector]_)              | Returns the direct parent element of the selected element
 .parents(_[selector]_)             | Returns all ancestor elements of the selected element
 .parentsUntil(_[selector], [filter]_) | Returns all ancestor elements between two given arguments
 .closest(_[selector]_)             | Returns the first ancestor of the selected element (从自身开始往上找)
 .offsetParent()                    | Returns the first positioned parent element

### 集合操作

 选择器                 | 描 述
 ---------------------- | -------
 .add(_selector_)       | 在现有集合基础上再添加匹配元素
 .addBack(_[selector]_) | 将前一个集合的元素添加到现有集合中，可提供一个可选的选择器在添加前先过滤元素
 .end()                 | 结束最近一次筛选操作回到先前的集合状态
 .map(_callback_)       | 将集合中的元素逐个传递给回调函数处理，再用返回的结果生成一个新的 jQuery 对象
 .pushStack(_elements_) | 给元素集合添加新元素

### 操作选中的元素

 选择器             | 描 述
 ------------------ | -------
 .is(_selector_)    | Checks the set of matched elements against a selector/element/jQuery object, and return true if at least one of these elements matches the given arguments
 .each(_callback_)  | Executes a function for each matched element
 .index(_element_)  | Search for a given element from among the matched elements.
 .index()           | Gets the index of the matched element in ralation to its siblings.
 $.contains(_a, b_) | Determines whether DOM node b contains DOM node a.
 .length            | Gets the number of matched elements.
 .get(_index_)      | Gets the DOM node corresponding to the matched elements.
 .get()             | Gets an array of DOM nodes corresponding to the matched elements.
 .toArray()         | Gets an array of DOM nodes corresponding to the matched elements.

## jQuery 事件

### Binding 事件绑定

<table>
<tbody>
<tr><th>Event method</th><th>Description</th></tr>
<tr><td>.ready(<em>handler</em>)</td><td>Binds handler to be called when the DOM and CSS are fully loaded.</td></tr>
<tr><td>.on(<em>type, [selector], [data], handler</em>)</td><td>Binds handler to be called when the given type of event is sent to the element. If selector is provided, performs event delegation.</td></tr>
<tr><td>.on(<em>events, [selector], [data]</em>)</td><td>Binds multiple handlers for events as specified in the events object parameter.</td></tr>
<tr><td>.off(<em>type, [selector], [handler]</em>)</td><td>Removes bindings on the element.</td></tr>
<tr><td>.bind(<em>type, [data], handler</em>)</td><td>Binds handler to be called when the given type of event is sent to the element. In general, use .on(<em></em>) instead.</td></tr>
<tr><td>.one(<em>type, [data], handler</em>)</td><td>Binds handler to be called when the given type of event is sent to the element. Removes the binding when the handler is called.</td></tr>
<tr><td>.unbind(<em>[type], [handler]</em>)</td><td>Removes the bindings on the element (<em>for an event type, a particular handler, or all bindings</em>).</td></tr>
<tr><td>.delegate(<em>selector, type, [data], handler</em>)</td><td>Binds handler to be called when the given type of event is sent to a descendant element matching selector.</td></tr>
<tr><td>.delegate(<em>selector, handlers</em>)</td><td>Binds a collection of handlers to be called when the given types of events are sent to a descendant element matching selector.</td></tr>
<tr><td>.undelegate(<em>selector, type, [handler]</em>)</td><td>Removes the bindings on the element previously bound with .delegate(<em></em>).</td></tr>
</tbody>
</table>

### Shorthand binding 绑定简写方式

<table>
<tbody>
<tr><th>Event method</th><th>Description</th></tr>
<tr><td>.blur(<em>handler</em>)</td><td>Binds handler to be called when the element loses keyboard focus.</td></tr>
<tr><td>.change(<em>handler</em>)</td><td>Binds handler to be called when the element's value changes.</td></tr>
<tr><td>.click(<em>handler</em>)</td><td>Binds handler to be called when the element is clicked.</td></tr>
<tr><td>.dblclick(<em>handler</em>)</td><td>Binds handler to be called when the element is double-clicked.</td></tr>
<tr><td>.error(<em>handler</em>)</td><td>Binds handler to be called when the element receives an error event (<em>browser-dependent</em>).</td></tr>
<tr><td>.focus(<em>handler</em>)</td><td>Binds handler to be called when the element gains keyboard focus.</td></tr>
<tr><td>.focusin(<em>handler</em>)</td><td>Binds handler to be called when the element, or a descendant, gains keyboard focus.</td></tr>
<tr><td>.focusout(<em>handler</em>)</td><td>Binds handler to be called when the element, or a descendant, loses keyboard focus.</td></tr>
<tr><td>.keydown(<em>handler</em>)</td><td>Binds handler to be called when a key is pressed and the element has keyboard focus.</td></tr>
<tr><td>.keypress(<em>handler</em>)</td><td>Binds handler to be called when a keystroke occurs and the element has keyboard focus.</td></tr>
<tr><td>.keyup(<em>handler</em>)</td><td>Binds handler to be called when a key is released and the element has keyboard focus.</td></tr>
<tr><td>.load(<em>handler</em>)</td><td>Binds handler to be called when the element finishes loading.</td></tr>
<tr><td>.mousedown(<em>handler</em>)</td><td>Binds handler to be called when the mouse button is pressed within the element.</td></tr>
<tr><td>.mouseenter(<em>handler</em>)</td><td>Binds handler to be called when the mouse pointer enters the element. Not affected by event bubbling.</td></tr>
<tr><td>.mouseleave(<em>handler</em>)</td><td>Binds handler to be called when the mouse pointer leaves the element. Not affected by event bubbling.</td></tr>
<tr><td>.mousemove(<em>handler</em>)</td><td>Binds handler to be called when the mouse pointer moves within the element.</td></tr>
<tr><td>.mouseout(<em>handler</em>)</td><td>Binds handler to be called when the mouse pointer leaves the element.</td></tr>
<tr><td>.mouseover(<em>handler</em>)</td><td>Binds handler to be called when the mouse pointer enters the element.</td></tr>
<tr><td>.mouseup(<em>handler</em>)</td><td>Binds handler to be called when the mouse button is released within the element.</td></tr>
<tr><td>.resize(<em>handler</em>)</td><td>Binds handler to be called when the element is resized.</td></tr>
<tr><td>.scroll(<em>handler</em>)</td><td>Binds handler to be called when the element's scroll position changes.</td></tr>
<tr><td>.select(<em>handler</em>)</td><td>Binds handler to be called when text in the element is selected.</td></tr>
<tr><td>.submit(<em>handler</em>)</td><td>Binds handler to be called when the form element is submitted.</td></tr>
<tr><td>.unload(<em>handler</em>)</td><td>Binds handler to be called when the element is unloaded from memory.</td></tr>
<tr><td>.hover(<em>enter, leave</em>)</td><td>Binds enter to be called when the mouse enters the element, and leave to be called when the mouse leaves it. jQuery 自定义的合成事件。</td></tr>
</tbody>
</table>

### Triggering 触发事件

<table>
<tbody>
<tr><th>Event method</th><th>Description</th></tr>
<tr><td>.trigger(<em>type, [data]</em>)</td><td>Triggers handlers for the event on the element and executes the default action for the event.</td></tr>
<tr><td>.triggerHandler(<em>type, [data]</em>)</td><td>Triggers handlers for the event on the element without executing any default actions. 只执行 jQuery 绑定的监听函数而不会真正触发事件(从而执行其他监听函数)。</td></tr>
<tr><td colspan="2">Shorthand triggering</td></tr>
<tr><td>.blur(<em></em>)</td><td>Triggers the  blur event.</td></tr>
<tr><td>.change(<em></em>)</td><td>Triggers the change event.</td></tr>
<tr><td>.click(<em></em>)</td><td>Triggers the click event. 链接不支持触发点击事件，不同浏览器对于 element.click() 的处理有所不同</td></tr>
<tr><td>.dblclick(<em></em>)</td><td>Triggers the dblclick event.</td></tr>
<tr><td>.error(<em></em>)</td><td>Triggers the error event.</td></tr>
<tr><td>.focus(<em></em>)</td><td>Triggers the focus event.</td></tr>
<tr><td>.keydown(<em></em>)</td><td>Triggers the keydown event.</td></tr>
<tr><td>.keypress(<em></em>)</td><td>Triggers the keypress event.</td></tr>
<tr><td>.keyup(<em></em>)</td><td>Triggers the keyup event.</td></tr>
<tr><td>.select(<em></em>)</td><td>Triggers the selec t event.</td></tr>
<tr><td>.submit(<em></em>)</td><td>Triggers the submit event.</td></tr>
<tr><td colspan="2">Utility</td></tr>
<tr><td>$.proxy(<em>fn, context</em>)</td><td>Creates a new function that executes with the given context.</td></tr>
</tbody>
</table>

## jQuery 动画

### Predefined effects

<table>
<tbody>
<tr><th>Effect method</th><th>Description</th></tr>
<tr><td>.show(<em>[speed], [callback]</em>)</td><td>Displays the matched elements by animating height, width, and opacity.<br>控制的是 display 属性，会根据 .hide()方法的记录以及标签自动判断使用 block 和 inline-block 或其他值</td></tr>
<tr><td>.hide(<em>[speed], [callback]</em>)</td><td>Hides the matched elements by animating height, width, and opacity.</td></tr>
<tr><td>.toggle(<em>[speed], [callback]</em>)</td><td>Displays or hides the matched elements.</td></tr>
<tr><td>.slideDown(<em>[speed], [callback]</em>)</td><td>Displays the matched elements with a sliding motion. 改变高度</td></tr>
<tr><td>.slideUp(<em>[speed], [callback]</em>)</td><td>Hides the matched elements with a sliding motion.</td></tr>
<tr><td>.slideToggle(<em>[speed], [callback]</em>)</td><td>Displays or hides the matched elements with a sliding motion.</td></tr>
<tr><td>.fadeIn(<em>[speed], [callback]</em>)</td><td>Displays the matched elements by fading them to opaque. 改变不透明度</td></tr>
<tr><td>.fadeOut(<em>[speed], [callback]</em>)</td><td>Hides the matched elements by fading them to transparent.</td></tr>
<tr><td>.fadeToggle(<em>[speed], [callback]</em>)</td><td>Displays or hides the matched elements with a fading animation.</td></tr>
<tr><td>.fadeTo(<em>speed, opacity, [callback]</em>)</td><td>Adjusts the opacity of the matched elements.</td></tr>
</tbody>
</table>

speed 的取值：slow normal fast 或 毫秒数。

### Custom animations

<table>
<tbody>
<tr><th>Effect method</th><th>Description</th></tr>
<tr><td>.animate(<em>{properties}, [speed], [easing], [callback]</em>)</td><td>Performs a custom animation of the specified CSS properties.</td></tr>
<tr><td>.animate(<em>{properties}, {options}</em>)</td><td>A lower-level interface to .animate(), allowing control over the animation queue.</td></tr>
</tbody>
</table>

### Queue manipulation

<table>
<tbody>
<tr><th>Effect method</th><th>Description</th></tr>
<tr><td>.queue(<em>[queueName]</em>)</td><td>Retrieves the queue of functions on the first matched element.</td></tr>
<tr><td>.queue(<em>[queueName], callback</em>)</td><td>Adds callback to the end of the queue.<br>对此项的理解是，将callback作为队列一员插入当前位置。因为正常的动画函数都会在执行完后调用dequeue，所以callback函数内部最后也必须调用一次dequeue</td></tr>
<tr><td>.queue(<em>[queueName], newQueue</em>)</td><td>Replaces the queue with a new one.</td></tr>
<tr><td>.dequeue(<em>[queueName]</em>)</td><td>Executes the next function on the queue.</td></tr>
<tr><td>.clearQueue(<em>[queueName]</em>)</td><td>Empties the queue of all pending functions.</td></tr>
<tr><td>.stop(<em>[clearQueue], [jumpToEnd]</em>)</td><td>Stops the currently running animation, then starts queued animations, if any.</td></tr>
<tr><td>.finish(<em>[queueName]</em>)</td><td>Stops the currently running animation and immediately advances all queued animations to their target values.</td></tr>
<tr><td>.delay(<em>duration, [queueName]</em>)</td><td>Waits duration milliseconds before executing the next item in the queue.</td></tr>
<tr><td>.promise(<em>[queueName], [target]</em>)</td><td>Returns a promise object to be resolved once all queued actions on the collection have finished.</td></tr>
</tbody>
</table>

## jQuery DOM 操作

### 特性和属性

Method | Description
------ | -----------
.attr(_key_) | Gets the attribute named key.
.attr(_key, value_) | Sets the attribute named key to value.
.attr(_key, fn_) | Sets the attribute named key to the result of fn (called separately on each matched element).
.attr(_obj_) | Sets attribute values given as key-value pairs.
.removeAttr(_key_) | Removes the attribute named key.
.prop(_key_) | Gets the property named key. jq1.6 新添加，注意与 attr 的区别和联系
.prop(_key, value_) | Sets the property named key to value.
.prop(_key, fn_) | Sets the property named key to the result of fn (called separately on each matched element).
.prop(_obj_) | Sets property values given as key-value pairs.
.removeProp(_key_) | Removes the property named key.
.addClass(_class_) | Adds the given class ( or more space-separated classes) to each matched element.
.removeClass(_class_) | Removes the given class from each matched element.
.toggleClass(_class_) | Removes the given class if present, and adds it if not, for each matched element.
.hasClass(_class_) | Returns true if any of the matched elements has the given class.
.val() | Gets the value attribute of the first matched element. This method is primarily used to get the values of form elements.
.val(_value / fn_) | Sets the value attribute of each element to value.

### CSS

Method | Description
 ----- | -----------
.css(_key / keys_)  | 返回首个匹配元素的一个或多个属性的计算值，多个属性名以数组形态提供
.css(_key, value / fn_) | 给所有匹配元素的某个样式属性设置值 fn(index, value): String or Number
.css(_obj_) | 给所有匹配元素的多个样式属性设置值 obj 为包含多个键值对的对象
.offset()   | Gets the top and left pixel coordinates of the first matched element, relative to the viewport.
.position() | Gets the top and left pixel coordinates of the first matched element, relative to the element returned by .offsetParent().
.scrollTop()         | Gets the vertical scroll position of the first matched element.
.scrollTop(_value_)  | Sets the vertical scroll position of all matched elements to value.
.scrollLeft()        | Gets the horizontal scroll position of the first matched element.
.scrollLeft(_value_) | Sets the horizontal scroll position of all matched elements to value.
.height()            | 获取首个匹配元素的计算高度值，返回值以 px 计量，但不带单位
.height(_value_)     | 为每个匹配元素设定高度值，参数不能带单位
.width(_[value]_)    | 读取或设定宽度
.innerHeight()       | 获取首个匹配元素的计算高度(含 padding 不含 border)
.innerWidth()        | 获取首个匹配元素的计算宽度(含 padding 不含 border)
.outerHeight(_[includeMargin]_) | 获取首个匹配元素的计算高度(含 padding border 默认不含 margin)
.outerWidth(_[includeMargin]_)  | 获取首个匹配元素的计算宽度(含 padding border 默认不含 margin)

### 文档处理

<table>
<tbody><tr><th>Method</th><th>Description</th></tr>
<tr><td colspan="2">Content 内容</td></tr>
<tr><td>.html()</td><td>Gets the HTML content of the first matched element.</td></tr>
<tr><td>.html(<em>value</em>)</td><td>Sets the HTML content of each matched element to value.</td></tr>
<tr><td>.text()</td><td>Gets the textual content of all matched elements as a single string.</td></tr>
<tr><td>.text(<em>value</em>)</td><td>Sets the textual content of each matched element to value.</td></tr>
<tr><td colspan="2">Insertion 插入</td></tr>
<tr><td>.append(<em>content</em>)</td><td>Inserts content at the end of the interior of each matched element. 在被选元素的结尾插入内容</td></tr>
<tr><td>.appendTo(<em>selector</em>)</td><td>Inserts the matched elements at the end of the interior of the elements matched by selector.</td></tr>
<tr><td>.prepend(<em>content</em>)</td><td>Inserts content at the beginning of the interior of each matched element. 在被选元素的开头插入内容</td></tr>
<tr><td>.prependTo(<em>selector</em>)</td><td>Inserts the matched elements at the beginning of the interior of the elements matched by selector.</td></tr>
<tr><td>.after(<em>content</em>)</td><td>Inserts content after each matched element. 在被选元素之后插入内容</td></tr>
<tr><td>.insertAfter(<em>selector</em>)</td><td>Inserts the matched elements after each of the elements matched by selector.</td></tr>
<tr><td>.before(<em>content</em>)</td><td>Inserts content before each matched element. 在被选元素之前插入内容</td></tr>
<tr><td>.insertBefore(<em>selector</em>)</td><td>Inserts the matched elements before each of the elements matched by selector.</td></tr>
<tr><td>.wrap(<em>content</em>)</td><td>Wraps each of the matched elements within content.</td></tr>
<tr><td>.wrapAll(<em>content</em>)</td><td>Wraps all of the matched elements as a single unit within content.<br>如果成员位置不在一起的话，会被挪到一起再打包</td></tr>
<tr><td>.wrapInner(<em>content</em>)</td><td>Wraps the interior contents of each of the matched elements within content.<br>包裹元素放在每个匹配元素内部，即包裹成员内容而非成员本身</td></tr>
<tr><td colspan="2">Replacement 更换</td></tr>
<tr><td>.replaceWith(<em>content</em>)</td><td>Replaces the matched elements with content.<br>完成替换后会返回被替换元素，但被替换元素中的全部事件都将消失。</td></tr>
<tr><td>.replaceAll(<em>selector</em>)</td><td>Replaces the elements matched by selector with the matched elements.<br>一旦完成替换，被替换元素消失。</td></tr>
<tr><td colspan="2">Removal 删除</td></tr>
<tr><td>.empty()</td><td>Removes the child nodes of each matched element.</td></tr>
<tr><td>.remove(<em>[selector]</em>)</td><td>Removes the matched nodes (optionally filtered by selector) from the DOM.</td></tr>
<tr><td>.detach(<em>[selector]</em>)</td><td>Removes the matched nodes (optionally filtered by selector) from the DOM, preserving jQuery data attached to them. <br>与 remove 唯一的不同是不移除元素上绑定的事件及数据</td></tr>
<tr><td>.unwrap()</td><td>Removes the element's parent.</td></tr>
<tr><td colspan="2">Copying 复制</td></tr>
<tr><td>.clone(<em>[withHandlers], [deepWithHandlers]</em>)</td><td>Makes a <b>deep</b> copy of all matched elements, optionally also copying event handlers.</td></tr>
<tr><td colspan="2">Data 数据功能</td></tr>
<tr><td>.data(<em>key</em>)</td><td>Gets the data item named key associated with the first matched element.<br><a href="https://blog.netsh.org/posts/html-data-jquery_1812.netsh.html">HTML5 自定义属性 data-* 和 jQuery.data 详解</a></td></tr>
<tr><td>.data(<em>key, value</em>)</td><td>Sets the data item named key associated with each matched element to value.<br> jQuery 将信息存储在内部中央信息模块中，不会反映到HTML元素上，注意与 dataset API 区别。</td></tr>
<tr><td>.removeData(<em>key</em>)</td><td>Removes the data item named key associated with each matched element.</td></tr>
</tbody>
</table>

## jQuery Ajax

### Ajax 请求

 Method | Description
 ------ | ------------
.load(_url, [data], [callback]_) | 载入远程代码并插入DOM中
$.get(_url, [data], [callback], [returnType]_) | 通过 GET 请求加载远程页面
$.post(_url, [data], [callback], [returnType]_) | 通过 POST 请求加载远程页面
$.getScript(_url, [callback]_) | 载入并执行 JavaScript 文件
$.getJSON(_url, [data], [callback]_) | 载入并解析 JSON 数据，该方式同时支持 JSONP 协议
[$.ajax(_[url], options_)](http://api.jquery.com/jQuery.ajax/) | 加载远程页面的最底层方法，提供更多控制功能

### Ajax 全局事件

 Method | Description
 ------ | ------------
.ajaxComplete(_handler_) | Binds handler to be called when any Ajax transaction completes.
.ajaxError(_handler_) | Binds handler to be called when any Ajax transaction completes with an error.
.ajaxSend(_handler_) | Binds handler to be called when any Ajax transaction begins.
.ajaxStart(_handler_) | Binds handler to be called when any Ajax transaction begins, and no others are active.
.ajaxStop(_handler_) | Binds handler to be called when any Ajax transaction ends, and no others are still active.
.ajaxSuccess(_handler_) | Binds handler to be called when any Ajax transaction completes successfully.

### Ajax 配置

 Method | Description
 ------ | ------------
$.ajaxSetup(_options_) | Sets default options for all subsequent Ajax transactions.
$.ajaxPrefilter(_[dataTypes], handler_) | Modifies the options on each Ajax request before it is processed by $.ajax().
$.ajaxTransport(_transportFunct ion_) | Defines a new transport mechanism for Ajax transactions.

### Ajax 实用方法

 Method | Description
 ------ | ------------
.serialize() | Encodes the values of a set of form controls into a query string.
.serializeArray() | Encodes the values of a set of form controls into a JavaScript data structure.
$.param(_obj_) | Encodes an arbitrary object of key-value pairs into a query string.
$.globalEval(_code_) | Evaluates the given JavaScript string in the global context.
$.parseJSON(_json_) | Converts the given JSON string into a JavaScript object.
$.parseXML(_xml_) | Converts the given XML string into an XML document.
$.parseHTML(_html_) | Converts the given HTML string into a set of DOM elements.

<div>
<h2 id="misc">Miscellaneous properties and functions</h2>
<table>
<tbody><tr><th>Method</th><th>Description</th></tr>
<tr><td colspan="2">Properties of the jQuery object</td></tr>
<tr><td>$.support</td><td>jQuery内部使用，不推荐外部使用。</td></tr>
<tr><td colspan="2">Arrays and objects</td></tr>
<tr><td>$.each(<em>collection, callback</em>)</td><td>Iterates over collection, executing callback for each item.</td></tr>
<tr><td>$.extend(<em>[deep], target, addition, ...</em>)</td><td>用数个对象来扩展一个对象，返回被扩展的对象。如果只传了一个参数，则附加到当前 jQuery 对象上；如果有同名属性，原属性值会被覆盖。</td></tr>
<tr><td>$.fn.extend(<em>object</em>)</td><td>用于给 jQuery.fn 原型对象添加方法，开发插件时使用。</td></tr>
<tr><td>$.grep(<em>array, callback, [invert]</em>)</td><td>Filters array by using callback as a test.</td></tr>
<tr><td>$.makeArray(<em>object</em>)</td><td>Converts object into an array.</td></tr>
<tr><td>$.map(<em>array, callback</em>)</td><td>Constructs a new array consisting of the result of callback being called on each item.</td></tr>
<tr><td>$.inArray(<em>value, array</em>)</td><td>Determines whether value is in array.</td></tr>
<tr><td>$.merge(<em>array1, array2</em>)</td><td>Combines the contents of array1 and array2.</td></tr>
<tr><td>$.unique(<em>array</em>)</td><td>Removes any duplicate DOM elements from array.</td></tr>
<tr><td colspan="2">Object introspection</td></tr>
<tr><td>$.isArray(<em>object</em>)</td><td>Determines whether object is a true JavaScript array.</td></tr>
<tr><td>$.isEmptyObject(<em>object</em>)</td><td>Determines whether object is empty.</td></tr>
<tr><td>$.isFunction(<em>object</em>)</td><td>Determines whether object is a function.</td></tr>
<tr><td>$.isPlainObject(<em>object</em>)</td><td>Determines whether object was created as an object literal or with new Object.</td></tr>
<tr><td>$.isNumeric(<em>object</em>)</td><td>Determines whether object is a numeric scalar value.</td></tr>
<tr><td>$.isWindow(<em>object</em>)</td><td>Determines whether object represents a browser window.</td></tr>
<tr><td>$.isXMLDoc(<em>object</em>)</td><td>Determines whether object is an XML node.</td></tr>
<tr><td>$.type(<em>object</em>)</td><td>Gets the JavaScript class of object.</td></tr>
<tr><td colspan="2">Other</td></tr>
<tr><td>$.trim(<em>string</em>)</td><td>Removes whitespace from the ends of string.</td></tr>
<tr><td>$.noConflict(<em>[removeAll]</em>)</td><td>Reverts $ to its pre-jQuery definition.</td></tr>
<tr><td>$.noop()</td><td>A function that does nothing.</td></tr>
<tr><td>$.now()</td><td>The current time in milliseconds since the epoch.</td></tr>
<tr><td>$.holdReady(<em>hold</em>)</td><td>Stops the  ready event from being triggered, or releases this hold.</td></tr>
</tbody></table>
</div>

 Method | Description
 ------ | ------------
jQuery( _selector [, context ]_ ) | Accepts a string containing a CSS selector which is then used to match a set of elements.
jQuery( _element / elementArray_ )  | 
jQuery( _html [, ownerDocument ]_ ) | Creates DOM elements on the fly from the provided string of raw HTML.
jQuery( _html, attributes_ )  | 
jQuery( _callback_ )  | Binds a function to be executed when the DOM has finished loading.
