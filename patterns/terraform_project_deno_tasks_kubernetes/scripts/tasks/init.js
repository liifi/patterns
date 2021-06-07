import { SCRIPTS_DIR, SCRIPTS_DIR_RELATIVE, $, _$, $$, dir_files, command_in_path } from './_helpers.js';
import './init_backend.js';

const STACK = (await Deno.readTextFile(`./settings/properties.csv`)).split("\n").find(it=>it.match(/^stack\,/)).split(',').pop()
const ENVIRONMENT = Deno.env.get('TFSTATE_ENVIRONMENT') ?? 'local'
const STATE_SUFFIX = ENVIRONMENT == 'local' ? Deno.env.get('USERNAME') : 'main'
const STATE_NAMEPSACE = `${STACK}--vault--${ENVIRONMENT}`
const WORKSPACE_NAMESPACE = await $$(`kubectl config view --minify --output jsonpath={..namespace}`) // From the file so local dev doesn't need to set env vars
if(!WORKSPACE_NAMESPACE)
    throw new Error(`Missing target namespace on kubeconfig current context\n${await $$(`kubectl config view`)}`)

console.log("==========================")
console.log(`Initializing. First running kubernetes checks using "${Deno.env.get('KUBECONFIG')}"...`)

console.log("==========================")
try { await $(`kubectl get namespace ${STATE_NAMEPSACE}`) }
catch { await $(`kubectl create namespace ${STATE_NAMEPSACE}`) } // Mostly for local devs

console.log("==========================")
await $(`terraform init -input=${!Deno.env.get('TF_IN_AUTOMATION')} -backend-config=secret_suffix=${STATE_SUFFIX} -backend-config=namespace=${STATE_NAMEPSACE}`,true) // Required before terraform workspace
// await $(`terraform init -backend-config=secret_suffix=${STATE_SUFFIX} -backend-config=namespace=${STATE_NAMEPSACE}`,true)
// State file will be named: tf-{workspace}-{suffix}

console.log("==========================")
try { await $(`terraform workspace new ${WORKSPACE_NAMESPACE}`) }
catch { await $(`terraform workspace select ${WORKSPACE_NAMESPACE}`) }

console.log("==========================")
await $(`terraform workspace show`)