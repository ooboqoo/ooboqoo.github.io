# CSS Snippets

https://atomiks.github.io/30-seconds-of-css/


## Visual

### Triangle

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

<div class="demo">
  <div class="triangle"></div>
  <style>
  .triangle {
    width: 0;
    height: 0;
    border-top: 20px solid #333;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
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

### Reset all styles

```css
.reset-all-styles { all: initial; }
```

### System font stack

优先使用系统默认字体，使界面更接近原生体验。

```css
.system-font-stack {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```


## Interactivity

### Disable selection

```css
.unselectable {
  user-select: none;
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


## Mobile

### Hairline border

在高分屏实现 1个物理像素的细线。

```css
.hairline-border {
  box-shadow: 0 0 0 1px;
}
@media (min-resolution: 2dppx) {
  .hairline-border { box-shadow: 0 0 0 .5px; }
}
@media (min-resolution: 3dppx) {
  .hairline-border { box-shadow: 0 0 0 .33333333px; }
}
@media (min-resolution: 4dppx) {
  .hairline-border { box-shadow: 0 0 0 .25px; }
}
```

<style>
  .demo {
    position: relative;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: .25em;
  }
  .demo::after {
    content: 'DEMO';
    position: absolute;
    top: 0;
    right: 10px;
    color: #ccc;
  }
</style>


## Animation

### Donut spinner

```css
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: donut-spin 1.2s linear infinite;
}
```

<div class="demo">
  <div class="donut"></div>
  <style>
    @keyframes donut-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .donut {
      display: inline-block;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #7983ff;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: donut-spin 1.2s linear infinite;
    }
  </style>
</div>


