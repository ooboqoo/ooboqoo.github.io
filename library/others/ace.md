# ACE 编辑器

可以简单把 ACE 看成是 `textarea` 的增强版。


## 模块结构体系

ACE src-noconflict 扩展采用的模块组织格式结构：
  * 模块定义用 `ace.define`
  * 模块加载用 `ace.require`
  * 主体代码用 CommonJS 格式
  * 以上跟实际 js 文件加载是分离的，ACE 需要借助外部模块加载器来加载文件，以下示例采用 RequireJS 2 来加载文件

插件定义：

```js
ace.define("ace/ext/beautify", ["require", "exports", "module"], function (require, exports, module) {
    "use strict";
    exports.out1 = something;
});
```

插件使用：

```js
require.config({
    shim: {
        ace: { exports: 'ace' },
        'ace/beautify': { deps: ['ace'] }
    },
    paths: {
        ace: 'vendor/ace/src-noconflict/ace',
        'ace/beautify': 'vendor/ace/src-noconflict/ext-beautify',
    }
});

define(['ace', 'ace/beautify'], function (ace) {
    var beautify = ace.require("ace/ext/streamsql_beautify");
});
```


## Features

* Syntax highlighting for over 110 languages (TextMate/Sublime/_.tmlanguage_ files can be imported)
* Over 20 themes (TextMate/Sublime/_.tmtheme_ files can be imported)
* Automatic indent and outdent
* An optional command line
* Handles huge documents (at last check, 4,000,000 lines is the upper limit)
* Fully customizable key bindings including vim and Emacs modes
* Search and replace with regular expressions
* Highlight matching parentheses
* Toggle between soft tabs and real tabs
* Displays hidden characters
* Drag and drop text using the mouse
* Line wrapping
* Code folding
* Multiple cursors and selections
* Live syntax checker (currently JavaScript/CoffeeScript/CSS/XQuery)
* Cut, copy, and paste functionality


## 文档

[Good documentation for ACE Code Editor](https://stackoverflow.com/questions/26869259/good-documentation-for-ace-code-editor)

I think there is no documentation other than the site and the wiki.

There are only a few useful extensions that are not loaded automatically emmet (aka Zen coding), language_tools (autocompletion for ace), whitespace (couple of utility functions for detecting indentation type and converting indentation from tabs to spaces and back), statusbar (a statusbar see kitchen-sink demo) and static_highlight which allows to highlight code snippets.

Snippets folder just contains snippets taken from snippmate

Workers are linters for their languages like jshint, csslint, coffeescript complier, which run in a web worker and show annotations on the gutter.


## StatusBar

自定义状态栏行列号
https://groups.google.com/forum/#!topic/ace-discuss/l1-JC9bcRyE

## 其他项

ace 是默认开启 tab 转空格的

##### marker 与 annotation 的区别

marker 占了整个一层，覆盖在代码上面，而 annotation 只是位于 gutter 上的标记
https://ace.c9.io/api/edit_session.html

##### 自定义错误显示

核心代码在这里 https://github.com/ajaxorg/ace/issues/2130

很不错的示例 https://codepen.io/oatssss/pen/oYxJQV
又一个示例 http://fiddle.jshell.net/tzmartin/hwzjjah2/

自定义红色下划线效果 http://www.phpied.com/curly-underline/

##### 待整理

根据不同关键字类型来区别高亮显示
http://blog.rymo.io/2014/07/integrating-the-ace-editor-into-your-project/ 文章里提到 keywordMapper 是用于定义自动填充的

https://ace.c9.io/tool/mode_creator.html 在线调试

自己改显示样式，完全不按默认的来

https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode