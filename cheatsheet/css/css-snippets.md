# CSS Snippets

https://atomiks.github.io/30-seconds-of-css/


## Layout

### 强制包含元素

父元素添加 `overflow: hidden;`，详见 BFC 相关知识点。


## Visual

### Triangle

```css
.triangle1 {
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-top-color: #333;
}
.triangle2 {
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-color: red gray gray red;
}
```

<div class="demo">
  <div class="triangle1"></div><br>
  <div class="triangle2"></div> 这一种更好用，可以给三角添加阴影效果，如下面的弹框就需要用到这种箭头<br>
  <div class="triangle2" style="transform: rotate(77deg) scaleY(0.5) skewX(45deg);"></div> 变一变(transform)还能画个指南针
  <style>
    .triangle1, .triangle2 { display: inline-block; }
  .triangle1 {
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-color: gray red green blue;
  }
  .triangle2 {
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-color: red gray gray red;
  }
  </style>
</div>

```css
.triangle-popover {
  position: absolute;
  display: inline-block;
  margin-top: 10px;
  margin-left: -60px;
  padding: 10px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
}
.triangle-popover::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: -5px;
  left: 50%;
  margin-left: -10px;
  transform: rotate(-45deg);
  border-width: 10px;
  border-style: solid;
  border-color: #fff #fff transparent transparent;
  box-shadow: 5px -5px 10px -5px rgba(0,0,0,0.2);
}
```

<div class="demo" style="padding: 50px 10px;">
  <span class="popover-demo-item">
    <span class="triangle-popover popover-top">top</span>
    <span class="triangle-popover popover-left">left</span>
    .
    <span class="triangle-popover popover-bottom">bottom</span>
    <span class="triangle-popover popover-right">right</span>
  </span>
  <span class="popover-demo-item">
    <span class="triangle-popover popover-top">top<br>toptop</span>
    <span class="triangle-popover popover-left">left</span>
    MMMMMMMM
    <span class="triangle-popover popover-bottom">bottom<br>bottom</span>
    <span class="triangle-popover popover-right">right</span>
  </span>
  <span class="popover-demo-item">
    <span class="triangle-popover popover-top">top</span>
    <span class="triangle-popover popover-left">left</span>
    MMMM<br>MMMM
    <span class="triangle-popover popover-bottom">bottom</span>
    <span class="triangle-popover popover-right">right</span>
  </span>
  <span class="popover-demo-item">yellow<span class="triangle-popover popover-right popover-yellow">tip 提示框</span></span>
  <style>
  .popover-demo-item {
    position: relative;
    display: inline-block;
    margin: 0 60px;
    border: 1px solid;
  }
  .triangle-popover {
    position: absolute;
    display: inline-block;
    padding: 0 5px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
    white-space: nowrap;
  }
  .triangle-popover::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: #fff #fff transparent transparent;
  }
  .triangle-popover.popover-top {
    transform: translate(-50%, -100%);
    margin-top: -10px;
    margin-left: -50%;
  }
  .triangle-popover.popover-top::after {
    top: 100%;
    left: 50%;
    margin-top: -14px;
    margin-left: -10px;
    transform: rotate(135deg);
    border-width: 10px;
    box-shadow: 5px -5px 10px -5px rgba(0,0,0,0.2);
  }
  .triangle-popover.popover-bottom {
    bottom: -35px;
    transform: translate(-50%, 50%);
    margin-left: -50%;
  }
  .triangle-popover.popover-bottom::after {
    top: -5px;
    left: 50%;
    margin-left: -10px;
    transform: rotate(-45deg);
    border-width: 10px;
    box-shadow: 5px -5px 10px -5px rgba(0,0,0,0.2);
  }
  .triangle-popover.popover-left {
    left: 0;
    transform: translateX(-100%);
    margin-left: -10px;
  }
  .triangle-popover.popover-left::after {
    top: 50%;
    margin-top: -4px;
    transform: rotate(45deg);
    border-width: 5px;
  }
  .triangle-popover.popover-right {
    transform: translateX(10px);
  }
  .triangle-popover.popover-right::after {
    left: -4px;
    top: 50%;
    margin-top: -4px;
    transform: rotate(-135deg);
    border-width: 5px;
  }
  .triangle-popover.popover-small::after {
    
  }
  .triangle-popover.popover-yellow {
    color: #666;
    background-color: #fff9e4;
    border: 1px solid #EE6723;
  }
  .triangle-popover.popover-yellow::after {
    border-color: #fff9e4 #fff9e4 transparent transparent;
    box-shadow : 1px -1px 0px 0px #EE6723;
  }
  </style>
</div>

### Truncate text

当文本过长时隐藏超出部分，并在尾部添加 …

```css
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 200px;
}
```

<div class="demo">
  <p class="truncate-text">If I exceed one line's width, I will be truncated.</p>
  <style>
  .truncate-text { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 200px; }
  </style>
</div>

对 -webkit- 私有前缀支持良好的浏览器还可以实现多行文字打点效果

```css
.truncate-text-rows-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

<div class="demo">
  <p class="truncate-text-rows-2">If I exceed one line's width, I will be truncated in the second line.</p>
  <style>
  .truncate-text-rows-2 {
    display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
    width: 200px;
  }
  </style>
</div>



### Reset all styles

```css
.reset-all-styles { all: initial; }  /* initial  unset */
```

`initial` 直接重置 The initial CSS keyword applies the initial value of a property to an element.  
`unset` 先尝试继承 The unset CSS keyword is the combination of the initial and inherit keywords.

CSS 中的默认值：常用的 `initial` `default` `auto` 或者 `inherit`，但具体设置项差异较大，拿 `display` 举例

```html
<style>div { display: inline-block; }</style>
<div style="display: block;">
  <div style="display: initial;">initial 无效值</div>
  <div style="display: default;">default 无效值</div>
  <div style="display: inherit;">inherit 有效值</div>
  <div style="display: auto;">无效但能清除 inline 设置项。CH 报告此值无效，IE9 下 DOM 树中直接不体现。</div>
</div>
```

### System font stack

优先使用系统默认字体，使界面更接近原生体验。

```css
.system-font-stack {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```

### Overlay Scrollbar

让滚动条浮在内容上面，而不占用内容空间。

```css
.overlay-scrollbar {
  /* webkit */
  overflow: overlay;
  /* IE10+ */
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
```

定制滚动条样式(仅 webkit 适用)

```css
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #999;
}
```


## Interactivity

### Disable selection

```css
.unselectable {
  user-select: none;
}
```

### Disable mouse events

使用 `pointer-events` 属性可禁用 CSS & JS 鼠标相关动作效果。[使用示例](https://www.trysmudford.com/blog/fade-out-siblings-css-trick/)

```css
.parent {
  pointer-events: none;
}

.parent > * {
  pointer-events: auto;
}
```

### Sibling fade

```css
span {
  padding: 0 1rem;
  transition: opacity 0.2s;
}
.sibling-fade:hover span:not(:hover) {
  opacity: 0.5;
}
```

<div class="demo">
  <div class="sibling-fade">
    <span>Item 1</span><span>Item 2</span><span>Item 3</span>
    <span>Item 4</span><span>Item 5</span><span>Item 6</span>
  </div>
  <style>
    .sibling-fade span { padding: 0 1rem; transition: opacity 0.2s; }
    .sibling-fade:hover span:not(:hover) { opacity: 0.5; }
  </style>
</div>

### Focus Within

The `:focus-within` pseudo-class matches elements that either themselves match `:focus` or that have descendants which match `:focus`. (Edge x Chrome 60+)

```css
form {
  border: 1px solid gray;
}
form:focus-within {
  background: #eee;
}
```

<div class="demo">
  <form class="focus-within">
    <label>姓名：<input></label>
    <label>性别：<input></label>
  </form>
  <style>
    .focus-within { padding: 10px; border: 1px solid gray; }
    .focus-within:focus-within { background: #eee; }
  </style>
</div>


## Mobile

### Hairline border

在高分屏实现 1个物理像素的细线。

```scss
.hairline-border {
  box-shadow: 0 0 0 1px;
  @media (min-resolution: 2dppx) { box-shadow: 0 0 0 .50px; }  // 2ddpx <= resolution
  @media (min-resolution: 3dppx) { box-shadow: 0 0 0 .33px; }  // `min-` 表示 minimal condition
  @media (min-resolution: 4dppx) { box-shadow: 0 0 0 .25px; }
}
```

### 解决 `pisition: fixed;` 失效

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
```



## Other

#### 重要特性的浏览器兼容性

||
---------|-----------------------
rgba     | IE9+
Flexbox  | IE11+ (IE10+ `-ms-`)


## Chrome

chrome 下给自动填充的表单添加黄色背景

```css
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
  background-color: #FAFFBD;
}
```

老版使用小于 12px 字体

```css
.smaller-than-12px {
  -webkit-text-size-adjust: none;
}
```

让页面字体变清晰，变细

```css
* {
  -webkit-font-smoothing: antialiased;
}
```


## More

### Stacked Avatar

<div class="demo">
  <div class="stacked-avatar" style="display: flex;">
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
  </div>
  <style>
    .stacked-avatar > span {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border: 3px solid #fff;
      border-radius: 50%;
      background-color: coral;
      transition: all .3s;
    }
    .stacked-avatar > span:not(:last-child) {
      margin-right: -24px;
    }
    .stacked-avatar > span:hover {
      margin-right: -3px;
    }
  </style>
</div>

### Table With Rotated Header

<div class="demo">
  <table class="table-with-rotated-header">
    <thead>
      <tr>
        <th class="rotated-header" rowspan="2" style="height: 2em;">
          <div class="rotated-header-text">Vin</div>
          <div class="rotated-header-decoration"></div>
        </th>
        <th class="rotated-header" colspan="3" style="height: 2em;">
          <div style="transform: translateX(64px);">Sales</div>
          <div class="rotated-header-decoration" style="transform: skewX(-45deg) translateX(64px);"></div>
        </th>
      </tr>
      <tr>
        <th class="rotated-header">
          <div class="rotated-header-text">Year</div>
          <div class="rotated-header-decoration" style="border-left: none;"></div>
        </th>
        <th class="rotated-header">
          <div class="rotated-header-text">Brand</div>
          <div class="rotated-header-decoration"></div>
        </th>
        <th class="rotated-header">
          <div class="rotated-header-text">Color</div>
          <div class="rotated-header-decoration"></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr><td>dsad231ff</td><td>2012</td><td>VW</td><td>Orange</td></tr>
      <tr><td>gwregre345</td><td>2011</td><td>Audi</td><td>Black</td></tr>
      <tr><td>h354htr</td><td>2005</td><td>Renault</td><td>Gray</td></tr>
    </tbody>
  </table>
  <style>
    .table-with-rotated-header {
      border-collapse: collapse;
    }

    .table-with-rotated-header td {
      padding: 10px 5px;
      border: 1px solid #ccc;
    }

    .rotated-header {
      position: relative;
      height: 60px;  /* todo: 修改表格高度的同时需要修改 html 里值是 64px 的那两个地方 */
    }

    .rotated-header .rotated-header-text {
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 0;
      right: 0;
      left: 0;
      transform: translate(50%, 50%) rotate(-45deg);
      transform-origin: 0% 50%;
      padding-left: 1em;
    }

    .rotated-header .rotated-header-decoration {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: skewX(-45deg);
      transform-origin: 0 100%;
      border: 1px solid gray;
      border-bottom: none;
    }

    .rotated-header:not(:first-child) .rotated-header-decoration {
      border-left: none;
    }

    /*  */
    .table-with-rotated-header thead { border-width: 0; background-color: unset; color: inherit; }
    .table-with-rotated-header th { border: unset; }
  </style>
</div>

