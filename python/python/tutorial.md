# Python 入门

要关闭 Python 解析器，可按 `Ctrl+D` 或执行命令 `exit()` 

## Intro

Python 的语法特点
  * Python 使用换行来结束命令，而其他编程语言常用 `;` 等来标记结尾
  * Python 依赖缩进来标识层级，而其他语言多用 `{}`


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

应给函数指定描述性**名称**，且只使用小写字母和下划线。描述性名称可帮助你和别人明白代码想要做什么。给模块命名时也应遵循上述规定。

每个函数都应包含简要阐述其功能的**注释**，该注释应紧跟在函数定义后面，并采用文档字符串格式。

给**形参**指定默认值时，等号两边不要有空格；对于函数调用中的关键字实参，也应遵循这种约定。如果形参很多，导致函数定义的长度超过了79字符，可在函数定义中输入左括号后换行，并在下一行按两次 Tab 键缩进。

```py
def function_name(
        parameter_0, parameter_1, parameter_2,
        parameter_3, parameter_4):
    function body...
```

如果程序或模块包含多个函数，可使用两个空行将相邻的函数分开。

所有的 import 语句都应该放在文件开头，如果有描述整个程序的文件开头的注释，则置于此注释后。

使用函数让程序更容易阅读，而良好地函数名概述了程序各个部分的作用。相对于阅读一系列的代码块，阅读一系列函数调用让你能够更快地明白程序地作用。函数还让代码更容易测试和调试。


### 类

类将函数和数据整洁地封装起来，让你能够灵活而高效地使用它们。

面向对象编程时最有效地软件编写方法之一。

根据类来创建对象被称为实例化。

```py
class Dog():                         # 根据约定，首字母大写的名称指的是类
    '''一次模拟小狗的简单尝试'''

    def __init__(self, name, age):   # __init__ 是一个特殊方法，创建新实例时自动调用
        '''初始化属性 name 和 age'''
        self.name = name
        self.age = age

    def sit(self):                   # 每个与类相关联的方法调用都自动传递实参 self
        print(self.name.title() + ' is now sitting.')

my_dog = Dog('willie', 6)
print("My dog's name is " + my_dog.name.title() + '.')
my_dog.sit()
```

继承

```py
class Car():
    def __init__(self, make, model, year):
        #...
    def fill_gas_tank(self):
        #...

class ElectricCar(Car):
    def __init__(self, make, model, year):
        '''初始化父类的属性'''
        super.__init__(make, model, year)
    def fill_gas_tank(self):                # 覆写父类方法
        print('电动汽车没有油箱')
```

导入类

*car.py*

```py
'''一个可用于表示汽车的类'''
class Car():
    #...
```

*my_car.py*

```py
from car import Car

my_new_car = Car('audi', 'a4', 2016)
```

### Python 标准库

```py
from random import randit
x = randint(1, 6)
```

```py
from collections import OrderedDict
favorite_languages = OrderedDict()
```

### 类编码风格

类名应采用驼峰命名法，而不使用下划线。实例名和模块名都采用小写格式，并在单词之间加下划线。

对于每个类，都应紧跟在类定义后面包含一个文档字符串，简要描述类的功能。

在类中，可使用一个空行来分隔方法，而在模块中给，可使用两个空行来分隔类。

需要同时导入标准库中的模块和你编写的模块时，先导入标准库，然后添加一个空行，再导入自己编写的模块。


## 文件和异常

学习本章的技能可提高程序的适用性、可用性和稳定性。

### 读文件

```py
# 关键字 with 在不再需要访问文件后将其关闭，虽然可手动 close() 但很可能画蛇添足
with open(file_path) as file_object:
    contents = file_object.read()  # 读取文件的全部内容
    print(contents)

with open('D:\\123.txt') as file_object:
    for line in file_object:
        print(line.rstrip())

with open('/home/pi.txt') as file_object:
    lines = file_object.readlines()  # 这里没有创建作用域，所以后面能直接读到
pi_string = ''
for line in lines:
    pi_string += line.strip()
print(pi_string)
```

### 写文件

打开文件时，可指定读取模式(默认) `r` 写入模式 `w` 附加模式 `a` 或让你能够读取和写入文件的模式 `r+`。

```py
filename = 'programming.txt'
with open(filename, 'w') as file_object:
    file_object.write('I love programming.' + str(123))
```

### 异常

Python 使用被称为异常的特殊对象来管理程序执行期间发生的错误。异常是使用 try-except 代码块处理的。

try-except

```py
try:
    print(5/0)
except ZeroDivisionError:
    print("You can't divide by zero!")
```

try-except-else

```py
print("Give me two numbers, and I'll divide them.")
print("Enter 'q' to quit.")
while True:
    first_number = input("\nFirst number: ")
    if first_number == 'q':
        break
    second_number = input("\nSecond number: ")
    try:
        answer = int(first_number) / int(second_number)
    except ZeroDivisionError:
        print("You can't divide by 0!")
    else:
        print(answer)
```

### 存储数据

*number_writer.py*

```py
import json

numbers = [2, 3, 5, 7, 11, 13]

filename = 'numbers.json'
with open(filename, 'w') as f_obj:
    json.dump(numbers, f_obj)
```

*number_reader.py*

```py
import json

filename = 'numbers.json'
with open(filename) as f_obj:
    numbers = json.load(f_obj)
print(numbers)
```

*remember_me.py*

```py
import json

filename = 'username.json'

def get_stored_username():
    '''如果存储了用户名，就获取它'''
    try:
        with open(filename) as f_obj:
            username = json.load(f_obj)
    except FileNotFoundError:
        return None
    else:
        return username

def get_new_username():
    '''提示用户输入用户名'''
    username = input("What is your name? ")
    with open(filename, 'w') as f_obj:
        json.dump(username, f_obj)
    return username

def greet_user():
    '''问候用户，并指出其名字'''
    username = get_stored_username()
    if username:
        print("Welcome back, " + username + "!")
    else:
        username = get_new_username()
        print("We'll remember you when you come back, " + username + "!")

greet_user()
```


## 测试

**单元测试**用于核实函数的某个方面没有问题；**测试用例**是一组单元测试，这些单元测试一起核实函数在各种情形下的行为都符合要求。良好的测试用例考虑到了函数可能收到的各种输入，包含针对所有这些情形的测试。**全覆盖测试**用例包含一整套单元测试，涵盖了各种可能的函数使用方式。对于大型项目，要实现全覆盖可能很难。通常，最初只针对代码的重要行为编写测试即可，等项目被广泛使用时再考虑全覆盖。

测试是很多初学者都不熟悉的主题。参与工作量较大的项目时，你应对自己编写的函数和类的重要行为进行测试，这样你就能够更加确定自己所做的工作不会破坏项目的其他部分。相比于等到不满意的用户报告bug后再采取措施，在测试未通过时采取措施要容易得多。

如果你在项目中包含了初步测试，其他程序员将更敬佩你，他们将能够更得心应手地尝试使用你编写的代码，也更愿意与你合作开发项目。如果你要跟其他程序员开发的项目共享代码，就必须证明你编写的代码通过了既有测试，通常还需要为你添加的新行为编写测试。

### 测试函数

方法名必须以 `test_` 打头，这样它才会在我们执行文件时自动运行。在 TestCase 类中使用很长的方法名是可以的，这些方法的名称必须是描述性的，这才能让你明白测试未通过时的输出。

```py
import unittest
from name_function import get_formatted_name

class NamesTestCase(unittest.TestCase):
    def test_first_last_name(self):
        formatted_name = get_formatted_name('janis', 'joplin')
        self.assertEqual(formatted_name, 'Janis Joplin')
    
    def test_first_middle_last_name(self):
        formatted_name = get_formatted_name('wolFgang', 'mozarT', 'Amadeus')
        self.assertEqual(formatted_name, 'Wolfgang Amadeus Mozart')

unittest.main()
```

### 测试类

*survey.py*

```py
class AnonymousSurvey():

    def __init__(self, question):
        self.question = question
        self.responses = []

    def show_question(self):
        print(self.question)

    def store_response(self, new_response):
        self.responses.append(new_response)

    def show_results(self):
        print("Survey results:")
        for response in self.responses:
            print('- ' + response)
```

*test_survey.py*

```py
import unittest
from survey import AnonymousSurvey

class TestAnonymousSurvey(unittest.TestCase):

    def setUp(self):
        question = "What language did you first learn to speak?"
        self.my_survey = AnonymousSurvey(question)
        self.responses = ['English', 'Spanish', 'Japanese']

    def test_store_single_response(self):
        self.my_survey.store_response(self.responses[0])
        self.assertIn(self.responses[0], self.my_survey.responses)

    def test_store_three_responses(self):
        for response in self.responses:
            self.my_survey.store_response(response)
        for response in self.responses:
            self.assertIn(response, self.my_survey.responses)

unittest.main()
```
