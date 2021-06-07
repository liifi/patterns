import { $, $$, _$ } from './_helpers.js'

import {action} from '../../provisioners/provisioners.ts';
import {parse} from "https://deno.land/std/flags/mod.ts";

// debugger; // deno run -A --inspect-brk ./scripts/task provision --provisioner example --action create
const args = parse(Deno.args);
if(!args.action?.match(/create|read|update|delete/))
    throw new Error('You must provide --action <create|read|update|delete>')
Deno.env.set('values',JSON.stringify({...args}))
console.log(Deno.env.get('values'))
await action(args.action);

