# 杂碎知识点

#### sessionStorage

每个 tab 页的 sessionStorage 都是独立的，无法通过 sessionStorage 实现标签页之间的通信。可以利用 `localStorage` 以及监听 `window` 上 `storage` 事件来解决。

#### 外链文件名后跟 `?` 并带参数的作用

http://stackoverflow.com/questions/118884/how-to-force-browser-to-reload-cached-css-js-files

```
<link href="/css/main.css?v=20110526" rel="Stylesheet">
<script src="/js/app.js?md5=a5b5c45f45f87f5458"></script>
<script src="/js/app.js?20110526"></script>
```

问：上面链接外部的 css 或 js 文件名后跟了一个“?”，并带上一个参数，作用是什么呢？  
答：js或css带参数，是为了避免旧的浏览器缓存继续生效；特别是在大型站中随时可能会更改局部css文件，为了避免浏览器刷新而继续使用旧的CSS缓存文件，在使用时往往会带上一个动态参数。

[注] 如链接内所讨论的，对于这种带参数的文件，很多浏览器并不会缓存，每次都需要重新下载，而且[HTTP/1.1规范](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html#sec13.9)是禁止对带查询的请求进行缓存的。

其他方案修改文件名，也就是文件名中带hash值或随机码，如 `name.123.js`。这种方案可解决浏览器行为不统一的痛点，但通过此方案来控制缓存，但对大的项目来说维护难度较大，因为修改一个文件，会导致依赖此文件的一系列文件名的更新，所以很多站点没有采用此方案。

如果版本发布控制合理，其实临时替换缓存内容的情形不多。且以后采用 HTTP/2 之后，可以通过服务器推送来完美解决缓冲控制的问题。

#### 静态文件缓存方案

静态资源缓存是前端应用优化的一个重要议题。缓存静态资源，减少加载时间提升网页响应速度，并在合适的时候能及时更新缓存。

目前常用的有两套缓存方案，下面对优缺点分别进行分析：

* 文件名带 hash 值
    * 实现：计算文件的哈希值，并重命名文件，如 `name.123.js`
    * 优点：行为确定，能保证客户端行为如预期工作
    * 缺点：更新一个文件，会导致整个依赖树都需要更新，即每次都需要全量升级。对于大型网站，更新大批量文件带来的事故风险更高。
* URL 追加随机码
    * 实现：通过 Nginx 实现自动添加随机码，追加随机码后的效果 `name.js?v=123`
    * 优点：实现简单，每次发布新版本，只需在后台更新下版本号即可
    * 缺点：不符合 HTTP/1.1规范(规定禁止对带查询的请求进行缓存)，客户端行为不能完全保证(虽然多数现代浏览器能正常工作)

随机码方案具体实现

* 提供一个专门用于修改和查询随机码的接口
* 提供一个 nginx 插件
    * 所有通过 nginx 反向代理的 .html, .css 文件请求都进行拦截, 将里面的引用进行修改, 动态追加随机码
    * 在 nginx 插件中调用查询随机码的接口, 查询随机码后, 写入到响应 cookie 中
* 修改 ajax 请求的代码，从 cookie 中获取随机码并追加到 url 中

#### webpack 自动生成雪碧图

http://kyon-df.com/2016/03/16/webpack_auto_sprites/

postcss 后处理是一个很强大的处理 css 的工具，跟 sass 这些预处理工具不同，postcss 做为后处理工具，需要我们用 loader 处理 sass 后再处理，在 postcss 里我们做很多事，比如 autoprefix，preces，合并图片甚至是一些兼容调整或者 px 转换 em 都以支持，像 vue-loader 等这样的框架文件 loader 都已经内置了 postcss，只要简单的配置就可以使用。

#### FOUC

什么是 FOUC (无样式内容闪烁)？你如何来避免 FOUC？

文档样式短暂失效 Flash of Unstyled Content 简称 FOUC，是出现在 IE 中的一种奇怪现象：如果使用 `@import` 方法对 CSS 进行导入，会导致某些页面以无样式显示内容的瞬间闪烁。

原因大致为
  - 1 使用import方法导入样式表。
  - 2 将样式表放在页面底部
  - 3 有几个样式表，放在html结构的不同位置。

其实原理很清楚：当样式表晚于结构性 html 加载，当加载到此样式表时，页面将停止之前的渲染。此样式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。

解决方法：使用LINK标签将样式表放在文档HEAD中。

#### `;` 使用注意事项

https://www.codecademy.com/blog/78  
https://tc39.github.io/ecma262/#sec-rules-of-automatic-semicolon-insertion

##### 用法

- 当两个语句写在同一行时，必须要用分号分隔
- 当语句以换行符结尾，或者是代码块 `{}` 中的唯一语句时，都是可选的
- `}` 后面不能跟分号，除非是对象字面量的结束符号
- if, for, while, 或 switch 后面的 `() {` 之间不能插入分号，否则会被拆分成2个语句


```js
if (0 === 1); alert ("hi");  // 始终会执行
```

##### 自动插入分号

ecma262 要求语句和声明都以分号结束，但为了方便起见，一些地方省略分号也是允许的，此时我们可以认为解析器会自动插入分号。

- 从左到右解析程序时，若遇到不被任何产生式允许的 token，会在下列情况下的非法 token 之前自动插入分号：
    - 该非法 token 与前一个 token 之间至少有一个行结束符分隔
    - 该非法 token 是 `}`
    - 该非法 token 是 do-while 结构的最后一个 `)`
- 从左到右解析程序时，若到输入流的结尾时解析器无法解析为非终止实例时会在结束处自动插入分号(实际意思就是，当连接脚本时，会在脚本之间自动插入分号)
- (非直译) `return` `throw` `break` `continue` `A++` `A--` 之后是行结束符会自动插入分号

[注] `++` `--` 如果是单独一行，那只可能跟后面结合，不可能跟前面结合，`a \n ++` 是非法的，无法解析为 `a++` 

```js
// 报错，无效的语句
{ 1 2 } 3

// 这个虽然也是无效语句，但通过自动插入分号变为有效
{ 1
2 } 3
// 插入后效果
{ 1
;2 ;} 3;

return
a + b
// 插入后效果
return;
a + b;

a
++
b
// 插入后效果
a;
++b;

a = b + c
(d + e).print()
// 插入后效果
a = b + c(d + e).print();
```

#### 轮播效果

```html
<!doctype html>
<html>
<head>
<title>纯 CSS 轮播效果</title>
<style>
.my-carousel { margin: 30px; border: 2px solid #c0c0c0; border-radius: 5px; }
.carousel { position: relative; width: 400px; height: 300px; padding: 0;
            overflow: hidden; text-align: center; list-style: none; }
.c_controls, .c_activator { display: none; }
h1 { position: absolute; top: 50%; width: 100%; margin-top: -25px; font-size: 50px;
     line-height: 50px; color: #fafafa; text-align: center; }
/* 设置图片源，通过 translateX + top + left 实现左右排列 */
.c_track { position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: 0; padding: 0;
           transition: transform 0.5s ease 0s; }
.c_slide { display: block; position: absolute; height: 100%; top: 0; left: 0; right: 0; background-size: cover;
           background-position: center; overflow: hidden; }
.c_slide:nth-of-type(1) { transform: translateX(0%); background-image: url(https://unsplash.it/400/300?1); }
.c_slide:nth-of-type(2) { transform: translateX(100%); background-image: url(https://unsplash.it/400/300?2); }
.c_slide:nth-of-type(3) { transform: translateX(200%); background-image: url(https://unsplash.it/400/300?3); }
/* 左右控制按钮样式 */
.c_control { display: block; position: absolute; height: 30px; width: 30px; margin-top: -15px; top: 50%;
             border-width: 5px 5px 0 0; border-style: solid; border-color: #fafafa;
             cursor: pointer; opacity: 0.35; outline: 0; z-index: 3; }
.c_control:hover { opacity: 1; }
.c_control_backward { left: 10px; transform: rotate(-135deg); }
.c_control_forward  { right: 10px; transform: rotate(45deg); }
/* 指示器样式 */
.c_indicators { position: absolute; width: 100%; bottom: 20px; text-align: center; }
.c_indicator { display: inline-block; width: 15px; height: 15px; margin: 0 2.5px 0 2.5px; 
               background-color: #fafafa; border-radius: 100%; z-index: 2; cursor: pointer; opacity: 0.35; }
/* 通过左右移动 div.c_track 实现图片切换功能 */
.c_activator:nth-of-type(1):checked ~ .c_track { transform: translateX(0%); }
.c_activator:nth-of-type(2):checked ~ .c_track { transform: translateX(-100%); }
.c_activator:nth-of-type(3):checked ~ .c_track { transform: translateX(-200%); }
/* 更新左右控制按钮 */
.c_activator:nth-of-type(1):checked ~ .c_controls:nth-of-type(1),
.c_activator:nth-of-type(2):checked ~ .c_controls:nth-of-type(2),
.c_activator:nth-of-type(3):checked ~ .c_controls:nth-of-type(3) { display: block; }
/* 更新指示器显示 */
.c_activator:nth-of-type(1):checked ~ .c_indicators .c_indicator:nth-of-type(1),
.c_activator:nth-of-type(2):checked ~ .c_indicators .c_indicator:nth-of-type(2),
.c_activator:nth-of-type(3):checked ~ .c_indicators .c_indicator:nth-of-type(3) { opacity: 1; }
</style>
</head>

<body>
  <div class="carousel my-carousel c_translate">
    <input class="c_activator" type="radio" name="carousel" id="A" checked="checked">
    <input class="c_activator" type="radio" name="carousel" id="B">
    <input class="c_activator" type="radio" name="carousel" id="C">
    <div class="c_controls">
      <label class="c_control c_control_backward" for="D"></label>
      <label class="c_control c_control_forward" for="B"></label>
    </div>
    <div class="c_controls">
      <label class="c_control c_control_backward" for="A"></label>
      <label class="c_control c_control_forward" for="C"></label>
    </div>
    <div class="c_controls">
      <label class="c_control c_control_backward" for="B"></label>
      <label class="c_control c_control_forward" for="A"></label>
    </div>
    <div class="c_track">
      <div class="c_slide"><h1>A</h1></div>
      <div class="c_slide"><h1>B</h1></div>
      <div class="c_slide"><h1>C</h1></div>
    </div>
    <div class="c_indicators">
      <label class="c_indicator" for="A"></label>
      <label class="c_indicator" for="B"></label>
      <label class="c_indicator" for="C"></label>
    </div>
  </div>
<script>
  var i = 0;
  var carousel = document.querySelectorAll('.carousel input');
  var length = carousel.length;
  setTimeout(function loop() {
    // debugger;
    carousel[i++ % length].checked = true;
    setTimeout(loop, 2000);
  }, 2000);
</script>
</body>
</html>
```

```html
<!doctype html>
<html>
<head>
<style>
@keyframes carousel {
   from { background-image: url(https://unsplash.it/400/300?random&1); }
   33% { background-image: url(https://unsplash.it/400/300?random&2); }
   66% { background-image: url(https://unsplash.it/400/300?random&3); }
   to { background-image: url(https://unsplash.it/400/300?random&1); }
}
.carousel {
  width: 400px;
  height: 300px;
  animation-name: carousel;
  animation-duration: 6s;
  animation-timing-function: step-start;
  animation-iteration-count: infinite;
}
</style>
</head>

<body>
  <div class="carousel"></div>
</body>
</html>
```

