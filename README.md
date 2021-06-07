# Patterns

Library of code patterns that can be copied into a project

## How to use

Clone/download the files, or use one of the following snippets for *pwsh* or *bash*

**[PowerShell](https://github.com/PowerShell/PowerShell#get-powershell)** ( windows | linux | darwin )
 ```powershell
 $pattern = Read-Host "Pattern"; `
 (New-Object Net.WebClient).DownloadFile("https://github.com/liifi/patterns/archive/refs/heads/main.zip", "$(pwd)/patterns.zip"); `
 Expand-Archive -Force patterns.zip -DestinationPath .; `
 Copy-Item -Recurse -Force ./patterns*/patterns/$pattern/* .; `
 Remove-Item -Recurse ./patterns*
 ```
**bash** ( windows | linux | darwin )
 ```bash
 echo -n "Pattern: "; read pattern; \
 curl -Lo patterns.tar.gz https://github.com/liifi/patterns/archive/refs/heads/main.tar.gz; \
 tar -xzf patterns.tar.gz -C .; \
 cp -Rf ./patterns*/patterns/$pattern/* .; \
 rm -Rf ./patterns*
 ```




## List of patterns

| name | description |
|-|-|
| [terraform_module_deno](./terraform_module_deno) | Use [deno](http://deno.land/) to `create`, `read`, `update`, `delete` a resource.