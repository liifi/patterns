#!/usr/bin/env -S deno run -A

import { SCRIPTS_DIR, $, _$, dir_files } from './_helpers.js';

console.log(`Scripts dir: ${SCRIPTS_DIR}`)

const tell_me = prompt('Tell me something:')
console.log(`You told me: ${tell_me}`)
// await $(`which echo`)
await $(`echo Echoing what you told me: ${tell_me}`)

console.log('If you ran "./scripts/task deps" these versions should match')
await $(`terraform version`)
await $(`kubectl version`)