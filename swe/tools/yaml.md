# YAML 语言教程

教程 https://en.wikipedia.org/wiki/YAML  
规范 https://yaml.org/spec/1.2/  
工具 https://nodeca.github.io/js-yaml/

YAML 是专门用来 *写配置文件* 的语言，非常简洁和强大，远比 JSON 方便（YAML1.2 是 JSON 的超集）。  
YAML is a human-friendly, cross language, Unicode based *data serialization language*.

## Demo

```yaml
%YAML 1.2
---

#【结构】Collection Types #####################################################

#【对象】http://yaml.org/type/map.html
Block style:
  name : Gavin
  age  : 18
Flow  style: { name: Gavin, age: 18 }
  # JSON: { 'Block style': { name: 'Gavin', age: 18 },
  #         'Flow  style': { name: 'Gavin', age: 18 } }

#【键值对】http://yaml.org/type/pairs.html
Flow tasks: !!pairs [ meeting: with team, meeting: with boss ]
  # JSON: { 'Flow tasks': [ [ 'meeting', 'with team' ], [ 'meeting', 'with boss' ] ] }

#【集合】http://yaml.org/type/set.html
fruits1:
  ? Apple
  ? Banana
fruits2: { Apple, Banana }
  # JSON { fruits: { Apple: null, Banana: null } }

#【数组】http://yaml.org/type/seq.html
Block style:
  - Apple       # 可缩进也可不缩进
  - Banana      # 但是各项缩进层级一定要一样，否则出错
Flow  style: [ Apple, Banana ]
  # JSON { 'Block style': [ 'Apple', 'Banana' ],
  #        'Flow  style': [ 'Apple', 'Banana' ] }

#【值】Scalar Types #############################################################

#【布尔值】http://yaml.org/type/bool.html
bool: [true, True, TRUE, false, False, FALSE]

#【字符串】http://yaml.org/type/str.html
str1: abcd
str2: abc def \
  # JSON { str1: 'abcd', str2: 'abc def \\' }

#【整数】http://yaml.org/type/int.html
canonical: 685230
decimal: +685_230
octal: 0o2472256
hexadecimal: 0x_0A_74_AE
binary: 0b1010_0111_0100_1010_1110

#【浮点数】http://yaml.org/type/float.html
canonical: 6.8523015e+5
exponentioal: 685.230_15e+03
fixed: 685_230.15
negative infinity: -.inf
not a number: .NaN

#【空】http://yaml.org/type/null.html
empty:
canonical: ~
english: null
  # JSON { empty: null, canonical: null, english: null }

# 【时间】http://yaml.org/type/timestamp.html
timestamp:
  canonical:        2001-12-15T02:59:43.1Z
  valid iso8601:    2001-12-14t21:59:43.10-05:00
  space separated:  2001-12-14 21:59:43.10 -5
  no time zone (Z): 2001-12-15 2:59:43.10
  date (00:00:00Z): 2002-12-14

...
```


## Reference card

```yaml
Collection indicators:    # 标志 - 集合
    '? ' : Key indicator.
    ': ' : Value indicator.   # 所有 Value 之前都得有 `:`，约等于(set 是例外) Key 之后都得带 `:`
    '- ' : Nested series entry indicator.
    ', ' : Separate in-line branch entries.
    '[]' : Surround in-line series branch.
    '{}' : Surround in-line keyed branch.
Scalar indicators:        # 标志 - 标量
    '''' : Surround in-line unescaped scalar ('' escaped '). '
    '"'  : Surround in-line escaped scalar (see escape codes below).
    '|'  : Block scalar indicator.
    '>'  : Folded scalar indicator.
    '-'  : Strip chomp modifier ('|-' or '>-').
    '+'  : Keep chomp modifier ('|+' or '>+').
    1-9  : Explicit indentation modifier ('|1' or '>2').
           # Modifiers can be combined ('|2-', '>+1').
Alias indicators:         # 标志 - 别名/引用
    '&'  : Anchor property.
    '*'  : Alias indicator.
Tag property: # Usually unspecified.
    none    : Unspecified tag (automatically resolved by application).
    '!'     : Non-specific tag (by default, "!!map"/"!!seq"/"!!str").
    '!foo'  : Primary (by convention, means a local "!foo" tag).
    '!!foo' : Secondary (by convention, means "tag:yaml.org,2002:foo").
    '!h!foo': Requires "%TAG !h! <prefix>" (and then means "<prefix>foo").
    '!<foo>': Verbatim tag (always means "foo").
Document indicators:      # 标志 - 文档
    '%'  : Directive indicator.  文档类型定义
    '---': Document header.      定义文档头部
    '...': Document terminator.  定义文档结尾
Misc indicators:          # 标志 - 杂项
    ' #' : Throwaway comment indicator.  注释符号
    '`@' : Both reserved for future use. 保留符号以备未来使用
Special keys:
    '='  : Default "value" mapping key.
    '<<' : Merge keys from another mapping.
Core types: # Default automatic tags.   # 核心类型
    '!!map' : { Hash table, dictionary, mapping }       对象类型
    '!!seq' : { List, array, tuple, vector, sequence }  数组类型
    '!!str' : Unicode string                            字符类型
More types:                             # 其他类型
    '!!set' : { cherries, plums, apples }               set类型（集合 - 无重复值的数组）
    '!!omap': [ one: 1, two: 2 ]                        omap类型（枚举类型）
Language Independent Scalar types:
    { ~, null }              : Null (no value).
    [ 1234, 0x4D2, 02333 ]   : [ Decimal int, Hexadecimal int, Octal int ]
    [ 1_230.15, 12.3015e+02 ]: [ Fixed float, Exponential float ]
    [ .inf, -.Inf, .NAN ]    : [ Infinity (float), Negative, Not a number ]
    { Y, true, Yes, ON  }    : Boolean true
    { n, FALSE, No, off }    : Boolean false
    ? !!binary >
        R0lG...BADS=
    : >-
        Base 64 binary value.
Escape codes:
 Numeric   : { "\x12": 8-bit, "\u1234": 16-bit, "\U00102030": 32-bit }
 Protective: { "\\": '\', "\"": '"', "\ ": ' ', "\<TAB>": TAB }
 C         : { "\0": NUL, "\a": BEL, "\b": BS, "\f": FF, "\n": LF, "\r": CR,
               "\t": TAB, "\v": VTAB }
 Additional: { "\e": ESC, "\_": NBSP, "\N": NEL, "\L": LS, "\P": PS }
```

### 注意点

* 使用 2个 或 4个 空格来缩进，不允许使用 tab
* 布尔值的多个变种写法
* 字符串大多数时候是不需要加引号的，但 `"1.1"` 和 `1.1` 这种场景，如果希望得到字符串就得加引号，否则为数值
* 可以使用 `---` 将多个文档写到一个文件里

【示例】多个文档写在一个文件里

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
...
---
apiVersion: apps/v1
kind: Service
metadata:
  name: my-service
...
```

【示例】通过 label 复用结构

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-hello-world
spec:
  selector:
    matchLabels: &pod-label
      run: pod-hello-world
  template:
    metadata:
      labels: *pod-label
    spec:
      containers:
      - name: cont1
        image: xxx
        ports:
        - containerPort: 8080
```


## 文档

### 简介

YAML: YAML Ain't Markup Language */ˈjæməl/*。这里的 ML 说的大概就是 XML，其标记过于累赘，不适合直接编辑和阅读。

Custom data types are allowed, but YAML natively encodes scalars (such as strings, integers, and floats), lists, and associative arrays (also known as maps, dictionaries or hashes). These data types are based on the Perl programming language, though all commonly used high-level programming languages share very similar concepts. The colon-centered syntax, used for expressing key-value pairs, is inspired by electronic mail headers as defined in RFC 822, and the document separator --- is borrowed from MIME (RFC 2046). Escape sequences are reused from C, and whitespace wrapping for multi-line strings is inspired by HTML. Lists and hashes can contain nested lists and hashes, forming a tree structure; arbitrary graphs can be represented using YAML aliases (similar to XML in SOAP). YAML is intended to be read and written in streams, a feature inspired by SAX.

### 标量

标量是最基本的、不可再分的值。以下数据类型都属于 JavaScript 的标量。

字符串   
布尔值: 用 true 和 false 表示   
整数: 直接以字面量的形式表示   
浮点数: 直接以字面量的形式表示   
Null: 用 ~ 表示   
时间: 采用 ISO8601 格式   
日期: 采用复合 iso8601 格式的年、月、日表示。   

```yaml
number: 12.30     #==>  { number: 12.30 }
isSet: true       #==>  { isSet: true }
parent: ~         #==>  { parent: null }
iso8601: 2001-12-14t21:59:43.10-05:00 #==> { iso8601: new Date('2001-12-14t21:59:43.10-05:00') }
date: 1976-07-31  #==>  { date: new Date('1976-07-31') }
```

### 字符串

字符串是最常见，也是最复杂的一种数据类型。

```yaml
# 字符串默认不使用引号表示。
str: 这是一行字符串   #==>  { str: '这是一行字符串' }
# 如果字符串之中包含空格或特殊字符，需要放在引号之中。
str: '内容： 字符串'  #==>  { str: '内容: 字符串' }
# 单引号和双引号都可以使用，双引号不会对特殊字符转义。
s1: '内容\n字符串'
s2: "内容\n字符串"    #==>  { s1: '内容\\n字符串', s2: '内容\n字符串' }
# 单引号之中如果还有单引号，必须连续使用两个单引号转义。
str: 'labor''s day'   #==>  { str: 'labor\'s day' }
# 字符串可以写成多行，从第二行开始，必须有一个单空格缩进。换行符会被转为空格。
str: 这是一段
  多行
  字符串              #==>  { str: '这是一段 多行 字符串' }
# 多行字符串可以使用|保留换行符，也可以使用>折叠换行。
this: |
  Foo
  Bar
that: >
  Foo
  Bar
#                     #==>  { this: 'Foo\nBar\n', that: 'Foo Bar\n' }
# +表示保留文字块末尾的换行，-表示删除字符串末尾的换行。
s1: |
  Foo

s2: |+
  Foo

s3: |-
  Foo
#                     #==>  { s1: 'Foo\n', s2: 'Foo\n\n', s3: 'Foo' }
# 字符串之中可以插入 HTML 标记。
message: |

  <p style="color: red">
    段落
  </p>
#                     #==>  { message: '\n<p style="color: red">\n  段落\n</p>\n' }
```

### 引用

`&` 用来建立锚点（defaults），`<<` 表示合并到当前数据，`*` 用来引用锚点。下面是另一个例子。

```yaml
- &showell Steve 
- Clark 
- Brian 
- Oren 
- *showell 
#             #==> [ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]
```

```yaml

# http://yaml.org/type/merge.html
merge:
  - &CENTER { x: 1, y: 2 }
  - &LEFT { x: 0, y: 2 }
  - &BIG { r: 10 }
  - &SMALL { r: 1 }

  # All the following maps are equal:

  - # Explicit keys
    x: 1
    y: 2
    r: 10
    label: nothing

  - # Merge one map
    << : *CENTER
    r: 10
    label: center

  - # Merge multiple maps
    << : [ *CENTER, *BIG ]
    label: center/big

  - # Override
    << : [ *BIG, *LEFT, *SMALL ]
    x: 1
    label: big/left/small
```
