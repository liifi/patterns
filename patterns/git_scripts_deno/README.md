Scripting in a shell language can be painful, use something very portable like [deno](https://deno.land/) instead, add exec flag, also provide consistent call from *nix AND windows *(cmd/pwsh)* like `./scripts/build`, `./scripts/etc`

### Based on patterns
- [git_scripts](../git_scripts)

### Requirements
- [(windows)](https://github.com/git-for-windows/git/releases) git-bash 

### Notes

- Run `./scripts/_init` to ensure `deno` is downloaded (single binary exec)
- Run `./scripts/_scripts` to add git exec flag to scripts and their equivalent `.cmd` file

> **IMPORTANT** `./scripts/_scripts` will also generate a `_bash.cmd`, do not commit it (make sure its in your `.gitignore`), all other `*.cmd` should be committed. The `.cmd` files allow windows to automatically open bash for a script. 
