# WYSIWYG 富文本编辑器


## Quill 30k

> 文档太少，还可能是过时的，乖乖看源码 DEBUG 才是正途。

代码

* https://github.com/quilljs/awesome-quill

文章

* https://medium.com/@jhchen/the-state-of-quill-and-2-0-fb38db7a59b9

极简示例

```html
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

<div id="editor"><p>Hello World!</p><p>Some initial <strong>bold</strong> text</p></div>
<script>var quill = new Quill('#editor', { theme: 'snow' });</script>
```

### API





### Formats

> 支持的功能类型

Inline: `background` `bold` `color` `font` `code` `italic` `link` `size` `strike` `script` `underline`  
Block: `blockquote` `header` `indent` `list` `align` `direction` `code-block`  
Embeds: `formula` (requires KaTex) `image` `video`

### Delta

> delta 在数学或者物理学中，大写的 Δ 是用来表示变化量的符号。

Deltas represents both documents and changes to documents.

#### Document

delta 可以用来描述整个文档，就是从零开始如何通过一步步操作将一个文档实现出来。

#### Changes

`text-change` 事件的第一个参数就是一个 dela，描述了具体的变更信息。



### Modules




### Themes

官方带了两种样式：Snow 和 Bubble。通用的样式可以通过样式覆盖来修改，具体到某个 Module（如 Toolbar）则可能要到相应模块进行配置。




## Slate 20k

https://github.com/ianstormtaylor/slate

算是新项目，还在 Beta 阶段，看这趋势，大概率会拿下富文本编辑器第一的宝座。

















