# 面试题库 - CSS


## CSS2 进阶

`display: inline-block;` 元素间的空白间隙

移除空格，使用 margin 负值，font-size letter-spacing word-spacing

#### BFC 及其应用

创建 BFC 的方式有：html根元素；float浮动；绝对定位；overflow 不为 visible；display 为表格布局或弹性布局

BFC 的主要作用是：清除浮动 + 解决垂直方向外边距折叠问题

#### BFC IFC GFC FFC

* BFC(Block formatting contexts) 块级格式上下文
* IFC(Inline formatting conetexts) 内联格式上下文
* GFC(GridLayout formatting contexts) 网格布局格式化上下文
* FFC(Flex formatting contexts) 自适应格式上下文


#### `opacity: 0` `visibility: hidden` `display: none` 优劣及各自适用场景

结构
  * `display:none` 让元素从渲染树中消失
  * `visibility: hidden` 渲染元素继续占据空间，但内容不可见
  * `opacity: 0` 虽然表面上看不到内容，但点击事件有效

继承
  * display 和 opacity 是非继承属性，修改子孙节点对结果无影响
  * visibility 是继承属性，可通过修改子孙节点的属性让他们显示出来。

性能
  * display 会引发重排，单次操作耗性能，但后续就不没有这块内容的计算开销了
  * visibility 和 opacity 只是重绘，性能消耗少

读屏器
  * 不会读取 display: none 的内容
  * 会读取 visibility 和 opacity 的内容

动画
  * display 属性不支持动画
  * visibility 和 opacity 支持动画
  * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties





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


### CSSOM

如何禁用一张样式表定义？

如何删除样式表中的某一条定义？
