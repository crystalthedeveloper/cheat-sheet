# Git Commands

```bash
git clone https://github.com/crystalthedeveloper/3Dportfolio.git
cd 3Dportfolio
git status
git add --all      # stage everything
git add .          # stage tracked changes
git commit -m "Initial commit"
git push -u origin main
git push           # subsequent pushes

# delete remote tags
git push origin :refs/tags/v0.92.0 :refs/tags/v0.91.0 :refs/tags/v0.90.0
# delete same tags locally
git tag -d v0.92.0 v0.91.0 v0.90.0
```
