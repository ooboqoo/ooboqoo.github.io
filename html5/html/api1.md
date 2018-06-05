# LocalStorage / Cookies / IndexDB


## Cookies

在 HTML5 之前，Web 应用程序通用的数据存储方案一般通过 Cookie 实现。不过，将数据存储在 Cookie 中有如下弊端：
  * 大小受限，标准浏览器下单个 Cookie 允许的大小是 **4KB**
  * 消耗性能，当前域下的所有 HTTP 请求都会携带这些 Cookie 数据

```js
// 设置 Cookies
function setCookie(name, value, expiredays) {
  let exp = new Date();
  exp.setDate(exp.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) +
    (expiredays === undefined ? '' : ';expires=' + exp.toUTCString());
}

// 读取 Cookies
function getCookie(name) {
  let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg)) return unescape(arr[2]);
}

// 删除 Cookies
function delCookie(name) {
  document.cookie = name + '=del' + ';expires=' + new Date().toUTCString();
}

//使用示例
setCookie('name', 'gavin', 25);
```


## Local Storage

详细文档请参阅： [Mozilla Using_the_Web_Storage_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

在 HTML5 之前，应用数据只能通过 Cookies 保存，而 Cookies 的数据会被包含在每个请求的头部，既影响性能还不安全。

HTML5 引入了 LocalStorage，其中数据不会被包含在请求头部，这样既安全，存储容量也可以更大(多数浏览器设为 5M)。

同源(同域名 + 同协议)的页面可以共享 LocalStorage 中的数据。

### Browser Support

Web Storage: Chrome 4.0; IE 8.0; Firefox 3.5; Safari 4.0; Opera 11.5

### HTML Local Storage Objects

HTML local storage provides two objects for storing data on the client:

* `window.localStorage` - stores data with no expiration date
* `window.sessionStorage` - stores data for one session (data is lost when the browser tab is closed)

### The localStorage Object 本地存储

Storage objects are simple key-value stores, similar to objects, but they stay intact through page loads.

The keys can be strings or integers, but the values are always strings (所以如果是数字的话，每次都要进行转换).

You can access these values like an object, or with the `getItem()` and `setItem()` methods.

```js
// 可以有 3 种方式存储数据
localStorage.user_name = nameInput.value;            // 属性名方式
localStorage['user_name'] = nameInput.value;         // 索引方式
localStorage.setItem('user_name', nameInput.value);  // setItem() 方式
let userName = localStorage.getItem('user_name');    // 读取数据也有3种方式，略
localStorage.removeItem('user_name');  // 删除条目
localStorage.clear();                  // 清空所有条目
```

提示：存储数据时建议你选择长键名，如 `mazeGame_currentX`，可以尽量避免发生命名冲突。

#### 查找所有的数据项（遍历）

可以使用 `key()` 方法从本地或会话存储中取得（当前网站保存的）所有数据项。

```js
for ( let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);         // 取得当前位置数据项的键
  let item = localStorage.getItem(key);  // 取得以该键保存的数据值
  let newItem = document.createElement('li');
  newItem.innerHTML = key + ': ' + item;
  itemList.appendChild(newItem);
}
```

#### 类型转换

在通过 `localStorage` 和 `sessionStorage` 保存数据时，该数据会被自动转换为字符串。所以读取数据后需要将其转换到原类型，这里提供一些参考：

* 数字直接使用 `Number()` 函数转换
* 日期对象用 `new Date()` 转换
* 对象先调用 `JSON.stringify()` 转换为文本，再调用 `JSON.parse()` 把文本转换回对象

#### 响应存储变化

当 Storage object 发生改变时，同源的页面会触发 StorageEvent，而修改 Storage 的页面不会触发该事件。这个机制是用来实现同源各个页面的同步的。

```js
window.addEventListener('storage', function(e) {
  console.log(`Attributes { ${e.key} ${e.oldValue} ${e.newValue} ${e.url} ${e.storageArea} }`);
});
```

### The sessionStorage Object 会话存储

从页面代码的角度说，本地存储和会话存储的操作完全相同。它们的区别仅在于数据的寿命。本地存储主要用于保存访客将来还能看到的数据，而会话存储则用于保存那些需要从一个页面传递给下一个页面的数据。（当然，使用会话存储也可以保存只在一个页面中使用
的数据，但这个任务就算普通的 JavaScript 变量也绝对可以胜任，又何必多此一举呢。）


## IndexDB：浏览器的数据库引擎

这一切看起来很完美，但是随着前端的不断发展，Web Storage 也有了一些不太合适的地方:
  * 随着 Web 应用程序的不断发展，5M 的存储大小对于一些大型的 Web 应用程序来说有些不够
  * Web Storage 只能存储 string 类型的数据。对于 Object 类型的数据只能先用 `JSON.stringify()` 转换后再存储

(其他内容移到数据库部分了...)


## 读取文件 File API

File API 并不是 HTML5 规范的内容，但得到了现代浏览器较好的支持，它规定了怎么从硬盘上提取文件。

注意，File API 不是为了向服务器提交文件设计的，文件会被直接交给 JavaScript 代码。

### 取得文件

在通过 File API 操作文件之前，首先必须取得文件。为此，有三种方式可以选择；实际上，归根结底只有一种方式，那就是必须由访客自己选择文件然后提交给你。这三种方式如下。

* 使用 input 元素。将其 type 属性设置为 file 这样就能得到一个标准的上传文件框。不过，编写一点 JavaScript 来利用 File API，就可以在本地打开文件。
* 隐藏的 input 元素。嫌 input 元素太难看？为了保证风格一致，可以把 input 元素隐藏起来，显示一个漂亮的按钮。用户单击按钮，就通过 JavaScript 调用隐藏的 input 元素的 click() 方法。这样就会显示标准的文件选择对话框。
* 拖放。如果浏览器支持拖放，可以从桌面或资源管理器中把文件拖放到网页上。

```html
<script>
function processFiles(files) {
  var file = files[0];  
  var reader = new FileReader();
  reader.onload = function (e) {
    var output = document.getElementById("fileOutput");   
    output.textContent = e.target.result;
  };
  reader.readAsText(file);
}
function showFileInput() {  // 对应方法2，本例没用该函数
  var fileInput = document.getElementById("fileInput");
  fileInput.click();
}
</script>
<body>
  <input id="fileInput" type="file" size="50" onchange="processFiles(this.files)">
  <div id="fileOutput"></div>
</body>
```
