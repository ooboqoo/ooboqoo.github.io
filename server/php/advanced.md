# PHP 进阶

## PHP 多维数组

多维数组指的是包含一个或多个数组的数组。

PHP 能理解两、三、四或五级甚至更多级的多维数组。不过，超过三级深的数组对于大多数人难于管理。

注释：数组的维度指示您需要选择元素的索引数。

  * 对于二维数组，您需要两个索引来选取元素
  * 对于三维数组，您需要三个索引来选取元素

### 两维数组

两维数组是数组的数组（三维数组是数组的数组的数组）。首先，让我们看看下面的表格：

品牌  | 库存 | 销量
----- | ---- | ------
Volvo | 33   | 20
BMW   | 17   | 15
Saab  | 5    | 2

我们能够在两维数组中存储上表中的数据，就像这样：

```php
$cars = array (
  array("Volvo", 22, 18),
  array("BMW", 15, 13),
  array("Saab", 5, 2),
);
```

现在这个两维数组包含了三个数组，并且它有两个索引（下标）：行和列。

如需访问 $cars 数组中的元素，我们必须使用两个索引（行和列）：

```php
<?php
  echo $cars[0][0] . ": 库存：" . $cars[0][1] . ", 销量：" . $cars[0][2] . "<br>";
  echo $cars[1][0] . ": 库存：" . $cars[1][1] . ", 销量：" . $cars[1][2] . "<br>";
  echo $cars[2][0] . ": 库存：" . $cars[2][1] . ", 销量：" . $cars[2][2] . "<br>";
?>
```

我们也可以在 For 循环中使用另一个 For 循环，来获得 $cars 数组中的元素（我们仍需使用两个索引）：

```php
for ($row = 0; $row < 3; $row++) {
  echo "<p><b>Row number $row </b></p>";
  echo "<ul>";
  for ($col = 0; $col < 3; $col++) {
    echo "<li>" . $cars[$row][$col] . "</li>";
  }
  echo "</ul>";
}
```


## PHP 日期和时间

### Date() 函数

PHP Date() 函数把时间戳格式化为更易读的日期和时间。

```php
date(format, timestamp)
// format 必需。规定时间戳的格式
// timestamp 可选。规定时间戳。默认是当前时间和日期。
```

注释：时间戳是一种字符序列，它表示具体事件发生的日期和事件。

date() 函数的格式参数是必需的，它们规定如何格式化日期或时间。

下面列出了一些常用于日期的字符：

  * d - 表示月里的某天（01-31）
  * m - 表示月（01-12）
  * Y - 表示年（四位数）
  * 1 - 表示周里的某天

其他字符，比如 "/", "." 或 "-" 也可被插入字符中，以增加其他格式。

获得简单的时间，下面是常用于时间的字符：

  * h - 带有首位零的 12 小时小时格式
  * i - 带有首位零的分钟
  * s - 带有首位零的秒（00 -59）
  * a - 小写的午前和午后（am 或 pm）

### 设定时区

下面的例子把时区设置为 "Asia/Shanghai"，然后以指定格式输出当前时间：

```php
date_default_timezone_set("Asia/Shanghai");
echo "当前时间是 " . date("h:i:sa");
```

## PHP Include 文件

服务器端包含 (SSI) 用于创建可在多个页面重复使用的函数、页眉、页脚或元素。

include （或 require）语句会获取指定文件中存在的所有文本/代码/标记，并复制到使用 include 语句的文件中。

包含文件很有用，如果您需要在网站的多张页面上引用相同的 PHP、HTML 或文本的话。

### PHP include 和 require 语句

通过 include 或 require 语句，可以将 PHP 文件的内容插入另一个 PHP 文件（在服务器执行它之前）。

include 和 require 语句是相同的，除了错误处理方面：

  * `require` 会生成致命错误（E_COMPILE_ERROR）并停止脚本
  * `include` 只生成警告（E_WARNING），并且脚本会继续

因此，如果您希望继续执行，并向用户输出结果，即使包含文件已丢失，那么请使用 include。否则，在框架、CMS 或者复杂的 PHP
应用程序编程中，请始终使用 require 向执行流引用关键文件。这有助于提高应用程序的安全性和完整性，在某个关键文件意外丢失的情况下。

包含文件省去了大量的工作。这意味着您可以为所有页面创建标准页头、页脚或者菜单文件。然后，在页头需要更新时，您只需更新这个页头包含文件即可。

#### 语法

```php
include 'filename';
require 'filename';
```

#### 示例

```php
// footer.php
<?php
  echo "<p>Copyright © 2006-" . date("Y") . " W3School.com.cn</p>";
?>
// 引入页脚文件 footer.php
<html>
<body>
  <h1>欢迎访问我们的首页！</h1>
  <p>一段文本。</p>
  <p>一段文本。</p>
  <?php include 'footer.php' ?>
</body>
</html>
```

## PHP 操作文件

PHP 拥有的多种函数可供创建、读取、上传以及编辑文件。

注意：请谨慎操作文件！

当您操作文件时必须非常小心。如果您操作失误，可能会造成非常严重的破坏。常见的错误是：

  * 编辑错误的文件
  * 被垃圾数据填满硬盘
  * 意外删除文件内容

### 文件打开 / 读取

#### readfile()

readfile() 函数用于简单读取文件，并把它写入输出缓冲。

如果您想做的所有事情就是打开一个文件并读取器内容，那么 readfile() 函数很有用。

```php
echo readfile("webdictionary.txt");
```

#### fopen()

打开文件的更好的方法是通过 fopen() 函数。此函数为您提供比 readfile() 函数更多的选项。  
fopen() 的第一个参数包含被打开的文件名，第二个参数规定打开文件的模式。如果 fopen() 函数未能打开指定的文件，下面的例子会生成一段消息：

```php
$myfile = fopen("webdictionary.txt", "r") or die("Unable to open file!");
echo fread($myfile, filesize("webdictionary.txt"));
fclose($myfile);
```

文件会以如下模式之一打开：

模式 | 描述
---- | ----
r  | 打开文件为只读。文件指针在文件的开头开始。
w  | 打开文件为只写。删除文件的内容或创建一个新的文件，如果它不存在。文件指针在文件的开头开始。
a  | 打开文件为只写。文件中的现有数据会被保留。文件指针在文件结尾开始。创建新的文件，如果文件不存在。
x  | 创建新文件为只写。返回 FALSE 和错误，如果文件已存在。
r+ | 打开文件为读/写、文件指针在文件开头开始。
w+ | 打开文件为读/写。删除文件内容或创建新文件，如果它不存在。文件指针在文件开头开始。
a+ | 打开文件为读/写。文件中已有的数据会被保留。文件指针在文件结尾开始。创建新文件，如果它不存在。
x+ | 创建新文件为读/写。返回 FALSE 和错误，如果文件已存在。

#### fread()

fread() 函数读取打开的文件。

fread() 的第一个参数包含待读取文件的文件名，第二个参数规定待读取的最大字节数。

如下 PHP 代码把 "webdictionary.txt" 文件读至结尾：

```php
fread($myfile,filesize("webdictionary.txt"));
```

#### fclose()

fclose() 函数用于关闭打开的文件。

注释：用完文件后把它们全部关闭是一个良好的编程习惯。您并不想打开的文件占用您的服务器资源。

fclose() 需要待关闭文件的名称（或者存有文件名的变量）：

```php
$myfile = fopen("webdictionary.txt", "r");
// some code to be executed....
fclose($myfile);
```

### PHP 文件创建 / 写入

#### PHP 创建文件 - fopen()

fopen() 函数也用于创建文件。也许有点混乱，但是在 PHP 中，创建文件所用的函数与打开文件的相同。

如果您用 fopen() 打开并不存在的文件，此函数会创建文件，假定文件被打开为写入（w）或增加（a）。

#### PHP 文件权限

如果您试图运行这段代码时发生错误，请检查您是否有向硬盘写入信息的 PHP 文件访问权限。

#### PHP 写入文件 - fwrite()

fwrite() 函数用于写入文件。

fwrite() 的第一个参数包含要写入的文件的文件名，第二个参数是被写的字符串。

下面的例子把姓名写入名为 "newfile.txt" 的新文件中：

```php
<?php
$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = "Bill Gates\n";
fwrite($myfile, $txt);
$txt = "Steve Jobs\n";
fwrite($myfile, $txt);
fclose($myfile);
```

### PHP 文件上传

#### 创建一个文件上传表单

允许用户从表单上传文件是非常有用的。请看下面这个供上传文件的 HTML 表单：

```html
<form action="upload_file.php" method="post" enctype="multipart/form-data">
  <label for="file">Filename: <input type="file" name="file" id="file" ></label>
  <input type="submit" name="submit" value="Submit" />
</form>
```

请留意如下有关此表单的信息：

`<form>` 标签的 `enctype` 属性规定了在提交表单时要使用哪种内容类型。在表单需要二进制数据时，比如文件内容，请使用 `"multipart/form-data"`。

`<input>` 标签的 `type="file"` 属性规定了应该把输入作为文件来处理。

注释：允许用户上传文件是一个巨大的安全风险。请仅仅允许可信的用户执行文件上传操作。

#### 创建上传脚本

"upload_file.php" 文件含有供上传文件的代码：

```php
<?php
// 用户只能上传 .gif 或 .jpeg 文件，体积小于 50kb
if ((($_FILES["file"]["type"] == "image/gif")
    || ($_FILES["file"]["type"] == "image/jpeg")    // 对于 FireFox，必须是 jpeg
    || ($_FILES["file"]["type"] == "image/pjpeg"))  // 对于 IE，识别 jpg 文件的类型必须是 pjpeg
    && ($_FILES["file"]["size"] < 20000)) {         // 文件大小必须小于 20 kb
  if ($_FILES["file"]["error"] > 0) {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
  } else {
    echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    echo "Type: " . $_FILES["file"]["type"] . "<br>";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br>";
    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";

    if (file_exists("upload/" . $_FILES["file"]["name"])) {
      echo $_FILES["file"]["name"] . " already exists. ";
    } else {
      move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $_FILES["file"]["name"]);
      echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
    }
  }
} else {
  echo "Invalid file";
}
?>
```

通过使用 PHP 的全局数组 $_FILES，你可以从客户计算机向远程服务器上传文件。

第一个参数是表单的 input name，第二个下标可以是 "name", "type", "size", "tmp_name" 或 "error"。就像这样：

  * $_FILES["file"]["name"] - 被上传文件的名称
  * $_FILES["file"]["type"] - 被上传文件的类型
  * $_FILES["file"]["size"] - 被上传文件的大小，以字节计
  * $_FILES["file"]["tmp_name"] - 存储在服务器的文件的临时副本的名称
  * $_FILES["file"]["error"] - 由文件上传导致的错误代码

这是一种非常简单文件上传方式。基于安全方面的考虑，您应当增加有关什么用户有权上传文件的限制。

#### 保存被上传的文件

上面的例子在服务器的 PHP 临时文件夹创建了一个被上传文件的临时副本。

这个临时的复制文件会在脚本结束时消失。要保存被上传的文件，我们需要把它拷贝到另外的位置。


## PHP Cookies

### 什么是 Cookie

cookie 常用于识别用户。cookie 是服务器留在用户计算机中的小文件。每当相同的计算机通过浏览器请求页面时，它同时会发送 cookie。通过 PHP，您能够创建并取回 cookie 的值。

### 创建 cookie

setcookie() 函数用于设置 cookie。

注释：setcookie() 函数必须位于 `<html>` 标签之前。

```php
setcookie(name, value, expire, path, domain);
```

```php
<?php 
setcookie("user", "Alex Porter", time()+3600);
?>
<html><body></body></html>
```

注释：在发送 cookie 时，cookie 的值会自动进行 URL 编码，在取回时进行自动解码（为防止 URL 编码，请使用 setrawcookie()
取而代之）。

### 取回 Cookie

PHP 的 $_COOKIE 变量用于取回 cookie 的值。

在下面的例子中，我们取回了名为 "user" 的 cookie 的值，并把它显示在了页面上：

```php
echo $_COOKIE["user"];  // Print a cookie
print_r($_COOKIE);      // A way to view all cookies
```

在下面的例子中，我们使用 isset() 函数来确认是否已设置了 cookie：

```php
if (isset($_COOKIE["user"])) echo "Welcome " . $_COOKIE["user"] . "!<br>";
else echo "Welcome guest!<br />";
```

### 删除 cookie

当删除 cookie 时，您应当使过期日期变更为过去的时间点。

```php
setcookie("user", "", time()-3600);  // set the expiration date to one hour ago
```


## PHP Sessions

PHP session 变量用于存储有关用户会话的信息，或更改用户会话的设置。Session 变量保存的信息是单一用户的，并且可供应用程序中的所有页面使用。

### Session 变量

当您运行一个应用程序时，您会打开它，做些更改，然后关闭它。这很像一次会话。计算机清楚你是谁。它知道你何时启动应用程序，并在何时终止。但是在因特网上，存在一个问题：服务器不知道你是谁以及你做什么，这是由于 HTTP 地址不能维持状态。

通过在服务器上存储用户信息以便随后使用，PHP session 解决了这个问题（比如用户名称、购买商品等）。不过，会话信息是临时的，在用户离开网站后将被删除。如果您需要永久储存信息，可以把数据存储在数据库中。

Session 的工作机制是：为每个访问者创建一个唯一的 id (UID)，并基于这个 UID 来存储变量。UID 存储在 cookie 中，亦或通过
URL 进行传导。

### 开始 Session

在您把用户信息存储到 PHP session 中之前，首先必须启动会话。

注释：session_start() 函数必须位于 `<html>` 标签之前：

```php
<?php session_start(); ?>
<html><body></body></html>
```

上面的代码会向服务器注册用户的会话，以便您可以开始保存用户信息，同时会为用户会话分配一个 UID。

### 存储 Session 变量

存储和取回 session 变量的正确方法是使用 PHP $_SESSION 变量：

```php
<?php
  session_start();
  $_SESSION['views'] = 1;  // store session data
?>
<html><body>
<?php
  echo "Pageviews=". $_SESSION['views'];  // retrieve session data
?>                                        // 输出：Pageviews=1
</body></html>
```

### 终结 Session

如果您希望删除某些 session 数据，可以使用 unset() 或 session_destroy() 函数。

* `unset()` 函数用于释放指定的 session 变量；
* `session_destroy()` 函数彻底终结 session；

注释：session_destroy() 将重置 session，您将失去所有已存储的 session 数据。

```php
unset($_SESSION['views']);
session_destroy();
```


## PHP E-mail
## PHP Error
## PHP Exception
## PHP Filter





