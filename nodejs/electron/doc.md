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


## 键盘快捷键

```js
const menu = new Menu()
menu.append(new MenuItem({
  label: 'Open DevTools', accelerator: 'F12',  // 即使隐藏外框，快件键仍然有效
  click: (menuItem, browserWindow, event) => { browserWindow.webContents.openDevTools() }
}))
Menu.setApplicationMenu(menu)
```


## globalShortcut 快捷键

注：windows 下不允许注册 F12 作为开启 DevTools 的快捷键，只能注册 Ctrl+Shift+I

可用的功能键

```
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

```
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







