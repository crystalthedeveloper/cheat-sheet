# WordPress Theme Upload via FileZilla

Keep SSH keys and static IPs outside of version control. Replace `<LIGHTSAIL_IP>` and `<PATH_TO_PEM>` with your own values before connecting.

## SFTP Connection Settings

- Host: `<LIGHTSAIL_IP>`
- Protocol: SFTP
- Port: `22`
- User: `bitnami`
- Key file: `<PATH_TO_PEM>`

## Theme Paths

- Themes root: `/bitnami/wordpress/wp-content/themes`
- Project theme: `/bitnami/wordpress/wp-content/themes/cltd-theme-oct-2025`

## Upload Checklist

1. Connect with the SFTP settings above.
2. Navigate to `/wp-content/themes/cltd-theme-oct-2025`.
3. Upload theme files (`style.css`, template PHP, assets).
4. Re-upload after permission fixes or a server restart if FileZilla shows “permission denied.”
