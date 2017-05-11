<style>
  sub { margin-left: 1em; padding: 0 .5em; background-color: #cec; border-radius: .25em; }
  a > code { background-color: initial; }
</style>

# 雅虎性能优化 35 条

https://developer.yahoo.com/performance/rules.html#page-nav  
http://www.cnblogs.com/smjack/archive/2009/02/24/1396895.html

共 35 条，分 7 个类别：Content Server Cookie CSS JavaScript Images Mobile

* [1 减少 HTTP 请求数量 -- Minimize HTTP Requests](#h-1)
* [2 使用内容分布式网络 -- Use a Content Delivery Network](#h-2)
* [3 响应头部添加 `Expires` 或 `Cache-Control` -- Add an Expires or a Cache-Control Header](#h-3)
* [4 Gzip 压缩组件 -- Gzip Components](#h-4)
* [5 样式表放顶部 -- Put Stylesheets at the Top](#h-5)
* [6 脚本放最后 -- Put Scripts at the Bottom](#h-6)
* [7 避免使用 CSS 表达式  -- Avoid CSS Expressions](#h-7)
* [8 使用外联 JS 和 CSS -- Make JavaScript and CSS External](#h-8)
* [9 减少 DNS 查询 -- Reduce DNS Lookups](#h-9)
* [10 压缩 JS 和 CSS -- Minify JavaScript and CSS](#h-10)
* [11 避免重定向 -- Avoid Redirects](#h-11)
* [12 移除重复的脚本 -- Remove Duplicate Scripts](#h-12)
* [13 设定 `ETag`s -- Configure `ETag`s](#h-13)
* [14 让 Ajax 可以缓存 -- Make Ajax Cacheable](#h-14)
* [15 尽早向客户端推送已处理内容 -- Flush the Buffer Early](#h-15)
* [16 在 Ajax 请求中使用 GET 方法 -- Use GET for AJAX Requests](#h-16)
* [17 延后加载组件 -- Post-load Components](#h-17)
* [18 预先加载组件 -- Preload Components](#h-18)
* [19 减小 DOM 元素的数量 -- Reduce the Number of DOM Elements](#h-19)
* [20 分域部署资源 -- Split Components Across Domains](#h-20)
* [21 减少 iframe 的数量 -- Minimize the Number of iframes](#h-21)
* [22 避免 404 错误 -- No 404s](#h-22)
* [23 减少 Cookie 的大小 -- Reduce Cookie Size](#h-23)
* [24 使用没有 cookie 的域名存取资源 -- Use Cookie-free Domains for Components](#h-24)
* [25 合并 DOM 操作 -- Minimize DOM Access](#h-25)
* [26 开发灵巧的事件处理程序 -- Develop Smart Event Handlers](#h-26)
* [27 选择 `<link>` 而不是 `@import` -- Choose `<link>` over `@import`](#h-27)
* [28 避免使用过滤器(IE 特有，略) -- Avoid Filters](#h-28)
* [29 优化图片 -- Optimize Images](#h-28)
* [30 优化雪碧图 -- Optimize CSS Sprites](#h-29)
* [31 不要在 HTML 中缩放图片 -- Don't Scale Images in HTML](#h-30)
* [32 使用小的可缓存的 Favicon.ico -- Make favicon.ico Small and Cacheable](#h-31)
* [33 保证组件大小小于 25K -- Keep Components under 25K](#h-32)
* [34 把组件打包进多部分文档中 -- Pack Components into a Multipart Document](#h-33)
* [35 避免 `img` 标签的 `src` 属性为空 -- Avoid Empty Image src](#h-34)


### 1. Minimize HTTP Requests  <sub>content</sub>

页面加载过程中，很大一部分时间花在资源下载上，如果能够简化设计那是最好，在此之外，我们还有以下优化手段来减少请求次数：

##### 合并文件

合并 JS CSS 文件 + 利用图标字体 + 背景图片使用雪碧图

CSS Sprites are the preferred method for reducing the number of image requests. Combine your background images into a single image and use the CSS `background-image` and `background-position` properties to display the desired image segment.

##### 内联文件

Inline images use the [data: URL scheme](http://tools.ietf.org/html/rfc2397) to embed the image data in the actual page. This can increase the size of your HTML document. Combining inline images into your (cached) stylesheets is a way to reduce HTTP requests and avoid increasing the size of your pages. Inline images are not yet supported across all major browsers.

减少请求次数显然是重要的优化，特别是对于首次访问的用户(他们没有本地缓存)，将大大提升用户体验。

### 2. Use a Content Delivery Network  <sub>server</sub>

作为实现地理上分散内容的第一步，请勿尝试分布式架构，这可能包含令人生畏的任务。先分散静态内容，这不仅可以大大减少响应时间，还可以通过 CDN 轻松实现。对于初创公司租用 CDN 的成本会比较高，但如果目标受众日益庞大，那么这是非常划算的。

### 3. Add an `Expires` or a `Cache-Control` Header  <sub>server</sub>

* For static components: implement "Never expire" policy by setting far future `Expires` header
* For dynamic components: use an appropriate `Cache-Control` header to help the browser with conditional requests

```
Expires: Thu, 15 Apr 2010 20:00:00 GMT
Cache-Control: max-age=3600, must-revalidate
```

`Expires` 是最基本的控制缓存的方法，这个属性告诉缓存器相关副本在多长时间内是新鲜的，过了这个时间就要向服务器确认是否有新的版本。大部分服务器都支持多种设置方式，一般地可以设置一个绝对的时间间隔。

`Cache-Control` 是 HTTP1.1 中引入的，功能更强，响应头可以包含 `max-age` `no-cache` 等，如果同时存在 `Cache-Control` 和 `Expires` 头，后者会被忽略。

缓存对首次访问用户是无效的，但对于经常访问的用户，可以大大提升性能，像 Yahoo 可以做到 75-85% 的复用。

对于长时间的缓存，如果缓存其内有更新，那么就需要改变文件名，有两种方式：实际改变文件名 `yahoo_2.0.6.js` 或者请求是添加参数 `/images/img101.jpg?20120511`。

### 4. Gzip Components  <sub>server</sub>

浏览器在发送请求时，会在头部发送支持的接收格式，如 `Accept-Encoding: gzip, deflate`。服务器收到后会选择其中一个格式，并在返回头中指定内容压缩格式，如 `Content-Encoding: gzip`。

使用 gzip 可以将体积减小大概 70%，这是相当明显的性能提升。压缩 HTML 脚本 样式表 以及 XML 和 JSON 等文本格式，效果是非常明显的，但像 图片 和 pdf 等内容，本身已经压缩过了，再压缩只会拜拜浪费计算资源。

### 5. Put Stylesheets at the Top  <sub>css</sub>

将样式表放在头部，可实现网页渐进渲染。当网页由上至下逐步渲染时，用户可以立即看到已渲染部分效果，这在网速慢时尤其有用。

如果将样式表放在底部，有些浏览器会阻止渐进渲染，等待样式表解析完后才渲染，这种情况下，页面加载过程中用户只能看到白屏。

```html
<!DOCTYPE html>
<html>
<head>
  <style>div { color: red; }</style>
  <title>css test</title>
</head>
<body>
  <div>some text here</div>
  <script>debugger;</script>
  <style>div { border: 1px solid green; }</style>
  <div>other text</div>
</body>
</html>
```

### 6. Put Scripts at the Bottom  <sub>javascript</sub>

在以前，HTTP1.1 建议浏览器每个 hostname 下不要并行下载两个以上资源，碰到 script，则直接阻塞，没有并行下载。
现代浏览器都进行了调整，单个地址的并行下载量增多，script 也不会阻塞下载进程(但仍然会阻塞解析进程)。
但无论如何，将 script 放到页面底部加载可加快页面整体加载进度。

### 7. Avoid CSS Expressions  <sub>css</sub>

这已是历史问题，现在没有这种用法。

```
background-color: expression( (new Date()).getHours()%2 ? "#B8D4FF" : "#F08A00" );
```

`expression` 里的代码的执行次数远比你想象的要频繁，即使是鼠标在页面上随意的移动就可能产生上万次的运算。

### 8. Make JavaScript and CSS External  <sub>javascript, css</sub>

这里的很多规则都讨论如何有效管理外部资源，但同时你有没考虑过 脚本和样式表等的 外部导入和内联 之间的区别？

html 文件每次都要重新加载，如果资源内嵌在 html 中，那么每次也被重新加载，而如果单独提取，则只在首次加载时加载，后续可以直接调用缓存。

对于首页(首屏)，可能是个例外，我们希望尽快展示给用户，则采用内联(以减少HTTP请求数)方式会更快些。一个比较好的做法是，首屏的内容全部采用内联，然后在首屏完成后立即在后台加载(并缓存到本地)其他常用脚本和样式文件，这样后续页面加载也会大大加速。

### 9. Reduce DNS Lookups  <sub>content</sub>

Domain Name System (DNS) 能够使网址和 IP 相对应。浏览器拿到网址后，需要通过 DNS 解析为 IP 后才开始加载资源，解析一般需要花费 20-120ms。

当客户端的 DNS 缓存被清空，DNS查询的数量等同于网页中单独的域名的数量。包括页面中的链接，图片，脚本文件，样式表等。减少不同域名的数量则会减少DNS查询的数量。

需要注意的是，减少域名的数量可能减少页面并行的下载数量。减少DNS查询缩短了响应时间，但减少了并行下载数也许会增加响应时间。综合考虑，将资源分布在两到四个域名之间，这能很好的折中减少DNS查询提高的速度和维持较高水平的并行下载的效果。

### 10. Minify JavaScript and CSS  <sub>javascript, css</sub>

压缩指从代码中删除不必要的字母，减少文件体积从而提高加载速度。缩减代码时需要移除所有的注释以及不需要的空白。

混淆是另一个可用于源代码的优化方案，它比压缩更为复杂，而且在混淆的过程中更容易产生Bug。压缩可获得 20% 左右的体积减小而混淆则能达到 25%左右。虽然代码混淆的压缩程度更高，但压缩JavaScript的风险更小。

不仅仅要压缩外部的脚本和样式表，内联的 `<script>` 和 `<style>` 部分也可以而且应当被压缩。即使你 gzip 了脚本和样式，压缩它们仍然能减小 5% 以上的体积。

### 11. Avoid Redirects  <sub>content</sub>

可以通过向客户端发送 301 或 303 头部，甚至是使用 meta refresh 标签 或用 JavaScript 实现重定向。

使用重定向使得页面加载延后，这是可以避免的浪费。

一种不易引起注意的情况是，当用户键入 `http://astrology.yahoo.com/astrology` 时，服务器会返回重定向到 `http://astrology.yahoo.com/astrology/` (注意最后的 `/`)，其实这种浪费是可以在服务器设置避免的。

使用重定向的另一个常见场景是连接旧网站和新网站。还包括连接网站的不同部分，或者在不同情况下（比如依据浏览器的类型，用户的类型等）重定向用户。虽然使用重定向减少了开发者的麻烦，但却降低了用户体验。如果在同一个服务器，可以使用 `Alias` 和 `mod_rewrite` 来替代重定向。如果域名变更引起了重定向，可以创建一个 CNAME（域名设置）结合 `Alias` 或 `mod_rewrite` 来替代重定向。

```html
<meta http-equiv="refresh" content="5; url=http://example.com/">
```

```text
  HTTP/1.1 301 Moved Permanently
  Location: http://example.com/newuri
  Content-Type: text/html
```

### 12. Remove Duplicate Scripts  <sub>javascript</sub>

包含重复的脚本，这往往出现在大的网站上。当脚本被重复包含时，由于增加了不必要的HTTP请求和JavaScript的执行，影响了性能。

### 13. Configure ETags  <sub>server</sub>

实体标签 `ETag`s 是服务器和浏览器用于确定浏览器中缓存的组件和服务器中的是否对应的一种机制。`ETag`s 比 `Last-Modified` 更为灵活。它的唯一格式规范是字符串必须被加引用。

``` 
  HTTP/1.1 200 OK 
  Last-Modified: Tue, 12 Dec 2006 03:03:59 GMT 
  ETag: "10c24bc-4ab-457e1c1f" 
  Content-Length: 12195
```

当浏览器晚些时候需要检测一个组件时，它使用 `If-None-Match` 头部把 `ETag` 传给服务器验证，如果匹配就返回 304： 

```
  GET /i/yahoo.gif HTTP/1.1 
  Host: us.yimg.com 
  If-Modified-Since: Tue, 12 Dec 2006 03:03:59 GMT 
  If-None-Match: "10c24bc-4ab-457e1c1f" 
```

如果只是在一台服务器部署，那么 `Etag` 可以很好的验证资源是否需要更新。但如果网站部署在多台服务器，那么对于同一个文件，每台服务器默认生成的 `Etag` 是不同的，这样就失效了，所以不如直接在服务器配置中移除 `Etag` 来减小请求和响应头部(此时只能靠 `Last-Modified` 验证了)。

### 14. Make Ajax Cacheable  <sub>content</sub>

尽管 Ajax 请求是动态创建的，而且只适用于一个用户，但它们依然可以被缓存，这样做会让你的 Web2.0 应用程序更快。

### 15. Flush the Buffer Early  <sub>server</sub>

当用户请求一个页面，服务端会花费 200 -500ms 的时间组合 HTML 页面。在这期间，浏览器会静静等待数据到来。PHP中有 `flush()` 函数，它允许你向浏览器发送部分就绪的 HTML 响应，这样浏览器和服务器就可以同时工作了。

### 16. Use GET for AJAX Requests  <sub>server</sub>

POST 方法在浏览器中分两步执行：先发送头部，然后发送数据。所以最好使用只发送一个TCP包的GET方法。

### 17. Post-load Components  <sub>content</sub>

跟首次渲染有关的资源须优先加载，而其他资源，如用于功能增强的 JS、隐藏的内容等，则应延后加载。

### 18. Preload Components  <sub>content</sub>

预加载组件让你可以利用浏览器的空闲时间来加载之后需要的组件，如图片、样式表和脚本。这样当用户浏览下一个页面的时候，大部分组件都已经在缓存里了。有几种预加载的类型：
  - 无条件预加载 - 加载完成时立刻开始获取一些额外的组件。
  - 有条件的预加载 - 根据用户的行为来猜测用户什么时候到达下个页面然后据此预加载。
  - 有预期的加载 - 如网站改版后，在用户浏览老版时开始加载新版资源。

### 19. Reduce the Number of DOM Elements  <sub>content</sub>

复杂的页面意味着更多的字节需要被下载，也意味着在 JS 中遍历 DOM 更慢。像雅虎首页这么复杂的页面也就 700 来个标签(元素)。可以通过 `document.getElementsByTagName('*').length` 获取标签数量，如果过多就得检查下是否有不妥的用法了。

### 20. Split Components Across Domains  <sub>content</sub>

将资源分别部署到不同域名下可获得最大的并行下载效率。例如，你可以将 HTML 内容和动态组件放于 www.example.org 域名下，将静态组件放到 static1.example.org 和 static2.example.org 下。

### 21. Minimize the Number of iframes  <sub>content</sub>

`<iframe>` 的优点：
  - 便于第三方内容，如广告
  - 提供安全沙箱
  - 能够并行下载脚本

`<iframe>` 的缺点：
  - 比较耗资源，即便是空的
  - 阻塞父页面的 `onload` 事件
  - 非语义化

### 22. No 404s  <sub>content</sub>

HTTP 请求资源是很金贵的，404 错误响应只会白白浪费资源。如果在请求 JS 文件时返回 404，不仅可能阻塞加载进程，浏览器还得去分析返回内容是否是可执行代码。

### 23. Reduce Cookie Size  <sub>cookie</sub>

cookie 会包含在每个 HTTP 请求头中，所以应尽量减小其尺寸。

### 24. Use Cookie-free Domains for Components  <sub>cookie</sub>

对于一些静态资源，服务器根本不需要使用 cookie 信息。所以将静态资源部署到一个没有设置 cookie 的域名下可以避免带宽资源浪费。采用这种方式的另外一个原因是，一些代理服务器会拒绝缓存通过带 cookie 请求的资源。

### 25. Minimize DOM Access  <sub>javascript</sub>

JS 操作 DOM 是很慢的，所以应尽量减少 DOM 操作：
  - Cache references to accessed elements
  - Update nodes "offline" and then add them to the tree
  - Avoid fixing layout with JavaScript

### 26. Develop Smart Event Handlers  <sub>javascript</sub>

添加一大堆事件处理函数会拖慢整个页面，使用事件代理明显是更好的选择。

另外，你也无需等待 `onload` 才去操作 DOM 树，如果 JS 文件紧挨着 `</body>`，那么其实所有元素都已经可用了，其他情况则可以采用监听 `DOMContentLoaded` 事件来替代监听 `onload`。

### 27. Choose `<link>` over `@import`  <sub>css</sub>

在 IE 中 `@import` 的资源会放到最后加载，所以最好不要用它。另外提醒下，使用 `@import` 必须放在容器头部否则无效。

### 29. Optimize Images  <sub>images</sub>

当设计师完成图片后，请不要急于 FTP 到服务器，先进行些必要的优化工作，如，将非动画的 GIF 图片转为 PNG，这一般可以压缩尺寸，另外，JPEG 图片也可以利用压缩工具进行瘦身。

### 30. Optimize CSS Sprites  <sub>images</sub>

* 横向布局往往比纵向布局占用更小的空间
* 组合相近的颜色 ... PNG8
* 图片间的间距不要太大，这虽然对文件体积影响不大，但对客户端内存的消耗却很明显

### 31. Don't Scale Images in HTML  <sub>images</sub>

虽然你可以将一张 500*500px 的图片设置为 100*100px 显示，但应该尽量避免这样做。

```
<img width="100" height="100" src="mycat.jpg" alt="My Cat" />
```

### 32. Make favicon.ico Small and Cacheable  <sub>images</sub>

网站图标有时显得有些邪恶，它必须位于网站根目录，而且名称无法改变，如果该文件不存在，浏览器还是会时不时地尝试去抓取该文件。所以最好的办法时，对 favicon.ico 设置一个较长的过期时间。当然，时间也不能太长，因为你无法通过更改文件名(文件名是固定的)来迫使浏览器更新图标内容。

### 33. Keep Components under 25K  <sub>mobile</sub>

iPhone 不会缓存 25K 以上的内容，而且这还是解压后的尺寸，这也正是 gzip 之外还需要 minification 的原因。

### 34. Pack Components into a Multipart Document  <sub>mobile</sub>

把组件打包进多部分文档类似一封包含有附件的邮件，它能让你通过一个HTTP请求获取多个组件（记住HTTP请求是很昂贵的）。当你使用这一技术，请先检查客户端是否支持它(iPone不支持)。

### 35. Avoid Empty Image src  <sub>server</sub>

空的 `src` 属性还是会导致一次 HTTP 请求，所以请避免此类情况。

```text
// HTML
<img src="">

// JavaScript
var img = new Image();
img.src = "";
```








