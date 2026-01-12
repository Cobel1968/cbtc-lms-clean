# ============================================
# COBEL BTC - Supabase Setup Script
# Optimized for FastComet Hosting
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  COBEL BTC - Supabase Setup" -ForegroundColor Cyan
Write-Host "  FastComet Deployment Ready" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
$projectPath = "E:\CBTC-FINAL\cbtc-fresh"
Set-Location $projectPath

Write-Host "[1/4] Checking project directory..." -ForegroundColor Yellow
if (-not (Test-Path $projectPath)) {
    Write-Host "ERROR: Project directory not found at $projectPath" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Project directory found" -ForegroundColor Green
Write-Host ""

# Check if .env.local already exists
Write-Host "[2/4] Checking for existing .env.local file..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "[WARNING] .env.local already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Setup cancelled. Existing .env.local preserved." -ForegroundColor Yellow
        exit 0
    }
    Remove-Item ".env.local" -Force
    Write-Host "[OK] Removed existing .env.local" -ForegroundColor Green
} else {
    Write-Host "[OK] No existing .env.local found" -ForegroundColor Green
}
Write-Host ""

# Create .env.local file
Write-Host "[3/4] Creating .env.local file..." -ForegroundColor Yellow

# Build the content line by line to avoid encoding issues
$lines = @()
$lines += "# ============================================"
$lines += "# COBEL BTC - Supabase Configuration"
$lines += "# Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$lines += "# ============================================"
$lines += ""
$lines += "# Supabase Project URL (from Supabase Dashboard > Settings > API)"
$lines += "NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co"
$lines += ""
$lines += "# Supabase Anonymous/Public Key (from Supabase Dashboard > Settings > API > anon public)"
$lines += "# Replace 'YOUR_ANON_KEY_HERE' with your actual key"
$lines += "NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE"
$lines += ""
$lines += "# Supabase Service Role Key (from Supabase Dashboard > Settings > API > service_role)"
$lines += "# WARNING: KEEP THIS SECRET! Never commit to version control."
$lines += "# Replace 'YOUR_SERVICE_ROLE_KEY_HERE' with your actual key"
$lines += "SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE"
$lines += ""
$lines += "# Optional: API URL for backward compatibility"
$lines += "NEXT_PUBLIC_API_URL=http://localhost:3000/api"

# Write to file
$lines | Out-File -FilePath ".env.local" -Encoding utf8
Write-Host "[OK] .env.local file created" -ForegroundColor Green
Write-Host ""

# Display instructions
Write-Host "[4/4] Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Get your Supabase keys from:" -ForegroundColor White
Write-Host "   https://app.supabase.com/project/rvlcpygatguvxhuliand/settings/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Open .env.local in your editor and replace:" -ForegroundColor White
Write-Host "   - YOUR_ANON_KEY_HERE with your 'anon public' key" -ForegroundColor Yellow
Write-Host "   - YOUR_SERVICE_ROLE_KEY_HERE with your 'service_role' key" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Test the connection:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host "   Then visit: http://localhost:3000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] Setup script completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "File created at: $projectPath\.env.local" -ForegroundColor Gray
Write-Host ""

# Ask if user wants to open the file
$openFile = Read-Host "Do you want to open .env.local in Notepad now? (y/n)"
if ($openFile -eq "y") {
    notepad ".env.local"
}
