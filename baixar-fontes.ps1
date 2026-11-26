# Baixa a fonte Inter (subset latin, woff2) para docs\assets\fonts
# Uso: na pasta C:\dev\Portifolio, execute:
#   powershell -ExecutionPolicy Bypass -File .\baixar-fontes.ps1

$destino = Join-Path $PSScriptRoot "docs\assets\fonts"
New-Item -ItemType Directory -Force -Path $destino | Out-Null

$pesos = 300, 400, 500, 600, 700, 800
foreach ($p in $pesos) {
    $url = "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-$p-normal.woff2"
    $arquivo = Join-Path $destino "inter-$p.woff2"
    Write-Host "Baixando peso $p ..."
    Invoke-WebRequest -Uri $url -OutFile $arquivo -UseBasicParsing
}

Write-Host ""
Write-Host "Arquivos em ${destino}:"
Get-ChildItem $destino | Select-Object Name, Length
