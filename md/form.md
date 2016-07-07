# HTML Form

## 教程 （CH04 构建更好的 Web 表单）

### 4.1 理解表单
### 4.2 传统表单翻新
#### 4.2.1 通过占位符文本添加提示  placeholder

应该避免用占位符去做两件事：

+ 不要用它代替字段描述或说明
+ 不要为了表示占位符不是真正的内容，就选择特殊字符作为占位符。比如，使用 `[John Simth]` 而不是 `Jhon Simth`，想用方括号强调这只是个示例，但这样很容易让人迷惑。

#### 4.2.2 焦点：挑选正确的起点  autofocus

### 4.3 验证：阻止错误

在两个地方验证：客户端验证是为访客提供方便的，而服务器端验证才是确保数据正确性的。

只有用户单击“提交”按钮，浏览器才会执行验证，这样可保证验证的效率。如果需要在用户输入错误并离开相应字段时马上给出提示，需要自己编写 JS 代码或选择一个 JS 库。

#### 4.3.2 关闭验证 novalidate / formnovalidate
#### 4.3.3 验证样式挂钩

虽然我们无法修改验证消息的样式，但却可以根据输入字段是否已验证来改变它们的外观，只要使用几个新的伪类即可。
```css
input:required:invalid { background-color: lightyellow; }
```

#### 4.3.4 使用正则表达式

注：浏览器不会验证空值，如果这不是你希望的结果，那么就要同时指定 pattern 和 required 属性。

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

可以将代码添加到表单的 onSubmit 事件处理函数上，根据情况返回 true 或 false（取消提交），另外还需考虑如何提供反馈。

#### 4.4.2 用 HTML5Forms 兼容

详细内容请访问：https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills

### 4.5 新的输入控件

### 4.6 新元素
`<datalist> <progress> <meter>`

### 4.7 网页中的 HTML 编辑器

`contenteditable="true" ` 添加到任何元素以使该元素可以编辑。  
`designMode` 可以让用户编辑整个页面，一般都是结合 `<iframe>` 使用。

这两个属性是 IE5 率先引入的，今天所有桌面浏览器都支持这两个从未写进任何标准的属性。

## 速查表

```html
<form action="#" method="post">
  Last name: <br>
  <input type="text" name="lastname" value="Nixon" size="30" maxlength="50">

  <label for="psw">Password: </label>
  <input type="password" id="psw" name="password">

  <label><input type="radio" name="sex" value="male" checked> Male</label>
  <label><input type="radio" name="sex" value="female"> Female</label>

  <label><input type="checkbox" name="vehicle1" value="Bike"> I have a bike</label>
  <label><input type="checkbox" name="vehicle2" value="Car" checked="checked"> I have a car</label>

  <input type="file" name="pic" accept="image/*" multiple>
  <input type="submit" value="提交测试" formaction="http://192.168.1.154/form.php">
  <input type="reset">
  <input type="button" onclick="alert('Hello World!')" value="Click Me!">
  <input type="hidden" name="country" value="Norway">

  <select>
    <option value="volvo">Volvo</option>
    <option value="fiat">Fiat</option>
    <option value="audi" selected>Audi</option>
  </select>

  <textarea name="Comment" rows="4" cols="40"> Some pre-placed words here</textarea>
  <button type="button" onclick="alert('Hello World!')">Click Me!</button>

  <input id="favoriteAnimal" list="animalChoices">
  <datalist id="animalChoices">
    <option label="Zebra" value="zebra">
    <option label="Elephant" value="elephant">
    <option label="Pigeon" value="pigeon">
  </datalist>
</form>
```

label 中的 for 与 id 相对；而 name 跟 value 是传递给服务器的键值对。  
checkbox 被选中的 name 和 value 会传给服务器，没选的忽略，name 不能重名。

## 参考手册

### Form
<table>
  <tr><th></th><th>Tag</th><th>Form Attributes</th></tr>
  <tr>
    <td>HTML4</td>
    <td>
      <ul>
        <li>&lt;form&gt;</li>
        <li>&lt;input&gt;</li>
        <li>&lt;textarea&gt;</li>
        <li>&lt;button&gt;</li>
        <li>&lt;select&gt;</li>
        <li>&lt;optgroup&gt;</li>
        <li>&lt;option&gt;</li>
        <li>&lt;label&gt;</li>
        <li>&lt;fieldset&gt;</li>
        <li>&lt;legend&gt;</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>action</li>
        <li>method</li>
        <li>name (for DOM usage: document.forms.name)</li>
        <li>target</li>
        <li>accept-charset</li>
        <li>enctype</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HTML5</td>
    <td>
      <ul>
        <li>&lt;datalist&gt;</li>
        <li>&lt;progress&gt;</li>
        <li>&lt;meter&gt;</li>
        <li>&lt;keygen&gt;</li>
        <li>&lt;output&gt;</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>autocomplete (autocomplete="on|off")</li>
        <li>novalidate (novalidate="novalidate" or novalidate)</li>
      </ul>
    </td>
  </tr>
</table>

### Input Types &amp; Attributes
<table>
  <tr><th></th><th>Input Types</th><th>Input Attributes</th></tr>
  <tr>
    <td>HTML4</td>
    <td>
      <ul>
        <li>text</li>
        <li>password</li>
        <li>radio</li>
        <li>checkbox</li>
        <li>submit</li>
        <li>reset</li>
        <li>button</li>
        <li>image</li>
        <li>file</li>
        <li>hidden</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>id (global attributes)</li>
        <li>name</li>
        <li>value</li>
        <li>size (Specifies the width, in characters)</li>
        <li>maxlength</li>
        <li>readonly</li>
        <li>disabled</li>
        <li>checked (for type="checkbox" or "radio")</li>
        <li>accept (only for type="file")</li>
        <li>src (only for type="image")</li>
        <li>alt (only for type="image")</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HTML5</td>
    <td>
      <ul>
        <li>date</li>
        <li>datetime</li>
        <li>datetime-local</li>
        <li>month</li>
        <li>week</li>
        <li>time</li>
        <li>number</li>
        <li>email</li>
        <li>range</li>
        <li>search</li>
        <li>tel</li>
        <li>url</li>
        <li>color</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>placeholder</li>
        <li>required</li>
        <li>autocomplete</li>
        <li>autofocus</li>
        <li>height and width (only for type="image")</li>
        <li>min and max</li>
        <li>step</li>
        <li>list (list="datalist_id")</li>
        <li>multiple (only for type="email | file")</li>
        <li>pattern (regexp)</li>
        <li>form (Specifies one or more forms the &lt;input&gt; belongs to)</li>
        <li>formaction</li>
        <li>formenctype</li>
        <li>formmethod</li>
        <li>formnovalidate</li>
        <li>formtarget</li>
      </ul>
    </td>
  </tr>
</table>

## 附加事项

DOM 中 id/name 膨胀 -- 《忍者秘籍》P254

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
