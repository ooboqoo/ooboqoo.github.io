<style>td:first-child { color: red; }</style>

# HTML Form

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

`<label>` 中的 `for` 与 `id` 相对；而 `name` 跟 `value` 是传递给服务器的键值对。  
`<checkbox>` 被选中的 `name` 和 `value` 会传给服务器，没选的忽略，`name` 不能重名。

## 参考手册

### Form

#### Form Attributes

|||
|----------------|-------------------------------------------------
| action         | |
| method         | |
| name           | for DOM usage: document.forms.name
| target         | |
| accept-charset | |
| enctype        | |
|||
| autocomplete   | `autocomplete="on"` or `autocomplete="off"`
| novalidate     | `novalidate="novalidate"` or `novalidate`

#### Tag

|||
|-------------------------------|------------------
| [`<form>`](/tag_form.asp)  | Defines an HTML form for user input
| [`<input>`](/tag_input.asp) | Defines an input control
| [`<textarea>`](/tag_textarea.asp) | Defines a multiline input control (text area)
| [`<label>`](/tag_label.asp) | Defines a label for an `<input>` element
| [`<fieldset>`](/tag_fieldset.asp) | Groups related elements in a form
| [`<legend>`](/tag_legend.asp) | Defines a caption for a `<fieldset>` element
| [`<select>`](/tag_select.asp) | Defines a drop-down list
| [`<optgroup>`](/tag_optgroup.asp) | Defines a group of related options in a drop-down list
| [`<option>`](/tag_option.asp) | Defines an option in a drop-down list
| [`<button>`](/tag_button.asp) | Defines a clickable button
|||
| [`<datalist>`](/tag_datalist.asp) | Specifies a list of pre-defined options for input controls
| [`<keygen>`](/tag_keygen.asp) | Defines a key-pair generator field (for forms)
| [`<output>`](/tag_output.asp) | Defines the result of a calculation
| [`<progress>`](/tag_progress.asp) | Represents the progress of a task
| [`<meter>`](/tag_meter.asp) | Defines a scalar measurement within a known range, or a fractional value

### Input Types &amp; Attributes

#### Input Types

HTML4: `text` `password` `radio` `checkbox` `submit` `reset` `button` `image` `file` `hidden`

HTML5: `date` `datetime` `datetime-local` `month` `week` `time` `number` `email` `range` `search` `tel` `url` `color`

#### Input Attributes

|||
|------------|------------------
| id | global attributes
| name | |
| value | |
| disabled | |
| readonly | |
| size | Specifies the width, in characters
| maxlength | |
| checked | for type="checkbox" or "radio"
| accept | only for type="file"
| src | only for type="image"
| alt | only for type="image"
|||
| placeholder | |
| required | |
| autocomplete | |
| autofocus | |
| height and width | only for type="image"
| min and max | |
| step | |
| list | list="datalist_id"
| multiple | only for type="email" or type="file"
| pattern | regexp
| form | Specifies one or more forms the `<input>` belongs to
| formaction | |
| formenctype | |
| formmethod | |
| formnovalidate | |
| formtarget | ||

<script>
var base = 'https://www.w3schools.com/tags';
var links = [].slice.call(document.querySelectorAll('td a'));
links.forEach(function (link) {
  link.href = base + link.getAttribute('href');
});
</script>