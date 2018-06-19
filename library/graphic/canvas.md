# Canvas 画布

## Canvas 基础

`<canvas>` 元素是一切高级图形应用的核心所在。利用它可以开发出很多你梦寐以求的东西（比如游戏、地图和动态图表），也可以开发出你从未想过的东西（比如音乐灯光秀、物理模拟器）。

#### 浏览器支持

除了 IE8 不行，其他的都支持。如果需要支持 IE，可以到 [Modernizr](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) 查找解决方案。

### 创建画布

创建 `<canvas>` 元素需要指定三个属性：id 、width 和 height。JavaScript 脚本使用 id 找到这块“画布”，而 width 和 height 属性指定画布的宽度和高度。

```html
<canvas id="drawingCanvas" width="500" height="300"></canvas> <!-- 不要在样式表中设置尺寸 -->
```

> **尺寸应当在标记中指定，而不应使用css**   
CSS 的 width 和 height 属性与画布的 width 和 height 属性并不是一回事儿。如果仅在 CSS 中指定尺寸，那画布会取得其默认尺寸 (300px × 150px)。然后，CSS 的 width 和 height 属性又会把画布拉伸或压缩到它设置的大小。与此同时，画布中的内容也会随之变形。

### Canvas 坐标系

与其他 HTML 元素一样，`<canvas>` 坐标的左上角是坐标原点(0,0)。向右移动，x值增大，向下移动，y值增大。

### 路径

beginPath() 开启新路径   
closePath() 闭合当前路径（首尾相连形成闭合区域）

### 简单绘画

`<canvas>` 元素本身并不具有绘图功能，它只是提供一个容器。`getContext()` 方法返回一个对象，该对象提供了在画板上绘画所需要的方法和属性。

方法及属性   | 描述
------------ | ----------------
lineWidth    | 设置线条宽度
strokeStyle  | 设置线条的颜色，可以使用 HTML 颜色名、颜色编码 以及 rgb() 函数
lineCap      | 设置线头类型，默认是 butt（方头）还有 round（圆头）或 square（加长方头，线条两头各加长一半线宽）
lineJoin     | 指定线段交点的形状，默认是 mitre（锐角斜接），还有 round（圆头）和 bevel（平头斜接）
moveTo(x,y); | 移动到某一点
lineTo(x,y); | 在画布上画直线（绘制路径）
stroke();    | 沿着路径画出线条
fillStyle    | 设置填充颜色
fill()       | 执行填充操作
rect(x,y,width,height)       | 绘制矩形路径
strokeRect(x,y,width,height) | 直接绘制一个矩形框 = rect() + stroke()
fillRect(x,y,width,height)   | 直接填充一个矩形区域 = rect() + fill()

```js
var canvas = document.getElementById("drawingCanvas");  // 取得 <canvas> 对象
var ctx = canvas.getContext("2d");                      // 取得二维绘图上下文
// 设置路径
ctx.moveTo(250,50);   // 设置起点
ctx.lineTo(50,250);
ctx.lineTo(450,250);
ctx.closePath();      // 闭合路径
//填充内部
ctx.fillStyle = "blue";
ctx.fill();
//绘制轮廓
ctx.lineWidth = 10;
ctx.strokeStyle = "red";
ctx.stroke();
```

### 绘制曲线

arc(centerX, centerY, radius, startingAngle, endingAngle,anticlockwise) 绘制圆或圆弧   
使用 arc() 方法画不了椭圆。要画椭圆，要么使用更复杂的绘制曲线的方法，要么使用变换把普通的圆拉伸成椭圆。

void ctx.arcTo(x1, y1, x2, y2, radius); 圆弧一端与(x1,y1)到(x2,y2)的直线相切，另一端与起点用竖线相连   
void ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y); 贝塞尔曲线由起点、终点 和 2个控制点控制   
void ctx.quadraticCurveTo(cpx, cpy, x, y); 二次曲线由起点、终点 和 1个控制点控制

```js
var canvas = document.getElementById("drawingCanvas");
var context = canvas.getContext("2d");
context.moveTo(62, 242);
//创建变量，保存两个控制点及曲线终点信息
var control1_x = 187;
var control1_y = 32;
var control2_x = 429;
var control2_y = 480;
var endPointX = 365;
var endPointY = 133;
//绘制贝塞尔曲线
context.bezierCurveTo(control1_x, control1_y, control2_x, control2_y, endPointX, endPointY);
context.stroke();
// 绘制二次曲线
contex.beginPath();
context.moveTo(50, 20);
context.quadraticCurveTo(230, 30, 50, 100);
context.stroke();
```

复杂而自然的形状通常需要多个圆弧和曲线拼接而成。完成之后，可以调用 closePath() 以便填充或描边。

### 变换

translate() 平移，移动了坐标系的原点

scale() 缩放，可以把本来要绘制的形状放大或缩小

rotate() 旋转，旋转坐标系

matrix() 矩阵，矩阵变换更复杂一些，但可以在任意方向拉伸和扭曲坐标系，要求你必须理解复杂的矩阵计算

变换是累积的。调用绘图上下文的 save() 方法可以保存坐标系当前的状态。然后，再调用 restore() 方法可以返回保存过的前一个状态。如果要保存坐标系的状态，必须在应用任何变换之前调用 save()。而在多步操作绘制复杂图形时，往往都需要多次保存坐标系状态，这些状态就如同浏览器中的历史记录一样。
每调用一次 restore()，坐标系就会恢复到前一个最近的状态。

```js
ctx.strokeRect(5,5,25,15);
ctx.scale(2,2);             // 高宽都放大2倍，同时定位位置也会相应放大（移动）
ctx.strokeRect(5,5,25,15);  // 这个框是原先款的4倍大小，且向右下方移动了 7px
```

### 透明度

使用 rgba() 函数，或者设置 globalAlpha 属性。

设置 globalAlpha 属性后，后续所有绘图操作都会取得相同的不透明度，包括描边和填充，直至再次修改 globalAlpha 属性。

### 合成操作

所谓合成操作，就是告诉 canvas 怎么显示两个重叠的图形。默认的合成操作是 source-over。   
在合成操作的术语中，源是指正在绘制的图形，目标是指画布上已经绘制的内容。   
要改变 canvas 当前使用的合成操作方式，只要在画后面的图形之前设置绘图上下文的 globalCompositeOperation 属性即可。

```
source-over  source-in  source-out  source-atop   
destination-over  destination-in  destination-out  destination-atop   
lighter(重叠部分颜色相加) copy（覆盖） xor   
(还有新增加内容，略)
```

```js
var canvas = document.getElementById("drawingCanvas");
var context = canvas.getContext("2d");
//绘制矩形
context.fillStyle = "blue";
context.fillRect(15,15,70,70);
//选择globalCompositeOperation
context.globalCompositeOperation = "source-atop";
//在上方绘制圆形
context.fillStyle = "red";
context.beginPath();
context.arc(75, 75, 35, 0, Math.PI*2, true);
context.fill();
```

只要运用得当，利用合成操作可以迅速实现一些特定的绘图任务，比如绘制复杂的图形。一些厉害的程序员甚至用这些合成操作减少绘图操作次数，以提升绘图性能。

在不久的过去，不同浏览器对某些合成操作的处理方式没有达成一致，但现在已不存在这些问题。   
唯一的问题是要兼容旧版浏览器。现在，唯一支持合成操作的兼容方案是 FlashCanvas Pro。

### 裁剪蒙版

`clip()` 方法可创建裁剪蒙版，效果与合成有些类似，就是路径内的内容会保留，而路径外的内容被隐藏（清除）。

如何取消蒙版：用 save() 方法在 clip() 之前创建一个保存点之后可以用 restore() 方法回到保存点。

## Canvas 进阶

### 高级绘图

#### 绘制图像

`drawImage()` 方法用于在画布上绘制图片。使用这个方法很简单，调用它的时候传入相应的图片对象及起点坐标即可。
在调用 `drawImage()` 之前，需要准备好图片对象。HTML5 为此提供了三个方案。

* 使用 `createImageData()` 方法一个像素一个像素地创建图像，这种方法很麻烦，也没有效率。
* 使用网页中已有的 `<img>` 元素
* 在代码中创建一个图片对象，然后把一个外部图片加载进来。但这个方案有一个缺点，即必须先等待图片加载完毕，然后才能把图片对象传递给 `drawImage()` 方法使用

```js
// 使用网页中的已有<img>元素
var img = document.getElementById("image");
context.drawImage(img, 10, 10);
// 创建一个图片对象加载图片
var img = new Image();
img.onload = function() { context.drawImage(img, 0, 0); };
img.src = "maze.png";  // 此时开始加载图片
```

#### 裁剪和缩放图片

```js
void ctx.drawImage(image, dx, dy);  // 插入图片到指定位置
void ctx.drawImage(image, dx, dy, dWidth, dHeight);  // 先缩放再插入到指定位置
void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);  // 裁剪+缩放 s-源，d-目标
```

image 参数: An element to draw into the context. The specification permits any canvas image source (CanvasImageSource), such as an HTMLImageElement, an HTMLVideoElement, an HTMLCanvasElement or an ImageBitmap.

#### 绘制文本

fillText(text, x, y [, maxWidth]) 在 (x,y) 处放置文本，如果指定最大宽度，超出的话会缩小来适应宽度。  
strokeText(text, x, y [, maxWidth]) 与 fillText 的不同是，放置的文本是空心的。  
measureText("some text") 测量文本输出尺寸（仅测量，不输出），返回一个 TextMetrics object。

##### 文本格式设置

font = "bold 20px Verdana,sans-serif"; (写法同 CSS，还可以使用 css3 中的自定义字体)   
textAlign = start(default) | end | left | right | center   
textBaseline = top | hanging | middle | alphabetic(default) | ideographic | bottom   
direction = ltr | rtl | inherit(default)

可以把文本内容绘制到任何地方，但每次却只能绘制一行。如果要把一个完整的段落拆成多行文本，可以自己设计折行算法。

与绘制线条和图片相比，绘制文本的速度稍慢一些。可以事先把文本保存为图片，然后再使用 drawImage() 绘制到画布上。

```js
context.font = "bold 20px Verdana,sans-serif";
context.textBaseline = "top";
context.fillStyle = "black";
context.fillText("I'm stuck in a canvas. Someone let me out!", 10, 10);
```

### 阴影与填充

#### 添加阴影

shadowColor 颜色，shadowBlur 模糊程度，shadowOffsetX，shadowOffsetY   
设置好以上属性，每次 fill 或 stroke 的时候就会产生阴影了。

#### 填充图案

```js
var img = document.getElementById("brickTile");      // 获取图像
var pattern = context.createPattern(img, "repeat");  // 创建一个图案对象
context.fillStyle = pattern;  // 使用图案对象设置 fillStyle 或 strokeStyle 属性
context.rect(0, 0, canvas.width, canvas.height);
context.fill();
```

#### 填充渐变

createLinearGradient(x,y,x1,y1) - creates a linear gradient, 沿着 (x,y) 到 (x1,y1) 的直线路径渐变  
createRadialGradient(x,y,r,x1,y1,r1) - creates a radial gradient, 在两个圆之间渐变  
如果待填充的范围大于渐变指定范围，渐变会以纯色扩展以填满待填充区域。

```js
var c = document.getElementById("drawingCanvas");
var ctx = c.getContext("2d");
// Create linear gradient
var grdl = ctx.createLinearGradient(0,0,200,0);
grdl.addColorStop(0,"white");
grdl.addColorStop(1,"red");
// Create radial gradient
var grdr = ctx.createRadialGradient(75,50,20,90,60,100);
grdr.addColorStop(0,"white");
grdr.addColorStop(1,"red");
// Fill with gradient
ctx.fillStyle = grdr;
ctx.fillRect(10,10,400,200);
ctx.strokeRect(10,10,400,200);
```

## 赋予图形交互能力

把 Canvas 变得具有交互性，必须记录绘制的每一个对象。此外，在用户单击 Canvas 中的某个地方时，还要检测被单击的是不是其中一个图形（这个过程叫碰撞检测）。如果能实现这两个任务，剩下的（修改某个图形或重绘画布）就简单了。

<iframe width =500 height = 350 frameborder=0  src="http://prosetech.com/html5/Chapter%2009/InteractiveCircles_WithDrag.html"></iframe>

实现上面示例效果的关键是：

* 每个圆都是一个对象，由 Cricle 构造函数定义
* 每画一个圆都 push 到 circles[] 中保存
* 碰撞检测时，对 circles 从后向前进行遍历，根据鼠标坐标到圆心的距离和半径对比得出结论
* 拖拽时，针对每个 mousemove 事件，都重绘一次 canvas

### 碰撞检测

一种是基于数学计算来实现碰撞检测。

另一种手段，是取得像素块，检测它们的颜色。很多情况下，这种手段更简单，因为它不涉及全部对象，也不必编写图形记录代码。然而，这种手段只适合能明确判断颜色的场合。通过 `getImageData()` 从矩形区域中取得一个像素块，然后再检测这些像素。

## 操作像素

绘图上下文为操作像素提供了三个方法：`getImageData()` `putImageData()` 和 `createImageData()`。

imageDate 对象结构：imageDate{ width, height, data[r, g, b, a, ...] }  // 从 行1列1 到 行1列n 到 行n列n 排列

```js
// 创建对象
var myImageData = ctx.createImageData(width, height);     // 方法1 通过指定高宽创建
var myImageData = ctx.createImageData(anotherImageData);  // 方法2 复制另外一个对象的高宽（不复制内容）
// 获取像素信息
imageData = ctx.getImageData(left, top, width, height);  // 获取针对特定区块的 imageDate
blue = imageData.data[((50*(imageData.width*4)) + (200*4)) + 2];  // 读取第50行200列的蓝色位置的数值
// 写入像素
ctx.putImageData(imageData, dx, dy);  // x y 即要放置的位置
```

附个将图片转成灰色的公式: `x = 0.299r + 0.587g + 0.114b` // http://en.wikipedia.org/wiki/Grayscale

## 添加动画

在 HTML5 中利用 Canvas 实现动画非常容易。首先，要设置一个定时器，反复调用绘图函数（一般每秒30～40次）。每次调用，都会重绘整个画布。完成后的效果就像动画一样，每一帧间的过渡会平滑而流畅。JavaScript 为控制重复绘制提供了两种手段：使用 `setTimeout()` 函数和使用 `requestAnimationFrame()` 函数。

### 多物体动画

弹跳小球动画实现细节
  1. 清除画布
  2. 循环球的数组
  3. 调整每个球的位置和速度
  4. 绘制每个球
  5. 调用 `setTimeout()` 以便每隔20毫秒就执行一次 drawFrame() 函数

### 动画的性能问题

由于绘制速度很快，因此与基本的绘图操作相比，动画对画布的要求要高得多。现代浏览器都使用了硬件加速等性能增强技术，把图形处理工作转移给了显卡，从而节省了CPU。即使 JavaScript 不是现有最快的语言，但仍然可以利用它来创造出复杂、高速的动画，甚至是实时电子游戏——只要有脚本和画布即可。

然而，对于移动设备（比如 iPhone 或 Android 手机）来说，由于能力不足，性能就是一个问题了。测试表明，在桌面浏览器中运行速度达每秒60帧的动画，在智能手机中最高才能达到每秒10帧。因此，要是想为手机用户开发应用，一定要尽早测试并准备牺牲一些夺人眼目的动画效果，从而确保应用运行流畅。


## 相关资源

* [Ai→Canvas插件](http://visitmix.com/labs/ai2canvas/) 能够把 Adobe Illustrator 的插画转换成 HTML 页面，并通过 JS 代码在 &lt;canvas&gt; 上重新创建相同的图形。
* [Canvas 在线教程](http://www.html5canvastutorials.com/)
* [Mozilla Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)