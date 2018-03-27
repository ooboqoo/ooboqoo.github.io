# CSS3

CSS3 作为 CSS 技术的升级版本，经历多年的发展，已经在移动端被广泛使用，比如圆角、透明度、阴影、动画、响应式等功能。

## 认识 CSS3

### 什么是 CSS3

CSS 全称 Cascading Style Sheets，中文意思是层叠样式表，是一种用来用来布局和美化网页的样式表语言。之所以称之为层叠样式表，是因为当同一个 HTML 元素被多个样式表定义时，所有的样式表会根据一定的规则层叠为一个新的样式表。

与之前版本 CSS 不同的是，CSS3被划分为多个模块，每个模块都有独立规范，每个模块都有各自独立的创作者和发布时间表，并且模块之间互不依赖。因为每个模块都被独立地标准化，从形式上来说，已经不存在 CSS3 自身标准。

### 移动端现状

https://www.w3.org/Style/CSS/current-work  
https://caniuse.com/#search=calc

通过总体的数据观察，对移动端而言，常用的 CSS3 属性在浏览器的支持程度普遍较高。在移动端开发时，应该尽量使用 CSS3 新属性，提高开发效率及页面性能。

### 使用 Modernizr

https://modernizr.com/docs

Modernizr 是一个用于检测用户浏览器的 HTML5 与 CSS3 特性的 JavaScript 库。

原理
```js
Modernizr.addTest('csscalc', function () {
    var pop = 'width:';
    var value = 'calc(10px)';
    var el = document.createElement('div');
    el.style.cssText = prop + Modernizr._prefixes.join(value + prop);
    return !!el.style.length;
});
```

Modernizr.js 被引入后会立即开始检测当前浏览器支持的属性，并将检测结果通过 CSS 和 JavaScript 两种方式暴露出来。

```html
<html class="js no-opacity postmessage history csscalc boxshadow">
<style type="text/css">
    .no-csscalc {  }
    .csscalc {  }
</style>
<script type="text/javascript">
    if (Modernizr.csscalc) {  } else {  }
</script>
```


## 选择器

伪类：
  * 动态伪类 Dynamic pseudo-classes :link :visited :hover :active :focus
  * 目标伪类 :target
  * 语言伪类
  * UI元素状态伪类
  * 结构性伪类
  * 否定伪类
伪元素：

### 优先级和权重

权重决定了 CSS 规则怎样被浏览器解析直到生效，当很多条规则被应用到某个元素上时，最终呈现的效果是按照规则各自的优先级和权重来决定的。

CSS 中的权重分为 4 个级别：
  * 内联样式
  * ID 选择器
  * 类、伪类、属性选择器
  * 元素、伪元素

权重计算时可以使用 "0,0,0,0" 的形式来表示一个权重，分别对应上面的 4 个级别。

```txt
*          0,0,0,0
ul li      0,0,0,2
ul li.item 0,0,1,2
```

最后，还有一个特殊的规则就是 `!important`，`!important` 写在 CSS 规则后面，可以将对应的规则提升到最高的权重。

由于浏览器在解析选择器的时候是按照从右到左的顺序进行的，这就导致更多层级选择器嵌套规则在查找时会花费更多的时间，在从左往右的匹配过程中，会有很多规则匹配花费在失败的查找上，因此用更简短、更容易被查找到的选择器是一个好习惯。

## 响应式开发

### 常见设备的宽高

响应式开发的本质是针对多种屏幕做适配，在实际开发中，通常情况下是对主流的设备适配。

首先，需要掌握几个基本概念：
  * 物理像素 - 设备的屏幕实际像素点，即通常说的设备分辨率
  * 设备独立像素 - 逻辑像素，用于定义应用的 UI
  * 屏幕像素比 devicePixelRatio - 物理像素与设备独立像素的比值

|||
|----------|---------------------------------------------------------
| 375x667  | iPhone7, 6, 6S
| 414x736  | iPhone7P, 6SP, 6P
| 320x568  | iPhone5, 5S, 5C, SE
| 360x640  | Galaxy S7, S6, S5, S4, S3, Note4, Note3, Note2; Mi4, 3
| 768x1024 | iPad 全系列

在一台 iPhone5 上以下 div 并不会铺满整个屏幕，因为视口的默认宽度是 980 像素。

```html
<div style="width: 320px; height: 320px; background-color: gray;"></div>
```

通过设置 viewport 属性，可以调整用户界面的逻辑大小。通过 viewport 使得开发者不必过多关心设备的物理分辨率，降低了适配不同尺寸屏幕的难度并减少开发成本。

### Flex 弹性盒布局

在 Flex 出现之前，布局基于盒模型，依赖 display position 和 float 样式属性。但是使用时需要注意清除浮动，并且对于一些特定布局的实现非常不便。

页面底部导航菜单项示例

```html
<footer>
    <a href="#"><span class="icon-home"></span>首页</a>
    <a href="#"><span class="icon-delivery"></span>物流</a>
    <a href="#"><span class="icon-cart"></span>购物车</a>
    <a href="#"><span class="icon-account"></span>我的账户</a>
    <a href="#"><span class="icon-more"></span>更多</a>
</footer>
```

```css
footer {
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #f8f8f8;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding-top: .5em;
}
footer a {
    flex: 1;
    text-align: center;
    text-decoration: none;
    color: #5d656b;
}
footer a span {font-family: iconfont; font-size: 1.5em;}
footer a {font-size: 10px; margin: 0;}
```

### 媒体查询

采用媒体查询，可以给不同的设备应用不同的样式。这样在编写 CSS 的时候，先定义统一的样式，然后再根据不同的设备情况优化展示效果，比如根据设备的分辨率，给不同的设备加载不同尺寸的图片，从而使得在不同设备上都能得到更好的用户体验。

```css
.wrapper {
    padding-top: 50px;
    background: #fff;
}
@media screen and (min-width: 640px) {  // 分辨率宽度不小于 640px 的屏幕上，包含 640px 的情形
    .wapper {
        width: 480px;
        margin: 0 auto;
    }
}
```

每天查询有两种用法，一个是定义在 CSS 中，另一种是直接定义在页面的 Link 元素中，采用 media 属性，在这种情形下，引用的 CSS 资源始终会加载，并由 media 属性中定义的条件来决定引用的样式是否生效。

```html
<link rel="stylesheet" media="(max-width: 800px)" href="example.css">
```

### 用 rem 开发响应式设计

CSS 中的计量单位包括 px pt em rem 等，其中 em font size of the element 是相对于当前元素的字体大小的计量单位，而 rem font size of the root element 是指相对于根元素的字体的大小。

rem 单位主要用于移动 Web 开发，以适配不同尺寸的屏幕。

rem 单位是相对于网页根元素的字号大小而定，所有实现 rem 布局开发时，首先要做的就是对根元素赋值，那么到底赋多大值才合适呢？这个并没有统一标准，为了便于计算，实例中使用宽度除以10的大小作为根元素字号。另外考虑到横竖屏的变换，在 window 对象添加 resize 事件监听，以在屏幕变换后重置根元素字号。

```html
<html style="font-size: 20px;">
```

### 多列 Multiple Columns



## 动效

### 转换 transform

```
transform: none | <transform-function> [<transform-function>]*;
```

```
移动 translate(x,y) translate3d(x,y,z) translateX(x) translateY(y) translateZ(z)  
缩放 scale(x,y) scale3d(x,y,z) scaleX(x) scaleY(y) scaleZ(z)  
旋转 rotate(angle) rotate3d(x,y,z,angle) rotateX(angle) rorateY(angle) rorateZ(angle)  
倾斜 skew(x-angle,y-angle) skewX(angle) skewY(angle)  
其他 matrix(n,n,n,n,n,n) matrix3d(16个n) perspective(n)
```

### 过渡 transition

```
transition: <property> <duration> <timing-function> <delay>;
```

### 动画 animation

```
animation: <name> <duration> <timing-function> <delay> <iteration-count> <direction>
```

```css
.img.show {animation:move 2s ease 1 normal;}
@keyframes move {
    0%   { top: -400px; }
    50%  { top: 20px;   }
    100% { top: 1000px; }
}
```

Animation 只是将定义好的动画应用到元素 1 次或 n 次，并不会对元素最初的样式造成影响，也就是说，在 `@keyframes` 中定义的样式最终都会消失。


## 常用特性


## 预编译






