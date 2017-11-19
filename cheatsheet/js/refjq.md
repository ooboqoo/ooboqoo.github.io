<style>
  td:first-child { color: red; }
  td[colspan] { color: initial; font-weight: 600; }
  em { color: gray; }
</style>

# jQuery References


## jQuery 选择器

jQuery 选择器是 CSS 选择器的超集。

### 简单选择器

||||
|----------------|---------------|--------------------------------------
| $('#_id_')     | $('#article') | id 匹配
| $('._class_')  | $('.intro')   | 类名匹配
| $('_element_') | $('p')        | 元素名匹配
| $('*')         | $('*')        | 匹配所有元素
| $('_selector1_, _selector2_, ...') | $('h1, div, p') | 多个匹配项合并

### 层次选择器

||||
|------------------------------|----------------|----------------------------------------------------
| $('_ancestor_ _descendant_') | $('div .demo') | 后代元素，注意区别 $("div .demo") 与 $("div.demo")
| $('_parent_>_child_')        | $('div>p')     | 子代元素
| $('_prev_+_next_')           | $('div+p')     | 紧邻元素
| $('_prev_~_siblings_')       | $('div~p')     | 兄弟元素

### 属性选择器

||||
|-------------------------------|-------------------------------|-------------------------
| [_attribute_]                 | $('[href]')                   | 带某属性
| [_attribute_="_value_"]       | $('[href="default.htm"]')     | 严相等
| [_attribute_&#124;=_"value"_] | $('[title&#124;="Tomorrow"]') | 宽相等，可接连字符 `-`
| [_attribute_!="_value_"]      | $('[href!="default.htm"]')    | 不等 | Ext
| [_attribute_^=_"value"_]      | $('[title^="Tom"]')           | 开头
| [_attribute_$=_"value"_]      | $('[href$=".jpg"]')           | 结尾
| [_attribute_~=_"value"_]      | $('[title~="hello"]')         | 独立单词
| [_attribute_*=_"value"_]      | $('[title*="hello"]')         | 片段
| [_attribute1_][_attribute2_]  | $('[title][href]')            | 组合属性选择器

### 过滤(伪类)选择器 - Basic Filter

|||||
|-------------------|-------------------------|---------------------------|-----
| :first            | $('p:first')            | 选取第一个元素            | Ext
| :last             | $('p:last')             | 选取最后一个元素          | Ext
| :even             | $('tr:even')            | 选取索引是偶数的所有元素  | Ext
| :odd              | $('tr:odd')             | 选取索引是奇数的所有元素  | Ext
| :eq(_index_)      | $('ul li:eq(3)')        | 选取索引等于 index 的元素 | Ext
| :gt(_no_)         | $('ul li:gt(3)')        | 选取索引大于 no 的元素    | Ext
| :lt(_no_)         | $('ul li:lt(3)')        | 选取索引小于 no 的元素    | Ext
| :not(_selector_)  | $('input:not(:empty)')  | 移除匹配项                | CSS
| :target           | $('p:target')           | 当前激活标签元素          | CSS
| :lang(_language_) | $('p:lang(de)')         | 包含特定语言定义的元素    | CSS

### 过滤(伪类)选择器 - Child Filter

|||
|------------------------|--------------------------
| :first-child           | $('p:first-child')
| :last-child            | $('p:last-child')
| :only-child            | $('p:only-child')
| :nth-child(_n_)        | $('p:nth-child(2)')
| :nth-last-child(_n_)   | $('p:nth-last-child(2)')
| :first-of-type         | $('p:first-of-type')
| :last-of-type          | $('p:last-of-type')
| :only-of-type          | $('p:only-of-type')
| :nth-of-type(_n_)      | $('p:nth-of-type(2)')
| :nth-last-of-type(_n_) | $('p:nth-last-of-type(2)')

注: `:nth-child()` 和 `:nth-last-child()` 都从 **1** 开始计数的，括号内可以是 `index` `even` `odd` 或公式，如 `2n` `2n+1` `3n`

### 过滤(伪类)选择器 - 其他

|||||
|-------------------|-------------------------|------------------------------------|-------
| :root             | $(':root')              | 选取根元素，即 html                | CSS
| :header           | $(':header')            | 选取所有标题元素，如 h1, h2 ...    | CSS
| :contains(_text_) | $(':contains("Hello")') | 选取含有特定文本内容的元素         | CSS
| :empty            | $(':empty')             | 选取不包含子元素或者文本的元素     | CSS
| :has(_selector_)  | $('div:has(p)')         | 选取含有选择器所匹配元素的元素     | Ext
| :parent           | $(':parent')            | 选取所有包含子元素或文本元素的元素 | Ext
| :focus            | $(':focus')             | 选取当前获取焦点的元素             | CSS
| :hidden           | $('p:hidden')           | 选取所有不可见的元素       | Ext
| :visible          | $('p:visible')          | 选取所有可见元素           | Ext
| :animated         | $(':animated')          | 选取当前正在执行动画的元素 | Ext

### 表单选择器

|||||
|-----------|----------------|--------------------------------------|----------------------
| :enabled  | $(':enabled')  | 选取所有可用元素                     | CSS
| :disabled | $(':disabled') | 选取所有不可用元素                   | CSS
| :checked  | $(':checked')  | 选取所有被选中元素（单选 复选）      | CSS
| :selected | $(':selected') | 选取所有被选中的选项元素（下拉列表） | Ext
| :input    | $(':input')    | 选取所有 `<input> <textarea> <select> <button>` 元素 | Ext
| :text     | $(':text')     | 选取所有的单行文本框 type="text" | Ext
| :password | $(':password') | 选取所有的密码框 type="password" | Ext
| :radio    | $(':radio')    | 选取所有的单选框 type="radio"    | Ext
| :checkbox | $(':checkbox') | 选取所有的复选框 type="checkbox" | Ext
| :button   | $(':button')   | 选取所有的按钮 type="button"     | Ext
| :submit   | $(':submit')   | 选取所有的提交按钮 type="submit" | Ext
| :reset    | $(':reset')    | 选取所有的重置按钮 type="reset"  | Ext
| :file     | $(':file')     | 选取所有的上传域 type="file"     | Ext
| :image    | $(':image')    | 选取所有的图像按钮 type="image"  | Ext

`:enabled` `:disabled` `:selected` `:checked` 这4项属于属性过滤选择器，另外请注意 `:input` 与 `input` 的区别。


## jQuery 遍历

### 筛选元素

|||
|------------------------------|--------------------------------------------------------
| .filter(_selector / filter_) | 通过选择器或测试函数筛选
| .not(_selector_)             | 删除与选择器匹配的元素
| .has(_selector_)             | 选取具有特定后代元素的元素
| .eq(_index_)                 | 从匹配的元素集合中取得一个指定位置的元素，从0开始计数
| .first()                     | 获取元素集合中的第一个元素
| .last()                      | 选取元素集合中的最后一个元素
| .slice(_start, [end]_)       | 截取给定范围内的元素，从0开始计数

### 后代元素

|||
|-------------------------|------------------------------------------------
| .find(_selector_)       | 获得匹配元素的 **后代元素**
| .children([_selector_]) | 取得匹配元素的 **子元素(不含文本和注释节点)**
| .contents()             | 取得匹配元素的 **子元素(包含文本和注释节点)**

### 同辈元素

|||
|------------------------------------|---------------------------------------------------------
| .siblings(_[selector]_)            | Returns all sibling elements of the selected element
| .next(_[selector]_)                | Returns the next sibling element of the selected element
| .nextAll(_[selector]_)             | Returns all next sibling elements of the selected element
| .nextUntil(_[selector], [filter]_) | Returns all next sibling elements between two given arguments
| .prev(_[selector]_)                | Returns the previous sibling element of the selected element
| .prevAll(_[selector]_)             | Returns all previous sibling elements of the selected element
| .prevUntil(_[selector], [filter]_) | Returns all previous sibling elements between two given arguments

### 祖先元素

|||
|------------------------------------|-------------------------------------------------------------
| .parent(_[selector]_)              | Returns the direct parent element of the selected element
| .parents(_[selector]_)             | Returns all ancestor elements of the selected element
| .parentsUntil(_[selector], [filter]_) | Returns all ancestor elements between two given arguments
| .closest(_[selector]_)             | Returns the first ancestor of the selected element (从自身开始往上找)
| .offsetParent()                    | Returns the first positioned parent element

### 集合操作

|||
|------------------------|-------------------------------------
| .add(_selector_)       | 在现有集合基础上再添加匹配元素
| .addBack(_[selector]_) | 将前一个集合的元素添加到现有集合中，可提供一个可选的选择器在添加前先过滤元素
| .end()                 | 结束最近一次筛选操作回到先前的集合状态
| .map(_callback_)       | 将集合中的元素逐个传递给回调函数处理，再用返回的结果生成一个新的 jQuery 对象
| .pushStack(_elements_) | 给jQuery对象链添加一个新的jQuery对象，框架内部使用

### 操作选中的元素

|||
|--------------------|---------------------------------------------
| .is(_selector_)    | Checks the set of matched elements against a selector/element/jQuery object, and return true if at least one of these elements matches the given arguments
| .each(_callback_)  | Executes a function for each matched element
| .index(_element_)  | Search for a given element from among the matched elements.
| .index()           | Gets the index of the matched element in ralation to its siblings.
| $.contains(_a, b_) | Determines whether DOM node b contains DOM node a.
| .length            | Gets the number of matched elements.
| .get(_index_)      | Gets the DOM node corresponding to the matched elements.
| .get()             | Gets an array of DOM nodes corresponding to the matched elements.
| .toArray()         | Gets an array of DOM nodes corresponding to the matched elements.


## jQuery 事件

### Binding 事件绑定

|||
|-------------------|-----------------------------------------------------------------------
| .ready(_handler_) | Binds handler to be called when the DOM and CSS are fully loaded.
| .on(_type, [selector], [data], handler_) | Binds handler to be called when the given type of event is sent to the element. If selector is provided, performs event delegation.
| .on(_events, [selector], [data]_) | Binds multiple handlers for events as specified in the events object parameter.
| .off(_type, [selector], [handler]_) | Removes bindings on the element.
| .one(_type, [data], handler_) | Binds handler to be called when the given type of event is sent to the element. Removes the binding when the handler is called.
| $.proxy(_fn, context_) | Creates a new function that executes with the given context.

### Shorthand binding 绑定简写方式

```js
jq.keydown()  jq.keyup()  jq.keypress()

jq.click()  jq.dblclick()  jq.contextmenu()
jq.mouseenter()  jq.mouseleave()  jq.mouseout() /* 离开子元素也触发 */
jq.mousemove() /* 自身上移动 */  jq.mouseover() /* 自身+子元素上移动 */
jq.mousedown()  jq.mouseup()
jq.hover(handlerIn, handlerOut) / jq.hover(handlerInOut)  // jQuery 合成事件 = mouseenter + mouseleave

jq.blur()  jq.change()  jq.submit()  jq.select() /* 选中<input> <textarea> 中一些文本时触发 */
jq.focus()  jq.focusin()  jq.focusout()

jq.resize()  jq.scroll()
```

### Triggering 触发事件

所有提供了绑定简写的事件，也同时提供了触发的简写形式。

|||
|--------------------------|---------------
| .trigger(_type, [data]_) | 
| .triggerHandler(_type, [data]_) | 只执行选择集中首个元素上绑定的监听函数，此方法不支持链式写法

注：v3.2.1 的 click() 效果与实际点击效果不一样，click() 会重复执行外部元素的 click handler，不知是不是 bug。


## jQuery DOM 操作

### 特性和属性

|||
|---------------------|--------------------------------------------
| .attr(_key_)        | Gets the attribute named key.
| .attr(_key, value_) | Sets the attribute named key to value.
| .attr(_key, fn_)    | Sets the attribute named key to the result of fn (called separately on each matched element).
| .attr(_obj_)        | Sets attribute values given as key-value pairs.
| .removeAttr(_key_)  | Removes the attribute named key.
| .prop(_key_)        | Gets the property named key. jq1.6 新添加，注意与 attr 的区别和联系
| .prop(_key, value_) | Sets the property named key to value.
| .prop(_key, fn_)    | Sets the property named key to the result of fn (called separately on each matched element).
| .prop(_obj_)        | Sets property values given as key-value pairs.
| .removeProp(_key_)  | Removes the property named key.
| .addClass(_class_)  | Adds the given class ( or more space-separated classes) to each matched element.
| .removeClass(_class_) | Removes the given class from each matched element.
| .toggleClass(_class_) | Removes the given class if present, and adds it if not, for each matched element.
| .hasClass(_class_)  | Returns true if any of the matched elements has the given class.
| .val()              | Gets the value attribute of the first matched element. This method is primarily used to get the values of form elements.
| .val(_value / fn_)  | Sets the value attribute of each element to value.

### CSS

|||
|-------------------------|----------------------------------------------------------------------
| .css(_key / keys_)      | 返回首个匹配元素的一个或多个属性的计算值，多个属性名以数组形态提供
| .css(_key, value / fn_) | 给所有匹配元素的某个样式属性设置值 fn(index, value): String or Number
| .css(_obj_) | 给所有匹配元素的多个样式属性设置值 obj 为包含多个键值对的对象
| .offset()   | Gets the top and left pixel coordinates of the first matched element, relative to the viewport.
| .position() | Gets the top and left pixel coordinates of the first matched element, relative to the element returned by .offsetParent().
| .scrollTop()         | Gets the vertical scroll position of the first matched element.
| .scrollTop(_value_)  | Sets the vertical scroll position of all matched elements to value.
| .scrollLeft()        | Gets the horizontal scroll position of the first matched element.
| .scrollLeft(_value_) | Sets the horizontal scroll position of all matched elements to value.
| .height()            | 获取首个匹配元素的计算高度值，返回值以 px 计量，但不带单位
| .height(_value_)     | 为每个匹配元素设定高度值，参数不能带单位
| .width(_[value]_)    | 读取或设定宽度
| .innerHeight()       | 获取首个匹配元素的计算高度(含 padding 不含 border)
| .innerWidth()        | 获取首个匹配元素的计算宽度(含 padding 不含 border)
| .outerHeight(_[includeMargin]_) | 获取首个匹配元素的计算高度(含 padding border 默认不含 margin)
| .outerWidth(_[includeMargin]_)  | 获取首个匹配元素的计算宽度(含 padding border 默认不含 margin)

### 文档处理

Content 内容

|||
|----------------|-------------------------------------------------------------
| .html()        | Gets the HTML content of the first matched element.
| .html(_value_) | Sets the HTML content of each matched element to value.
| .text()        | Gets the textual content of all matched elements as a single string.
| .text(_value_) | Sets the textual content of each matched element to value.

Insertion 插入

|||
|-----------------------|-------------------------------------------------------------
| .append(_content_)    | Inserts content at the end of the interior of each matched element. 在被选元素的结尾插入内容
| .appendTo(_selector_) | Inserts the matched elements at the end of the interior of the elements matched by selector.
| .prepend(_content_)   | Inserts content at the beginning of the interior of each matched element. 在被选元素的开头插入内容
| .prependTo(_selector_) | Inserts the matched elements at the beginning of the interior of the elements matched by selector.
| .after(_content_)         | Inserts content after each matched element. 在被选元素之后插入内容
| .insertAfter(_selector_)  | Inserts the matched elements after each of the elements matched by selector.
| .before(_content_)        | Inserts content before each matched element. 在被选元素之前插入内容
| .insertBefore(_selector_) | Inserts the matched elements before each of the elements matched by selector.
| .wrap(_content_)          | Wraps each of the matched elements within content.
| .wrapAll(_content_)       | Wraps all of the matched elements as a single unit within content.<br>如果成员位置不在一起的话，会被挪到一起再打包
| .wrapInner(_content_)     | Wraps the interior contents of each of the matched elements within content.<br>包裹元素放在每个匹配元素内部，即包裹成员内容而非成员本身

Replacement 更换

|||
|------------------|-------------------------------------------------------------
| .replaceWith(_content_) | Replaces the matched elements with content.<br>完成替换后会返回被替换元素，但被替换元素中的全部事件都将消失。
| .replaceAll(_selector_) | Replaces the elements matched by selector with the matched elements.<br>一旦完成替换，被替换元素消失。

Removal 删除

|||
|------------------|-------------------------------------------------------------
| .empty() | Removes the child nodes of each matched element.
| .remove(_[selector]_) | Removes the matched nodes (optionally filtered by selector) from the DOM.
| .detach(_[selector]_) | Removes the matched nodes (optionally filtered by selector) from the DOM, preserving jQuery data attached to them. <br>与 remove 唯一的不同是不移除元素上绑定的事件及数据
| .unwrap() | Removes the element's parent.

Copying 复制

|||
|------------------|-------------------------------------------------------------
| .clone(_[withHandlers], [deepWithHandlers]_) | Makes a <b>deep</b> copy of all matched elements, optionally also copying event handlers.

Data 数据功能

|||
|------------------|-------------------------------------------------------------
| .data(_key_) | Gets the data item named key associated with the first matched element.<br><a href="https://blog.netsh.org/posts/html-data-jquery_1812.netsh.html">HTML5 自定义属性 data-* 和 jQuery.data 详解</a>
| .data(_key, value_) | Sets the data item named key associated with each matched element to value.<br> jQuery 将信息存储在内部中央信息模块中，不会反映到HTML元素上，注意与 dataset API 区别。
| .removeData(_key_) | Removes the data item named key associated with each matched element.


## jQuery Ajax

### Ajax Shorthand Methods

|||
|------------------------------------------------|-------------------------------
| $.get(_url, [data], [success], [returnType]_)  | 通过 GET 请求加载远程页面
| $.post(_url, [data], [success], [returnType]_) | 通过 POST 请求加载远程页面
| $.getJSON(_url, [data], [success]_)            | 载入并解析 JSON 数据，该方式同时支持 JSONP 协议
| $.getScript(_url, [success]_)                  | 载入并执行 JavaScript 文件
| .load(_url, [data], [callback]_)               | 载入远程html内容并替换每个选择集项目中的内容

### Ajax Low-Level Interface

|||
|-----------------------------------------|-------------------------------------------
| $.ajax(_[url], [settings]_)             | 加载远程资源的最底层方法，提供更多控制功能
| $.ajaxSetup(_settings_)                 | 设置 Ajax 的默认配置项，将影响后续所有请求，尽量避免使用
| $.ajaxPrefilter(_[dataTypes], handler_) | 在 $.ajax() 之前对指定 dataTypes(如多个采用空格分隔) 请求进行预处理
| $.ajaxTransport(_[dataTypes], handler_) | Function(PlainObject options, PlainObject originalOptions, jqXHR jqXHR)<br> 提供自定义的 {send: function() { }, abort: function () { }}, prefilters 和 converters 搞不定才用此大招

|||
|------------|------------------------------------------------------------------------------
| method     | {String}=`'GET'`
| url        | {String}
| data       | {PlainObject/String/Array}
| complete   | {Function}
| sucsess    | { Function( Anything data, String textStatus, jqXHR jqXHR )}
| error      | {Function}
| async      | {Boolean}=`true` xhr.open() 参数
| username   | {String} xhr.open() 参数
| password   | {String} xhr.open() 参数
| timeout    | {Number}
| dataType   | {String} 默认值智能识别 xml, json, script, html
| mimeType   | {String}
| crossDomain| {Boolean} `false` 同源 / `true` 跨域
| xhrFields  | {PlainObject} 设置 XHR 配置项
|||
| headers       | {PlainObject}=`{}`
| contentType   | {Boolean/String} 'application/x-www-form-urlencoded; charset=UTF-8'
| scriptCharset | {String} 指定加载的脚本的字符集
| accepts       | {PlainObject} 默认值根据 dataType 智能识别
| cache         | {Boolean}=`true`/`false`(script josn)
| ifModified    | {Boolean}=`false`
|||
| beforeSend | {Function}
| contents   | {PlainObject} 注册自定义内容类型，结合 converters 使用
| converters | {PlainObject} 注册内容转换器 {"* text": window.String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML}
| dataFilter | {Function(String data, String type) => Anything} 请求成功返回时在 success 之前对数据进行预处理
| statusCode | {PlainObject} 示例 `statusCode: { 404: function() { alert( "page not found" ); }`
| context    | {PlainObject} 控制所有回调函数的上下文 this
|||
| xhr        | {Function} ActiveXObject 或 XMLHttpRequest 智能识别
| global     | {Boolean}=`true` 是否触发全局钩子函数
| processData| {Boolean}=`true` 是否需要将 `data` 处理成查询字符串
| traditional| {Boolean} 如设为 true 则采用旧风格的 paramserialization
| isLocal    | {Boolean}
| jsonp      | {String/Boolean} 默认URL写法为 'callback=?' 通过该项配置可自定义 'callback' 为其他字符串
| jsonpCallback | {String/Function}

### Ajax Global Event Handlers

`.ajaxStart()` -> `.ajaxSend()` -> `.ajaxSuccess()` / `.ajaxError()` -> `.ajaxComplete()` -> `.ajaxStop()`

### Ajax Helper Functions

|||
|----------------------|-------------------------------------------------------------------------------
| $.param(_obj_)       | Encodes an arbitrary object of key-value pairs into a query string.
| $.globalEval(_code_) | Evaluates the given JavaScript string in the global context.
| $.parseJSON(_json_)  | Converts the given JSON string into a JavaScript object.
| $.parseXML(_xml_)    | Converts the given XML string into an XML document.
| $.parseHTML(_html_)  | Converts the given HTML string into a set of DOM elements.
| .serialize()         | Encodes the values of a set of form controls into a query string.
| .serializeArray()    | Encodes the values of a set of form controls into a JavaScript data structure.


## jQuery Deferred

|||
|-------------------|-----------------------------------------------------------------------------------
| jQuery.Deferred() | A factory function that returns a
| jQuery.when()     | Provides a way to execute callback function
| .promise() | Return a Promise object to observe when all actions of a certain type bound to the collection, queued or not, have finished.
|||
| d.notify()     | Call the progressCallbacks on a Deferred object with the given args.
| d.notifyWith() | Call the progressCallbacks on a Deferred object with the given context and args.
| d.resolve()     | Resolve a Deferred object and call any doneCallbacks with the given args.
| d.resolveWith() | Resolve a Deferred object and call any doneCallbacks with the given context and args.
| d.reject()      | Reject a Deferred object and call any failCallbacks with the given args.
| d.rejectWith()  | Reject a Deferred object and call any failCallbacks with the given context and args.
|||
| p.state()  | Determine the current state of a Deferred object.
| p.progress()   | Add handlers to be called when the Deferred object generates progress notifications.
| p.done()       | Add handlers to be called when the Deferred object is resolved.
| p.fail()       | Add handlers to be called when the Deferred object is rejected.
| p.always()     | Add handlers to be called when the Deferred object is either resolved or rejected.
| p.then()   | Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
| p.catch()      | Add handlers to be called when the Deferred object is rejected.
| p.promise()    | Return a Deferred’s Promise object.


## jQuery 动画

### Predefined effects

|||
|-------------------------------|----------------------------------------------------------------------
| .show(_[speed], [callback]_)  | Displays the matched elements by animating height, width, and opacity.<br>控制的是 display 属性，会根据 .hide()方法的记录以及标签自动判断使用 block 和 inline-block 或其他值
| .hide(_[speed], [callback]_)        | Hides the matched elements by animating height, width, and opacity.
| .toggle(_[speed], [callback]_)      | Displays or hides the matched elements.
| .slideDown(_[speed], [callback]_)   | Displays the matched elements with a sliding motion. 改变高度
| .slideUp(_[speed], [callback]_)     | Hides the matched elements with a sliding motion.
| .slideToggle(_[speed], [callback]_) | Displays or hides the matched elements with a sliding motion.
| .fadeIn(_[speed], [callback]_)      | Displays the matched elements by fading them to opaque. 改变不透明度
| .fadeOut(_[speed], [callback]_)     | Hides the matched elements by fading them to transparent.
| .fadeToggle(_[speed], [callback]_)   | Displays or hides the matched elements with a fading animation.
| .fadeTo(_speed, opacity, [callback]_) | Adjusts the opacity of the matched elements.

speed 的取值：slow normal fast 或 毫秒数。

### Custom animations

|||
|---------------------------------------------------------|----------------------------------------------------
| .animate(_{properties}, [speed], [easing], [callback]_) | Performs a custom animation of the specified CSS properties.
| .animate(_{properties}, {options}_) | A lower-level interface to .animate(), allowing control over the animation queue.


### Queue manipulation

|||
|---------------------------------|------------------------------------------------------
| .queue(_[queueName]_)           | Retrieves the queue of functions on the first matched element.
| .queue(_[queueName], callback_) | Adds callback to the end of the queue.<br>对此项的理解是，将callback作为队列一员插入当前位置。因为正常的动画函数都会在执行完后调用dequeue，所以callback函数内部最后也必须调用一次dequeue
| .queue(_[queueName], newQueue_) | Replaces the queue with a new one.
| .dequeue(_[queueName]_)         | Executes the next function on the queue.
| .clearQueue(_[queueName]_)        | Empties the queue of all pending functions.
| .stop(_[clearQueue], [jumpToEnd]_)| Stops the currently running animation, then starts queued animations, if any.
| .finish(_[queueName]_)            | Stops the currently running animation and immediately advances all queued animations to their target values.
| .delay(_duration, [queueName]_)   | Waits duration milliseconds before executing the next item in the queue.
| .promise(_[queueName], [target]_) | Returns a promise object to be resolved once all queued actions on the collection have finished.


## Miscellaneous properties and functions

Properties of the jQuery object

|||
|-------------------------------|---------------------------------------------------------------
| $.support | jQuery内部使用，不推荐外部使用。

Arrays and objects

|||
|-------------------------------|---------------------------------------------------------------
| $.each(_collection, callback_) | Iterates over collection, executing callback for each item.
| $.extend(_[deep], target, addition, ..._) | 用数个对象来扩展一个对象，返回被扩展的对象。如果只传了一个参数，则附加到当前 jQuery 对象上；如果有同名属性，原属性值会被覆盖。
| $.fn.extend(_object_) | 用于给 jQuery.fn 原型对象添加方法，开发插件时使用。
| $.grep(_array, callback, [invert]_) | Filters array by using callback as a test.
| $.makeArray(_object_) | Converts object into an array.
| $.map(_array, callback_) | Constructs a new array consisting of the result of callback being called on each item.
| $.inArray(_value, array_) | Determines whether value is in array.
| $.merge(_array1, array2_) | Combines the contents of array1 and array2.
| $.unique(_array_) | Removes any duplicate DOM elements from array.

Object introspection

|||
|-------------------------------|---------------------------------------------------------------
| $.isArray(_object_) | Determines whether object is a true JavaScript array.
| $.isEmptyObject(_object_) | Determines whether object is empty.
| $.isFunction(_object_) | Determines whether object is a function.
| $.isPlainObject(_object_) | Determines whether object was created as an object literal or with new Object.
| $.isNumeric(_object_) | Determines whether object is a numeric scalar value.
| $.isWindow(_object_) | Determines whether object represents a browser window.
| $.isXMLDoc(_object_) | Determines whether object is an XML node.
| $.type(_object_) | Gets the JavaScript class of object.

Other

|||
|-------------------------------|---------------------------------------------------------------
| $.trim(_string_) | Removes whitespace from the ends of string.
| $.noConflict(_[removeAll]_) | Reverts $ to its pre-jQuery definition.
| $.noop() | A function that does nothing.
| $.now() | The current time in milliseconds since the epoch.
| $.holdReady(_hold_) | Stops the  ready event from being triggered, or releases this hold.

|||
|-------------------------------------|------------------------------------------------------------------
| jQuery( _selector [, context ]_ )   | Accepts a string containing a CSS selector which is then used to match a set of elements.
| jQuery( _element / elementArray_ )  | 
| jQuery( _html [, ownerDocument ]_ ) | Creates DOM elements on the fly from the provided string of raw HTML.
| jQuery( _html, attributes_ )        | 
| jQuery( _callback_ )                | Binds a function to be executed when the DOM has finished loading.
