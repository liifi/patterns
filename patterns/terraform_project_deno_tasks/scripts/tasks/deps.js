import { $, SCRIPTS_DIR, SCRIPTS_DIR_RELATIVE, download_executable, download_zip } from '../tasks/_helpers.js'

const version = {
  terraform: '0.15.5',
  kubectl: '1.21.0',
}

console.log(`Clearing ${SCRIPTS_DIR_RELATIVE}/bin`)
try { await $(`_bash.cmd -c "/bin/rm ${SCRIPTS_DIR_RELATIVE}/bin/*"`,true) }
catch(err){ console.error(err); console.error('Unable to clean directory, try manually with:   rm ${SCRIPTS_DIR_RELATIVE}/bin/*')}

console.log('---------------------')
console.log('Downloading terraform')
await download_zip({
  windows: `https://releases.hashicorp.com/terraform/${version.terraform}/terraform_${version.terraform}_windows_amd64.zip`,
  linux: `https://releases.hashicorp.com/terraform/${version.terraform}/terraform_${version.terraform}_linux_amd64.zip`,
  darwin: `https://releases.hashicorp.com/terraform/${version.terraform}/terraform_${version.terraform}_darwin_amd64.zip`,
}, `${SCRIPTS_DIR}/bin/terraform`)

console.log('---------------------')
console.log('Downloading kubectl')
await download_executable({
  windows: `https://dl.k8s.io/release/v${version.kubectl}/bin/windows/amd64/kubectl.exe`,
  linux: `https://dl.k8s.io/release/v${version.kubectl}/bin/linux/amd64/kubectl`,
  darwin: `https://dl.k8s.io/release/v${version.kubectl}/bin/darwin/amd64/kubectl`,
}, `${SCRIPTS_DIR}/bin/kubectl`)
