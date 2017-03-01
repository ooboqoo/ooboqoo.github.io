# Icons

https://www.w3schools.com/icons/default.asp

## 使用现有图标字体库

To insert an icon, add the name of the icon class to any inline HTML element.

The `<i>` and `<span>` elements are widely used to add icons.

All the icons in the icon libraries below, are scalable vector icons that can be customized with CSS (size, color, shadow, etc.)

```html
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<i class="fa fa-cloud"></i>
<i class="fa fa-heart"></i>
</body>
```

```html
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
<i class="glyphicon glyphicon-cloud"></i>
<i class="glyphicon glyphicon-remove"></i>
</body>
```

https://material.io/icons/   
技术内幕详解：http://google.github.io/material-design-icons/#icon-font-for-the-web

```html
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
<body>
<i class="material-icons">cloud</i>
<i class="material-icons">favorite</i>
</body>
```


## 自己制作图标字体库

### 字体制作工具

[FontCreator 10](http://www.high-logic.com/font-editor/fontcreator.html) : 本地制作软件，需要花银子。   
https://icomoon.io/ : 免费的在线图标字体制作工具，偶尔用用感觉这个更靠谱。

### 字体使用

制作样式文件 style.css：

```css
@font-face {
  font-family: 'icomoon';
  src: url('icomoon.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
}

.icon-home:before {
  content: "\e900";
}
.icon-clubs:before {
  content: "\e918";
}
```

html 在调用：

```html
<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <span class="icon-home"></span>
    <span class="icon-clubs"></span>
</body>
</html>
```
