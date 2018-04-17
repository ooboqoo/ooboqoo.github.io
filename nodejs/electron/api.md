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




