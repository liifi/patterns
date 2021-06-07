# Patterns

Library of code patterns that can be copied into a project

## How to use

Clone/download the files, or use one of the following snippets for `pwsh` or `bash`

**bash** ( [windows](https://github.com/git-for-windows/git/releases) | linux | darwin )
 ```bash
 echo -n "Pattern: "; read pattern; \
 curl -Lo patterns.tar.gz https://github.com/liifi/patterns/archive/refs/heads/main.tar.gz; \
 tar -xzf patterns.tar.gz -C .; \
 cp -Rf ./patterns*/patterns/$pattern/* .; \
 rm -Rf ./patterns*
 ```

**[PowerShell](https://github.com/PowerShell/PowerShell#get-powershell)** ( windows | linux | darwin )
 ```powershell
 $pattern = Read-Host "Pattern"; `
 (New-Object Net.WebClient).DownloadFile("https://github.com/liifi/patterns/archive/refs/heads/main.zip", "$(pwd)/patterns.zip"); `
 Expand-Archive -Force patterns.zip -DestinationPath .; `
 Copy-Item -Recurse -Force ./patterns*/patterns/$pattern/* .; `
 Remove-Item -Recurse ./patterns*
 ```



## List of patterns

| name | description |
|-|-|
| [git_scripts](./patterns/git_scripts) | If you have to use `bash` for all git scripts, add exec flag, also provide consistent call from *nix AND windows *(cmd/pwsh)* like `./scripts/build`, `./scripts/etc` |
| [git_scripts_deno](./patterns/git_scripts_deno) | Scripting in a shell language can be painful, use something very portable like [deno](https://deno.land/) instead, add exec flag, also provide consistent call from *nix AND windows *(cmd/pwsh)* like `./scripts/build`, `./scripts/etc` |
| [terraform_module_deno](./patterns/terraform_module_deno) | Use [deno](http://deno.land/) to `create`, `read`, `update`, `delete` a resource. |
| [terraform_project_deno](./patterns/terraform_project_deno) | Use [deno](http://deno.land/) to `create`, `read`, `update`, `delete` a resource, and for **pre** and **post** actions. |