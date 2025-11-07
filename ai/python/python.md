# Python 资源索引

文档
* https://docs.python.org/3/

库

* [uv](https://github.com/astral-sh/uv) A single tool to replace `pip`, `pip-tools`, `pipx`, `poetry`, `pyenv`, `twine`, `virtualenv`, and more.
* Requests 一个 HTTP 客户端库  
* BeautifulSoup 一个 HTML 解析器  
* Django is a full-featured framework suitable for large-scale applications
* Flask is a lightweight and flexible framework for smaller projects
* FastAPI is a high-performance framework designed specifically for building APIs.

* NumPy 数值计算  
* SciPy 用于数学、科学和工程的软件包集合  



## `uv` cheatsheet

Creating projects

* `uv init` initialize a project in the current directory
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

Python management
* `uv python list` list existing & available Python installations
* `uv python install 3.14` install Python 3.14 on your system

For old timers 适用老Python开发人员
* `uv venv path/to/.venv` create a virtual environment at path/to/.venv
* `uv pip ...` use pip's interface with uv's speed

Tools （全局安装）
* `uvx ruff` or `uv run tool ruff` run a cli tool like Ruff

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












