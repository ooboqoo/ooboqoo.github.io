# 速查手册 - 标准库

https://docs.python.org/3.14/library/index.html


文本处理
* string - 常见的字符串操作
* re - 正则表达式操作
* textwrap  - 文本自动换行与填充

数据类型

数字和数学模块
* numbers - 数字抽象基类
* math - 数学函数
* random - 生成伪随机数

数据持久化
* marshal - 内部 Python 对象序列化

通用操作系统服务
* os - 多种操作系统接口
* io - 处理流的核心工具
* time - 时间的访问和转换
* logging - 日志记录工具
* platform - 访问底层平台的标识数据

命令行界面库
* argparse - 命令行选项、参数和子命令的解析

并发执行
* threading - 多线程
* multiprocessing - 多进程
* subprocess - 子进程

网络和进程间通信
* asyncio - 异步 I/O
* socket - 低层级的网络接口

互联网数据处理
* json - JSON 编码器和解码器
* base64 - Base16，Base32，Base64，Base85 数据编码

结构化标记处理
* html
* html.parser

互联网协议支持
* http - HTTP 模块
* http.client - HTTP 客户端

Tk 图形用户界面
* tkinter

开发工具
* typing - 类型提示
* pydoc - 文档生成器和在线帮助系统
* unittest - 单元测试框架




### collections

```py
from collections import OrderedDict
favorite_languages = OrderedDict()
```


### datetime

Basic date and time types

```py
>>> from datetime import datetime
>>> now = datetime.now() # 获取当前datetime
>>> print(now)
2015-05-18 16:28:07.198690
>>> print(type(now))
<class 'datetime.datetime'>
```


### random

```py
from random import randint
x = randint(1, 6)
```


### json

JSON encoder and decoder

```py
# Serialize obj as a JSON formatted stream to fp
json.dump(obj, fp, *, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True,
    cls=None, indent=None, separators=None, default=None, sort_keys=False, **kw)
# Serialize obj to a JSON formatted str.
json.dumps(obj, *, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True,
    cls=None, indent=None, separators=None, default=None, sort_keys=False, **kw)

json.load(fp, *, cls=None, object_hook=None, parse_float=None, parse_int=None,
    parse_constant=None, object_pairs_hook=None, **kw)
json.loads(s, *, encoding=None, cls=None, object_hook=None, parse_float=None, parse_int=None,
    parse_constant=None, object_pairs_hook=None, **kw)
```

```py
import json
json.dumps([1, 2, 3, {'4': 5, '6': 7}], separators=(',', ':'))
json.loads('["foo", {"bar":["baz", null, 1.0, 2]}]')
```


### unittest

Unit testing framework

| Method                    | Checks that          | New in
|---------------------------|----------------------|-----
| assertEqual(a, b)         | a == b               ||
| assertNotEqual(a, b)      | a != b               ||
| assertTrue(x)             | bool(x) is True      ||
| assertFalse(x)            | bool(x) is False     ||
| assertIs(a, b)            | a is b               | 3.1
| assertIsNot(a, b)         | a is not b           | 3.1
| assertIsNone(x)           | x is None            | 3.1
| assertIsNotNone(x)        | x is not None        | 3.1
| assertIn(a, b)            | a in b               | 3.1
| assertNotIn(a, b)         | a not in b           | 3.1
| assertIsInstance(a, b)    | isinstance(a, b)     | 3.2
| assertNotIsInstance(a, b) | not isinstance(a, b) | 3.2

```py
import unittest

class TestStringMethods(unittest.TestCase):
    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')
    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())
    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

if __name__ == '__main__':
    unittest.main()
```

### urllib

urllib is a package that collects several modules for working with URLs:

* urllib.request for opening and reading URLs
* urllib.error containing the exceptions raised by urllib.request
* urllib.parse for parsing URLs
* urllib.robotparser for parsing robots.txt files

```py
urllib.request.urlopen(url, data=None, [timeout, ]*, cafile=None, capath=None, cadefault=False, context=None)

class urllib.request.Request(url, data=None, headers={}, origin_req_host=None, unverifiable=False, method=None)
```


```py
from urllib.request import Request, urlopen
from urllib.error import URLError
req = Request(someurl)
try:
    response = urlopen(req)
except URLError as e:
    if hasattr(e, 'reason'):
        print('We failed to reach a server.')
        print('Reason: ', e.reason)
    elif hasattr(e, 'code'):
        print('The server couldn\'t fulfill the request.')
        print('Error code: ', e.code)
else:
    # everything is fine
```




































