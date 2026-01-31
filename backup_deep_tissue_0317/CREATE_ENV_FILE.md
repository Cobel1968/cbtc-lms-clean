# 🚀 Quick Guide: Create .env.local File

## ✅ EASIEST METHOD: Copy This File

I've created a template file for you. Just follow these steps:

### Step 1: Open the Template
Look for `env.local.template` in the `cbtc-fresh` folder (I'll create it for you)

### Step 2: Copy and Rename
1. Copy `env.local.template`
2. Rename it to `.env.local` (with the dot at the beginning)
3. Open it and replace the placeholder values with your actual Supabase keys

---

## 🔧 OR Use PowerShell (One Command)

Open PowerShell in the `cbtc-fresh` folder and run:

```powershell
cd E:\CBTC-FINAL\cbtc-fresh
@"
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
"@ | Out-File -FilePath .env.local -Encoding utf8
```

Then open `.env.local` in Notepad or Cursor and replace `your_anon_key_here` and `your_service_role_key_here` with your actual keys.

---

## 📝 OR Create Manually

1. **Open Cursor/VS Code** in the `cbtc-fresh` folder
2. **Click "New File"** (or press `Ctrl+N`)
3. **Name it:** `.env.local`
4. **Paste this content:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

5. **Save** (`Ctrl+S`)
6. **Replace the placeholder values** with your actual Supabase keys from: https://app.supabase.com/project/rvlcpygatguvxhuliand/settings/api

---

## 🎯 Which Method Should You Use?

- **If you're comfortable with PowerShell:** Use the PowerShell command above
- **If you prefer clicking:** Use the manual method in Cursor/VS Code
- **Either way works!** Choose what's easiest for you.

---

## ✅ After Creating the File

1. Make sure it's saved
2. Restart your dev server (if running): `npm run dev`
3. Test: Visit http://localhost:3000/api/health

