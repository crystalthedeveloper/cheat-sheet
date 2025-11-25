# Django Database Backends

Reference snippets for switching Django projects between SQLite, MySQL, and PostgreSQL along with the packages you typically need installed in a Pipenv-managed environment.

## Client Packages

- `pipenv install mysqlclient`
- `pip3 install mysqlclient`
- `pip3 install pymysql`
- `pipenv install psycopg2-binary==2.10.0`

## Configuration Snippets

### SQLite (default)

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

### MySQL

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "mydatabase",
        "USER": "mydatabaseuser",
        "PASSWORD": "mypassword",
        "HOST": "127.0.0.1",
        "PORT": "3306",
        "OPTIONS": {"init_command": "SET sql_mode='STRICT_TRANS_TABLES'"},
    }
}
```

### PostgreSQL

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "mydatabase",
        "USER": "mydatabaseuser",
        "PASSWORD": "mypassword",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
```
