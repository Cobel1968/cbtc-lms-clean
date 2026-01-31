# Git Push Commands

Run these commands in PowerShell from `D:\CBTC-FINAL\cbtc-lms`:

## Step 1: Check Status
```powershell
git status
```

## Step 2: Add All Changes
```powershell
git add .
```

## Step 3: Commit
```powershell
git commit -m "Complete CBTC LMS: Cart, all pages, AI diagnostic, responsive design

- Implemented full shopping cart functionality
- Created checkout, courses, about, and contact pages
- Added AI diagnostic test page
- Fixed all routing issues
- Made all pages fully responsive
- Integrated CartContext and LanguageContext
- Added cart icon with count in navbar
- All 10 courses fully implemented
- Bilingual support (FR/EN) throughout"
```

## Step 4: Push to GitHub
```powershell
git push origin main
```

## If you need to set up git config:
```powershell
git config --global user.name "Abel Coulibaly"
git config --global user.email "Abel.coulibaly@cobelbtc.com"
```

## If you get authentication errors:
You may need to use a Personal Access Token:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `repo` permissions
3. Use the token as your password when pushing

