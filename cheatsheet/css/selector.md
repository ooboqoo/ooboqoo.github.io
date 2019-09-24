# CSS Selectors

<style>
  td:first-child { color: red; }
  i{ color: gray; }
</style>

http://www.w3schools.com/cssref/css_selectors.asp   
In CSS, selectors are patterns used to select the element(s) you want to style.

CSS 标准参考：<https://www.w3.org/TR/css-2015/>   
注意：在 [W3C 标准](https://www.w3.org/TR/css-2015/#selectors)
中，只有组合选择符符号两边有空格，其他地方都是不带空格的。CSS 中除了 `> + ~` 和 `,`
的意义不受空格影响，其他地方有空格和没空格意义是完全不一样的（空格会被认为是“后代”选择符）。

各选择符优先级：id > class > attr > tag;   
层叠优先级: 内联样式 > 内部样式表 > 外部样式表 > 浏览器缺省   
常用的 CSS 选择器：标签选择器；ID选择器；类选择器；群组选择器；后代选择器；通配符  

### 简单选择符

Selector | Example | Example description | CSS
-------- | --------| ------------------- | ---
 .<i>class</i>       | .important | 类选择器   | 1
 #<i>id</i>          | #news      | id 选择器  | 1
 <i>element</i>      | p          | 元素选择器 | 1
 *                   | *          | 通配符，选择所有元素，特殊的用法：非子选择符 section * p | 2
 <i>elem1, elem2</i> | div, p     | 群组选择器，逗号表示 “或” | 1

需要特别注意的是 `.c1.c2` 与 `.c1 .c2` 是完全不同的，前者必须是同时拥有两个类的同一个元素，而后者要求两个类分布在不同层级的元素内。

### 组合选择符

Selector | Example | Example description | CSS
-------- | --------| ------------------- | ---
 <i>elem1</i> <i>elem2</i>    | div p    | 后代选择器 - 空格 | 1
 <i>elem1</i>&gt;<i>elem2</i> | div&gt;p | 子代选择器 - `>`  | 2
 <i>elem1</i>+<i>elem2</i>    | div+p    | 紧邻选择器 - `+`，表示紧跟着的那一个兄弟元素 | 2
 <i>elem1</i>~<i>elem2</i>    | p~ul     | 兄弟选择器 - `~`，跟在后面的所有兄弟元素     | 3

后代选择符 descendant selector (space)  
子选择符 child selector (>)  
紧邻同胞选择符 adjacent sibling selector (+) 例 div + p 紧跟在 div 后面的那"一个" p，中间不可插入其他类型节点  
一般同胞选择符 general sibling selector (~) 例 p ~ ul 只要在同一个父节点下位于 p "后面"的 ul 都算，中间可以插入其他节点

### 属性选择符

Selector | Example | Example description | CSS
-------- | --------| ------------------- | ---
 [<i>attribute</i>]               | [target]         | 选择所有带 target 属性的元素 | 2
 [<i>attribute</i>=<i>value</i>]  | [target=_blank]  | 选择所有带 `target="_blank"` 的元素 | 2
 [<i>attribute</i>^=<i>value</i>] | a[href^="https"] | 要点：打头，符合："https123" 不符：" https" | 3
 [<i>attribute</i>$=<i>value</i>] | a[href$=".pdf"]  | 要点：结尾 | 3
 [<i>attribute</i>&#124;=<i>value</i>] | [lang&#124;=en]  | 要点：相等，可接 `-`，符合："en" "en-us" 不符："en cn" "gb-en" | 2
 [<i>attribute</i>~=<i>value</i>] | [title~=flower]  | 要点：包含独立单词，符合："klis flower" 不符："flowers" | 2
 [<i>attribute</i>*=<i>value</i>] | a[href*="flower"] | 要点：片段，符合 "flowers" "noflower" | 3

### 伪类选择符 - Anchor

Selector | Example | Example description | CSS
-------- | --------| ------------------- | ---
 :link    | a:link    | 选择所有未访问过的链接 | 1
 :visited | a:visited | 选择所有已访问过的链接 | 1
 :hover   | a:hover   | 选择鼠标在上方滑动的链接 | 1
 :active  | a:active  | 选择当前正被激活的链接 | 1

由于这 4 个伪类的特指度相同，如果不按照这里列出的顺序使用它们，浏览器最终显示与预期效果会有差异。   
:hover 还可以用于其他元素。   
CSS 设计指南将以上4个选择符以及 :focus :target 等划归 UI 伪类选择符，而与此相对的是结构化伪类。

### 伪类选择符 - MISC

Selector | Example | Example description | CSS
-------- | --------| ------------------- | ---
 :not(<i>selector</i>)  | :not(p)      | 排除 `<p>` 元素 | 3
 :empty                 | p:empty      | 选择所有空白的 `<p>` 元素 | 3
 :target                | #news:target | 选择当前被激活的 `#news` 元素，具体见下方示例 | 3
 :lang(<i>language</i>) | p:lang(it)   | 选择具有 `lang="it"` 属性的段落 | 2
 :root                  | :root        | 选择根元素，即 `<html>` | 3

```html
<style> #more_info:target { background:#eee; } </style>
<a href="#more_info">More Information</a>
<h2 id="more_info">This is the information you are looking for.</h2>
会在用户单击链接转向 ID 为 more_info 的元素时，为该元素添加浅灰色背景。
```

### 伪类选择符 - Position among siblings

Selector | Example | Example description | CSS
-------- | --------| ------------------- | ---
 :nth-child(<i>n</i>)        | p:nth-child(2)        | 父节点下的所有节点纳入计数范围，从1开始计数 | 3
 :nth-last-child(<i>n</i>)   | p:nth-last-child(2)   | n 可以是数字、关键字、公式 | 3
 :first-child                | p:first-child         |  | 2
 :last-child                 | p:last-child          |  | 3
 :only-child                 | p:only-child          |  | 3
 :nth-of-type(<i>n</i>)      | p:nth-of-type(2)      |  | 3
 :nth-last-of-type(<i>n</i>) | p:nth-last-of-type(2) |  | 3
 :first-of-type              | p:first-of-type       |  | 3
 :last-of-type               | p:last-of-type        |  | 3
 :only-of-type               | p:only-of-type        |  | 3

### 伪类选择符 - Forms

   Selector    |       Example      | Example description | CSS
-------------- | -------------------| ------------------- | ---
 :focus        | input:focus        |                     | 2
 :checked      | input:checked      |                     | 3
 :indeterminate | input:indeterminate |                   | 3
 :enabled      | input:enabled      |                     | 3
 :disabled     | input:disabled     |                     | 3
 :valid        | input:valid        |                     | 3
 :invalid      | input:invalid      |                     | 3
 :required     | input:required     |                     | 3
 :optional     | input:optional     |                     | 3
 :read-only    | input:read-only    |                     | 3
 :read-write   | input:read-write   |                     | 3
 :in-range     | input:in-range     |                     | 3
 :out-of-range | input:out-of-range |                     | 3

```html
<style> input:out-of-range { border: 2px solid red; } </style>
<input type="number" min="5" max="10" value="17">
```

### 伪元素选择符

   Selector     |     Example     |   Example description   | CSS
--------------- | ----------------| ----------------------- | ---
 ::after        | p::after        | 在 p 元素尾部插入内容   | 2
 ::before       | p::before       | 在 p 元素最前面插入内容 | 2
 ::first-letter | p::first-letter | 选择段落的首字母        | 1
 ::first-line   | p::first-line   | 选择段落的首行          | 1
 ::selection    | ::selection     | 当前选中范围            | 4

||
--------------------------|-----------------------------
::-webkit-scrollbar       | targets the whole scrollbar element.
::-webkit-scrollbar-track | targets only the scrollbar track.
::-webkit-scrollbar-thumb | targets the scrollbar thumb.
