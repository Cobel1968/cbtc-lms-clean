param(
  [string]$Root = "."
)

function Get-Files($rootPath) {
  Get-ChildItem -Recurse -File $rootPath -Include *.ts,*.tsx,*.js,*.jsx -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch "\\node_modules\\|\\\.next\\|\\\.vercel\\|\\dist\\|\\out\\" }
}

$RootPath = (Resolve-Path $Root).Path
$files = Get-Files $RootPath

$results = @()

foreach ($f in $files) {
  $p = $f.FullName
  $c = [System.IO.File]::ReadAllText($p)

  $hasUseClient = ($c -match "['""]use client['""]")
  $calls = [regex]::IsMatch($c, "\buseLanguage\s*\(")

  $importNamed = [regex]::IsMatch($c, "import\s*\{[^}]*\buseLanguage\b[^}]*\}\s*from\s*['""]")
  $importDefault = [regex]::IsMatch($c, "import\s+useLanguage\s+from\s*['""]")

  $fromLanguageContext = ($c -match "@\/app\/contexts\/LanguageContext")
  $fromBadLower = ($c -match "@\/app\/contexts\/languagecontext")

  if ($calls -or $importNamed -or $importDefault -or $fromBadLower) {
    $results += [pscustomobject]@{
      file = $p
      use_client = $hasUseClient
      calls_useLanguage = $calls
      import_named = $importNamed
      import_default = $importDefault
      from_LanguageContext = $fromLanguageContext
      from_languagecontext_bad = $fromBadLower
    }
  }
}

# Summary
$callCount = ($results | Where-Object { $_.calls_useLanguage }).Count
$namedCount = ($results | Where-Object { $_.import_named }).Count
$defaultCount = ($results | Where-Object { $_.import_default }).Count
$badPathCount = ($results | Where-Object { $_.from_languagecontext_bad }).Count
$serverRisk = ($results | Where-Object { $_.calls_useLanguage -and -not $_.use_client }).Count

Write-Host ""
Write-Host "=== useLanguage Audit (PowerShell 3.1) ==="
Write-Host ("Files scanned: {0}" -f $files.Count)
Write-Host ("Calls useLanguage(): {0}" -f $callCount)
Write-Host ("Named imports {{ useLanguage }}: {0}" -f $namedCount)
Write-Host ("Default imports useLanguage: {0}  <-- HIGH RISK" -f $defaultCount)
Write-Host ("Bad path '@/app/contexts/languagecontext': {0}  <-- Linux/Vercel break" -f $badPathCount)
Write-Host ("Calls useLanguage() but missing 'use client': {0}  <-- prerender risk" -f $serverRisk)

Write-Host ""
Write-Host "=== Default-import offenders (must fix) ==="
$results | Where-Object { $_.import_default } | Select-Object -ExpandProperty file

Write-Host ""
Write-Host "=== Bad-path offenders (must be LanguageContext) ==="
$results | Where-Object { $_.from_languagecontext_bad } | Select-Object -ExpandProperty file

Write-Host ""
Write-Host "=== Server-risk offenders (calls useLanguage without 'use client') ==="
$results | Where-Object { $_.calls_useLanguage -and -not $_.use_client } | Select-Object -ExpandProperty file

# Export CSV report
$out = Join-Path $RootPath ("audit-useLanguage_v3_" + (Get-Date -Format "yyyyMMdd_HHmmss") + ".csv")
$results | Sort-Object file | Export-Csv -NoTypeInformation -Encoding UTF8 $out
Write-Host ""
Write-Host ("Report saved: {0}" -f $out)
