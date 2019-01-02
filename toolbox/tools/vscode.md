<script>
  ooboqoo.contentsRegExp = /H[123]/;
</script>

# Visual Studio Code

> 相关资源： https://github.com/Microsoft/vscode-tips-and-tricks Youtube 有带 1 小时视频

## 类型检查

#### js 项目类型检查报错

文档：[Type Checking and Quick Fixes for JavaScript Files](https://code.visualstudio.com/docs/languages/javascript#_type-checking-and-quick-fixes-for-javascript-files) / 
[Global Variables and Type Checking](https://code.visualstudio.com/docs/languages/javascript#_global-variables-and-type-checking)

只要安装 `@types` 下的包就不会再有报错，如果只是个别全局变量啥的，可以在项目根目录添加以下两个文件解决：

```js
// jsconfig.json
{
    "compilerOptions": { },
    "exclude": [
        "node_modules",
        "**/node_modules/*"
    ]
}
```

```js
// global.d.ts
declare var anyGlobalVar: any;
declare interface Window {
    FileReader: any
}

// 方案2, 模块写法，前一种无效可试试这种方案，但官方文档用的第一种
declare global {
    var define;
    var require;
    var angular;
    var $;
    interface Window {  // vscode有提示只有在模块内才支持对 Window 的扩展
        urlParams: any;
    }
}
export {}
```


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


## Editor

### The Basic

### Editing Evolved

#### Multiple Selections

`Ctrl+D` 选中一个词  

#### Shrink/expand selection

`Shift+Alt+Left` and `Shift+Alt+Right`

#### Column (box) text selection

多行编辑: `Ctrl+Alt+Up` or `Ctrl+Alt+Down` 或 `Ctrl+Shift+Alt+Up` or `Ctrl+Shift+Alt+Down`  
`Alt+Click` 添加一个活动光标  `Shift+Alt+Click` (从光标起始点到点击处)添加多个(连续)光标  

#### Undo cursor position

`Ctrl+U`

#### Folding


## 配置 - Settings

```json
{
"window.zoomLevel": 0,
"breadcrumbs.enabled": true,
"editor.tabSize": 2,
"editor.rulers": [100],
"editor.renderWhitespace": "boundary",
"editor.detectIndentation": false,
"workbench.iconTheme": "vscode-icons",
"workbench.activityBar.visible": false,  // 关闭左侧导航条
"workbench.statusBar.feedback.visible": false,
"workbench.colorCustomizations": {
  "statusBar.background": "#1E1E1E",
  "statusBar.border": "#444",
},
"vsicons.dontShowNewVersionMessage": true,
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\usr\\bin\\bash.exe",
"git.autofetch": true,
"git.confirmSync": false,
"git.enableSmartCommit": true,
"gitlens.keymap": "none",
"gitlens.codeLens.authors.enabled": false,
"gitlens.codeLens.recentChange.enabled": false,
"gitlens.currentLine.enabled": false,
"gitlens.statusBar.alignment": "left",
"gitlens.statusBar.format": "${authorAgoOrDate} · ${message}",
"gitlens.statusBar.dateFormat": "YYYYMMDD",
// 视情况采用
"vim.useCtrlKeys": false,
"vim.startInInsertMode": true,
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

#### Basic Editing

 Key               | Command           | Command id
------------------ | ----------------- | ----------
`Shift+Ctrl+K`     | Delete Line       | editor.action.deleteLines
`Ctrl+Enter`       | Insert Line Below | editor.action.insertLineAfter
`Shift+Ctrl+Enter` | Insert Line Above | editor.action.insertLineBefore
`Alt+Down`         | Move Line Down    | editor.action.moveLinesDownAction
`Alt+Up`           | Move Line Up      | editor.action.moveLinesUpAction
`Shift+Alt+Down`   | Copy Line Down    | editor.action.copyLinesDownAction
`Shift+Alt+Up`     | Copy Line Up      | editor.action.copyLinesUpAction
`Ctrl+Shift+Alt+Down`   | Column Select Down    | cursorColumnSelectDown
`Ctrl+Shift+Alt+Up`     | Column Select Up      | cursorColumnSelectUp
`Ctrl+]`           | Indent Line       | editor.action.indentLines
`Ctrl+[`           | Outdent Line      | editor.action.outdentLines
`Ctrl+/`           | Toggle Line Comment | editor.action.commentLine
`Ctrl+Delete`      | 删除一个单词        | 

#### Rich Languages Editing

 Key               | Command           | Command id
------------------ | ----------------- | ----------
`Ctrl+Space`       | Trigger Suggest   | editor.action.triggerSuggest
`Shift+Ctrl+Space` | Trigger Parameter Hints | editor.action.triggerParameterHints
`Shift+Alt+F`      | Format Code       | editor.action.format
`F12`              | Go to Definition  | editor.action.goToDeclaration
`Alt+F12`          | Peek Definition 弹窗 | editor.action.previewDeclaration
`Ctrl+K F12`       | Open Definition to the Side | editor.action.openDeclarationToTheSide
`Ctrl+.`           | Quick Fix         | editor.action.quickFix
`Shift+F12`        | Show References   | editor.action.referenceSearch.trigger
`F2`               | Rename Symbol     | editor.action.rename

#### Navigation

 Key               | Command           | Command id
------------------ | ----------------- | ----------
`Ctrl+G`           | Go to Line...     | workbench.action.gotoLine
`Ctrl+P`           | Go to File..., Quick Open | workbench.action.quickOpen
`Ctrl+Shift+O`     | Go to Symbol...   | workbench.action.gotoSymbol
`Ctrl+Shift+M`     | Show Problems     | workbench.actions.view.problems
`Ctrl+Shift+P`     | Show All Commands | workbench.action.showCommands
`Alt+Left`         | Go Back           | workbench.action.navigateBack
`Alt+Right`        | Go Forward        | workbench.action.navigateForward
`Ctrl+Shift+\`     | 在匹配括号中跳转  | 

#### Display

 Key         | Command            | Command id
------------ | ------------------ | ----------
`Ctrl+B`     | Toggle SideBar     | 
`F11`        | Toggle Full Screen | workbench.action.toggleFullScreen
`Ctrl++`     | Zoom in            | workbench.action.zoomIn
`Ctrl+-`     | Zoom out           | workbench.action.zoomOut
`Ctrl+Shift+F` | Show Search      | workbench.view.search

#### Debug

 Key         | Command            | Command id
------------ | ------------------ | ----------
`F9`         | Toggle Breakpoint  | editor.debug.action.toggleBreakpoint
`F5`         | Continue / Pause / Start
`Shift+F5`   | Stop               | workbench.action.debug.stop
`F11`        | Step Into          | workbench.action.debug.stepInto
`Shift+F11`  | Step Out           | workbench.action.debug.stepOut
`F10`        | Step Over          | workbench.action.debug.stepOver

#### Side by side editing

 Key         | Command            | Command id
------------ | ------------------ | ----------
`Ctrl+Tab`   | 切换标签页         | 
`Ctrl+1`     | 切换到第一栏       | 
`Ctrl+2`     | 切换到第二栏       | 
`Ctrl+单击` `Ctrl+\`  | 在右栏打开         | 
`Ctrl+双击`  | 新开一栏打开文件   | 


## 配置 - 其他

### Display Language

`Ctrl+Shift+P` > config 设置语言并重启生效。`en` 英文 `zh-cn` 简体中文。

### Color Themes

