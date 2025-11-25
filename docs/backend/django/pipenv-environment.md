# Pipenv Environment Setup for Django

Set up and manage your Django project's virtual environment with Pipenv. Replace `3.x` with the Python version you require (for example `3.12`).

## Create & Activate

```bash
pipenv install            # install based on Pipfile / Pipfile.lock
pipenv shell              # activate the virtual environment
pipenv install django     # add Django to Pipfile
pip install djoser        # token auth helper
```

Exit the environment with `Ctrl + D`.

## Interpreter & Python Version

```bash
python --version
which python
pipenv --python 3.x          # create env with explicit version
pipenv update --python 3.x   # upgrade env interpreter
pip install --upgrade django mysqlclient
pip install --force-reinstall mysqlclient
```

VS Code shortcut to pick the interpreter: `CTRL + SHIFT + P` → “Python: Select Interpreter”.
