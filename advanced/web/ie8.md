# 浏览器兼容

重要考虑因素：
* Bootstrap 3.3 支持 IE8-10
* WinXP 下 IE 最高只能升级到 IE8
* 2017 年 IE8 的市场份额在逐步下降，但仍占 10% 左右 (来源：[百度统计](http://tongji.baidu.com/data/browser))

### 时间轴

* 2015-7-29 - Win10 & Edge 发布
* 2012-9-04 - IE10 发布
* 2012-8-01 - Win8 发布
* 2011-3-14 - IE9 发布
* 2009-7-22 - Win7 发布
* 2009-3-19 - IE8 发布
* 2001-8-24 - WinXP 发布

## HTML5

#### 识别 HTML5 元素

如果使用了 HTML5 的新标签 nav/footer 等，那么在 IE 中这些标签可能无法正常显示，需使用 html5shiv 等弥补。

#### placeholder

IE8 IE9 不支持 HTML5 属性 placeholder，不过为解决此问题的js插件挺多，如：jquery-placeholder。



## CSS3

#### 不支持 CSS3 的某些特性

IE8 不支持 CSS3 的很多新特性，如：

|                 | IE8           | IE9
|-----------------|---------------|-----------------------------
| `border-radius` | Not supported | Supported
| `box-shadow`    | Not supported | Supported
| `transform`     | Not supported | Supported, with `-ms` prefix
| `transition`    | Not supported | Not supported

#### Media Query

IE8 不支持 Media Query，推荐采用 Respond.js 解决此问题。

#### initial

IE 各版本都不支持使用 `initial`，可通过以下代码确保兼容性，另外可用 js 来实现相同功能 `div.style.display = ''`。

```css
.my-selector { width: auto; width: initial; }
```

#### last-child

`first-child` 是 CSS2 的内容，但是 `last-child` 就不是了，所以IE8不买账。推荐通过添加一个 .last 类来变通解决。

#### max-width

IE 解析 max-width 严格要求直接父元素的宽度是固定的。



## JavaScript

#### IE 版本检测

AngularJS 检测 IE 版本号的 hacker 方法 `doucment.doucmentMode`，此方法只有IE有，且可准确拿到版本号。

IE10 及其更低版本 `navigator.appName` 值是 "Microsoft Internet Explorer" ，其它是 "Netscape"。

#### 获取浏览器语言类型

IE10 及其更低版本是通过 `browserLanguage` 属性获取浏览器语言类型，其它是通过 `language` 属性

#### localStorage

从 IE8 开始就支持 `localStorage`。



## 其他

#### DOCTYPE

需要确保 HTML 页面开始部分要有 DOCTYPE 声明，否则可能会进入 quirks 模式。

#### 使用 `meta` 标签调节浏览器的渲染方式

IE8 中有一个 "兼容性视图" 的概念，这是为了照顾针对 IE6/7 开发的网站，我们需要强制 IE8 使用最新的内核渲染页面：

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

`IE=edge` 表示强制使用IE最新内核，`chrome=1` 表示如果安装了谷歌浏览器插件，那么就用 Chrome 内核来渲染。



