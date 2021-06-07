
output "example" {
  value = shell_script.main_example.output // map[string]string
}

output "other" {
  value = jsondecode(shell_script.main_example.output.other) // all nested object are encoded
}