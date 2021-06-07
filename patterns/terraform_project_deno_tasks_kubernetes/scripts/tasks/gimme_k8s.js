import { SCRIPTS_DIR, SCRIPTS_DIR_RELATIVE, $, _$, $$, dir_files, command_in_path } from './_helpers.js';

if(!await command_in_path('k3d'))
  throw new Error(`Missing k3d. Run ${SCRIPTS_DIR_RELATIVE}/task deps`)

if(!await command_in_path('kubectl'))
  throw new Error(`Missing kubectl. Run ${SCRIPTS_DIR_RELATIVE}/task deps`)

if(!await command_in_path('docker'))
  throw new Error(`Missing docker. Get it from here https://docs.docker.com/desktop/#download-and-install`)

const kubeconfig = `${SCRIPTS_DIR_RELATIVE}/../backend_kubeconfig.yaml`;
Deno.env.set('KUBECONFIG',kubeconfig)

const stack = (await Deno.readTextFile(`${SCRIPTS_DIR_RELATIVE}/../settings/properties.csv`)).split("\n").find(it=>it.match(/^stack\,/)).split(',').pop()
const cluster_name = 'meditate'
await $(`k3d cluster delete ${cluster_name}`,true)
await $(`k3d cluster create ${cluster_name}`,true)

// console.log('Cluster created, it will take a few seconds to boot...')
console.log('Cluster created, giving it a few seconds to boot...')
await new Promise((resolve,reject)=>{setTimeout(resolve,15*1000)})
await $(`kubectl create namespace ${stack}--vault--local`) // local because not in ci with TFSTATE_ENVIRONMENT
await $(`kubectl create namespace target`)
await $(`kubectl config set-context --current --namespace target`) // give a default namespace because not in ci with ENVIRONMENT

// k3d already does it based on environment KUBECONFIG
// console.log(`Getting cluster kubeconfig and writting to "${kubeconfig}"`)
// const kubeconfig_content = await $$(`k3d kubeconfig get ${cluster_name}`)
// Deno.writeTextFile(kubeconfig,kubeconfig_content);

console.log('✔️  Done')
console.log(`Now try: ${SCRIPTS_DIR_RELATIVE}/task init`)