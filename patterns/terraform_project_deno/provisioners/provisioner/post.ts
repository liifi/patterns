
// Careful with env vars, specially with secrets
// const rawEnv = Deno.env.toObject(); 
// const { PLUGIN_CLIENT_CERT, PLUGIN_PROTOCOL_VERSIONS, TF_TEMP_LOG_PATH, ...env} = rawEnv;
// const data = Object.entries(env)
//   .sort(([key1], [key2]) => key1.localeCompare(key2))
//   .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
// const output = JSON.stringify(data,null,' ');

type Props = {
  name: string
  description: string
  options: string[]
}

export default {
  async create(props:Props){
    await Promise.resolve();
    return props;
  },

  async read(props:Props){
    // console.log('hello properties...',JSON.stringify(props))
    await Promise.resolve();
    return props;
  },

  async update(props:Props){
    await Promise.resolve();
    return props;
  },

  async delete(props:Props){
    await Promise.resolve();
    return props;
  }
}