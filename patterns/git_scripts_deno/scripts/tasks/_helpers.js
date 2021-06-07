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
