# Django + MySQL Notes

## Install & Connect

```bash
pipenv install mysqlclient
pip3 install mysqlclient
pip3 install pymysql
brew install mysql
brew install mysql pkg-config
/usr/local/mysql/bin/mysql -u root -p
```

## SQL Basics

```sql
CREATE DATABASE mydbs;
SHOW DATABASES;
USE mydbs;
SHOW TABLES;
DESCRIBE myapp_booking;
```

## User & Permissions

```sql
CREATE USER 'admindjango'@'localhost' IDENTIFIED BY '<password>';
GRANT ALL ON *.* TO 'admindjango'@'localhost';
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost'
  IDENTIFIED WITH mysql_native_password BY '<password>';
SELECT User, Host FROM mysql.user
  WHERE User='root' AND Host='localhost';
ALTER USER 'root'@'localhost' IDENTIFIED BY '<new_password>';
```

Exit with `\q`.
