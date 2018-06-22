# HTML Canvas Reference

HTML5 `<canvas>` 标记提供了一个画板，可以通过 JavaScript 在上面绘图。注意，`<canvas>` 元素本身并不具有绘图功能，它只是提供一个容器。`getContext()` 方法返回一个对象，该对象提供了在画板上绘画所需要的方法和属性。IE8 及之前版本不支持。

## API

https://www.w3schools.com/tags/ref_canvas.asp

### Colors, Styles, and Shadows

||
--------------|---------------------------------------------------------------------
fillStyle     | 填充颜色或样式，值类型 颜色DOMString / 渐变CanvasGradient / 贴图CanvasPattern
strokeStyle   | 线条颜色或样式，值类型 DOMString / CanvasGradient / CanvasPattern
shadowColor   | 阴影颜色
shadowBlur    | 阴影尺寸等级，默认 `0`，跟像素的关系大概是，单边阴影宽度 px 为 指定值/2
shadowOffsetX | 阴影水平偏移量，float 值
shadowOffsetY | 阴影垂直偏移量，float 值

||
---------------------------------------------|-------------------------------------------------------
createLinearGradient(x0, y0, x1, y1)         | 创建线性渐变
createRadialGradient(x0, y0, r0, x1, y1, r1) | 创建径向渐变
grd.addColorStop(offset, color)              | Specifies the colors and stop positions in a gradient object
createPattern(image, repetition)             | 创建一个贴图 CanvasPattern

### Line Styles

||
-----------|---------------------------------------------------------------------------------------------
lineWidth  | 线条宽度，不带单位 px
lineCap    | 线头类型，`'butt'`(方头，默认) `'round'`(圆头) `'square'`(加长方头，线条两头各加长一半线宽)
lineJoin   | 线段交点形状，`'miter'`(锐角斜接，默认) `'round'`(圆头) `'bevel'`(平头斜接)
miterLimit | 线段交点为锐角时，锐角的最大尺寸，默认 `10`，`0` `NaN` `Infinity` 及负数时会被忽略

### Rectangles

||
-----------|----------------------------------------
rect       | 创建一个闭合矩形路径
fillRect   | 填充一个矩形区域 = `rect()` + `fill()`
strokeRect | 绘制一个矩形框 = `rect()` + `stroke()`
clearRect  | 清除指定矩形区域

### Paths

||
-----------------------|--------------------------------------------
beginPath()            | 开始创建一个新路径
closePath()            | 闭合当前路径(直线连接起点和终点)
moveTo(x, y)           | 移动到某个坐标点
lineTo(x, y)           | 在当前点和指定点间添加一段(直线)路径
fill(path?, fillRule?) | 执行填充操作 [注1]
stroke(path?)          | 沿着路径绘制线条

||
------------------------------|-------------------------------------------------------------------------
arc(x, y, radius, startAngle, endAngle, anticlockwise?)  | 添加圆或圆弧路径，默认顺时针
arcTo(x1, y1, x2, y2, radius)  | 在切线P0-(x1,y1) 和 切线 (x1,y1)-(x2,y2)<br>添加圆弧路径并与 P0 相连
quadraticCurveTo(cpx, cpy, x, y)               | 添加一条二次(贝塞尔)曲线路径
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)    | 添加一条(三次)贝塞尔曲线路径
clip(path?, fillRule?)                         | 裁剪可编辑区域，即快速蒙版功能
isPointInPath(path?, x, y, fillRule?)          | 判断一个坐标点是否在 fill 区域内，路径是否闭合不影响

注1: fillRule 取值 `'nonzero'` `'evenodd'`，规则(算法)用来判断哪些区域在路径范围内(需要被填充)
  * `nonzero` 在路径包围区域随便找一个点，向外发散一条射线，遇到顺时针路径+1，逆时针路径-1，非零即填充
  * `evenodd` 在路径包围的区域随便找一点，向外发射一条射线，所有相交的路径为奇数就填充，为偶数则不填充

### Transformations

https://segmentfault.com/a/1190000007792150

||
---------------|-----------------------------------------------
translate()    | Remaps the (0,0) position on the canvas
scale()        | Scales the current drawing bigger or smaller
rotate()       | Rotates the current drawing
transform()    | Replaces the current transformation matrix for the drawing
setTransform() | Resets the current transform to the identity matrix. Then runs `transform()`

### Text

||
-------------|------------------------------------------
font         | Sets or returns the current font properties for text content
textAlign    | Sets or returns the current alignment for text content
textBaseline | Sets or returns the current text baseline used when drawing text

||
------------|----------------------------------
fillText    | Draws "filled" text on the canvas
strokeText  | Draws text on the canvas (no fill)
measureText | Returns an object that contains the width of the specified text

### Image Drawing

||
-------------------------------------------------|--------------------------------------------------
drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) | Draws an image, canvas, or video onto the canvas

### Pixel Manipulation

||
-------|-------------------------------------------
width  | Returns the width of an ImageData object
height | Returns the height of an ImageData object
data   | Returns an object that contains image data of a specified ImageData object

||
----------------|---------------------------------
createImageData | Creates a new, blank ImageData object
getImageData    | Returns an ImageData object that copies the pixel data for the specified rectangle on a canvas
putImageData    | Puts the image data (from a specified ImageData object) back onto the canvas

### Compositing

||
-------------------------|--------------------------------------------------------------------------
globalAlpha              | Sets or returns the current alpha or transparency value of the drawing
globalCompositeOperation | Sets or returns how a new image are drawn onto an existing image

### Other

||
----------|--------------------------------------------------------------------------------------------------
save()    | 保存(push) Context 的当前状态，含 transformation matrix / clipping region / dash list / 设置项 [注]
restore() | 恢复(pop)最近一次保存的 Context 状态

注：设置项包含 `strokeStyle` `globalAlpha` `font` 等

||
-------------------------------------------------|------------------------------------------------------------------
cvs.getContext(contextType, contextAttributes?)  | 获取绘图上下文，contextType: `'2d'` `'webgl'` `'webgl2'`
cvs.toDataURL(type='image/png', encoderOptions?) | 数据 URL 就是一个以 `data:image/png;base64` 之类开头的<br> base-64 编码的字符串


## Cheatsheet

http://cheatsheetworld.com/programming/html5-canvas-cheat-sheet/

### Canvas Element

```html
<canvas id="myCanvas" width="500" height="300"></canvas>
<canvas id="myCanvas" width="500" height="300">your browser doesn't support canvas!</canvas>
```

```js
var context = canvas.getContext('2d');     // 2d context
var context = canvas.getContext('webgl');  // Webgl context (3d)
```

### Paths

```js
context.beginPath();
context.lineTo(x, y);
context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
context.quadraticCurveTo(cx, cy, x, y);
context.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
context.closePath();
```

### Transforms

```js
context.translate(x, y);
context.scale(x, y);
context.rotate(radians);
context.scale(-1, 1);  // Flip Horizontally
context.scale(1, -1);  // Flip Vertically
context.transform(a, b, c, d ,e, f);     // Custom Transform
context.setTransform(a, b, c, d ,e, f);  // Set Transform
context.transform(1, sy, sx, 1, 0, 0);   // Shear
context.setTransform(1, 0, 0, 1, 0, 0);  // Reset
```

### Shapes

```js
// Draw rectangle
context.rect(x, y, width, height);
context.fill();
context.stroke();

context.fillRect(x, y, width, height);    // Fill rectangle shorthand
context.strokeRect(x, y, width, height);  // Stroke rectangle shorthand

// Draw circle
context.arc(x, y, radius, 0, Math.PI * 2);
context.fill();
context.stroke();
```

### Images

```js
var imageObj = new Image();
imageObj.onload = () => { context.drawImage(imageObj, x, y); }; // 从指定点原样复制图片
imageObj.onload = () => { context.drawImage(imageObj, x, y, width, height); }; // 缩放
imageObj.onload = () => { context.drawImage(imageObj, sx, sy, sw, sh, dx, dy, dw, dh); }; // 裁剪+缩放
imageObj.src = 'path/to/my/image.jpg';
```

### State Stack

```js
context.save();    //  Push State onto Stack
context.restore(); // Pop State off of Stack
```

### Data Urls

```js
// Get Data URL
var dataURL = canvas.toDataURL();

// Render Canvas with Data URL
var imageObj = new Image();
imageObj.onload = () => { context.drawImage(imageObj, 0, 0); };
imageObj.src = dataURL;
```

### Styles

```js
// Fill
context.fillStyle = 'red';
context.fill();

// Stroke
context.strokeStyle = 'red';
context.stroke();

// Linear gradient
var grd = context.createLinearGradient(x1, y1, x2, y2);
grd.addColorStop(0, 'red');   
grd.addColorStop(1, 'blue');
context.fillStyle = grd;
context.fill();

// Radial gradient
var grd = context.createRadialGradient(x1, y1, radius1, x2, y2, radius2);
grd.addColorStop(0, 'red');
grd.addColorStop(1, 'blue');
context.fillStyle = grd;
context.fill();

// Pattern
var imageObj = new Image();
imageObj.onload = function() {
  var pattern = context.createPattern(imageObj, 'repeat');
  context.fillStyle = pattern;
  context.fill();
};
imageObj.src = 'path/to/my/image.jpg';

// Line Join
context.lineJoin = 'miter|round|bevel';

// Line Cap
context.lineCap = 'butt|round|square';

// Shadow
context.shadowColor = 'black';
context.shadowBlur = 20;
context.shadowOffsetX = 10;
context.shadowOffsetY = 10;

// Alpha (Opacity)
context.globalAlpha = 0.5; // between 0 and 1
```

### Clipping

```
// draw path here ...
context.clip();
```

### Composites

```js
context.globalCompositeOperation = 'source-atop|source-in|source-out|source-over|destination-atop|destination-in|destination-out|destination-over|lighter|xor|copy';
```

### Color Formats

```js
context.fillStyle = 'red';             // String
context.fillStyle = '#ff0000';         // Hex Long
context.fillStyle = '#f00';            // Hex Short
context.fillStyle = 'rgb(255,0,0)';    // RGB
context.fillStyle = 'rgba(255,0,0,1)'; // RGBA
```

### Text

```js
// Fill Text
context.font = '40px Arial';
context.fillStyle = 'red';
context.fillText('Hello World!', x, y);

// Stroke Text
context.font = '40pt Arial';
context.strokeStyle = 'red';
context.strokeText('Hello World!', x, y);

context.font = 'bold 40px Arial';   // Bold Text
context.font = 'italic 40px Arial'; // Italic Text
context.textAlign = 'start|end|left|center|right';
context.textBaseline = 'top|hanging|middle|alphabetic|ideographic|bottom';
var width = context.measureText('Hello world').width;  // Get Text Width
```

### Image Data

```js
// Get Image Data
var imageData = context.getImageData(x, y, width, height);
var data = imageData.data;

// Loop Through Image Pixels
var imageData = context.getImageData(x, y, width, height);
var data = imageData.data;
var len = data.length;
var i, red, green, blue, alpha;
for(i = 0; i < len; i += 4) {
  red = data[i];
  green = data[i + 1];
  blue = data[i + 2];
  alpha = data[i + 3];
}

// Loop Through Image Pixels With Coordinates
var imageData = context.getImageData(x, y, width, height);
var data = imageData.data;
var x, y, red, green, blue, alpha;
for(y = 0; y < imageHeight; y++) {
  for(x = 0; x < imageWidth; x++) {
    red = data[((imageWidth * y) + x) * 4];
    green = data[((imageWidth * y) + x) * 4 + 1];
    blue = data[((imageWidth * y) + x) * 4 + 2];
    alpha = data[((imageWidth * y) + x) * 4 + 3];
  }
}

// Set Image Data
context.putImageData(imageData, x, y);
```

<script>
// 设置到 developer.mozilla.org 的查询链接
(function() {
  var list = document.querySelectorAll("td:first-child"),
      reg = /^[a-zA-Z0-9._]+\(?/g,
      html, text, link,
      prefix = 'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/';
  for (var i = 0, length = list.length; i < length; i++) {
    reg.lastIndex = 0;
    html = list[i].innerHTML;
    text = reg.exec(html);
    if (text === null) { continue; }
    text = text[0];
    link = text.replace('(', '');
    list[i].innerHTML = '<a href="' + prefix + link + '">' + text + html.substr(reg.lastIndex) + '</a>';
  }
})();
</script>
