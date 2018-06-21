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

