# Fiddler & Charles & NProxy

http://www.jianshu.com/p/99b6b4cd273c

> * Fiddler - Windows 用 Web 调试代理工具
> * Charles - macOS 用 Web 调试代理工具
> * NProxy - 基于 Node.js 的跨平台 Web 调试文件替换工具
> * Requestly - Chrome 扩展，可用于替换远程文件


## 简介

90% 的用法是拦截 HTTP 请求，分析 request 和 response 的具体细节，协助排查前后端联调开发中的问题。

9% 的用法是打 HTTP 断点，修改 request 请求，绕过前端 js 限制。因此，对于高手来说前端 js 的限制基本不算限制。黑客工具中类似的是 burpsuite，功能还要强大。

### 常用抓包工具

Wireshark, Firebug, Fiddler all do similar things - capture network traffic.

* Wireshark captures any kind of a network packet. It can capture packet details below TCP/IP(Http is at the top). It does have filters to reduce the noise it captures.
* Firebug tracks each request the browser page makes and captures the associated headers and the time taken for each stage of the request (DNS, receiving, sending, ...).
* Fiddler works as a http/https proxy. It captures each http request the computer makes and records everything associated with it. Does allow things like converting post varibles to a table form and editing/replaying requests. It doesn't, by default, capture localhost traffic in IE, see the FAQ for the workaround.

### Burp Suite

https://www.gitbook.com/book/t0data/burpsuite/details

Burp Suite 一款集成型的渗透测试工具，是可以用于攻击 web 应用程序的集成平台。它包含了许多工具，并为这些工具设计了许多接口，以促进加快攻击应用程序的过程。所有的工具都共享一个能处理并显示 HTTP 消息，持久性，认证，代理，日志，警报的一个强大的可扩展的框架。


## Fiddler

### 配置

http://docs.telerik.com/fiddler/Configure-Fiddler/Tasks/DecryptHTTPS

Tools > Fiddler Options > HTTPS > [√] Capture HTTPS CONNECTs > [√] Decrypt HTTPS Traffic

### Filters

示例：只监控本地请求

选中 "Use Filters" 并设置 "Hosts" 组内容为 "Show only the following Hosts" "127.0.0.1"

### AutoResponder

示例：拦截并修改 css 文件

勾选 "Enable rules" 和 "Unmatched requests passthrough" 并添加 "EXACT:http://127.0.0.1/main.css" "*bpu"

刷新网页，然后切到 "Inspectors" 标签页，点 "Break on Response" 再点 "TextView" 修改内容，最后点 "Run to Completion"

### 断点调试

http://www.telerik.com/blogs/breakpoints-in-fiddler

1. 使用 Rules > Automatic breakpoints 菜单项
2. 快捷命令窗使用命令 `bpu` 或 `bpa`
3. 使用 Filters 页签
4. 使用 AutoResponder 页签
5. 使用 FiddlerScript/extensions 设置一个 X-BreakRequest 或 X-BreakResponse Session标记

方式 #1 会对后续所有 traffic 设置断点，使用起来其实并不是很方便。

方式 #2 可快速设置 request breakpoint `bpu example` or a response breakpoint `bpafter example` for Sessions’ whose URL contains the text you supply to the command. You can subsequently clear these breakpoints by issuing the command without an argument (e.g. bpu or bpafter). 不足是 only two breakpoints may exist at one time—one request breakpoint and one response breakpoint.

方式 #3 "Filters" 页签下 "Breakpoints" 可设置针对某类请求设置断点，这个功能使用也不是很方便

方式 #4 "AutoResponder" 页签下可自定义各种拦截规则，考虑易用性和功能，是最好用的，但也有缺陷，The only downside to breakpointing with the AutoResponder is that there’s no way to breakpoint based on an attribute of the response – for instance, you cannot create a response breakpoint based on the Content-Type returned by the server.

方式 #5 是最强大的，Simply add code to the OnBeforeRequest, OnPeekAtResponseHeaders, or OnBeforeResponse events to set the X-BreakRequest or X-BreakResponse flags on the Session objects that match your target criteria.


### 移动端抓包



## Charles

注册 https://charles.ren/

