# EditorConfig

官网：http://editorconfig.org/   
配置项完全手册：https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties

EditorConfig 帮助开发者在不同的编辑器和 IDEs 之间保持代码的一致性。EditorConfig 易读且能与版本控制系统很好地兼容。

WebStorm 和 GitHub 默认支持 EditorConfig，而 Sublime 则需要安装插件来读取配置文件。

配置文件的固定名字是 .editorconfig，EditorConfig 会从当前文件开始逐级向上搜索配置文件，直到根目录，然后所有配置会拼合在一起，离文件越近的优先级越高，跟 CSS 的规则是一致的。

.editorconfig 配置文件范例：

```ini
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

范例2： bootstrap/.editorconfig

```ini
# editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.py]
indent_size = 4
```
