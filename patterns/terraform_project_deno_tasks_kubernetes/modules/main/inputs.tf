variable "sensitive" {
  type = string
  default = "nososecret"
  sensitive = true
}


###############################
variable "provisioners" {
  type = object({
    interpreter = list(string)
    cmd = object({
      create = string
      read = string
      update = string
      delete = string
    })
  })
}

locals {
  provisioners = var.provisioners
}