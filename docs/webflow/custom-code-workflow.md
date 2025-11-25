# Webflow Custom Code Workflow

1. Initialize npm in your local project folder:
   ```bash
   npm init
   npm i parcel
   ```
2. Update `package.json` to expose a local dev server:
   ```json
   {
     "scripts": {
       "start": "parcel app.js",
       "test": "echo \"Error: no test specified\" && exit 1"
     }
   }
   ```
3. Load your local bundle in Webflow while iterating:
   ```html
   <script src="http://localhost:1234/app.js"></script>
   ```
4. Publish a release to GitHub and serve via jsDelivr:
   ```html
   <script defer src="https://cdn.jsdelivr.net/gh/crystalthedeveloper/first-step@1/dist/app.js"></script>
   ```

Helpful links:

- https://www.jsdelivr.com/?docs=gh
- https://www.clcreative.co/blog/how-to-connect-webflow-vscode-and-github-for-a-better-custom-code-workflow
