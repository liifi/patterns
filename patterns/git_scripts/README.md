If you have to use `bash` for all git scripts, add exec flag, also provide consistent call from *nix AND windows *(cmd/pwsh)* like `./scripts/build`, `./scripts/etc`

### Requirements
- [(windows)](https://github.com/git-for-windows/git/releases) git-bash 

### Notes

- Run `./scripts/_scripts` to add git exec flag to scripts and their equivalent `.cmd` file

> **IMPORTANT** `./scripts/_scripts` will also generate a `_bash.cmd`, do not commit it (make sure its in your `.gitignore`), all other `*.cmd` should be committed. The `.cmd` files allow windows to automatically open bash for a script. 

Windows users should just use WSL or containers. Sorry [pwsh](https://github.com/PowerShell/PowerShell#get-powershell), not there in adoption and default shell.