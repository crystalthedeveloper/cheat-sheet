# VS Code Remote SSH for Bitnami WordPress

Keep SSH hosts and key paths private. Replace `<LIGHTSAIL_IP>` and `<PEM_PATH>` with your actual values.

## Configure SSH Config

1. Open the Command Palette (`Cmd + Shift + P`).
2. Choose `Remote-SSH: Open SSH Configuration File...`.
3. Append a host block:

```
Host Beats-WordPress-AWS
    HostName <LIGHTSAIL_IP>
    User bitnami
    IdentityFile <PEM_PATH>
```

## Connect

1. Command Palette → `Remote-SSH: Connect to Host...`.
2. Select `Beats-WordPress-AWS`.
3. VS Code opens a new remote window once the tunnel is ready.

## Open the Project

- When prompted, open folder: `/opt/bitnami/wordpress`.
- For plugin work, drill down to `/opt/bitnami/wordpress/wp-content/plugins`.

Tip: install the “Remote - SSH” extension if it is not already enabled. Keep PEM permissions strict (`chmod 600`) so SSH accepts the key.
