# PS 3.1 compatible fixer: import casing + provider name + known bad strings
param(
  [string]$Root = (Get-Location).Path,
  [switch]$WhatIf
)

function Write-Utf8NoBom([string]$Path, [string]$Content) {
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}
function Backup-File([string]$Path) {
  $stamp = (Get-Date).ToString("yyyyMMdd_HHmmss")
  $bak = "$Path.bak.$stamp"
  [System.IO.File]::Copy($Path, $bak, $true)
  return $bak
}

$targets = @("app","components","lib","scripts")
$exts = @("*.ts","*.tsx","*.js","*.jsx")

$files = @()
foreach ($t in $targets) {
  $p = Join-Path $Root $t
  if (Test-Path $p) {
    foreach ($e in $exts) {
      $files += Get-ChildItem -Path $p -Recurse -File -Include $e -ErrorAction SilentlyContinue
    }
  }
}

$CANON = "@/app/contexts/LanguageContext"

$changed = 0
foreach ($f in $files) {
  $path = $f.FullName
  $orig = [System.IO.File]::ReadAllText($path)
  $text = $orig

  # 1) Fix wrong path casing anywhere
  $text = $text -replace "@/app/contexts/languagecontext", $CANON

  # 2) Fix relative wrong-cased imports that your earlier scan showed historically
  $text = $text -replace "(\.\.\/contexts\/)languagecontext", "`$1LanguageContext"
  $text = $text -replace "(\.\/contexts\/)languagecontext", "`$1LanguageContext"
  $text = $text -replace "(\.\.\/\.\.\/contexts\/)languagecontext", "`$1LanguageContext"

  # 3) Fix wrong exported name usage: languageprovider -> LanguageProvider (case-sensitive export)
  $text = $text -replace "\blanguageprovider\b", "LanguageProvider"

  # 4) Fix ScriptDoctor comment lie (optional, but helps prevent re-regression)
  $text = $text -replace "LanguageContext',\s*//\s*Correct", "LanguageContext', // Canonical (Linux-truth)"

  if ($text -ne $orig) {
    if ($WhatIf) {
      "WOULD-CHANGE: $path"
    } else {
      $bak = Backup-File $path
      Write-Utf8NoBom $path $text
      "CHANGED: $path  (backup: $bak)"
      $changed++
    }
  }
}

"Done. Changed files: $changed"
