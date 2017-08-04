# XML

https://www.w3schools.com/xml/

## XML 教程

### 语法

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```

* 只能有一个根节点
* 首行声明 prolog 是可选的
* 所有标签都必须关闭(首行声明没有关闭，但这是合法的，因为它不是 xml 内容)
* 标签对大小写敏感
* 元素必须正确地嵌套
* 元素属性值必须加引号，不能省略
* 内容中不允许出现 `<`，必须采用实体形式保存
* 注释格式为 `<!-- 注释内容 -->`
* XML 中的多个连续空白会被保留(而 HTML 会将多个空白字符视为一个)
* XML 的换行用 `LF` 存储(同 Linux，Win 为 CR+LF)

### XML 元素 与 属性

An element can contain:
  * text
  * attributes
  * other elements
  * or a mix of the above

XML elements must follow these naming rules:
  * Element names are case-sensitive
  * Element names must start with a letter or underscore
  * Element names cannot start with the letters xml (or XML, or Xml, etc)
  * Element names can contain letters, digits, hyphens, underscores, and periods
  * Element names cannot contain spaces
  * Any name can be used, no words are reserved (except xml).

实际命名应该尽量简短、自描述，多个单词用 `_` 分隔或采用驼峰形式，不要使用 `-` `.` `:` 以及非英文字符。

XML 是可扩展的，当你向 XML 添加内容时，原有的应用能够正常工作，This is one of the beauties of XML。

所有 属性 都可以使用 子元素 替代，使用元素功能更强更灵活，所以不是很推荐使用属性。

### 命名空间

当合并多个不同 xml 文件时就可能存在命名冲突，这时可以引入命名空间来解决：

```xml
<root>
  <h:table xmlns:h="http://www.w3.org/TR/html4/">
    <h:tr>
      <h:td>Apples</h:td>
      <h:td>Bananas</h:td>
    </h:tr>
  </h:table>

  <f:table xmlns:f="https://www.w3schools.com/furniture">
    <f:name>African Coffee Table</f:name>
    <f:width>80</f:width>
    <f:length>120</f:length>
  </f:table>
</root>
```

或者也可以将各子元素的命名空间声明提升到根元素上

```xml
<root xmlns:h="http://www.w3.org/TR/html4/" xmlns:f="https://www.w3schools.com/furniture"></root>
```

在元素中使用 `prefix:` 形式的前缀时，必须定义给前缀定义命名空间，命名空间通过元素起始标签的 xmlns 属性添加，格式是 `xmlns:prefix="URI"`。当在元素上定义 xmlns 属性后，其下元素就可以使用该命名空间，所有通常都定义在根元素上。

对于解析器 URI 并没什么特别的用处，仅仅是给了一个唯一的名字罢了。实际使用时，该 URI 通常会指向一个提供该命名空间信息的网址。

可以像下面示例一样定义一个没有前缀的命名空间，也就是默认命名空间，这样所有没有前缀的标签都归属该命名空间。

```xml
<table xmlns="http://www.w3.org/TR/html4/"></table>
```

### XML 解析器

IE8(不含)以上的浏览器都内置了 XML 解析器。

```js
parser = new DOMParser();
xmlDoc = parser.parseFromString(text,"text/xml");
```

XMLHttpRequest 对象也带有内置的 XML 解析器，`responseText` 包含响应的字符串形式，而 `responseXML` 则包含解析后的 XML DOM 对象。

```js
xmlDoc = xmlhttp.responseXML;
```

### XPath

XPath uses path expressions to select nodes or node-sets in an XML document. These path expressions look very much like the expressions you see when you work with a traditional computer file system.

XPath expressions can be used in JavaScript, Java, XML Schema, PHP, Python, C and C++, and lots of other languages.
