<script>
  ooboqoo.contentsRegExp = /H[123]/;
</script>

# Visual Studio Code

> 相关资源： https://github.com/Microsoft/vscode-tips-and-tricks Youtube 有带 1 小时视频

## 类型检查

### JavaScript 文件类型检查

具体参见 TypeScript [JS 类型检查](/es-ts/#!ts/09-check-js.md) 章节


## 插件使用

#### GitLens

极大地增强了 git 的功能，强！

#### TypeScript TSLint Plugin

该插件用于对 _.ts_ 文件进行规范检查，不建议用于 _.js_ 文件。该插件不涉及类型检查。

使用该插件之前需要先全局安装好 TSLint。 且项目下要有 _tsconfig.json_ 或 _jsconfig.json_ 才生效。

创建配置文件：
```bash
$ tslint --init
```

_tsconfig.json_

```json
{
  "extends": ["tslint:recommended"],
  "rules": {
    "semicolon": [true, "never"],
    "quotemark": [true, "single"],
    "no-console": [false],
    "ordered-imports": [false]
  }
}
```

单文件修改配置(只能开关某项设置，没有办法调整设置值) https://palantir.github.io/tslint/usage/rule-flags/
```ts
/* tslint:disable:quotemark */
```

#### ESLint

该插件用于对 _.js_ 文件进行规范检查。

```bash
$ npm i -g eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard
```
_.eslintjs_

```js
module.exports = {
  "root": true,
  "extends": "standard",
  "rules": {
    "object-curly-spacing": ["off"]
  }
}
```

#### Beautify

vscode 虽然内置了 js-beautify，但功能被缩减很多，像 scss 文件就不支持，所以还得装这个。

#### Debugger for Chrome

如果出现无法连接 Chrome 的情况就添加下启动参数 `--remote-debugging-port=9222`

其实这里的功能，Chrome 都有，在浏览器调试，需要先找到代码再调试，但不用切换；在编辑器调试，不用找代码，但调试过程中需要在浏览器与编辑器之间切换，总体感觉还不如直接在浏览器中调试。

#### React code snippets

这个插件用的人比较多，但是 snippet prefix 前缀设置有问题(太短)，想使用需要关闭智能提示:

```json
{
  "editor.tabCompletion": true,
  "editor.quickSuggestions": {"other": false, "comments": false, "strings": false},
}
```

觉得需要改造一下，或者自己定义 https://code.visualstudio.com/docs/editor/userdefinedsnippets


## 配置 - Settings

```json
{
"window.zoomLevel": 0,
"breadcrumbs.enabled": true,
"editor.tabSize": 2,
"editor.rulers": [100],
"editor.renderWhitespace": "boundary",
"editor.detectIndentation": false,
"workbench.activityBar.visible": false,  // 关闭左侧导航条
"workbench.statusBar.feedback.visible": false,
"workbench.colorCustomizations": {
  "statusBar.background": "#1E1E1E",
  "statusBar.border": "#444",
},
"explorer.confirmDelete": false,
"explorer.confirmDragAndDrop": false,
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\usr\\bin\\bash.exe",
"terminal.integrated.shell.osx": "/bin/zsh",
"git.autofetch": true,
"git.confirmSync": false,
"git.enableSmartCommit": true,
"git.promptToSaveFilesBeforeCommit": "always",
"gitlens.keymap": "none",
"gitlens.codeLens.authors.enabled": false,
"gitlens.codeLens.recentChange.enabled": false,
"gitlens.currentLine.enabled": false,
"gitlens.statusBar.alignment": "left",
"gitlens.statusBar.format": "${author}, ${agoOrDate} · ${message}",
"gitlens.statusBar.dateFormat": "YYYYMMDD",
"gitlens.showWhatsNewAfterUpgrades": false,
"vim.startInInsertMode": true,
"vim.useCtrlKeys": false,
"vim.handleKeys": {
  "<D-c>": false,  // 解决 macOS 下复制会跳出插入模式
  "<D-v>": false   // windows 下要相应改成 <C-v>
},
"vim.mouseSelectionGoesIntoVisualMode": false,
"prettier.semi": false,
"prettier.singleQuote": true,
"prettier.trailingComma": "es5",

// 视情况采用
"vim.useSystemClipboard": true,
"git.autorefresh": false,  // 这个开着的话，每次刷新会触发 webpack-dev-server 编译
"javascript.implicitProjectConfig.checkJs": true,  // JS 中开启 TS 语法校验，个人项目开，多人项目关
}
```

## 配置 - 快捷键 Key Bindings

```js
{"key": "f1",           "command": "workbench.action.showCommands" },
{"key": "ctrl+shift+p", "command": "workbench.action.showCommands"},
{"key": "ctrl+shift+j", "command": "editor.action.joinLines", "when": "editorTextFocus"},
```


## 配置 - 其他

### Display Language

`Ctrl+Shift+P` > config 设置语言并重启生效。`en` 英文 `zh-cn` 简体中文。

### Color Themes

