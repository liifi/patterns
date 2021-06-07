Scripting in a shell language can be painful, use something very portable like [deno](https://deno.land/) instead, and a task pattern with cross platform binary download, git add exec flag, also provide consistent call from *nix AND windows *(cmd/pwsh)* like `./scripts/task deps`, `./scripts/task build`

### Based on patterns
- [git_scripts_deno](../git_scripts_deno)

### Requirements
- [(windows)](https://github.com/git-for-windows/git/releases) git-bash 

### Notes

- Run `./scripts/_init` to ensure `deno` is downloaded (single binary exec)
- Run `./scripts/_scripts` to add git exec flag to scripts and their equivalent `.cmd` file (in this pattern usually not needed)
- Run `./scripts/task` to se available tasks in the `./scripts/tasks` directory. Add more `.js` or `.ts` files to add more tasks
- Run `./scripts/task deps` to ensure binaries are downloaded. Modify [./scripts/tasks/deps.js](./scripts/tasks/deps.js) as needed. This is optional, but helpful to users that don't have a good/consistent package manager windows/nix for simple binaries and avoids yet another tool besides the generic `deno` and `git`

> **IMPORTANT** `./scripts/_scripts` will also generate a `_bash.cmd`, do not commit it (make sure its in your `.gitignore`), all other `*.cmd` should be committed. The `.cmd` files allow windows to automatically open bash for a script. 
