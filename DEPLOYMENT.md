# GitHub Pages Deployment Guide

## 🚀 How to Deploy to GitHub Pages

### Step 1: Repository Setup
1. Make sure your code is pushed to GitHub repository: `Nesma-English-study-plan`
2. The repository should be public (or GitHub Pro for private repos)

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### Step 3: Automatic Deployment
- The workflow file `.github/workflows/deploy.yml` is already configured
- Every time you push to the `main` branch, it will automatically:
  - Build the project using Vite
  - Deploy to GitHub Pages
  - Your site will be available at: `https://menoo20.github.io/Nesma-English-study-plan/`

### Step 4: Manual Deployment (Alternative)
If you prefer manual deployment:

```bash
# Build the project
npm run build

# The built files will be in the 'dist' folder
# You can then manually upload these to GitHub Pages
```

### Step 5: Verify Deployment
1. Check the **Actions** tab in your GitHub repository
2. You should see the deployment workflow running
3. Once complete, visit: `https://menoo20.github.io/Nesma-English-study-plan/`

### 📁 File Structure for GitHub Pages
```
public/
├── logo/
│   └── black-gold-sold-1.png
├── students/
│   ├── student1/
│   │   └── Asma Muazi Al Malki Corrected.pdf
│   ├── student2/
│   │   └── Khalid Hassan AlGhamdi Corrected.pdf
│   └── student3/
│       └── Mashaiel Almutairi corrections.pdf
└── vite.svg

src/
├── main.js
├── schedule.js
└── style.css

index.html
schedule.html
```

### 🔧 Important Notes
1. **PDF Files**: The PDF files in `public/students/` will be accessible online
2. **Logo**: The institute logo in `public/logo/` will display properly
3. **Static Files**: All files in the `public/` directory are served directly
4. **Responsive Design**: The website works on all devices (mobile, tablet, desktop)

### 🌐 Live Website Features
- ✅ Student management with PDF viewing
- ✅ Comprehensive A1 study plan
- ✅ Professional dashboard
- ✅ Analysis functionality for each student
- ✅ Coming soon schedule page
- ✅ Fully responsive design

### 🔄 Updating the Website
To update the website:
1. Make changes to your local files
2. Commit and push to GitHub
3. GitHub Actions will automatically rebuild and deploy
4. Changes appear live in 2-3 minutes

### 📱 Mobile Compatibility
The website is fully optimized for:
- 📱 Mobile phones
- 📟 Tablets  
- 💻 Desktop computers
- 🖥️ Large screens

### 🔗 Direct Links After Deployment
- Main Site: `https://menoo20.github.io/Nesma-English-study-plan/`
- Schedule Page: `https://menoo20.github.io/Nesma-English-study-plan/schedule.html`
- PDF Files: `https://menoo20.github.io/Nesma-English-study-plan/students/student1/[filename].pdf`
