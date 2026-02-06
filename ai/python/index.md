# Python 资源索引

* 文档 https://docs.python.org/3/
* 官方第三方包仓库 https://pypi.org/ 相当于 JS 的 https://www.npmjs.com/


## 常用库

工程

* [uv](https://github.com/astral-sh/uv) A single tool to replace `pip`, `pip-tools`, `pipx`, `poetry`, `pyenv`, `twine`, `virtualenv`, and more.

HTTP 请求

* urllib -  优点 标准库，不需要额外安装；缺点 API 相对繁琐；适用场景 简单应用，或不想引入外部依赖时
* *requests* - API 简单易用，社区支持强大；缺点：不支持异步。适用场景：对性能要求不是非常高的同步程序
* *httpx* - requests 的现代替代品。同时支持同步和异步 API，支持 HTTP2。适用场景：需要同时使用同步和异步的场景。
* aiohttp - 支持异步，适合高并发场景；缺点：API 相对复杂。适用场景：需要处理大量并发连接的应用。

JSON 编解码

* json - 标准库
* ujson - 第三方库，json 模块的高性能替代品

HTML 解析

* BeautifulSoup - 功能全面，出初学者友好，适合广泛的解析任务，但性能相对较慢
* parsel - 更轻量快速，专注于 CSS 选择器和 XPath，与 Scapy 框架紧密集成，适合高性能爬虫项目，但学习曲线陡峭

Web 框架

* Django is a full-featured framework suitable for large-scale applications
* Flask is a lightweight and flexible framework for smaller projects
* FastAPI is a high-performance framework designed specifically for building APIs.

科学计算

* NumPy 数值计算  
* SciPy 用于数学、科学和工程的软件包集合  

图形界面

* 




## `uv` cheatsheet

Creating projects

* `uv init` initialize a project in the current directory
* `uv init --package` 创建 packaged application，代码会放到 `src` 目录下
* `uv init proj_name` initialize a project \<proj_name\> in the directory \<proj_name\>

Project dependencies

* `uv add requests fastapi` add dependencies
* `uv add -dev pytest` add dev dependencies
* `uv remove requests fastapi` remove dependencies
* `uv run pytest` run the pytest that's installed in your project
* `uv lock --upgrade` upgrade the dependencies' versions
* `uv tree` see depenency tree
* `uv sync` 拉取项目代码后根据配置文件 pyproject.toml 恢复开发环境：设置虚拟环境并安装好依赖

有了 _pyproject.toml_ 文件后（vs JS 项目的 package.json 文件），原先惯用的 _requirements.txt_ 文件就不再需要了。
* `uv add -r requirements.txt` add dependencies from the given file
* `uv export > requirements.txt` 

Working with scripts

* `uv run myscript.py` run myscript.py in an isolated environment
* `uv run -m my_package`

Python management
* `uv python list` list existing & available Python installations
* `uv python install 3.14` install Python 3.14 on your system

For old timers 适用老Python开发人员
* `uv venv path/to/.venv` create a virtual environment at path/to/.venv
* `uv pip ...` use pip's interface with uv's speed

Tools （全局安装，类似 `npm install -g`）
* `uvx ruff` or `uv run tool ruff` run a cli tool like Ruff // 实时下载并运行（不安装）
* `uv tool install ruff` 安装后，可以在命令行中直接 `ruff` 运行命令

Others
* `uv help python pin` see the help for the (sub)command `uv python pin`
* `uv self update` update uv version to latest
* `uv build` 将项目发布为 .whl 文件，就可以上传到软件仓库供他人下载使用了


## JupyterLab

```bash
# Install JupyterLab
$ uv add jupyterlab

# Launch JupyterLab
uv run jupyter alb
```












