# 正则表达式

https://www.gnu.org/software/grep/manual/html_node/Regular-Expressions.html   
https://en.wikipedia.org/wiki/Regular_expression   
http://www.pcre.org/original/doc/html/pcresyntax.html   
http://zytrax.com/tech/web/regex.htm   

正则表达式并不是一个工具程序，而是一种字符创处理的标准依据。

> 正则表达式与通配符是完全不一样的东西！通配符是 bash 操作接口的一个功能，而正则表达式则是一种字符串处理的表达方式。

## POSIX

#### 元字符 Meta-characters

|||
|---------|-----------------------------------------------
| `^`     | 行首
| `$`     | 行尾
| `.`     | 一个任意字符
| `\`     | 转义符号
| <code> &#124; </code> | 可选分支，如 <code> abc&#124;aec </code> 会匹配 abc 或 aec
|         | 其他元字符 `?`  `*` `+` `{` `}` `[` `-` `]` `(` `)`

在 BRE (basic regular expression) 中 `?` `+` `{` `|` `(` `)` 这几个字符只是普通字符，但在 ERE (extended regular expression) 中他们都是有特殊用途的元字符。

#### 量词 Repetition Operators

|||
|---------|-----------------------------------------------
| `?`     | 零个或一个字符
| `*`     | 零个到无穷多个字符
| `+`     | 一个或一个以上字符
| `{n,m}` | 连续 n 到 m 个字符
| `{n}`   | 连续 n 个字符
| `{n,}`  | 连续 n 个以上字符

#### 字符集合 Bracket Expressions

| 符号 | 示例     | 前提             | 描述
|:----:|----------|------------------|-----------------------------------------------
| `[]` | `[abc]`  |                  | 字符集合, 仅代表字符集内的某一个字符
| `-`  | `[A-z]`  | 位于两个字符之间 | 字符范围，代表两个字符之间的所有连续字符
| `^`  | `[^abc]` | 位于开头         | 非，列出不要的字符串或范围

在 `[]` 内部，只有 `\` `-` `^` 三个字符被赋予了特殊含义，其他都被认为是普通字符，

#### 字符类 Character Classes

| POSIX       | Perl | Vim   | ASCII             | Description
|-------------|------|-------|-------------------|-----------------------------------
| `[:alnum:]` |      |       | `[A-Za-z0-9]`     | Alphanumeric characters
| `\w`        | `\w` | `\w`  | `[A-Za-z0-9_]`    | Alphanumeric characters plus "_"
| `\W`        | `\W` | `\W`  | `[^A-Za-z0-9_]`   | Non-word characters
| `[:digit:]` | `\d` | `\d`  | `[0-9]`           | Digits
|             | `\D` | `\D`  | `[^0-9]`          | Non-digits
| `[:xdigit:]`|      | `\x`  | `[A-Fa-f0-9]`     | Hexadecimal digits
| `[:alpha:]` |      | `\a`  | `[A-Za-z]`        | Alphabetic characters
| `[:lower:]` |      | `\l`  | `[a-z]`           | Lowercase letters
| `[:upper:]` |      | `\u`  | `[A-Z]`           | Uppercase letters
| | | | |
| `[:blank:]` |      | `\s`  | `[ \t]`           | Space and tab
| `[:space:]` | `\s` | `\_s` | `[ \t\r\n\v\f]`   | Whitespace characters
|  `\S`       | `\S` | `\S`  | `[^ \t\r\n\v\f]`  | Non-whitespace characters
| | | | |
| `[:punct:]` |      |       | <code>[][!"#$%&'()*+,./:;<=>?@\^_`{}~-]&#124;</code> | Punctuation characters
| `[:graph:]` |      |       | `[\x21-\x7E]`     | Visible characters: [:alnum:] and [:punct:]
| `[:print:]` |      | `\p`  | `[\x20-\x7E]`     | Printable characters: [:graph:] and space
| `[:cntrl:]` |      |       | `[\x00-\x1F\x7F]` | Control characters: CR, LF, Tab, Del..

#### 特殊转义字符 Backslash Character and Special Expressions

| POSIX       | Perl | Vim   | ASCII             | Description
|-------------|------|-------|-------------------|-----------------------------------
| `\w`        | `\w` | `\w`  | `[A-Za-z0-9_]`    | Alphanumeric characters plus "_"
| `\W`        | `\W` | `\W`  | `[^A-Za-z0-9_]`   | Non-word characters
| `\s`        | `\s` | `\_s` | `[ \t\r\n\v\f]`   | Whitespace characters
|  `\S`       | `\S` | `\S`  | `[^ \t\r\n\v\f]`  | Non-whitespace characters
| `\b`        |      |       |                   | Empty string at the edge of a word
| `\B`        |      |       |                   | Empty string not at the edge of a word
| `\<`        |      |       |                   | Empty string at the beginning of word
| `\>`        |      |       |                   | Empty string at the end of word

#### 子组及其引用 Back-references and Subexpressions

|||
|------|--------------------------------------------------------------
| `()` | 子组，子模式
| `\n` | 引用模式中第 n 个子组的匹配内容，引用必须位于所引用子模式之后

`(ab.)\1xyz` 匹配 abcabcxyz abeabexyz 等，但不会匹配 abcabexyz


## PCRE <small>Perl-compatible regular expressions</small>

The PCRE library is a set of functions that implement regular expression pattern matching using the same syntax and semantics as Perl 5. PCRE has its own native API, as well as a set of wrapper functions that correspond to the POSIX regular expression API. 

### 与 POSIX 正则表达式的不同

下面列出了在转向PCRE 时最显著的需要知道的不同点：

1.PCRE 函数需要模式以分隔符闭合。

2.PCRE 扩展没有专门用于大小写不敏感匹配的函数，取而代之的是使用i模式修饰符完成同样的工作。

3.POSIX 函数从最左面开始寻找最长的匹配，但是 PCRE 在第一个合法匹配后停止。如果字符串不匹配这没有什么区别，但是如果匹配，两者在结果和速度上都会有差别。例：使用模式 one(self)?(selfsufficient)? 在字符串 oneselfsufficient 上匹配，PCRE 会匹配到 oneself，而 POSIX 将匹配整个字符串。


## JavaScript RegExp


