# 面试题库 - CSS


## CSS2 进阶

`display: inline-block;` 元素间的空白间隙

移除空格，使用 margin 负值，font-size letter-spacing word-spacing


## CSS3


## 综合专题

### 垂直居中

1. Flexbox

不考虑兼容老式浏览器的话，用 Flex 布局简单直观一劳永逸。IE10(-ms-)+

```css
.parent {
    display: flex;
    display: -webkit-flex;
    align-items: center;  /* 指定垂直居中 */
}
```

2. 表格布局

该方法兼容性最好，子元素为 inline、inline-block、block 均可，并且具有自适应性，但需要多嵌套一层代码。

```css
.parent {
    display: table;
}
.child {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
```


3. 绝对定位 1

不知道自己高度和父容器高度的情况下, 利用绝对定位只需要以下三行：

该方案有点是适用面广，缺点是适用了 CSS3 特性，兼容性略有欠缺。

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);  /* IE9 要前缀 -ms- */
}
```

4. 绝对定位 2

可兼容到 IE8+，要求子元素高度固定，设置 `position: absolute; top: 0; bottom: 0; margin: auto;` 实现自适应垂直居中。

因为使用绝对定位会脱离文档流，所以这种方法常常用来对对话框和弹窗进行定位，也常常用于对界面基础结构进行布局。

```css
.parent {
    height: 100vh;
    position: relative;
}
.child {
    position: absolute;
    width: 500px;
    height: 500px;
    top: 0;
    bottom: 0;
    margin: auto;
}
```

5. 相对定位

若父容器下只有一个元素，且父元素设置了高度，则只需要使用相对定位即可

```css
.parent {
    height: 500px;
}
.child {
    position: relative;
    top: 50%;
    /* margin-top: -xxpx;  这种方法需要能够确定自身的高度，因为如果写 % 是相对父级元素的 */
    transform: translateY(-50%);
}
```

### 性能优化
