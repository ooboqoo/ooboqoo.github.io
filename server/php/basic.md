# PHP 基础

## PHP 简介

PHP 脚本在服务器上执行。

### 什么是 PHP？

  * PHP 是 "PHP Hypertext Preprocessor" 的首字母缩略词
  * PHP 是一种被广泛使用的开源脚本语言
  * PHP 脚本在服务器上执行

### PHP 是一门令人惊叹的流行语言！

  * 它强大到足以成为在网络上最大的博客系统的核心（WordPress）！
  * 它深邃到足以运行最大的社交网络（facebook）！
  * 而它的易用程度足以成为初学者的首选服务器端语言！

### PHP 能够做什么？

  * PHP 能够生成动态页面内容
  * PHP 能够创建、打开、读取、写入、删除以及关闭服务器上的文件
  * PHP 能够接收表单数据
  * PHP 能够发送并取回 cookies
  * PHP 能够添加、删除、修改数据库中的数据
  * PHP 能够限制用户访问网站中的某些页面
  * PHP 能够对数据进行加密

通过 PHP，您可以不受限于只输出 HTML。您还能够输出图像、PDF 文件、甚至 Flash 影片。


## PHP 语法

PHP 脚本在服务器上执行，然后向浏览器发送回纯 HTML 结果。

### 基础 PHP 语法

PHP 脚本可放置于文档中的任何位置。

PHP 脚本以 `<?php` 开头，以 `?>` 结尾：

```php
<?php
  echo "Hello world!";
?>
```

PHP 文件的默认文件扩展名是 ".php"。

PHP 文件通常包含 HTML 标签以及一些 PHP 脚本代码。

注释：PHP 语句以分号结尾 `;`。PHP 代码块的关闭标签也会自动表明分号（因此在 PHP 代码块的最后一行不必使用分号）。

### PHP 中的注释

PHP 代码中的注释不会被作为程序来读取和执行。它唯一的作用是供代码编辑者阅读。

  * 注释可以让其他程序员了解您在每个步骤进行的工作（如果您供职于团队）
  * 大多数程序员都曾经历过一两年后对项目进行返工，注释可以记录您在写代码时的思路。

PHP 支持三种注释：

```php
// 这是单行注释
# 这也是单行注释
/*
  这是多行注释块
  它横跨了多行
*/
```

### PHP 大小写敏感

在 PHP 中，**所有用户定义的函数、类和关键词都对大小写不敏感**。

不过在 PHP 中，**所有变量都对大小写敏感**，如 $color、$COLOR 和 $coLOR 被视作三个不同的变量。


## PHP 变量

变量是存储信息的容器。

### PHP 变量

正如代数，PHP 变量可用于保存值（x = 5）和表达式（z = x + y）。

变量的名称可以很短（比如 x 和 y），也可以取更具描述性的名称（比如 carname、total_volume）。

### PHP 变量规则：

  * 变量以 $ 符号开头，其后是变量的名称
  * 变量名称必须以字母或下划线开头，不能以数字开头
  * 变量名称只能包含字母、数字、字符和下划线（A-z、0-9 以及 _）
  * 变量名称对大小写敏感（$y 与 $Y 是两个不同的变量）

### 创建 PHP 变量

PHP 没有创建变量的命令。变量会在首次为其赋值时被创建：

注释：如果您为变量赋的值是文本，请用引号包围该值。

### PHP 是一门类型松散的语言

PHP 中，我们不必告知 PHP 变量的数据类型。PHP 会根据它的值，自动把变量转换为正确的数据类型。

而在诸如 C 和 C++ 以及 Java 之类的语言中，程序员必须在使用变量之前声明它的名称和类型。

### PHP 变量作用域

在 PHP 中，可以在脚本的任意位置对变量进行声明。

变量的作用域指的是变量能够被引用/使用的那部分脚本。

PHP 有三种不同的变量作用域：

  * local（局部）
  * global（全局）
  * static（静态）

### Local 和 Global 作用域

函数_之外_声明的变量拥有 Global 作用域，只能在函数以外进行访问。

函数_内部_声明的变量拥有 Local 作用域，只能在函数内部进行访问。

```php
$x = 5;      // 全局作用域

function myTest() {
  $y = 10;   // 局部作用域
  echo "变量 x 是：$x";  // 无法读取全局变量 $x 的值
  echo "变量 y 是：$y";
}

myTest();
echo "变量 x 是：$x";
echo "变量 y 是：$y";    // 无法读取局部变量 $y 的值
```

注释：您可以在不同的函数中创建名称相同的局部变量，因为局部变量只能被在其中创建它的函数识别。

### PHP `global` 关键词

global 关键词用于从函数内部访问全局变量。要做到这一点，请在（函数内部）变量前面使用 global 关键词：

```php
$x=5;
$y=10;
function myTest() {
  global $x, $y;  // 经试验，发现用 global 声明时，不能同时给变量赋值，必须分开写。
  $y = $x + $y;
}
myTest();
echo $y;         // 输出 15
```

PHP 同时在名为 $GLOBALS[index]
的数组中存储了所有的全局变量。下标存有变量名。这个数组在函数内也可以访问，并能够用于直接更新全局变量。上面的例子可以这样重写：

```php
$x=5;
$y=10;
function myTest() {
  $GLOBALS['y'] = $GLOBALS['x'] + $GLOBALS['y'];
}
myTest();
echo $y;  // 输出 15
```

### PHP static 关键词

通常，当函数完成/执行后，会删除所有局部变量。不过有时我们需要保留某个局部变量。

要完成这一点，请在您首次声明变量时使用 `static` 关键词：

```php
function myTest() {
  static $x=0;  // 变量只在声明时赋值一次，局部变量产生后，变量值不再受此声明影响
  echo $x; $x++;
}
myTest();       // 输出 0
myTest();       // 输出 1
```

然后，每当函数被调用时，**这个变量所存储的信息都是函数最后一次被调用时所保留的信息**。

注释：但该变量仍然是函数的局部变量。


## PHP 5 echo 和 print 语句

在 PHP 中，有两种基本的输出方法：echo 和 print。

### echo 和 print 之间的差异

  * echo - 能够输出一个以上的字符串
  * print - 只能输出一个字符串，并始终返回 1

提示：echo 比 print 稍快，因为它不返回任何值。

echo 和 print 都是语言结构，有无括号均可使用：echo 或 echo()。

### 显示字符串和变量

```php
echo "<h3>PHP is fun!</h3>";  // 请注意字符串中能包含 HTML 标记
echo "This" . " string" . "was", " made", " with multiple parameters.";
  // 使用连字符 `.` 连起来的是一个字符串; 用 `,` 串起来的则表示多个字符串同时输出
$txt1 = "Learn PHP";
$cars = array("Volvo", "BMW", "SAAB");
echo $txt1;
echo "My car is a {$cars[0]}";  // 变量可以直接放在字符串内部，这体现了 PHP 灵活的一面
$txt = "W3School.com.cn";
print "Study PHP at $txt";
print "tex1 "."text2";          // 如果写成'print "tex1 ","text2";' 则会报错!
```


## PHP 数据类型

字符串、整数、浮点数、逻辑、数组、对象、NULL。

### PHP 字符串

字符串是字符序列，比如 "Hello world!"。

字符串可以是引号内的任何文本。您可以使用单引号或双引号。

### PHP 整数

整数是没有小数的数字。整数规则：

  * 整数必须有至少一个数字（0-9）
  * 整数不能包含逗号或空格
  * 整数不能有小数点
  * 整数正负均可
  * 可以用三种格式规定整数：十进制、十六进制（前缀是 0x）或八进制（前缀是 0）

```php
$x = 5985; var_dump($x);  // var_dump() 会返回变量的数据类型和值
$x = -345; var_dump($x);  // 负数
$x = 0x8C; var_dump($x);  // 十六进制数
$x = 047;  var_dump($x);  // 八进制数
```

### PHP 浮点数

浮点数是有小数点或指数形式的数字。

```php
$x = 10.365; var_dump($x);
$x = 2.4e3; var_dump($x);
$x = 8E-5; var_dump($x);
```

### PHP 逻辑

逻辑是 true 或 false。逻辑常用于条件测试。`$x = true; $y = false;`

### PHP 数组

数组在一个变量中存储多个值。

```php
$cars = array("Volvo", "BMW", "SAAB"); var_dump($cars);
```

### PHP 对象

对象是存储数据和有关如何处理数据的信息的数据类型。

在 PHP 中，必须明确地声明对象。首先我们必须声明对象的类。对此，我们使用 class 关键词。类是包含属性和方法的结构。然后我们在对象类中定义数据类型，然后在该类的实例中使用此数据类型：

```php
class Car {
  var $color;
  function Car($color="green") {
    $this->color = $color;
  }
  function what_color() {
    return $this->color;
  }
}
```

### PHP NULL 值

特殊的 NULL 值表示变量无值。NULL 是数据类型 NULL 唯一可能的值。

NULL 值标示变量是否为空。也用于区分空字符串与空值数据库。

可以通过把值设置为 NULL，将变量清空：

```php
$x = "Hello world!"; $x = null; var_dump($x);
```

## PHP 字符串函数

字符串是字符序列，比如 "Hello world!"。本节将学习常用的字符串函数。

### PHP strlen() 函数

strlen() 函数返回字符串的长度，以字符计。

```php
echo strlen("Hello world!");  // 输出为 12
```

提示：strlen() 常用于循环和其他函数。例如，在循环中，也许需要在字符串的最后一个字符之后停止循环。

### PHP strpos() 函数

strpos() 函数用于检索字符串内指定的字符或文本。

如果找到匹配，则会返回首个匹配的字符位置。如果未找到匹配，则将返回 FALSE。

```php
echo strpos("Hello world!","world");  // 输出为 6
```

提示：上例中字符串 "world" 的位置是 6 而不是 7，理由是，字符串中首字符的位置是 0 而不是 1。

## PHP 常量

常量类似变量，但是常量一旦被定义就无法更改或撤销定义。

### PHP 常量

常量是单个值的标识符（名称）。在脚本中无法改变该值。

有效的常量名以字符或下划线开头（常量名称前面没有 $ 符号）。

注释：与变量不同，常量贯穿整个脚本是自动全局的。

### 设置 PHP 常量

如需设置常量，请使用 define() 函数 - 它使用三个参数：

  1. 首个参数定义常量的名称
  2. 第二个参数定义常量的值
  3. 可选的第三个参数规定常量名是否对大小写不敏感。默认是 false，即默认对大小写敏感。

```php
define("HelloWorld", "Hello World!");  //对大小写敏感
define("GREETING", "Welcome to W3School.com.cn!", true);  //对大小写不敏感
```

注释：习惯上，常量名全部采用大写字母。


## PHP 运算符

本节展示了可用于 PHP 脚本中的各种运算符.

### PHP 算数运算符

运算符 | 名称 | 例子 | 结果
:-----:| ---- | ---- | ----
+ | 加法 | $x + $y | $x 与 $y 求和
- | 减法 | $x - $y | $x 与 $y 的差数
* | 乘法 | $x * $y | $x 与 $y 的乘积
/ | 除法 | $x / $y | $x 与 $y 的商数
% | 模数 | $x % $y | $x 除 $y 的余数

### PHP 赋值运算符

PHP 赋值运算符用于向变量写值。

赋值 | 等同于 | 描述
---- | ------ | ----
x = y  | x = y     | 右侧表达式为左侧运算数设置值。
x += y | x = x + y | 加
x -= y | x = x - y | 减
x *= y | x = x * y | 乘
x /= y | x = x / y | 除
x %= y | x = x % y | 模数


### PHP 字符串运算符

运算符 | 名称 | 例子 | 结果
:-----:| ---- | ---- | ----
 .     | 串接     | $txt1="Hi"; $txt2=$txt1." world!" | 现在$txt2包含 "Hi world!"
 .=    | 串接赋值 | $txt1="Hi"; $txt1.=" world!"      | 现在$txt1包含 "Hi world!"

### PHP 递增/递减运算符

运算符 | 名称 | 描述
------ | ---- | -----
++$x | 前递增 | $x 加1递增，然后返回 $x
$x++ | 后递增 | 返回 $x，然后 $x 加1递增
--$x | 前递减 | $x 减1递减，然后返回 $x
$x-- | 后递减 | 返回 $x，然后 $x 减1递减

### PHP 比较运算符

PHP 比较运算符用于比较两个值（数字或字符串）：

运算符 | 名称 | 例子 | 结果
:-----:| ---- | ---- | -----
==  | 等于         | $x == $y  | 如果 $x 等于 $y，则返回 true
=== | 完全相等(同) | $x === $y | 如果 $x 等于 $y，且类型相同，则返回 true
!=  | 不等于       | $x != $y  | 如果 $x 不等于 $y，则返回 true
<>  | 不等于       | $x <> $y  | 如果 $x 不等于 $y，则返回 true
!== | 完全不等(同) | $x !== $y | 如果 $x 不等于 $y，且类型不相同，则返回 true
\>  | 大于         | $x > $y   | 如果 $x 大于 $y，则返回 true
<   | 大于         | $x < $y   | 如果 $x 小于 $y，则返回 true
\>= | 大于或等于   | $x >= $y  | 如果 $x 大于或者等于 $y，则返回 true
<=  | 小于或等于   | $x <= $y  | 如果 $x 小于或者等于 $y，则返回 true

### PHP 逻辑运算符

运算符 | 名称 | 例子      | 结果
------ | ---- | --------- | -----
and    | 与   | $x and $y | 如果 $x 和 $y 都为 true，则返回 true
or     | 或   | $x or $y  | 如果 $x 和 $y 至少有一个为 true，则返回 true
xor    | 异或 | $x xor $y | 如果 $x 和 $y 有且仅有一个为 true，则返回 true
&&     | 与   | $x && $y  | 如果 $x 和 $y 都为 true，则返回 true
&#124;&#124; | 或  | $x &#124;&#124; $y| 如果 $x 和 $y 至少有一个为 true，则返回 true
!      | 非   | !$x       | 如果 $x 不为 true，则返回 true

### PHP 数组运算符

PHP 数组运算符用于比较数组：

运算符 | 名称   | 例子      | 结果
------ | ------ | --------- | ----
+      | 联合   | $x + $y   | $x 和 $y 的联合（但不覆盖重复的键）
==     | 相等   | $x == $y  | 如果 $x 和 $y 拥有相同的键/值对，则返回 true
===    | 全等   | $x === $y |如果 $x 和 $y 拥有相同的键/值对，且顺序相同类型相同，则返回 true
!=     | 不相等 | $x != $y  | 如果 $x 不等于 $y，则返回 true
<>     | 不相等 | $x <> $y  | 如果 $x 不等于 $y，则返回 true
!==    | 全不等 | $x !== $y | 如果 $x 与 $y 完全不同，则返回 true

下例展示了使用不同数组运算符的不同结果：

```php
$x = array("a" => "red",  "b" => "green"); 
$y = array("b" => "blue", "d" => "yellow"); 
$z = $x + $y;  // $x 与 $y 的联合，特意修改了示例，$y 中的 "b" 不会覆盖 $x 中的 "b"
var_dump($z);
var_dump($x == $y);
var_dump($x !== $y);
```

## PHP 条件语句

在 PHP 中，我们可以使用以下条件语句：

  * _if 语句_ \- 如果指定条件为真，则执行代码
  * _if...else 语句_ \- 如果条件为 true，则执行代码；如果条件为 false，则执行另一端代码
  * _if...elseif....else 语句_ \- 选择若干段代码块之一来执行
  * _switch 语句_ \- 选择语句多个代码块之一来执行

### Switch 语句

如果您希望有选择地执行若干代码块之一，请使用 Switch 语句。

使用 Switch 语句可以避免冗长的 if..elseif..else 代码块。

```php
switch (expression) {
  case label1:
    // code to be executed if expression = label1;
    break;
  case label2:
    // code to be executed if expression = label2;
    break;
  default:
    // code to be executed if expression is different from both label1 and label2;
}
```

工作原理：

  1. 对表达式（通常是变量）进行一次计算
  2. 把表达式的值与结构中 case 的值进行比较
  3. 如果存在匹配，则执行与 case 关联的代码
  4. 代码执行后，_break 语句 _阻止代码跳入下一个 case 中继续执行
  5. 如果没有 case 为真，则使用 default 语句

## PHP 循环语句

编写代码时经常需要反复执行同一代码块，我们使用循环来完成这样的任务。PHP 中有以下循环语句：

  * _while_ \- 只要指定条件为真，则循环代码块
  * _do...while_ \- 先执行一次代码块，然后只要指定条件为真则重复循环
  * _for_ \- 循环代码块指定次数
  * _foreach_ \- 遍历数组中的每个元素并循环代码块

### PHP while 循环

只要指定的条件为真，while 循环就会执行代码块。

while (条件为真) { 要执行的代码; }

### PHP do...while 循环

do...while 循环首先会执行一次代码块，然后检查条件，如果指定条件为真，则重复循环。

do { 要执行的代码; } while (条件为真);

请注意，do while 循环只在执行循环内的语句之后才对条件进行测试。这意味着 do while 循环至少会执行一次语句，即使条件测试在第一次就失败了。

### PHP for 循环

如果您已经提前确定脚本运行的次数，可以使用 for 循环。

```php
for (init counter; test counter; increment counter) { code to be executed; }
for ($x=0; $x<=10; $x++) { echo "数字是：$x <br>"; }
```

### PHP foreach 循环

foreach 循环只适用于数组，并用于遍历数组中的每个键/值对。

```php
foreach ($array as $value) {
  // code to be executed;
}
```

每进行一次循环迭代，当前数组元素的值就会被赋值给 $value 变量，并且数组指针会逐一地移动，直到到达最后一个数组元素。

## PHP 函数

PHP 的真正力量来自它的函数：它拥有超过 1000 个内建的函数。

### PHP 用户定义函数

除了内建的 PHP 函数，我们可以创建我们自己的函数。

函数是可以在程序中重复使用的语句块。

页面加载时函数不会立即执行，只有在被调用时才会执行。

### 在 PHP 创建用户定义函数

用户定义的函数声明以关键字 "function" 开头：

```php
function functionName() { /* 被执行的代码; */ }
```

注释：函数名能够以字母或下划线开头（而非数字）。   
注释：函数名对大小写不敏感。   
提示：函数名应该能够反映函数所执行的任务。

### PHP 函数参数

可以通过参数向函数传递信息。参数类似变量。

参数被定义在函数名之后，括号内部。您可以添加任意多参数，只要用逗号隔开即可。

```php
function familyName($fname, $year) {
  echo "$fname Zhang. Born in $year <br>";
}
familyName("Li","1975");
familyName("Hong","1978");
```

### PHP 默认参数值

下面的例子展示了如何使用默认参数。如果我们调用没有参数的 setHeight() 函数，它的参数会取默认值：

```php
function setHeight($minheight = 50) {
  echo "The height is : $minheight <br>";
}
setHeight(350);
setHeight(); // 将使用默认值 50
```

### PHP 函数 - 返回值

如需使函数返回值，请使用 return 语句：

## PHP 数组

数组能够在单独的变量名中存储一个或多个值。

### 在 PHP 中创建数组

在 PHP 中， array() 函数用于创建数组：

在 PHP 中，有三种数组类型：

  * _索引数组_ \- 带有数字索引的数组
  * _关联数组_ \- 带有指定键的数组
  * _多维数组_ \- 包含一个或多个数组的数组

### PHP 索引数组

有两种创建索引数组的方法：

索引是自动分配的（索引从 0 开始）：

```php
$cars = array("Volvo", "BMW", "SAAB");
```

或者也可以手动分配索引：

```php
$cars[0] = "Volvo";
$cars[1] = "BMW";
$cars[2] = "SAAB";
```

### 获得数组的长度 - count() 函数

```php
$cars = array("Volvo", "BMW", "SAAB");
echo count($cars);  // 输出 3
```

### 遍历索引数组

如需遍历并输出索引数组的所有值，您可以使用 for 循环，就像这样：

```php
$cars = array("Volvo", "BMW", "SAAB");
$arrlength = count($cars);
for ($x=0; $x < $arrlength; $x++) {
  echo $cars[$x], "<br>";
}
```

### PHP 关联数组

关联数组是使用您分配给数组的指定键的数组。

有两种创建关联数组的方法：

```php
$age = array("Peter" => "35", "Ben" => "37", "Joe" => "43");  // 或者：
$age['Peter'] = "35"; $age['Ben'] = "37"; $age['Joe'] = "43";
```

### 遍历关联数组

如需遍历并输出关联数组的所有值，您可以使用 foreach 循环，就像这样：

```php
$age = array("Bill" => "35", "Steve" => "37", "Peter" => "43");
foreach($age as $x => $x_value) {
  echo "Key=" . $x . ", Value=" . $x_value . "<br>";
}
```

### 多维数组

我们将在 PHP 高级教程中讲解多维数组。

### 完整的 PHP 数组参考手册

如需完整的数组函数参考手册，请访问 [PHP 数组参考手册](/php/php_ref_array.asp)。

## PHP 数组排序

数组中的元素能够以字母或数字顺序进行升序或降序排序。

### PHP - 数组的排序函数

  * sort() - 以升序对数组排序
  * rsort() - 以降序对数组排序
  * asort() - 根据值，以升序对关联数组进行排序
  * ksort() - 根据键，以升序对关联数组进行排序
  * arsort() - 根据值，以降序对关联数组进行排序
  * krsort() - 根据键，以降序对关联数组进行排序

### 对数组进行升序排序 - sort()

```php
$cars = array("Volvo", "BMW", "SAAB");
sort($cars);
$numbers = array(3, 5, 1, 22, 11);
sort($numbers);
```

### 根据值对数组进行升序排序 - asort()

```php
$age = array("Bill" => "35", "Steve" => "37", "Peter" => "43");
asort($age);
```

### 根据键对数组进行降序排序 - krsort()

```php
$age = array("Bill" => "35", "Steve" => "37", "Peter" => "43");
krsort($age);
```

### 完整的 PHP 数组参考手册

如需完整的数组函数参考手册，请访问 [PHP 数组参考手册](http://www.w3schools.com/php/php_ref_array.asp)。

## PHP 全局变量 - 超全局变量

超全局变量 在 PHP 4.1.0 中引入，是在全部作用域中始终可用的内置变量。

PHP 中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可用。在函数或方法中无需执行 `global $variable;` 就可以访问它们。这些超全局变量是：

  * $GLOBALS
  * $_SERVER
  * $_REQUEST
  * $_POST
  * $_GET
  * $_FILES
  * $_ENV
  * $_COOKIE
  * $_SESSION

本节会介绍一些超全局变量，并会在稍后的章节讲解其他的超全局变量。

### $GLOBALS — 引用全局作用域中可用的全部变量

$GLOBALS 这种全局变量用于在 PHP 脚本中的任意位置访问全局变量（从函数或方法中均可）。

PHP 在名为 $GLOBALS[index] 的数组中存储了所有全局变量。变量的名字就是数组的键。

下面的例子展示了如何使用超级全局变量 $GLOBALS：

```php
$x = 75;
$y = 25;
function addition() {
  $GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y'];
}
addition();
echo $z;  // 由于 z 是 $GLOBALS 数组中的变量，因此在函数之外也可以访问它
```

### PHP $_SERVER

$_SERVER 这种超全局变量保存关于报头、路径和脚本位置的信息。

下面的例子展示了如何使用 $_SERVER 中的某些元素：

```php
echo $_SERVER['PHP_SELF'], "<br>";
echo $_SERVER['SERVER_NAME'], "<br>";
echo $_SERVER['HTTP_HOST'], "<br>";
echo $_SERVER['HTTP_REFERER'], "<br>";
echo $_SERVER['HTTP_USER_AGENT'], "<br>";
echo $_SERVER['SCRIPT_NAME'];
```

下表列出了您能够在 $_SERVER 中访问的最重要的元素：

元素/代码 | 描述
--------- | -----
$_SERVER['PHP_SELF'] | 返回当前执行脚本的文件名。
$_SERVER['GATEWAY_INTERFACE'] | 返回服务器使用的 CGI 规范的版本。
$_SERVER['SERVER_ADDR']       | 返回当前运行脚本所在的服务器的 IP 地址。
$_SERVER['SERVER_NAME']       | 返回当前运行脚本所在的服务器的主机名（比如 www.w3school.com.cn）。
$_SERVER['SERVER_SOFTWARE']   | 返回服务器标识字符串（比如 Apache/2.2.24）。
$_SERVER['SERVER_PROTOCOL']   | 返回请求页面时通信协议的名称和版本（例如，“HTTP/1.0”）。
$_SERVER['REQUEST_METHOD']    | 返回访问页面使用的请求方法（例如 POST）。
$_SERVER['REQUEST_TIME']      | 返回请求开始时的时间戳（例如 1577687494）。
$_SERVER['QUERY_STRING']      | 返回查询字符串，如果是通过查询字符串访问此页面。
$_SERVER['HTTP_ACCEPT']       | 返回来自当前请求的请求头。
$_SERVER['HTTP_ACCEPT_CHARSET'] | 返回来自当前请求的 Accept_Charset 头（ 例如 utf-8,ISO-8859-1）
$_SERVER['HTTP_HOST']         | 返回来自当前请求的 Host 头。
$_SERVER['HTTP_REFERER']      | 返回当前页面的完整 URL（不可靠，因为不是所有用户代理都支持）。
$_SERVER['HTTPS']             | 是否通过安全 HTTP 协议查询脚本。
$_SERVER['REMOTE_ADDR']       | 返回浏览当前页面的用户的 IP 地址。
$_SERVER['REMOTE_HOST']       | 返回浏览当前页面的用户的主机名。
$_SERVER['REMOTE_PORT']       | 返回用户机器上连接到 Web 服务器所使用的端口号。
$_SERVER['SCRIPT_FILENAME']   | 返回当前执行脚本的绝对路径。
$_SERVER['SERVER_ADMIN']      | 该值指明了 Apache 服务器配置文件中的 SERVER_ADMIN 参数。
$_SERVER['SERVER_PORT']       | Web 服务器使用的端口。默认值为 “80”。
$_SERVER['SERVER_SIGNATURE']  | 返回服务器版本和虚拟主机名。
$_SERVER['PATH_TRANSLATED']   | 当前脚本所在文件系统（非文档根目录）的基本路径。
$_SERVER['SCRIPT_NAME']       | 返回当前脚本的路径。
$_SERVER['SCRIPT_URI']        | 返回当前页面的 URI。

### PHP $_REQUEST

PHP $_REQUEST 用于收集 HTML 表单提交的数据。

下面的例子展示了一个包含输入字段及提交按钮的表单。当用户通过点击提交按钮来提交表单数据时, 表单数据将发送到 form 标签的 action 属性中指定的脚本文件。在这个例子中，我们指定文件本身来处理表单数据。如果您需要使用其他的 PHP 
文件来处理表单数据，请修改为您选择的文件名即可。然后，我们可以使用超级全局变量 $_REQUEST 来收集 input 字段的值：

```html
<html>
<body>
<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  Name: <input type="text" name="fname"> <input type="submit">
</form>
<?php $name = $_REQUEST['fname']; echo $name; ?>
</body>
</html>
```

### PHP $_POST

PHP $_POST 广泛用于收集提交 method="post" 的 HTML 表单后的表单数据。$_POST 也常用于传递变量。

### PHP $_GET

PHP $_GET 也可用于收集提交 HTML 表单 (method="get") 之后的表单数据。

