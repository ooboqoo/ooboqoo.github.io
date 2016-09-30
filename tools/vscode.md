# Visual Studio Code

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






