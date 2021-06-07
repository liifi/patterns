Use [deno](http://deno.land/) to `create`, `read`, `update`, `delete` a resource, and for **pre** and **post** actions, and also to run `./scripts/task`. Use `kubernetes` as multi workspace backend.

### Based on patterns
- [terraform_project_deno_tasks](../terraform_project_deno_tasks)

### Requirements
- [(windows)](https://github.com/git-for-windows/git/releases) git-bash 
- deno (can be downloaded with `./scripts/_init`)
- `./scripts/task deps`
  - terraform (can be downloaded with `./scripts/task deps` and used with `./scripts/task`)
  - kubectl (can be downloaded with `./scripts/task deps` and used with `./scripts/task`)
  - k3d (optional and can be downloaded with `./scripts/task deps` and used with `./scripts/task`)

### Notes

- Requires you to have access to a kubernetes cluster (namespaces for secrets/state and one for target deployment). Create it with `./scripts/task gimme_k8s`