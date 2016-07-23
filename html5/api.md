# HTML APIs - Local Storage / Cookies / IndexDB

## Local Storage

详细文档请参阅： [Mozilla Using_the_Web_Storage_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

在 HTML5 之前，应用数据只能通过 cookies 保存，而 cookies 的数据会被包含在每个 request 的头部，即影响性能还不安全。

HTML5 引入了 local storage，其中数据不会被包含在请求头部，这样既安全，存储容量也可以更大（多数浏览器设为 5M）。

同源（同域名 + 同协议）的页面可以共享 local storage 中的数据。

### Browser Support

Web Storage: Chrome 4.0; IE 8.0; Firefox 3.5; Safari 4.0; Opera 11.5

### HTML Local Storage Objects

HTML local storage provides two objects for storing data on the client:

* window.localStorage - stores data with no expiration date
* window.sessionStorage - stores data for one session (data is lost when the browser tab is closed)

### The localStorage Object 本地存储

Storage objects are simple key-value stores, similar to objects, but they stay intact through page loads.

The keys can be strings or integers, but the values are always strings（所以如果是数字的话，每次都要进行转换）.

You can access these values like an object, or with the getItem() and setItem() methods.

```js
// 可以有 3 种方式存储数据
localStorage.user_name = nameInput.value;  // 属性名方式
localStorage['user_name'] = nameInput.value;  // 索引方式
localStorage.setItem('user_name', nameInput.value);  // setItem() 方式
let userName = localStorage.getItem('user_name');  // 读取数据也有3种方式，略
localStorage.removeItem('user_name');  // 删除条目
localStorage.clear();  // 清空所有条目
```

提示：存储数据时建议你选择长键名，如 mazeGame_currentX，可以尽量避免发生命名冲突。

#### 查找所有的数据项（遍历）

可以使用 key() 方法从本地或会话存储中取得（当前网站保存的）所有数据项。

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

在通过 localStorage 和 sessionStorage 保存数据时，该数据会被自动转换为字符串。所以读取数据后需要将其转换到原类型，这里提供一些参考：

* 数字直接使用 Number() 函数转换
* 日期对象用 new Date() 转换
* 对象先调用 JSON.stringify() 转换为文本，再调用 JSON.parse() 把文本转换回对象

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

## Cookies

```js
// 设置 cookies
function setCookie(name, value, expiredays) {
  let exp = new Date();
  exp.setDate(exp.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) +
    (expiredays === undefined ? '' : ';expires=' + exp.toUTCString());
}

// 读取 cookies
function getCookie(name) {
  let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg)) return unescape(arr[2]);
}

// 删除 cookies
function delCookie(name) {
  document.cookie = name + '=del' + ';expires=' + new Date().toUTCString();
}

//使用示例
setCookie('name', 'gavin', 25);
```

## 读取文件 File API

File API 并不是 HTML5 规范的内容，但得到了现代浏览器较好的支持，它规定了怎么从硬盘上提取文件。

注意，File API不是为了向服务器提交文件设计的，文件会被直接交给 JavaScript 代码。

### 取得文件
在通过 File API 操作文件之前，首先必须取得文件。为此，有三种方式可以选择；实际上，归根结底只有一种方式，那就是必须由访客自己选择文件然后提交给你。这三种方式如下。

* 使用 &lt;input&gt; 元素。将其 type 属性设置为 file 这样就能得到一个标准的上传文件框。不过，编写一点 JavaScript 来利用 File API，就可以在本地打开文件。
* 隐藏的 &lt;input&gt; 元素。嫌 &lt;input&gt; 元素太难看？为了保证风格一致，可以把 &lt;input&gt; 元素隐藏起来，显示一个漂亮的按钮。用户单击按钮，就通过 JavaScript 调用隐藏的 &lt;input&gt; 元素的 click() 方法。这样就会显示标准的文件选择对话框。
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

## IndexDB：浏览器的数据库引擎

IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. This API uses indexes to enable high performance searches of this data. While DOM Storage is useful for storing smaller amounts of data, it is less useful for storing larger amounts of structured data. IndexedDB provides a solution.

* IndexedDB 是浏览器端（客户端）的数据库；
* IndexedDB 是基于对象的 NoSQL 数据库（对象存储 + 事务 + 请求 + 异步）；
* IndexedDB 同样具有跨域限制；

IndexedDB 在其他一些特定场景下很有用：创建自给自足的离线应用；优化性能； 改进本地存储

IndexedDB 存储在几个重要方面表现得很像本地存储。最重要的是，一个IndexedDB数据库属于某个个人，使用特定的电脑和特定的浏览器，访问特定的网站。任何一项有变化（比如切换浏览器，用另一个账号登录，或者换用手机访问），网页都会对应一个新的 IndexedDB 数据库。

学习IndexedDB可能会让人怯步。首先，标准很复杂（一些苛刻的开发者用丑陋来形容）。Web开发者负责创建数据库，构建它的数据表，并且给它们填充数据。其次，IndexedDB使用异步模式，这意味着数据库任务在后台运行，不会阻塞代码运行或锁定页面。缺点就是这种更复杂的模式会让代码分散到不同地方。比如，开始一个数据库任务的代码和处理这个任务结果的代码不在一个地方。要理出这些代码块的执行顺序并且理解它们如何组合到一起，还是要花点精力的。

### Is IndexedDB Right for My Application?
<cite>from：[Introduction to IndexedDB: The In-Browser Database](http://www.codemag.com/article/1411041) 注：代码写得很漂亮！</cite>

The first place you might look when attempting to persist data on the client is HTML5 local storage. Local storage enjoys widespread browser adoption and features a ridiculously easy-to-use API. The simplicity has its advantages, but liabilities are found in its inability to support complex search strategies, store large sets of data, and provide transactional support.

IndexedDB is a database. So when you’re trying to make a decision about the client, consider how you might select a database as a persistence medium on the server. Questions you may ask yourself to help determine if a client-side database is right for your application include:

* Do your users access your application with browsers that support the IndexedDB API?
* Do you need to store a significant amount of data on the client?
* Do you need to quickly locate individual data points within a large set of data?
* Does your architecture require transactional support on the client?

总结：local stroage 够用的话，就不用 indexedDB，如果决定采用 indexedDB，那么原生 API 也不是最佳选择，可以考虑使用 localForage 或 dexie.js 代码更加简洁高效。

### 相关资源：
[Mozilla IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)   
[localForage](https://mozilla.github.io/localForage/?javascript#localforage): A Polyfill providing a simple name:value syntax for client-side data storage, which uses IndexedDB in the background, but falls back to WebSQL and then localStorage in browsers that don't support IndexedDB.   
[dexie.js](http://dexie.org/): A wrapper for IndexedDB that allows much faster code development via nice, simple syntax.

 