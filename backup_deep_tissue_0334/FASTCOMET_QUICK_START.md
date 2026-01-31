# FastComet Quick Start - cobelbtc.com

## 🚀 Quick Deployment Steps

### 1. Push to GitHub First

```powershell
cd D:\CBTC-FINAL\cbtc-lms
git add .
git commit -m "Complete CBTC LMS ready for FastComet deployment"
git push origin main
```

### 2. SSH into FastComet

```bash
ssh your-username@your-server.fastcomet.com
```

### 3. Deploy Commands (Copy & Paste)

```bash
# Navigate to your domain directory
cd ~/public_html

# Clone repository
git clone https://github.com/Cobel1968/cbtc-lms.git
cd cbtc-lms

# Install dependencies
npm install --production

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
NODE_ENV=production
EOF

# Edit the file with your actual keys
nano .env.local

# Build the application
npm run build

# Install PM2
npm install -g pm2

# Start the application
pm2 start npm --name "cbtc-lms" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### 4. Configure Domain

Contact FastComet support to:
- Set up reverse proxy from cobelbtc.com to localhost:3000
- Or configure Node.js hosting for your domain

### 5. Test

Visit: https://cobelbtc.com

---

## 📝 Important Notes

1. **Replace environment variables** with your actual Supabase keys
2. **Contact FastComet support** for domain configuration
3. **Install SSL certificate** for HTTPS
4. **Monitor with PM2**: `pm2 logs cbtc-lms`

---

## 🔄 Update Commands

```bash
cd ~/public_html/cbtc-lms
git pull origin main
npm install --production
npm run build
pm2 restart cbtc-lms
```

---

For detailed instructions, see `FASTCOMET_DEPLOYMENT.md`

