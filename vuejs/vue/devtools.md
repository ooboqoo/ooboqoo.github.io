# Devtools

### 生产环境下开启调试工具

```js
Vue.config.devtools = true

// 某项目实测可行方式 - 添加条件断点
void(_vue.config.devtools = true)
```


### NW.js

_package.json_ 添加

```js
"chromium-args": "--load-extension=D:\\vue-devtools\\4.1.5_0"
```

### Electron

```js
// 在 ready 事件触发后才能调用
BrowserWindow.addDevToolsExtension('D:\\vue-devtools\\4.1.5_0')
```

