# Simple .env.local creation script
# Run this if the main script has issues

$content = @"
# COBEL BTC - Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
NEXT_PUBLIC_API_URL=http://localhost:3000/api
"@

$content | Out-File -FilePath ".env.local" -Encoding utf8
Write-Host ".env.local file created successfully!" -ForegroundColor Green
Write-Host "Now edit .env.local and replace YOUR_ANON_KEY_HERE and YOUR_SERVICE_ROLE_KEY_HERE with your actual Supabase keys" -ForegroundColor Yellow

