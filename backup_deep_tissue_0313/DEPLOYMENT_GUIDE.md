# Deployment Guide - CBTC LMS

## Step 1: Push to GitHub

Run these commands in PowerShell from `D:\CBTC-FINAL\cbtc-lms`:

```powershell
# Check current status
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Complete CBTC LMS implementation: Cart functionality, all pages, AI diagnostic, responsive design"

# Push to GitHub
git push origin main
```

If you get authentication errors, you may need to:
```powershell
# Set up your GitHub credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 2: Prepare for Deployment

### Environment Variables

Make sure your `.env.local` file is configured (but **DO NOT commit it**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Build Test

Test the production build locally:

```powershell
npm run build
npm run start
```

Visit `http://localhost:3000` to verify everything works.

## Step 3: Deploy to Production

### Option A: Vercel (Recommended - Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `Cobel1968/cbtc-lms` repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Click "Deploy"
7. Your site will be live in minutes!

### Option B: FastComet (As per your requirements)

1. **SSH into your FastComet server**
2. **Clone the repository:**
   ```bash
   cd ~/public_html
   git clone https://github.com/Cobel1968/cbtc-lms.git
   cd cbtc-lms
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create `.env.local` file:**
   ```bash
   nano .env.local
   ```
   Add your Supabase credentials

5. **Build the application:**
   ```bash
   npm run build
   ```

6. **Set up PM2 or similar process manager:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "cbtc-lms" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure your domain** to point to the application

### Option C: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy

## Step 4: Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test cart functionality
- [ ] Test diagnostic page
- [ ] Verify Supabase connection
- [ ] Test responsive design on mobile
- [ ] Check all links work
- [ ] Verify contact form
- [ ] Test course enrollment flow
- [ ] Check language switching (FR/EN)
- [ ] Verify checkout process

## Important Notes

1. **Never commit `.env.local`** - It contains sensitive keys
2. **Update `.gitignore`** to ensure sensitive files aren't committed
3. **Database**: Make sure your Supabase database is properly configured
4. **Domain**: Configure your custom domain in your hosting provider
5. **SSL**: Ensure HTTPS is enabled for security

## Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Run `npm install` again
- Clear `.next` folder and rebuild

### Environment Variables
- Double-check all Supabase keys are correct
- Verify Supabase project is active

### Database Issues
- Check Supabase dashboard for connection status
- Verify all tables exist
- Check RLS (Row Level Security) policies

## Support

For issues, check:
- Next.js documentation: https://nextjs.org/docs
- Supabase documentation: https://supabase.com/docs
- Vercel deployment: https://vercel.com/docs

