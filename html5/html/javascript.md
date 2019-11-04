# JavaScript


## DOM







## BOM

The Browser Object Model (BOM) allows JavaScript to "talk to" the browser.


## AJAX

AJAX(Asynchronous JavaScript and XML) 即异步的 JavaScript 和 XML。

AJAX 是与服务器交换数据并更新部分网页(不重新加载整个页面)的艺术。

XMLHttpRequest 是 AJAX 的基础。

```js
function showHint(str) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'gethint.php?q=' + str, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById('txtHint').innerHTML = xmlhttp.responseText;
        }
    }
}
```


## JSON

JSON(JavaScript Object Notation)，即 JavaScript 对象表示法，是一种轻量级的文本数据交换格式，独立于语言。

对于 AJAX 应用程序来说，JSON 比 XML 更快更易使用。

JSON 文件的文件类型是 `.json`，MIME 类型是 `application/json`。

### 语法规则

JSON 语法是 JavaScript 对象表示法语法的子集。
* 数据在名称/值对中
* 数据由逗号分隔
* 花括号保存对象
* 方括号保存数组

JSON 值可以是：
* 数字（整数或浮点数）
* 字符串（在双引号中）
* 逻辑值（true 或 false）
* 数组（在方括号中）
* 对象（在花括号中）
* null
