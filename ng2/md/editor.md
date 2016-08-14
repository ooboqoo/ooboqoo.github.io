# 使用 Sublime Text 编辑 TypeScript

[article source](https://cmatskas.com/getting-started-with-typescript-and-sublime-text/)

单文件编译 `Ctrl + B` 

### TSCONFIG.JSON

通过修改该配置文件，可以将指定的多个 ts 文件编译成单个 js 文件，并且可以在这里设置其他编译选项。

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "out": "../../built/local/tsc.js",
        "sourceMap": true
    },
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "emitter.ts",
        "program.ts",
        "commandLineParser.ts",
        "tsc.ts",
        "diagnosticInformationMap.generated.ts"
    ]
}
```

### 实时错误提示

开启实时错误提示：`Ctrl+Shft+P -> Typescript: ShowErrorList`

TypeScrip 插件的完整指令列表，可以通过命令行面板或快捷键开启

```
Rename             =>    Ctrl+T Ctrl+M  
Find references    =>    Ctrl+T Ctrl+R  
Next reference     =>    Ctrl+T Ctrl+N  
Prev reference     =>    Ctrl+T Ctrl+P  
Format document    =>    Ctrl+T Ctrl+F  
Format selection   =>    Ctrl+T Ctrl+F  
Format line        =>    Ctrl+;  
Format braces      =>    Ctrl+Shift ]  
Navigate to symbol =>    Ctrl+ Alt R  
Go to definition   =>    Ctrl+T Ctrl+D or F12  
Paste and format   =>    Ctrl+V or Command+V  
Quick info         =>    Ctrl+T Ctrl+Q  
Build              =>    (Win)Ctrl+B or F7, (OSX) Command+B or F7  
Error list         =>    (via Command Palette)
```
