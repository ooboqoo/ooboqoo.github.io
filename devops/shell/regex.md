# POSIX Regex

https://en.wikipedia.org/wiki/Regular_expression   
http://zytrax.com/tech/web/regex.htm   
http://perldoc.perl.org/perlre.html   

正则表达式并不是一个工具程序，而是一种字符串处理的标准依据。

A regular expression, regex or regexp is a sequence of characters that define a **search pattern**. Usually this pattern is used by string searching algorithms for "find" operations, or for input validation.

## 通配符

### 命令行通配符

http://man7.org/linux/man-pages/man7/glob.7.html

glob (programming), a mini-language used for pattern matching of file and folder paths.

一次性操作多个文件时，命令行提供通配符 wildcards，用一种很短的文本模式(通常只有一个字符)，简洁地代表一组路径。

||
|---------------------|--------------------------------------------------------------
| `?`                 | 匹配单个字符
| `*`                 | 匹配任意数量的字符
| `[…]` `[start-end]` | 匹配方括号之中的任意一个字符 / 一个连续范围内的字符
| `[^…]` `[!…]`       | 匹配不在方括号里面的字符
| `{…,…}`             | 匹配大括号里面的所有模式，模式之间使用逗号分隔，逗号后面不能有空格
| `{start..end}`      | 匹配连续范围的字符
||
| `**` 仅 Node.js 下用 | 匹配多级目录

`{…,…}` 与 `[…]` 有一个很重要的区别。如果匹配的文件不存在，`[…]`会以一个单纯的字符串再匹配一次，而 `{…,…}` 只要其中的 `,` 没有转义，则始终是展开的。

大括号可以嵌套，也可以与其他模式联用。

```bash
$ echo {j{p,pe}g,png}  # jpg jpeg png
$ echo {a..d}          # a b c d
$ echo {a1..3c}        # {a1..3c}
```

注意点：
  * 通配符是先解释，再执行
  * 通配符不匹配，会原样输出
  * 所有通配符只匹配单层路径，**不能跨目录匹配**
  * 可用于文件名。Bash 允许文件名使用通配符。这时，需要把文件名放在单引号里面。

命令行通配符与正则表达式的区别
  * 通配符早于正则表达式出现，可以看作是原始的正则表达式。
  * glob patterns 用于**匹配文件名或路径**，而 regular expressions 用于匹配文本
  * 两者规则也有所差异，`*` 在正则中是量词

```bash
$ ls /etc/cron*    # 找出以 cron 开头的文件
$ ls /etc/*[0-9]*  # 找出至少包含单个数字的文件
$ ls /etc/[^a-z]*  # 找出不是小写字母开头的文件
```


## POSIX 正则

### 一些特殊符号

Named character classes

| 特殊符号        | 代表意义
|----------------|----------------------------------------------------------------
| `[[:alnum:]]`  | 代表英文大小写字符及数字，亦即 `0-9` `A-Z` `a-z`
| `[[:alpha:]]`  | 代表任何英文大小写字符，亦即 `A-Z` `a-z`
| `[[:upper:]]`  | 代表大写字符，亦即 `A-Z`
| `[[:lower:]]`  | 代表小写字符，亦即 `a-z`
| `[[:digit:]]`  | 代表数字，亦即 `0-9`
| `[[:blank:]]`  | 代表空白键与 Tab 键
| `[[:xdigit:]]` | 代表十六进制的数字类型，因此包括： `0-9` `A-F` `a-f` 的数字与字符
| `[[:punct:]]`  | 代表标点符号(punctuation symbol)，亦即 `"` `'` `?` `!` `;` `:` `#` `$` ...
||
| `[[:cntrl:]]`  | 代表键盘上面的控制按键，亦即包括 CR, LF, Tab, Del.. 等等
| `[[:print:]]`  | 代表任何可以被打印出来的字符
| `[[:space:]]`  | 任何会产生空白的字符，包括空白键, Tab, CR 等等
| `[[:graph:]]`  | 除了空白字符(空白键与 Tab 按键) 外的其他所有按鍵

`\n`  匹配一个新行  
`\t`  这个并不在 POSIX 标准之内，但有很多变通用法可实现，每种方法又有其特定限制和适用场合  
`\b`  empty string at the edge of a word  
`\B`  empty string provided it's not at the edge of a word  
`\w`  synonym for `[_[:alnum:]]`  
`\W`   synonym for `[^_[:alnum:]]`

### 正则表达式字符

| RE 字符   | 意义与范例
|-----------|-----------------------------------------------------------------
| `^word`   | 行首 `grep -n '^#' rege.txt`
| `word$`   | 行尾 `grep -n '!$' rege.txt`
| `.`       | 一个任意字符 `grep -n 'e.e' rege.txt`
| `\`       | 转义字符 `grep -n \' rege.txt`
||
| `[list]`  | 字符集合, 仅代表字符集内的某一个字符 `grep -n 'g[ld]' rege.txt`
| `[n1-n2]` | 字符范围，代表两个字符之间的所有连续字符 `grep -n '[A-Z]' rege.txt`
| `[^list]` | 非，列出不要的字符串或范围 `grep -n 'oo[^t][^A-Z]' rege.txt`
||
| `\{min,max\}` | 连续 n 到 m 个前字符 `grep -n 'go\{2,3\}g' rege.txt`
| `\{n\}`       | 连续 n 个前字符
| `\{min,\}`    | 连续 n 个以上的前一个 RE 字符
| `*`           | 零个到无穷多个的前一个 RE 字符 `grep -n 'ess*' rege.txt`
| `\?`          | 零个或一个前字符
| `\+`          | 一个或一个以上的前字符
||
| <code> \&#124; </code> | 或
| `\(regexp\)`           | 组
| `\num`                 | back reference，从 1 开始计数

### BRE vs ERE

Basic vs Extended Regular Expressions

BRE 和 ERE 都是基于早期的 UNIX grep 发展而来，BRE 注重后向兼容，而 ERE 则更接近现代其他正则规范的写法。

In basic regular expressions the meta-characters `?` `+` `{` `|` `(` and `)` lose their special meaning; instead use the backslashed versions `\?` `\+` `\{` `\|` `\(` and `\)`.


## grep & sed & awk

### `grep` 过滤

grep (**g**lobally search a **r**egular **e**xpression and **p**rint) - print lines matching a pattern  
是强大的文本搜索工具，使用正则表达式搜索文本，并打印匹配行。

```bash
$ grep [OPTIONS] PATTERN [FILE...]
  # -G, --basic-regexp
  # -E, --extended-regexp
  # -P, --perl-regexp
  # -F, --fixed-strings

  # -i, --ignore-case
  # -v, --invert-match

  # -c, --count
  # --color[=WHEN], --colour[=WHEN]

  # -n, --line-number
```

```bash
$ dmesg | grep -n -A3 -B2 --color=auto 'eth'  # 显示行号；并显示关键字所在行前2行和后3行；关键字高亮
$ grep -n 'the' rege.txt
  # 再用 't[ae]st' '[^g]oo' '[^a-z]oo' '[0-9]' '[^[:lower:]]oo' 等替换测试
  # '^the' '^[[:lower:]]' '\.$' '^$' 'g..d' 'o\{2\}' 'go\{2,5\}g' 'go\{2,\}g'
```

### `sed` 编辑

stream editor for filtering and transforming text

sed 可以将数据进行替换、删除、新增、选取特定行等。

```bash
$ sed [OPTION]... {script-only-if-no-other-script} [input-file]...
  # -i[SUFFIX], --in-place[=SUFFIX]  edit files in place (makes backup if SUFFIX supplied)
  # -E, -r, --regexp-extended  use extended regular expressions in the script

# 插入
$ sed

# 替换行
$ sed [地址范围]/p  # 打印指定的地址范围
$ sed [地址范围]/d  # 删除指定的地址范围

# 替换字符串
$ sed 's/被替换字符串/新字符串/g'
$ sed "[地址范围]/s/pattern1/pattern2/"  # 替换指定地址范围内的第一个匹配项
$ sed [地址范围]/y/pattern1/pattern2/
```







```bash
$ sed -i "s/\"version\": *\"[0-9.]\+\"/\"version\": \"${CI_COMMIT_TAG}\"/" package.json
```

### `awk` 统计分析

### `diff`

终端下 `vimdiff` 更为好用，GUI 则推荐 meld。

```bash
$ diff [-bBi] from-file to-file  # 比较新旧两个文件
$ diff /etc/rc3.d/ /etc/rc5.d/   # 比较两个目录，会自动比较两个目录下的同名文件的内容
$ diff -Naur passwd.old passwd.new > passwd.patch  # 制作补丁文件
$ patch -p0 < passwd.patch       # 将 passwd.old 更新成 passwd.new
```


## 应用: 日志分析

日志是我们排查问题的一个重要依据。线上日志堆积的长度往往远超我们一行行浏览的耐性极限，需要借助一些手段来辅助高效地从日志中查找问题。下文会从查找日志，筛选日志和统计日志3个方面层层递进来简述日志文件查看中一些常用手段。

### 日志查看

查找文件内容的常用命令方法

```bash
$ grep "被查找的字符串" 文件名     # 从文件内容查找匹配指定字符串的行
$ grep –e "正则表达式" 文件名      # 从文件内容查找与正则表达式匹配的行
$ grep –i "被查找的字符串" 文件名  # 查找时不区分大小写
$ grep -c "被查找的字符串" 文件名  # 统计匹配的行数
$ grep –v "被查找的字符串" 文件名  # 查找不匹配指定字符串的行

# 从根目录开始查找所有扩展名为 .log 的文本文件，并找出包含 ERROR 的行
$ find / -type f -name "*.log" | xargs grep "ERROR"
# 如果需要查找的内容包含特殊符号，比如 $ 等，grep 要加参数 -F
$ find ./ -name "*.php" | xargs grep -F '要查找的内容'
```

### 日志处理

精简日志内容 sed

```bash
sed
```

对记录进行排序 sort

```bash
sort
```

统计日志相关记录数 awk

```bash
awk
```

### 日志规范化

制定合理的日志文件输出规范，以便于后续分析处理，以下格式供参考

```txt
2019-04-27 08:29:49.598 INFO [Record]: 开始启动录音插件
2019-04-27 09:25:55.658 WARN [Record]: 启动录音耗时 3s
2019-04-27 09:25:55.606 ERROR [Record]: 结束录音失败, error.message, error.stack
```
