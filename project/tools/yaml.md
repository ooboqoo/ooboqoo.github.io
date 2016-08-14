# YAML 语言教程

http://www.ruanyifeng.com/blog/2016/07/yaml.html?f=tt

YAML 是专门用来写配置文件的语言，非常简洁和强大，远比 JSON 格式方便。  
本文介绍 YAML 的语法，以 [JS-YAML](https://github.com/nodeca/js-yaml) 的实现为例。你可以去 [在线 Demo](https://nodeca.github.io/js-yaml/) 验证下面的例子。

```yaml
%YAML 1.1   # Reference card
---
Collection indicators:    # 标志 - 集合
    '? ' : Key indicator.
    ': ' : Value indicator.
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
...
```


### 一、简介

YAML /ˈjæməl/ 语言的设计目标，就是方便人类读写。它实质上是一种通用的数据串行化格式。它的基本语法规则如下。

* 大小写敏感
* 使用缩进表示层级关系
* 缩进时不允许使用Tab键，只允许使用空格。
* 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

YAML 支持的数据结构有三种。

* 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
* 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
* 标量（scalars）：单个的、不可再分的值

### 二、对象
对象的一组键值对，使用冒号结构表示。
```yaml
animal: pets
# 转为JS：{ animal: 'pets' }
```

Yaml 也允许另一种写法，将所有键值对写成一个行内对象。

```yaml
hash: { name: Steve, foo: bar }
# 转为JS：{ hash: { name: 'Steve', foo: 'bar' } }
```

### 三、数组

一组连词线开头的行，构成一个数组。

```yaml
- Cat
- Dog
- Goldfish
# 转为JS:  [ 'Cat', 'Dog', 'Goldfish' ]
```

数据结构的子成员是一个数组，则可以在该项下面缩进一个空格。

```yaml
-
 - Cat
 - Dog
 - Goldfish
# 转为JS:  [ [ 'Cat', 'Dog', 'Goldfish' ] ]
```

数组也可以采用行内表示法。
```yaml
animal: [Cat, Dog]
# 转为JS:  { animal: [ 'Cat', 'Dog' ] }
```

### 四、复合结构

对象和数组可以结合使用，形成复合结构。

```yaml
languages:
 - Ruby
 - Perl
 - Python 
websites:
 Ruby: ruby-lang.org 
 Python: python.org 
 Perl: use.perl.org 
```

### 五、标量

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

YAML 允许使用两个感叹号，强制转换数据类型。
```yaml
e: !!str 123
f: !!str true     #==>  { e: '123', f: 'true' }
```

### 六、字符串

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

### 七、引用

锚点&和别名*，可以用来引用。
```yaml
defaults: &defaults
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults

test:
  database: myapp_test
  <<: *defaults
```

等同于下面的代码。

```yaml
defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost

test:
  database: myapp_test
  adapter:  postgres
  host:     localhost
```

&用来建立锚点（defaults），<<表示合并到当前数据，*用来引用锚点。下面是另一个例子。

```yaml
- &showell Steve 
- Clark 
- Brian 
- Oren 
- *showell 
#             #==> [ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]
```

### 八、函数和正则表达式的转换

这是 JS-YAML 库特有的功能，可以把函数和正则表达式转为字符串。
```yaml
# example.yml
fn: function () { return 1 }
reg: /test/
```
