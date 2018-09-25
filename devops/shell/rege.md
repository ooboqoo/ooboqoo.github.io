# POSIX RegE

https://en.wikipedia.org/wiki/Regular_expression   
http://zytrax.com/tech/web/regex.htm   
http://perldoc.perl.org/perlre.html   

正则表达式并不是一个工具程序，而是一种字符串处理的标准依据。


## 通配符

### 命令行通配符

http://man7.org/linux/man-pages/man7/glob.7.html

glob (programming), a mini-language used for pattern matching of file and folder paths.

一次性操作多个文件时，命令行提供通配符 wildcards，用一种很短的文本模式（通常只有一个字符），简洁地代表一组路径。

||
----------|-------------------------------
 `?`      | 匹配单个字符
 `*`      | 匹配任意数量的字符
 `[...]` `[start-end]`   | 匹配方括号之中的任意一个字符 / 一个连续范围内的字符
 `[^...]` `[!...]` | 匹配不在方括号里面的字符
 `{...}`  | 匹配大括号里面的所有模式，模式之间使用逗号分隔
 `{start..end}`    | 匹配连续范围的字符
 `**` node.js      | 匹配多级目录

`{...}` 与 `[...]` 有一个很重要的区别。如果匹配的文件不存在，`[...]`会以一个单纯的字符串再匹配一次，而 `{..., ...}` 只要其中的 `,` 没有转义，则始终是展开的。

大括号可以嵌套，也可以与其他模式联用。

```bash
$ echo {j{p,pe}g,png}  # jpg jpeg png
$ echo {a..d}          # a b c d
$ echo {a1..3c}        # {a1..3c}
```

注意点：
  * 通配符是先解释，再执行
  * 通配符不匹配，会原样输出
  * 所有通配符只匹配单层路径，不能跨目录匹配
  * 可用于文件名。Bash 允许文件名使用通配符。这时，需要把文件名放在单引号里面。

命令行通配符与正则表达式的区别
  * 通配符早于正则表达式出现，可以看作是原始的正则表达式。
  * glob patterns 用于匹配文件名或路径，而 regular expressions 用于匹配文本
  * 两者规则也有所差异，`*` 在正则中是量词


## POSIX 正则

### 一些特殊符号

特殊符号     | 代表意义
-------------|----------------------------------------------------------------
`[:alnum:]`  | 代表英文大小写字符及数字，亦即 0-9, A-Z, a-z
`[:alpha:]`  | 代表任何英文大小写字符，亦即 A-Z, a-z
`[:blank:]`  | 代表空白键与 [Tab] 键
`[:cntrl:]`  | 代表键盘上面的控制按键，亦即包括 CR, LF, Tab, Del.. 等等
`[:digit:]`  | 代表数字，亦即 0-9
`[:graph:]`  | 除了空白字符 (空白键与 [Tab] 按键) 外的其他所有按鍵
`[:lower:]`  | 代表小写字符，亦即 a-z
`[:print:]`  | 代表任何可以被打印出来的字符
`[:punct:]`  | 代表标点符号 (punctuation symbol)，亦即：" ' ? ! ; : # $...
`[:upper:]`  | 代表大写字符，亦即 A-Z
`[:space:]`  | 任何会产生空白的字符，包括空白键, [Tab], CR 等等
`[:xdigit:]` | 代表十六进制的数字类型，因此包括： 0-9, A-F, a-f 的数字与字符

### 基础正则表达式字符

RE 字符 | 意义与范例
--------|-----------------------------------------------
`^word` | 行首 `grep -n '^#' rege.txt`
`word$` | 行尾 `grep -n '!$' rege.txt`
`.`     | 一个任意字符 `grep -n 'e.e' rege.txt`
`\`     | 转移字符 `grep -n \' rege.txt`
`*`     | 零个到无穷多个的前一个 RE 字符 `grep -n 'ess*' rege.txt`
`[list]`| 字符集合, 仅代表字符集内的某一个字符 `grep -n 'g[ld]' rege.txt`
`[n1-n2]` | 字符范围，代表两个字符之间的所有连续字符 `grep -n '[A-Z]' rege.txt`
`[^list]` | 非，列出不要的字符串或范围 `grep -n 'oo[^t][^A-Z]' rege.txt`
`\{n,m\}` | 连续 n 到 m 个前字符 `grep -n 'go\{2,3\}g' rege.txt`
`\{n\}`   | 连续 n 个前字符
`\{n,\}`  | 连续 n 个以上的前一个 RE 字符

### 扩展正则表达式

RE 字符 | 意义与范例
--------|-----------------------------------------------
`+`     | 一个或一个以上的前字符
`?`     | 零个或一个前字符
<code> &#124; </code> | 或
`()`    | 组
`()+`   | 多个重复组

### `grep` 高阶练习

```bash
$ dmesg | grep -n -A3 -B2 --color=auto 'eth'  # 显示行号；并显示关键字所在行前2行和后3行；关键字高亮
$ grep -n 'the' rege.txt
  # 再用 't[ae]st' '[^g]oo' '[^a-z]oo' '[0-9]' '[^[:lower:]]oo' 等替换测试
  # '^the' '^[[:lower:]]' '\.$' '^$' 'g..d' 'o\{2\}' 'go\{2,5\}g' 'go\{2,\}g'
```

### `sed` 工具

sed 本身也是一个管道命令，可以分析 stdin 的，而且 sed 还可以将数据进行替换、删除、新增、选取特定行等的功能。

### `awk` 好用的数据处理工具

### `diff`

终端下 `vimdiff` 更为好用，GUI 则推荐 meld。

```bash
$ diff [-bBi] from-file to-file  # 比较新旧两个文件
$ diff /etc/rc3.d/ /etc/rc5.d/   # 比较两个目录，会自动比较两个目录下的同名文件的内容
$ diff -Naur passwd.old passwd.new > passwd.patch  # 制作补丁文件
$ patch -p0 < passwd.patch       # 将passwd.old 更新成 passwd.new
```
