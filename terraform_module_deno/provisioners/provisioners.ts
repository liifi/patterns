import example from './provisioner/example.ts';

type actions = 'create'|'update'|'read'|'delete'
type provisioners  = 'example'
const provisioners = { example }

export async function action(action:actions){
  const values = Deno.env.get('values');
  if(!values){
    throw new Error('You must provide "values" environment variable')
  }

  const props = JSON.parse(<string>values);
  if(!props.provisioner){
    throw new Error(`Property "provisioner" is required in "values" environment variable`)
  }

  if(!provisioners.hasOwnProperty(<provisioners>props.provisioner))
    throw new Error(`No registered provisioner "${props.provisioner}"`)

  if(!provisioners[<provisioners>props.provisioner].hasOwnProperty(action))
    throw new Error(`Provisioner "${props.provisioner}" has no action "${action}"`)

  const result = await provisioners[<provisioners>props.provisioner][action](props);
  const output = JSON.stringify(result);
  console.log(output);
}