# 移动端开发小专题

## 移动端展现

### 视口

https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```



## 移动端事件

http://www.cnblogs.com/tugenhua0707/p/5204568.html

### click 响应有 300ms 延迟

click 事件在移动手机开发中有 300ms 的延迟，因为在手机早期，用户在屏幕上点击两次之后，系统会触发放大或者缩放功能。因此系统做了一个处理，在 300ms 这段时间内如果触摸了第二次的话，说明是触发放大或缩放功能，否则是 click 事件。

### 手势事件的介绍

|||
|---------------|--------------------------------------------
| `touchstart`  | 当手指放在屏幕上触发
| `touchmove`   | 当手指在屏幕上滑动时，连续地触发
| `touchend`    | 当手指从屏幕上离开时触发
| `touchcancel` | 当系统停止跟踪时触发，该事件暂时使用不到

由于触摸会导致屏幕动来动去，所以我们可以在这些事件中函数内部使用 `event.preventDefault()` 来阻止掉默认事件(默认滚动).

### 触摸事件

这个事件针对 iOS 设备，一个 Gestures 事件在两个或更多手指触摸屏幕时触发。

|||
|-----------------|-----------------------------------------------------------
| `gesturestart`  | 当一个手指已经按在屏幕上，而另一个手指又触摸在屏幕时触发
| `gesturechange` | 当触摸屏幕的任何一个手指的位置发生改变的时候触发
| `gestureend`    | 当任何一个手指从屏幕上面移开时触发

触摸事件和手势事件的之间关系：
* 一个手指放在屏幕上时，会触发touchstart事件，而另一个手指触摸在屏幕上时触发gesturestart事件，随后触发基于该手指的touchstart事件。
* 如果一个或两个手指在屏幕上滑动时，将会触发gesturechange事件，但是只要有一个手指移开时候，则会触发gestureend事件，紧接着会触发touchend事件。

手势的专有属性：

|||
|------------|------------------------------------------------------------------------------------
| `rotation` | 表示手指变化引起的旋转角度，负值表示逆时针，正值表示顺时针，从0开始
| `scale`    | 表示2个手指之间的距离情况，向内收缩会缩短距离，这个值从1开始的，并随距离拉大而增长


## 开发框架选型

### Zepto.js

https://github.com/madrobby/zepto

Zepto is a minimalist JavaScript library for modern browsers with a largely jQuery-compatible API. If you use jQuery, you already know how to use Zepto.

核心要点：
* Zepto 更轻量级，是 jQuery 的精简，针对移动端去除了大量 jQuery 的兼容代码
* 部分API的实现方式不同

详情
* 针对移动端程序，Zepto 有一些基本的触摸事件可以用来做触摸屏交互（tap事件、swipe事件）
* Zepto是不支持IE浏览器的。
* DOM操作的区别：添加id时jQuery不会生效而Zepto会生效
* 事件触发的区别：使用jquery时load事件的处理函数不会执行；使用zepto时load事件的处理函数会执行
* 事件委托的区别：zepto中，选择器上所有的委托事件都依次放入到一个队列中，而在jquery中则委托成独立的多个事件
* width() 与 height()的区别：zepto由盒模型（box-sizing）决定，用.width()返回赋值的width，用.css('width')返回border等的结果；jquery会忽略盒模型，始终返回内容区域的宽/高（不包含padding、border）
* .offset()的区别：zepto返回{top,left,width,height}; jquery返回{width,height}。zepto无法获取隐藏元素宽高，jquery可以zepto中没有为原型定义extend方法而jquery有
* zepto的each方法只能遍历数组，不能遍历JSON对象。

### Vue.js


## 细节知识点

#### 屏幕旋转事件

```js
window.onorientationchange = function () {
    switch(window.orientation) {
        case 0:   /* */ break;
        case -90: /* */ break;
        case 90:  /* */ break;
        case 180: /* */
    }
}
```

#### 判断是否为微信浏览器

```js
(/MicroMessenger/i).test(navigator.userAgent);
```

