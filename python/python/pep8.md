# PEP 8 编码规范

https://www.python.org/dev/peps/pep-0008/  
https://blog.csdn.net/ratsniper/article/details/78954852

## 代码布局

每一级缩进使用4个空格。

续行应该与其包裹元素对齐，要么使用圆括号、方括号和花括号内的隐式行连接来垂直对齐，要么使用挂行缩进对齐3。当使用挂行缩进时，应该考虑到第一行不应该有参数，以及使用缩进以区分自己是续行。

```py
# [Yes] 与左括号对齐
foo = long_function_name(var_one, var_two,
                         var_three, var_four)

# [Yes] 用更多的缩进来与其他行区分
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)

# [Yes] 挂行缩进应该再换一行
foo = long_function_name(
    var_one, var_two,
    var_three, var_four)

# [No] 没有使用垂直对齐时，禁止把参数放在第一行
foo = long_function_name(var_one, var_two,
    var_three, var_four)
```

```py
# No extra indentation.
if (this_is_one_thing and
    that_is_another_thing):
    do_something()

# Add a comment, which will provide some distinction in editors
# supporting syntax highlighting.
if (this_is_one_thing and
    that_is_another_thing):
    # Since both conditions are true, we can frobnicate.
    do_something()

# Add some extra indentation on the conditional continuation line.
if (this_is_one_thing
        and that_is_another_thing):
    do_something()

```


#### 行的最大长度

Python标准库比较保守，将行宽限制在79个字符（文档/注释限制在72）。  
一些团队更喜欢较长的行宽。可以把行长增加到100个字符（99更好），前提是注释和文档字符串依然已72字符折行。

较长的代码行优先选择在小括号，中括号以及大括号中的隐式续行方式。特定情况下使用反斜杠续行也可以接受。

```py
with open('/path/to/some/file/you/want/to/read') as file_1, \
     open('/path/to/some/file/being/written', 'w') as file_2:
    file_2.write(file_1.read())
```

#### 二元运算符位置

```py
# 不推荐: 操作符离操作数太远
income = (gross_wages +
          taxable_interest +
          (dividends - qualified_dividends) -
          ira_deduction -
          student_loan_interest)

# 推荐：运算符和操作数很容易进行匹配
income = (gross_wages
          + taxable_interest
          + (dividends - qualified_dividends)
          - ira_deduction
          - student_loan_interest)


```

#### 空行

顶层函数和类的定义，前后用两个空行隔开。  
类里的方法定义用一个空行隔开。  
相关的功能组可以用额外的空行（谨慎使用）隔开。一堆相关的单行代码之间的空白行可以省略。  
在函数中使用空行来区分逻辑段（谨慎使用）。

#### Imports 导入


## 字符串引号

Python 内单引号和双引号字符串是相同的。PEP不会为这个给出建议。选择一条规则并坚持使用下去。  
当一个字符串中包含单引号或者双引号字符的时候，使用和最外层不同的符号来避免使用反斜杠，从而提高可读性。  
对于三引号字符串，总是使用双引号字符来与PEP 257中的文档字符串约定保持一致。

## 表达式和语句中的空格


```py
# 推荐
if foo == 'blah':
    do_blah_thing()
do_one()
do_two()
do_three()

# 最好别这样
if foo == 'blah': do_blah_thing()
for x in lst: total += x
while t < 10: t = delay()
do_one(); do_two(); do_three()

# 绝对别这样 -----------------------------------
if foo == 'blah': do_blah_thing()
else: do_non_blah_thing()

try: something()
finally: cleanup()

do_one(); do_two(); do_three(long, argument,
                             list, like, this)

if foo == 'blah': one(); two(); three()
```





## 注释

在非英语国家的Python程序员，请使用英文写注释，除非你120%的确信你的代码不会被使用其他语言的人阅读。

### 块注释

### 行内注释

行内注释是与代码语句同行的注释。行内注释和代码至少要有两个空格分隔。注释由 `#` 和一个空格开始。

### 文档字符串

编写好的文档说明 docstrings 的约定在[PEP 257](https://www.python.org/dev/peps/pep-0257)中永恒不变。

要为所有的公共模块、函数、类以及方法编写文档说明。非公共的方法没有必要，但在 def 下一行应该有一个描述方法具体作用的注释。  
多行文档说明使用的结尾 `"""` 应该自成一行；单行的文档说明，尾部的 `"""` 应该和文档在同一行。

```py
"""Return a foobang
Optional plotz says to frobnicate the bizbaz first.
"""
```


## 命名规范




## 编码建议


