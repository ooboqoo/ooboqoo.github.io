# 前端性能优化

[2018前端性能优化清单_en](https://www.smashingmagazine.com/2018/01/front-end-performance-checklist-2018-pdf-pages/) / 
[2017前端性能优化清单_zh](http://web.jobbole.com/91025/)  
[移动 H5 前端性能优化指南](https://zhuanlan.zhihu.com/p/25176904)

性能卓越的网站往往可以给访问者留下良好的印象，因此更容易积累庞大的用户和受众群体，这是关乎网站成败的关键因素之一。


### 优化的方法

1. 指定优化目标。目标需要是具体的，可度量的。比如，在 50Kb 每秒的网络环境下，加载首屏所用时间少于 2 秒。
2. 从大头去优化。如果提高页面加载速度，考虑优化加载时间最长的资源。如果要提高代码运行速度，考虑优化最耗时的操作。
3. 制定和实施优化策略。
4. 验证。


## 加载优化

### 连接优化

* 减少 HTTP 请求数
  - 原因：手机浏览器同时响应请求为4个请求（Android支持4个，iOS 5后可支持6个）
  - 目标：尽量减少页面的请求数，首次加载同时请求数不能超过4个
  - 途径：
    * 合并 CSS、JavaScript
    * 合并小图片，使用雪碧图或图标字体
    * 体积比较小的图片可以考虑内联
    * 避免空的 src 和 href
    * 避免重定向 - 重定向会影响加载速度，所以在服务器正确设置避免重定向

* 减少 DNS 查找时间
  - 原因：
  - 途径：减少域名数量；设置 DNS 预解析




### 传输优化

#### 缓存

使用缓存可以减少向服务器的请求数，节省加载时间，所以所有静态资源都要在服务器端设置缓存，并且尽量使用长Cache（长Cache资源的更新可使用时间戳）
a) 缓存一切可缓存的资源
b) 使用长Cache（使用时间戳更新Cache）
c) 使用外联式引用CSS、JavaScript

* HTTP 的缓存。
* 强缓存。
* 协商缓存。

#### 压缩

HTML、CSS、JavaScript
减少资源大小可以加快网页显示速度，所以要对HTML、CSS、JavaScript等进行代码压缩，并在服务器端设置GZip
a) 压缩（例如，多余的空格、换行符和缩进）
b) 启用GZip
* 删除无用的代码。
· 图片尽量避免使用DataURL
DataURL图片没有使用图片的压缩算法文件会变大，并且要解码后再渲染，加载慢耗时长

· 尽量避免重设图片大小
重设图片大小是指在页面、CSS、JavaScript等中多次重置图片大小，多次重设图片大小会引发图片的多次重绘，影响性能

  压缩代码（js、css、html）
  压缩图片
  使用 svg 代替位图
  使用 css sprite
  服务器启用 gzip 压缩

* 选择合适的图片格式。考虑用 Webp 格式的图片。

#### 其他

* 使用 CDN
* 减少Cookie - Cookie会影响加载速度，所以静态资源域名不使用 Cookie

#### HTTP2 Server Push

https://www.ruanyifeng.com/blog/2018/03/http2_server_push.html

服务器推送是 HTTP/2 协议里面唯一一个需要开发者自己配置的功能，其他功能都是服务器和浏览器自动实现。

方式一：Nginx 直接配置服务器推送

```nginx
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    http2_push /style.css;
    http2_push /example.png;
}
```

方式二：在应用服务器中配置服务器推送

```js
// Node.js Demo

// TODO
```

### 加载优化

* 无阻塞
写在HTML头部的JavaScript（无异步），和写在HTML标签中的Style会阻塞页面的渲染，因此CSS放在页面头部并使用Link方式引入，避免在HTML标签中写Style，JavaScript放在页面尾部或使用异步方式加载

* 无阻塞加载 Script。

* 首屏优化
  - 首屏的一些 CSS 可以考虑内联


· 压缩图片
图片是最占流量的资源，因此尽量避免使用他，使用时选择最合适的格式（实现需求的前提下，以大小判断），合适的大小，然后使用智图压缩，同时在代码中用Srcset来按需显示
PS：过度压缩图片大小影响图片显示效果
a) 使用智图（ http://zhitu.isux.us/ ）
b) 使用其它方式代替图片(1. 使用CSS3 2. 使用SVG 3. 使用IconFont)
c) 使用Srcset
d) 选择合适的图片(1. webP优于JPG 2. PNG8优于GIF)
e) 选择合适的大小（1. 首次加载不大于1014KB 2. 不宽于640（基于手机屏幕一般宽度）



* CSS 写在 `<head>` 中，JS 写在 `</body>` 前。


  使用另外一个子域名或单独域名来存储静态资源，减少网络传输量（比如cookie），当然最好不要超过3个
  域名，因为太多域名的话花在DNS解析的时间就很客观了，反而得不偿失

```html
<!-- 京东金融首页优化项介绍 -->
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">  <!-- IE 优化 -->
  <meta name="renderer" content="webkit">  <!-- 双核浏览器优化 -->
  <meta http-equiv="x-dns-prefetch-control" content="on"> <!-- 强制打开 a 标签域名预解析 -->
  <link rel="dns-prefetch" href="//static.360buyimg.com"> <!-- DNS 预解析 -->
</head>
```







## CSS优化

· 尽量避免写在HTML标签中写Style属性

· 移除空的CSS规则
空的CSS规则增加了CSS文件的大小，且影响CSS树的执行，所以需移除空的CSS规则

· 正确使用Display的属性
Display属性会影响页面的渲染，因此请合理使用
a) display:inline后不应该再使用width、height、margin、padding以及float
b) display:inline-block后不应该再使用float
c) display:block后不应该再使用vertical-align
d) display:table-*后不应该再使用margin或者float

· 不滥用Float
Float在渲染时计算量比较大，尽量减少使用

· 不滥用Web字体
Web字体需要下载，解析，重绘当前页面，尽量减少使用

· 不声明过多的Font-size
过多的Font-size引发CSS树的效率

· 值为0时不需要任何单位
为了浏览器的兼容性和性能，值为0时不要带单位

· 标准化各种浏览器前缀
a) 无前缀应放在最后
b) CSS动画只用 （-webkit- 无前缀）两种即可
c) 其它前缀为 -webkit- -moz- -ms- 无前缀 四种，（-o-Opera浏览器改用blink内核，所以淘汰）

· 避免让选择符看起来像正则表达式
高级选择器执行耗时长且不易读懂，避免使用

* 如果需要动态更改 CSS 样式，尽量采用触发 reflow 次数较少的方式。
* 选择器优化。
* 避免使用 CSS 表达式。

## JS 优化

* 尽量少的操作 dom，多次 dom 操作合成一次
* 缓存一些耗性能的中间结果。
* 将耗时的任务交给 worker 来做。
* 防止内存泄漏。
* 优化耗时的循环。
* 算法改进。

· 减少重绘和回流
a) 避免不必要的Dom操作
b) 尽量改变Class而不是Style，使用classList代替className
c) 避免使用document.write
d) 减少drawImage

· 缓存Dom选择与计算
每次Dom选择都要计算，缓存他

· 缓存列表.length
每次.length都要计算，用一个变量保存这个值

· 尽量使用事件代理，避免批量绑定事件

· 尽量使用ID选择器
ID选择器是最快的

· TOUCH事件优化
使用touchstart、touchend代替click，因快影响速度快。但应注意Touch响应过快，易引发误操作


## 渲染优化

· HTML使用Viewport
Viewport可以加速页面的渲染，请使用以下代码

```html
<meta name=”viewport” content=”width=device-width, initial-scale=1″>
```

· 减少Dom节点
Dom节点太多影响页面的渲染，应尽量减少Dom节点

· 动画优化
a) 尽量使用CSS3动画
b) 合理使用requestAnimationFrame动画代替setTimeout
c) 适当使用Canvas动画 5个元素以内使用css动画，5个以上使用Canvas动画（iOS8可使用webGL）

· 高频事件优化
Touchmove、Scroll 事件可导致多次渲染
a) 使用requestAnimationFrame监听帧变化，使得在正确的时间进行渲染
b) 增加响应变化的时间间隔，减少重绘次数

· GPU加速
CSS中以下属性（CSS3 transitions、CSS3 3D transforms、Opacity、Canvas、WebGL、Video）来触发GPU渲染，请合理使用
PS：过度使用会引发手机过耗电增加


## HTTP 协议头缓存


## 资源按需加载


## 不同网络类型的优化


## 性能优化工具

* [YSlow](http://yslow.org/) 分析网站，提出提升网站性能的建议。
* [阿里测](http://alibench.com/) 网站在不同地区的访问情况。
* Chrome 开发工具中的 Profiles 和 Timeline。
* [jsPerf](http://jsperf.com/) JS 执行效率测试。
* [Benchmark.js](https://benchmarkjs.com/) 同 jsPerf。

### HTTP 2

由于 HTTP/1 协议本身的限制，一个 TCP 连接在同一时刻只能进行一个 HTTP 请求与响应，故需要通过减少 HTTP 请求数来提升网站性能。正因为 HTTP/1 的这个缺点，新的 HTTP/2 协议加入了 TCP 连接的多路复用，即可在一个 TCP 连接中完成所有的 HTTP 请求。同时，新的 HTTP/2 协议使用二进制数据压缩 HTTP 头，减少如 Cookie 过大导致的传输性能问题。

Google开始向着更安全网页的方向努力，并且将所有Chrome上的HTTP网页定义为“不安全”时，你或许应该考虑是继续使用HTTP/1.1，还是将目光转向HTTP/2环境。虽然初期投入比较大，但是使用HTTP/是大趋势，而且在熟练掌握之后，你可以使用service worker和服务器推送技术让行性能再提升一大截。


### 懒加载

即使是这样做完，仍然还存在着一个很大的优化空间，那就是很多页面浏览量很大，但其实用户直接很大比例直接就跳走了，第一屏以下的内容用户根本就不感兴趣。 对于超大流量的网站如淘宝、新浪等，这个问题尤其重要。这个时候一般是通过将图片的src标签设置为一个loading或空白的样式，在用户翻页将图片放入可见区或即将放入可见区时再去载入。主要意图还是降低带宽费用。

指定图像和tables的大小
如果浏览器可以立即决定图像或tables的大小，那么它就可以马上显示页面而不要重新做一些布局安排的工作这不仅加快了页面的显示，也预防了页面完成加载后布局的一些不当的改变


## HTML页面加载和解析流程

1.用户输入网址（假设是个html页面，并且是第一次访问），浏览器向服务器发出请求，服务器返回html文件；
2.浏览器开始载入html代码，发现＜head＞标签内有一个＜link＞标签引用外部CSS文件；
3.浏览器又发出CSS文件的请求，服务器返回这个CSS文件；
4.浏览器继续载入html中＜body＞部分的代码，并且CSS文件已经拿到手了，可以开始渲染页面了；
5.浏览器在代码中发现一个＜img＞标签引用了一张图片，向服务器发出请求。此时浏览器不会等到图片下载完，而是继续渲染后面的代码；
6.服务器返回图片文件，由于图片占用了一定面积，影响了后面段落的排布，因此浏览器需要回过头来重新渲染这部分代码；
7.浏览器发现了一个包含一行Javascript代码的＜script＞标签，赶快运行它；
8.Javascript脚本执行了这条语句，它命令浏览器隐藏掉代码中的某个＜div＞ （style.display=”none”）。杯具啊，突然就少了这么一个元素，浏览器不得不重新渲染这部分代码；
9.终于等到了＜/html＞的到来，浏览器泪流满面……
10.等等，还没完，用户点了一下界面中的“换肤”按钮，Javascript让浏览器换了一下＜link＞标签的CSS路径；
11.浏览器召集了在座的各位＜div＞＜span＞＜ul＞＜li＞们，“大伙儿收拾收拾行李，咱得重新来过……”，浏览器向服务器请求了新的CSS文件，重新渲染页面。



### 加载试验

```html
<!DOCTYPE html>
<style>
#app {
  background-image: url(./very-large-picture.jpg);
}
</style>

<div id="app"></div>
<script>console.log('index-1')</script>
<script src="app.js"></script>
<script>console.log('index-2')</script>
```

_app.js_

```js
window.addEventListener('DOMContentLoaded', () => console.log('ready'))
window.addEventListener('load', () => console.log('loaded'))

console.log('app-1')
const s = document.createElement('script'); s.src = './abb.js'
document.head.appendChild(s)
console.log('app-2')
```

_abb.js_

```js
console.log('abb')
```

文件加载顺序：index.html app.js very-large-picture.jpg abb.js
控制台输出：index-1 app-1 app-2 index-2 ready abb (大图加载完后)loaded
