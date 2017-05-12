# 杂碎知识点

#### sessionStorage

每个 tab 页的 sessionStorage 都是独立的，无法通过 sessionStorage 实现标签页之间的通信。可以利用 `localStorage` 以及监听 `window` 上 `storage` 事件来解决。

#### 外链文件名后跟 `?` 并带参数的作用

```
<link href="/css/main.css?v=20110526" rel="Stylesheet">
<script src="/js/app.js?20110526"></script>
```

问：上面链接外部的css或js文件名后跟了一个“?”，并带上一个参数，作用是什么呢？  
答：js或css带参数,是为了避免旧的浏览器缓存继续生效；特别是在大型站中随时可能会更改局部css文件，为了避免浏览器刷新而继续使用旧的CSS缓存文件，在使用时往往会带上一个动态参数。

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

