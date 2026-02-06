# 类型注解


## TypedDict vs dataclass vs Pydantic

* `TypedDict` 是「dict 的类型注释」，最轻量，只是给 dict 添加了更明确的类型信息
* `dataclass` 是「运行时的值对象」，运行时真实存在，有属性有方法，但没有运行时校验
* `pydantic` 是「边界工具」，有运行时校验，碰到外部输入时必须上 Pydantic

选项速查表

| 场景                  | 推荐                  | 原因 |
|-----------------------|-----------------------|----------------
| 配置对象（代码内构造）   | dataclass / TypedDict | 简单即可
| 单模块内部状态          | dataclass             | 不需要校验
| JSON / env / 外部输入  | pydantic              | 必须校验
| WebSocket / HTTP / MQ | pydantic               | 边界防御

### TypedDict

适用场景
* 数据天然是 dict
* 只想给 dict 补类型

```py
from typing import TypedDict

class LogoutResult(TypedDict):
    success: bool
    message: str | None

def logout() -> LogoutResult:
    try:
        ...
        return {
            "success": True,
            "message": "登出成功",
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"登出操作失败：{e}",
        }
```

### dataclass

* 有真实对象实例，有属性访问（user.id），支持方法
* 没有运行时校验
* 适合
    * 内部模块通信
    * 对输入非常可控的场景

```py
from dataclasses import dataclass

@dataclass
class CreateUserRequest:
    name: str
    age: int
```

### Pydantic

* Pydantic 负责 “数据边界”，有运行时校验
* 是否要上 Pydantic 的标准：*是否跨信任边界*
* FastAPI 直接用它作为 Request / Response

```py
from pydantic import BaseModel

class CreateUserIn(BaseModel):
    name: str
    age: int

class CreateUserOut(BaseModel):
    id: str

req = CreateUserIn.model_validate(json_data)
print(req.name, req.age)
resp = CreateUserOut(id="u_123")
return resp.model_dump()
```

## typing

https://docs.python.org/3/library/typing.html

### `collections.abc`

`collections.abc` 定义了 “容器、集合、可迭代对象” 等常见数据结构的抽象基类（ABC，Abstract Base Classes）。

```py
# 用法示例
# 👉 你关心的是“能不能像 list 用”，而不是“是不是 list”。

# ❌ 不推荐
isinstance(x, list)

# ✅ 推荐
isinstance(x, Sequence)
```

#### `typing` vs `collections.abc`

Python ≤ 3.8 时，`typing` 自己造了一套类型，`collections.abc.Iterable` ≠ `typing.Iterable`

* `collections.abc` 是行为接口，它关注 “这个对象在运行时能做什么” “子类是否实现了必须的方法” duck typing
* `typing` 只关注静态类型检查

Python 3.9 开始，`typing.Iterable` 等逐步废弃，直接用 `collections.abc` 就行。

#### `Protocol`

👉 Protocol = typing 版的“行为描述”

```py
from typing import Protocol

class CanFly(Protocol):
    def fly(self) -> None: ...
```

### Type aliases

The `type` statement is new in Python 3.12.

```py
type Vector = list[float]
```

### Annotating callable objects

`Callable[ParamSpecVariable, ReturnType]`

```py
from collections.abc import Callable, Awaitable

def acync_query(on_success: Callable[[int], None],
                on_error: Callable[[int, Exception], None]) -> None:
    ...  # Body

async def on_update(value: str) -> None:
    ...  # Body

callback: Callable[[str], Awaitable[None]] = on_update
```

### Generics

```py
from collections.abc import Sequence

def first[T](l: Sequence[T]) -> T:  # Function is generic over the TypeVar "T"
    return l[0]
```

```py
# 这里演示 ``TypeVar`` 的用法，3.12 之后一般直接用上面那种新语法就行
from collections.abc import Sequence
from typing import TypeVar

U = TypeVar('U')                  # Declare type variable "U"

def second(l: Sequence[U]) -> U:  # Function is generic over the TypeVar "U"
    return l[1]
```


### Tuple

```py
# ``y`` is assigned to a tuple of length 2; element 1 is an int, element 2 is a str
y: tuple[int, str] = (5, "foo")

# ``tuple[int, ...]`` could be of any length, and all elements are of the same type ``int``
x: tuple[int, ...] = (1, 2)

# ``y`` can only ever be assigned to an empty tuple
y: tuple[()] = ()
```

### The type of class objects

The only legal parameters for type are classes, Any, type variables, and unions of any of these types.

`type[Any]` is equivalent to `type`, which is the root of Python’s metaclass hierarchy.

```py
class User: ...
class ProUser(User): ...
class TeamUser(User): ...

def make_new_user(user_class: type[User]) -> User:
    # ...
    return user_class()

make_new_user(User)      # OK
make_new_user(ProUser)   # Also OK: ``type[ProUser]`` is a subtype of ``type[User]``
make_new_user(TeamUser)  # Still fine
make_new_user(User())    # Error: expected ``type[User]`` but got ``User``
make_new_user(int)       # Error: ``type[int]`` is not a subtype of ``type[User]``
```

### Annotating generators and coroutines

Coroutines can be annotated using `Coroutine[YieldType, SendType, ReturnType]`. Generic arguments correspond to those of `Generator`, for example:

```py
from collections.abc import Coroutine
c: Coroutine[list[str], str, int]  # Some coroutine defined elsewhere
x = c.send('hi')                   # Inferred type of 'x' is list[str]
async def bar() -> None:
    y = await c                    # Inferred type of 'y' is int
```

### The `Any` type

This behavior allows `Any` to be used as an escape hatch when you need to mix dynamically and statically typed code.

Contrast the behavior of `Any` with the behavior of `object`. Similar to `Any`, every type is a subtype of `object`. However, unlike `Any`, the reverse is not true: `object` is not a subtype of every other type.

### Nominal vs structural subtyping

动态语言只适合玩 “鸭式辨形法”

* Initially PEP 484 defined the Python static type system as using nominal subtyping.
    * The problem with this approach is that a class had to be explicitly marked to support them, which is *unpythonic* and unlike what one would normally do in idiomatic dynamically typed Python code.
* PEP 544 allows to ... This is known as structural subtyping (or static duck-typing).


## 类型断言

`assert x is not None` 明确类型 + 运行时校验

```py
x: str | None = get_name()

assert x is not None
reveal_type(x)  # str
```

`typing.cast()` 只影响类型系统，运行时不做检查

```py
from typing import cast

x: int | None = get_value()

y = cast(int, x)
reveal_type(x)  # int
```





## pywright

https://microsoft.github.io/pyright/#/getting-started

屏蔽整个文件的报错

```py
# pyright: reportUnknownArgumentType=false, reportUnknownMemberType=false
```

屏蔽单行报错

```py
# pyright: ignore[reportUnknownArgumentType, reportUnknownMemberType]
```


## 字符串注解 Forward Reference

1. Python 注解的求值时机

Python 的类型注解默认在函数定义时立即求值：

```py
def foo(x: SomeType) -> AnotherType:  # Python 会立刻尝试解析 SomeType 和 AnotherType
    pass
```

这意味着 SomeType 必须在这行代码执行前就已经存在于命名空间中。运行时不存在，会抛出 `NameError`。


2. 什么情况需要字符串注解？

情况一：前向引用（类还没定义）

```py
class Node:
    def set_next(self, node: Node) -> None:  # ❌ 报错！Node 还没定义完
        self.next = node
class Node:
    def set_next(self, node: "Node") -> None:  # ✅ 用字符串，延迟解析
        self.next = node
```

情况二：循环导入

情况三：仅用于类型检查的导入

```py
if TYPE_CHECKING:
    from loguru import Message  # 运行时不执行
def _gui_sink(message: "Message"):  # 必须用字符串
    ...
```

3. TYPE_CHECKING 的原理

```py
# typing 模块中的定义TYPE_CHECKING = False  # 永远是 False
```

但类型检查器（pyright/mypy）在分析代码时会假装它是 True，所以：
* 运行时：if TYPE_CHECKING: 块内的代码不执行（节省导入开销）
* 类型检查时：类型检查器会分析这些导入

4. `from __future__ import annotations` 的魔法

PEP 563 引入了这个特性，加上后所有注解都变成字符串，不再立即求值：

```py
from __future__ import annotations
class Node:
    def set_next(self, node: Node) -> None:  # ✅ 自动变成 "Node"，不报错
        self.next = node
```

原理：编译器会把 node: Node 自动转换成 node: "Node"，存储为字符串。

5. 如何在运行时获取真正的类型？

如果你需要在运行时获取注解的实际类型（比如做序列化框架），可以用 `typing.get_type_hints()`：

```py
from typing import get_type_hints

class Foo:
    def bar(self, x: "int") -> "str": ...

hints = get_type_hints(Foo.bar)
# {'x': <class 'int'>, 'return': <class 'str'>}
```

它会自动解析字符串注解，返回真正的类型对象。


## 变量作用域


### LEGB 规则（从近到远）

当 Python 查找一个变量名时，顺序是：
1. L（Local）局部作用域：当前函数内部定义的变量
2. E（Enclosing）闭包作用域：外层函数（但不是全局）的作用域
3. G（Global）全局作用域：当前模块（.py 文件）顶层定义的变量
4. B（Built-in）内置作用域：Python 内置的名字，如 len、print、int

### 局部作用域（Local）

```py
def foo():
    x = 10
    print(x)

foo()
print(x)  # ❌ NameError
```

⚠️ 只要在函数里对变量有赋值操作，它默认就是局部变量

```py
x = 10

def foo():
    x = x + 1  # ❌ UnboundLocalError
```

原因：Python 看到 x = ...，就认为 x 是局部变量，但右边又先使用了它。


### 全局作用域（Global）

修改全局变量：`global`，不加 global，只能读，不能改。

```py
x = 10

def foo():
    global x
    x = 20

foo()
print(x)  # 20
```

### 闭包作用域（Enclosing）

```py
def outer():
    x = 10
    def inner():
        print(x)
    inner()

outer()  # 10
```

inner 可以访问 outer 的变量。

修改外层函数变量：`nonlocal`

```py
def outer():
    x = 10
    def inner():
        nonlocal x
        x += 1
    inner()
    print(x)

outer()  # 11
```

* nonlocal 作用于 最近的一层 enclosing 作用域
* 不能用于全局变量

### 内置作用域（Built-in）

```py
print(len("abc"))  # 3
```

len 来自 built-in 作用域。

⚠️ 不要覆盖内置名字

```py
len = 10
print(len("abc"))  # ❌ TypeError
```

### 作用域的几个常见坑

1️⃣ *if / for / while 不会产生新作用域。
Python 中只有 函数、类、模块、lambda 才会创建新作用域。*

```py
if True:
    x = 10

print(x)  # 10

for i in range(3):
    pass

print(i)  # 2
```

2️⃣ 列表推导式（Python 3+）

* *推导式有自己的作用域*
* 不会污染外部变量（Python 2 会）

```py
x = 10
lst = [x for x in range(3)]
print(x)  # 10
```

3️⃣ 默认参数的“作用域 + 时机”问题

*默认参数在 函数定义时 创建，不是每次调用重新创建*

*当默认参数为引用类型时，Python 和 JavaScript 的行为存在核心、本质的差异*
* Python 在函数定义时创建一次，所有调用共享同一个对象
* JavaScript 在函数调用时才创建，每次调用都是新的对象

```py
def foo(x, cache=[]):
    cache.append(x)
    return cache

print(foo(1))  # [1]
print(foo(2))  # [1, 2]

# 推荐写法（Python 官方文档和 PEP 推荐写法）
def foo(x, cache=None):
    if cache is None:
        cache = []
```






