# Electron API


初始化界面

```js
const {app, BrowserWindow} = require('electron')
let mainWindow  // 保留全局引用，否则垃圾回收机制会导致窗口自动关闭
app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 800, height: 600})
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
})
```

自动重新载入(便于开发调试)

```js
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)
```



## Accelerator 快捷键

### 本地快捷键

### 全局快捷键

### 浏览器窗口内的快捷方式


## app



## BrowserWindow



## BrowserWindowProxy



## clipboard



## globalShortcut



## ipcMain



## ipcRenderer



## Menu



## MenuItem



## process



## remote



## sandbox Option



## webContents



## webview



## window.open

默认情况下调用 `window.open` 会新建一个 `BrowserWindow` 窗口，并返回一个




