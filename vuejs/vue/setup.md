# 开发环境配置

## Devtools

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


## VS Code

### ESLint

#### vscode-eslint

```json
{
  "eslint.validate": ["javascript", "vue"],  // 开启 vue 文件校验
}
```

#### 项目配置

```bash
$ npm i -D eslint eslint-plugin-vue
$ npm i -D eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```
_.eslintrc.js_

```js
module.exports = {
  "root": true,
  "env": {"es6": true, "browser": true, "node": true},
  "extends": [
    "standard",
    "plugin:vue/recommended",
  ],
  rules: {
    "no-multi-spaces": ["off"],
    "comma-dangle": ["off"],
  },
}
```

#### 其他

**单文件中 template 内取消某项校验**

https://github.com/vuejs/eslint-plugin-vue/issues/260

```html
<!-- eslint-disable-next-line vue/no-v-html -->
<div class="markdown" v-html="markdown" />
```
