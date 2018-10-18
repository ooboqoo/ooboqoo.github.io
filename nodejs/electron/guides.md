# Electron 指南


## 术语

**ASAR** (Atom Shell Archive Format) 一个 asar 档案就是一个简单的 `tar` 文件，主要是为提高 Windows 下的性能而创建的。

**IPC** (Inter-Process Communication) Electron 使用 IPC 来在 main 和 renderer 进程之间传递 JSON 信息。

**libcc** (libchromiumcontent) 包含 Chromium Content module 及其所有依赖项 (例如, Blink、 V8 等) 的共享链接库。

**native modules** 原生模块 (Node.js 里叫 addons)，是一些使用 C/C++ 编写的能够在 Node.js 中加载的模块，使用跟 Node.js 的内置模块无差异。主要为 Node.js 中的 JS 代码提供调用 C++ 代码的接口。

**process** 一个进程是计算机程序执行中的一个实例。Electron 应用同时使用 main(主进程) 和一个或者多个 renderer(渲染进程) 来运行多个程序。每个运行的进程包含一个 `process` 对象提供当前进程的相关信息和操作方法。

**main process** 主进程，通常是指 `main.js` 文件，是每个 Electron 应用的入口文件。它控制着整个 App 的生命周期，从打开到关闭。它也管理着原生元素比如菜单，菜单栏，Dock 栏，托盘等。主进程负责创建 APP 的每个渲染进程。而且整个 Node API 都集成在里面。

**renderer process**  渲染进程是你的应用内的一个浏览器窗口。与主进程不同的是，它能够同时存在多个。在浏览器内，网页通常运行在一个沙盒中无法使用原生的资源。而 Electron 的用户在 Node.js API 支持下可以在页面中和操作系统进行一些低级别的交互。

**webview** 此标签用于嵌入外部网页。它类似于 `iframe`，但不同的是每个 `webview` 运行在独立的进程中。作为页面它拥有不一样的权限并且所有的嵌入的内容和你应用之间的交互都将是异步的。这将保证你的应用对于嵌入的内容的安全性。


## 关于 Electron

Electron 将 Chromium 和 Node.js 合并到同一个 runtime，让用户通过 HTML，CSS 和 JavaScript 来构建跨平台桌面应用。

Electron 里 Node.js 和 Chromium 共享同一个 V8 实例--通常是 Chromium 在用的版本。大多数情况下这能正常工作但有时候还是需要为 Node.js 打补丁(这可能会影响到 Node.js addons)。

为了保持 Electron 的小巧(文件体积)和可持续性开发(以防依赖库和API泛滥)，Electron 限制了所使用的核心项目的数量。比如只用了 Chromium 的渲染库而不是其全部组件。这使得升级 Chromium 更加容易，但也意味着 Electron 缺少了 Google Chrome 里的一些浏览器相关的特性。添加到 Electron 的新功能应该主要是原生 API。如果可以的话，一个功能应该尽可能的成为一个 Node.js 模块。


## Electron 应用结构

### 主进程和渲染器进程

Electron 运行 _package.json_ 的 _main_ 脚本的进程被称为主进程。一个 Electron 应用总是有且只有一个主进程。

由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中。

在普通的浏览器中，web 页面通常在一个沙盒环境中运行，不被允许去接触原生的资源。而 Electron 的用户在 Node.js API 支持下可以在页面中和操作系统进行一些底层交互。

主进程通过新建 `BrowserWindow` 实例来创建页面。每个 `BrowserWindow` 实例都在自己的渲染进程里运行页面。当一个 `BrowserWindow` 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有的 web 页面和它们对应的渲染进程。每个渲染进程都是独立的，它只关心它所运行的 web 页面。

在页面中调用与 GUI 相关的原生 API 是不被允许的，因为在 web 页面里操作原生的 GUI 资源是非常危险的，而且容易造成资源泄露。如果你想在 web 页面里进行 GUI 操作，其对应的渲染进程必须与主进程进行通讯，以请求主进程进行相关的 GUI 操作。

### 使用 Electron 的 API

Electron 在主进程和渲染进程中提供了大量 API 去帮助开发桌面应用程序。在主进程和渲染进程中，你可以通过 `require` 的方式将其包含在模块中以获取 Electron 的 API。

```js
const electron = require('electron')  // 主进程和渲染进程通用
```

所有 Electron 的 API 都被指派给一种进程类型。许多 API 只能被用于主进程中(如 `BrowserWindow`)，有些 API 又只能被用于渲染进程，又有一些主进程和渲染进程中都可以使用，具体在每一个 API 的文档都有注明。

```js
const { BrowserWindow } = require('electron')  // 渲染进程下 BrowserWindow 为 undefined
```

因为进程之间的通信是被允许的, 所以渲染进程可以调用主进程来执行任务。Electron 通过 `remote` 模块暴露一些通常只能在主进程中获取到的 API。

```js
const { remote } = require('electron')
const win = new remote.BrowserWindow()  // 在渲染进程中调用主进程来执行任务
```

### 使用 Node.js 的 API

Electron 同时在主进程和渲染进程中暴露了所有 Node.js 的接口。这里有两个重要的定义：
  * 所有在 Node.js 可以使用的 API，在 Electron 中同样可以使用。
  * 你可以在你的应用程序中使用 Node.js 的模块
    * 使用 npm 模块，在项目中 `npm i` 即可引用
    * 原生 Node.js 模块，需要在编译后才能使用，具体见 [使用 Node 原生模块](https://electronjs.org/docs/tutorial/using-native-node-modules)


## 常见问题 FAQ

https://electronjs.org/docs/faq

### 在网页间共享数据

在网页(渲染进程)间共享数据最简单的方法是使用 HTML5 API，如 WebStorage 和 IndexedDB。

还可以用 Electron 的 IPC 机制来实现数据共享。将数据存在主进程的某个全局变量中，然后在多个渲染进程中使用 `remote` 模块来访问它。

```js
// In the main process.
global.sharedObject = {
  someProperty: 'default value'
}

// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'

// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

### 应用的窗口或托盘在一段时间后消失

这通常是因为用来存放窗口、托盘的变量被垃圾回收了。你可以提升变量的作用域，防止这个变量被垃圾回收。

```js
// 修改前
const { app, Tray } = require('electron')
app.on('ready', () => { const tray = new Tray('/path/to/icon.png'); tray.setTitle('hello world') })
// 修改后
let tray = null
app.on('ready', () => { tray = new Tray('/path/to/icon.png'); tray.setTitle('hello world') })
```

### 无法使用 RequireJS

因为 Electron 在运行环境中引入了 Node.js，所以在 DOM 中有一些额外的变量，如 `module` `exports` `require`。这导致了许多库不能正常运行，因为它们也需要将同名的变量加入运行环境中。

我们可以通过禁用 Node.js 来解决这个问题。如你需要使用 Node.js API，你需要在引入那些库之前将这些变量重命名。

```js
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false  // 渲染进程中禁用 Node.js API
  }
})
```

```html
<script>
  window.nodeRequire = require; // 重命名变量让出 require
  delete window.require; delete window.exports; delete window.module;
</script>
<script src="jquery.js"></script>
```

另外需要注意的是，配合 webpack 打包工具使用时，代码中不要直接 `require` 而是使用 `window.require`。

```js
var fs = require('fs')         // 在 webpack 打包时处理，到运行时 fs 变为一个空对象(是空对象么，没记清楚)
var fs = window.require('fs')  // 在 webpack 打包是不动，运行时 fs 为正常的 Node.js fs 模块
```


## 键盘快捷键

```js
const menu = new Menu()
menu.append(new MenuItem({
  label: 'Open DevTools', accelerator: 'F12',  // 即使隐藏外框，快捷键仍然有效
  click: (menuItem, browserWindow, event) => { browserWindow.webContents.openDevTools() }
}))
Menu.setApplicationMenu(menu)
```


## globalShortcut 快捷键

注：windows 下不允许注册 F12 作为开启 DevTools 的快捷键，只能注册 Ctrl+Shift+I

可用的功能键

```txt
Command (缩写为 Cmd)
Control (缩写为 Ctrl)
CommandOrControl (缩写为 CmdOrCtrl，在 Windows 和 Linux 下为 Ctrl 键，在 macOS 下为 Cmd 键)
Alt
Option (只在 macOS 下存在)
AltGr
Shift
Super (Windows 和 Linux 下为 Windows 键，macOS 下为 Cmd 键)
```

可用的普通按键

```txt
0 - 9  A - Z  F1 - F24
类似~, !, @, #, $的标点符号
Plus  Space  Tab  Backspace  Delete  Insert  Return (等同于 Enter)  Escape (缩写为 Esc)
Up, Down, Left and Right  Home 和 End  PageUp 和 PageDown  PrintScreen
VolumeUp, VolumeDown 和 VolumeMute
MediaNextTrack、MediaPreviousTrack、MediaStop 和 MediaPlayPause
```

demo

```js
const {app, globalShortcut} = require('electron')
app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
  })
})
```







