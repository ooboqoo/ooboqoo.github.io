# Font Awesome

示例：http://fontawesome.io/examples/  
速查表：http://fontawesome.io/icons/

## Download &amp; Customize

You can download, customize, and use the icons and default styling manually. Both CSS and CSS Preprocessor (Sass and Less) formats are included.


### Using CSS

1. Copy the entire `font-awesome` directory into your project.
2. In the `<head>` of your html, reference the location to your font-awesome.min.css.
```html
  <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
```

### Using Sass

Use this method to customize Font Awesome 4.6.3 using LESS or SASS.

1. Copy the `font-awesome/` directory into your project.
2. Open your project's `font-awesome/scss/_variables.scss` and edit the `$fa-font-path` variable to point to your font directory.
  ```sass
    @fa-font-path:   "../font";
  ```
  > The font path is relative from your compiled CSS directory.
3. Re-compile your SASS if using a static compiler. Otherwise, you should be good to go.

## Examples

官网示例有直接显示效果，并附有指向相关源码的链接。

### 基本用法 Basic Icons

You can place Font Awesome icons just about anywhere using the CSS Prefix `fa` and the icon's name. Font Awesome is designed to be used with inline elements (we like the `<i>` tag for brevity, but using a `<span>` is more semantically correct).

```html
<i class="fa fa-camera-retro"></i> fa-camera-retro
```

### 图标缩放 Larger Icons

To increase icon sizes relative to their container, use the `fa-lg` (33% increase), `fa-2x`, `fa-3x`, `fa-4x`, or `fa-5x` classes.

```html
<i class="fa fa-camera-retro fa-lg"></i> fa-lg
<i class="fa fa-camera-retro fa-2x"></i> fa-2x
<i class="fa fa-camera-retro fa-3x"></i> fa-3x
<i class="fa fa-camera-retro fa-4x"></i> fa-4x
<i class="fa fa-camera-retro fa-5x"></i> fa-5x
```

### 图标等宽 Fixed Width Icons

Use `fa-fw` to set icons at a fixed width. Great to use when different icon widths throw off alignment. Especially useful in things like nav lists & list groups.

```html
<div class="list-group">
  <a class="list-group-item" href="#"><i class="fa fa-home fa-fw" aria-hidden="true"></i>&nbsp; Home</a>
  <a class="list-group-item" href="#"><i class="fa fa-book fa-fw" aria-hidden="true"></i>&nbsp; Library</a>
  <a class="list-group-item" href="#"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i>&nbsp; Applications</a>
  <a class="list-group-item" href="#"><i class="fa fa-cog fa-fw" aria-hidden="true"></i>&nbsp; Settings</a>
</div>
```

### 作为列表图标 List Icons

Use `fa-ul` and `fa-li` to easily replace default bullets in unordered lists.

```html
<ul class="fa-ul">
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-check-square"></i>can be used</li>
  <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
  <li><i class="fa-li fa fa-square"></i>in lists</li>
</ul>
```

### 边框和定位 Bordered & Pulled Icons

Use `fa-border` and `fa-pull-right` or `fa-pull-left` for easy pull quotes or article icons.

```html
<i class="fa fa-quote-left fa-3x fa-pull-left fa-border" aria-hidden="true"></i>
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.
```

### 动画 Animated Icons

Use the `fa-spin` class to get any icon to rotate, and use `fa-pulse` to have it rotate with 8 steps. Works well with `fa-spinner`, `fa-refresh`, and `fa-cog`.

```html
<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
```

> CSS3 animations aren't supported in IE8 - IE9.

### 旋转和翻转 Rotated & Flipped

To arbitrarily rotate and flip icons, use the `fa-rotate-*` and `fa-flip-*` classes.

```html
<i class="fa fa-shield"></i> normal<br>
<i class="fa fa-shield fa-rotate-90"></i> fa-rotate-90<br>
<i class="fa fa-shield fa-rotate-180"></i> fa-rotate-180<br>
<i class="fa fa-shield fa-rotate-270"></i> fa-rotate-270<br>
<i class="fa fa-shield fa-flip-horizontal"></i> fa-flip-horizontal<br>
<i class="fa fa-shield fa-flip-vertical"></i> fa-flip-vertical
```

### 图标堆叠 Stacked Icons

To stack multiple icons, use the `fa-stack` class on the parent, the `fa-stack-1x` for the regularly sized icon, and `fa-stack-2x` for the larger icon. `fa-inverse` can be used as an alternative icon color. You can even throw larger icon classes on the parent to get further control of sizing.

```html
<span class="fa-stack fa-lg">
  <i class="fa fa-square-o fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x"></i>
</span>
fa-twitter on fa-square-o<br>
```

### Custom CSS

Anything you can do with CSS font styles, you can do with Font Awesome. 如可以改变颜色









