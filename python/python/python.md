# Pyhton

要关闭 Python 解析器，可按 `Ctrl+D` 或执行命令 `exit()` 


### 变量的命名和使用

* 变量名只能包含字母、数字和下划线，变量名可以字母或下划线打头，但不能以数字打头
* 变量名不能包含空格，但可使用下划线来分隔其中的单词
* 不要将 Python 关键字和函数名用作变量名
* 变量名应既简短又具有描述性
* 慎用小写字母 `l` 和大写字母 `O`，容易更 `1` 和 `0` 混淆

### 字符串

用引号括起的都是字符串，其中的引号可以是单引号，也可以是双引号。

```py
str.title()  # 单词搜字母大写
str.upper()  # 转大写
str.lower()  # 转小写
str.strip()  # 返回去除两边空白后的字符串，原字符串不动
str.lstrip() # 返回去除开头空白后的字符串，原字符串不动
str.rstrip() # 返回去除末尾空白后的字符串，原字符串不动

# 拼接字符串
message = 'Hello' + ' ' + 'world'

# 非打印字符
print('Languages:\n\tPython\n\tJavaScript')
```

### 数字

```py
2 + 3      # 5
3 / 2      # 1.5
3 ** 3     # 27
2 + 3 * 4  # 14
0.2 + 0.1  # 0.30000000000000004
3 * 0.1    # 0.30000000000000004

print('Happy ' + 23 + 'rd Birthday')       # TypeError
print('Happy ' + str(23) + 'rd Birthday')  # OK
```

### 列表(数组)

```py
list1 = ['a', 'b', 'c']
list1[0]   # a
list1[-1]  # c

# 修改、添加和删除元素
list1[0] = 'aa'
list1.append('d')  # 追加元素
list1.insert(1, 'e')  # 在特定位置插入一个新元素
del list1[3]  # 删除某个元素
list1.pop()   # 删除末尾的值并返回该值
list1.pop(0)  # pop 可弹出任意位置的元素
list1.remove('c')  # 根据值删除元素 -- 删除匹配的第一个元素

# 组织列表
list1.sort()              # 按字母顺序排列
list1.sort(reverse=True)  # 倒序排列
sorted(list1)                # 返回排序后的列表，原列表不受影响
sorted(list1, reverse=True)  # 返回排序后的列表
list1.reverse()  # 反转列表的排列顺序
len(list1)  # 获取列表长度
```

### for

```py
for car in cars:
    print(car)  # Python 根据缩进来判断代码行与前一个代码行的关系

for value in range(1, 5):
    print(value)

for value in range(1, 5): print(value); print(value ** 2)

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

### 元组

Python 将不能修改的值称为不可变的，而不可变的列表被称为元组。

元组看起来犹如列表，但使用圆括号而不是方括号来标识。

```py
dimensions = (200, 50)
dimensions[0] = 250  # TypeError
for d in dimensions: print(d)  # 遍历用法同列表
```

### 风格指南

PEP8

代码被阅读的次数比编写的次数多。代码编写出来后，调试时你需要阅读它；给程序添加新功能时需要花很长的时间阅读代码；与其他程序员分享代码时这些程序员也将阅读它们。

PEP8建议每级缩进都使用四个空格，这既可提高可读性，又留下了足够的多级缩进空间。在编写代码时应该使用制表符键，但一定要对编辑器进行设置，使其在文档中插入空格而不是制表符。

很多 Python 程序员都建议每行不超过80字符。PEP8还建议注释的行长都不超过72字符，因为有些工具为大型项目自动生成文档时，会在每行注释开头添加格式化字符。


### if

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
    price=5
elif age < 65:
    price = 10
else:
    price = 5

# 空列表 [] if 后的结果为 False
```


### 字典

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
del alien_0['points']
```

遍历字典

```py
user_0 = {
    'username': 'efermi',
    'first': 'enrico',
    'last': 'fermi',
}

for key in user_0.keys():
    print(key)

for key in user_0:  # 可省略 .keys()
    print(key)

for key, value in user_0.items():
    print(key + '\t' + value)

for value in user_0.values():
    print(value)

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


### 用户输入和 while 循环

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

# 使用 break 推出循环
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

for 循环时一种遍历列表的有效方式，但在 for 循环中不应修改列表，否者将导致 Python 难以跟踪其中的元素。要在遍历列表的同时对其进行修改，可使用 while 循环。

```py
# 在列表之间移动元素
unconfirmed_users = ['alice', 'brian', 'candace']
confirmed_users = []

while unconfirmed_users:
    current_user = unconfirmed_users.pop()
    print('Verifying user: ' + current_user.title())
    confirmed_users.append(current_user)
```


### 函数

```py
def greet_user(user_name):
    '''这里是文档字符串，Python 用它们来生成有关程序中函数的文档'''
    print('Hello, ' + user_name.title() + '!')

greet_user('gavin')

# 位置实参
def describe_pet(animal_type, pet_name):
    print(animal_type + pet_name)
describe_pet('dog', 'harry')

# 关键字实参
describe_pet(animal_type='dog', pet_name='harry')
describe_pet(pet_name='harry', animal_type='dog')

# 默认值
def describe_pet(pet_name, animal_type='dog'):
    print(animal_type + pet_name)
describe_pet('harry')
describe_pet('willie', 'cat')

# 函数返回值
def get_formatted_name(first_name, last_name):
    '''返回整洁的姓名'''
    full_name = first_name + ' ' + last_name
    return full_name.title()
musician = get_formatted_name('jimi', 'hendrix')

# 让实参变成可选的
def get_formatted_name(first_name, last_name, middle_name=''):
    if middle_name:
        return first_name + ' ' + middle_name + ' ' + last_name
    else:
        return first_name + ' ' + last_name

# 传递列表
def greet_users(names):
    for name in names:
        print('Hello, ' + name.title() + '!')
    names.clear()  # 这里的 clear 会影响到外部的 names 列表

# 传递任意数量的实参
def make_pizza(*toppings):    # 形参前的 * 让 Python 创建一个空元组来接收实参
    '''打印顾客点的所有配料'''
    print(toppings)
make_pizza('pepperoni')
make_pizza('mushrooms', 'green peppers')

def make_pizza(size, *toppings):
    #...

# 使用任意数量的关键字实参
def build_profile(first, last, **user_info):
    profile = {}
    profile['first_name'] = first
    profile['last_name'] = last
    for key, value in user_info.items():
        profile[key] = value
    return profile
user_profile = build_profile('albert', 'einstein', location='princeton', field='physics')
print(user_profile)
```

### 模块

导入整个模块

_pizza.py_

```py
def make_pizza(size, *toppings):
    '''概述要制作的匹萨'''
    print('Making a ' + str(size) + '-inch pizza with the following toppings:')
    for topping in toppings:
        print('- ' + topping)
```

*making_pizzas.py*

```py
import pizza

pizza.make_pizza(16, 'pepperoni')
pizza.make_pizza(12, 'mushrooms', 'green peppers')
```

导入特定的函数

```py
from module_name import function_name
from madule_name import function_0, function_1
```

```py
from pizza import make_pizza
make_pizza(16, 'pepperoni')
```

使用 `as` 给函数指定别名

```py
from module_name import function_name as another_function_name
```

使用 `as` 给模块指定别名

```py
import module_name as another_module_name
```

```py
import pizza as p
p.make_pizza(16, 'pepperoni')
```

导入模块中的所有函数

```py
from pizza import *    # 不推荐这样用

make_pizza(16, 'pepperoni')
```

#### 函数编写指南



