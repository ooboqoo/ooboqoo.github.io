# Grammar


## Notation

本文用到的语法标记说明

### Symbols and naming

终结符号名以大写字母开头，如 SimpleName

非终结符号名称以小写字母开头，如 kotlinFile

每个产生式都以 `:` 打头

符号定义可以有多个产生式，符号定义以 `;` 结尾

符号定义可以添加 attributes 前缀，如 `start` attribute 声明一个 satrt 符号

### EBNF expressions

BNF范式是一种用递归的思想来表述计算机语言符号集的定义规范，又称巴科斯范式(Backus-Naur form)。EBNF又称扩展的巴科斯范式，EBNF 排除了 BNF 的一些缺陷。

BNF是描述编程语言的文法。自然语言存在不同程度的二义性。这种模糊、不确定的方式无法精确定义一门程序设计语言。必须设计一种准确无误地描述程序设计语言的语法结构，这种严谨、简洁、易读的形式规则描述的语言结构模型称为文法。最著名的文法描述形式是由Backus定义Algol60语言时提出的Backus-Naur范式（Backus-Naur Form, BNF）及其扩展形式EBNF。BNF能以一种简洁、灵活的方式描述语言的语法。具体内容可参考针对编译原理的书。

`|` - 分支  
`*` - 0 或更多  
`+` - 1 或更多  
`?` - 0 或 1  
`alpha { beta }` - 非空的、由 beta 分隔的、诸多 alpha 组成的 list  
`++` - 操作数之间不允许出现空格或注释


## Semicolons

Kotlin 由默认的分号推断机制，所以如非必要，不推荐在代码中使用 `;`


## Syntax

### Classes


### Types


### Control structures


### Expressions

Precedence

| Precedence | Title          | Symbols
|------------|----------------|------------------------------------------------
| Highest    | Postfix        | `++`, `--`, `.`, `?.`, `?`
|            | Prefix         | `-`, `+`, `++`, `--`, `!`, `labelDefinition@`
|            | Type RHS       | `:`, `as`, `as?`
|            | Multiplicative | `*`, `/`, `%`
|            | Additive       | `+`, `-`
|            | Range          | `..`
|            | Infix function | SimpleName
|            | Elvis          | `?:`
|            | Named checks   | `in`, `!in`, `is`, `!is`
|            | Comparison     | `<`, `>`, `<=`, `>=`
|            | Equality       | `==`, `!==`
|            | Conjunction    | `&&`
|            | Disjunction    | <code>&#x7C;&#x7C;</code>
| Lowest     | Assignment     | `=`, `+=`, `-=`, `*=`, `/=`, `%=`

### Modifiers


### Annotations





## Lexical structure

