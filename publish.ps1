# --- CONFIGURAÇÃO INTERVIXUS ---
$VERSION = "v1.0.0-beta"
$REPO_URL = "https://github.com/inter-estudios-developers/Facilita-Estudante"
$EXE_NAME = "Phanton-Browser-V16.exe"

Write-Host "🛡️ [INTERVIXUS] Iniciando Ciclo de Publicação..." -ForegroundColor Cyan

git add .
git commit -m "Release: $VERSION - Atualização de Binários"
git push origin main

git tag -d $VERSION 2>$null
git tag -a $VERSION -m "Lançamento: $EXE_NAME"
git push origin $VERSION --force

Write-Host "✅ Tag enviada! Abrindo Portal de Upload..." -ForegroundColor Green
Start-Process "chrome.exe" "$REPO_URL/releases/new?tag=$VERSION"
