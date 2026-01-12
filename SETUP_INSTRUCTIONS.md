# 🚀 COBEL BTC - Complete Setup Instructions

## Single PowerShell Solution (FastComet Optimized)

Since you're deploying to FastComet with resource limitations, we're using Supabase for the database. Here's the **one solution** to complete your setup:

---

## Step 1: Run the Setup Script

Open PowerShell and run:

```powershell
cd E:\CBTC-FINAL\cbtc-fresh
.\setup-supabase.ps1
```

This script will:
- ✅ Check your project directory
- ✅ Create the `.env.local` file with the correct structure
- ✅ Guide you through the next steps

---

## Step 2: Get Your Supabase Keys

1. **Go to your Supabase Dashboard:**
   ```
   https://app.supabase.com/project/rvlcpygatguvxhuliand/settings/api
   ```

2. **Copy these three values:**
   - **Project URL** → Already set: `https://rvlcpygatguvxhuliand.supabase.co`
   - **anon public** key → Copy this (long string starting with `eyJ...`)
   - **service_role** key → Copy this (long string starting with `eyJ...`)

---

## Step 3: Update .env.local File

1. **Open `.env.local`** in Cursor/Notepad (the script can open it for you)

2. **Replace the placeholders:**
   - Find: `YOUR_ANON_KEY_HERE`
   - Replace with: Your actual anon public key from Supabase
   
   - Find: `YOUR_SERVICE_ROLE_KEY_HERE`
   - Replace with: Your actual service_role key from Supabase

3. **Save the file** (`Ctrl+S`)

---

## Step 4: Test the Connection

```powershell
cd E:\CBTC-FINAL\cbtc-fresh
npm install
npm run dev
```

Then visit: **http://localhost:3000/api/health**

You should see:
```json
{
  "status": "healthy",
  "message": "Supabase connection successful",
  "timestamp": "..."
}
```

---

## ✅ What's Already Set Up

All the code is already in place:

1. **Supabase Client** → `app/lib/supabase.ts`
2. **Database Types** → `app/lib/database.types.ts` (for all 9 tables)
3. **Helper Functions** → `app/lib/db-helpers.ts`
4. **API Routes** → `app/api/` (login, register, courses, enrollments, health)
5. **Next.js Config** → Already configured for Supabase storage

Your 9 tables in Supabase are:
- ✅ users
- ✅ instructors
- ✅ courses
- ✅ diagnostic_tests
- ✅ diagnostic_results
- ✅ learning_contracts
- ✅ enrollments
- ✅ assignments
- ✅ submissions

---

## 🚀 For FastComet Deployment

When deploying to FastComet:

1. **Add environment variables in cPanel:**
   - Go to cPanel → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

2. **Build your Next.js app:**
   ```powershell
   npm run build
   ```

3. **Deploy the `out` folder** to FastComet (since `output: 'export'` is set in `next.config.js`)

---

## 🆘 Troubleshooting

### "Supabase environment variables are not set"
- Make sure `.env.local` exists in `cbtc-fresh` folder
- Restart your dev server after creating/updating `.env.local`

### "Invalid API key"
- Double-check you copied the entire key (they're very long)
- Make sure there are no extra spaces or line breaks
- Keys should start with `eyJ`

### PowerShell script won't run
If you get an execution policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📝 Summary

**One command to run:**
```powershell
cd E:\CBTC-FINAL\cbtc-fresh; .\setup-supabase.ps1
```

**Then:**
1. Get keys from Supabase dashboard
2. Update `.env.local` with your keys
3. Test with `npm run dev`

**That's it!** Your Supabase integration is complete. 🎉

