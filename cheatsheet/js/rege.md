# 正则表达式

https://www.gnu.org/software/grep/manual/html_node/Regular-Expressions.html   
https://en.wikipedia.org/wiki/Regular_expression   
http://www.pcre.org/original/doc/html/pcresyntax.html   
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions   
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

### Creating a regular expression

```js
var re = /ab+c/gi;              // 或
var re = new RegExp('ab+c', 'gi');
```

### Regular expression pattern

#### Special characters

|||
|:------:|-------------------------------
| `\`    | 1. Precedes a non-special character indicates that the next character is special <br>2. Precedes a special character indicates that the next character should be interpreted literally
| `^`    | 1. Matches beginning of input. 2. Means 'NOT' when as the first character in a character set pattern
| `$`    | Matches end of input 
| `*`    | Matches the preceding expression 0 or more times. Equivalent to {0,}
| `+`    | Matches the preceding expression 1 or more times. Equivalent to {1,}
| `?`    | 1. Matches the preceding expression 0 or 1 time. Equivalent to {0,1} <br> 2. If used immediately after any of the quantifiers *, +, ?, or {}, makes the quantifier non-greedy <br> 3. Also used in lookahead assertions, as described in the x(?=y) and x(?!y) entries of this table.
| `.`    | Matches any single character except the newline character.
| `(x)`  | Matches 'x' and remembers the match. capturing parentheses. 后向引用 `\n`
| `(?:x)`  | Matches 'x' but does not remember the match. non-capturing parentheses 取消捕获
| `x(?=y)` | Matches 'x' only if 'x' is followed by 'y'. This is called a lookahead. 后置断言
| `x(?!y)` | Matches 'x' only if 'x' is not followed by 'y'. This is called a negated lookahead.
| <code>x&#124;y</code> | Matches either 'x' or 'y'. 选择分支
| `{n}`    | Matches exactly n occurrences of the preceding expression. N must be a positive integer.
| `{n,m}`  | Where n and m are positive integers and n <= m. Matches at least n and at most m occurrences of the preceding expression. When m is omitted, it's treated as ∞.
| `[xyz]`  | Character set, matches any one of the characters in the brackets. <br> Special characters like `.` `*` are not special inside a character set, so they don't need to be escaped. <br> You can specify a range of characters by using a hyphen `-`.
| `[^xyz]` | A negated or complemented character set
| `[\b]`   | Matches a backspace (U+0008). You need to use square brackets if you want to match a literal backspace character. (Not to be confused with \b.)
| `\b`     | Matches a word boundary. (Not to be confused with [\b].) e.g. `/\bm/` matches the 'm' in "moon" ;
| `\B`     | Matches a non-word boundary. e.g. `/y\B./` matches 'ye' in "possibly yesterday."
| `\cX`    | Where X is a character ranging from A to Z. Matches a control character in a string. e.g. `/\cM/` matches control-M 
| `\d`     | Matches a digit character. Equivalent to [0-9].
| `\D`     | Matches a non-digit character. Equivalent to [^0-9].
| `\f`     | Matches a form feed (U+000C).
| `\n`     | Matches a line feed (U+000A).
| `\r`     | Matches a carriage return (U+000D).
| `\s`     | Matches a single white space character, including space, tab, form feed, line feed. Equivalent to [\f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff].
| `\S`     | Matches a single character other than white space. Equivalent to [^\f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]. e.g. `/\S*/` matches 'foo' in "foo bar."
| `\t`     | Matches a tab (U+0009).
| `\v`     | Matches a vertical tab (U+000B).
| `\w`     | Matches any alphanumeric character including the underscore. Equivalent to [A-Za-z0-9_].
| `\W`     | Matches any non-word character. Equivalent to [^A-Za-z0-9_].
| `\n`     | Where n is a positive integer, a back reference to the last substring matching the n parenthetical in the regular expression (counting left parentheses).
| `\0`     | Matches a NULL (U+0000) character. Do not follow this with another digit, because `\0<digits>` is an octal escape sequence.
| `\xhh`   | Matches the character with the code hh (two hexadecimal digits)
| `\uhhhh` | Matches the character with the code hhhh (four hexadecimal digits).
| `\u{hhhh}` | (only when u flag is set) Matches the character with the Unicode value hhhh (hexadecimal digits).

#### Regular expression flags

|||
|:---:|-------------------------------
| `g` | Global search.
| `i` | Case-insensitive search.
| `m` | Multi-line search.
| `y` | Perform a "sticky" search that matches starting at the current position in the target string.

### Working with regular expressions

| Method    | Description
|-----------|----------------------------------
| `exec`    | executes a search for a match in a string. It returns an array of information or null on a mismatch.
| `test`    | tests for a match in a string. It returns true or false.
| `match`   | executes a search for a match in a string. It returns an array of information or null on a mismatch.
| `search`  | tests for a match in a string. It returns the index of the match, or -1 if the search fails.
| `replace` | executes a search for a match in a string, and replaces the matched substring with a replacement.
| `split`   | uses a regular expression or a fixed string to break a string into an array of substrings.

### 应用示例

正则表达式是一个多阶段处理过程，其中两个重要阶段是编译和执行。通过对稍后要用的正则表达式进行预定义（因此也预编译），我们可以获得一些明显的速度提升。

```js
str.replace(/^\s+|\s+$/g, "");     // 修剪字符串
let unicode = /[\u0080-\uFFFF]+/;  // 匹配代码在128（十六进制为0x80）以上的字符，中文编码范围\u4E00-\u9FA5
```




