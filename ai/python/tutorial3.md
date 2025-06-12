# Python 教程 - IO 进程 调试和测试


## 异常

Python 使用被称为异常的特殊对象来管理程序执行期间发生的错误。异常是使用 try-except 代码块处理的。

try-except

```py
try:
    print(5/0)
except ZeroDivisionError:
    print("You can't divide by zero!")
```

try-except-else-finally

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
    finally:
        print('done')
```

### 自定义错误类型

```py
class FooError(ValueError):
    pass

def foo(s):
    n = int(s)
    if n == 0:
        raise FooError('invalid value: %s' % s)
    return 10 / n

foo('0')
```

### 记录错误

```py
import logging
def foo(s):
    return 10 / int(s)
def bar(s):
    return foo(s) * 2
def main():
    try:
        bar('0')
    except Exception as e:
        logging.exception(e)
main()
```


## 调试

* 用 `print()` 把可能有问题的变量打印出来，简单直接粗暴有效
* 凡是用 `print()` 来辅助查看的地方，都可以用断言 assert 来替代，如果断言失败，assert 语句本身就会抛出 `AssertionError`
* 把 `print()` 替换为 logging 是第3种方式，和 assert 比，logging 不会抛出错误，而且可以输出到文件
* 第4种方式是启动 Python 的调试器pdb，让程序以单步方式运行，可以随时查看运行状态
* 如果要比较爽地设置断点、单步执行，就需要一个支持调试功能的 IDE

虽然用IDE调试起来比较方便，但是最后你会发现，logging才是终极武器。

assert

```py
def foo(s):
    n = int(s)
    assert n != 0, 'n is zero!'
    return 10 / n

def main():
    foo('0')
```

pdb

```py
import pdb

s = '0'
n = int(s)
pdb.set_trace()  # 运行到这里会自动暂停
print(10 / n)
```

```py
python -m pdb err.py
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

### 文档测试

Python 内置的文档测试 doctest 模块可以直接提取注释中的代码并执行测试。

doctest 严格按照 Python 交互式命令行的输入和输出来判断测试结果是否正确。只有测试异常的时候，可以用 `...` 表示中间一大段烦人的输出。

doctest 非常有用，不但可以用来测试，还可以直接作为示例代码。通过某些文档生成工具，就可以自动把包含 doctest 的注释提取出来。

```py
def fact(n):
    """
    Calculate 1*2*...*n

    >>> fact(1)
    1
    >>> fact(10)
    3628800
    >>> fact(-1)
    Traceback (most recent call last):
    ...
    ValueError
    """
    if n < 1:
        raise ValueError()
    if n == 1:
        return 1
    return n * fact(n - 1)


if __name__ == '__main__':
    import doctest
    doctest.testmod()
```


## IO

### 读写文件

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

打开文件时，可指定读取模式(默认) `r` 写入模式 `w` 附加模式 `a` 或让你能够读取和写入文件的模式 `r+`。

```py
filename = 'programming.txt'
with open(filename, 'w') as file_object:
    file_object.write('I love programming.' + str(123))
```

#### 示例-存储数据

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

### StringIO 和 BytesIO

`StringIO` 和 `BytesIO` 是在内存中操作 str 和 bytes 的方法，使得和读写文件具有一致的接口。

```py
from io import StringIO
f = StringIO('Hello!\nHi!\nGoodbye!')
f.write('aa')
while True:
    s = f.readline()
    if s == '':
        break
    print(s.strip())
```

```py
from io import BytesIO
f = BytesIO()
f.write('中文'.encode('utf-8'))  # 6
print(f.getvalue())  # b'\xe4\xb8\xad\xe6\x96\x87'
```

### 操作文件和目录

操作系统提供的命令只是简单地调用了操作系统提供的接口函数，Python 内置的 os 模块也可以直接调用操作系统提供的接口函数。

```py
>>> import os
>>> os.name  # 操作系统类型
>>> os.uname()  # 详细的系统信息
>>> os.environ  # 环境变量
>>> os.environ.get('PATH')
>>> os.path.abspath('.')
>>> os.path.join('/Users/michael', 'testdir')
>>> os.mkdir('/Users/michael/testdir')  # 创建目录
>>> os.rmdir('/Users/michael/testdir')  # 删除目录
```

### 序列化

Python语言特定的序列化模块是 pickle，但如果要把序列化搞得更通用、更符合Web标准，就可以使用 json 模块。

```py
>>> import pickle
>>> d = dict(name='Bob', age=20, score=88)
>>> pickle.dumps(d)

>>> f = open('dump.txt', 'wb')
>>> pickle.dump(d, f)
>>> f.close()

>>> f = open('dump.txt', 'rb')
>>> d = pickle.load(f)
>>> f.close()
>>> d
```


## 进程和线程

线程是最小的执行单元，而进程由至少一个线程组成。如何调度进程和线程，完全由操作系统决定。多进程和多线程的程序涉及到同步、数据共享的问题，编写起来更复杂。

### 多进程

在 Unix/Linux 下，可以使用 `fork()` 调用实现多进程。

```py
import os

print('Process (%s) start...' % os.getpid())
# Only works on Unix/Linux/Mac:
pid = os.fork()
if pid == 0:
    print('I am child process (%s) and my parent is %s.' % (os.getpid(), os.getppid()))
else:
    print('I (%s) just created a child process (%s).' % (os.getpid(), pid))
```

要实现跨平台的多进程，可以使用 `multiprocessing` 模块。

创建子进程时，只需要传入一个执行函数和函数的参数，创建一个 `Process` 实例，用 `start()` 启动。`join()` 方法可以等待子进程结束后再继续往下运行，通常用于进程间的同步。

```py
from multiprocessing import Process
import os

# 子进程要执行的代码
def run_proc(name):
    print('Run child process %s (%s)...' % (name, os.getpid()))

if __name__=='__main__':
    print('Parent process %s.' % os.getpid())
    p = Process(target=run_proc, args=('test',))
    print('Child process will start.')
    p.start()
    p.join()
    print('Child process end.')
```

`subprocess` 模块可以让我们非常方便地启动一个子进程，然后控制其输入和输出。

```py
import subprocess
r = subprocess.call(['nslookup', 'www.python.org'])
print('Exit code:', r)
```

进程间通信是通过 `Queue` `Pipes` 等实现的。

```py
from multiprocessing import Process, Queue
import os, time, random

# 写数据进程执行的代码:
def write(q):
    print('Process to write: %s' % os.getpid())
    for value in ['A', 'B', 'C']:
        print('Put %s to queue...' % value)
        q.put(value)
        time.sleep(random.random())

# 读数据进程执行的代码:
def read(q):
    print('Process to read: %s' % os.getpid())
    while True:
        value = q.get(True)
        print('Get %s from queue.' % value)

if __name__=='__main__':
    # 父进程创建Queue，并传给各个子进程：
    q = Queue()
    pw = Process(target=write, args=(q,))
    pr = Process(target=read, args=(q,))
    # 启动子进程pw，写入:
    pw.start()
    # 启动子进程pr，读取:
    pr.start()
    # 等待pw结束:
    pw.join()
    # pr进程里是死循环，无法等待其结束，只能强行终止:
    pr.terminate()
```

### 多线程

Python 的标准库提供了两个模块： `_thread` 和 `threading`，`threading` 是高级模块，对 `_thread` 进行了封装，绝大多数情况下，我们只需要使用 `threading` 模块。

```py
import time, threading

# 新线程执行的代码:
def loop():
    print('thread %s is running...' % threading.current_thread().name)
    n = 0
    while n < 5:
        n = n + 1
        print('thread %s >>> %s' % (threading.current_thread().name, n))
        time.sleep(1)
    print('thread %s ended.' % threading.current_thread().name)

print('thread %s is running...' % threading.current_thread().name)
t = threading.Thread(target=loop, name='LoopThread')
t.start()
t.join()
print('thread %s ended.' % threading.current_thread().name)
```

#### 锁

多线程和多进程最大的不同在于，多进程中，同一个变量，各自有一份拷贝存在于每个进程中，互不影响，而多线程中，所有变量都由所有线程共享，所以，任何一个变量都可以被任何一个线程修改，因此，线程之间共享数据最大的危险在于多个线程同时改一个变量，把内容给改乱了。

```py
balance = 0
lock = threading.Lock()

def run_thread(n):
    for i in range(100000):
        # 先要获取锁:
        lock.acquire()
        try:
            # 放心地改吧:
            change_it(n)
        finally:
            # 改完了一定要释放锁:
            lock.release()
```

#### ThreadLocal

一个 `ThreadLocal` 变量虽然是全局变量，但每个线程都只能读写自己的独立副本，互不干扰。`ThreadLocal` 解决了参数在一个线程中各个函数之间互相传递的问题。

`ThreadLocal` 最常用的地方就是为每个线程绑定一个数据库连接，HTTP 请求，用户身份信息等，这样一个线程的所有调用到的处理函数都可以非常方便地访问这些资源。

```py
import threading

# 创建全局ThreadLocal对象:
local_school = threading.local()

def process_student():
    # 获取当前线程关联的student:
    std = local_school.student
    print('Hello, %s (in %s)' % (std, threading.current_thread().name))

def process_thread(name):
    # 绑定ThreadLocal的student:
    local_school.student = name
    process_student()

t1 = threading.Thread(target= process_thread, args=('Alice',), name='Thread-A')
t2 = threading.Thread(target= process_thread, args=('Bob',), name='Thread-B')
t1.start()
t2.start()
t1.join()
t2.join()
```

### 多任务

我们介绍了多进程和多线程，这是实现多任务最常用的两种方式。现在，我们来讨论一下这两种方式的优缺点。

首先，要实现多任务，通常我们会设计 Master-Worker 模式，Master 负责分配任务，Worker 负责执行任务，因此，多任务环境下，通常是一个 Master，多个 Worker。如果用多进程实现Master-Worker，主进程就是Master，其他进程就是Worker。如果用多线程实现Master-Worker，主线程就是Master，其他线程就是Worker。

多进程模式最大的优点就是稳定性高，因为一个子进程崩溃了，不会影响主进程和其他子进程。（当然主进程挂了所有进程就全挂了，但是Master进程只负责分配任务，挂掉的概率低）著名的Apache最早就是采用多进程模式。多进程模式的缺点是创建进程的代价大，在Unix/Linux系统下，用fork调用还行，在Windows下创建进程开销巨大。另外，操作系统能同时运行的进程数也是有限的，在内存和CPU的限制下，如果有几千个进程同时运行，操作系统连调度都会成问题。

多线程模式通常比多进程快一点，但是也快不到哪去，而且，多线程模式致命的缺点就是任何一个线程挂掉都可能直接造成整个进程崩溃，因为所有线程共享进程的内存。在Windows上，如果一个线程执行的代码出了问题，你经常可以看到这样的提示：“该程序执行了非法操作，即将关闭”，其实往往是某个线程出了问题，但是操作系统会强制结束整个进程。

在Windows下，多线程的效率比多进程要高，所以微软的IIS服务器默认采用多线程模式。由于多线程存在稳定性的问题，IIS的稳定性就不如Apache。为了缓解这个问题，IIS和Apache现在又有多进程+多线程的混合模式，真是把问题越搞越复杂。


