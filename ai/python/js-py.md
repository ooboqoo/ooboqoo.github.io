# JS 到 Python 的坑


## 容易踩的坑

### 可变默认参数

Python 的默认参数在函数定义时只创建一次。

```py
def foo(arr=[]):
    arr.append(1)
    return arr

foo()  # [1]
foo()  # [1, 1]  ❌ JS 没有这个坑，但 Python 要特别注意
```

### 变量作用域

Python 没有块级作用域，if / for / while 不会产生新作用域。Python 中只有 函数、类、模块、lambda 才会创建新作用域。

```py
for i in range(3):
    pass
print(i)  # 2 😱
```

### `==` vs `is`

```py
a = [1,2]
b = [1,2]

a == b  # True（值相等）
a is b  # False（不是同一个对象）
```


## 用法差异

### dict ≠ JS Object

```py
d = {"a": 1}
d.a      # ❌ AttributeError
d["a"]   # ✅
```

### 异常处理是 "控制流"，不是兜底

Python 社区鼓励：EAFP（Easier to Ask Forgiveness than Permission）

```py
try:
    x = d["key"]
except KeyError:
    x = None
```

```js
if ("key" in obj) { ... }
```


## 异步模型

| JS                | Python
|-------------------|-------------
| Promise           | Coroutine
| 自动调度           | 需要 event loop
| 浏览器 / Node 默认 | asyncio / trio / anyio



```py
async def foo():
    await bar()

# 不会执行
foo()

# 正确用法
await foo()
# 或
asyncio.run(foo())
```

### sleep

```py
async def foo():
    time.sleep(2)            # ❌ 会阻塞整个 asyncio
    await asyncio.sleep(2)   # ✅ 
```


## 类型系统

Python 的 *类型系统只是辅助，不是约束*。运行时不检查，需要依赖 mypy、pyright 或 IDE。




