# Quick PowerShell Runner for Quartz 5.0 Fast Dev Server
param(
    [string]$Track = "",
    [switch]$Build = $false,
    [int]$Port = 8080
)

$argsList = @()
if ($Track -ne "") {
    $argsList += "--track"
    $argsList += $Track
}
if ($Build) {
    $argsList += "--build"
}
if ($Port -ne 8080) {
    $argsList += "--port"
    $argsList += $Port
}

Write-Host "⚡ Running Quartz Fast Dev Manager..." -ForegroundColor Cyan
node ./scripts/fast-dev.mjs @argsList
