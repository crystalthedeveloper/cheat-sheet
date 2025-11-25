# phpMyAdmin Tunnel for Bitnami

Use SSH port forwarding to avoid exposing phpMyAdmin publicly. Replace `<PATH_TO_PEM>` and `<LIGHTSAIL_IP>` with your actual values.

## Open the Tunnel

```bash
ssh -i <PATH_TO_PEM> -N -L 8888:127.0.0.1:80 bitnami@<LIGHTSAIL_IP>
```

- `-N` prevents executing remote commands (just forwards ports).
- `-L 8888:127.0.0.1:80` maps your local `8888` to the remote HTTP port.

Keep this terminal open; `Ctrl+C` closes the tunnel.

## Launch phpMyAdmin

Browse to:

```
http://127.0.0.1:8888/phpmyadmin
```

Login credentials are whatever you set for WordPress/Bitnami—store them in a password manager, not inside the repo.
