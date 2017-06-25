# 浏览器兼容

重要考虑因素：
* Bootstrap 3.3 支持 IE8-10
* WinXP 下 IE 最高只能升级到 IE8
* 2017 年 IE8 的市场份额在逐步下降，但仍占 10% 左右 (来源：[百度统计](http://tongji.baidu.com/data/browser))


## IE8+ 兼容经验小结

http://www.cnblogs.com/ruomeng/p/5332814.html

如果你在写 HTML/CSS 的时候是按照 W3C 推荐的方式写的，然后关注过以下几点，那么基本上 IE8+ 兼容性问题都 OK 了。

#### DOCTYPE

首先需要确保你的 HTML 页面开始部分要有 DOCTYPE 声明。

#### 使用 `meta` 标签调节浏览器的渲染方式

IE8 中有一个 "兼容性视图" 的概念，当初 IE8 发布时，相对于 IE6/7 已经做出了非常大的改进，但是很多老站点仅针对 IE6/7 进行了优化，使用 IE8 渲染反而会一团糟。为了照顾这些苦逼的前端工程师，IE8 加入了 "兼容性视图" 功能，这样的话就可以在 IE8 中使用 IE6/7 的内核渲染页面。这个当然不是我们想要的，所以需要使用 meta 标签来强制 IE8 使用最新的内核渲染页面，代码如下：

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

`IE=edge` 表示强制使用 IE 最新内核，`chrome=1` 表示如果安装了浏览器插件 Google Chrome Frame，那么就用 Chrome 内核来渲染。

#### Media Query

IE8 不支持 Media Query，推荐采用 Respond.js 解决此问题。

#### 支持 CSS3 的某些特性

IE8 不支持 CSS3 的很多新特性，如：

|                 | IE8           | IE9
|-----------------|---------------|-----------------------------
| `border-radius` | Not supported | Supported
| `box-shadow`    | Not supported | Supported
| `transform`     | Not supported | Supported, with `-ms` prefix
| `transition`    | Not supported | Not supported
| `placeholder`   | Not supported | Not supported

#### 识别 HTML5 元素

如果你在前端代码中使用了 HTML5 的新标签 nav/footer 等，那么在 IE 中这些标签可能无法正常显示。我使用 html5shiv，具体使用方法见文档。

#### max-width

还有一个在 IE8 中经常遇到的问题就是 max-width，网页中图片的尺寸可能比较宽，我会给它设置 max-width: 100% 来限制其宽度最大为父容器的宽度，但是有时候却不奏效，慢慢摸索才得知 IE 解析 max-width 所遵循的规则：严格要求直接父元素的宽度是固定的。经实验发现 Chrome 所遵守的规则比 IE 松一些，所以这个问题应该不归属为 IE 兼容性问题，不过我还是提一下吧。

#### placeholder

IE8 下不支持 HTML5 属性 placeholder，不过为解决此问题的js插件挺多的，比如：jquery-placeholder。

#### last-child

first-child 是 CSS2 的内容，但是 last-child 就不是了，所以IE8不买账。推荐的做法是给最后一个元素设置一个 .last 的 class，然后对此进行样式设置，这样就全部兼容了。

