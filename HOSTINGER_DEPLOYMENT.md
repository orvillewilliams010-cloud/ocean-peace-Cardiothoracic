# Deploying Ocean Peace Cardiothoracic Surgery to Hostinger

This website is custom built and primed specifically for **Hostinger Web Hosting** (Shared, Cloud, or WordPress Hosting plans). Follow any of the 3 simple deployment options below.

---

## Option 1: Quick Upload via Hostinger hPanel File Manager (Recommended - 2 Minutes)

1. **Log in to Hostinger hPanel**
   - Go to [hostinger.com](https://hostinger.com) and log in.
   - Navigate to **Websites** and click **Manage** next to your domain (`oceanpeacecardio.com` or your practice domain).

2. **Open File Manager**
   - Under the **Files** section, click on **File Manager**.
   - Navigate to the `public_html` directory.

3. **Upload Site Files**
   - Delete any default Hostinger placeholder files (e.g. `default.php` or `index.php`).
   - If you built a static bundle (`npm run build`), drag and drop all files from inside your local `dist/` folder into `public_html`.
   - Alternatively, drag and drop `index.html`, `public/`, `src/`, and `.htaccess` directly into `public_html`.

4. **Verify `.htaccess`**
   - Ensure `.htaccess` is uploaded inside `public_html` (enable "Show Hidden Files" in File Manager settings if `.htaccess` is hidden). This guarantees fast GZIP compression, HTTPS redirect, and clean SPA navigation.

---

## Option 2: Automatic Deployment via GitHub (Hostinger Git Integration)

1. **Push to GitHub**
   - In your workspace terminal, push this project to your GitHub account:
     ```bash
     git init
     git add .
     git commit -m "Ocean Peace Cardiothoracic Surgery initial website commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ocean-peace-surgery.git
     git push -u origin main
     ```

2. **Connect to Hostinger Git**
   - In Hostinger hPanel, go to **Advanced** → **Git**.
   - Paste your GitHub Repository URL: `https://github.com/YOUR_GITHUB_USERNAME/ocean-peace-surgery.git`
   - Set Branch: `main`
   - Set Directory: `/public_html` (or `/public_html/dist` if uploading built bundle).
   - Click **Create**.

3. **Auto-Deploy on Push**
   - Click **Deploy** to instantly deploy.
   - You can enable **Auto-Deployment** in Hostinger Git settings so every `git push` updates your live website automatically!

---

## Option 3: Upload via FTP / SFTP (FileZilla or Cyberduck)

- **Host**: `ftp.yourdomain.com` (found under Hostinger **Files** → **FTP Accounts**)
- **Username & Password**: Your Hostinger FTP credentials
- **Port**: `21` (FTP) or `22` (SFTP)
- **Target Folder**: `/public_html/`

---

## Post-Deployment Checklist

- [x] **SSL Certificate**: Activate free Unlimited SSL in Hostinger hPanel (**Security** → **SSL**).
- [x] **Custom Domain**: Point your domain DNS A Record to your Hostinger server IP.
- [x] **Test Contact Form**: Submit a test appointment request on the live site to confirm consultation workflow.
- [x] **Mobile Check**: Open the website on an iPhone / Android device to verify responsive layout.
