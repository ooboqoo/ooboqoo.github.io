# API-标准库—常见

### json

JSON encoder and decoder

```py
json.dump(obj, fp, *, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True,
    cls=None, indent=None, separators=None, default=None, sort_keys=False, **kw)
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




































