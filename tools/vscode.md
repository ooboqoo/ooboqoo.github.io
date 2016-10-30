# Visual Studio Code

> 相关资源： https://github.com/Microsoft/vscode-tips-and-tricks Youtube 有带 1 小时视频

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

### Git Blame

安装之后，会在左下角状态栏处实时显示当前行的最后更改人员。

## 功能需求

文本拖拽，该功能还未实现 2016/10/11 https://github.com/Microsoft/vscode/issues/1046


## Editor

### The Basic

### Editing Evolved

#### Multiple Selections

`Ctrl+D` 选中一个词  
`Alt+Click` 添加一个光标  

#### Shrink/expand selection

`Shift+Alt+Left` and `Shift+Alt+Right`

#### Column (box) text selection

多行编辑: `Ctrl+Alt+Up` or `Ctrl+Alt+Down`  
`Shift + Alt + 拖动`  

#### Undo cursor position

`Ctrl+u`

#### Folding

### Debugging

> 所有这里的功能，只是 Chrome DevTools 功能的一部分(仅针对 Chrome 调试)
> 部分参考视频 https://www.youtube.com/watch?v=-q1z8BPFItw

#### Breakpoints

Breakpoints can be toggled by clicking on the editor margin.
Finer breakpoint control (enable/disable/reapply) can be done in the Debug view's BREAKPOINTS section.

#### Conditional Breakpoints

条件断点：先正常设置断点，然后在断点上右击 -> 编辑断点 就可以设置条件断点了。

#### Function Breakpoints

Instead of placing breakpoints directly in source code, a debugger can support creating breakpoints by specifying a function name.

#### Data inspection

Variables can be inspected in the VARIABLES section of the Debug view or by hovering over their source in the editor.

Variables and expression evaluation is relative to the selected stack frame in the CALL STACK section.

Variables and expressions can also be evaluated and watched in the Debug view WATCH section.

#### Using Console - Chrome

console.log() / console.clear()  
console.assert(expression, object)  
console.table()  
同时输入多行命令：`Shift + Enter`
使用代码片段：`Sources -> Snippets` 右击某条 snippet 选 run 即可执行  
实时编辑：通过开发工具，我们可以实时改变样式，DOM 结构，另外，在调试断点处暂停时，还可以通过在控制台输入命令，变更代码运行环境(就是在断点处可以实时插入调试代码，如改变变量值啥的)。

#### Debug actions

* Continue: continues code execution until we encounter another breakpoint
* Step Over: step through code line-by-line to get insights into how each line affects the variables being updated. Should your code call another function, the debugger won't jump into its code, instead stepping over so that the focus remains on the current function(scope).
* Step Into: like Step Over, however clicking Step into at the function call will cause the debugger to move its execution to the first line in the functions definition.
* Step Out: having stepped into a function, clicking this will cause the remainder of the funciton definiton to be run and the debugger will move its execution to the parent function.

## Customization

### User and Workspace Settings

```json
{
  "editor.rulers": [ 100 ],
  "editor.tabSize": 2,
  "editor.wrappingIndent": "indent",
  "editor.renderWhitespace": "boundary",
  "editor.detectIndentation": false,
  "editor.renderIndentGuides": true,
  "git.autorefresh": false,                          // 这个开着的话，每次刷新会触发 webpack-dev-server 编译
  "typescript.tsdk": "node_modules/typescript/lib"   // 这行还是放到项目 .vscode/settings.json 下面吧
}
```

### Key Bindings 快捷键大本营

```js
{ "key": "f1",                    "command": "workbench.action.showCommands" },
{ "key": "ctrl+shift+p",          "command": "workbench.action.showCommands" },
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
`Ctrl+双击`  | 新看一栏打开文件   | 

#### Customizing Shortcuts

File > Preferences > Keyboard Shortcuts.

#### Common Questions

Q: How to find out what command is bound to a specific key?   
A: In the Default Keyboard Shortcuts, open Quick Outline by pressing `Ctrl+Shift+O`

### Display Language

`Ctrl+Shift+P` > config 设置语言并重启生效。`en` 英文 `zh-cn` 简体中文。

### Color Themes

## LANGUAGES

### Markdown

Markdown Preview：`Ctrl+Shift+v` 预览；`Ctrl+K V` 侧栏预览




