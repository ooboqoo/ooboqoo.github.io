# Visual Studio Code

## 插件使用

### Angular 2 TypeScript Snippets

Type part of a snippet, press enter, and the snippet unfolds.

TypeScript Snippets

```txt
ng2-bootstrap       // Angular 2 bootstrapping, for main.ts
ng2-component       // Angular 2 component
ng2-component-root  // Angular 2 root app component
ng2-http-get        // Angular 2 http.get with Rx Observable
ng2-module          // Angular 2 module
ng2-module-root     // Angular 2 root app module
ng2-pipe            // Angular 2 pipe
ng2-routing         // Angular 2 routing
ng2-service         // Angular 2 service
ng2-subscribe       // Angular 2 Rx Observable subscription
```

HTML Snippets

```
ng2-ngClass
ng2-ngFor
ng2-ngIf
ng2-ngModel
ng2-routerLink
ng2-ngStyle
ng2-ngSwitch
Alternatively, press Ctrl+Space (Windows, Linux) or Cmd+Space (OSX) to activate snippets from within the editor.
```

### Debugger for Chrome

Supported features

* Setting breakpoints, including in source files when source maps are enabled
* Stepping, including with the buttons on the Chrome page
* The Locals pane
* Debugging eval scripts, script tags, and scripts that are added dynamically
* Watches
* Console

Unsupported scenarios

* Debugging web workers
* Any features that aren't script debugging.

问题处理 -- 无法连接 Chrome：

* 方法1：打开调试之前需要将所有 Chrome 窗口关闭。
* 方法2：`Chrome启动图标右击 -> 属性 -> 目标` 修改为   
  `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222`

感觉直接在编辑器下断点、查看调用堆栈、以及查看变量都比较方便；
`watch` 项用于监控变量，需要手动输入变量名，调试过程会实时监控该变量。

### vscode-tslint

使用该插件之前需要先全局安装好 TSLint。

#### TSLint

使用说明：http://palantir.github.io/tslint/usage/rule-flags/

创建配置文件：
```bash
tslint --init
```

单文件修改配置：
```ts
/* tslint:disable:quotemark */
```

### TODO Paser

功能描述：列出项目中的 `Todo` 待完成项，支持单行或多行中的 `TODO:` `Todo:` 标记。

使用：列出当前项目的待完成项清单 `F1 > Parse TODOs (all files)`.

设置：

```js
{
  "TodoParser": {
    "include": ["ts"],
    "folderExclude": ["node_modules", ".vscode"],
    "only": ["app/win"],
  }
}
```


## Editor

### The Basic

### Editing Evolved

#### Multiple Selections

`Ctrl+D` 选中一个词  
`Alt+Click` 添加一个光标  

#### Shrink/expand selection

`Shift+Alt+Left` and `Shift+Alt+Right`

#### Column (box) text selection

`Shift + Alt + 拖动`  

#### Folding

### Debugging



## Customization

### Key Bindings 快捷键大本营

#### Basic Editing

 Key               | Command           | Command id
------------------ | ----------------- | ----------
`Ctrl+Shift+K`     | Delete Line       | editor.action.deleteLines
`Ctrl+Enter`       | Insert Line Below | editor.action.insertLineAfter
`Ctrl+Shift+Enter` | Insert Line Above | editor.action.insertLineBefore
`Alt+Down`         | Move Line Down    | editor.action.moveLinesDownAction
`Alt+Up`           | Move Line Up      | editor.action.moveLinesUpAction
`Shift+Alt+Down`   | Copy Line Down    | editor.action.copyLinesDownAction
`Ctrl+Shift+D` 改  | Copy Line Down    | editor.action.copyLinesDownAction
`Shift+Alt+Up`     | Copy Line Up      | editor.action.copyLinesUpAction
`Ctrl+]`           | Indent Line       | editor.action.indentLines
`Ctrl+[`           | Outdent Line      | editor.action.outdentLines
`Ctrl+/`           | Toggle Line Comment | editor.action.commentLine

#### Rich Languages Editing

 Key               | Command           | Command id
------------------ | ----------------- | ----------
`Ctrl+Space`       | Trigger Suggest   | editor.action.triggerSuggest
`Ctrl+Shift+Space` | Trigger Parameter Hints | editor.action.triggerParameterHints
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

#### Display

 Key         | Command            | Command id
------------ | ------------------ | ----------
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

#### Customizing Shortcuts

File > Preferences > Keyboard Shortcuts.

#### Common Questions

Q: How to find out what command is bound to a specific key?   
A: In the Default Keyboard Shortcuts, open Quick Outline by pressing `Ctrl+Shift+O`

### Display Language

`Ctrl+Shift+P` > config 设置语言并重启生效。`en` 英文 `zh-cn` 简体中文。

### Color Themes






