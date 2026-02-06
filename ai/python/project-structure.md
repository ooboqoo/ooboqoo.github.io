# 项目结构


## pyproject.toml

https://github.com/openai/whisper/blob/main/pyproject.toml

TOML 语法见 [笔记](/swe/#!tools/toml.md)

```toml
name = "openai-whispeer"  # 注意：包名用 `_`, project 名用 `-`
description = "Robust Speech Recognition via Large-Scale Weak Supervision"
readme.content-type = "text/markdown"
readme.file = "README.md"
license = { text = "MIT" }
authors = [ { name = "OpenAI" } ]
requires-python = ">=3.8"
dependencies = [
  "more-itertools",
  "numba",
  "numpy",
  "tiktoken",
  "torch",
  "tqdm",
  "triton>=2; (platform_machine=='x86_64' and sys_platform=='linux') or sys_platform=='linux2'",
]
scripts.whisper = "whisper.transcribe:cli"  # 重要，安装后运行 `whisper` 时需要通过此配置找入口代码
```

### console_scripts

console_scripts = Python 里创建命令行工具的 "标准入口点"。可以把一个 Python 函数自动变成一个系统命令。

#### 解决的问题

```bash
# 你希望用户安装你的包后，可以直接在终端运行
hello-cli

# 而不是
python -m your_package
#或
python your_script.py
```

#### 用法

现代 Python 项目一般在 pyproject.toml 中配置

```toml
[project.scripts]
hello-cli = "my_package.cli:main"
```

含义是

```txt
生成一个命令：hello-cli
执行时等价于：
    from my_package.cli import main
    main()
```

安装（安装后才生效）

```bash
uv pip install -e .
```

#### 本质

以 macOS 为例，安装后

```bash
which hello-cli

# 通常会看到
~/.venv/bin/hello-cli
```


## 复杂项目结构

https://github.com/openai/whisper/tree/main/whisper

```txt
├── whisper
│   ├── normalizers
│   │   ├── __init__.py
│   │   ├── base.py
│   │   └── english.py
│   ├── __init__.py
│   ├── __main__.py
│   ├── transcribe.py
│   └── utils.py
├── .python-version
├── README.md
├── pyproject.toml
└── uv.lock
```

_pyproject.toml_

```toml
scripts.whisper = "whisper.transcribe:cli"
```

_whisper/transcribe.py_

```py
from .utils import (     # 注意这里 .utils 的用法
    exact_div,
    format_timestamp,
    get_end,
)

# ...


def cli():
    from . import available_models  # Python 的 import 是 “运行时语句”
    def valid_model_name(name):
        # ...
    # ...

if __name__ == "__main__":
    cli()
```

### uv init

https://docs.astral.sh/uv/concepts/projects/init/ `uv init`
* 默认，或 `--app` Applications
* Packaged applications `--package`，代码会放到 `src` 目录下


## 模块导入

https://docs.python.org/3/tutorial/modules.html

### 基本概念

#### 包 Package

包 = 含有 `__init__.py` 的目录

It’s important to keep in mind that *all packages are modules*, but not all modules are packages. Or put another way, packages are just a special kind of module. Specifically, any module that contains a __path__ attribute is considered a package.

`__name__` The file name is the module name with the suffix .py appended. Within a module, the module’s name (as a string) is available as the value of the global variable `__name__`.

#### 模块 Module

模块 module 本质上是一个 `.py` 文件。

引入"模块"概念的目的
* 代码复用
* 逻辑拆分
* 命名空间隔离
* 工程可维护性

#### 顶级模块 top-level module

直接放在项目根目录下的 py 文件（`project/*.py` 文件），可以在 main.py 中直接 `import module_name`。

### 基础用法

导入整个模块

```py
import math
print(math.sqrt(16))
```

导入别名

```py
import numpy as np
import pandas as pd
```

导入模块下对象

```py
from math import sqrt
print(sqrt(16))
```

导入模块下对象并设置别名

```py
from math import sqrt as square_root
```

导入模块内全部对象（不推荐）

```py
from math import *
```

### 相对导入 vs 绝对导入

绝对导入（推荐）

优点：路径清晰，IDE 静态分析友好，不依赖当前文件位置

```py
from mypkg.utils import helper
```

相对导入（包内使用）

优点：写法更短，冲偶目录时更安全

```py
from . import func_b         # 从当前包导入 模块 或 __init__.py 导出的对象
from .utils import func_c    # 从 ./utils.py 导入
from ..utils import helper   # 从 ../utils.py 导入
```

注意：不能在 "直接运行的脚本" 中使用相对导入，会报错。需要用 `python -m` 运行，或在 main.py 中调用。

```bash
python sub/run.py  # ❌ ImportError: attempted relative import with no known parent package
python -m sub.run  # ✅
```

什么时候该用相对导入，什么时候不用？

* ✅ 适合用相对导入的场景
    * 包内部模块互相调用
    * 不希望依赖项目的“安装路径”
    * 写库代码
* ❌ 不建议用的场景
    * 顶层脚本（CLI、main 入口）
    * 小脚本 / 一次性脚本

### `__name__ == '__main__'`

```py
print(__name__)  # 直接运行脚本时为 "__main__"；当被导入时为「模块名」foo.py -> "foo"
```

典型用法
* 区分「脚本运行」与「模块导入」
* 防止导入时执行副作用代码

```py
def main():
    pass

if __name__ == '__main__':
    main()
```

### 高级导入技巧

#### 动态导入 importlib

应用场景：
* 插件系统
* 根据配置加载模块

```py
import importlib
mod = importlib.import_module('math')
print(mod.sqrt(9))
```

#### 条件导入

```py
if sys.platform == 'win32':
    import winreg
else:
    import pwd
```

#### 延迟导入（性能优化）

用于：
* 启动性能
* 减少不必要依赖

```py
def heavy():
    import numpy as np
    return np.zeros(10)
```

#### 可选依赖模式

```py
try:
    import orjson as json
except ImportError:
    import json
```

### Python vs JavaScript

Python 的 import 是“运行时语句”，而 JS（ESM）的 import 是“编译期声明”。

JS 的 import 是模块声明，必须在文件顶层，在代码执行前就要完成模块解析。当然 JS 也支持 `import()` 来动态加载模块。

PEP8 建议将 import 放在文件头，但这是「约定」，不是语言语法限制。



## import 原理

* 官方教程 https://docs.python.org/3/tutorial/modules.html
* 语言参考 https://docs.python.org/3/reference/import.html


```txt
from <package / module> import <subpackage / module / function_or_variable>

import <package / module> # can't be a class or function or variable here
```

### 搜索机制

Python 查找顺序（即，sys.path 包含的目录列表）
1. 当前脚本所在目录
2. PYTHONPATH 环境变量
3. 标准库目录
4. .venv 下的 site-packages（第三方库）

```py
print(sys.path) # 搜索路径存放在 sys 模块的 path 变量中
```

同目录下的查找顺序（以 foo 示例）
1. 包（含 `__init__.py` 的目录）或 namespace package，即 `foo/` 目录
2. 模块，即 `foo.py`
3. C 扩展，即 `foo.so` 或 `foo.pyd`
4. 其他可加载格式

`from package import item` first tests whether the item is defined in the package; if not, it assumes it is a module and attempts to load it. If it fails to find it, an `ImportError` exception is raised.


Python 导入规则：`import xxx` 就是在 sys.path 的每一项下找 `xxx/__ini__.py`（先找）或 `xxx.py`（后找）

Python 启动后，会构造一个 sys.path 列表，只要 Package_name 是这些路径的 *第一层目录*，就合法。

当前启动脚本（即 *入口脚本*）所在目录，会被自动加入 `sys.path[0]`。即，`sys.path[0]` 是由入口脚本所在目录决定的。

### The Module Search Path

https://docs.python.org/3/tutorial/modules.html#the-module-search-path

When a module named `spam` is imported
1. the interpreter first searches for a built-in module with that name. These module names are listed in [sys.builtin_module_names](https://docs.python.org/3/library/sys.html#sys.builtin_module_names).
2. If not found, it then searches for a file named `spam.py` in a list of directories given by the variable `sys.path`. `sys.path` is initialized from these locations:
    1. The directory containing the input script (or the current directory when no file is specified).
    2. [PYTHONPATH](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONPATH) (a list of directory names, with the same syntax as the shell variable PATH).
    3. The installation-dependent default (by convention including a `site-packages` directory, handled by the site module).

### 缓存

import 不是复制代码，而是：
* 执行一次模块
* 缓存到 sys.modules
* 后续 import 只是引用

```py
print(sys.modules.keys())
```

Importing `parent.one` will implicitly execute `parent/__init__.py` and `parent/one/__init__.py`.

### 常见坑

判断一个绝对导入是否合法的快速方法：必须全部满足一下3条
* 这个 package_name 是不是一个目录
* 这个目录是不是在 sys.path 里的某一项下面
* 它是不是 sys.path 下的 *第一层目录*

#### package 在 "更深一层目录" 里

```txt
project/
├── main.py
└── src/
    └── package_name/
        └── module.py
```

```py
from package_name.module import foo  # ❌ ModuleNotFoundError
```

原因：`sys.path` 里有 `project/`，但 没有 `project/src/`

#### 从包内部“假装”绝对导入

```txt
package_name/
├── __init__.py
├── a.py
└── sub/
    ├── __init__.py
    └── b.py
```

```py
# sub/b.py
from a import foo   # ❌ 错误

from package_name.a import foo   # ✅ 绝对导入
# 或
from ..a import foo              # ✅ 相对导入
```

#### 直接运行包内部文件

```py
# a.py
from package_name.b import bar
```

```bash
python package_name/a.py  # ❌ 报错
```

因为此时 `sys.path[0] == "package_name/"` 而不是项目根目录。这是 *为什么不推荐直接运行包内文件* 的根本原因。



## `__init__.py` 文件

在 Python 中，`__init__.py` 是包（package）层面的初始化文件。它的存在和内容，直接影响：
* 一个目录是否被视为 Python 包
* 包被 import 时的行为
* 包的对外 API 设计（你希望别人“看到”什么）

注意：`__init__.py` 会在包第一次被 import 时执行一次（只执行一次）

### 最佳实践

```txt
mypkg/
├── __init__.py
├── api.py
├── models.py
├── exceptions.py
```

```py
# mypkg/__init__.py
from .api import foo, bar
from .exceptions import MyPkgError

__all__ = ["foo", "bar", "MyPkgError"]
__version__ = "0.1.0"
```

### 常见用途

#### 作为「包的入口API」

> 相当于 JS 的 index.js 文件

在 `__init__.py` 中 re-export (重新导出) 子模块中的对象。这是 最重要、最常见 的用法。


```py
# 
from mypkg.a import foo
from mypkg.b import bar

# __init__.py 重新导出后
from mypkg import foo, bar
```

```py
# mypkg/__init__.py
from .a import foo
from .b import bar
```

#### 控制 `from mypkg import *` 行为

公共库强烈建议写 `__all__`。

没有 `__all__` 时：
* 行为不稳定
* 不同工具 / 版本表现可能不同

```py
# mypkg/__init__.py
__all__ = ["foo", "bar"]  # 控制 `from mypkg import *` 的内容

from .a import foo
from .b import bar
from .c import secret
```

```py
from mypkg import *
# 只会导入 foo, bar
```

#### 包级初始化逻辑

例如：
* 日志初始化
* 环境变量检查
* 全局配置加载
* 注册插件

注意：不要在这里写重逻辑（IO / 网络 / 数据库）

```py
# mypkg/__init__.py
import logging

logger = logging.getLogger("mypkg")
logger.setLevel(logging.INFO)
```

#### 定义包级变量 & 常量

这是非常标准的做法（大量库都这么干）

```py
# mypkg/__init__.py
__version__ = "1.2.3"
DEFAULT_TIMEOUT = 10
```


## `__main__.py` 文件

`__main__.py` 是 Python 包*约定*的“可执行入口文件”（另一个 JS 的 index.js）。有了 `__main__.py`，一个包就可以像脚本一样被 `python -m 包名` 直接运行。可以把 `__main__.py` 看成是「包级别 `if __name__ == "__main__"`」

运行 `python -m mypackage` 时，不先执行 `mypackage/__init__.py`，然后再执行 `mypackage/__main__.py`。



## Namespace packages

### 原理

PEP 420（Python 3.3）引入了 隐式命名空间包（Implicit Namespace Package）。一个没有 `__init__.py` 的目录，只要在 `sys.path` 上，就可以被当成包导入。

### 命名空间拆分

这是 PEP420 的正统用法。

假设你有一个公司级命名空间：mycompany

你希望：
* mycompany-auth 负责认证
* mycompany-billing 负责计费
* mycompany-logging 负责日志

并且它们：
* 独立开发
* 独立发布
* 独立 pip install

Python 3.2 以前做不到，因为

```txt
mycompany/
 ├── __init__.py    ← 只能有一个，但三个包都带一份，用谁的？
 ├── auth/
 └── billing/
```

Python 3.3 之后

```txt
site-packages/
 └── mycompany/
     └── auth/
         └── login.py
```

```txt
site-packages/
 └── mycompany/
     └── billing/
         └── invoice.py
```

pip install 之后的真实状态（这个目录不是某一个包的产物，而是 *多个分发包拼出来的*）

```
site-packages/
 └── mycompany/
     ├── auth/
     │   └── login.py
     ├── billing/
     │   └── invoice.py
     └── logging/
         └── config.py
```

关键特征

```py
mycompany.__file__   # ❌ AttributeError
mycompany.__path__   # ✅ 一个路径列表

list(mycompany.__path__)
# [
#   '/site-packages/mycompany'   ← 来自 auth
#   '/site-packages/mycompany'   ← 来自 billing
#   '/site-packages/mycompany'   ← 来自 logging
# ]
```

最终用户使用

```py
from mycompany.auth.login import login
from mycompany.billing.invoice import create_invoice
from mycompany.logging.config import setup_logging
```

### 实战建议

> 顶层包写 `__init__.py`，叶子包省略，除非需要用到包级 API / 初始化






















