# install-global.ps1
# Instala Antigravity ECC Concierge globalmente en ~/.gemini/config/plugins/ecc-concierge

$ErrorActionPreference = "Stop"

$PluginName = "ecc-concierge"
$UserHome = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::UserProfile)
$TargetDir = Join-Path $UserHome ".gemini\config\plugins\$PluginName"
$SourceDir = $PSScriptRoot

Write-Host "Instalando Antigravity ECC Concierge..." -ForegroundColor Cyan
Write-Host "Origen:  $SourceDir"
Write-Host "Destino: $TargetDir"

if (-not (Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

Copy-Item -Path (Join-Path $SourceDir "plugin.json") -Destination $TargetDir -Force
Copy-Item -Path (Join-Path $SourceDir "README.md") -Destination $TargetDir -Force
if (Test-Path (Join-Path $SourceDir "AGENTS.md")) {
    Copy-Item -Path (Join-Path $SourceDir "AGENTS.md") -Destination $TargetDir -Force
}

if (Test-Path (Join-Path $SourceDir "data")) {
    Copy-Item -Path (Join-Path $SourceDir "data") -Destination $TargetDir -Recurse -Force
}

if (Test-Path (Join-Path $SourceDir "scripts")) {
    Copy-Item -Path (Join-Path $SourceDir "scripts") -Destination $TargetDir -Recurse -Force
}

if (Test-Path (Join-Path $SourceDir "skills")) {
    Copy-Item -Path (Join-Path $SourceDir "skills") -Destination $TargetDir -Recurse -Force
}

if (Test-Path (Join-Path $SourceDir "rules")) {
    Copy-Item -Path (Join-Path $SourceDir "rules") -Destination $TargetDir -Recurse -Force
}

Write-Host ""
Write-Host "[OK] Antigravity ECC Concierge instalado con exito en:" -ForegroundColor Green
Write-Host "     $TargetDir" -ForegroundColor Yellow
Write-Host ""
Write-Host "Disponible globalmente en todas tus sesiones de Antigravity." -ForegroundColor Green
