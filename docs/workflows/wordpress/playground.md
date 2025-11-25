# WordPress Playground (Local Install)

Spin up a disposable WordPress environment locally with the Playground CLI. Drop any blueprint JSON files in the same directory so the auto-mount can serve them.

## Start the Playground Server

```bash
npx @wp-playground/cli server --auto-mount
```

## Load a Blueprint

Visit the server in your browser, pointing to the blueprint you want to test:

```
http://localhost:4000?blueprintUrl=http://localhost:4000/path/to/playground-beats.json
```

## Tips

- Keep the CLI window open; closing it stops the Playground VM.
- Blueprints can import plugins/themes, so this is a safe way to validate migrations before deploying.
- Pair Playground snapshots with Git commits to capture a known-good configuration.
