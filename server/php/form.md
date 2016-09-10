# PHP 表单

## PHP 表单处理

PHP 超全局变量 `$_GET` 和 `$_POST` 用于收集表单数据（form-data）。

```html
<form action="welcome.php" method="post">
  Name: <input type="text" name="name"><br>
  E-mail: <input type="text" name="email"><br>
  <input type="submit">
</form>
```

当用户填写此表单并点击提交按钮后，表单数据会发送到名为 "welcome.php" 的 PHP 文件供处理。表单数据是通过 HTTP POST 方法发送的。

如需显示出被提交的数据，您可以简单地输出（echo）所有变量。"welcome.php" 文件是这样的：

```php
Welcome <?php echo $_POST["name"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?>
```

上面的代码很简单。不过，最重要的内容被漏掉了，您需要对表单数据进行验证，以防止脚本出现漏洞。本页未包含任何表单验证程序，不过稍后会为您讲解如何提高 PHP 表单的安全性！适当的安全验证对于抵御黑客攻击和垃圾邮件非常重要！

### GET vs. POST

GET 和 POST 都创建数组，此数组包含键/值对，其中的键是表单控件的名称，而值来自用户的输入数据。

`$_GET` 和 `$_POST` 都是超全局变量，这意味着对它们的访问无需考虑作用域。  
$_GET 是通过 URL 参数传递到当前脚本的变量数组。  
$_POST 是通过 HTTP POST 传递到当前脚本的变量数组。

### 何时使用 GET？

通过 GET 方法从表单发送的信息 __对任何人都是可见的__（所有变量名和值都显示在 URL 中）。  
GET 对所发送信息的数量有限制(不大于 2000 个字符）。  
不过，由于变量显示在 URL 中，把页面添加到书签中也更为方便。

GET 可用于发送非敏感的数据，但绝不能使用 GET 来发送密码或其他敏感信息！

### 何时使用 POST？

通过 POST 方法从表单发送的信息 __对其他人是不可见的__（所有名称/值会被嵌入 HTTP 请求的主体中），并且对所发送信息的数量也无限制。

此外 POST 支持高阶功能，比如在向服务器上传文件时进行 multi-part 二进制输入。  
不过，由于变量未显示在 URL 中，也就无法将页面添加到书签。

提示：开发者偏爱 POST 来发送表单数据。


## PHP 表单验证

提示：在处理 PHP 表单时请重视安全性！

这些页面将展示如何安全地处理 PHP 表单。对表单数据进行适当的验证对于防范黑客和垃圾邮件很重要！

我们稍后使用的 HTML 表单包含多种输入字段：必填和可选的文本字段、单选按钮以及提交按钮：

```php
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
  Name: <input type="text" name="name">
  E-mail: <input type="text" name="email">
  Website: <input type="text" name="website">
  Comment: <textarea name="comment" rows="5" cols="40"></textarea>

  Gender:
  <input type="radio" name="gender" value="female">Female
  <input type="radio" name="gender" value="male">Male
  <input type="submit">
</form>
```

上面的表单使用如下验证规则：

Name - 必填，必须包含字母和空格。   
E-mail - 必填，必须包含有效的电子邮件地址（包含 @ 和 .）。   
Website - 可选。如果选填，则必须包含有效的 URL。   
Comment - 可选。多行输入字段（文本框）。   
Gender - 必需。必须选择一项。

### 什么是 `$_SERVER["PHP_SELF"]` 变量？

`$_SERVER["PHP_SELF"]` 是一种超全局变量，它返回当前执行脚本的文件名。

因此，表单数据发送到页面本身，而不是跳转到另一页面。这样，用户就能够在表单页面获得错误提示信息。

### 什么是 `htmlspecialchars()` 函数？

`htmlspecialchars()` 函数把特殊字符转换为 HTML 实体。这意味着 `<` 和 `>` 之类的 HTML 字符会被替换为 `&lt;` 和 `&gt;`。这样可防止攻击者通过在表单中注入 HTML 或 JavaScript 代码（跨站点脚本攻击）对代码进行利用。

### 关于 PHP 表单安全性的重要提示

`$_SERVER["PHP_SELF"]` 变量能够被黑客利用！

如果您的页面使用了 PHP_SELF，用户能够输入下划线然后执行跨站点脚本（XSS）。

提示：跨站点脚本（Cross-site scripting，XSS）是一种计算机安全漏洞类型，常见于 Web 应用程序。XSS 能够使攻击者向其他用户浏览的网页中输入客户端脚本。

假设我们的一个名为 "test_form.php" 的页面中有如下表单：

```php
<form method="post" action="<?php echo $_SERVER["PHP_SELF"];?>">
```

现在，如果用户进入的是地址栏中正常的 URL：`http://www.example.com/test_form.php`，上面的代码会转换为：

```html
<form method="post" action="test_form.php">
```

到目前，一切正常。不过，如果用户在地址栏中键入了如下 URL：

```
http://www.example.com/test_form.php/%22%3E%3Cscript%3Ealert('hacked')%3C/script%3E
```

在这种情况下，上面的代码会转换为：

```html
<form method="post" action="test_form.php"/><script>alert('hacked')</script>
```

这段代码加入了一段脚本和一个提示命令。并且当此页面加载后，就会执行 JavaScript 代码（用户会看到一个提示框）。这仅仅是一个关于 PHP_SELF 变量如何被利用的简单无害案例。

您应该意识到 `<script>` 标签内能够添加任何 JavaScript 代码！黑客能够把用户重定向到另一台服务器上的某个文件，该文件中的恶意代码能够更改全局变量或将表单提交到其他地址以保存用户数据，等等。

### 如果避免 `$_SERVER["PHP_SELF"]` 被利用？

通过使用 htmlspecialchars() 函数能够避免 $_SERVER["PHP_SELF"] 被利用。表单代码是这样的：

```php
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
```

htmlspecialchars() 函数把特殊字符转换为 HTML 实体。现在，如果用户试图利用 PHP_SELF 变量，会导致如下输出：

```html
<form method="post" action="test_form.php/&quot;&gt;&lt;script&gt;alert('hacked')&lt;/script&gt;">
```

无法利用，没有危害！

### 通过 PHP 验证表单数据

我们要做的第一件事是通过 PHP 的 htmlspecialchars() 函数传递所有变量。另外，我们还要做两件事：

  1. （通过 trim() 函数）去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  2. （通过 stripslashes() 函数）删除用户输入数据中的反斜杠（\）

接下来我们创建一个检查函数（相比一遍遍地写代码，这样效率更好），我们把函数命名为 test_input()。现在，我们能够通过 test_input() 函数检查每个 $_POST 变量，脚本是这样的：

```php
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$name = $email = $gender = $comment = $website = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name    = test_input($_POST["name"]);
  $email   = test_input($_POST["email"]);
  $website = test_input($_POST["website"]);
  $comment = test_input($_POST["comment"]);
  $gender  = test_input($_POST["gender"]);
}
```

## PHP 表单验证 - 必填字段

本节展示如何制作必填输入字段，并创建需要时所用的错误消息。

### PHP - 输入字段

从上节中的验证规则中，我们看到 "Name", "E-mail" 以及 "Gender" 字段是必填的。在下面的代码中我们增加了一些新变量：$nameErr、$emailErr、$genderErr 以及 $websiteErr。这些错误变量会保存被请求字段的错误消息。我们还为每个 $_POST 变量添加了一个 if else 语句。这条语句检查 $_POST 变量是否为空（通过 PHP empty() 函数）。如果为空，则错误消息会存储于不同的错误变量中。如果不为空，则通过 test_input() 函数发送用户输入数据：

```php
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $comment = $website = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) { $nameErr = "Name is required"; }
  else { $name = test_input($_POST["name"]); }

  if (empty($_POST["email"])) { $emailErr = "Email is required"; }
  else { $email = test_input($_POST["email"]); }

  if (empty($_POST["website"])) { $website = ""; }
  else { $website = test_input($_POST["website"]); }

  if (empty($_POST["comment"])) { $comment = ""; }
  else { $comment = test_input($_POST["comment"]); }

  if (empty($_POST["gender"])) { $genderErr = "Gender is required"; }
  else { $gender = test_input($_POST["gender"]); }
}
```


### PHP - 显示错误消息

在 HTML 表单中，我们在每个被请求字段后面增加了一点脚本。当有必填字段未填写就提交表单时，会生成恰当的错误消息：

```php
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
Name: <input type="text" name="name">
<span class="error">* <?php echo $nameErr; ?></span><br><br>

E-mail:
<input type="text" name="email">
<span class="error">* <?php echo $emailErr;?></span><br><br>

Website:
<input type="text" name="website">
<span class="error"><?php echo $websiteErr;?></span><br><br>

<label>Comment: <textarea name="comment" rows="5" cols="40"></textarea><br><br>

Gender:
<input type="radio" name="gender" value="female">Female
<input type="radio" name="gender" value="male">Male
<span class="error">* <?php echo $genderErr;?></span><br><br>
<input type="submit" name="submit" value="Submit">
</form>
```


## PHP 表单验证 - E-mail / URL

本节展示如何验证名字、电邮和 URL。

### PHP - 验证名字

以下代码展示的简单方法检查 name 字段是否包含字母和空格。如果 name 字段无效，则存储一条错误消息：

```php
$name = test_input($_POST["name"]);
if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
  $nameErr = "只允许字母和空格！"; 
}
```

注释：preg_match() 函数检索字符串的模式，如果模式存在则返回 true，否则返回 false。

### PHP - 验证 E-mail

以下代码展示的简单方法检查 e-mail 地址语法是否有效。如果无效则存储一条错误消息：

```php
$email = test_input($_POST["email"]);
if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
  $emailErr = "无效的 email 格式！"; 
}
```


### PHP - 验证 URL

以下代码展示的方法检查 URL 地址语法是否有效（这条正则表达式同时允许 URL 中的斜杠）。如果 URL 地址语法无效，则存储一条错误消息：

```php
$website = test_input($_POST["website"]);
if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&amp;@#\/%?=~_|!:,.;]*[-a-z0-9+&amp;@#\/%
=~_|]/i",$website)) {
  $websiteErr = "无效的 URL"; 
}
```

### PHP - 验证 Name、E-mail、以及 URL

现在，脚本是这样的：

```php
// 定义变量并设置为空值
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $comment = $website = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) { $nameErr = "Name is required"; }
  else { $name = test_input($_POST["name"]);
    // 检查名字是否包含字母和空格
    if (!preg_match("/^[a-zA-Z ]*$/",$name)) { $nameErr = "Only letters and white space allowed"; }
  }

  if (empty($_POST["email"])) { $emailErr = "Email is required"; }
  else { $email = test_input($_POST["email"]);
    // 检查电邮地址语法是否有效
    if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) { $emailErr = "Invalid email format"; }
  }

  if (empty($_POST["website"])) { $website = "";}
  else { $website = test_input($_POST["website"]);
    // 检查 URL 地址语言是否有效(此正则表达式同样允许 URL 中的下划线)
    if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&amp;@#\/%?=~_|!:,.;]*[-a-z0-9+&amp;@#\/%=~_|]/i",
      $website)) { $websiteErr = "Invalid URL"; }
  }

  if (empty($_POST["comment"])) { $comment = ""; }
  else { $comment = test_input($_POST["comment"]); }

  if (empty($_POST["gender"])) { $genderErr = "Gender is required"; }
  else { $gender = test_input($_POST["gender"]); }
}
```


## PHP 表单验证 - 完成表单实例

本节展示如何在用户提交表单后保留输入字段中的值。

### PHP - 保留表单中的值

如需在用户点击提交按钮后在输入字段中显示值，我们在以下输入字段的 value 属性中增加了一小段 PHP 脚本：name、email 以及
website。在 comment 文本框字段中，我们把脚本放到了 &lt;textarea&gt; 标签内，这些脚本输出 $name、$email、$website 和
$comment 变量的值。

然后，我们还需要显示选中了哪个单选按钮。对此，我们必须操作 checked 属性（而非单选按钮的 value 属性）：

```php
Name: <input type="text" name="name" value="<?php echo $name;?>">
E-mail: <input type="text" name="email" value="<?php echo $email;?>">
Website: <input type="text" name="website" value="<?php echo $website;?>">
Comment: <textarea name="comment" rows="5" cols="40"><?php echo $comment;?></textarea>

Gender:
<input type="radio" name="gender"
<?php if (isset($gender) &amp;&amp; $gender=="female") echo "checked";?>
value="female">Female
<input type="radio" name="gender"
<?php if (isset($gender) &amp;&amp; $gender=="male") echo "checked";?>
value="male">Male
```
