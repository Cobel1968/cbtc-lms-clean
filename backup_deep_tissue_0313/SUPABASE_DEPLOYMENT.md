# Supabase Deployment Guide for CBTC LMS

## ✅ Pre-Deployment Checklist

### 1. Verify Supabase Configuration

Your Supabase project URL: `https://rvlcpygatguvxhuliand.supabase.co`

**Check your Supabase Dashboard:**
1. Go to: https://app.supabase.com/project/rvlcpygatguvxhuliand
2. Verify all 9 tables exist:
   - ✅ users
   - ✅ courses
   - ✅ enrollments
   - ✅ instructors
   - ✅ diagnostic_tests
   - ✅ diagnostic_results
   - ✅ learning_contracts
   - ✅ assignments
   - ✅ submissions

### 2. Get Your Supabase Keys

1. Go to: https://app.supabase.com/project/rvlcpygatguvxhuliand/settings/api
2. Copy these values:
   - **Project URL**: `https://rvlcpygatguvxhuliand.supabase.co`
   - **anon/public key**: (starts with `eyJ...`)
   - **service_role key**: (starts with `eyJ...`) - **KEEP THIS SECRET!**

### 3. Environment Variables Setup

**For Local Development:**
Create `.env.local` in your project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**For Production Deployment:**
Add these same variables in your hosting platform's environment settings.

---

## 🚀 Deployment Options with Supabase

### Option 1: Vercel (Recommended - Best for Next.js + Supabase)

**Why Vercel?**
- Built by Next.js creators
- Automatic deployments from GitHub
- Built-in Supabase integration
- Free tier available
- Automatic HTTPS

**Steps:**

1. **Push to GitHub** (if not already done):
   ```powershell
   git add .
   git commit -m "Complete CBTC LMS implementation"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import `Cobel1968/cbtc-lms`
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `./`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

3. **Add Environment Variables in Vercel:**
   - Go to Project Settings > Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = `https://rvlcpygatguvxhuliand.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)
     - `SUPABASE_SERVICE_ROLE_KEY` = (your service role key)
   - Select "Production", "Preview", and "Development"
   - Click "Save"

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live!

5. **Configure Custom Domain (Optional):**
   - Go to Project Settings > Domains
   - Add your domain (e.g., `www.cobelbtc.com`)
   - Follow DNS configuration instructions

---

### Option 2: FastComet (As Requested)

**Prerequisites:**
- SSH access to your FastComet server
- Node.js 18+ installed
- Git installed

**Steps:**

1. **SSH into FastComet:**
   ```bash
   ssh username@your-server.fastcomet.com
   ```

2. **Navigate to your domain directory:**
   ```bash
   cd ~/public_html
   # Or your specific domain directory
   cd ~/domains/yourdomain.com/public_html
   ```

3. **Clone your repository:**
   ```bash
   git clone https://github.com/Cobel1968/cbtc-lms.git
   cd cbtc-lms
   ```

4. **Install dependencies:**
   ```bash
   npm install --production
   ```

5. **Create environment file:**
   ```bash
   nano .env.local
   ```
   Add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
   Save: `Ctrl+X`, then `Y`, then `Enter`

6. **Build the application:**
   ```bash
   npm run build
   ```

7. **Install PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   ```

8. **Start the application:**
   ```bash
   pm2 start npm --name "cbtc-lms" -- start
   pm2 save
   pm2 startup
   ```

9. **Configure Nginx/Apache** (if needed):
   - Point your domain to port 3000
   - Or configure reverse proxy

10. **Set up auto-restart:**
    ```bash
    pm2 startup
    # Follow the instructions it provides
    ```

---

### Option 3: Netlify

1. Go to https://netlify.com
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables (same as Vercel)
5. Deploy

---

## 🔒 Supabase Security Configuration

### Row Level Security (RLS) Policies

**Important:** Verify RLS policies in Supabase:

1. Go to Supabase Dashboard > Authentication > Policies
2. Ensure proper policies for:
   - `users` table
   - `courses` table (public read, admin write)
   - `enrollments` table (user-specific)
   - `diagnostic_results` table (user-specific)

### API Security

- ✅ **anon key**: Safe to expose (used in `NEXT_PUBLIC_*`)
- ⚠️ **service_role key**: NEVER expose in client-side code
- ✅ Only use `service_role` in API routes or server-side

---

## 📊 Post-Deployment Verification

After deployment, verify:

1. **Homepage loads**: `https://your-domain.com`
2. **Supabase connection**: Check browser console for errors
3. **API routes work**: `/api/health` should return 200
4. **Cart functionality**: Add items, view cart
5. **Course pages**: All 10 courses load
6. **Diagnostic page**: `/diagnostic` works
7. **Authentication**: Login/Register (if implemented)
8. **Database queries**: Check Supabase logs

---

## 🔧 Troubleshooting

### Issue: "Supabase connection failed"

**Solution:**
- Verify environment variables are set correctly
- Check Supabase project is active
- Verify API keys are correct
- Check network/firewall settings

### Issue: "Database tables not found"

**Solution:**
- Run SQL schema in Supabase SQL Editor
- Verify all 9 tables exist
- Check table permissions

### Issue: "Build fails"

**Solution:**
- Check Node.js version (18+)
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

---

## 📝 Environment Variables Reference

```env
# Required for Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional (for production)
NODE_ENV=production
```

---

## 🎯 Quick Start Commands

**Push to GitHub:**
```powershell
cd D:\CBTC-FINAL\cbtc-lms
git add .
git commit -m "Complete CBTC LMS with Supabase"
git push origin main
```

**Test build locally:**
```powershell
npm run build
npm run start
```

**Deploy to Vercel:**
1. Go to vercel.com
2. Import repository
3. Add environment variables
4. Deploy!

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Vercel Docs**: https://vercel.com/docs
- **Your Supabase Project**: https://app.supabase.com/project/rvlcpygatguvxhuliand

---

## ✅ Final Checklist Before Going Live

- [ ] All code pushed to GitHub
- [ ] Environment variables configured in hosting platform
- [ ] Supabase database tables verified
- [ ] RLS policies configured
- [ ] Build succeeds locally (`npm run build`)
- [ ] All pages tested
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS enabled
- [ ] Analytics/monitoring set up (optional)

**You're ready to go live! 🚀**

