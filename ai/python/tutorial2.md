# Python 教程 - 函数 模块 面向对象编程


## 函数

抽象是数学中非常常见的概念。写计算机程序也是一样，函数就是最基本的一种代码抽象的方式。

<div style="display: flex; align-items: center; line-height: 1em;">
    <div>如数学中的 </div>
    <div style="padding: 0 10px;">100<br><span style="font-size:2em">∑</span><span style="line-height: 2em; vertical-align: super;">(n<sup>2</sup>+1)</span><br>n=1</div>
    <div>还原成加法运算就变成了 (1x1 + 1) + (2x2 + 1) + (3x3 + 1) + ... + (100x100 + 1)</div>
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
    print(animal_type, pet_name)
describe_pet('dog', 'harry')

# 关键字实参
describe_pet('dog', pet_name='harry')
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
    """打印顾客点的所有配料"""
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
    """返回整洁的姓名"""
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

### 函数编写指南

应给函数指定描述性**名称**，且只使用小写字母和下划线。描述性名称可帮助你和别人明白代码想要做什么。给模块命名时也应遵循上述规定。

每个函数都应包含简要阐述其功能的**注释**，该注释应紧跟在函数定义后面，并采用文档字符串格式。

给**形参**指定默认值时，等号两边不要有空格；对于函数调用中的关键字实参，也应遵循这种约定。如果形参很多，导致函数定义的长度超过了79个字符，可在函数定义中输入左括号后换行，并在下一行按两次 Tab 键缩进。

```py
def function_name(
        parameter_0, parameter_1, parameter_2,
        parameter_3, parameter_4):
    function body...
```

如果程序或模块包含多个函数，可使用两个空行将相邻的函数分开。

所有的 `import` 语句都应该放在文件开头，如果有描述整个程序的文件开头的注释，则置于此注释后。

使用函数让程序更容易阅读，而良好的函数名概述了程序各个部分的作用。相对于阅读一系列的代码块，阅读一系列函数调用让你能够更快地明白程序的作用。函数还让代码更容易测试和调试。

### 函数式编程

函数式编程虽然也可以归结到面向过程的程序设计，但其思想更接近数学计算。

函数式编程的一个特点就是，允许把函数本身作为参数传入另一个函数，还允许返回一个函数！

#### 高阶函数

既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

高阶函数除了可以接受函数作为参数外，还可以把函数作为结果值返回。

```py
list(map(str, [1, 2, 3, 4, 5, 6, 7, 8, 9]))  # ['1', '2', '3', '4', '5', '6', '7', '8', '9']

from functools import reduce
reduce(f, [x1, x2, x3, x4])                       # = f(f(f(x1, x2), x3), x4)
reduce(lambda x, y: x * 10 + y, [1, 2, 3, 4, 5])           # 12345

list(filter(lambda x: x % 2, [1, 2, 4, 5, 6, 9, 10, 15]))  # [1, 5, 9, 15]
sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True)
```

#### 匿名函数

```py
f = lambda x: x * x
```

关键字 `lambda` 表示匿名函数。

匿名函数有个限制，就是只能有一个表达式，不用写 `return`，返回值就是该表达式的结果。

用匿名函数有个好处，因为函数没有名字，不必担心函数名冲突。此外，匿名函数也是一个函数对象，也可以把匿名函数赋值给一个变量，再利用变量来调用该函数。同样，也可以把匿名函数作为返回值返回。

```py
def build(x, y):
    return lambda: x * x + y * y  # 此 lambda 无入参
```

#### 装饰器

装饰器 Decorator 可在代码运行期间动态增加功能。本质上，decorator 就是一个返回函数的高阶函数。

```py
import functools

# 定义装饰器
def log(func):
    @functools.wraps(func)  # 效果同 `wrapper.__name__ = func.__name__`, 用于保留原函数的函数名
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper

# 使用装饰器
@log
def now():
    print('2015-3-25')

# 如果 decorator 本身需要传入参数，那就需要编写一个返回 decorator 的高阶函数
def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')
def now():
    print('2015-3-25')
```

#### 偏函数

```py
# 没有偏函数时的用法
int('12345', base=8)  # 5349
int('12345', 16)      # 74565

# 定义偏函数
def int2(x, base=2):
    return int(x, base)
int2('1000000')  # 64
int2('1010101')  # 85

# 借助 functools.partial 创建偏函数
import functools
int2 = functools.partial(int, base=2)
int2('1000000')  # 64
int2('1010101')  # 85
int2('12345', base=8)  # 5349
```


## 模块

为了编写可维护的代码，我们把很多函数分组，分别放到不同的文件里，这样，每个文件包含的代码就相对较少，很多编程语言都采用这种组织代码的方式。在 Python 中，一个 .py 文件就称之为一个模块 Module。

你也许还想到，如果不同的人编写的模块名相同怎么办？为了避免模块名冲突，Python 又引入了按目录来组织模块的方法，称为包 Package。

注: 模块命名不要和内置模块名称冲突。例如，系统自带了 sys 模块，自己的模块就不可命名为 sys.py，否则将无法导入系统自带的 sys 模块。

```txt
mycompany
 ├─ web
 │  ├─ __init__.py  # 每一个包目录下必须有这个文件，否则会被当成普通目录
 │  ├─ utils.py     # 模块名 mycompany.web.utils
 │  └─ www.py
 ├─ __init__.py
 ├─ abc.py
 └─ utils.py        # 模块名 mycompany.utils
```



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

### 作用域

类似 `__xxx__` 这样的变量是特殊变量，可以被直接引用，但是有特殊用途，我们自己的变量一般不要用这种变量名。

类似 `_xxx` 和 `__xxx` 这样的函数或变量就是非公开 private 的，不应该被直接引用(能用但不要用，一种命名约定而已)。

### 模块搜索路径

默认情况下，Python 解释器会搜索当前目录、所有已安装的内置模块和第三方模块，搜索路径存放在 sys 模块的 path 变量中。

如果我们要添加自己的搜索目录，有两种方法：
  * 直接修改 `sys.path`，添加要搜索的目录，这种方法是在运行时修改，运行结束后失效。
  * 设置环境变量 `PYTHONPATH`，该环境变量的内容会被自动添加到模块搜索路径中。

```py
import sys
sys.path.append('/Users/michael/my_py_scripts')
```

### 安装第三方模块

在 Python 中安装第三方模块是通过包管理工具 pip 完成的。

在使用 Python 时，我们经常需要用到很多第三方库，例如 Pillow，MySQL驱动，Web框架 Flask，科学计算 Numpy 等。用 pip 一个一个安装费时费力，还需要考虑兼容性。我们推荐直接使用 Anaconda，这是一个基于 Python 的数据处理和科学计算平台，它已经内置了许多非常有用的第三方库，我们装上 Anaconda，就相当于把数十个第三方模块自动安装好了，非常简单易用。

可以从 Anaconda 官网下载 GUI 安装包，安装包有 500~600M，所以需要耐心等待下载。网速慢的同学请移步国内镜像。下载后直接安装，Anaconda 会把系统 Path 中的 python 指向自己自带的 Python，并且，Anaconda 安装的第三方模块会安装在 Anaconda 自己的路径下，不影响系统已安装的 Python 目录。


## 面向对象编程

面向对象编程是一种程序设计思想。OOP 把对象作为程序的基本单元，一个对象包含了数据和操作数据的函数。

面向对象的设计思想是抽象出 Class，根据 Class 创建 Instance。

数据封装、继承和多态是面向对象的三大特点。

Python中，所有数据类型都可以视为对象，当然也可以自定义对象。

面向过程的程序设计把计算机程序视为一系列的命令集合，即一组函数的顺序执行。而面向对象的程序设计把计算机程序视为一组对象的集合。

### 类

类将函数和数据整洁地封装起来，让你能够灵活而高效地使用它们。

根据类来创建对象被称为实例化。

```py
class Dog():                         # 根据约定，首字母大写的名称指的是类
    """一次模拟小狗的简单尝试"""

    def __init__(self, name, age):   # __init__ 是一个特殊方法，创建新实例时自动调用
        """初始化属性 name 和 age"""
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

class ElectricCar(Car):                     # 父类名写在括号内
    def __init__(self, make, model, year):
        """初始化父类的属性"""
        super.__init__(make, model, year)
    def fill_gas_tank(self):                # 覆写父类方法
        print('电动汽车没有油箱')
```

导入类

*car.py*

```py
class Car():
   """一个可用于表示汽车的类"""

    #...
```

*my_car.py*

```py
from car import Car

my_new_car = Car('audi', 'a4', 2016)
```

#### 私有属性

```py
class ClassName():
    def __init__(self):
        _private_prop = ''   # 单下划线开头的在外部可以访问到，但不建议
        __private_prop = ''  # 双下划线开头的在外部无法访问(此规则不适用于模块内的方面名)
```

#### 类属性

```py
class Student(object):
     name = 'Student'

s = Student()
print(s.name)       # Student
print(Student.name) # Student
s.name = 'Michael'
print(s.name)       # Michael
print(Student.name) # Student
del s.name
print(s.name)       # Student
```

#### 继承和多态

对于一个变量，我们只需要知道它是 Animal 类型，无需确切地知道它的子类型，就可以放心地调用 run() 方法，而具体调用的 run() 方法是作用在 Animal、Dog、Cat 还是 Tortoise 对象上，由运行时该对象的确切类型决定，这就是多态真正的威力：调用方只管调用，不管细节，而当我们新增一种Animal 的子类时，只要确保 run() 方法编写正确，不用管原来的代码是如何调用的。这就是著名的“开闭”原则：
  * 对扩展开放：允许新增 Animal 子类；
  * 对修改封闭：不需要修改依赖 Animal 类型的 run_twice() 等函数。

对于静态语言，如Java，来说，如果需要传入 Animal 类型，则传入的对象必须是 Animal 类型或者它的子类，否则，将无法调用 run() 方法。
对于 Python 这样的动态语言来说，则不一定需要传入 Animal 类型。我们只需要保证传入的对象有一个 run() 方法就可以了。

```py
class Animal(object):
    def run(self):
        print('Animal is running...')

class Dog(Animal):
    def run(self):
        print('Dog is running...')

class Cat():
    def run(self):
        print('Cat is running...')

isinstance(Dog(), Animal)   # True
isinstance(Dog(), Dog)      # True

# 理解多态的好处
def run_twice(animal):
    animal.run()
    animal.run()

run_twice(Animal())  # Animal is running...\nAnimal is running...
run_twice(Dog())     # Dog is running...\nDog is running...

# 鸭式辨形
run_twice(Cat())     # Cat is running...\nCat is running...
```

#### 获取对象信息

当我们拿到一个对象的引用时，如何知道这个对象是什么类型、有哪些方法呢？
  * 基本类型都可以用 `type()` 判断；
  * 总是优先使用 `isinstance()` 判断类型，可以将指定类型及其子类“一网打尽”；
  * 如果要获得一个对象的所有属性和方法，可以使用 `dir()` 函数，它返回一个包含字符串的 list。

```py
type(123)    # <class 'int'>
type('str')  # <class 'str'>
type(None)   # <type(None) 'NoneType'>

isinstance(d, Dog) and isinstance(d, Animal)  # True

```

### 类编码风格

类名应采用驼峰命名法，而不使用下划线。实例名和模块名都采用小写格式，并在单词之间加下划线。

对于每个类，都应紧跟在类定义后面包含一个文档字符串，简要描述类的功能。

在类中，可使用一个空行来分隔方法，而在模块中给，可使用两个空行来分隔类。

需要同时导入标准库中的模块和你编写的模块时，先导入标准库，然后添加一个空行，再导入自己编写的模块。

### 面向对象高级编程

#### 使用 `__slots__`

Python 允许我们动态地添加实例和类属性，如果我们想要限制实例的属性，在定义class的时候，定义一个特殊的 `__slots__`变量，来限制该class实例能添加的属性：

```py
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称
```

使用 `__slots__` 要注意，`__slots__` 定义的属性仅对当前类实例起作用，对继承的子类是不起作用的。

#### 使用 `@property`

内置的 `@property` 装饰器负责把一个方法变成属性调用。广泛应用在类定义中，可以让调用者写出简短的代码，同时保证对参数进行必要的检查。

```py
class Student(object):

    @property
    def birth(self):
        return self._birth

    @birth.setter
    def birth(self, value):
        self._birth = value

    @property                # 没有设置 @age.setter 所以是自读属性
    def age(self):
        return 2015 - self._birth
```

#### 多重继承

通过多重继承，一个子类就可以同时获得多个父类的所有功能。

```py
class Bird(Animal):
    pass

class Runnable(object):
    def run(self):
        print('Running...')

class Flyable(object):
    def fly(self):
        print('Flying...')

class Ostrich(Bird, Runnable):
    pass

class Parrot(Mammal, Flyable):
    pass
```

在设计类的继承关系时，通常，主线都是单一继承下来的，例如，Ostrich 继承自 Bird。但是，如果需要“混入”额外的功能，通过多重继承就可以实现，比如，让 Ostrich 除了继承自 Bird 外，再同时继承 Runnable。这种设计通常称之为 **MixIn**。

为了更好地看出继承关系，我们把 `Runnable` 和 `Flyable` 改为 `RunnableMixIn` 和 `FlyableMixIn`。

#### 定制类

Python 的 class 允许定义许多定制方法，可以让我们非常方便地生成特定的类。

`__len__()` 方法我能让 class 作用于 `len()` 函数。  
`__str__()` 返回用户看到的字符串，而 `__repr__()` 返回程序开发者看到的字符串。  
`__iter__()` 如果一个类想被用于 for...in 循环，就必须实现一个 `__iter__()` 方法，该方法返回一个迭代对象。  

```py
class Student(object):
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return 'Student object (name=%s)' % self.name
    __repr__ = __str__
```

`__getitem__()` 方法动态返回一个元素。  
`__getattr__()` 方法动态返回一个属性。  
`__call__()` 任何类只要定义改方法，就可以直接对实例进行调用。  

```py
class Student():
    lists = ['a', 'b', 'c']
    def __getitem__(self, n):
        return self.lists[n]
    def __getattr__(self, attr):
        if attr == 'score':
            return 0
    def __call__(self):
        print('My name is %s' % self.name)

me = Student()
print(me[1])  # 'b'

me.score = 99
print(me.score) # 99
del me.score
print(me.score) # 0

me.name = 'gavin'
me()  # 'gavin'
```

#### 使用枚举类

```py
@unique
class Gender(Enum):
    Male = 0
    Female = 1

class Student(object):
    def __init__(self, name, gender):
        self.name = name
        self.gender = gender

# 测试:
bart = Student('Bart', Gender.Male)
if bart.gender == Gender.Male:
    print('测试通过!')
else:
    print('测试失败!')
```

#### 使用元类

动态语言和静态语言最大的不同，就是函数和类的定义，不是编译时定义的，而是运行时动态创建的。

`type()` 函数既可以返回一个对象的类型，又可以创建出新的类型。

```py
def fn(self, name='world'):
    print('Hello, %s.' % name)
Hello = type('Hello', (object,), dict(hello=fn))  # 创建 Hello 类
h = Hello()
h.hello()
Hello, world.
```

除了使用 `type()` 动态创建类以外，要控制类的创建行为，还可以使用**元类** metaclass。

```py
# metaclass是类的模板，所以必须从`type`类型派生
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)

class MyList(list, metaclass=ListMetaclass):
    pass
```
