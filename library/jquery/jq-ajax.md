# jQuery Ajax


## Shorthand Methods

### jQuery.get()

```js
jQuery.get(url: String [, data: Object|String ] [, success: Function ] [, dataType: String ] ) : jqXHR
    data: 如果是对象会自动转成查询字符串，GET 会添加到 URL 而 POST 则放到请求体中发送。
    success: Function(data: Object|String, textStatus: String, jqXHR: jqXHR)
    dataType: 'xml'|'json'|'script'|'text'|'html'
jQuery.get([settings]) : jqXHR
```

### jQuery.post()

```js
jQuery.post(url [, data ] [, success ] [, dataType ] ) : jqXHR
jQuery.post([settings]) : jqXHR
```

POST 请求的内容都不会缓存，所以 `cache` `ifModified` 选项对 POST 无效。

### jQuery.getJSON()

```js
jQuery.getJSON(url [, data ] [, success: Function(data: JSONObject, textStatus, jqXHR) ]) : jqXHR
```

```js
getJSON: function ( url, data, callback ) {
  return jQuery.get( url, data, callback, "json" );
}
```


### jQuery.getScript()

```js
jQuery.getScript(url [, success: Function(script: String, textStatus: String, jqXHR: jqXHR) ]) : jqXHR
```

```js
getScript: function ( url, callback ) {
  return jQuery.get( url, undefined, callback, "script" );
}
```

```js
// test.js
console.log('test.js');

// 测试
window.xhr2 = $.getScript('test.js', function success(script, textStatus, jqXHR) {
    window.xhr1 = jqXHR; console.log('success')
}).done(function (script, textStatus, jqXHR) {
    console.log(xhr1 === jqXHR);
});
// 输出
test.js   // 脚本会先执行
success   // 然后 success 执行
true      // success 和 done 中的 jqXHR 是同一个，而他们的返回值也是 jqXHR，即 xhr1 === xhr2
```


### .load()

选择集内容为空时, 调用会被忽略; url 支持 `test.html #part1` 格式截取部分内容; 如果使用截取格式，script 标签内容不会执行，否则会执行一次(跟选择项数目无关)。callback 在完成内容插入后才会执行，选择集有几项就执行几次(this 会变化)。


## Low-Level Interface

### $.ajax()

#### beforSend

xhr.setRequestHeader 设置多次时，会将对此设置值合并
$.ajax() 中的 beforeSend 中无法删除已经设置过的头部项目内容，只能添加


### jqXHR

http://api.jquery.com/jQuery.ajax/#jqXHR

jqXHR 是 Promise 和 XMLHttpRequest 的超集：

```js
    // Fake xhr
    jqXHR = {
      readyState: 0,
      // ...
    };

    // Attach deferreds
    deferred = jQuery.Deferred();
    deferred.promise(jqXHR);
```


### jQuery.ajaxPrefilter()

### jQuery.ajaxSetup()

### jQuery.ajaxTransport()





## Helper Functions

### jQuery.param()

### .serialize()

### .serializeArray()


## Global Ajax Event Handlers

通过 jQuery 的 Ajax 请求都会调用这些全局钩子，自己通过 XMLHttpRequest 发的请求不会触发。

全局钩子必须挂到 `document` 上，如 `$(document).ajaxComplete(function () {  })`，否则无效。

如 `$.ajax()` or `$.ajaxSetup()` 设置了 `global` 选项为 `false`，或者是跨域请求都不会触发全局钩子。

### .ajaxComplete()

### .ajaxError()

### .ajaxSend()

### .ajaxStart()

### .ajaxStop()

### .ajaxSuccess()

