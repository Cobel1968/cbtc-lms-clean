# Quick Path Checker - Save as QuickCheck.ps1
$path = "D:\cbtc-final\cbtc-lms"

Write-Host "Checking for common issues in: $path" -ForegroundColor Cyan

# 1. Check for case sensitivity issues
Write-Host "`n1. Checking for uppercase in imports..." -ForegroundColor Yellow
Get-ChildItem $path -Recurse -Include *.js, *.jsx, *.ts, *.tsx -Exclude node_modules | 
    Select-String -Pattern "import.*['""].*[A-Z].*['""]" | 
    Select-Object -First 10 Filename, LineNumber, Line

# 2. Check for absolute paths
Write-Host "`n2. Checking for absolute paths..." -ForegroundColor Yellow
Get-ChildItem $path -Recurse -Include *.js, *.jsx, *.ts, *.tsx -Exclude node_modules | 
    Select-String -Pattern "['""]/[^/].*?['""]" | 
    Select-Object -First 10 Filename, LineNumber, Line

# 3. Check for Windows paths
Write-Host "`n3. Checking for Windows backslashes..." -ForegroundColor Yellow
Get-ChildItem $path -Recurse -Include *.js, *.jsx, *.ts, *.tsx -Exclude node_modules | 
    Select-String -Pattern "['""].*\\\\.*['""]" | 
    Select-Object -First 10 Filename, LineNumber, Line

Write-Host "`nDone!" -ForegroundColor Green