# HTML


## 基本概念

### HTML 语言

HTML 是用来描述网页的一种语言。
* HTML 指的是超文本标记语言 (Hyper Text Markup Language)
* HTML 不是一种编程语言，而是一种标记语言 (markup language)
* 标记语言是一套标记标签 (markup tag)
* HTML 使用标记标签 来描述网页

### HTML 元素

HTML 文档是由 HTML 元素定义的。HTML 元素指的是从开始标签（start tag）到结束标签（end tag）的所有代码。

### HTML 属性

HTML 标签可以拥有属性。
属性提供了有关 HTML 元素的更多的信息。
属性和属性值对大小写不敏感。
属性值应该始终被包括在引号内。双引号是最常用的，不过使用单引号也没有问题。


## 基础

### 文档声明

Web 世界中存在许多不同的文档。只有了解文档的类型，浏览器才能正确地显示文档。

HTML 也有多个不同的版本，浏览器需要知道确切 HTML 版本来完全正确地显示页面，这就是 `<!DOCTYPE>` 的用处。

*`<!DOCTYPE>` 不是 HTML 标签*。它为浏览器提供一项信息（声明），即 HTML 是用什么版本编写的。

```html
<!-- HTML5 -->
<!DOCTYPE html>

<!-- HTML 4.01 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!-- XHTML 1.0 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

### 头部元素

`<head>` 元素是所有头部元素的容器。`<head>` 内的元素可包含脚本，样式表，提供元信息，等等。

以下标签都可以添加到 head：`<title>`、`<base>`、`<link>`、`<meta>`、`<script>` 以及 `<style>`。

### 样式表

```html
<!-- 外部样式表 -->
<link rel="stylesheet" type="text/css" href="mystyle.css">

<!-- 内部样式表 -->
<style type="text/css">
  p {margin-left: 20px}
</style>

<!-- 内联样式 -->
<p style="color: red; margin-left: 20px">This is a paragraph</p>
```

### 脚本

```html
<script type="text/javascript">document.write("Hello World!")</script>
<noscript>Your browser does not support JavaScript!</noscript>
```

