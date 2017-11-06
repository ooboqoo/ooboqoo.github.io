# jQuery 事件


## .on()

* `.on( events [, selector ] [, data ], handler )`
  * events {String} - 单个或多个由空格分隔的 event，事件名可带可选的 namespaces
  * selector {String} - 指定只有 selector 的匹配项上才会执行 handler （事件委托）
  * data {Any} - 传递给 handler 的数据，handler 通过 event.data 读取
  * handler {Function( Event eventObject [, Anything extraParameter ] [, ... ] ) || false }
* `.on( events [, selector ] [, data ] )`
  * events {Object} - 如 {'click dblclick': handler1, mouseenter: handler2}

#### 事件名 及 命名空间

可自定义事件名并通过 `trigger()` 方法触发，事件名可采用 字母、数字、下划线 和 冒号。

事件名可以带命名空间以便于删除和触发特定事件类型。可以同时使用多个命名空间，但请注意，多个命名空间之间是同级的，就像 CSS 里的类一样，如 `"click.myPlugin.simple"` 可以被后面任一方法移除 `.off("click.myPlugin")` `.off("click.simple")`。

命名空间定义不能带下划线 `_`，因为那是 jQuery 给自己在内部使用保留的。

#### 直接 / 委托事件

如果没有指定 selector，那么事件处理函数是直接作用于定义事件的对象本身的。

当指定了 selector，定义事件的对象只起了个代理的作用，事件处理函数是作用于其后代中 selector 所指定的对象集合的。  
使用事件委托有诸多好处：可以为不存在的子元素提前添加监听函数；可以减少监听函数的数量。

#### 监听函数

当产生事件时，jQuery 会先对数据进行规范化，再传递这个规范化后的 Event Object 给监听函数，初始的事件对象可以通过 `event.originalEvent` 获取到。

在监听函数中返回 false 会自动调用 `event.stopPropagation()` 和 `event.preventDefault()`。如果只需要拦截元素上的事件，还有一种简写的方法 -- 直接将 false 作为 handler，如 `$( "a.disabled" ).on( "click", false );`。

当 jQuery 调用 handler 时，`this` 关键字将会绑定到被分派对象上，如下例中，当点击 inner1 时，只会显示 d1

```html
<div id="outer">
  <div id="d1" class="delivered"><span>inner1</span></div>
  <div id="d2" class="delivered"><span>inner2</span></div>
</div>
<script>
  $('#outer').on('click', '.delivered', function(){ alert(this.id) })
</script>
```

可以通过 `$(this)` 将其转变成 jQuery 对象，进而使用 jQuery 实例对象方法。

#### 向监听器传递数据

#### 事件性能

虽然像 click 之类的事件触发频率并不高，但像 mousemove scroll 这些事件的触发频率就相当可观了。可以通过减少监听器的工作量来提升性能，还可以通过 缓存信息 及 setTimeout 等来减轻工作量。

利用事件委托有很多优点，但如果层级太高的话，被触发的几率就大增，这会影响到性能，所以添加事件监听时应该尽量接近触发源。

另外，添加委托事件时，selector 应尽量使用简单的选择器，如 `tag#id.class`，而尽量避免使用组合选择器。

#### 事件方法简写

对常用事件的触发和添加监听函数提供了简写形式，如 `.click()`


## .trigger()

`$('div').trigger('click!')` 最后的感叹号的作用是，匹配所有不包含在命名空间中的 click 方法。


## $(handler)

`$().ready(handler)` `$(document).ready(handler)` 等用法3.0已弃用，请用 `$(handler)` 这种形式。

`$(document).on('ready', handler)` 与 `$(handler)` 的差异：后者一定会执行，即使 `DOMContentLoaded` 已触发。

`DOMContentLoaded` 与 `load` 的差异：后者会等待 img script 等资源完整加载后才触发，而前者在 DOM 构建完毕后即触发。当然直接将代码写在 `</body>` 前面，执行时间要早于 `DOMContentLoaded`。

`$(handler)` 中 handler 的首个参数为 jQuery 本身，所以在 `$` 冲突时可以这样用 `jQuery(function ($) { /* ... */ })`

注意与 `jQuery.ready` 的区分，这是个显示文档是否已ready的只读属性。

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script>
    document.addEventListener('DOMContentLoaded', function () { console.log('DOMContentLoaded'); })
  </script>
</head>
<body>
  <img src="path/to/img.jpg">
  <script src="jquery.3.2.1.js"></script>
  <script>
    $(function ($) { console.log('jQuery ready'); });
    document.onload = function () { console.log('loaded'); }
  </script>>
</body>
</html>
```
