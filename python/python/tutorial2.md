# Python 教程 - 函数 模块 面向对象编程


## 函数

抽象是数学中非常常见的概念。写计算机程序也是一样，函数就是最基本的一种代码抽象的方式。

<div style="display: flex; align-items: center; line-height: 1em;">
    <div>100<br><span style="font-size:2em">∑</span><span style="line-height: 2em; vertical-align: super;">(n<sup>2</sup>+1)</span><br>n=1</div>
    <div style="padding-left: 10px;">还原成加法运算就变成了 (1x1 + 1) + (2x2 + 1) + (3x3 + 1) + ... + (100x100 + 1)</div>
</div>

### 基本使用

```py
# 定义函数
def greet_user(user_name):
    """这里是文档字符串，Python 用它们来生成有关程序中函数的文档"""
    print('Hello, ' + user_name.title() + '!')

# 调用函数
greet_user('gavin')

# 空函数
def nop():
    pass
```

### 参数

除了正常定义的必选参数外，还可使用默认参数、可变参数和关键字参数。

```py
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

# 传递任意数量的实参 tuple
def make_pizza(*toppings):    # 形参前的 * 让 Python 创建一个空元组来接收实参
    '''打印顾客点的所有配料'''
    print(toppings)
make_pizza('pepperoni')
make_pizza('mushrooms', 'green peppers')

def make_pizza(size, *toppings):
    #...

# 使用任意数量的关键字实参 dict
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

### 返回值

```py
def get_formatted_name(first_name, last_name):
    '''返回整洁的姓名'''
    full_name = first_name + ' ' + last_name
    return full_name.title()
musician = get_formatted_name('jimi', 'hendrix')

# 函数可以同时返回多个值，但其实就是一个 tuple
import math
def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny
x, y = move(100, 100, 60, math.pi / 6)
print(x, y)
```

函数名其实就是指向一个函数对象的引用，完全可以把函数名赋给一个变量，相当于给这个函数起了一个“别名”。


## 高级特性


## 函数式编程


## 模块

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


## 面向对象编程

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
