# Markdown

## 语法速查表 Syntax Cheatsheet:

#### 内联元素 Span Elements

##### 强调 Phrase Emphasis

```md
*italic*   **bold**
_italic_   __bold__
_You **can** combine them_
```

##### 链接 Links

单行定义方式 Inline:
```md
An [example](http://url.com/ "Title")  // [显示文字](完整/相对地址 "提示文字")
```

使用标签分离方式 Reference-style labels (titles are optional):
```md
An [example][id]. Then, anywhere else in the doc, define the link:

[id]: http://example.com/  "Title"
```

图片链接格式：
```md
![alt text](/path/img.jpg "Title")

![alt text][id]
[id]: /url/to/img.jpg "Title"
```

##### 行内代码 Code Spans

```md
`code` spans are delimited by backticks.
You can include literal backticks like `` `this` ``.
```

#### 块级元素 Block Elements

##### 段落 Paragraphs and line breaks

```md

A paragraph separated by one or more blank lines.

```

##### 手动换行 Manual Line Breaks

```md
Roses are red,□□□  // End a line with two or more spaces
Violets are blue.
```

##### 标题 Headers

atx-style (closing #'s are optional): 推荐使用这种风格

```md
# Header 1 #
## Header 2 ##  // 关闭用的 # 是可选的，而且数量并不一定要与前面对应
###### Header 6
```

Setext-style:
```md
Header 1
========  // = 或 - 的数量是任意的，有就行

Header 2
--------
```
采用这种风格，前面必须有空行分隔，否则会被解释为普通文本，而 “---” 会被解释为 `<hr>`

##### 区块引用 Blockquotes

```md
> Email-style angle brackets are used for blockquotes.
> 
> > And, they can be nested.
> #### Headers in blockquotes
> 
> * You can quote a list.
> * Etc.
>
>     echo "And here's some example code.";
```

##### 列表 Lists

有序列表 Ordered, without paragraphs:

```md
1.  Foo
2.  Bar
```

无序列表 Unordered, with paragraphs:

```md
* A list item. * Bar
```

列表嵌套 You can nest them:

```md
-   Abacus
    + answer
-   Bubbles
    1. bunk
    2. bupkis
        + BELITTLER
    3. burper
-   Cunning
```

项目标记后面一定要接着至少一个空格或制表符。  
列表项目标记通常是放在最左边，但是其实也可以缩进，最多 3 个空格。（不适用 GitHub）  
原版标准使用1个tab或4个空格来定义列表嵌套。  
GitHub 规定用2个空格嵌套（You can create nested lists by indenting lines by two spaces.）

##### 预格式化代码块 Preformatted Code Blocks

Indent every line of a code block by at least 4 spaces or 1 tab.

```md
This is a normal paragraph:

    This is a preformatted code block.
        indent code
    code with no indent
```

##### 水平分割线 Horizontal Rules

Three or more hyphens/dashes, asterisks, or underscores on a line (space
separators are optional):

```md---
* * *
_ _ _ 
- - - -
```

#### Miscellaneous

##### Backslash Escapes

Markdown allows you to use backslash escapes to generate literal characters
which would otherwise have special meaning in Markdown’s formatting syntax.

```md
\   backslash
`   backtick
*   asterisk
_   underscore
{}  curly braces
[]  square brackets
()  parentheses
#   hash mark
+   plus sign
-   minus sign (hyphen)
.   dot
!   exclamation mark
```

##### Automatic linking for URLs

Any URL (like http://www.github.com/) will be automatically converted into a clickable link.

#### GitHub Flavored Markdown

##### Syntax highlighting

```md
```javascript
function test() {
  console.log("Add language name after the leading ```");
}
`` `
```

##### Tables

```md
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

注：在表格中输入 `|` 采用 `&#124;`；表格两侧的 `|` 是可选的；`:` 用来定义列对其方式。

另，下面这种不规范的写法，markd 能编译出看起来没表头的表格（左侧的 `|` 不能省，右侧的可省）

```md
| | |
|:----:|:-------------
| cmd  | description
```

##### Task lists

```md
- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request
```

##### Autolinked references and URLs

```md
[##](https://help.github.com/articles/autolinked-references-and-urls/)
```

##### Using emoji

```md
:EMOJICODE:
@octocat :+1: This PR looks great - it's ready to merge! :shipit:
```

##### Strikethrough
```md
~~Scratch this.~~    // Strikethrough uses two tildes
```

## 语法介绍 Markdown Syntax

上面 Cheatsheet 已经解释清楚的被省略了，这里的内容是对一些细节的补充说明。

### 概述 Overview

#### 理论基础 Philosophy

MD 不是要替代 HTML，而是提供一种易写易读的文档编辑方案。HTML 是发布格式，而 MD 是写作格式。

#### 兼容 HTML INLINE HTML

碰到任何 MD 不支持的语法，就直接使用 HTML。

内联的 HTML tag 直接使用，但块级元素前后需有空行割开，且开始标签和关闭标签都不能有缩进。

碰到块级元素，MD 不会修改里面的任何内容，也就是说内部不能用 MD 语法，以内联元素形式嵌入的 HTML 内是可以用 MD 语法的。


```md
This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.
```

#### 自动转义 Automatic Escaping for Special Characters

在 HTML 编辑中，有两个特殊字符需要特别注意：`&` 和 `<`。在 MD 文档编写时，可以直接使用，不用刻意将它们转义成实体形式。另外 MD
编译器非常智能，碰到 HTML 实体中的 `&` 以及 HTML 标签中的 `<` 会自动跳过，不用担心出乱。

### 块级元素 Block Elements

#### 段落及换行 Paragraphs and Line Breaks

MD 的段落前后需有1到多个空行分隔（可以包含空格和制表符，只要看起来是空的就行）。

编辑时的换行在编译时会忽略，如果要强制换行，需要在行尾添加 2个或多个空格。

#### 标题 Headers

#### 块级引用 Blockquotes

#### 列表 Lists

##### 关于缩进

To make lists look nice, you can wrap items with hanging indents:

```md
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
```

But if you want to be lazy, you don’t have to:

```md
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.
```
##### 列表项间的空行

If list items are separated by blank lines, Markdown will wrap the items in
tags in the HTML output. For example, this input:

```md
*   Bird

*   Magic
```
```md
&lt;ul>
&lt;li>&lt;p>Bird&lt;/p>&lt;/li>
&lt;li>&lt;p>Magic&lt;/p>&lt;/li>
&lt;/ul>
```

##### 单个列表项内存在多个段落的情况

List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:

```md
1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.
```

#### 代码块 Code Blocks

#### 水平分隔符 Horizontal Rules

## 附录

##### 参考资源

简单介绍: <http://blog.chinaunix.net/uid-7374279-id-5114730.html>

详细中文文档: <http://wowubuntu.com/markdown/index.html>

详细英文文档: <http://daringfireball.net/projects/markdown/syntax>

官网 Cheatsheet: <http://daringfireball.net/projects/markdown/dingus>

Markdown-Here-Cheatsheet: <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>

GitHub Flavored Markdown: <https://guides.github.com/features/mastering-markdown/>

##### 编译器

[marked](https://github.com/chjj/marked) A markdown parser and compiler. Built for speed.

[stackedit.io](https://stackedit.io/editor) 在线编辑器，看着挺好的哦

[dillinger.io](http://dillinger.io/) 一个在线编辑器，方便代码测试

##### 来龙去脉和语法特点

Markdown 是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）。它允许人们 “使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML(或者HTML)文档”。一份使用 Markdown
格式撰写的文件应该可以直接以纯文本发布，并且看起来不会像是由许多标签或是格式指令所构成。

Markdown 语法受到一些既有 text-to-HTML 格式的影响，包括 Setext、atx、Textile、reStructuredText、Grutatext 和 EtText，而最大灵感来源其实是纯文本电子邮件的格式。总之， Markdown 
的语法全由一些符号所组成，这些符号经过精挑细选，其作用一目了然。比如：在文字两旁加上星号，看起来就像 *强调*。Markdown
的列表看起来，嗯，就是列表。Markdown 的区块引用看起来就真的像是引用一段文字，就像你曾在电子邮件中见过的那样。

Markdown 语法的目标是：成为一种适用于网络的书写语言。Markdown 的构想不是要使得 HTML 文档更容易书写，也不是想要取代
HTML，甚至也没有要和它相近，它的语法种类很少，只对应 HTML 标记的一小部分。HTML 是一种发布的格式，Markdown
是一种书写的格式。Markdown 的格式语法只涵盖纯文本可以涵盖的范围。

正是因为 Markdown 的这些特点，而且功能比纯文本更强，因此有很多人用它写博客。世界上最流行的博客平台 WordPress 和大型 CMS 如 joomla、dru pal 都能很好的支持 Markdown。
