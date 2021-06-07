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

provider "shell" {
  sensitive_environment = {
    OAUTH_TOKEN = var.oauth_token # Prevents from showing on plan and log
  }
}

###########################

module "pre" {
  source = "./modules/pre"
  provisioners = local.provisioners
}

#--------------------------

module "main" {
  source = "./modules/main"
  # source = "git::https://github.com/liifi/patterns.git//patterns/terraform_module_deno?ref=6ffcce2"
  depends_on = [ module.pre ]
  provisioners = local.provisioners
}

#--------------------------

module "post" {
  source = "./modules/post"
  depends_on = [ module.main ]
  provisioners = local.provisioners
}

###########################