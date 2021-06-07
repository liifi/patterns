import { SCRIPTS_DIR, SCRIPTS_DIR_RELATIVE, $, _$, $$, dir_files, command_in_path } from './_helpers.js';

if(!await command_in_path('terraform'))
  throw new Error(`Missing terraform. Run ${SCRIPTS_DIR_RELATIVE}/task deps`)

await $(`terraform apply`,true);
console.log('-----------')
const targets = JSON.parse(await $$(`terraform output -json main`));
console.log(targets);
  