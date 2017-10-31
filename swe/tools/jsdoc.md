# JSDoc 3

http://usejsdoc.org/

## 常用标签

### 最常用标签速查

```tag
@param {string} [somebody=John Doe] - Somebody's name.
 参数  参数类型   可选参数=默认值        参数描述
```

### jsdox

jsdox 是 jsdoc 的一个子集，以下就是 jsdox 支持的标签清单，估计够用了。

```tag
  @class Person                       // 声明类
  @member {number} age age of people  // 声明一个类的属性，格式 @member [type] name [description]
  @method {String|Object} create      // 声明一个类的方法，多类型声明格式 {类型1|类型2|类型3}
  @function testAnonynous             // 当解析器无法自动取得函数名/方法名时，可以显示指定
  @param {Boolean} [optionalparam]    // 声明函数/方法的参数，可选参数用 [] 包裹
  @returns {String} the result        // 声明返回类型, 也支持同义的 @return
  @module test_module                 // 声明模块，后续的函数、类、方法都会归组到该模块下面
  
  @author Joe Schmo                   // 指明作者名字、联系信息 等等...
  @copyright (c) 2012 Blah Blah Blah  // 注明版权信息
  @license MIT                        // 指定许可类型
  @overview This is the overview      // 概述
  @title text                         // 指定生成的文档的标题
```

另外增加几个感觉有用的标签

```tag
  @global     // Document a global object.
  @private    // This symbol is meant to be private.
  @public     // This symbol is meant to be public.
  @static     // Document a static member.
  @protected  // This symbol is meant to be protected.
  @readonly   // This symbol is meant to be read-only.
  @property  @prop    // Document a property of an object.
  @member    @var     // Document a member.
  
  @todo       // Document tasks to be completed.
  @this       // What does the 'this' keyword refer to here?
  @version    // Documents the version number of an item.
  @since      // When was this feature added?
  
  @requires   // This file requires a JavaScript module.
  @namespace  // Document a namespace object.
  @override   // Indicate that a symbol overrides its parent.
  @throws  @exception  // Describe what errors could be thrown.
```

<script>
  [].forEach.call(document.getElementsByClassName("lang-tag"), function(pre){
    pre.innerHTML = pre.innerHTML.replace(/(@[a-z]*)/g, '<span style="color:red">$1</span>');
  });
</script>

## 快速入门

JSDoc 注释要求放在被注释代码前面，紧挨着代码。
注释严格要求以 `/**` 开头，`/*` 或者 `/***` 都不行，这样的目的是方便你在必要时跳过文档生成工具。

### 添加注释

最简单的文档就是仅添加了描述的文档。
```js
/** This is a description of the foo function. */
function foo() {
}
```

特定的 “文档标识” 可以提供供多的信息，如 `@constructor` 标识说明这是一个构造函数。
```js
/**
 * Represents a book.
 * @constructor         // @constructor 等同 @class 都是表示类的标签
 */
function Book(title, author) {
}
```

还可以添加更多的标识以提供更详尽的文档信息。
```js
/**
 * Represents a book.
 * @class
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```

#### 生成文档

按照规范添加注释后，就可以使用 JSDoc 3 文档生成工具自动生成 HTML 网站。生成文档默认使用的是 "default" 模板，你可以根据喜好修改该模板或者自己创建一个全新的模板。

```bash
./jsdoc book.js
```
该命令将自动在当前目录下创建  "out" 目录，你可以在那里找到生成的 HTML 文件。

利用 [jsdox](http://jsdox.org/) 来生成 markdown 文档也是一个不错的选择。

## ES 2015 Classes

JSDoc 3.4.0 开始增强了对 ES6 类的注释，无需使用 `@class` 或 `@constructor`，JSDoc 可以自动识别。

```js
/** Class representing a point. */
class Point {
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        // ...
    }

    /**
     * Get the x value.
     * @return {number} The x value.
     */
    getX() {
        // ...
    }

    /**
     * Get the y value.
     * @return {number} The y value.
     */
    getY() {
        // ...
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {string} str - The string containing two comma-separated numbers.
     * @return {Point} A Point object.
     */
    static fromString(str) {
        // ...
    }
}
```

还可以对类表达式进行注释。

```js
/** Class representing a point. */
const Point = class {
    // and so on
}
```

当继承类时，需要使用 `@augments` 或 `@extends` 明确注明所继承的类名。

```js
/**
 * Class representing a dot.
 * @extends Point
 */
class Dot extends Point {
    /**
     * Create a dot.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width of the dot, in pixels.
     */
    constructor(x, y, width) {
        // ...
    }

    /**
     * Get the dot's width.
     * @return {number} The dot's width, in pixels.
     */
    getWidth() {
        // ...
    }
}
```

## ES 2015 Modules

JSDoc 3.4.0 开始支持对 ES6 模块进行注释。

### Module identifiers

```js
/**
 * Pants module.         // 模块描述
 * @module my/pants      // 使用 @module 标签标示模块名，如果没有显示什么模块名，JSDoc 会根据路径推测模块名
 * @see module:my/shirt  // 通过 module: 创建指向其他模块的连接
 */
```

```js
/**
 * @see module:my/pants.Jeans#hem  // 指向 my/pants 模块的 Jeans 类的 hem 实例方法
 */
```

### Exported values

```js
/** @module color/mixer */

/** The name of the module. */
export const name = 'mixer';

/** The most recent blended color. */
export var lastColor = null;

/**
 * Blend two colors together.
 * @param {string} color1 - The first color, in hexidecimal format.
 * @param {string} color2 - The second color, in hexidecimal format.
 * @return {string} The blended color.
 */
export function blend(color1, color2) {}

// convert color to array of RGB values (0-255)
function rgbify(color) {}

export {
    /**
     * Get the red, green, and blue values of a color.
     * @function
     * @param {string} color - A color, in hexidecimal format.
     * @returns {Array} An array of the red, green, and blue values, each ranging from 0 to 255.
     */
    rgbify as toRgb
}
```

## 完整标签列表

### Block Tags
<dl>
  <dt><a href="http://usejsdoc.org/tags-abstract.html">@abstract</a> (synonyms: @virtual)</dt>
  <dd>This member must be implemented (or overridden) by the inheritor.</dd>
  <dt><a href="http://usejsdoc.org/tags-access.html">@access</a></dt>
  <dd>Specify the access level of this member (private, public, or protected).</dd>
  <dt><a href="http://usejsdoc.org/tags-alias.html">@alias</a></dt>
  <dd>Treat a member as if it had a different name.</dd>
  <dt><a href="http://usejsdoc.org/tags-augments.html">@augments</a> (synonyms: @extends)</dt>
  <dd>Indicate that a symbol inherits from, ands adds to, a parent symbol.</dd>
  <dt><a href="http://usejsdoc.org/tags-author.html">@author</a></dt>
  <dd>Identify the author of an item.</dd>
  <dt><a href="http://usejsdoc.org/tags-borrows.html">@borrows</a></dt>
  <dd>This object uses something from another object.</dd>
  <dt><a href="http://usejsdoc.org/tags-callback.html">@callback</a></dt>
  <dd>Document a callback function.</dd>
  <dt><a href="http://usejsdoc.org/tags-class.html">@class</a> (synonyms: @constructor)</dt>
  <dd>This function is intended to be called with the &quot;new&quot; keyword.</dd>
  <dt><a href="http://usejsdoc.org/tags-classdesc.html">@classdesc</a></dt>
  <dd>Use the following text to describe the entire class.</dd>
  <dt><a href="http://usejsdoc.org/tags-constant.html">@constant</a> (synonyms: @const)</dt>
  <dd>Document an object as a constant.</dd>
  <dt><a href="http://usejsdoc.org/tags-constructs.html">@constructs</a></dt>
  <dd>This function member will be the constructor for the previous class.</dd>
  <dt><a href="http://usejsdoc.org/tags-copyright.html">@copyright</a></dt>
  <dd>Document some copyright information.</dd>
  <dt><a href="http://usejsdoc.org/tags-default.html">@default</a> (synonyms: @defaultvalue)</dt>
  <dd>Document the default value.</dd>
  <dt><a href="http://usejsdoc.org/tags-deprecated.html">@deprecated</a></dt>
  <dd>Document that this is no longer the preferred way.</dd>
  <dt><a href="http://usejsdoc.org/tags-description.html">@description</a> (synonyms: @desc)</dt>
  <dd>Describe a symbol.</dd>
  <dt><a href="http://usejsdoc.org/tags-enum.html">@enum</a></dt>
  <dd>Document a collection of related properties.</dd>
  <dt><a href="http://usejsdoc.org/tags-event.html">@event</a></dt>
  <dd>Document an event.</dd>
  <dt><a href="http://usejsdoc.org/tags-example.html">@example</a></dt>
  <dd>Provide an example of how to use a documented item.</dd>
  <dt><a href="http://usejsdoc.org/tags-exports.html">@exports</a></dt>
  <dd>Identify the member that is exported by a JavaScript module.</dd>
  <dt><a href="http://usejsdoc.org/tags-external.html">@external</a> (synonyms: @host)</dt>
  <dd>Identifies an external class, namespace, or module.</dd>
  <dt><a href="http://usejsdoc.org/tags-file.html">@file</a> (synonyms: @fileoverview, @overview)</dt>
  <dd>Describe a file.</dd>
  <dt><a href="http://usejsdoc.org/tags-fires.html">@fires</a> (synonyms: @emits)</dt>
  <dd>Describe the events this method may fire.</dd>
  <dt><a href="http://usejsdoc.org/tags-function.html">@function</a> (synonyms: @func, @method)</dt>
  <dd>Describe a function or method.</dd>
  <dt><a href="http://usejsdoc.org/tags-global.html">@global</a></dt>
  <dd>Document a global object.</dd>
  <dt><a href="http://usejsdoc.org/tags-ignore.html">@ignore</a></dt>
  <dd>Omit a symbol from the documentation.</dd>
  <dt><a href="http://usejsdoc.org/tags-implements.html">@implements</a></dt>
  <dd>This symbol implements an interface.</dd>
  <dt><a href="http://usejsdoc.org/tags-inheritdoc.html">@inheritdoc</a></dt>
  <dd>Indicate that a symbol should inherit its parent&#39;s documentation.</dd>
  <dt><a href="http://usejsdoc.org/tags-inner.html">@inner</a></dt>
  <dd>Document an inner object.</dd>
  <dt><a href="http://usejsdoc.org/tags-instance.html">@instance</a></dt>
  <dd>Document an instance member.</dd>
  <dt><a href="http://usejsdoc.org/tags-interface.html">@interface</a></dt>
  <dd>This symbol is an interface that others can implement.</dd>
  <dt><a href="http://usejsdoc.org/tags-kind.html">@kind</a></dt>
  <dd>What kind of symbol is this?</dd>
  <dt><a href="http://usejsdoc.org/tags-lends.html">@lends</a></dt>
  <dd>Document properties on an object literal as if they belonged to a symbol with a given name.</dd>
  <dt><a href="http://usejsdoc.org/tags-license.html">@license</a></dt>
  <dd>Identify the license that applies to this code.</dd>
  <dt><a href="http://usejsdoc.org/tags-listens.html">@listens</a></dt>
  <dd>List the events that a symbol listens for.</dd>
  <dt><a href="http://usejsdoc.org/tags-member.html">@member</a> (synonyms: @var)</dt>
  <dd>Document a member.</dd>
  <dt><a href="http://usejsdoc.org/tags-memberof.html">@memberof</a></dt>
  <dd>This symbol belongs to a parent symbol.</dd>
  <dt><a href="http://usejsdoc.org/tags-mixes.html">@mixes</a></dt>
  <dd>This object mixes in all the members from another object.</dd>
  <dt><a href="http://usejsdoc.org/tags-mixin.html">@mixin</a></dt>
  <dd>Document a mixin object.</dd>
  <dt><a href="http://usejsdoc.org/tags-module.html">@module</a></dt>
  <dd>Document a JavaScript module.</dd>
  <dt><a href="http://usejsdoc.org/tags-name.html">@name</a></dt>
  <dd>Document the name of an object.</dd>
  <dt><a href="http://usejsdoc.org/tags-namespace.html">@namespace</a></dt>
  <dd>Document a namespace object.</dd>
  <dt><a href="http://usejsdoc.org/tags-override.html">@override</a></dt>
  <dd>Indicate that a symbol overrides its parent.</dd>
  <dt><a href="http://usejsdoc.org/tags-param.html">@param</a> (synonyms: @arg, @argument)</dt>
  <dd>Document the parameter to a function.</dd>
  <dt><a href="http://usejsdoc.org/tags-private.html">@private</a></dt>
  <dd>This symbol is meant to be private.</dd>
  <dt><a href="http://usejsdoc.org/tags-property.html">@property</a> (synonyms: @prop)</dt>
  <dd>Document a property of an object.</dd>
  <dt><a href="http://usejsdoc.org/tags-protected.html">@protected</a></dt>
  <dd>This symbol is meant to be protected.</dd>
  <dt><a href="http://usejsdoc.org/tags-public.html">@public</a></dt>
  <dd>This symbol is meant to be public.</dd>
  <dt><a href="http://usejsdoc.org/tags-readonly.html">@readonly</a></dt>
  <dd>This symbol is meant to be read-only.</dd>
  <dt><a href="http://usejsdoc.org/tags-requires.html">@requires</a></dt>
  <dd>This file requires a JavaScript module.</dd>
  <dt><a href="http://usejsdoc.org/tags-returns.html">@returns</a> (synonyms: @return)</dt>
  <dd>Document the return value of a function.</dd>
  <dt><a href="http://usejsdoc.org/tags-see.html">@see</a></dt>
  <dd>Refer to some other documentation for more information.</dd>
  <dt><a href="http://usejsdoc.org/tags-since.html">@since</a></dt>
  <dd>When was this feature added?</dd>
  <dt><a href="http://usejsdoc.org/tags-static.html">@static</a></dt>
  <dd>Document a static member.</dd>
  <dt><a href="http://usejsdoc.org/tags-summary.html">@summary</a></dt>
  <dd>A shorter version of the full description.</dd>
  <dt><a href="http://usejsdoc.org/tags-this.html">@this</a></dt>
  <dd>What does the &#39;this&#39; keyword refer to here?</dd>
  <dt><a href="http://usejsdoc.org/tags-throws.html">@throws</a> (synonyms: @exception)</dt>
  <dd>Describe what errors could be thrown.</dd>
  <dt><a href="http://usejsdoc.org/tags-todo.html">@todo</a></dt>
  <dd>Document tasks to be completed.</dd>
  <dt><a href="http://usejsdoc.org/tags-tutorial.html">@tutorial</a></dt>
  <dd>Insert a link to an included tutorial file.</dd>
  <dt><a href="http://usejsdoc.org/tags-type.html">@type</a></dt>
  <dd>Document the type of an object.</dd>
  <dt><a href="http://usejsdoc.org/tags-typedef.html">@typedef</a></dt>
  <dd>Document a custom type.</dd>
  <dt><a href="http://usejsdoc.org/tags-variation.html">@variation</a></dt>
  <dd>Distinguish different objects with the same name.</dd>
  <dt><a href="http://usejsdoc.org/tags-version.html">@version</a></dt>
  <dd>Documents the version number of an item.</dd>
</dl>

### Inline Tags
<dl>
  <dt><a href="http://usejsdoc.org/tags-inline-link.html">{@link}</a> (synonyms: {@linkcode}, {@linkplain})</dt>
  <dd>Link to another item in the documentation.</dd>
  <dt><a href="http://usejsdoc.org/tags-inline-tutorial.html">{@tutorial}</a></dt>
  <dd>Link to a tutorial.</dd>
</dl>
