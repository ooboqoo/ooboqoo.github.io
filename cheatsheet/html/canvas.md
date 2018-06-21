# HTML Canvas Reference

HTML5 `<canvas>` 标记提供了一个画板，可以通过 JavaScript 在上面绘图。注意，`<canvas>` 元素本身并不具有绘图功能，它只是提供一个容器。`getContext()` 方法返回一个对象，该对象提供了在画板上绘画所需要的方法和属性。IE8 及之前版本不支持。

## API

https://www.w3schools.com/tags/ref_canvas.asp

### Colors, Styles, and Shadows

||
--------------------------------------|---------------------------------------------------------------------
[fillStyle](canvas_fillstyle.asp)     | Sets or returns the color, gradient, or pattern used to fill the drawing
[strokeStyle](canvas_strokestyle.asp) | Sets or returns the color, gradient, or pattern used for strokes
[shadowColor](canvas_shadowcolor.asp) | Sets or returns the color to use for shadows
[shadowBlur](canvas_shadowblur.asp)   | Sets or returns the blur level for shadows
[shadowOffsetX](canvas_shadowoffsetx.asp) | Sets or returns the horizontal distance of the shadow from the shape
[shadowOffsetY](canvas_shadowoffsety.asp) | Sets or returns the vertical distance of the shadow from the shape

||
----------------------------------------------------------|-------------------------------------------------------
[createLinearGradient()](canvas_createlineargradient.asp) | Creates a linear gradient (to use on canvas content)
[createRadialGradient()](canvas_createradialgradient.asp) | Creates a radial/circular gradient (to use on canvas content)
[addColorStop()](canvas_addcolorstop.asp)   | Specifies the colors and stop positions in a gradient object
[createPattern()](canvas_createpattern.asp) | Repeats a specified element in the specified direction

### Line Styles

||
------------------------------------|----------------------------------------------
[lineWidth](canvas_linewidth.asp)   | Sets or returns the current line width
[lineCap](canvas_linecap.asp)       | Sets or returns the style of the end caps for a line
[lineJoin](canvas_linejoin.asp)     | Sets or returns the type of corner created, when two lines meet
[miterLimit](canvas_miterlimit.asp) | Sets or returns the maximum miter length

### Rectangles

||
-----------------------------------|-----------------------------
[rect()](canvas_rect.asp)          | Creates a rectangle
[fillRect()](canvas_fillrect.asp)  | Draws a "filled" rectangle
[strokeRect()](canvas_strokerect.asp) | Draws a rectangle (no fill)
[clearRect()](canvas_clearrect.asp)   | Clears the specified pixels within a given rectangle

### Paths

||
-------------------------------------|--------------------------------------
[beginPath()](canvas_beginpath.asp)  | Begins a path, or resets the current path
[closePath()](canvas_closepath.asp)  | Creates a path from the current point back to the starting point
[moveTo()](canvas_moveto.asp)        | Moves the path to the specified point in the canvas, without creating a line
[lineTo()](canvas_lineto.asp)        | Adds a new point and creates a line to that point from the last specified point in the canvas
[fill()](canvas_fill.asp)            | Fills the current drawing (path)
[stroke()](canvas_stroke.asp) | Actually draws the path you have defined
[arc()](canvas_arc.asp) | 圆或圆弧 arc(centerX, centerY, radius, startingAngle, endingAngle);
[arcTo()](canvas_arcto.asp) | Creates an arc/curve between two tangents
[quadraticCurveTo()](canvas_quadraticcurveto.asp) | Creates a quadratic Bézier curve
[bezierCurveTo()](canvas_beziercurveto.asp) | Creates a cubic Bézier curve
[clip()](canvas_clip.asp) | Clips a region of any shape and size from the original canvas
[isPointInPath()](canvas_ispointinpath.asp) | Returns true if the specified point is in the current path, otherwise false

### Transformations

||
-------------------------------------|---------------------------------
[translate()](canvas_translate.asp)  | Remaps the (0,0) position on the canvas
[scale()](canvas_scale.asp)          | Scales the current drawing bigger or smaller
[rotate()](canvas_rotate.asp)        | Rotates the current drawing
[transform()](canvas_transform.asp)  | Replaces the current transformation matrix for the drawing
[setTransform()](canvas_settransform.asp) | Resets the current transform to the identity matrix. Then runs `transform()`

### Text

||
----------------------------------|------------------------------------------
[font](canvas_font.asp)           | Sets or returns the current font properties for text content
[textAlign](canvas_textalign.asp) | Sets or returns the current alignment for text content
[textBaseline](canvas_textbaseline.asp) | Sets or returns the current text baseline used when drawing text

||
---------------------------------------|----------------------------------
[fillText()](canvas_filltext.asp)      | Draws "filled" text on the canvas
[strokeText()](canvas_stroketext.asp)  | Draws text on the canvas (no fill)
[measureText()](canvas_measuretext.asp)| Returns an object that contains the width of the specified text

### Image Drawing

||
-------------------------------------|---------------------
[drawImage()](canvas_drawimage.asp)  | Draws an image, canvas, or video onto the canvas

### Pixel Manipulation

||
-------------------------------------|-----------------------------
[width](canvas_imagedata_width.asp)  | Returns the width of an ImageData object
[height](canvas_imagedata_height.asp)| Returns the height of an ImageData object
[data](canvas_imagedata_data.asp)    | Returns an object that contains image data of a specified ImageData object

||
------------------------------------------------|---------------------------------
[createImageData()](canvas_createimagedata.asp) | Creates a new, blank ImageData object
[getImageData()](canvas_getimagedata.asp)       | Returns an ImageData object that copies the pixel data for the specified rectangle on a canvas
[putImageData()](canvas_putimagedata.asp)       | Puts the image data (from a specified ImageData object) back onto the canvas

### Compositing

||
----------------------------------------|----------------------------------
[globalAlpha](canvas_globalalpha.asp)   | Sets or returns the current alpha or transparency value of the drawing
[globalCompositeOperation](canvas_globalcompositeoperation.asp) | Sets or returns how a new image are drawn onto an existing image

### Other

||
-------------|----------------------------
save()       | Saves the state of the current context
restore()    | Returns previously saved path state and attributes
getContext() | `var ctx = canvas.getContext("2d");` 3d 的还没出来，就这一种用法。
toDataURL()  | 数据URL就是一个以 `data:image/png;base64` 之类开头的 base-64 编码的字符串


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
imageObj.onload = () => { context.drawImage(imageObj, x, y); }; // Draw Image with default size
imageObj.onload = () => { context.drawImage(imageObj, x, y, width, height); }; // Draw image and set size
imageObj.onload = () => { context.drawImage(imageObj, sx, sy, sw, sh, dx, dy, dw, dh); }; // Crop image
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
