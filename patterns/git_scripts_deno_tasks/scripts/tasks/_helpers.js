// ===============================================================
// Basic utilities
// ===============================================================

export const is_windows = Deno.build.os == "windows";
export const SEP = is_windows ? "\\" : "/";
export const SEP_PATTERN = is_windows ? /[\\/]+/ : /\/+/;
export const PATH_SEP = is_windows ? ";" : ":";

export const TEMP_DIR = (is_windows ? Deno.env.get('TEMP') : (Deno.env.get('TMPDIR') || "/tmp")).replace(new RegExp(SEP_PATTERN,'g'),'/');
export const SCRIPTS_DIR = new URL("..", import.meta.url).pathname.slice(is_windows).replace(/\/$/,'');
export const SCRIPTS_DIR_RELATIVE = SCRIPTS_DIR.replace(Deno.cwd().replaceAll('\\','/'),'.');

// ===============================================================
// ===============================================================

Deno.env.set('PATH',`${SCRIPTS_DIR}/bin${PATH_SEP}${SCRIPTS_DIR}${PATH_SEP}${Deno.env.get('PATH')}`)
export async function download_binary(url, path, options){
  if(!url[Deno.build.os]) throw new Error(`Download not available for ${Deno.build.os}. Only for ${Object.keys(url)}`)
  const response = await fetch(url[Deno.build.os], options);
  if(response.status != 200)
    return Promise.reject(new Deno.errors.Http(`Status: ${response.status} | Status Text: '${response.statusText}'`));
  const blob = await response.blob();
  const buffer = await blob.arrayBuffer();
  const bytes = new Deno.Buffer(buffer).bytes();
  await Deno.writeFile(path, bytes, 0o755);
}
export async function download_executable(url, path, options){
  await download_binary(url, `${path}${is_windows?'.exe':''}`, options)
}
export async function download_zip(url, path, options){
  await download_binary(url, `${path}.zip`, options)
  await (
    is_windows ? $(`PowerShell -NoProfile -NoLogo Expand-Archive -Path ${path}.zip -DestinationPath ${path}/../`)
    : $(`unzip ${path}.zip -d ${path}/../`)
  )
}

// ===============================================================
// ===============================================================

const text_encoder = new TextEncoder();
const text_decoder = new TextDecoder();
export const decode_text = text_decoder.decode.bind(text_decoder);
export const encode_text = text_encoder.encode.bind(text_encoder);

export function splitArgs(str){
  if(Array.isArray(str)) return str; // Pasthrough call
  else if(!str) return []; // Ensure value
  return str.match(/(?:[^\s"]+|"[^"]*")+/g)?.map(it=>it.replace(/(^"|"$)/g,'')) || [];
}

export async function exec(raw_cmd, silence, interactive){
  let status, stdout, stderr, cmd = splitArgs(raw_cmd);
  try {
    // stdin: 'inherit' breaks ansi escapes for everything, but stdin: (interactive ? 'inherit' : 'null') doesn't and only if value is provided from task (not hardcoded in this module)
    const proc = Deno.run({ cmd, stderr:'piped', stdout:'piped', stdin: interactive ? 'inherit' : 'null' });
    stdout = new Deno.Buffer();
    stderr = new Deno.Buffer();
    const stdout_copy = Deno.copy(proc.stdout, {async write(p){ if(!silence) await Deno.stdout.write(p); return await stdout.write(p); }});
    const stderr_copy = Deno.copy(proc.stderr, {async write(p){ if(!silence) await Deno.stderr.write(p); return await stderr.write(p); }});
    [ status ] = await Promise.all([proc.status(),stdout_copy,stderr_copy]);
    // proc.close();
  } catch(err) {
    console.error(`🚨 Error while running: ${cmd.join(' ')}`);
    throw err;
  }
  if(status.success) return { stdout: decode_text(stdout.bytes()).trim(), stderr: decode_text(stderr.bytes()).trim() }
  else throw new Error(`Exit Code: ${status.code} | Command: ${raw_cmd}\n${decode_text(stderr.bytes()).trim()}`);
}

export const $ = async (str,interactive) => await exec(str,false,interactive)
export const _$ = async str => await exec(str,true,false)
export const $$ = async str => (await exec(str,true,false)).stdout

// ===============================================================
// ===============================================================

export async function dir_files(dir,opts){
  const file_paths = [];
  for await (const entry of Deno.readDir(dir,{})) {
    if (entry.isFile && !entry.name.match(opts?.exclude||'undefined') && entry.name.match(opts?.include||/./)) {
      file_paths.push(`${dir}/${entry.name}`);
    }
  }
  return file_paths;
}

export async function file_exists(path){
  return !!await Deno.stat(path).then(it=>true).catch(()=>{})
}

// Requires git to be installed
export async function git_dir(){
  return await _$(`git rev-parse --show-toplevel`);
}

// Check for existing commands
export const command_in_path = async (name)=>{
  try {
    const { code, success } = await (Deno.run({cmd:Deno.build.os==='windows'?['where.exe',name]:['sh','-c',`command -v ${name}`],stdout:"piped",stderr:"piped",stdin:"null",})).status();
    return (code===0 && success===true);
  } catch(err){
    console.error(`Unexpected error when checking for binary "${name}"`)
    console.error(err);
    throw err;
  }
}

// Interpolate
export function interpolate(string,params) {
  return new Function(...Object.keys(params), `return \`${string}\`;`)(...Object.values(params));
}