terraform {
  backend "kubernetes" {
    config_path = "./backend_kubeconfig.yaml"
    load_config_file = true
  }
}