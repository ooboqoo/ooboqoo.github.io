# 面试题库 - HTML


### 性能优化之 `<link>`

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link

* `<link rel="preload">` 提前声明当前页面要用的资源，让浏览器 *马上* 开始下载作业
* `<link rel="prefetch">` 后面页面要用的，让浏览器在 *空闲* 时先准备好

#### `<link rel="stylesheet">`

根据不同的媒体类型加载不同的样式文件。不符合要求的文件不会下载。

```html
<link href="print.css" rel="stylesheet" media="print">
<link href="mobile.css" rel="stylesheet" media="all">
<link href="desktop.css" rel="stylesheet" media="screen and (min-width: 600px)">
<link href="highres.css" rel="stylesheet" media="screen and (min-resolution: 300dpi)">
```

### 性能优化之 `<script>`

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script

* async 下载完后马上执行，但不阻塞页面渲染流程
* defer 在页面 document parsed 之后才执行，在完成下载和执行前 `DOMContentLoaded` 不会触发

在 同步 script 中再插入 `<script>` 会是什么效果？
* 通过 `document.createElement('script')` 插入的脚本默认 `async="true"`
* 如果改成 `async="false"` ...

### crossorigin 属性

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
```

这是 BootstrapCDN 的引用链接，有两个额外的属性 `integrity` `crossorigin`。`integrity` 用于校验资源完整性，如果不匹配浏览器会阻止脚本运行。`crossorigin` 则告诉浏览器请求资源时不要传 Cookie 信息。详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)

### XMLHttpRequest

```js
 function GetWebData(URL){
    /**
     * 1: 新建 XMLHttpRequest 请求对象
     */
    let xhr = new XMLHttpRequest()

    /**
     * 2: 注册相关事件回调处理函数 
     */
    xhr.onreadystatechange = function () {
        switch(xhr.readyState){
          case 0: // 请求未初始化
            console.log(" 请求未初始化 ")
            break;
          case 1://OPENED
            console.log("OPENED")
            break;
          case 2://HEADERS_RECEIVED
            console.log("HEADERS_RECEIVED")
            break;
          case 3://LOADING  
            console.log("LOADING")
            break;
          case 4://DONE
            if(this.status == 200||this.status == 304){
                console.log(this.responseText);
                }
            console.log("DONE")
            break;
        }
    }

    xhr.ontimeout = function(e) { console.log('ontimeout') }
    xhr.onerror = function(e) { console.log('onerror') }

    /**
     * 3: 打开请求
     */
    xhr.open('Get', URL, true);// 创建一个 Get 请求, 采用异步


    /**
     * 4: 配置参数
     */
    xhr.timeout = 3000 // 设置 xhr 请求的超时时间
    xhr.responseType = "text" // 设置响应返回的数据格式，可用 "text" "json" "document" "blob" "arraybuffer"
    xhr.setRequestHeader("X_TEST","time.geekbang")

    /**
     * 5: 发送请求
     */
    xhr.send();
}
```