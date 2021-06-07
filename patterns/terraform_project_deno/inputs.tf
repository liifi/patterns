variable "oauth_token" {
  type = string
  sensitive = true
  default = "none"
}


locals {
  # Other locals
  
  ###############################################################
  provisioners_import = "import {action} from './${path.module}/provisioners/provisioners.ts'" # IMPORTANT: Use relative ./ so paths like .terraform/modules work too
  provisioners = {
    interpreter = [ "deno", "eval" ]
    cmd = {
      create = "${local.provisioners_import}; await action('create');"
      read   = "${local.provisioners_import}; await action('read');"
      update = "${local.provisioners_import}; await action('update');"
      delete = "${local.provisioners_import}; await action('delete');"
    }
  }
}