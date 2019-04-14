# 趋势综述

<style>i, em { font-style: normal; }</style>

## 2019 年大前端技术趋势深度解读

https://www.infoq.cn/article/K_RFbwfff5MugJXixYDQ  
https://mp.weixin.qq.com/s/qFqxzOsg6Td0r-Y7ZgW5lQ

jQuery 被 GitHub 下掉，前端三大框架趋于平稳，向 **Web Components** 标准看齐。而周边应用层面的封装开始指数级增长。

小程序是18年最火的技术，快应用也想分一杯羹。**PWA** 进入稳定期，PWA 桌面版已经开始兴起。

强运营背景下，移动端以前端开发为主，已成定局。各大公司都开始不再 all in mobile，开始重视多端并进，开始拼细节。**Flutter** 前景不太明朗(主要是 Dart 有点怪)。5G 时代即将到来。

**TypeScript** 全面开花，**GraphQL** 蠢蠢欲动，**WebAssembly** 更是打开了浏览器上多语言的大门。

所有的这一切都在暗示，**浏览器即操作系统**的时代正在到来。

### 三大框架标准化

有朋友吐槽：“Vue 的特点就是上手快，初期相当好用，但如果接手一个别人写的 Vue 项目，再和 React 对比一下，你会感谢 React 的”。但当 Vue 3.0 发布之后，估计他就不会这样说了。因为 Vue 3 的 Class API 和 React 的写法几乎是一模一样的，这个改动不是 Proxy 和 TypeScript，而是支持原生 Class 的写法。

前端三大框架已经趋于平稳、标准化，在我看来未来是 Web Components 的。无论 React 发布 v16，增加 Fiber 和 Hooks，还是 Vue 3.0 发布，其实最终都是朝着 W3C Web Components 标准走。

对于当下的前端发展情况，我其实是有隐忧的。当年 Java 世界曾经搞各种 GUI，创造了 MVC 模式，结果没火，没想到到了 Web 开发领域，MVC 成了基本约定。之后 Model 1 和 Model 2 等企业开发模型渐渐成熟，出现了 Struts、Spring、Hibernate 三大框架并维持了很长一段时间，再之后 **Spring 一统江湖**。框架一旦稳定，就会有大量培训跟进。这是把双刃剑，能满足企业开发和招人的问题，但也给创新上了枷锁。

### 应用层封装进入爆发期

框架和工程化基本探索稳定后，大家就开始思考如何更好的用，更简单的用。目前，各家大厂都在前端技术栈思考如何选型和降低成本，统一技术栈。

*零配置*就是默认选型都给你做好了。*开箱即用*就是技术栈都固化了。*约定大于配置*开发模式也固化好了。

### PWA 进入稳定期

纵观 PC 桌面端的发展过程，早期 Delphi/VB/VF/VC 等构建起的 c/s 时代，即使到今天依然有很大的量。最近两年，随着 Atom/VSCode 的火爆，带动了 node webkit 相关模块的爆发，如 NW.js 和 Electron 等。用 Web 技术来构建PC应用，确实是省时省力，用户体验也非常好，比如钉钉客户端、石墨文档客户端等，最主要的是可以统一技术栈，比如某些算法，用 JS 写一次，之后可以在前端、Node、PC应用等多处复用。当然更好的是使用 Web 技术进行开发，不需要加壳打包，PWA 桌面版就是这样的技术。

桌面端的3个发展阶段：*原生开发 Native --> 混搭开发 Hybrid --> PWA*

谷歌于 2008 年 9 月 2 日首次发布了 Chrome 浏览器，Node.js 是 Ryan Dahl 于 2009 年发布的，他把 V8 引擎搬到了后端，使用 JS 编写服务器程序变为现实。随后 NPM 发展极为迅猛，跨平台技术也突飞猛进，出现了 NW.js 这样的轻量级跨平台框架，基于 Chromium + Node.js，使得 PC 桌面端能够通过 Web 开发技术开发，最终打包编译成各个平台支持的应用格式，给 PC 桌面开发带来了太多的可能性。

而 Atom 是 GitHub 在 2014 年发布的一款基于 Web 技术构建的文本编辑器，其中 atom-shell，也就是后来的 Electron，是和 NW.js 类似的技术。它允许使用 Node.js（作为后端）和 Chromium（作为前端）来完成桌面 GUI 应用程序的开发。Chromium 提供了渲染页面和响应用户交互的能力，而 Node.js 提供了访问本地文件系统和网络的能力，也可以使用 NPM 上的几十万个第三方包。在此基础之上，Electron 还提供了 Mac、Windows、Linux 三个平台上的一些原生 API，例如全局快捷键、文件选择框、托盘图标和通知、剪贴板、菜单栏等。

![](https://static.geekbang.org/infoq/5c8b7ae939e3c.png)

Erich Gamma 老爷子设计的 Monaco/VS Code，同样基于 Electron，但性能比 Atom 强多了。VS Code 会先启动一个后台进程，也就是 Electron 的主进程，它负责编辑器的生命周期管理、进程间通讯、UI 插件管理、升级和配置管理等。后台进程会启动一个（或多个）渲染进程，用于展示编辑器窗口，它负责编辑器的整个 UI 部分，包括组件、主题、布局管理等等。每个编辑器窗口都会启动一个 Node.js 子进程作为插件的宿主进程，在独立进程里跑插件逻辑，然后通过事件或者回调的方式通知 Renderer 结果，避免了 Renderer 的渲染被插件中 JS 逻辑阻塞。

如今，很多应用都开始基于 Electron 构建，比如微信小程序IDE、微信PC版本、迅雷等。

2018 年 Google IO 大会上，微软宣布 Win10 全力拥抱 PWA，通过爬虫爬取 PWA 页面，并将其转换为 Appx，继而在其应用商店里提供应用，体验和原生 Native 应用非常相近，对此我非常看好。

Google 接下来会大力推进 PWA 的桌面版，再加上 Win10 和 Chrome 加持，Web 应用无需加壳就能达到近乎原生的体验，前端的领域再一次被拓宽。

PWA 必然会改变前端与移动端之间的格局，再加之 AOT(ahead-of-time) 与 WebAssembly 为 JS 带来的性能上的突破，JavaScript 将撼动所有领域，从移动端PWA到桌面应用、物联网、VR、AR、游戏乃至人工智能等等。

### 小程序火爆

如果说和 PWA 比较像的，大概就是小程序了，小程序也可以说是18年最火的技术。

### TypeScript

今年1月份北京 Node Party 上和几位嘉宾一起聊了一下，大家一致认为 TypeScript 提效非常明显，落地难度也不大，19年将有非常大的增长。本身前端团队变大，规模化编程也必然依赖类型系统和面向对象，从这点上看，TypeScript 是完胜的。

Vue 从 v2.5.0 之后对 TS 支持就非常好。Node.js Web 框架，尤其是 Egg.js 对 TS 支持非常好。

有了 Webpack + ts-loader，就可以一边使用 TS 编写新代码，一边零碎地更新老代码，有空就改，没空不改，特别包容。

### WebAssembly

WebAssembly 是一种新的字节码格式，目前主流浏览器都已经支持 WebAssembly。和 JS 需要解释执行不同的是，WebAssembly 字节码和底层机器码很相似，可以快速装载运行，因此性能相对于 JS 的解释执行有了极大的提升。*WebAssembly 并不是一门编程语言，而是一份字节码标准*，需要用高级语言编译出字节码放到 WebAssembly 虚拟机中才能运行，浏览器厂商需要做的就是根据规范实现虚拟机。这很像 Java 早年的 Applet，能够让 Java 应用跑在浏览器里。有了 WebAssembly，在浏览器上可以跑任何语言。

本来，我以为 WebAssembly 离我们很远，但在 2018 年 Google I/O 大会亲眼见到 AutoCad Web 应用后，非常震撼。能够让如此庞大的项目跑在 Web 端，真的是非常了不起。通过 WebAssembly 技术，既能复用之前的 C++ 代码，又能完成 Web 化，这也许就是所谓的两全其美吧。

### 移动端

Flutter 是 Google 推出的帮助开发者在 Android 和 iOS 两个平台，同时开发高质量原生应用的全新移动 UI 框架，和 ReactNative/Weex 一样支持热更新。Flutter 使用 Google 自己家的 Dart 语言编写，刚好今年 Dart2 也正式发布，不知道二者之间是否有关联。目前 Dart 主攻 Flutter 和 Web 两块，同时提供了 PUB 包管理器，俨然是一门全新的语言，学习成本有些高。反观 TypeScript 就非常容易被接受，基于 NPM 生态，兼容 ES 语法，因此，2019 年对 Dart 我还是会持观望态度。

除了不喜欢 Dart 外，Flutter 的其他方面都很好，在移动端现在强运营的背景下，支持热更新是必备能力。



