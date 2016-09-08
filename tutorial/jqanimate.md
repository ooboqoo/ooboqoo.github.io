# jQuery 动画

## 自定义动画

#### jQuery animate()

```js
// 用法1
.animate( {properties} [, duration ] [, easing ] [, complete ] );  // {properties} 参数定义形成动画的 CSS 属性
// 用法2 
.animate( {properties}, {options} )  // 更高级更底层的用法
```

提示：默认地，所有 HTML 元素都有一个静态位置，且无法移动。如需对位置进行操作，要记得首先把元素的 CSS position 属性设置为 relative、fixed 或 absolute！

#### 操作多个属性

请注意，生成动画的过程中可同时使用多个属性：

```js
$("button").click(function(){
  $('div').animate({
    left:'250px',
    opacity:'0.5',
    height:'150px',
    width:'150px'
  });
}); 
```

可以用 animate() 方法来操作所有 CSS 属性吗？是的，几乎可以！

当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如使用 paddingLeft 而不是 padding-left。

同时，色彩动画并不包含在核心 jQuery 库中，需要下载 Color Animations 插件。

#### jQuery animate() - 使用相对值

也可以定义相对值（该值相对于元素的当前值）。需要在值的前面加上 `+=` 或 `-=`

```js
$("button").click(function(){
  $('div').animate({
    left:'250px',
    height:'+=150px',
    width:'+=150px'
  });
});
```

#### 使用预定义的值

.animate() 方法针对CSS属性提供了简写值：`show` `hide` 和 `toggle`，以便在简写方法不适用时提供另一种简化方式。

```js
$("button").click(function(){
  $('div').animate({ height:'toggle' });
});
```

#### 使用队列功能

默认地，jQuery 提供针对动画的队列功能。如果您希望在彼此之后执行不同的动画，那么我们要利用队列功能。

```js
$('button').click(function(){
  $('div')
    .animate({height:"300px", opacity:"0.4"}, "slow")
    .animate({width :"300px", opacity:"0.8"}, "slow")
    .animate({height:"100px", opacity:"0.4"}, "slow")
    .animate({width :"100px", opacity:"0.8"}, "slow")
});
```

#### jQuery Callback 函数

Callback 函数在当前动画 100% 完成之后执行。
由于 JavaScript 语句（指令）是逐一执行的 - 按照次序，动画之后的语句可能会产生错误或页面冲突，因为动画还没有完成。为了避免这个情况，您可以以参数的形式添加 Callback 函数。

### 4.5 并发与排队效果 （jQuery基础教程 P77）

#### 1. 越过队列

```js
$('div')
  .css({backgroundColor: "#0f0"})
  .fadeTo(2000, 0.1)
  .animate({left:"+=100px"}, {duration: 2000, queue: false})  //把 queue 设为 false 即可让当前动画与前一个动画同时开始
  .fadeTo(2000, 1.0);
```

#### 2. 手工队列

一个需要注意的问题是排队不能自动应用到其他的非效果方法，如 .css()。  
把非效果方法添加到队列中的一种方式，就是使用 .queue() 方法。

```js
$('div')
  .css({backgroundColor: "#0f0"})
  .fadeTo(2000, 0.1)
  //.css({backgroundColor: '#f00'})  // 若使用这行代码，背景色在fadeTo 0.1之前已经是红色了
  .queue(function(){ $('div').css({backgroundColor: '#f00'}).dequeue();})  // dequeue()不能省，否则动画会中断
  .fadeTo(2000, 1.0);
```

也可以采用回调函数，以上代码的效果等同于：

```js
$('div')
  .css({backgroundColor: "#0f0"})
  .fadeTo(2000, 0.1, function(){ $('div').css({backgroundColor: "#f00"}).dequeue();})
  .fadeTo(2000, 1.0);
```

#### 3. 回调函数中的效果生效时间

回调函数中的代码，会立即执行，但如果回调函数中有给当前元素添加效果的代码，那么，只会将效果添加到队列最后，而不会立即执行，或者说，代码执行的结果，是完成了给元素添加效果的过程。

```js
$('div')
  .css({backgroundColor: "#0f0"})
  .fadeTo(2000, 0.1)
  .queue(function() { $('div').animate({left: "+=40px"}).dequeue();})
  .fadeTo(2000, 1.0);
  // 以上代码，最终移动是在完成 fadeTo1.0 之后才执行
```

#### 4. 处理多组元素

当给多组元素添加效果时，每一组元素的效果都是独立进行的，如果要控制先后顺序，就要使用回调函数。

在使用回调函数控制不同元素间的动画顺序时，要注意 this
对象的变化。最保险的办法就是：先用一个变量存储操作对象，然后在回调函数内引用该变量，这样不容易错。

```js
// 以下代码，在点击第一个段落时，第二个段落会显示，然后第一个段落会隐藏
$('p')
  .eq(0).css('border', '1px solid #333')
  .next().css('backgroundColor', '#ccc').hide()
  .end().click(function() {
    var $clickedItem = $(this);
    $clickedItem.next().slideDown('slow', function() {
      $clickedItem.slideUp('slow');  // 如果这里用$(this)，将指向$('p')[1]
    });
  });
```

#### jQuery stop() 方法

jQuery stop() 方法用于停止动画或效果，在它们完成之前。

stop() 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

```js
$(selector).stop([stopAll], [goToEnd]);
// stopAll 参数规定是否应该清除动画队列，默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。
// goToEnd 参数规定是否立即完成当前动画，默认是 false。
```

因此，默认地，stop() 会清除在被选元素上指定的当前动画。