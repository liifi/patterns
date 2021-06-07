type actions = 'create'|'update'|'read'|'delete'

export async function action(action:actions){
  const values = Deno.env.get('values');
  if(!values){
    throw new Error('You must provide "values" environment variable')
  }

  const props = JSON.parse(<string>values);
  if(!props.provisioner){
    throw new Error(`Property "provisioner" is required in "values" environment variable`)
  }

  const current_dir = new URL(".", import.meta.url).pathname.slice(Deno.build.os == "windows"?1:0).replace(/\/$/,'');
  const provisioners:string[] = [];
  for await (const entry of Deno.readDir(`${current_dir}/provisioner`)) {
    if (entry.isFile) provisioners.push(`./provisioner/${entry.name}`);
  }

  const pattern = new RegExp(`\\/${props.provisioner}\\.(ts|js)$`);
  const provisioner_path = provisioners.find(it=>it.match(pattern))
  if(!provisioner_path)
    throw new Error(`No registered provisioner "${props.provisioner}"`)

  // Unstable https://github.com/denoland/deno/issues/9982
  const provisioner = (await import(provisioner_path)).default;
  const result = await provisioner[action](props)
  const output = JSON.stringify(result);
  console.log(output);
}