# Quick Start


## Project Setup

Virtual environments in Python are isolated environments that allow you to manage project-specific dependencies. They help prevent conflicts between different projects' requirements and ensure reproducibility. Here's how to set up and use a virtual environment for this project:

### `uv`

https://docs.astral.sh/uv/guides/projects/#creating-a-new-project

You can create a new Python project using the `uv init` command:

```bash
$ uv init hello-world
$ cd hello-world

# or initialize a project in the working directory
$ mkdir hello-world
$ cd hello-world
$ uv init
```

uv will create the following files

```
.gitignore
.python-version
README.md
main.py
pyproject.toml
```

The main.py file contains a simple "Hello world" program. Try it out with uv run:

```bash
$ uv run main.py
```

A project consists of a few important parts that work together and allow uv to manage your project. In addition to the files created by uv init, uv will create a virtual environment and uv.lock file in the root of your project the first time you run a project command, i.e., uv run, uv sync, or uv lock.

```
├── .venv
│   ├── bin
│   ├── lib
│   └── pyvenv.cfg
├── .python-version
├── README.md
├── main.py
├── pyproject.toml
└── uv.lock
```

The `pyproject.toml` contains metadata about your project:

```tmol
[project]
name = "hello-world"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
dependencies = []
```

The `.python-version` file contains the project's default Python version. 

The `.venv` folder contains your project's virtual environment, a Python environment that is isolated from the rest of your system. This is where uv will install your project's dependencies.

`uv.lock` is a cross-platform lockfile that contains exact information about your project's dependencies. Unlike the pyproject.toml which is used to specify the broad requirements of your project, the lockfile contains the exact resolved versions that are installed in the project environment.


### Setting up a Virtual Environment

```bash
# 1. Navigate to the project directory:
$ cd python-demo

# 2. Create a virtual environment:
$ python3 -m venv .venv  # The last '.venv' is your virtual environment name

# 3. Activate the virtual environment:
$ source .venv/bin/activate
```

### VSCode Configuration

VSCode will automatically detect your Python virtual environment. Add this to your `.vscode/settings.json`:

```json
{ "python.defaultInterpreterPath": "./.venv/bin/python" }
```

### Installing Dependencies

If you have a `requirements.txt` file:

```bash
$ pip install -r requirements.txt
```

If you don't have a `requirements.txt` file:

```bash
# 1. Install packages manually:
$ pip install flask, requests

# 2. Create a `requirements.txt` file:
$ pip freeze > requirements
```

### Git

add `.gitignore` file to ignore the `.venv` folder

```bash
$ echo ".venv/" >> .gitignore
```


## Flask

https://flask.palletsprojects.com/en/3.0.x/quickstart/
