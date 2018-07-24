# Canvas 画布


## 笔刷

牛X的不要不要的 http://perfectionkills.com/exploring-canvas-drawing-techniques/


## 提高画布性能

https://www.html5rocks.com/zh/tutorials/canvas/performance/

### 预呈现到离屏画布

如果要将相似图元重复绘制到屏幕的多个帧上（正如编写游戏时的常见情况），您就可以预呈现场景中较大的部分从而显著提升性能。预呈现是指在一张（或多张）离屏画布上呈现临时图片，然后将离屏画布重新呈现到显示的画布上。对于那些熟悉计算机图形的人，此技术也称为显示列表。

例如，假设您要以 60 帧/秒的帧率重复绘制马里奥。您可以在每帧上重复绘制马里奥的帽子、胡子和“M”标志，也可以在播放动画前预呈现他。

无预呈现：

```js
// canvas, context are defined
function render() {
  drawMario(context);
  requestAnimationFrame(render);
}
```

预呈现：

```js
var m_canvas = document.createElement('canvas');
m_canvas.width = 64;
m_canvas.height = 64;
var m_context = m_canvas.getContext('2d');
drawMario(m_context);

function render() {
  context.drawImage(m_canvas, 0, 0);
  requestAnimationFrame(render);
}
```

### 集中批量调用画布

例如，绘制多个线条时，效率更高的做法是，创建一个包含所有线条的路径，然后通过单个绘制调用进行绘制。

```js
// 优化前
for (var i = 0; i < points.length - 1; i++) {
  var p1 = points[i];
  var p2 = points[i+1];
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.stroke();
}

// 优化后
context.beginPath();
for (var i = 0; i < points.length - 1; i++) {
  var p1 = points[i];
  var p2 = points[i+1];
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
}
context.stroke();  // 绘制一条折线可以带来更高的性能
```

### 避免不必要的画布状态更改

HTML5 画布元素是基于状态机实施的，状态机会跟踪一些内容，例如填充和边框样式，以及组成当前路径前面的点。在尝试优化图形性能时，最好只将关注点放在图形呈现上。但是，操作状态机也可能产生性能开销。

例如，如果您使用多种填充颜色呈现某个场景，那么在画布上按颜色呈现就比按展示位置呈现的性能开销要低。

```js
// 优化前
for (var i = 0; i < STRIPES; i++) {
  context.fillStyle = (i % 2 ? COLOR1 : COLOR2);  // 频繁切换状态
  context.fillRect(i * GAP, 0, GAP, 480);
}

// 优化后
context.fillStyle = COLOR1;
for (var i = 0; i < STRIPES/2; i++) {
  context.fillRect((i*2) * GAP, 0, GAP, 480);
}
context.fillStyle = COLOR2;  // 只切换一次状态
for (var i = 0; i < STRIPES/2; i++) {
  context.fillRect((i*2+1) * GAP, 0, GAP, 480);
}
```

### 仅呈现屏屏幕上的差异，而不是整个新状态

如果重复绘制之间只有增量差异，那么您只需绘制差异，即可显著提升性能。也就是说，在绘制前无需清空整个屏幕。

### 将多层画布用于复杂场景

如果可以将游戏或多媒体应用分为前景和背景，那么使用多层画布分别呈现内容可显著提升性能。这样，我们无需在绘制或清空前景画布时修改背景，或者可以每次都呈现前景，但每隔 N 帧才重绘一次背景。

您可以进行如下设置，其中两张绝对定位画布相互重叠。

```html
<canvas id="bg" width="640" height="480" style="position: absolute; z-index: 0"></canvas>
<canvas id="fg" width="640" height="480" style="position: absolute; z-index: 1"></canvas>
```

### 避免使用 shadowBlur 效果

HTML5 画布允许开发人员模糊处理图元，但此操作的性能开销可能会很高

```js
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 4;
context.shadowColor = 'rgba(255, 0, 0, 0.5)';
context.fillRect(20, 20, 150, 100);
```

### 避免使用浮点数坐标

HTML5 画布支持子像素呈现，且无法停用。如果您使用非整数的坐标绘制内容，系统就会自动使用抗锯齿功能，尝试对线条进行平滑处理（结果其实就是图片变模糊了，吃力不讨好）。如果不需要平滑贴图的效果，您可以使用 Math.floor 或 Math.round 更快地将坐标转换成整数。

您可以使用几种巧妙的技术将浮点数坐标转换成整数，其中性能最高的是，将目标数字加上 0.5，然后对结果执行逐位运算以消除小数部分。

```js
rounded = (0.5 + somenum) | 0;  // With a bitwise or.
rounded = ~~ (0.5 + somenum);   // A double bitwise not.
rounded = (0.5 + somenum) << 0; // Finally, a left bitwise shift.
```

### 使用 requestAnimationFrame 优化动画

推荐使用相对较新的 requestAnimationFrame API 在浏览器中实施交互式应用。您可以请求浏览器在空闲时调用呈现程序，而不是命令浏览器以固定的节拍率呈现内容。这会产生一个良性的副作用：浏览器会足够智能以识别出网页不在前景的情况，且不呈现任何内容。

requestAnimationFrame 适用于画布以及 WebGL 等其他呈现技术。


## 性能监控方案

https://stackoverflow.com/questions/8279729/calculate-fps-in-canvas-using-requestanimationframe

Chrome 自带监控界面: Rendering 页签下勾选 FPS meter  
或者自己在页面添加 meter:

```js
var frames = []
var lastFps = 60
var fps = document.getElementById('fps')

function render() {
  // 绘制代码放这 ...

  requestAnimationFrame(render)
  const now = performance.now()
  while(frames.length > 0 && now - frames[0] >= 500) { frames.shift() }
  frames.push(now)
  let fps = frames.length * 2
  if (fps - lastFps > 1 || fps - lastFps < -1) {
    if (fps === 62) { fps = 60 }
    document.getElementById('fps').innerHTML = fps + ' FPS'
  }
  lastFps = fps
}

render()
```

## 性能优化实践

http://taobaofed.org/blog/2016/02/22/canvas-performance/

Canvas 最常见的用途是渲染动画。渲染动画的基本原理，无非是反复地擦除和重绘。为了动画的流畅，留给我渲染一帧的时间，只有短短的 16ms。在这 16ms 中，我不仅需要处理一些游戏逻辑，计算每个对象的位置、状态，还需要把它们都画出来。如果消耗的时间稍稍多了一些，用户就会感受到「卡顿」。所以，在编写动画（和游戏）的时候，我无时无刻不担忧着动画的性能，唯恐对某个 API 的调用过于频繁，导致渲染的耗时延长。

### 计算与渲染

把动画的一帧渲染出来，需要经过以下步骤：

1. 计算：处理游戏逻辑，计算每个对象的状态，不涉及 DOM 操作(当然也包含对 Canvas 上下文的操作)。
2. 渲染：真正把对象绘制出来。
  1. JavaScript 调用 DOM API(包括 Canvas API) 以进行渲染。
  2. 浏览器（通常是另一个渲染线程）把渲染后的结果呈现在屏幕上的过程。

之前曾说过，留给我们渲染每一帧的时间只有 16ms。然而，其实我们所做的只是上述的步骤中的 1 和 2.1，而步骤 2.2 则是浏览器在另一个线程(至少几乎所有现代浏览器是这样的)里完成的。动画流畅的真实前提是，以上所有工作都在 16ms 中完成，所以 JavaScript 层面消耗的时间最好控制在 10ms 以内。

虽然我们知道，通常情况下，渲染比计算的开销大很多(3~4 个量级)。除非我们用到了一些时间复杂度很高的算法(这一点在本文最后一节讨论)，计算环节的优化没有必要深究。

我们需要深入研究的，是如何优化渲染的性能。而优化渲染性能的总体思路很简单，归纳为以下几点：

在每一帧中，尽可能减少调用渲染相关 API 的次数(通常是以计算的复杂化为代价的)。
在每一帧中，尽可能调用那些渲染开销较低的 API。
在每一帧中，尽可能以「导致渲染开销较低」的方式调用渲染相关 API。

### Canvas 上下文是状态机

Canvas API 都在其上下文对象 context 上调用。

```js
var ctx = canvasElement.getContext('2d')
```

我们需要知道的第一件事就是，context 是一个状态机。你可以改变 context 的若干状态，而几乎所有的渲染操作，最终的效果与 context 本身的状态有关系。比如，调用 strokeRect 绘制的矩形边框，边框宽度取决于 context 的状态 lineWidth，而后者是之前设置的。

```js
ctx.lineWidth = 5
ctx.strokeColor = 'rgba(1, 0.5, 0.5, 1)'
ctx.strokeRect(100, 100, 80, 80)
```

说到这里，和性能貌似还扯不上什么关系。那我现在就要告诉你，对 `ctx.lineWidth` 赋值的开销远远大于对一个普通对象赋值的开销，你会作如何感想。

当然，这很容易理解。Canvas 上下文不是一个普通的对象，当你调用了 context.lineWidth = 5 时，浏览器会需要立刻地做一些事情，这样你下次调用诸如 stroke 或 strokeRect 等 API 时，画出来的线就正好是 5 个像素宽了（不难想象，这也是一种优化，否则，这些事情就要等到下次 stroke 之前做，更加会影响性能）。

我尝试执行以下赋值操作 106 次，得到的结果是：对一个普通对象的属性赋值只消耗了 3ms，而对 context 的属性赋值则消耗了 40ms。值得注意的是，如果你赋的值是非法的，浏览器还需要一些额外时间来处理非法输入，正如第三/四种情形所示，消耗了 140ms 甚至更多。

```js
somePlainObject.lineWidth = 5  // 3ms (10^6 times)
ctx.lineWidth = 5  // 40ms
ctx.lineWidth = 'Hello World!' // 140ms
ctx.lineWidth = {} // 600ms
```

对 context 而言，对不同属性的赋值开销也是不同的。lineWidth 只是开销较小的一类。下面整理了为 context 的一些其他的属性赋值的开销，如下所示。

属性                 | 开销  | 开销（非法赋值）
---------------------|-------|------------------
line[Width/Join/Cap] | 40+   | 100+
[fill/stroke]Style   | 100+  | 200+
font                 | 1000+ | 1000+
text[Align/Baseline] | 60+   | 100+
shadow[Blur/OffsetX] | 40+   | 100+
shadowColor          | 280+  | 400+

与真正的绘制操作相比，改变 context 状态的开销已经算比较小了，毕竟我们还没有真正开始绘制操作。我们需要了解，改变 context 的属性并非是完全无代价的。我们可以通过适当地安排调用绘图 API 的顺序，降低 context 状态改变的频率。

### 分层 Canvas

分层 Canvas 在几乎任何动画区域较大，动画较复杂的情形下都是非常有必要的。分层 Canvas 能够大大降低完全不必要的渲染性能开销。分层渲染的思想被广泛用于图形相关的领域：从古老的皮影戏、套色印刷术，到现代电影/游戏工业，虚拟现实领域，等等。而分层 Canvas 只是分层渲染思想在 Canvas 动画上最最基本的应用而已。

### 绘制图像

目前，Canvas 中使用到最多的 API，非 drawImage 莫属了。（当然也有例外，你如果要用 Canvas 写图表，自然是半句也不会用到了）。

#### 数据源与绘制的性能

由于我们具备「把图片中的某一部分绘制到 Canvas 上」的能力，所以很多时候，我们会把多个游戏对象放在一张图片里面，以减少请求数量。这通常被称为「精灵图」。然而，这实际上存在着一些潜在的性能问题。我发现，使用 drawImage 绘制同样大小的区域，数据源是一张和绘制区域尺寸相仿的图片的情形，比起数据源是一张较大图片（我们只是把数据扣下来了而已）的情形，前者的开销要小一些。可以认为，两者相差的开销正是「裁剪」这一个操作的开销。

> 我尝试绘制 104 次一块 320x180 的矩形区域，如果数据源是一张 320x180 的图片，花费了 40ms，而如果数据源是一张 800x800 图片中裁剪出来的 320x180 的区域，需要花费 70ms。

虽然看上去开销相差并不多，但是 drawImage 是最常用的 API 之一，我认为还是有必要进行优化的。优化的思路是，将「裁剪」这一步骤事先做好，保存起来，每一帧中仅绘制不裁剪。具体的，在「离屏绘制」一节中再详述。

#### 视野之外的绘制

有时候，Canvas 只是游戏世界的一个「窗口」，如果我们在每一帧中，都把整个世界全部画出来，势必就会有很多东西画到 Canvas 外面去了，同样调用了绘制 API，但是并没有任何效果。我们知道，判断对象是否在 Canvas 中会有额外的计算开销（比如需要对游戏角色的全局模型矩阵求逆，以分解出对象的世界坐标，这并不是一笔特别廉价的开销），而且也会增加代码的复杂程度，所以关键是，是否值得。

我做了一个实验，绘制一张 320x180 的图片 104 次，当我每次都绘制在 Canvas 内部时，消耗了 40ms，而每次都绘制在 Canvas 外时，仅消耗了 8ms。大家可以掂量一下，考虑到计算的开销与绘制的开销相差 2~3 个数量级，我认为通过计算来过滤掉哪些画布外的对象，仍然是很有必要的。

### 离屏绘制

上一节提到，绘制同样的一块区域，如果数据源是尺寸相仿的一张图片，那么性能会比较好，而如果数据源是一张大图上的一部分，性能就会比较差，因为每一次绘制还包含了裁剪工作。也许，我们可以先把待绘制的区域裁剪好，保存起来，这样每次绘制时就能轻松很多。

drawImage 方法的第一个参数不仅可以接收 Image 对象，也可以接收另一个 Canvas 对象。而且，使用 Canvas 对象绘制的开销与使用 Image 对象的开销几乎完全一致。我们只需要实现将对象绘制在一个未插入页面的 Canvas 中，然后每一帧使用这个 Canvas 来绘制。

```js
// 在离屏 canvas 上绘制
var canvasOffscreen = document.createElement('canvas');
canvasOffscreen.width = dw;
canvasOffscreen.height = dh;
canvasOffscreen.getContext('2d').drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);

// 在绘制每一帧的时候，绘制这个图形
context.drawImage(canvasOffscreen, x, y);
```

离屏绘制的好处远不止上述。有时候，游戏对象是多次调用 drawImage 绘制而成，或者根本不是图片，而是使用路径绘制出的矢量形状，那么离屏绘制还能帮你把这些操作简化为一次 drawImage 调用。

### 避免阻塞

### 小结

正文就到这里，最后我们来稍微总结一下，在大部分情况下，需要遵循的「最佳实践」。

* 将渲染阶段的开销转嫁到计算阶段之上。
* 使用多个分层的 Canvas 绘制复杂场景。
* 不要频繁设置绘图上下文的 font 属性。
* 不在动画中使用 putImageData 方法。
* 通过计算和判断，避免无谓的绘制操作。
* 将固定的内容预先绘制在离屏 Canvas 上以提高性能。
* 使用 Worker 和拆分任务的方法避免复杂算法阻塞动画运行。
