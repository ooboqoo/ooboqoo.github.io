# VSCode 插件开发


## 实战：中文拼写检查

文章纠错服务接口文档 /docx/doxcnpldLb0zOQ9HNlCvDmIOqmb   
厂内插件市场接入说明 /wiki/wikcn58YTw0TMkbuiKGIG2IHqke   
参考项目：https://github.com/streetsidesoftware/vscode-spell-checker   

vscode-chinese-spell-checker

用户故事

* 标题
* 概述
* 详述
* 验收标准
  - 界面上面有错误提示
  - 移到错误提示上，能提示建议的文案
  - 点击文案能自动修改为正确文案
  - PROBLEMS 面板会列出具体错误信息
  - 添加配置项目：最多检测多少个错误
  - 一个好看的 Logo

服务端部分
  * 查询缓存 + 缓存不能明文

## 教程

In general, your extension would use a combination of *Contribution Points* and *VS Code API* to extend VS Code's functionality.

### Extension Manifest

_package.json_ 中 vscode 插件特有的字段

https://code.visualstudio.com/api/references/extension-manifest

* `publisher` VS Code uses `<publisher>.<name>` as a unique ID for the extension
* `activationEvents`
* `contributes`

### Extension Entry File

_src/extension.ts_



