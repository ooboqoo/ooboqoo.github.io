# WebGL

https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API

WebGL 是一项在网页浏览器呈现3D画面的技术，有别于过去需要安装浏览器插件，通过 WebGL 的技术，只需要编写网页代码即可实现3D图像的展示。WebGL 可以为 Canvas 提供硬件3D加速渲染，这样 Web 开发人员就可以借助系统显卡来在浏览器里更流畅地展示3D场景和模型了。

## 概述

Canvas 与 SVG 之间的差别是比较明显的，而 WebGL 也是基于 Canvas 的，WebGL 跟 Canvas API 比较，WebGL 支持 3D，支持硬件渲染，更强性能更好，但 IE11 开始才支持，涉及到旧浏览器的兼容性问题。

Three.js - The aim of the project is to create an easy to use, lightweight, 3D library. The library provides `<canvas>`, `<svg>`, CSS3D and WebGL renderers.

### WebGL, Canvas, or SVG? Choose the right API

https://msdn.microsoft.com/en-us/library/dn265058(v=vs.85).aspx

#### WebGL

If you’re already familiar with OpenGL (ES 2.0 in particular), you can use WebGL for a simple 2D game, like Boulder Bop. If you're not, this API is more complex than you need for this simple game.

#### canvas

Canvas is the typical choice for most HTML5 games. It's simple and speedy, particularly for games with many objects. However, canvas has its limitations:
Drawn objects become part of the canvas bitmap and therefore cannot be associated with an event handler. For example, clicking a specific circle on the canvas cannot natively fire a particular event handler. You can, however, wire up an event handler for the entire canvas which allows you, using a bit of math, to calculate whether or not a given circle was clicked (but the browser doesn't provide this behavior natively).
When you move an object across the canvas, you must redraw the entire canvas for each move increment.
Liquid (or fluid) layout is relatively difficult – the browser can't natively adjust the canvas size based on the browser’s current window size. You can create this behavior programmatically, however, by listening for window size changes and adjusting the size of the canvas appropriately.
The browser can't natively convert screen coordinates to your game’s world coordinate system. For example, the browser can't natively convert the position of a mouse click (in screen coordinates) to a convenient game coordinate system when canvas is used. You can create transformations equations to work here - see SVG Coordinate Transformations (Windows) for more info. Note that if you choose to implement liquid canvas layout, you must update the equation coefficients each time the window size changes.

#### SVG

While canvas provides simplicity and speed, SVG provides flexibility. For example:
Each graphic object becomes part of the DOM. So, if you want, each graphic object in the game can have one or more associated event handlers. For example, by clicking a specific circle on the "canvas", called a viewport in SVG terminology, you can natively fire an event handler. The down side is that perform can decrease with more objects in the DOM.
The game’s background can generally be ignored. That is, to move an SVG graphic, you change its positional (x, y) values and the browser updates the background for you. You don't need to update all the objects in the SVG viewport (as you would with canvas).
The browser handles liquid layout for you, if the correct CSS is used:

```css
html, body {
  height: 100%;
}
```

We'll cover this in more detail later.
SVG provides a current transformation matrix (or CTM). Using the CTM, you can convert screen coordinates to a convenient game coordinate system whether liquid layout is used or not. For more info, see SVG Coordinate Transformations (Windows).
Because of its convenience, ease of liquid layout, and built-in matrix methods, SVG is often a good choice for games that do not contain a large number of objects (so as not to over-bloat the DOM). For games with many objects, canvas can be a better choice because the size of DOM is not effected by the number of game objects in the canvas element. 














