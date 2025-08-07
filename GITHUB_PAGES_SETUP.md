# Quick Setup Script for GitHub Pages

## 🚀 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to: https://github.com/menoo20/Nesma-English-study-plan/settings/pages
2. Under "Source", select "GitHub Actions"
3. Save

### 3. Wait for Deployment
- Check: https://github.com/menoo20/Nesma-English-study-plan/actions
- Site will be live at: https://menoo20.github.io/Nesma-English-study-plan/

### 4. Test Build Locally (Optional)
```bash
npm run build
npm run preview
```

## ✅ What's Included for GitHub Pages:
- ✅ Automatic build with Vite
- ✅ All PDF files will be accessible
- ✅ Logo and images will display
- ✅ Responsive design works on all devices
- ✅ Student data and analysis features
- ✅ Professional styling and layout

## 📱 Mobile-Ready Features:
- Dashboard with student cards
- PDF viewer for test results
- Analysis modals for each student
- Study plan with weekly breakdown
- Coming soon schedule page

## 🔄 Auto-Deployment:
Every push to `main` branch automatically:
1. Builds the project
2. Deploys to GitHub Pages
3. Updates the live site

**Live URL:** https://menoo20.github.io/Nesma-English-study-plan/
