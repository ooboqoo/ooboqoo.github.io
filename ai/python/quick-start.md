# Quick Start



## `uv` = `pip` + `virtualenv`

`uv` is a modern, fast alternative to both `pip` and `virtualenv`, built in Rust.

It replaces:
* pip → for installing packages
* virtualenv → for creating isolated environments

It also adds:
* Much better performance (often 5x–10x faster)
* Modern features like lockfile syncing
* Compatibility with existing pip workflows

Traditional Workflow (virtualenv + pip)

```bash
# 1. Create a virtual environment
python3 -m venv .venv  # The last '.venv' is your virtual environment name
# 2. Activate the environment (Linux/macOS)
source .venv/bin/activate
# 3. Install packages
pip install flask requests
# 4. Freeze dependencies
pip freeze > requirements.txt
# 5. Reinstall later
pip install -r requirements.txt
```

Modern Workflow (uv)

```bash
# 1. Create and activate a virtual environment
uv venv
# 2. Install packages (just like pip)
uv pip install flask requests
# 3. Export dependencies (optional, for locking)
uv pip freeze > requirements.txt
# 4. Reinstall later
uv pip install -r requirements.txt
```


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

```txt
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

```txt
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


### VSCode Configuration

VSCode will automatically detect your Python virtual environment. Add this to your `.vscode/settings.json`:

```json
{ "python.defaultInterpreterPath": "./.venv/bin/python" }
```


## Python’s TypeScript-equivalent: Type Hints + Static Type Checking

* TypeScript adds static typing to JavaScript.
* Type hints + mypy (or Pyright) add static typing to Python.

Python’s equivalent system is type hints, introduced officially in PEP 484 (Python 3.5+).
It’s not a new language — it’s regular Python enhanced with optional static typing.

```py
def greet(name: str) -> str:
    return f"Hello, {name}"

greet(123) # error: Argument 1 to "greet" has incompatible type "int"; expected "str"
```

### Static Typing

https://docs.python.org/3.14/library/typing.html  
https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html

Modern Python typing is surprisingly expressive — supporting:

* TypedDict (like TS object types)
* Literal types
* Protocol (similar to TypeScript’s interface)
* Generic and TypeVar
* Final, Annotated, and even Self (Python 3.11+)

```py
from typing import Protocol, TypeVar, Generic

class SupportsSpeak(Protocol):
    def speak(self) -> str: ...

T = TypeVar('T', bound=SupportsSpeak)

def echo(animal: T) -> str:
    return animal.speak()
```

That’s Python typing getting very close to TypeScript’s expressive power.

### Tools & Configs

| Tool    | Purpose                         | Similar to in TS world |
|---------|---------------------------------|----------------------------|
| mypy    | Official static type checker | TypeScript compiler (tsc)
| Pyright | Fast static checker from Microsoft (used in VSCode) | TypeScript compiler
| Pylance | VSCode extension based on Pyright | TS language service

VSCode Configuration

```json
{
    "python.languageServer": "Pylance",
    "cursorpyright.analysis.typeCheckingMode": "strict"  // search for "type checking mode"
}
```




