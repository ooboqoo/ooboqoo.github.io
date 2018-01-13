# HTML5 New Elements

http://www.w3schools.com/tags/

Below is a list of the new HTML5 elements, and a description of what they are used for.

## New Semantic/Structural Elements

HTML5 offers new elements for better document structure:

|||
|----------------|---------------------------------------------------------------------------------------
| `<article>`    | Defines an article in the document
| `<aside>`      | Defines content aside from the page content
| `<bdi>`        | Defines a part of text that might be formatted in a different direction from other text
| `<details>`    | Defines additional details that the user can view or hide
| `<dialog>`     | Defines a dialog box or window
| `<figcaption>` | Defines a caption for a `<figure>` element
| `<figure>`     | Defines self-contained content, like illustrations, diagrams, photos, code listings, etc.
| `<footer>`     | Defines a footer for the document or a section
| `<header>`     | Defines a header for the document or a section
| `<main>`       | Defines the main content of a document
| `<mark>`       | Defines marked or highlighted text
| `<menuitem>`   | Defines a command/menu item that the user can invoke from a popup menu
| `<meter>`      | Defines a scalar measurement within a known range (a gauge)
| `<nav>`        | Defines navigation links in the document
| `<progress>`   | Defines the progress of a task
| `<rp>`         | Defines what to show in browsers that do not support ruby annotations
| `<rt>`         | Defines an explanation/pronunciation of characters (for East Asian typography)
| `<ruby>`       | Defines a ruby annotation (for East Asian typography)
| `<section>`    | Defines a section in the document
| `<summary>`    | Defines a visible heading for a `<details>` element
| `<time>`       | Defines a date/time
| `<wbr>`        | Defines a possible line-break


## 新属性

|||
|-------------------|---------------------------------------------------
| `contenteditable` | 使得一个普通的元素可编辑。IE6 就有


## New Form Elements

|||
|--------------|---------------------------------------------------
| `<datalist>` | Defines pre-defined options for input controls
| `<keygen>`   | Defines a key-pair generator field (for forms)
| `<output>`   | Defines the result of a calculation


## New Input Types

New Input Types

|||
|-------------|---------------------------------------------------
| `color`     | 输入颜色
| `date`      | 输入日期
| `datetime`  |
| `datetime-local` | 
| `month`     | 
| `week`      | 
| `time`      | 
| `email`     | 输入电邮地址
| `number`    | 输入数值，整型或浮点
| `range`     | 滑块输入
| `search`    | 呈现一个搜索框
| `tel`       | 输入电话号码，可采用 pattern 和 maxlength 来限定输入的格式
| `url`       | 输入 URL 地址

New Input Attributes

|||
|----------------|---------------------------------------------------
| `form`         | 将元素与特定的表单进行关联
| `formaction`   | 
| `formenctype`  | 
| `formmethod`   | 
| `formnovalidate` | 
| `formtarget`     | 
| `autocomplete` | 
| `autofocus`    | 页面加载时自动聚焦到当前元素
| `placeholder`  | 输入占位符，提示用户输入
| `pattern`      | 采用正则表达式验证表单输入，在提交前验证，如手机号验证 `pattern="1[3-8][0-9]{9}"`
| `required`     | 表单验证，必填项
| `min` and `max`      | 
| `height` and `width` | 
| `multiple`     | 
| `step`         | 
| `list`         | 


## HTML5 - New Attribute Syntax

HTML5 allows four different syntaxes for attributes.

```html
* Empty         <input type="text" disabled>
* Unquoted      <input type="text" value=John>
* Double-quoted <input type="text" value="John Doe">
* Single-quoted <input type="text" value='John Doe'>
```

In HTML5, all four syntaxes may be used, depending on what is needed for the attribute.


## HTML5 Graphics

|||
|------------|-----------------------------------------------------------------
| `<canvas>` | Defines graphic drawing using JavaScript
| `<svg>`    | Defines graphic drawing using SVG


## New Media Elements

|||
|------------|-----------------------------------------------------------------
| `<audio>`  | Defines sound or music content
| `<embed>`  | Defines containers for external applications (like plug-ins)
| `<source>` | Defines sources for `<video>` and `<audio>`
| `<track>`  | Defines tracks for `<video>` and `<audio>`
| `<video>`  | Defines video or movie content
