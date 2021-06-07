@echo off
set SCRIPT_DIR_WIN=%~dp0
set SCRIPT_DIR=%SCRIPT_DIR_WIN:\=/%
git-bash -c "bash_exe=$(where bash | head -n1); echo -n @\\""$bash_exe\\"" %%* > '%SCRIPT_DIR%/bash.cmd';"
@"%SCRIPT_DIR%\bash.cmd" -c "'%SCRIPT_DIR%/%~n0' %*"