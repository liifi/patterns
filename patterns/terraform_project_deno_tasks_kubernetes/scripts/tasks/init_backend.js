import { SCRIPTS_DIR, SCRIPTS_DIR_RELATIVE, $, _$, dir_files, command_in_path, file_exists } from './_helpers.js';

if(!await command_in_path('terraform'))
  throw new Error(`Missing terraform. Run ${SCRIPTS_DIR_RELATIVE}/task deps`)

if(!await command_in_path('kubectl'))
  throw new Error(`Missing kubectl. Run ${SCRIPTS_DIR_RELATIVE}/task deps`)

const kubeconfig_path = `backend_kubeconfig.yaml`; // Terraform always applies relative anyways?
Deno.env.set('KUBECONFIG',kubeconfig_path);
if(!await file_exists(kubeconfig_path)){
  console.log(`Missing ${kubeconfig_path}`)
  const serviceaccount = "vault"
  const cluster = "vault"
  const context = "vault"
  const server = Deno.env.get('TFSTATE_SERVER') ?? prompt("Kubernetes API:")
  const token = Deno.env.get('TFSTATE_TOKEN') ?? prompt("Token:")
  const namespace = Deno.env.get('TFSTATE_NAMESPACE') ?? prompt("Namespace:")
  if(!server || !token || !namespace){
    throw new Error(`You must provide all values, or create a ${kubeconfig_path} manually`)
  }
  await _$(`kubectl config set-credentials ${serviceaccount} --token=${token}`)
  // ca_crt="$(mktemp)"; echo "$ca_crt_data" > $ca_crt
  await _$(`kubectl config set-cluster ${cluster} --server=${server}`) // --certificate-authority="${ca_crt}" --embed-certs
  await _$(`kubectl config set-context ${context} --cluster=${cluster} --namespace=${namespace} --user=${serviceaccount}`)
  await _$(`kubectl config use-context ${context}`)
  console.log(`Created: ${kubeconfig_path}`)
} else {
  console.log(`Ready: ${kubeconfig_path}`)
}