# FastComet Deployment Guide for cobelbtc.com

## 🎯 Your Setup
- **Domain**: cobelbtc.com
- **Hosting**: FastComet
- **Application**: Next.js 14 with Supabase
- **Repository**: https://github.com/Cobel1968/cbtc-lms

---

## 📋 Pre-Deployment Checklist

### 1. FastComet Requirements
- [ ] SSH access enabled in FastComet cPanel
- [ ] Node.js 18+ installed (check with `node -v`)
- [ ] Git installed (check with `git --version`)
- [ ] Domain `cobelbtc.com` configured in FastComet

### 2. Supabase Configuration
- [ ] Get your Supabase keys from: https://app.supabase.com/project/rvlcpygatguvxhuliand/settings/api
- [ ] Verify all 9 database tables exist
- [ ] Test Supabase connection locally

---

## 🚀 Step-by-Step Deployment

### Step 1: Access Your FastComet Server

**Option A: Via cPanel File Manager**
1. Log into FastComet cPanel
2. Navigate to File Manager
3. Go to `public_html` or your domain directory

**Option B: Via SSH (Recommended)**
1. Get SSH credentials from FastComet cPanel
2. Connect via SSH:
   ```bash
   ssh username@your-server.fastcomet.com
   # Or use your specific SSH hostname
   ```

### Step 2: Navigate to Your Domain Directory

```bash
# Navigate to your domain's public directory
cd ~/public_html
# OR if you have a specific domain folder:
cd ~/domains/cobelbtc.com/public_html
```

### Step 3: Clone Your Repository

```bash
# Clone the repository
git clone https://github.com/Cobel1968/cbtc-lms.git

# Navigate into the project
cd cbtc-lms
```

### Step 4: Install Dependencies

```bash
# Install Node.js dependencies
npm install --production

# If you get errors, try:
npm install --legacy-peer-deps
```

### Step 5: Create Environment File

```bash
# Create .env.local file
nano .env.local
```

**Add these variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://rvlcpygatguvxhuliand.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NODE_ENV=production
```

**Save the file:**
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

### Step 6: Build the Application

```bash
# Build the Next.js application
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

### Step 7: Install PM2 (Process Manager)

PM2 keeps your application running and restarts it if it crashes.

```bash
# Install PM2 globally
npm install -g pm2

# Verify installation
pm2 --version
```

### Step 8: Start the Application

```bash
# Start the application with PM2
pm2 start npm --name "cbtc-lms" -- start

# Check status
pm2 status

# View logs
pm2 logs cbtc-lms
```

### Step 9: Configure PM2 Auto-Start

```bash
# Save PM2 configuration
pm2 save

# Generate startup script
pm2 startup

# Follow the instructions it provides (usually involves running a sudo command)
```

### Step 10: Configure FastComet/Nginx

Since Next.js runs on port 3000, you need to configure your web server.

**Option A: Using FastComet's Node.js App Manager (if available)**
1. Go to FastComet cPanel
2. Look for "Node.js" or "Node.js Selector"
3. Create a new Node.js app
4. Point it to your `cbtc-lms` directory
5. Set startup file: `server.js` or use PM2

**Option B: Configure Reverse Proxy (Nginx)**

If you have access to Nginx configuration:

```nginx
server {
    listen 80;
    server_name cobelbtc.com www.cobelbtc.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Option C: Contact FastComet Support**
If you don't have access to Nginx, contact FastComet support and ask them to:
- Set up a reverse proxy from your domain to `localhost:3000`
- Or configure Node.js hosting for your domain

### Step 11: Set Up SSL/HTTPS

1. Go to FastComet cPanel
2. Find "SSL/TLS" or "Let's Encrypt"
3. Install SSL certificate for `cobelbtc.com`
4. Force HTTPS redirect

---

## 🔄 Updating Your Application

When you push updates to GitHub:

```bash
# SSH into your server
cd ~/public_html/cbtc-lms

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install --production

# Rebuild
npm run build

# Restart PM2
pm2 restart cbtc-lms
```

---

## 📊 Monitoring & Maintenance

### Check Application Status

```bash
# View PM2 status
pm2 status

# View logs
pm2 logs cbtc-lms

# View real-time logs
pm2 logs cbtc-lms --lines 50
```

### Restart Application

```bash
pm2 restart cbtc-lms
```

### Stop Application

```bash
pm2 stop cbtc-lms
```

### Delete Application from PM2

```bash
pm2 delete cbtc-lms
```

---

## 🔧 Troubleshooting

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process or use a different port
# Edit package.json scripts to use different port:
# "start": "next start -p 3001"
```

### Issue: "Build fails"

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Issue: "Application not accessible"

**Check:**
1. Is PM2 running? `pm2 status`
2. Is the app listening on port 3000? `netstat -tulpn | grep 3000`
3. Are firewall rules correct?
4. Is reverse proxy configured?

### Issue: "Supabase connection fails"

**Check:**
1. Environment variables are set: `cat .env.local`
2. Supabase project is active
3. API keys are correct
4. Network/firewall allows outbound connections

---

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env.local`
2. **PM2**: Use PM2 ecosystem file for production config
3. **Firewall**: Only expose necessary ports
4. **SSL**: Always use HTTPS in production
5. **Updates**: Keep Node.js and dependencies updated

### Create PM2 Ecosystem File

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'cbtc-lms',
    script: 'npm',
    args: 'start',
    cwd: '/home/username/public_html/cbtc-lms',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

Then start with:
```bash
pm2 start ecosystem.config.js
```

---

## 📝 FastComet-Specific Notes

### Node.js Version

Check your Node.js version:
```bash
node -v
```

If it's not 18+, you may need to:
1. Use FastComet's Node.js Selector in cPanel
2. Or contact support to update Node.js

### Memory Limits

FastComet shared hosting may have memory limits. If you encounter issues:
- Monitor memory usage: `pm2 monit`
- Consider upgrading hosting plan if needed

### File Permissions

Ensure proper permissions:
```bash
chmod 755 ~/public_html/cbtc-lms
chmod 644 ~/public_html/cbtc-lms/.env.local
```

---

## ✅ Post-Deployment Verification

After deployment, test:

1. **Homepage**: https://cobelbtc.com
2. **All Pages**: 
   - https://cobelbtc.com/courses
   - https://cobelbtc.com/about
   - https://cobelbtc.com/contact
   - https://cobelbtc.com/diagnostic
   - https://cobelbtc.com/cart
3. **Supabase Connection**: Check browser console
4. **API Health**: https://cobelbtc.com/api/health
5. **Responsive Design**: Test on mobile
6. **Cart Functionality**: Add items, checkout
7. **Language Switching**: FR/EN toggle

---

## 📞 Support Contacts

- **FastComet Support**: https://www.fastcomet.com/support
- **Supabase Support**: https://supabase.com/support
- **Your Supabase Project**: https://app.supabase.com/project/rvlcpygatguvxhuliand

---

## 🎯 Quick Reference Commands

```bash
# Navigate to project
cd ~/public_html/cbtc-lms

# Pull updates
git pull origin main

# Rebuild
npm run build

# Restart
pm2 restart cbtc-lms

# View logs
pm2 logs cbtc-lms

# Check status
pm2 status
```

---

**Your application will be live at: https://cobelbtc.com 🚀**

