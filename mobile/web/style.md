# 移动网页样式开发实战

随着手机等移动设备的普及，Web 前端的开发工作也更多地偏向移动端应用，有效地掌握移动端网页样式布局，是成为一名合格前端开发工程师的必要条件。

移动端因其较好的 HTML5 和 CSS3 支持程度，在开发布局上可以尝试更多新的特性，当然，兼容性问题依旧存在。


## 静态布局

静态布局又称固定宽度布局。在 PC 端一般选择 960px，因为这个宽度可以被所有现代浏览器适配，并且能够被主流屏幕宽度比例整除，在多栏布局中不会存在带小数的像素点。移动端一般选择 320px，正好是 960px 的 1/3 宽，也具有同样的优点。

当固定宽度与视口宽度不一致时，PC 端会出滚动条或在屏幕两侧出现空白，在移动设备上这种体验会比较糟糕，不过开发者可以通过整体缩放或媒体查询进行适配。

### 整体缩放

整体缩放可以用在 *营销活动页*，用 320px 的宽度作为基础宽度(高度可以固定)，然后通过计算实际文档宽度来进行缩放。

```html
<script>
function scaleX() {
  document.querySelector('.wrap').style.transform = `scaleX(${document.body.clientWidth / 320})`;
}
scaleX();
window.addEventListener('resize', scaleX);  // 需要监听 resize 事件
</script>
<style>
.wrap { width: 320px; transform-origin: 0 0; }  /* 从原点开始缩放，确保页面正常显示 */
</style>
```

### 媒体查询

使用背景色整体填充，主体使用不同的媒体查询进行优化。媒体查询更适合一些 *展示型页面*。


## 水平居中和垂直居中

### 水平居中

文本或其他行内元素的水平和垂直居中比较容易实现，但是块级元素就相对麻烦，尤其是自适应内容的块级元素。

在 CSS 中对元素进行水平居中非常简单。如果是一个行内元素，就对其父元素设置样式 `text-align: center;` 如果是一个块级元素，就对自身设置样式 `margin: auto;`。

```css
/* 行内元素水平居中 */
p { text-align: center; }

/* 固定宽度块级元素的水平居中 - margin: auto; */
.wrapper {
  width: 200px;
  margin: 0 auto;
}

/* 自适应块级元素的水平居中 - CSS3 transform */
.wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);  /* 左边缘向左移动自身宽度的一半 */
}
```

### 行内元素垂直居中

单行文本的垂直居中只需要设置元素的高度 `height` 等于 `line-height` 即可。

多行文本的垂直居中需要分两种情况，比较简单的是不固定高度的垂直居中，可以通过 `padding` 实现，如果是固定高度的多行文本需要实现垂直居中的效果，可以使用样式 `display: table;` 套 `dispaly: table-cell; vertical-align: middle;` 来实现。

```css
/* 单行文本垂直居中 */
.single-row { height: 50px; line-height: 50px; }

/* 多行文本垂直居中 - 不固定高度 */
.multi-row { padding: 100px 20px; }

/* 多行文本垂直居中 - 不固定高度 */
.multi-row-fixed { display: table; }
.multi-row-fixed .content { display: table-cell; vertical-align: middle; }
```

### 块级元素垂直居中

块级元素的垂直居中也分两种情况。一种是元素为固定宽高，另一种是不固定宽高。

```css
/* 块级元素垂直居中 - 不固定宽高 */
.adaptive {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 块级元素垂直居中 - 固定宽高 */
.fixed {
  width: 200px;
  height: 200px;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;  /* 目前 transform 已经不存在兼容性问题，应该弃用这种用法 */
  margin-left: -100px;
}
```

### 基于视口的解决方案

如果只是想把元素相对于视口居中，可以采用视口长度单位。这种方式效果虽好，但使用有较大的局限性。

```css
.container {
  margin: 50vh auto 0;
  transform: translate(-50%);
}
```

### 基于 Flexbox 的解决方案

Flexbox 是目前推荐的最佳解决方案，专门针对这类需求所设计，*移动端布局首选*。

```scss
.wrapper {
  display: flex;
  width: 600px;
  height: 600px;
  [class^=item] {
    width: 100px;
    height: 100px;
  }
  .item1 {
    margin: auto;        // 同时实现水平、垂直居中 (去掉 .item2 占用空间后的水平居中)
  }
  .item2 {
    align-self: center;  // 仅设置垂直居中
  }
}
```


## 格栅布局

格栅系统(布局)是从桌面浏览器时代流传下来的一种响应式布局方式，主流的 CSS 框架诸如 Bootstrap 等都内置了格栅系统。格栅系统的实现，通常将容器均分为12等份，再通过一系列行 Row 与列 Column 的组合创建页面布局并调整内外边距，结合 CSS 的媒体查询可以实现一个响应式的格栅系统。


## Flexbox 布局

略...


## rem 布局实战

```html
<meta name="viewport" content="initial-scale=1, user-scalable=no, viewport-fit=cover">
```

注意，此处设置的视窗宽度跟浏览器的宽度保持一致，而不是跟设备宽度保持一致。有些网站会在设置 `viewport` 属性时加入 `width=device-width`，使得视窗宽度等于设备宽度。在移动端，大部分情况下，浏览器宽度等于设备宽度，但在 Hybrid APP 内会有例外情况。举个例子，沪江网校 iPad 版，选课中心是原生 APP 页面，当单击具体课程时，弹出原生对话框，原生对话框里展示的是内嵌的 Web 页面，这时，浏览器宽度是对话框的宽度，并不是 iPad 的宽度。

```scss
// 将设计稿上的尺寸从单位 px 转换成 em
@function px2rem($x) {
  @return $x / 10 * 1rem;  // 这里的 10 可根据实际 rem 设定进行调整
}
```


## 侧边栏的滑进滑出效果

在移动开发中，由于屏幕空间有限，经常会把一些菜单或功能浮窗隐藏在屏幕一侧，当单击展开按钮时，以滑出的效果呈现内容。

```html
<div class="body">
  <!-- 定义左上角用户头像 -->
  <a class="avatar_small"></a>
  <!-- 网页主体内容，直接使用截图 -->
  <img src="assets/body.png" style="width:10rem;" />
</div>
<!-- 定义网页遮罩 -->
<div class="mask"></div>
<!-- 定义侧边栏容器 -->
<div class="nav">
  <ul>
    <li><a><img class="avatar_big" src="assets/guest.png" /></a></li>
    <li><a>我的课程</a></li>
    <li><a>我的订单</a></li>
    <li><a>我的收藏</a></li>
    <li><a>个人中心</a></li>
  </ul>
</div>
```

此处的遮罩看似多余，但在实际项目中非常有必要，一是可以保护页面元素不被误点，二来直接将隐藏侧边栏的事件绑定在遮罩层元素上，极大地简化了实现难度，也降低了维护成本。

```css
/* 设置滑出菜单时网页遮罩的样式 */
.mask { 
  display: none;       /* 默认隐藏 */
  position: fixed;       /* 设置定位方式 */
  z-index: 10;
  left: 0; top: 0;       /* 设置位置 */
  width: 100%; height: 100%;  /* 设置大小 */
  background-color: rgba(0,0,0,0.1); /* 设置背景色和透明度 */
}
/* 设置侧边栏样式 */
.nav { 
  position: absolute;      /* 设置定位方式 */
  z-index: 11;
  left: -5rem; top: 0;      /* 设置初始位置 */
  width: 5rem; height: 100%;  /* 设置大小 */
  background-color: #555;    /* 设置背景色 */
}
/* 设置侧边栏滑出效果 */
.nav { 
  transition: left linear 0.3s;  /* 设置过渡函数和时间 */
}
```

```js
// 分别获取元素：用户头像、遮罩和侧边栏
var btn = document.querySelector('.avatar_small'),
    mask = document.querySelector('.mask'),
    nav = document.querySelector('.nav');
btn.addEventListener('click', function () { 
  mask.style.display = 'block';
  nav.style.left = '0';
}, false);
mask.addEventListener('click', function () { 
  mask.style.display = 'none';
  nav.style.left = '-5rem';
}, false);
```


## 模拟原生的页面切换效果

本节使用 `transform` 模拟原生应用的横向页面切换效果。由于 Web 应用中，页面跳转会导致资源重新加载，可能会产生长时间的白屏等待，所以为了实现仿原生应用的页面切换效果，需要以单页 Web 应用的形式来呈现。

```html
<div class="pages">
  <div class="page page-home">
    <div style="background-color: #000;">1111</div>
  </div>
  <div class="page page-start">
    <div style="background-color: #6699cc;">22222</div>
  </div>
</div>
<style>
  .enter, .leave { position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 1; }
  .enter { animation: slideIn .5s forwards; }
  .leave { animation: slideOut .55s forwards; }
  @keyframes slideIn {
    from { transform: translate3d(100%, 0, 0); opacity: 0; }
    to { transform: translate3d(0, 0, 0); opacity: 1; }
  }
</style>
<script>
  /* ... */enterPage.classList.add('enter');
</script>
```


## 提高动画性能

在网页动画出现初期，诸多开发者选择使用 jQuery 等库为页面添加动画效果，但这些类库为了更好的兼容性并没有对动画进行优化，导致动画往往十分卡顿。随着新型浏览器的普及和开发者对体验的重视，Web 动画无论在效果还是流畅度上都得到了大幅提升。

### 使用 CSS3 动画

图层的重新布局非常影响性能。

CSS3 的 `transform` 属性，在一些先进的浏览器中，会触发一个新的图层，甚至会启动设备的硬件加速(可以通过 `translateZ(0)` 或 `translate3d(0,0,0)` 触发)，这样性能消耗的主要点仅仅集中在了图层的组合上。

样式 `opacity` 也是一个会触发 GPU 加速的 CSS 属性，所以一些例如改变 color 属性的动画可以使用这一属性进行替代。

### 使用高性能的 JavaScript 动画

虽然 CSS3 动画有着不错的性能，但缺乏控制，有些特效还得通过 JS 实现。由于 JS 动画发生在浏览器的主线程中，如果设置不当很有可能发生丢帧的情况，下面提几点优化方向。

#### 去除布局颠簸

开发者为一个元素进行持续地获取和设置操作时，在每次设置过程中，浏览器会计算这次更改所产生的后续影响(每个变化都会影响周围的元素)，如果这个情况大量发生或者发生在循环中，就会导致 UI 性能降低，该情况被称为 **布局颠簸**。

浏览器对于同一时间的一系列操作可以优化为一个单一的操作，利用这一特性可提高 DOM 存取性能。

另外在一些循环中使用 `setTimeout` 或 `setInterval` 进行动画调用时，不合理的时间设置也会导致页面卡顿，这时推荐使用 `requestAnimationFrame`，这样动画的绘制交由浏览器绘制请求，避免刷新间隔之间插入绘制请求导致丢帧出现卡顿感。

```js
var handle = setTimeout(renderLoop, period);     // setTimeout 实现
var handle = requestAnimationFrame(renderLoop);  // requestAnimationFrame 实现
```

#### 使用节流函数

另一个重要的优化点是使用节流函数。有时候开发者会需要注册一些回调函数在浏览器的 scroll 或 resize 事件上，但是此类事件触发非常频繁，而实际用户并不需要感知这么多的事件产生，造成大量函数触发，而如果这些函数与动画有关，会给浏览器造成巨大压力，节流函数可以很好地解决这个问题。

节流函数的原理是设置一个阈值，在一定时间内的触发并不真实调用函数，从而做到性能的优化。实现的方式主要有 *去抖(debounce)和节流(throttle)*。反跳是调用动作 n 毫秒内，才会执行该动作，若在 n 毫秒内有调用此动作则将重新计算时间。节流这是先设置一个执行周期，当调用的时刻大于等于执行周期时才执行并进入下一周期。

最后实际开发中可以借助优秀的第三方动画库，如 Velocity.js，以较为轻松的方式获得更优秀的性能。

