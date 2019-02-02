# Python 教程 - IO 进程 测试


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
