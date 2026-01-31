param(
  [string]$Root = (Get-Location).Path,
  [switch]$Fix
)

function Get-SourceFiles($base) {
  Get-ChildItem -Recurse -File $base -Include *.ts,*.tsx,*.js,*.jsx -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch "\\node_modules\\|\\\.next\\|\\\.vercel\\|\\dist\\|\\out\\" }
}

$Root = (Resolve-Path $Root).Path
$files = Get-SourceFiles $Root

Write-Host ("Scanning {0} files under {1}" -f $files.Count, $Root)

$results = @()

foreach ($f in $files) {
  $p = $f.FullName
  $content = Get-Content $p -Raw -ErrorAction SilentlyContinue
  if (-not $content) { continue }

  $hasCall = [regex]::IsMatch($content, "\buseLanguage\s*\(")
  $hasNamedImport = [regex]::IsMatch($content, "import\s*\{\s*[^}]*\buseLanguage\b[^}]*\}\s*from\s*['""]")
  $hasDefaultImport = [regex]::IsMatch($content, "import\s+useLanguage\s+from\s+['""]")
  $badPath = [regex]::IsMatch($content, "@\/app\/contexts\/languagecontext", [Text.RegularExpressions.RegexOptions]::None)
  $goodPath = [regex]::IsMatch($content, "@\/app\/contexts\/LanguageContext", [Text.RegularExpressions.RegexOptions]::None)

  if ($hasCall -or $hasNamedImport -or $hasDefaultImport -or $badPath) {
    $results += [pscustomobject]@{
      file = $p
      calls_useLanguage = $hasCall
      named_import = $hasNamedImport
      default_import = $hasDefaultImport
      bad_path_languagecontext = $badPath
      good_path_LanguageContext = $goodPath
    }
  }
}

# Summary
Write-Host ""
Write-Host "=== Summary ==="
Write-Host ("Calls useLanguage(): {0}" -f (($results | Where-Object calls_useLanguage).Count))
Write-Host ("Named import { useLanguage }: {0}" -f (($results | Where-Object named_import).Count))
Write-Host ("Default import useLanguage: {0}  <-- risky" -f (($results | Where-Object default_import).Count))
Write-Host ("Bad path '@/app/contexts/languagecontext': {0}  <-- Linux break" -f (($results | Where-Object bad_path_languagecontext).Count))

# Detailed lists
Write-Host ""
Write-Host "=== Default-import offenders (fix these first) ==="
$results | Where-Object default_import | Select-Object -ExpandProperty file

Write-Host ""
Write-Host "=== Bad-path offenders (must be LanguageContext) ==="
$results | Where-Object bad_path_languagecontext | Select-Object -ExpandProperty file

# Optional auto-fix: only safe changes
if ($Fix) {
  Write-Host ""
  Write-Host "=== Applying SAFE FIXES (imports only) ==="

  foreach ($r in ($results | Where-Object { $_.bad_path_languagecontext -or $_.default_import })) {
    $p = $r.file
    $c = Get-Content $p -Raw

    # Fix bad path casing
    $c2 = $c -replace "@\/app\/contexts\/languagecontext", "@/app/contexts/LanguageContext"

    # Fix default import -> named import (only when it imports from LanguageContext)
    $c2 = $c2 -replace "import\s+useLanguage\s+from\s+(['""]@\/app\/contexts\/LanguageContext['""])\s*;?", "import { useLanguage } from `$1;"

    if ($c2 -ne $c) {
      # UTF-8 no BOM write
      $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
      [System.IO.File]::WriteAllText($p, $c2, $utf8NoBom)
      Write-Host ("Fixed: {0}" -f $p)
    }
  }
}

# Export report
$out = Join-Path $Root ("audit-useLanguage_" + (Get-Date -Format "yyyyMMdd_HHmmss") + ".csv")
$results | Sort-Object file | Export-Csv -NoTypeInformation -Encoding UTF8 $out
Write-Host ""
Write-Host ("Report saved: {0}" -f $out)
