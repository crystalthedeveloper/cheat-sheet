# Bitnami Lightsail Server Access

All commands reference placeholders—swap `<PATH_TO_PEM>` and `<LIGHTSAIL_IP>` with your actual key path and public IP. Never commit credentials or PEM files to Git.

## SSH Into the Server

```bash
ssh -i "<PATH_TO_PEM>" bitnami@<LIGHTSAIL_IP>
```

You should see a prompt similar to:

```
bitnami@ip-xx-xx-xx-xx:~$
```

## Theme Permission Fix

Run these whenever you git pull or upload new folders so FileZilla can overwrite files:

```bash
sudo find /opt/bitnami/wordpress/wp-content/themes/cltd-theme-oct-2025 -type d -exec chmod 775 {} \;
sudo find /opt/bitnami/wordpress/wp-content/themes/cltd-theme-oct-2025 -type f -exec chmod 664 {} \;
sudo chown -R bitnami:daemon /opt/bitnami/wordpress/wp-content/themes/cltd-theme-oct-2025
```

Restart Apache if assets feel cached:

```bash
sudo /opt/bitnami/ctlscript.sh restart apache
```

## Deploy Flow

1. SSH into the server.
2. Pull changes or upload files.
3. Run the permission script above.
4. Upload via FileZilla if needed.
5. Restart Apache/cache plugins.
6. Verify on the public site.
