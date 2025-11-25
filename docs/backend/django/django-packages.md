# Django Package Cheatsheet

Frequently installed libraries for API work, formatting, and debugging.

## Core Add-ons

```bash
pip install djangorestframework
pip install djangorestframework-xml
pipenv install djangorestframework-csv
pip install markdown
pip install django-filter
pip install django-cors-headers
pipenv install django-debug-toolbar
pip install Pillow
```

- `djangorestframework` (and XML/CSV add-ons) – API serialization.
- `markdown` – enables browsable API Markdown rendering.
- `django-filter` – query parameter filtering.
- `django-cors-headers` – allow API requests from Next.js/Webflow etc.
- `django-debug-toolbar` – in-browser debug UI.
- `Pillow` – image processing support for `ImageField`.
