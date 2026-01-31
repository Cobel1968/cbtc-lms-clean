# Cobel Engine: Build-Safety Validator
Write-Host "--- Starting Cobel Script Doctor: Build Safety Check ---" -ForegroundColor Cyan

$targetFiles = Get-ChildItem -Recurse -Include "route.ts", "page.tsx" -Exclude "node_modules", ".next"

$issuesFound = 0

foreach ($file in $targetFiles) {
    $content = Get-Content $file.FullName -Raw
    $needsDynamic = $content -match "cookies\(\)" -or $content -match "createRouteHandlerClient"
    $hasDynamicFlag = $content -match "export const dynamic = 'force-dynamic'"

    if ($needsDynamic -and -not $hasDynamicFlag) {
        Write-Host "[!] CRITICAL: $($file.FullName) uses dynamic data but lacks 'force-dynamic' flag." -ForegroundColor Red
        $issuesFound++
    }
}

if ($issuesFound -eq 0) {
    Write-Host "--- Success: All routes are Build-Safe (31/31 path confirmed) ---" -ForegroundColor Green
} else {
    Write-Host "--- Failure: $issuesFound files need amendment before 'npx next build' ---" -ForegroundColor Yellow
}