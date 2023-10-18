# Charles & Fiddler & NProxy

http://www.jianshu.com/p/99b6b4cd273c

> * Charles - macOS 用 Web 调试代理工具
> * Fiddler - Windows 用 Web 调试代理工具
> * NProxy - 基于 Node.js 的跨平台 Web 调试文件替换工具
> * Requestly - Chrome 扩展，可用于替换远程文件


## 简介

90% 的用法是拦截 HTTP 请求，分析 request 和 response 的具体细节，协助排查前后端联调开发中的问题。

9% 的用法是打 HTTP 断点，修改 request 请求，绕过前端 js 限制。黑客工具中类似的是 burpsuite，功能还要强大。

### 抓包工具

* **Wireshark** 用于抓 TCP/IP 包
* **Charles / Fiddler** 拦截并代理本机 HTTP 请求
* **DevTools NetWork** 跟踪浏览器内当前页面的请求

### Burp Suite

https://www.gitbook.com/book/t0data/burpsuite/details

Burp Suite 一款集成型的渗透测试工具，是可以用于攻击 web 应用程序的集成平台。它包含了许多工具，并为这些工具设计了许多接口，以促进加快攻击应用程序的过程。所有的工具都共享一个能处理并显示 HTTP 消息，持久性，认证，代理，日志，警报的一个强大的可扩展的框架。


## Charles 配置

### 通用配置

注册 https://charles.ren/

配置 HTTP 代理：`Proxy / Proxy Settings...` 把能打钩的都打上

### HTTPS

安装 CA 证书：`Help / SSL Proxying / Install Charles Root Certificate`

配置 HTTPS 代理：`Proxy / SSL Proxy Settings...` 把能打钩的都打上


## Charles 使用

https://mp.weixin.qq.com/s/95Hr68i9bmZV-X-F7oZ0rQ

### Map Remote 映射远程

实际使用中，在处理 HTTPS 相关的映射时，经常会出现不生效的情况，改成 HTTP 的请求一般能解决问题。

### Map Local 映射本地文件

将 符合匹配规则 的请求映射到 *一个本地文件*，不再与原服务器通信。

### Rewrite 重写请求

将 符合匹配规则 的请求进行改写，Request 和 Response 都能改。

```yaml
# 应用示例：Map Local 时，解决跨域错误

Type: Add Header
where: Response
Replace:
  Name: Access-Control-Allow-Origin
  Value: *
```

### Repeat 重新请求

*手动* 再发送一次请求。

### Compose 编辑并重发

跟 Repeat 不同的是，Compose 允许在发送前编辑请求内容。

### Throttle Setting 限速

此功能可以模拟不同的网路环境。


## Charles 常见问题

### 使用 VPN

如果要同时使用的话，建议先开 Charles 再连 VPN。

当存在其他代理时，最好先关掉代理，然后再开 Charles。如果抓不到包，退出应用，然后把其他的代理全退了，再进就好了。

如果还是抓不到包，到 `系统设置 / Wi-Fi / 详细信息... / 代理` 如果端口不是 `8888` 或者开着 `自动配置代理` 的话，需要调整下。

### 无法捕获 localhost 请求

很多系统都会配置 localhost 的请求不走代理，将 `localhost` 改成 `local.charles` 就好了。

### 命令行工具

命令行工具的 HTTP 调用能否被抓获，要看该工具本身是否支持使用代理。一般都可以使用下面的命令解决，如果还不行就要去找相应命令的文档了。

```bash
export http_proxy=http://127.0.0.1:8888 https_proxy=http://127.0.0.1:8888
```

### node-fetch

```js
import { HttpProxyAgent } from 'http-proxy-agent';
fetch(url, {
  agent: new HttpProxyAgent('http://127.0.0.1:8888'),
});
```

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
```


## Wireshark

Wireshark 可以抓取各种网络封包，显示封包详细信息。不懂网络协议很难看懂。

Wireshark 能直接分析 HTTP 协议的包，但无法解析 HTTPS 包的加密内容，要看解密内容可使用更上层的抓包软件(如 Charles)。

### What is Wireshark?

Wireshark is a network packet analyzer which presents captured packet data in as much detail as possible.

You could think of a network packet analyzer as a measuring device for examining what’s happening inside a network cable, just like an electrician uses a voltmeter for examining what’s happening inside an electric cable.

Here are some reasons people use Wireshark:
* Network administrators use it to troubleshoot network problems
* Network security engineers use it to examine security problems
* QA engineers use it to verify network applications
* Developers use it to debug protocol implementations
* People use it to learn network protocol internals 普通人可以用来学习网络协议内部机理

### 过滤器 Filter

初学者不会用过滤器，将会淹没在大量的抓包记录中，无从下手。过滤器会帮我们在大量的数据中迅速找到我们需要的信息。

过滤器有两种
* Display Filter 显示过滤器，就是主界面上那个，用来在捕获的记录中找到所需要的记录
* Capture Filter 捕获过滤器，在 Capture -> Capture Filters 中设置，避免捕获太多记录

过滤表达式
* Field or Protocol  `ip` `ip.src` `ip.dst` `tcp.port` `udp` 等等
* Operator  `==` `!=` `>` `>=` `<` `<=` `in` `contains` `matches`
* Values
* Combine Tests  `&&` `||`

IP 过滤示例 `ip.src == 192.168.0.1` `ip.src == 192.168.0.1` `ip.dst == 192.168.0.1`

端口过滤示例 `tcp.port != 443` `tcp.srcport != 443` `tcp.dstport != 443` `tcp.port in {80,443,8080}`

文本搜索示例 `http contains "https://www.wireshark.org"` `http.content_type[0:4] == "text"`

### Packet Details Pane

* Frame  物理层
* Ethernet II 数据链路层
* Internet Protocol 网络层
* Transmission Control Protocol 传输层
* Hypetext Transfer Protocol 应用层


