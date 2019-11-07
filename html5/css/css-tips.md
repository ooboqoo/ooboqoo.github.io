# CSS Tips


## 小技巧

color 有两个值 `transparent` `currentColor` 非常好用。

`div:active { background: red; }` `:active` 伪元素可以用在 a 以外的元素上哦，添加点击时的效果非常好用。

`z-index` 无效时，加个 `position: relative;` 就好。


## 表格

#### `border`

如果不设置 `border-collapse: collapse;` 在 `tr` 上设置 `border` 无效。但设置 `border-collapse: collapse;` 后，`table` `tr` `td` 上的 `border-radius` 就会失效。

#### `min-width` `max-width`

https://www.w3.org/TR/CSS21/tables.html#propdef-table-layout

In CSS 2.1, the effect of `min-width` and `max-width` on tables, inline tables, table cells, table columns, and column groups is undefined. To enforce the width, you may try to change the `table-layout` property to `fixed`.


## 新特性学习

#### `attr`

```html
<a data-foo="https://ngapps.cn">ooboqoo</a>
```

```css
a:hover::after {
  content: "(" attr(data-href) ")";
}
```

#### `clip` `clip-path` `mask`

`clip` 属性只支持 rect 一种用法，不够灵活，已经被新的 `clip-path` 取代。

`clip` 属性要求元素是绝对定位的，否则无效。另外一个特点是，

```css
.element {
  position: absolute;
  clip: rect(10px, 250px, 150px, 10px);  /* 显示范围的坐标 top right bottom left */
}
```

<div class="demo" style="position: relative; height: 100px;">
  图片前的文字
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/Harry-Potter-1-.jpg"
       style="position: absolute; width： 200px; height: 200px; clip: rect(10px,250px,100px,10px);">
  图片后的文字
  <p style="position: absolute;">图片后绝对定位的文字</p>
</div>

`clip-path` 支持的裁剪规则就非常灵活了，具体用法可参考 https://bennettfeely.com/clippy/

```css
.clip-animation {
  animation: clip 1s infinite;
}
@keyframes clip {
  0% { clip-path: circle(50% at 50% 50%); }
  100% { clip-path: polygon(50% 5%, 0% 100%, 100% 100%); }
}
```

<div class="demo" style="height: 100px;">
  <img class="clip-animation" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/building-to-be-clipped.jpg"
       style="width: 300px; height: 100px;">
  <style>
    .clip-animation { animation: clip 1s infinite; }
    @keyframes clip {
      0% { clip-path: circle(50% at 50% 50%); }
      100% { clip-path: polygon(50% 5%, 0% 100%, 100% 100%); }
    }
  </style>
</div>

`clip-path` 还支持结合 SVG 的 `clipPath` 路径使用。

<div class="demo">
  <img src="https://hacks.mozilla.org/files/2017/06/omega.jpg" height="200" style="clip-path: url(#clipMask)">
  <svg width="0" height="0">
     <defs>
      <clipPath id="clipMask">
        <path d="M 40 0 L 0 40, 60 100, 0 160, 40 200, 100 140, 160 200, 200 160, 140 100, 200 40, 160 0">
      </clipPath>
    </defs>
  </svg>
</div>

`mask` 这个属性可以用图片来做蒙版，不过目前就 Edge 和 Firefox 支持。


