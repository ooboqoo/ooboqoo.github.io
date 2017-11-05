# 锋利的 jQuery


## 1. 认识 jQuery

### jQuery 语法

jQuery 语法是为 HTML 元素的选取编制的，可以对元素执行某些操作。

基础语法是：`$(selector).action()`

* 美元符号定义 jQuery
* 选择符（selector）“查询”和“查找” HTML 元素
* jQuery 的 action() 执行对元素的操作

### 1.4 jQuery 对象 与 DOM 对象

在 jQuery 对象中无法使用 DOM 对象的任何方法，同样，DOM 对象也不能使用 jQuery 里的方法。

jQuery 提供了两种方法将一个 jQuery 对象转换成 DOM 对象，即 `[index]` 和 `.get(index)`。

对于一个 DOM 对象，只需要用 `$()` 把 DOM 对象包装起来就可以得到一个 jQuery 对象了。

为了便于区分 jQuery 对象和 DOM 对象，建议 jQuery 对象命名时在前面添加 `$` 符号。

### 1.5 解决 jQuery 和其他库的冲突

```js
(function ($) { 
    // your code here
})(jQuery);
```


## 2. jQuery 选择器

### 2.3.1 基本选择器

`#id` `.class` `element` `*` `selector1, selector2`

需要注意的是，`$('#id')` 获取的始终是对象，即使网页上没有此元素，因此检查某元素是否存在的代码要这样：

```js
if ($('#id').length > 0) { /* your code here */ }
```

### 2.3.2 层次选择器

`$('ancestor descendant')` `$('parent>child')` `$('pre+next')` `$(prev~siblings)`

在层次选择器中，前2个比较常用，后面2个在 jQuery 里有更加简单的方法 `.next()` `.nextAll()` 代替。

### 2.3.3 过滤选择器

过滤规则与 CSS 中的伪类选择器语法相同。按照不同的过滤规则，过滤选择器可以分为基本过滤、内容过滤、可见性过滤、属性过滤、子元素过滤和表单对象属性过滤选择器。


## 3. jQuery DOM 操作

利用 jQuery 工厂函数生成新元素时，要注意闭合标签和使用标准的 XHTML 格式，如可以用 `$('<p/>')` 或 `$('<p></p>')`, 但不要使用 `$('<p>')` 或 `$('<P/>')`。


## 4. jQuery 事件与动画

一组元素上的动画效果

* 当在一个 `animate()` 方法中应用多个属性时，动画是同时发生的。
* 当以链式的写法应用方法时，动画是按照顺序发生的(除非 `queue` 选项值为 `false`)。

多组元素上的动画效果

* 默认情况下，动画都是同时发生的。
* 当以回调的形式应用动画方式时(包括动画的回调函数和 `queue()` 方法的回调函数)，动画是按照回调顺序发生的。


## 5. jQuery 表单、表格的操作及其他

##### 哪些属性应该用 `atttr()` 访问，哪些应该用 `prop()` 访问呢？

第一个原则：只添加属性名称该属性就会生效应该使用 prop();  
第二个原则：只存在 true/false 的属性应该使用 prop()。  
按照官方说法，如果是设置 disabled 和 checked 这些属性，应该使用 prop() 方法，而不是使用 attr() 方法。

##### 一个有参考意义的写法：
```js
var hasSelected = $(this).hasClass('selected');
$(this)[hasSelected ? 'removeClass' : 'addClass']('selected');  // 调用方法不仅可以使用 `.` 还可以使用 `[]`
```

##### 换肤操作

```html
<ul id="skin">
    <li id="skin-0" class="selected">灰色</li>
    <li id="skin-1">紫色</li>
</ul>
<link rel="stylesheet" href="css/skin-0.css" id="cssfile">
<script>
    var $li = $('#skin li');
    $li.click(function(){
        $('#' + this.id).addClass('selected')
                .siblings().removeClass('selected');
        $('#cssfile').attr('href', 'css/' + this.id + '.css');
    });
</script>
```


## 6. jQuery 中的 Ajax

在 jQuery 中 `$.ajax()` 方法属于最底层的方法，   
第 2 层是 `.load()` `$.get()` 和 `$.post()` 方法，   
第 3 层是 `$.getScript()` 和 `$.getJSON()` 方法。

```js
$('#resText').load('test.html .para');  // 只加载 test.html 页面中 class 为 para 的内容，注意空格
$('#resText').load('test.php', {name: "rain", age: "22"});  // 带参数传递，自动切换到 POST 方式
$('#resText').load('test.html', function(responseText, textStatus, XMLHttpRequest) {
    // responseText   : 请求返回的内容
    // textStatus     : 4种请求状态 success error notmodified timeout
    // XMLHttpRequest : XMLHttpRequest 对象
    // 无论请求是否成功，只要当请求完成后，回调函数都会被触发
});
```


## 7. jQuery 插件的使用与写法

常用的几个插件：

* 表单验证插件 jQuery Validation
* 表单插件 jQuery Form
* 模态窗口插件 jQuery SimpleModal
* 管理 Cookie 的插件 jQuery Cookie
* jQuery UI 插件

**jQueryUI 和 Bootstrap 比较**   
用 jQuery 的话，如果要做一个网站，PC 端用 jQuery UI，手机端用 jQuery Mobile 【需要做两套网站】  
用 Bootstrap 的话，因为 Bootstrap 是响应式布局【只需要一套就够了】


## 11. jQuery 性能优化

#### 使用合适的选择器

* 选择器性能排序：id选择器 > 元素选择器 > 类选择器 > 属性选择器 > 伪类选择器
* 尽量给选择器指定上下文以缩小遍历范围

#### 其他性能优化项

* 缓存对象，通过缓存对象减少 DOM 遍历的次数
* 尽量减少循环内部的 DOM 操作，避免重复获取相同元素
* 采用事件代理减少监听函数数量
* 将你的代码转化成 jQuery 插件，以实现更好的重用
* 尽量使用原生的 JavaScript 方法
* 压缩 Javascript 代码
