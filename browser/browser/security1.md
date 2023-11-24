# 浏览器安全

这部分主要讲页面安全。

* XSS 跨站脚本攻击，就是通过 JS 脚本偷用户的登录态信息，并上传到黑客后台
  - 存储型：例如在论坛中通过发帖向站点注入脚本
  - 反射型：通过链接注入恶意脚本，黑客需要诱导用户点击链接
* CSRF 跨站请求伪造，就是在黑客站点直接向被攻击站点发送转账请求。只要保护好用户登录态+额外校验步骤就无碍


## 同源策略

页面安全主要是基于同源策略实施的。*同源策略*会隔离不同源的 *DOM操作、页面数据、网络请求*，进而实现 Web 页面安全。

绝对的安全就要牺牲掉便利性，我们需要在这二者之间做权衡，找到中间的一个平衡点，也就是目前的页面安全策略原型。

* 允许页面引用第三方资源，不过这也暴露了诸多安全问题，因此又在此基础上引入了 CSP 来限制其自由程度。
* 阻止 XMLHttpRequest 和 Fetch 的跨域请求，但在这种严格策略的基础之上引入了跨域资源共享策略。
* 阻止不同源页面互相操作 DOM，但又实现了跨文档消息机制，让其可以比较安全地通信。

### 如果没有页面安全策略

如果没有页面安全策略的话，当你打开了一个银行站点，然后又一不小心打开了一个恶意站点，恶意站点就可以做很多事情，如
* 修改银行站点的 DOM、CSSOM 等信息
* 在银行站点内部插入 JavaScript 脚本
* 劫持用户登录的用户名和密码
* 读取银行站点的 Cookie、IndexDB 等数据
* 甚至还可以将这些信息上传至自己的服务器，这样就可以在你不知情的情况下伪造一些转账请求等

所以说，在没有安全保障的 Web 世界中，我们是没有隐私的，因此需要安全策略来保障我们的隐私和数据的安全。这就引出了页面中最基础、最核心的安全策略：同源策略（Same-origin policy）。

### 同源策略

如果两个 URL 的 *协议、域名、端口* 都相同，我们就称这两个 URL 同源。

浏览器默认两个同源页面之间是可以相互访问资源，两个不同源页面之间若想要相互访问资源则会有一套基础的安全策略制约，我们把这称为 **同源策略**。具体来讲，同源策略主要表现在 DOM、Web 数据和网络这三个层面。

#### 隔离 DOM 操作

同源策略限制了来自不同源的 JavaScript 脚本对当前 DOM 对象读和写的操作。

```js
opener.document.body.style.display = "none"
```

当我们在 A 页面中点击链接打开 B 页面后，在 B 页面中执行以上代码，如果两个页面是同源的，那么代码正常执行，如果非同源，代码就会报错。

#### 隔离 Web 数据访问

同源策略限制了不同源的站点读取当前站点的 Cookie、IndexDB、LocalStorage 等数据。如果不同源，在上面的 B 页面中我们依然无法通过 opener 来访问 A 页面中的 Cookie、IndexDB 或者 LocalStorage 等内容。

#### 阻止跨域请求

同源策略限制了通过 XMLHttpRequest 等方式将站点的数据发送给不同源的站点。

### 安全性与灵活性之间的权衡

让不同的源之间绝对隔离，无疑是最安全的措施，但这也会使得 Web 项目难以开发和使用。因此我们需要做出权衡，出让一些安全性来满足灵活性。浏览器主要出让了同源策略的以下两项安全性，而这又带来了很多安全问题，最典型的是 XSS 攻击和 CSRF 攻击。

#### 页面可以嵌入第三方资源

同源策略要让一个页面的所有资源都来自于同一个源，也就是要将该页面的所有 HTML 文件、JavaScript 文件、CSS 文件、图片等资源都部署在同一台服务器上，这无疑带来了诸多限制。比如将不同的资源部署到不同的 CDN 上时，CDN 上的资源就部署在另外一个域名上，因此我们就需要同源策略对页面的引用资源开一个“口子”，让其任意引用外部文件。所以最初的浏览器都是支持外部引用资源文件的，不过这也带来了很多问题。

遇到最多的一个问题是浏览器的首页内容会被一些恶意程序劫持，劫持的途径很多，其中最常见的是恶意程序通过各种途径往 HTML 文件中插入恶意脚本。当这段 HTML 文件的数据被送达浏览器时，浏览器是无法区分被插入的文件是恶意的还是正常的。当页面启动时，它可以修改用户的搜索结果、改变一些内容的连接指向，等等。

```html
<script src="http://malicious.com/malicious.js"></script>
```

除此之外，它还能将页面的的敏感数据，如 Cookie、IndexDB、LoacalStorage 等数据通过 XSS 的手段发送给服务器。

```html
<span onclick="alert(`http://malicious.com?cookie=${document.cookie}`)">美腿丝袜</span>
```

以上就是一个非常典型的 XSS 攻击。为了解决 XSS 攻击，浏览器中引入了内容安全策略(CSP)。*CSP 的核心思想是让服务器决定浏览器能够加载哪些资源，让服务器决定浏览器是否能够执行内联 JavaScript 代码*。通过这些手段就可以大大减少 XSS 攻击。


#### 跨域资源共享和跨文档消息机制

默认情况下，同源策略会阻止跨域资源请求，这样会大大制约我们的生产力。为了解决这个问题，我们引入了跨域资源共享(CORS)，使用该机制可以进行跨域访问控制，从而使跨域数据传输得以安全进行。

不同源的页面之间无法相互操纵 DOM。不过在实际应用中，经常需要两个不同源的 DOM 之间进行通信，于是浏览器又引入了跨文档消息机制，可以通过 `window.postMessage` 的 JavaScript 接口来和不同源的 DOM 进行通信。


## XSS

支持页面中的第三方资源引用和 CORS 带来了很多安全问题，其中最典型的就是 XSS 攻击。

### 什么是 XSS 攻击

XSS 全称是 Cross Site Scripting，为了与 CSS 区分开来，故简称 XSS，翻译过来就是“跨站脚本”。

XSS 攻击是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。最开始的时候，这种攻击是通过跨域来实现的，所以叫“跨域脚本”。但是发展到现在，往 HTML 文件中注入恶意代码的方式越来越多了，所以是否跨域注入脚本已经不是唯一的注入手段了，但是 XSS 这个名字却一直保留至今。

当页面被注入了恶意 JavaScript 脚本时，浏览器无法区分这些脚本是被恶意注入的还是正常的页面内容，所以 *恶意注入 JavaScript 脚本也拥有所有的脚本权限*。

### 攻击手段

页面中被注入恶意的 JavaScript 脚本是一件非常危险的事情，所以网站开发者会尽可能地避免页面中被注入恶意脚本。要想避免站点被注入恶意脚本，就要知道有哪些常见的注入方式。

#### 存储型 XSS 攻击

存储型 XSS 攻击大致需要经过如下步骤：
* 首先黑客利用站点漏洞将一段恶意 JavaScript 代码提交到网站的数据库中
* 然后用户向网站请求包含了恶意 JavaScript 脚本的页面
* 当用户浏览该页面的时候，恶意脚本就会将用户的 Cookie 信息等数据上传到服务器

2015 年喜马拉雅就被曝出了存储型 XSS 漏洞。起因是在用户设置专辑名称时，服务器对关键字过滤不严格，可以将专辑名称设置为一段 JavaScript 代码：

<img src="./images/browser/xss.png" width="571"/>

恶意脚本可以通过 XMLHttpRequest 或者 Fetch 将用户的 Cookie 数据上传到黑客的服务器。黑客拿到了用户 Cookie 信息之后，就可以利用 Cookie 信息在其他机器上登录该用户的账号，并利用用户账号进行一些恶意操作。


#### 反射型 XSS 攻击

用户将一段含有恶意代码的请求提交给 Web 服务器，服务器接收到请求后，又将恶意代码反射给浏览器端，这就是反射型 XSS 攻击。在现实生活中，黑客经常会通过 QQ 群或者邮件等渠道诱导用户去点击这些恶意链接，所以对于一些链接我们一定要慎之又慎。

需要注意的是，*Web 服务器不会存储反射型 XSS 攻击的恶意脚本，这是和存储型 XSS 攻击不同的地方*。

服务器代码 - JS

```js
var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', xss: req.query.xss })
})

module.exports = router
```

服务器代码 - 模版

```html
<!DOCTYPE html>
<title><%= title %></title>
<p>Welcome to <%= title %></p>
<div><%- xss %></div>
```

访问链接

```
http://localhost:3000/?xss=<script>alert('你被xss攻击了')</script>
```

#### 基于 DOM 的 XSS 攻击

基于 DOM 的 XSS 攻击是不牵涉到页面 Web 服务器的。具体来讲，黑客通过各种手段将恶意脚本注入用户的页面中，比如通过网络劫持在页面传输过程中修改 HTML 页面的内容，这种劫持类型很多，有通过 WiFi 路由器劫持的，有通过本地恶意软件来劫持的，它们的共同点是在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据。

### 防御手段

我们知道存储型 XSS 攻击和反射型 XSS 攻击都是需要经过 Web 服务器来处理的，因此可以认为这两种类型的漏洞是服务端的安全漏洞。而基于 DOM 的 XSS 攻击全部都是在浏览器端完成的，因此基于 DOM 的 XSS 攻击是属于前端的安全漏洞。

但无论是何种类型的 XSS 攻击，它们都有一个共同点，那就是首先往浏览器中注入恶意脚本，然后再通过恶意脚本将用户信息发送至黑客部署的恶意服务器上。所以要阻止 XSS 攻击，我们可以通过阻止恶意 JavaScript 脚本的注入和恶意消息的发送来实现。

#### 服务器对输入脚本进行过滤或转码

不管是反射型还是存储型 XSS 攻击，我们都可以在服务器端将一些关键的字符进行过滤和转码。

```
code:<script>alert('你被xss攻击了')</script>

// 过滤后
code:

// 转码后
code:&lt;script&gt;alert(&#39;你被xss攻击了&#39;)&lt;/script&gt;
```

#### 充分利用 CSP

> [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP): Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

虽然在服务器端执行过滤或者转码可以阻止 XSS 攻击的发生，但完全依靠服务器端依然是不够的，我们还需要把 CSP 等策略充分地利用起来，以降低 XSS 攻击带来的风险和后果。

实施严格的 CSP 可以有效地防范 XSS 攻击，具体来讲 CSP 有如下几个功能：
* 限制加载其他域下的资源文件，这样即使黑客插入了一个 JavaScript 文件，这个 JavaScript 文件也是无法被加载的；
* 禁止向第三方域提交数据，这样用户数据也不会外泄；
* 禁止执行内联脚本和未授权的脚本；
* 还提供了上报机制，这样可以帮助我们尽快发现有哪些 XSS 攻击，以便尽快修复问题。

开启 CSP 有两种途径：设置响应请求头，或者在 HTML 中设置 `<meta>` 信息。

```txt
Content-Security-Policy: default-src 'self'
```

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

#### 使用 HttpOnly 属性

由于很多 XSS 攻击都是来盗用 Cookie 的，因此还可以通过使用 HttpOnly 属性来保护我们 Cookie 的安全。*JavaScript 无法读取设置了 HttpOnly 的 Cookie 数据*，所以即使页面被注入了恶意 JavaScript 脚本，也无法获取到设置了 HttpOnly 的数据。

通常服务器可以将某些 Cookie 设置为 HttpOnly 标志，HttpOnly 是服务器通过 HTTP 响应头来设置的。

```txt
set-cookie: NID=190=TIyCIJS1SUlXIb08iGy_nH8jkOf_JZQxFhYbmCbXGO65RWtUUCjMN2mtm-HtIBQH_aZU-CKBRkVLGMer_eLhmZ-gWSOBLLwZp6WSxZpb22p0eed0HiCytN-HA2CMQDPC5oCBZEylBYvHJ3lepn_uQb_b0K9IN6PJTMzEMbufXPQ; expires=Wed, 29-Apr-2020 09:21:03 GMT; path=/; domain=.google.com; HttpOnly
```

#### 其他手段

当然除了以上策略之外，我们还可以通过添加验证码防止脚本冒充用户提交危险操作。而对于一些不受信任的输入，还可以限制其输入长度，这样可以增大 XSS 攻击的难度。


## SCRF

CSRF 英文全称是 Cross-site request forgery，所以又称为“跨站请求伪造”，是指黑客引诱用户打开黑客的网站，在黑客的网站中，利用用户的登录状态发起的跨站请求。简单来讲，CSRF 攻击就是黑客利用用户在被攻击网站的登录状态，向被攻击网站发送恶意请求来做一些坏事。

### 攻击手段

和 XSS 不同的是，CSRF 攻击不需要将恶意代码注入用户的页面，仅仅是利用服务器的漏洞和用户的登录状态来实施攻击。

#### 自动发起 GET 请求

以下这段代码可能存在于某论坛中的某个用户签名中，只要用户打开这个页面，浏览器会自动发起 img 的资源请求，*如果服务器没有对该请求做判断的话*，那么服务器就会认为该请求是一个转账请求，于是用户账户上的 100 xx币就被转移到黑客的账户上去了。

```html
<img src="https://被攻击站点.com/sendcoin?user=hacker&number=100">
```

#### 自动发起 POST 请求

```html
<form id='hacker-form' action="https://time.geekbang.org/sendcoin" method=POST>
  <input type="hidden" name="user" value="hacker" />
  <input type="hidden" name="number" value="100" />
</form>
<script> document.getElementById('hacker-form').submit(); </script>
```

在这段代码中，我们可以看到黑客在他的页面中构建了一个隐藏的表单，该表单的内容就是极客时间的转账接口。当用户打开黑客的站点时，就会自动提交 POST 请求。

#### 引诱用户点击链接

除了自动发起 Get 和 Post 请求之外，还有一种方式是诱惑用户点击黑客站点上的链接，这种方式通常出现在论坛或者恶意邮件上。

### 防御手段

*要发起 CSRF 攻击需要具备三个条件：目标站点存在漏洞、用户要登录过目标站点和黑客需要通过第三方站点发起攻击*。

满足以上三个条件之后，黑客就可以对用户进行 CSRF 攻击了。这里还需要额外注意一点，与 XSS 攻击不同，CSRF 攻击不会往页面注入恶意脚本，因此黑客是无法通过 CSRF 攻击来获取用户页面数据的；其*最关键的一点是要能找到服务器的漏洞*，所以说对于 CSRF 攻击我们主要的防护手段是提升服务器的安全性。要让服务器避免遭受到 CSRF 攻击，通常有以下几种途径。

#### 充分利用 Cookie 的 SameSite 属性

黑客会利用用户的登录状态来发起 CSRF 攻击，而 Cookie 正是浏览器和服务器之间维护登录状态的一个关键数据，因此要阻止 CSRF 攻击，我们首先就要考虑在 Cookie 上来做文章。

通常 CSRF 攻击都是从第三方站点发起的，要防止 CSRF 攻击，我们最好能实现从第三方站点发送请求时禁止 Cookie 的发送，因此在浏览器通过不同来源发送 HTTP 请求时，有如下区别：如果是从第三方站点发起的请求，那么需要浏览器禁止发送某些关键 Cookie 数据到服务器；如果是同一个站点发起的请求，那么就需要保证 Cookie 数据正常发送。

在 HTTP 响应头中，通过 set-cookie 字段设置 Cookie 时，可以带上 SameSite 选项，SameSite 选项通常有三个值。
* Strict 最为严格。如果 SameSite 的值是 Strict，那么浏览器会完全禁止第三方 Cookie。简言之，如果你从极客时间的页面中访问 InfoQ 的资源，而 InfoQ 的某些 Cookie 设置了 SameSite = Strict 的话，那么这些 Cookie 是不会被发送到 InfoQ 的服务器上的。只有你从 InfoQ 的站点去请求 InfoQ 的资源时，才会带上这些 Cookie。
* Lax 相对宽松一点。在跨站点的情况下，从第三方站点的链接打开和从第三方站点提交 Get 方式的表单这两种方式都会携带 Cookie。但如果在第三方站点中使用 Post 方法，或者通过 img、iframe 等标签加载的 URL，这些场景都不会携带 Cookie。
* 而如果使用 None 的话，在任何情况下都会发送 Cookie 数据。

```txt
set-cookie: 1P_JAR=2019-10-20-06; expires=Tue, 19-Nov-2019 06:36:21 GMT; path=/; domain=.google.com; SameSite=none
```

#### 验证请求的来源站点

由于 CSRF 攻击大多来自于第三方站点，因此服务器可以禁止来自第三方站点的请求。那么该怎么判断请求是否来自第三方站点呢？这就需要介绍 HTTP 请求头中的 Referer 和 Origin 属性了。

Referer 是 HTTP 请求头中的一个字段，记录了该 HTTP 请求的来源地址。虽然可以通过 Referer 告诉服务器 HTTP 请求的来源，但是有一些场景是不适合将来源 URL 暴露给服务器的，因此浏览器提供给开发者一个选项，可以不用上传 Referer 值，具体可参考 [Referrer Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)。

但在服务器端验证请求头中的 Referer 并不是太可靠，因此标准委员会又制定了 Origin 属性，在一些重要的场合，比如通过 XMLHttpRequest、Fecth 发起跨站请求或者通过 Post 方法发送请求时，都会带上 Origin 属性。*Origin 属性只包含了域名信息，并没有包含具体的 URL 路径，这是 Origin 和 Referer 的一个主要区别*。

因此，服务器的策略是优先判断 Origin，如果请求头中没有包含 Origin 属性，再根据实际情况判断是否使用 Referer 值。

#### CSRF Token

在浏览器向服务器发起请求时，服务器生成一个 CSRF Token 并将该字符串植入到返回的页面中。浏览器端发起转账请求时需要带上页面中的 CSRF Token。如果是从第三方站点发出的请求，服务器会因为 CSRF Token 不正确而拒绝请求。

```html
<form action="https://time.geekbang.org/sendcoin" method="POST">
  <input type="hidden" name="csrf-token" value="nc98P987bcpncYhoadjoiydc9ajDlcn">
  <input type="text" name="user">
  <input type="text" name="number">
  <input type="submit">
</form>
```

### 小结

结合前面两篇文章，我们可以得出页面安全问题的主要原因就是浏览器为同源策略开的两个“后门”：一个是在页面中可以任意引用第三方资源，另外一个是通过 CORS 策略让 XMLHttpRequest 和 Fetch 去跨域请求资源。为了解决这些问题，我们引入了 CSP 来限制页面任意引入外部资源，引入了 HttpOnly 机制来禁止 XMLHttpRequest 或者 Fetch 发送一些关键 Cookie，引入了 SameSite 和 Origin 来防止 CSRF 攻击。

