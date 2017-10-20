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
```

### React code snippets

这个插件用的人比较多，但是 snippet prefix 前缀设置有问题(太短)，想使用需要关闭智能提示:

```
  "editor.tabCompletion": true,
  "editor.quickSuggestions": {"other": false, "comments": false, "strings": false },
```

觉得需要改造一下，或者自己定义 https://code.visualstudio.com/docs/editor/userdefinedsnippets

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

问题处理 -- 无法连接 Chrome：`Chrome启动图标右击 -> 属性 -> 目标` 修改为   
`"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222`

感觉直接在编辑器下断点、查看调用堆栈、以及查看变量都比较方便；`watch` 项用于监控变量，需要手动输入变量名，调试过程会实时监控该变量。

> 其实这里的功能，Chrome 都有，在浏览器调试，需要先找到代码再调试，但不用切换；在编辑器调试，不用找代码，但调试过程中需要在浏览器与编辑器之间切换，总体感觉还不如直接在浏览器中调试。

### Beautify

vscode 虽然内置了 js-beautify，但功能被缩减很多，像 scss 文件就不支持，所以还得装这个。

### vscode-tslint

使用该插件之前需要先全局安装好 TSLint。

使用说明：http://palantir.github.io/tslint/usage/rule-flags/

创建配置文件：
```bash
tslint --init
```

单文件修改配置(只能开关某项设置，没有办法调整设置值)：
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

### angular2-inline

提供 angular2 内嵌模板的语法高亮。

### Path Intellisense

路径自动补齐。

### Better Merge

提供更好的冲突合并支持。


## Editor

### The Basic

### Editing Evolved

#### Multiple Selections

`Ctrl+D` 选中一个词  
`Alt+Click` 添加一个光标  

#### Shrink/expand selection

`Shift+Alt+Left` and `Shift+Alt+Right`

#### Column (box) text selection

多行编辑: `Ctrl+Alt+Up` or `Ctrl+Alt+Down` 或 `Ctrl+Shift+Alt+Up` or `Ctrl+Shift+Alt+Down`  
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

条件断点：先正常设置断点，然后在断点上右击 -> 编辑断点 就可以设置条件断点了。条件断点目前支持 ‘表达式’ 和 ‘命中次数’ 两种方式。

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
实时编辑：通过开发工具，我们可以实时改变样式，DOM 结构，另外，在调试断点处暂停时，还可以通过在控制台输入命令，**变更代码运行环境**(就是在断点处可以实时插入调试代码，如改变变量值啥的)。

#### Debug actions

* Continue: continues code execution until we encounter another breakpoint
* Step Over: step through code line-by-line to get insights into how each line affects the variables being updated. Should your code call another function, the debugger won't jump into its code, instead stepping over so that the focus remains on the current function(scope).
* Step Into: like Step Over, however clicking Step into at the function call will cause the debugger to move its execution to the first line in the functions definition.
* Step Out: having stepped into a function, clicking this will cause the remainder of the funciton definiton to be run and the debugger will move its execution to the parent function.

#### `debugger` 关键字

The debugger keyword stops the execution of JavaScript, and calls (if available) the debugging function.

This has the same function as setting a breakpoint in the debugger.

If no debugging is available, the debugger statement has no effect.

使用 debugger 关键字设置断点，效果同在调试器中设置断点。如果调试器处于打开状态，代码运行到 `debugger;` 时会中断，如果没开调试器，则会被忽略。

> 2016/11/8 调试时，碰到断点代码与实际代码错位的问题，ts 转 js 然后又 webpack 结果调试时差了 4行(这次问题出在 webpack 配置 devtool: 'eval-cheap-module-source-map' 改 'source-map' 后运行正常，估计是 angular2 templateUrl 导致的问题)，这问题很坑，调试器整个都不能正常工作，使用 debugger 可以快速发现到底有没有错行，或者是错了几行。
> 
> 错行导致的另外一个问题是，代码旁边的变量计算结果备注，或者是当鼠标移动到代码上时的显示结果，会出现偏差。具体情况是，结果是根据实际代码执行情况实时计算的(跟此时在 console 里输入变量的返回结果是一样的)，而代码定位器与实际代码执行进度不同，结果会出现怪异的结果：
> ```ts
> let a = 1;  // 计算结果 a = undefined, 这与代码表面期望结果不符，令人费解
> // some other code, 调试器指针处于这一行，而实际运行连上一行都还没执行
> ```

## Customization

### User and Workspace Settings

```json
{
    "workbench.activityBar.visible": false,  // 关闭左侧导航条
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\usr\\bin\\bash.exe",  // 终端用 bash
    "editor.rulers": [ 100 ],
    "editor.tabSize": 2,
    "editor.wrappingIndent": "indent",      // 换行后是否缩进显示
    "editor.renderWhitespace": "boundary",  // 显示空白--两边显示，中间不显示
    "editor.detectIndentation": false,      // 是否自动根据打开文件调整缩进设置
    "editor.renderIndentGuides": true,      // 显示缩进指示
    "editor.minimap.enabled": true,         // 显示右侧缩略图
    "workbench.iconTheme": "vs-seti",       // 文件导航栏显示文件图标
    "git.autorefresh": false,               // 这个开着的话，每次刷新会触发 webpack-dev-server 编译
    "flow.runOnEdit": false                 // 安装 flow 插件后，如果开启输入检测，会很卡
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
`Ctrl+Shift+Alt+Down`   | Column Select Down    | cursorColumnSelectDown
`Ctrl+Shift+Alt+Up`     | Column Select Up      | cursorColumnSelectUp
`Ctrl+]`           | Indent Line       | editor.action.indentLines
`Ctrl+[`           | Outdent Line      | editor.action.outdentLines
`Ctrl+/`           | Toggle Line Comment | editor.action.commentLine
`Ctrl+Delete`      | 删除一个单词        | 。

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

#### Customizing Shortcuts

File > Preferences > Keyboard Shortcuts.

### Display Language

`Ctrl+Shift+P` > config 设置语言并重启生效。`en` 英文 `zh-cn` 简体中文。

### Color Themes

## LANGUAGES

### Markdown

Markdown Preview：`Ctrl+Shift+v` 预览；`Ctrl+K V` 侧栏预览
