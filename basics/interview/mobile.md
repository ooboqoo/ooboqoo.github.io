# 面试题库 - 手机页面


## CSS

#### Retina 屏线宽 1px

When Apple pioneered this with their Retina display, they split the concept of pixels into *hardware pixels* and *software pixels*. A hardware pixel is an individual dot of light in the display. A software pixel, also called a CSS pixel in the web world, is a unit of measurement.

使用媒体查询可以精确设置线宽

```css
// 最正统的写法
@media only screen and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .box {
    border-width: 0.5px;
  }
}

// 偷懒的写法
.box {
  border-width: 0.1px;  // 当设置值小于 1 物理像素时会以 1 物理像素渲染
}

// 其他非正确的解决方案：transform  border-image  background-image  box-shadow
// 使用 transform 可以将线宽减到 1 物理像素以下，实际还是 1 物理像素，但会变浅和虚化
```

```css
/* This is the original logo. */
.logo {
    width: 197px; 
    height: 182px;
    /* Source image is 197px by 182px. */
    background: url('img/logo.png') no-repeat center center;
}
 
/* This will replace the logo with a 2x version on devices with a 2:1 ratio, such as Apple devices. */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { 
    .logo { 
        /* Source image is 394px by 364px. */
        background-image: url('img/logo@2x.png');
        background-size: 197px 182px;
    }
}
 
/* This will replace the logo with a 3x version on devices with a 3:1 ratio, such as the Samsung Galaxy S5. */
@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) { 
    .logo { 
        /* Source image is 591px by 546px. */
        background-image: url('img/logo@3x.png');
        background-size: 197px 182px;
    }
}
```


