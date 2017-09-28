# HTML 快速参考

http://www.w3school.com.cn/html/html_quick.asp

```html
<!DOCTYPE html>
<html>
<head>
    <!-- meta Elements -->
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="30">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    <meta name="description" content="Free Web tutorials">
    <meta name="author" content="Hege Refsnes">
    <link rel="stylesheet" type="text/css" href="theme.css">
    <script type="text/javascript" src="main.js"></script>
    <title>Document name goes here</title>
</head>
<body>
    <!-- Text Elements -->
    <p>This is a paragraph</p>
    <br> (line break)
    <hr> (horizontal line)
    <pre>This text is preformatted</pre>

    <!-- Logical Styles -->
    <em>This text is emphasized</em>
    <strong>This text is strong</strong>
    <code>This is some computer code</code>

    <!-- Physical Styles -->
    <b>This text is bold</b>
    <i>This text is italic</i>

    <!-- Links & Anchors -->
    <a href="http://www.example.com/">This is a Link</a>
    <a href="http://www.example.com/"><img src="URL" alt="Alternate Text"></a>
    <a href="mailto:webmaster@example.com">Send e-mail</a>A named anchor:
    <a id="tips">Useful Tips Section</a>  // html5不再支持 a 标签的 name 属性
    <a href="#tips">Jump to the Useful Tips Section</a>

    <!-- Image Elements -->
    <a href="default.asp">
      <img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;border:0;">
    </a>
    <img src="planets.gif" alt="Planets" usemap="#planetmap" style="width:145px;height:126px;">
    <map name="planetmap">
      <area shape="rect" coords="0,0,82,126" alt="Sun" href="sun.htm">
      <area shape="circle" coords="90,58,3" alt="Mercury" href="mercur.htm">
    </map>

    <!-- Unordered list -->
    <ul>
      <li>First item</li>
      <li>Next item</li>
    </ul>

    <!-- Ordered list -->
    <ol>
      <li>First item</li>
      <li>Next item</li>
    </ol>

    <!-- Definition list -->
    <dl>
      <dt>First term</dt><dd>Definition</dd>
      <dt>Next term</dt><dd>Definition</dd>
    </dl>

    <!-- Tables -->
    <table border="1">
        <tr><th>someheader</th><th>someheader</th></tr>
        <tr><td>sometext</td><td>sometext</td></tr>
    </table>

    <!-- Frames -->
    <iframe src="page1.html"></iframe>

    <!-- Forms -->
    <form action="http://www.example.com/test.asp" method="get">
        Last name: <input type="text" name="lastname" value="Nixon" size="30" maxlength="50">
        <label for="pswd">Password: </label>
        <input type="password" id="psw" name="password">
        <label><input type="radio" name="sex" value="male" checked> Male</label>
        <label><input type="radio" name="sex" value="female"> Female</label>
        <label><input type="checkbox" name="vehicle1" value="Bike"> I have a bike</label>
        <label><input type="checkbox" name="vehicle2" value="Car" checked="checked"> I have a car</label>
        <input type="file" name="pic" accept="image/gif">
        <input type="submit" value="Submit">
        <input type="reset" value="Clear">
        <input type="button" onclick="alert('Hello World!')" value="Click Me!">
        <input type="hidden" name="country" value="Norway">
        <select multiple>
            <option>Apples</option>
            <option selected>Bananas</option>
        </select>
        <textarea name="Comment" rows="4" cols="40"> Some pre-placed words here</textarea>
        <button type="button" onclick="alert('Hello World!')">Click Me!</button>
    </form>
    // label 中的 for 与 id 相对；而 name 跟 value 是传递给服务器的键值对。
    // checkbox 被选中的 name 和 value 会传给服务器，没选的忽略，name 不能重名。

    <!-- Entities -->
    &lt; is the same as <
    &gt; is the same as >
    &#169; is the same as ?

    <!-- Other Elements -->
        <!-- This is a comment -->
        <blockquote>Text quoted from some source.</blockquote>
        <address>Address 1<br>Address 2<br>City<br></address>
</body>
</html>
```

