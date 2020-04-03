# CSS 动效


## 变形 Transforms

|||
--------------------- | ------------------------------------------------------------
`transform`           | Applies a 2D or 3D transformation to an element
`transform-origin`    | Allows you to change the position on transformed elements
`transform-style`     | Specifies how nested elements are rendered in 3D space
`perspective`         | Specifies the perspective on how 3D elements are viewed
`perspective-origin`  | Specifies the bottom position of 3D elements
`backface-visibility` | Defines whether or not an element should be visible when not facing the screen

```less
transform: translate(50px, 100px);  // translate(x,y) 偏移 translateX(n) translateY(n)
transform: rotate(-20deg);  // 旋转
transform: scale(0.5, 3);  // scale(x,y) 缩放 scaleX(n) scaleY(n)
transform: skew(20deg, 10deg);  // skew(x-angle,y-angle) 扭曲 skewX(angle) skewY(angle)
/* matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY()) */
transform: matrix(1, -0.3, 0, 1, 0, 0);  // 矩阵
```

```
matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)  Defined a 3D transformation, using a 4x4 matrix of 16 values
translate3d(x,y,z) translateX(x) translateY(y) translateZ(z)
scale3d(x,y,z) scaleX(x) scaleY(y) scaleZ(z)
rotate3d(x,y,z,angle) rotateX(angle) rotateY(angle) rotateZ(angle)
perspective(n)
```


## 过渡 Transitions

```less
transition-property: width;
transition-duration: 2s;
transition-timing-function: ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n);
transition-delay: 1s;
transition: width 2s linear 1s;  // 上面几项的简写
transition: width 2s, height 2s, transform 4s;  // 可以同时指定多个属性，且分别指定时长
```

采用渐变要考虑到对性能的影响，尽量避免对会导致页面重构的属性应用渐变，如 padding margin font-size 等。


## 动画 Animations

```html
<style>
div { width: 100px; height: 100px; background-color: red; position: relative; }
.animate {
  animation-name: example;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  /* animation: example 5s linear 2s infinite alternate; */
}
@keyframes example {
  0%   {background-color:red; left:0px; top:0px;}  /* 也可用 from */
  25%  {background-color:yellow; left:200px; top:0px;}
  50%  {background-color:blue; left:200px; top:200px;}
  75%  {background-color:green; left:0px; top:200px;}
  100% {background-color:red; left:0px; top:0px;}  /* 也可用 to */
}
</style>
<div class="animate"></div>
```


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
.img.show {animation: move 2s ease 1 normal;}
@keyframes move {
    0%   { transform: translateY(-400px); }  /* 直接用 top 画面会卡顿 */
    50%  { transform: translateY(20px); }
    100% { transform: translateY(400px); }
}
```

Animation 只是将定义好的动画应用到元素 1 次或 n 次，并不会对元素最初的样式造成影响，也就是说，在 `@keyframes` 中定义的样式最终都会消失。