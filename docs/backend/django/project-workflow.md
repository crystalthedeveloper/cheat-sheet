# Django Project Workflow

Common commands from scaffolding a project to running it locally.

## Create Project & App

```bash
django-admin startproject <project>
cd <project>
python3 manage.py startapp <app>
```

## Database Migrations

```bash
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser   # optional admin account
```

## Development Server

```bash
python3 manage.py runserver
python3 manage.py runserver 9000    # specify port
sudo lsof -t -i tcp:8000 | xargs kill -9   # free stuck port on macOS
```

Keep the server running in a dedicated terminal tab so logs are easy to follow.
