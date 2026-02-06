# Python 教程 - 基础

## 基础

Python 的语法特点
  * Python 使用换行来结束命令，而其他编程语言常用 `;` 等来标记结尾 // `;` 只能作为同一行多语句分隔符，而且几乎不该用。
  * Python 依赖缩进来标识层级，而其他语言多用 `{}`

要关闭 Python 解析器，可按 `Ctrl+D` 或执行命令 `exit()`

### 变量的命名和使用

* 变量名只能包含字母、数字和下划线，变量名可以字母或下划线打头，但不能以数字打头
* 变量名不能包含空格，但可使用下划线来分隔其中的单词
* 不要将 Python 关键字和函数名用作变量名
* 变量名应既简短又具有描述性
* 慎用小写字母 `l` 和大写字母 `O`，容易跟 `1` 和 `0` 混淆

### 字符串

用引号括起的都是字符串，其中的引号可以是单引号，也可以是双引号。

```py
# 转义字符串
'I\'m \"OK\"!'

# 拼接字符串
message = 'Hello' + ' ' + 'world'

# 非打印字符
print('Languages:\n\tPython\n\tJavaScript')

# 多行字符串   """...""" or '''...'''
print('''\
line1
line2
line3''')
# 效果同上，通过在行尾添加一个 \ 来消除 \n
print('''\
line1
line2
line3''')

# 原始字符串(不转义)
print(r'line1\nline2\\nline3')

# 重复字符串
3 * 'un' + 'ium'  # 'unununium'

# Two or more string literals next to each other are automatically concatenated
# This feature is particularly useful when you want to break long strings
'Py' 'thon'  # 'Python'
```

```py
# Strings can be indexed

>>> word = 'Python'
>>> word[0]  # character in position 0
'P'
>>> word[-1]
'n'
>>> word[0:2]  # characters from position 0 (included) to 2 (excluded)
'Py'
>>> word[-2:]
'on'
```

```py
len(str)  # 字符窜长度
```

```py
# String Methods https://docs.python.org/3/library/stdtypes.html#string-methods
str.title()  # 单词首字母大写
str.upper()  # 转大写
str.lower()  # 转小写
str.strip()  # 返回去除两边空白后的字符串，原字符串不动
str.lstrip() # 返回去除开头空白后的字符串，原字符串不动
str.rstrip() # 返回去除末尾空白后的字符串，原字符串不动
```

#### 字符编码

Python 的字符串类型是 `str`，在内存中以 Unicode 表示，支持多语言。如果要在网络上传输或保存到磁盘，就需要把 `str` 转为以字节为单位的 `bytes`，通常采用 UTF-8 编码。

```py
>>> ord('A')
65
>>> ord('中')
20013
>>> chr(66)
'B'
>>> chr(25991)
'文'
>>> 'ABC'.encode('ascii')
b'ABC'
>>> '中文'.encode('utf-8')
b'\xe4\xb8\xad\xe6\x96\x87'
>>> b'ABC'.decode('ascii')
'ABC'
>>> b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
'中文'
```

#### 格式化

```py
print('%2d-%02d' % (3, 1))  # 3-01
print('%.2f' % 3.1415926)   # 3.14
'Age: %s. Gender: %s' % (25, True)  # 'Age: 25. Gender: True'
'Hello, {0}, 成绩提升了 {1:.1f}%'.format('小明', 17.125)  # 'Hello, 小明, 成绩提升了 17.1%'
```

```py
name = "Bob"
age = 30

# 1. % 格式化（旧式） https://docs.python.org/3/library/stdtypes.html#old-string-formatting
print("Hello %s, you are %d years old" % (name, age))

# 2. .format() 方法 https://docs.python.org/3/library/string.html#formatstrings
print("Hello {}, you are {} years old".format(name, age))

# 3. f-string（推荐 v3.6） https://docs.python.org/3/reference/lexical_analysis.html#f-strings
print(f"Hello {name}, you are {age} years old")

>>> f = 0.03456
>>> print(f"this is a number {f:.2f}")
this is a number 0.03
```

#### 字符串前缀

* b: 字节串字面量
* r: 原始字符串
* f: 格式字符串字面量 ("f-string")
* t: 模板字符串字面量 ("t-string")

f-string 在表达式后加等于号 `=`，可在求值后，同时显示表达式文本及其结果（*用于调试*）。 随后是用叹号 '!' 标记的转换字段。还可以*在冒号 ':' 后附加格式说明符*。替换字段以右花括号 '}' 为结尾。

```py
>>> name = 'gavin'
>>> print(f'Hello, {name=}!')
Hello, name='gavin'!
```

#### 多行文本

推荐的写法（90% 场景）：括号+自动拼接（最佳工程实践）

```py
sql = (
    "SELECT id, name "
    "FROM users "
    "WHERE status = 'active' "
    "ORDER BY created_at DESC"
)
```

真正的“多行文本”（才用三引号）：三引号 + `dedent()` (非常重要)。要求高时，还可以再配合 `strip()` 使用

```py
from textwrap import dedent

def test():
    # 第一行以 \ 结束以避免出现空行！
    s = '''\
    hello
      world
    '''
    print(repr(s))          # prints '    hello\n      world\n    '
    print(repr(dedent(s)))  # prints 'hello\n  world\n'

test()

prompt = dedent("""
    You are a helpful assistant.
    Answer the question step by step.
""").strip()
print(repr(prompt))
```

docsting 用三引号（这是规范），且不要用 dedent

```py
def fetch_data():
    """
    Fetch data from the database.

    Returns:
        list: result rows
    """
```

### 数字

`<class 'int'>`  `<class 'float'>`

`+` `-` `*` `**` `/` `//` `%`


```py
2 + 3      # 5
3 / 2      # 1.5
3 ** 3     # 27   # `-3 ** 2 == -9` 因为 ** 的优先级要高于 -
2 + 3 * 4  # 14
0.2 + 0.1  # 0.30000000000000004
3 * 0.1    # 0.30000000000000004
10 / 3 - 3 == 1 / 3  # False

4 / 2      # 2.0  除法计算结果是浮点数，即使是两个整数恰好整除，结果也是浮点数
10 // 3    # 3  整除，两个整数的除法仍然是整数
10 % 3     # 1  取余

print('Happy ' + 23 + 'rd Birthday')       # TypeError
print('Happy ' + str(23) + 'rd Birthday')  # OK
```

Python 的整数没有大小限制，仅受可用内存的存储能力限制。浮点数也没有大小限制，但是超出一定范围就直接表示为inf（无限大）。

数字之间可以使用单个下划线来提高可读性。

```py
3.14_15_93
```


### 布尔值

一个布尔值只有 `True` `False` 两种值，布尔值可以用 `and` `or` `not` 运算。

### 空值

空值是 Python 里一个特殊的值，用 `None` 表示。

### 列表(数组) `<class 'list'>`

```py
list_0 = ['a', 'b', 'c']
list_0[0]   # a
list_0[-1]  # c
list_0[3]   # IndexError: list index out of range

>>> squares = [1, 4, 9, 16, 25]
>>> squares + [36, 49, 64, 81, 100]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 修改、添加和删除元素
list_0[0] = 'aa'
list_0.append('d')  # 追加元素
list_0.insert(1, 'e')  # 在特定位置插入一个新元素
del list_0[3]  # 删除某个元素
list_0.pop()   # 删除末尾的值并返回该值
list_0.pop(0)  # pop 可弹出任意位置的元素
list_0.remove('c')  # 根据值删除元素 -- 删除匹配的第一个元素

# 组织列表
list_0.sort()              # 按字母顺序排列
list_0.sort(reverse=True)  # 倒序排列
sorted(list_0)                # 返回排序后的列表，原列表不受影响
sorted(list_0, reverse=True)  # 返回排序后的列表
list_0.reverse()  # 反转列表的排列顺序
len(list_0)  # 获取列表长度
```

```py
list(range(1, 6))     # [1, 2, 3, 4, 5]
list(range(1, 6, 2))  # [1, 3, 5]  range 函数支持指定步长

# 几个专门处理数字列表的函数
digits = [1, 2, 3, 4, 5]
min(digits)  # 1
max(digits)  # 5
sum(digits)  # 15

# 列表解析语法
[value**2 for value in range(1,6)]  # [1, 4, 9, 16, 25]

# 切片
digits = [1, 2, 3, 4, 5]
digits[1:3]  # [2, 3]
digits[:2]   # [1, 2]
digits[2:]   # [3, 4, 5]
digits[-3:]  # [3, 4, 5]
new_list = digits[:]  # 复制列表
```

#### Using Lists as Stacks

```py
>>> stack = [3, 4, 5]
>>> stack.append(6)
>>> stack.append(7)
>>> stack
[3, 4, 5, 6, 7]
>>> stack.pop()
7
```

#### Using Lists as Queues

```py
>>> from collections import deque
>>> queue = deque(["Eric", "John", "Michael"])
>>> queue.append("Terry")           # Terry arrives
>>> queue.append("Graham")          # Graham arrives
>>> queue.popleft()                 # The first to arrive now leaves
'Eric'
>>> queue.popleft()                 # The second to arrive now leaves
'John'
>>> queue                           # Remaining queue in order of arrival
deque(['Michael', 'Terry', 'Graham'])
```

#### List Comprehensions 列表解析语法

List comprehensions provide a concise way to create lists.

```py
# 常规操作，会引入 side effects
# this creates (or overwrites) a variable named x that still exists after the loop completes.
squares = []
for x in range(10):
    squares.append(x**2)
print(f'x is {x}')  # 这里会打印 'x is 9'

squares = list(map(lambda x: x**2, range(10)))

# A list comprehension consists of brackets containing an expression followed by a for clause, then zero or more for or if clauses. 
squares = [x**2 for x in range(10)]
```

#### The `del` statement

The `del` statement can remove an item from a list given its index instead of its value, and also, can be used to remove slices from a list or clear the entire list.

```py
>>> a = [-1, 1, 66.25, 333, 333, 1234.5]
>>> del a[0]
>>> a
[1, 66.25, 333, 333, 1234.5]
>>> del a[2:4]
>>> a
[1, 66.25, 1234.5]
>>> del a[:]
>>> a
[]
```

### 元组 tuple

Python 将不能修改的值称为不可变的，而不可变的列表 `list` 被称为元组 `tuple`。

元组看起来犹如列表，但使用圆括号而不是方括号来标识。

```py
dimensions = (200, 50)
dimensions[0] = 250  # TypeError
for d in dimensions: print(d)  # 遍历用法同列表

# 定义只有一个元素的元组
t = (1)   # t 为数值 `1`，此时 () 被看成数学公式中的小括号
t = (1,)  # t 为元组 `(1,)`
```

### 字典 dict

`dict` 的 key 必须是不可变对象

```py
alien_0 = {'color': 'green', 'points': 5}  # 外星人入侵啦

# 访问字典的值
print(alien_0['color'])
print(alien_0['points'])

# 添加键值对
alien_0['x_position'] = 0
alien_0['y_position'] = 25

# 修改值
alien_0['color'] = 'yellow'

# 删除键值对
del alien_0['points']  # 无返回值
alien_0.pop('points')  # 会返回 key 对应的 value

# key 不存在
alien_0['none_exist_key']      # KeyError: 'none_exist_key'
alien_0.get('none_exist_key')  # None
'none_exist_key' in alien_0    # False
```

#### 遍历字典

```py
user_0 = {
    'username': 'efermi',
    'first': 'enrico',
    'last': 'fermi',
}

for key in user_0:  # 同 .keys()
    print(key)

for key in user_0.keys():
    print(key)

for value in user_0.values():
    print(value)

for key, value in user_0.items():
    print(key + '\t' + value)

sorted(user_0.key())  # ['first', 'last', 'username']  # 排序
set(user_0.values())  # {'enrico', 'fermi', 'efermi'}  # 集合
```

嵌套

```py
aliens = [alien_0, alien_1, alien_2, ...]

for alien in aliens[0:3]:
    if alien['color'] == 'green':
      # ...
```

### 集合 set

`set` 和 `dict` 的唯一区别仅在于没有存储对应的 value。

```py
s = set([1, 2, 3])  # 创建 set 需要提供一个 list 作为输入集合
s.add(4)            # {1, 2, 3, 4}
s.remove(4)         # {1, 2, 3}

s.add([1, 2])  # TypeError: unhashable type: 'list'
```

Basic uses include membership testing and eliminating duplicate entries. Set objects also support mathematical operations like union, intersection, difference, and symmetric difference.

```py
# Demonstrate set operations on unique letters from two words
>>> a = set('abracadabra')
>>> b = set('alacazam')
>>> a                                  # unique letters in a
{'a', 'r', 'b', 'c', 'd'}
>>> a - b                              # letters in a but not in b
{'r', 'd', 'b'}
>>> a | b                              # letters in a or b or both
{'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}
>>> a & b                              # letters in both a and b
{'a', 'c'}
>>> a ^ b                              # letters in a or b but not both
{'r', 'd', 'b', 'm', 'z', 'l'}
```

### enum

> 比较，可以直接和 int str 比，但序列化时赋值必须 .value

enum 用来定义一组有语义的常量，解决的问题主要有
* ❌ 魔法数字 / 魔法字符串
* ❌ 常量值写散、写错没人发现
* ❌ IDE 无法提示、类型不安全

基础用法

```py
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3
```

使用方式

```py
Color.RED          # Color.RED
Color.RED.name     # 'RED'
Color.RED.value    # 1
```

比较（⚠️注意）枚举 ≠ 它的 value

```py
Color.RED == Color.RED       # True
Color.RED == 1               # False
```

通过 name 查枚举

```py
Color['RED']  # Color.RED
```

遍历枚举

```py
for c in Color:
    print(c, c.name, c.value)

# 输出
Color.RED RED 1
Color.GREEN GREEN 2
Color.BLUE BLUE 3
```

序列化 / 反序列化

```py
# 转 JSON（常见坑）
json.dumps({"status": OrderStatus.PAID})        # ❌ TypeError
json.dumps({"status": OrderStatus.PAID.value})  # ✅ .value

# 反序列化
status = OrderStatus(data["status"])
```

常用枚举类型

* `IntEnum`（最常用）- 如果你需要和 `int` 比较 / 存数据库 / 序列化

```py
from enum import IntEnum

class Status(IntEnum):
    INIT = 0
    RUNNING = 1
    DONE = 2

Status.RUNNING == 1   # True
isinstance(Status.RUNNING, int)  # True
```

* `StrEnum` 非常适合：JSON，HTTP API，配置文件

```py
from enum import StrEnum

class Role(StrEnum):
    ADMIN = "admin"
    USER = "user"

Role.ADMIN == "admin"   # True
```

### if 判断

```py
cars = ['audi', 'bmw', 'toyota']
for car in cars:
    if car == 'bmw':  #  !=  <  <=  >  >=
        print(car.upper())
    else:
        print(car.title())

age >= 20 and age < 30  # and  or
'bmw' not in cars       # in  not in

age = 12
if age < 4:
    price = 0
elif age < 18:
    price = 5
elif age < 65:
    price = 10
else:
    price = 5

# 空列表 [] if 后的结果为 False
```

### for 循环

```py
# 注意，Python的 for 循环不会在循环结束后销毁循环变量，循环外部可以读到 car 的最终值
for car in cars:
    print(car)  # Python 根据缩进来判断代码行与前一个代码行的关系

for value in range(1, 5):
    print(value)

for value in range(1, 5): print(value); print(value ** 2)
```

Code that modifies a collection while iterating over that same collection can be tricky to get right. Instead, it is usually more straight-forward to loop over a copy of the collection or to create a new collection:

```py
# Create a sample collection
users = {'Hans': 'active', 'Éléonore': 'inactive', '景太郎': 'active'}

# Strategy:  Iterate over a copy
for user, status in users.copy().items():
    if status == 'inactive':
        del users[user]

# Strategy:  Create a new collection
active_users = {}
for user, status in users.items():
    if status == 'active':
        active_users[user] = status
```

### while 循环

```py
sum = 0
n = 99
while n > 0:
    sum += n
    n -= 2
print(sum)
```

### `pass` or `...`

```py
class MyEmptyClass:
    pass
```
Another place pass can be used is as a place-holder for a function or conditional body when you are working on new code, allowing you to keep thinking at a more abstract level. The pass is silently ignored:

```py
def initlog(*args):
    pass   # Remember to implement this!
```

For this last case, many people use the ellipsis literal `...` instead of `pass`.

### `match` Statements

没有 `switch case` 但有 `match case`

只有第一个符合条件的分支会执行，不需要手动加 `break`。

```py
def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 404:
            return "Not found"
        case 401 | 403 | 404:
            return "Not allowed"
        case 418:
            return "I'm a teapot"
        case _:
            return "Something's wrong with the internet"
```

### 用户输入

```py
username = input('Login\nusername: ')
print(username)

age = input('age: ')
age = int(age)  # 转为 int

message = ''  # 要是没有这个定义变量的过程，下面一行会报错
while message != 'quit':
    message = input("Enter something or 'quit' to exit: ")
    if message != 'quit':
        print(message)

# 使用标志改进代码
active = True
while active:
    message = input("Enter something or 'quit' to exit: ")
    if message == 'quit':
        active = False
    else:
        print(message)

# 使用 break 退出循环
while True:
  message = input("Enter something or 'quit' to exit: ")
  if message == 'quit':
      break
  else:
      print(message)

# 在循环中使用 continue
current_number = 0
while current_number < 10:
    current_number += 1
    if current_number % 2 == 0:
        continue
    print(current_number)  # 输出 1\n3\n5\n7\n9
```

for 循环是一种遍历列表的有效方式，但在 for 循环中不应修改列表，否则将导致 Python 难以跟踪其中的元素。要在遍历列表的同时对其进行修改，可使用 while 循环。

```py
# 在列表之间移动元素
unconfirmed_users = ['alice', 'brian', 'candace']
confirmed_users = []

while unconfirmed_users:
    current_user = unconfirmed_users.pop()
    print('Verifying user: ' + current_user.title())
    confirmed_users.append(current_user)
```

### 正则表达式

由于 Python 的字符串本身也用 `\` 转义，所以强烈建议使用 `r` 前缀，就不用考虑转义的问题了。

```py
>>> import re
>>> re.match(r'^\d{3}\-\d{3,8}$', '010-12345')
<_sre.SRE_Match object; span=(0, 9), match='010-12345'>
>>> re.match(r'^\d{3}\-\d{3,8}$', '010 12345')

# 切分字符串
>>> 'a b   c'.split(' ')
['a', 'b', '', '', 'c']

# 分组
>>> m = re.match(r'^(\d{3})-(\d{3,8})$', '010-12345')
>>> m.group(0)
'010-12345'
>>> m.group(1)
'010'
>>> m.group(2)
'12345'

# 预编译
>>> re_telephone = re.compile(r'^(\d{3})-(\d{3,8})$')
>>> re_telephone.match('010-12345').groups()
('010', '12345')
>>> re_telephone.match('010-8086').groups()
('010', '8086')
```

### 风格指南

PEP8

代码被阅读的次数比编写的次数多。代码编写出来后，调试时你需要阅读它；给程序添加新功能时需要花很长的时间阅读代码；与其他程序员分享代码时这些程序员也将阅读它们。

PEP8建议每级缩进都使用四个空格，这既可提高可读性，又留下了足够的多级缩进空间。在编写代码时应该使用制表符键，但一定要对编辑器进行设置，使其在文档中插入空格而不是制表符。

很多 Python 程序员都建议每行不超过80字符。PEP8还建议注释的行长都不超过72字符，因为有些工具为大型项目自动生成文档时，会在每行注释开头添加格式化字符。


## 高级特性

### 切片

取一个 list 或 tuple 的部分元素是非常常见的操作，Python 提供了切片 slice 操作符，能大大简化这种操作。

```py
# list 切片
digits = [1, 2, 3, 4, 5]
digits[1:3]  # [2, 3]
digits[:2]   # [1, 2]
digits[2:]   # [3, 4, 5]
digits[-3:]  # [3, 4, 5]
new_list = digits[:]  # 复制列表

# tuple 切片
(0, 1, 2, 3, 4, 5)[:3]  # (0, 1, 2)

# str 切片
'ABCDEFG'[:3]   # 'ABC'
'ABCDEFG'[::2]  # 'ACEG'
```

### 迭代

list 这种数据类型虽然有下标，但很多其他数据类型是没有下标的，但是，只要是可迭代对象，无论有无下标，都可以迭代。
Python 中，迭代是通过 `for ... in` 来完成的。

```py
# 迭代字典
d = {'a': 1, 'b': 2, 'c': 3}
for key in d:
     print(key)
for value in d.values():
    print(value)
for k, v in d.items():
    print(k, v)

# 迭代字符串
for ch in 'ABC':
     print(ch)

# 判断是否是可迭代对象
from collections import Iterable
isinstance('abc', Iterable)   # True
isinstance([1,2,3], Iterable) # True
isinstance(123, Iterable)     # False

# enumerate 函数可以把一个list变成 索引-元素 对
for i, value in enumerate(['A', 'B', 'C']):
     print(i, value)

for x, y in [(0, 'A'), (1, 'B'), (2, 'C')]:
     print(x, y)
```

### 列表生成式

运用列表生成式，可以快速生成 list，可以通过一个 list 推导出另一个 list，而代码却十分简洁。

```py
list(range(1, 11))             # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[x * x for x in range(1, 11)]  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[x * x for x in range(1, 11) if x % 2 == 0]  # [4, 16, 36, 64, 100]
[m + n for m in 'ABC' for n in 'XY']         # ['AX', 'AY', 'BX', 'BY', 'CX', 'CY']
d = {'x': 'A', 'y': 'B', 'z': 'C' }
[k + '=' + v for k, v in d.items()]  # ['y=B', 'x=A', 'z=C']
```

### 迭代器

* 凡是可作用于 `for` 循环的对象都是 `Iterable` 类型；
* 凡是可作用于 `next()` 函数的对象都是 `Iterator` 类型，它们表示一个惰性计算的序列；
* 集合数据类型 `list` `dict` `str` 等是 `Iterable` 但不是 `Iterator`，不过可以通过 `iter()` 函数获得一个 `Iterator`；
* Python 的 `for` 循环本质上就是通过不断调用 `next()` 函数实现的

`Iterator` 对象表示的是一个数据流，可以被 `next()` 函数调用并不断返回下一个数据，直到没有数据时抛出 `StopIteration` 错误。可以把这个数据流看做是一个有序序列，但我们却不能提前知道序列的长度，只能不断通过 `next()` 函数实现按需计算下一个数据，所以 `Iterator` 的计算是惰性的，只有在需要返回下一个数据时它才会计算。

```py
isinstance(iter([]), Iterator)     # True
isinstance(iter('abc'), Iterator)  # True
```

### 生成器 generator

生成器都是 `Iterator` 对象

```py
# generator
g = (x * x for x in range(10))
next(g)

for n in g:
     print(n)

# generator function
def odd():
    print('step 1')
    yield 1
    print('step 2')
    yield(3)
    print('step 3')
    yield(5)
g_odd = odd()
next(g_odd)  # 1
next(g_odd)  # 3
next(g_odd)  # 5
next(g_odd)  # 报错 StopIteration
```
