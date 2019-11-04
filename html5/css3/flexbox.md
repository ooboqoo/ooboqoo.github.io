# 弹性布局 Flexbox




参考资源： 
[Flex 布局教程 -- 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool) +
[CSS Flexible Boxes Layout specification -- W3C](http://www.w3.org/TR/css3-flexbox/)

布局的传统解决方案，基于盒状模型，依赖 `display` + `position` + `float`。 2009年，W3C 提出了 Flex 布局，可以简便、完整、响应式地实现各种页面布局。可以把 `flex` 简单理解为 `float` 的升级版本。

##### Flex Box Properties

```less
.box {
  display: flex | inline-flex;
  flex-direction: row (default) | row-reverse | column | column-reverse;  // 排列方向
  flex-wrap: nowrap (default) | wrap | wrap-reverse;                      // 折行
  flex-flow: <flex-direction> <flex-wrap>;                                // 前两项的简写
  justify-content: flex-start (default) | flex-end | center |             // 水平对齐
                   space-between (两端对齐) | space-around (等间距);
  align-items: flex-start | flex-end | center |                           // 垂直对齐-单轴
               baseline (项目的第一行文字的基线对齐) | stretch (default);
  align-content: flex-start | flex-end | center |                         // 垂直对齐-多轴
                 space-between | space-around | stretch (default);
}
```

注意，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。

##### Flex Item Properties

```less
.item {
  order: <integer>;             // 定义项目的排列顺序，数值越小，排列越靠前，默认为 0
  flex: none (0 0 auto) | auto (1 1 auto) |  // flex-grow, flex-shrink, and flex-basis 三者的简写形式
        [<flex-grow> <flex-shrink> <flex-basis>]; // 默认值 0 1 auto
  flex-grow: <number>;         // 如果有剩余空间，各项目的扩张系数，默认为 0，即不放大
  flex-shrink: <number>;       // 空间不足时各项目的收缩系数，默认为 1，为 0 时该项不收缩
  flex-basis: <width> | auto;  // 指定项目占用的基准宽度 [注1]
  align-self: auto | flex-start | flex-end | // 对单个项目设置特定的对齐方式，覆盖 container 的 align-items
              center | baseline | stretch;
}
```

注1：`max-width` | `min-width` 优先于 `flex-basis` 优先于 `width` 优先于 content(实际内容宽度)  [参考链接](https://www.jianshu.com/p/17b1b445ecd4)