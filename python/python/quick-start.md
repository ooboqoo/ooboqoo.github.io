# Quick Start


## Project Setup

Virtual environments in Python are isolated environments that allow you to manage project-specific dependencies. They help prevent conflicts between different projects' requirements and ensure reproducibility. Here's how to set up and use a virtual environment for this project:

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
