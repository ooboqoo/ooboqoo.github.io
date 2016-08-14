# Markdown

<h2>语法速查表 Syntax Cheatsheet:</h2>
<div>
<h4>内联元素 Span Elements</h4>

<h5>强调 Phrase Emphasis</h5>
<pre>*italic*   **bold**
_italic_   __bold__
_You **can** combine them_
</pre>

<h5>链接 Links</h5>
<p>单行定义方式 Inline:</p>
<pre>An [example](http://url.com/ "Title")
// [显示文字](完整/相对地址 "提示文字")
</pre>

<p>使用标签分离方式 Reference-style labels (titles are optional):</p>
<pre>An [example][id]. Then, anywhere else in the doc, define the link:

[id]: http://example.com/  "Title"
</pre>
<p>Reference-style links use a second set of square brackets, inside which you place a label of your choosing to identify the link.</p>

<p>更多示例：</p>
<pre>
[I'm an inline-style link](https://www.google.com)  
[I'm an inline-style link with title](https://www.google.com "Google's Homepage")  
[I'm a reference-style link][Arbitrary case-insensitive reference text]  
[I'm a relative reference to a repository file](../blob/master/LICENSE)  
[You can use numbers for reference-style link definitions][1]  
Or leave it empty and use the [link text itself].  
URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or &lt;http://www.example.com&gt; and sometimes example.com (but not on Github, for example).  
Some text to show that the reference links can follow later.
    // 这里的空行是不能省的，前面各行采用附加2个空格换行
[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
</pre>

<h5>图片 Images</h5>
<p>Inline (titles are optional):</p>
<pre>![alt text](/path/img.jpg "Title")
</pre>
<p>Reference-style:</p>
<pre>![alt text][id]

[id]: /url/to/img.jpg "Title"
</pre>

<h5>行内代码 Code Spans</h5>
<pre>`&lt;code&gt;` spans are delimited by backticks.
You can include literal backticks like `` `this` ``.
</pre>

<h4>块级元素 Block Elements</h4>

<h5>段落 Paragraphs and line breaks</h5>
<pre>
  
A paragraph separated by one or more blank lines.

</pre>

<h5>手动换行 &lt;br&gt; Manual Line Breaks</h5>
<pre>
Roses are red,□□□  // End a line with two or more spaces
Violets are blue.
</pre>

<h5>标题 Headers</h5>
<p>atx-style (closing #'s are optional): 推荐使用这种风格</p>
<pre>
# Header 1 #
## Header 2 ##  // 关闭用的 # 是可选的，而且数量并不一定要与前面对应
###### Header 6
</pre>

<p>Setext-style:</p>
<pre>
Header 1
========  // = 或 - 的数量是任意的，有就行

Header 2
--------
</pre>
<p>采用这种风格，前面必须有空行分隔，否则会被解释为普通文本，而 “---” 会被解释为 &lt;hr&gt;</p>


<h5>区块引用 Blockquotes</h5>
<pre>
&gt; Email-style angle brackets are used for blockquotes.
&gt; 
&gt; &gt; And, they can be nested.
&gt; #### Headers in blockquotes
&gt; 
&gt; * You can quote a list.
&gt; * Etc.
&gt;
&gt;     echo "And here's some example code.";
</pre>

<h5>列表 Lists</h5>
<p>有序列表 Ordered, without paragraphs:</p>
<pre>
1.  Foo
2.  Bar
</pre>

<p>无序列表 Unordered, with paragraphs:</p>
<pre>
*   A list item.
*   Bar
</pre>

<p>列表嵌套 You can nest them:</p>
<pre>
-   Abacus
    + answer
-   Bubbles
    1. bunk
    2. bupkis
        + BELITTLER
    3. burper
-   Cunning
</pre>
<p>项目标记后面一定要接着至少一个空格或制表符。</p>
<p>列表项目标记通常是放在最左边，但是其实也可以缩进，最多 3 个空格。（不适用 GitHub）</p>
<p>原版标准使用1个tab或4个空格来定义列表嵌套。</p>
<p>GitHub 规定用2个空格嵌套（You can create nested lists by indenting lines by two spaces.）</p>

<h5>预格式化代码块 Preformatted Code Blocks</h5>
<p>Indent every line of a code block by at least 4 spaces or 1 tab.</p>
<pre>
This is a normal paragraph:

    This is a preformatted code block.
        indent code
    code with no indent
</pre>

<h5>水平分割线 Horizontal Rules</h5>
<p>Three or more hyphens/dashes, asterisks, or underscores on a line (space separators are optional):</p>
<pre>---
* * *
_ _ _ 
- - - -
</pre>

<h4>Miscellaneous</h4>

<h5>Backslash Escapes</h5>
<p>Markdown allows you to use backslash escapes to generate literal characters which would otherwise have special meaning in Markdown’s formatting syntax.</p>
<pre>
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
</pre>

<h5>Automatic linking for URLs</h5>
<p>Any URL (like http://www.github.com/) will be automatically converted into a clickable link.</p>

<h4>GitHub Flavored Markdown</h4>

<h5>Syntax highlighting</h5>
<pre>
```javascript
function test() {
  console.log("Add language name after the leading ```");
}
```
</pre>

<h5>Tables</h5>
<pre>
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
</pre>

<h5>Task lists</h5>
<pre>- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request</pre>

<h5>Autolinked references and URLs <a href="https://help.github.com/articles/autolinked-references-and-urls/">##</a></h5>

<h5>Using emoji</h5>
<pre>:EMOJICODE:
@octocat :+1: This PR looks great - it's ready to merge! :shipit:</pre>

<h5>Strikethrough</h5>
<pre>~~Scratch this.~~    // Strikethrough uses two tildes
</pre>
</div>

<h2>语法介绍 Markdown Syntax</h2>
<div>
<p>上面 Cheatsheet 已经解释清楚的被省略了，这里的内容是对一些细节的补充说明。</p>

<h3>概述 Overview</h3>
<h4>理论基础 Philosophy</h4>
<p>MD 不是要替代 HTML，而是提供一种易写易读的文档编辑方案。HTML 是发布格式，而 MD 是写作格式。</p>

<h4>兼容 HTML  INLINE HTML</h4>
<p>碰到任何 MD 不支持的语法，就直接使用 HTML。</p>
<p>内联的 HTML tag 直接使用，但块级元素前后需有空行割开，且开始标签和关闭标签都不能有缩进。</p>
<p>碰到块级元素，MD 不会修改里面的任何内容，也就是说内部不能用 MD 语法，以内联元素形式嵌入的 HTML 内是可以用 MD 语法的。</p>
<pre>
This is a regular paragraph.

&lt;table&gt;
    &lt;tr&gt;
        &lt;td&gt;Foo&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

This is another regular paragraph.
</pre>

<h4>自动转义 Automatic Escaping for Special Characters</h4>
<p>在 HTML 编辑中，有两个特殊字符需要特别注意：<code>&AMP;</code> 和 <code>&lt;</code>。在 MD 文档编写时，可以直接使用，不用刻意将它们转义成实体形式。另外 MD 编译器非常智能，碰到 HTML 实体中的 <code>&AMP;</code> 以及 HTML 标签中的 <code>&lt;</code> 会自动跳过，不用担心出乱。</p>

<h3>块级元素 Block Elements</h3>
<h4>段落及换行 Paragraphs and Line Breaks</h4>
<p>MD 的段落前后需有1到多个空行分隔（可以包含空格和制表符，只要看起来是空的就行）。</p>
<p>编辑时的换行在编译时会忽略，如果要强制换行，需要在行尾添加 2个或多个空格。</p>
<h4>标题 Headers</h4>
<h4>块级引用 Blockquotes</h4>
<h4>列表 Lists</h4>
<h5>关于缩进</h5>
<p>To make lists look nice, you can wrap items with hanging indents:</p>
<pre>
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
</pre>
<p>But if you want to be lazy, you don’t have to:</p>
<pre>
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.
</pre>
<h5>列表项间的空行</h5>
<p>If list items are separated by blank lines, Markdown will wrap the items in &lt;p> tags in the HTML output. For example, this input:</p>
<pre>
*   Bird

*   Magic
</pre>
<pre>
&lt;ul>
&lt;li>&lt;p>Bird&lt;/p>&lt;/li>
&lt;li>&lt;p>Magic&lt;/p>&lt;/li>
&lt;/ul>
</pre>
<h5>单个列表项内存在多个段落的情况</h5>
<p>List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:</p>
<pre>
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
</pre>

<h4>代码块 Code Blocks</h4>
<h4>水平分隔符 Horizontal Rules</h4>
</div>

<h2>附录</h2>
<div>
<h5>参考资源</h5>
<p>简单介绍: <a href="http://blog.chinaunix.net/uid-7374279-id-5114730.html">http://blog.chinaunix.net/uid-7374279-id-5114730.html</a></p>
<p>详细中文文档: <a href="http://wowubuntu.com/markdown/index.html">http://wowubuntu.com/markdown/index.html</a></p>
<p>详细英文文档: <a href="http://daringfireball.net/projects/markdown/syntax">http://daringfireball.net/projects/markdown/syntax</a></p>
<p>官网 Cheatsheet: <a href="http://daringfireball.net/projects/markdown/dingus">http://daringfireball.net/projects/markdown/dingus</a></p>
<p>Markdown-Here-Cheatsheet: <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet</a></p>
<p>GitHub Flavored Markdown: <a href="https://guides.github.com/features/mastering-markdown/">https://guides.github.com/features/mastering-markdown/</a></p>

<h5>编译器</h5>
<p><a href="https://github.com/chjj/marked">marked</a> A markdown parser and compiler. Built for speed.</p>
<p><a href="https://stackedit.io/editor">stackedit.io</a> 在线编辑器，看着挺好的哦</p>
<p><a href="http://dillinger.io/">dillinger.io</a> 一个在线编辑器，方便代码测试</p>

<h5>来龙去脉和语法特点</h5>
<p>Markdown 是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）。它允许人们 “使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML(或者HTML)文档”。一份使用 Markdown 格式撰写的文件应该可以直接以纯文本发布，并且看起来不会像是由许多标签或是格式指令所构成。</p>
<p>Markdown 语法受到一些既有 text-to-HTML 格式的影响，包括 Setext、atx、Textile、reStructuredText、Grutatext 和 EtText，而最大灵感来源其实是纯文本电子邮件的格式。总之， Markdown 的语法全由一些符号所组成，这些符号经过精挑细选，其作用一目了然。比如：在文字两旁加上星号，看起来就像 *强调*。Markdown 的列表看起来，嗯，就是列表。Markdown 的区块引用看起来就真的像是引用一段文字，就像你曾在电子邮件中见过的那样。</p>
<p>Markdown 语法的目标是：成为一种适用于网络的书写语言。Markdown 的构想不是要使得 HTML 文档更容易书写，也不是想要取代 HTML，甚至也没有要和它相近，它的语法种类很少，只对应 HTML 标记的一小部分。HTML 是一种发布的格式，Markdown 是一种书写的格式。Markdown 的格式语法只涵盖纯文本可以涵盖的范围。</p>
<p>正是因为Markdown的这些特点，而且功能比纯文本更强，因此有很多人用它写博客。世界上最流行的博客平台WordPress和大型CMS如joomla、drupal都能很好的支持Markdown。</p>
</div>