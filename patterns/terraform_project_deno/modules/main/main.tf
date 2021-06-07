terraform {
  required_providers {
    # Used for custom providers usually written in deno/typescript
    shell = {
      # env var TF_LOG=1, enables stdout stderr
      source = "scottwinkler/shell"
      version = "1.7.7"
    }
  }
}

resource "shell_script" "main_example" {
  interpreter = local.provisioners.interpreter
  lifecycle_commands {
    create = local.provisioners.cmd.create
    read   = local.provisioners.cmd.read
    update = local.provisioners.cmd.update
    delete = local.provisioners.cmd.delete
  }
  sensitive_environment = {
    sensitive = var.sensitive
  }
  environment = {
    # Easier pattern in order to provide lists and direct instantiation
    values = jsonencode({
      provisioner = "example"
      name        = "cool"
      description = "description"
      other       = [ "value1", "value2" ]
    })
  }
}