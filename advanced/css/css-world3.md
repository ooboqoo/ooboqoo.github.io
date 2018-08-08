# CSS 世界 8-12

## 强大的文本处理能力

CSS 就是凭借自身强大的文本处理和文本展示能力成为样式布局的标杆语言的。CSS 文本处理能力之所以强大，一方面是其基础概念，例如块级盒模型和内联盒模型，就是为了让文本可以如文档般自然呈现；另一方面是有非常非常多的与文本处理相关 CSS 属性的支持。

### font-size

line-height 的部分类别属性值是相对于 font-size 计算的，vertical-align 百分比值属性值又是相对于 line-height 计算的，于是看上去八辈子都搭不上边的 vertical-align 和 font-size 属性背后其实也有着关联的。

```css
/* 图片垂直居中应用示例 */
p > img {
  width: 16px; height: 19px;
  vertical-align: 25%;        /* 图片垂直居中效果 */
  vertical-align: .6ex;       /* 更好的方案 */
  position: relative; top: 8px;
}
```

ex 是字符 x 的高度  
em 完全取决于 M 的字形，em 在传统排版中指一个字模的高度  
rem 即 root em，就是根元素的 em。使用 rem，我们的计算值不会受当前元素 font-size 大小的影响。要想实现带有缩放性质的弹性布局，使用 rem 是最佳策略。

```css
h1 {
  font-size: 2em;
  margin-left: 1em;  /* 这里的 1em 计算值跟上一行的 2em 相等 */
}
```

再举个适用于 em 的场景，如果我们使用 SVG 矢量图标，建议设置 SVG 宽高如下。这样，图标始终能和文字保持一致。

```css
svg { width: 1em; height: 1em; }
```

font-size 支持长度值，如 1em，也支持百分比值，如 100%，但不少人可能不清楚 font-size 的关键字属性值：
  * 相对尺寸关键字 - 指相对于当前元素 font-size 计算
    - larger 大一点，是 big 元素的默认 font-size 属性值
    - smaller 小一点，是 small 元素的默认 font-size 属性值
  * 绝对尺寸关键字 - 与当前元素的 font-size 无关，经受浏览器设置的字号影响
    - xx-large 好大好大，和 h1 元素计算值一样
    - x-large 好大，和 h2 元素计算值一样
    - large 大 和 h3 元素计算值近似(指偏差1px以内)
    - medium 中号，是 font-size 的初始值，和 h4 元素计算值一样
    - small 小，和 h5 元素计算值近似
    - x-small 好小，和 h6 元素计算值近似
    - xx-small 好小好小

桌面 Chrome 浏览器下有个 12px 的字号限制，就是文字的 font-size 计算值不能小于 12px，我猜是因为中文，如宋体，要是小于 12px 就会挤成一团，略丑，Chrome 看不下去，就直接禁用了。

但是如果是 font-size:0，那么文字会被直接隐藏掉。

### font-family





