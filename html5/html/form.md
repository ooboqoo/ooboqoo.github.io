# HTML Forms

## HTML Forms

### The `<form>` Element

HTML forms are used to collect user input.  
The `<form>` element defines an HTML form.  
HTML forms contain form elements.  
Form elements are different types of input elements, checkboxes, radio buttons, submit buttons, and more.

### The `<input>` Element

The `<input>` element is the most important form element.

The `<input>` element has many variations, depending on the `type` attribute.

#### Text Input

defines a one-line input field for text input:

```html
<form>
  First name:<br> <input type="text" name="firstname"><br>
  Last name:<br>  <input type="text" name="lastname">
</form>
```

Note: The form itself is not visible. Also note that the default width of a text field is 20 characters.

#### Radio Button Input

Radio buttons let a user select ONE of a limited number of choices:

```html
<form>
  <input type="radio" name="gender" value="male" checked> Male<br>
  <input type="radio" name="gender" value="female"> Female<br>
  <input type="radio" name="gender" value="other"> Other
</form>
```

#### The Submit Button

`<input type="submit">` defines a button for submitting a form to a form-handler.  
The form-handler is typically a server page with a script for processing input data.  
The form-handler is specified in the form's `action` attribute:

```html
<form action="action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey"><br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse"><br>
  <input type="submit" value="Submit">
</form>
```

### The Method Attribute

The method attribute specifies the HTTP method (`GET` or `POST`) to be used when submitting the forms:

```html
<form action="action_page.php" method="get">
<form action="action_page.php" method="post">
```

#### When to Use GET?

You can use GET (the default method): If the form submission is passive, and without sensitive information.

When you use GET, the form data will be visible in the page address:

```text
action_page.php?firstname=Mickey&lastname=Mouse
```

GET is best suited to short amounts of data. Size limitations are set in your browser.

#### When to Use POST?

You should use POST: If the form is updating data, or includes sensitive information (password).

POST offers better security because the submitted data is not visible in the page address.

### The `name` Attribute

To be submitted correctly, each input field must have a name attribute. **缺少 `name` 属性的项目不会提交**

This example will only submit the "Last name" input field:

```html
<form action="action_page.php">
  First name:<br>
  <input type="text" value="Mickey"><br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse"><br><br>
  <input type="submit" value="Submit">
</form>
```

### Grouping with `<fieldset>`

The `<fieldset>` element groups related data in a form.

The `<legend>` element defines a caption for the `<fieldset>` element.

```html
<form action="action_page.php">
  <fieldset>
    <legend>Personal information:</legend>
    First name:<br>
    <input type="text" name="firstname" value="Mickey"><br>
    Last name:<br>
    <input type="text" name="lastname" value="Mouse"><br>
    <input type="submit" value="Submit">
  </fieldset>
</form>
```

### HTML Form Attributes

An HTML `<form>` element, with all possible attributes set, will look like this:

```html
<form action="action_page.php" method="post" target="_blank" accept-charset="utf-8"
      enctype="application/x-www-form-urlencoded" autocomplete="off" novalidate>
```

Here is the list of `<form>` attributes:

|||
|----------------|-----------------------------------------------------------------
| accept-charset | Specifies the charset used in the submitted form (default: the page charset).
| action         | Specifies an address (url) where to submit the form (default: the submitting page).
| autocomplete   | Specifies if the browser should autocomplete the form (default: on).
| enctype        | Specifies the encoding of the submitted data (default: is url-encoded).
| method         | Specifies the HTTP method used when submitting the form (default: GET).
| name           | Specifies a name used to identify the form (for DOM usage: document.forms.name).
| novalidate     | Specifies that the browser should not validate the form.
| target         | Specifies the target of the address in the action attribute (default: _self).


## HTML Form Elements


### The `<input>` Element

The most important form element is the `<input>` element.  
The `<input>` element can vary in many ways, depending on the `type` attribute.

### The `<select>` Element (Drop-Down List)

```html
<select name="cars">
  <option value="volvo">Volvo</option>
  <option value="saab" selected>Saab</option>
  <option value="fiat">Fiat</option>
  <option value="audi">Audi</option>
</select>
```

The `<option>` elements defines the options to select.  
The list will normally show the first item as selected.  
You can add a `selected` attribute to define a predefined option.

### The `<textarea>` Element

The `<textarea>` element defines a multi-line input field (a text area):

```html
<textarea name="message" rows="2" cols="50">
    The cat was playing in the garden.
</textarea>
```

### The `<button>` Element

The `<button>` element defines a clickable button:

```html
<button type="button" onclick="alert('Hello World!')">Click Me!</button>
```

### HTML5 Form Elements

HTML5 added the following form elements: `<datalist>` `<keygen>` `<output>`.  
By default, browsers do not display unknown elements. New elements will not destroy your page.


## CH04 构建更好的 Web 表单

### 4.1 理解表单
### 4.2 传统表单翻新

通过占位符文本添加提示 `placeholder`  
焦点：挑选正确的起点 `autofocus`

### 4.3 验证：阻止错误

在两个地方验证：客户端验证是为访客提供方便的，而服务器端验证才是确保数据正确性的。

只有用户单击"提交"按钮，浏览器才会执行验证，这样可保证验证的效率。如果需要在用户输入错误并离开相应字段时马上给出提示，需要自己编写 JS 代码或选择一个 JS 库。

#### 4.3.2 关闭验证 `novalidate` / `formnovalidate`

```html
<form novalidate>  <!-- 禁止对表单实施校验 -->
  <!-- 设置 submit 的 formnovalidate 属性，不管 form 如何设置，点击该按钮都不会校验表单 -->
  <input type="submit" formnovalidate>
</form>
```

#### 4.3.3 验证样式挂钩

虽然我们无法修改验证消息的样式，但却可以根据输入字段是否已验证来改变它们的外观，只要使用几个新的伪类即可。

```css
input:required:invalid { background-color: lightyellow; }
```

#### 4.3.4 使用正则表达式

注：浏览器不会验证空值，如果这不是你希望的结果，那么就要同时指定 `pattern` 和 `required` 属性。

#### 4.3.5 自定义验证

最常用的是 `setCustomValidity()` 方法，基于这个方法可以针对特定字段编写自定义的验证逻辑，并利用 HTML5 的验证机制。

### 4.4 浏览器对 Web 表单和验证的支持

由于 HTML5 验证不能取代服务器端验证，因此可以仅将其看做一种增强；在这种情况下，浏览器支持的一致不一致也就无所谓了。

如果你网站包含一些复杂的表单，你可以自己编写验证功能或借助 JS 库。

#### 4.4.1 用 Modernizr 检测支持情况

```js
if (!Modernizr.input.pattern) {
  // 浏览器不支持正则表达式验证，可以在此添加正则表达式验证
}
```

可以将代码添加到表单的 `onSubmit` 事件处理函数上，根据情况返回 true 或 false（取消提交），另外还需考虑如何提供反馈。

#### 4.4.2 用 HTML5Forms 兼容

详细内容请访问：https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills

### 4.7 网页中的 HTML 编辑器

`contenteditable="true" ` 添加到任何元素以使该元素可以编辑。

`designMode` 可以让用户编辑整个页面，一般都是结合 `<iframe>` 使用。

这两个属性是 IE5 率先引入的，今天所有桌面浏览器都支持这两个从未写进任何标准的属性。

## 附加事项

DOM 中 id/name 膨胀 -- 《忍者秘籍》P254

浏览器会将表单 `<input>` 元素的 `id` 和 `name` 特性作为 `<form>` 元素的属性值进行引用。产生的这些属性，会主动覆盖 form 元素上已经存在的同名属性。

```html
<form id="testForm" action="/">
  <input type="text" id="id">
  <input type="text" name="action">
</form>
<script>
  document.getElementById("testForm").id  // 指向第一个 input 元素
  document.getElementById("testForm").action  // 指向第二个 input 元素
</script>
```


## 专题

### `<input type="file">`

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file

```html
<!-- enctype 默认为 application/x-www-form-urlencoded, 传文件时需要配置为 multipart/form-data -->
<form method="post" enctype="multipart/form-data">
    <input name="myFile" type="file" multiple accept="image/*, .doc" required>
</form>
```

#### `value`

`value` 属性，单个文件时是包含文件名的虚假路径，多个文件时是第一个文件的虚假路径。虚假路径的格式为 `C:\fakepath\` + 实际文件完整名称。

支持 FIle API 的现代浏览器(IE10+)可以通过元素的 `files` 属性取得 FileList `[{name, size, type, lastModified}, ...]`，这是一个类数组对象，`length` 属性。

js 代码只能将 `value` 设为空字符串以清除选择文件，而无法设为其他值以实现选择，选择只能手动执行。

#### `accept`

通过 `accept` 属性可限制文件类型，值是以 `,` 分隔的 文件扩展名 或 MIME类型。

#### 样式美化及功能增强

文件输入框的样式一般比较丑，在不同浏览器中的样子也不一致，也很难直接调整输入框样式，所以通常的做法是，隐藏文件输入框，通过点击对应的 `<label>` 来触发文件选择弹窗。

在隐藏文件输入框时，使用了 `opacity: 0;` 而不是 `visibility: hidden;` 或 `display: none;` 的原因是，后两者会被辅助技术认为是不可交互的。

```html
<style>input[type=file] { opacity: 0; }</style>
<div>
  <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
  <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple>
</div>
<div class="preview">
  <p>No files currently selected for upload</p>
</div>
<script>
  var input = document.querySelector('input[type=file]');
  var preview = document.querySelector('.preview');
  input.addEventListener('change', updateImageDisplay);
  function updateImageDisplay() {
      // 清空原因内容
      // 取得 FileList 对象
      // 检查 length 属性，如果为 0，提示未选择文件
      // 检查文件类型是否有效
      // 输出 file.name file.size
  }
</script>
```

#### ajax 环境下的文件上传问题

原始的表单提交，会导致页面刷新，所以在单页应用中并不适用。在支持 `File` 和 `FormData` 的现代浏览器，可用 AJAX 轻松搞定，对于 IE9 及以下浏览器，只支持基本 XMLHttpRequest 功能，没有 File 和 FormData，则只能使用 `iframe` 来模拟实现。iframe 模拟实现可解决文件上传以及返回 json 内容的解析，但碰到需要自定义请求头(用于鉴权等)时，就没有办法处理。

```html
<input type="file" id="my-file-input" name="image" accept=".jpg">
```

```js
/**
 * 使用 jQuery 实现的 单文件 + 其他数据 上传
 * @param {Object} options - $.ajax 配置项
 * @param {jQuery} $fileInput - 文件选择框对应的 jQuery 对象
 */
function uploadFile(options, $fileInput) {
    // 上传数据组装
    var formData = new window.FormData();
    formData.append($fileInput.prop('name'), $fileInput.prop('files')[0]);
    for (var key in options.param) {
        formData.append(key, options.param[key]);
    }

    $.ajax({
        data: formData,
        processData: false,  // jq 指令，禁止转文本
        contentType: false,  // jq 指令，禁止 jQuery 处理，交由浏览器处理
        method: 'POST',
        headers: options.headers,
        success: options.headers,
        error: options.error
    });
}

/**
 * 将文件大小显示标准化：根据文件大小做不同单位的显示，文件大小保留两位小数
 * @param {Number} size - 文件大小
 */
function formatBytes(bytes, unit) {
    var units = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (!unit) { unit = 'B'; }
    return bytes < 1024 ?
        bytes.toFixed(2) + ' ' + unit:
        formatBytes(bytes / 1024, units[units.indexOf(unit) + 1]);
}
```

请求内容摘录如下：

```text
Content-Length:14542
Content-Type:multipart/form-data; boundary=----WebKitFormBoundary74Nq1jm3PcAJAH08
X-Requested-With:XMLHttpRequest

------WebKitFormBoundary74Nq1jm3PcAJAH08
Content-Disposition: form-data; name="jar"; filename="myFile.jar"
Content-Type: application/octet-stream


------WebKitFormBoundary74Nq1jm3PcAJAH08
Content-Disposition: form-data; name="description"

some words
------WebKitFormBoundary74Nq1jm3PcAJAH08--
```

注：  
`Content-Type` 由浏览器自动生成，`boundary` 由每个浏览器自由设定，Chrome 每次请求都会变化。  
使用 `FormData` 的请求，不管是否有传递文件，`Content-Type` 始终为 `multipart/form-data`。

<script>ooboqoo.contentsRegExp = /H[123]/</script>
