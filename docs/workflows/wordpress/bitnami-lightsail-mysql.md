# Bitnami / Lightsail MySQL Access Guide

Use this walkthrough to grab WordPress database credentials, connect with MySQL via the terminal, and run the most common checks while you are SSH’d into a Bitnami/Lightsail instance.

## Before You Start

- **SSH into the instance** first: `ssh -i /path/to/key.pem bitnami@YOUR_SERVER_IP`.
- Confirm services are up (optional but helpful): `sudo /opt/bitnami/ctlscript.sh status`.
- Every command below is run directly on the Lightsail VM once you are connected.

## Step 1 — Get the WordPress DB username

Run:

```
grep DB_USER /opt/bitnami/wordpress/wp-config.php
```

You will see something like:

```
define( 'DB_USER', 'bn_wordpress' );
```

Copy that username.

## Step 2 — Log into MySQL as that user

Use:

```
mysql -u bn_wordpress -p
```

When asked for the password, paste the `DB_PASSWORD` from `wp-config.php`. Example:

```
9206f5ca0268ec5276ce1a371e9d7929ba72121cfd0034113c2436c7d87c2dfc
```

If the `DB_USER` is not `bn_wordpress`, check the root password:

```
cat /home/bitnami/bitnami_credentials
```

Then log in as root:

```
mysql -u root -p
```

> Tip: Add `-h 127.0.0.1` if MySQL complains about the socket path.

## Step 3 — Select your WordPress database

Run:

```
USE bitnami_wordpress;
```

If unsure, list databases:

```
SHOW DATABASES;
```

To verify you are in the right place:

```
SHOW TABLES LIKE 'wp_%';
```

## Step 4 — View active plugins

Run:

```
SELECT option_value FROM wp_options WHERE option_name='active_plugins';
```

Copy the output for auditing or support requests.

## MySQL Terminal Cheatsheet

- Exit MySQL: `exit;`
- View a table: `SELECT * FROM wp_options LIMIT 5;`
- Describe columns: `DESCRIBE wp_posts;`
- Search for a keyword: `SELECT ID, post_title FROM wp_posts WHERE post_title LIKE '%Landing%';`
- Export a quick backup (from terminal, not inside MySQL):

  ```
  mysqldump -u bn_wordpress -p bitnami_wordpress > ~/bitnami_wordpress.sql
  ```

  Restore with:

  ```
  mysql -u bn_wordpress -p bitnami_wordpress < ~/bitnami_wordpress.sql
  ```

## Useful checks

- Check DB user:

```
grep DB_USER /opt/bitnami/wordpress/wp-config.php
```

- Check root password:

```
cat /home/bitnami/bitnami_credentials
```

- Confirm available disk space before big dumps/uploads:

```
df -h
```
