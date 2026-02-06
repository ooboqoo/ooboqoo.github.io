# 项目配置


## Pyright

https://microsoft.github.io/pyright/#/

在 VS Code 里通过 Pylance 扩展来使用 Pyright。

pyrightconfig.json

```json
{
  "reportMissingTypeStubs": false
}
```







## PyInstaller

学习路径：原理 -> 常用 -> 实战 -> 深坑

### `sys._MEIPASS`

当 Python 程序被 PyInstaller 打成 `--onefile`（或涉及 bundle 资源）时，运行时会把内置的资源文件（图片、配置、模板等）解压到一个临时目录，`sys._MEIPASS` 就指向这个目录。代码用它来在“打包环境”下正确定位资源文件。

注意：直接 `python xxx.py` 运行时没有 `sys._MEIPASS`，所以一般会用 `getattr(sys, "_MEIPASS", None)` 之类的写法避免 AttributeError。

```py
import sys
from pathlib import Path

if getattr(sys, "frozen", False):
    base_dir = Path(sys._MEIPASS)
else:
    base_dir = Path(__file__).parent
```

### PyInstaller 本质

PyInstaller = 分析依赖 + 打包 Python 解释器 + 生成可执行程序。

PyInstaller *不是编译器*，打包后仍然是 Python 在跑。

1. 静态分析 import
  * 扫描 `import xxx`
  * 但 对动态 import 不敏感
2. 收集依赖
  * .py / .pyc
  * C 扩展 (.pyd / .so)**
  * 第三方库的 data files
3. 生成可执行程序
  * Windows: exe
  * macOS：app / binary
  * Linux: ELF

### .spec 文件

https://pyinstaller.org/en/stable/spec-files.html

```py
a = Analysis(
    ['main.py'],
    pathex=[],         # 模块搜索路径
    hiddenimports=[],  # 动态 import
    datas=[],          # 非代码资源
    binaries=[],       # .dll / .so
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    name='main',
)
```

### 常见坑

https://pyinstaller.org/en/stable/common-issues-and-pitfalls.html


#### 动态 import 找不到模块

❌ 现象：`ModuleNotFoundError`

✅ 解决：`hiddenimports=['pkg.subpkg']`

#### 数据文件丢失（配置 / 模板 / 静态资源）

❌ 打包后路径不存在  
❌ FileNotFoundError

✅ 正确方式：`datas=[('config.yaml', '.')]`

#### C 扩展 / DLL 缺失

常见于：`numpy` `cryptography` `torch` `opencv`

解决思路：spec 中添加 `collect_dynamic_libs`

#### 启动慢（onefile 的代价）

原因：
* onefile 会 先解压到临时目录

解决方案：
* 内部工具：用 onedir
* 用户工具：接受现实 😅















