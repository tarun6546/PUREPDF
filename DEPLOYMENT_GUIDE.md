# 🚀 PUREPDF Deployment Guide for Vercel

## Prerequisites

- Git installed on your system
- GitHub account
- Vercel account (free)

## 📁 Project Structure

```
PUREPDF/
├── Frontend/           # React + Vite Frontend
└── Backend/           # Node.js + Express Backend
```

## 🔧 Step-by-Step Deployment

### 1. **Prepare Git Repository**

```bash
# Navigate to your project root
cd d:\Resume-Projects\PUREPDF

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - PUREPDF Word to PDF Converter"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/tarun6546/PUREPDF.git

# Push to GitHub
git push -u origin main
```

### 2. **Deploy Backend on Vercel**

1. **Go to [vercel.com](https://vercel.com) and login**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure for Backend:**

   - **Root Directory**: `Backend`
   - **Framework**: `Other`
   - **Build Command**: `npm install`
   - **Output Directory**: `.`
   - **Install Command**: `npm install`

5. **Environment Variables** (if needed):

   - Add any environment variables your backend needs

6. **Deploy** - Vercel will give you a URL like: `https://your-backend-name.vercel.app`

### 3. **Deploy Frontend on Vercel**

1. **Create another project on Vercel**
2. **Import the same GitHub repository**
3. **Configure for Frontend:**

   - **Root Directory**: `Frontend`
   - **Framework**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables:**

   - `VITE_API_URL` = `https://your-backend-name.vercel.app`

5. **Deploy** - You'll get a URL like: `https://your-frontend-name.vercel.app`

### 4. **Update Environment Variables**

After getting your backend URL, update the Frontend's environment variable:

- Go to Vercel Dashboard → Your Frontend Project → Settings → Environment Variables
- Update `VITE_API_URL` with your actual backend URL
- Redeploy the frontend

## 🔄 Alternative: Single Repository Deployment

You can also deploy both as separate projects from the same repo by specifying different root directories.

## 📝 Important Notes

1. **Backend Limitations on Vercel:**

   - Serverless functions have execution time limits
   - File storage is temporary (use cloud storage for production)
   - Consider using Vercel's blob storage for files

2. **Frontend Considerations:**

   - All environment variables must start with `VITE_`
   - Build process will replace environment variables at build time

3. **CORS Configuration:**
   - Make sure your backend accepts requests from your frontend domain
   - Update CORS settings in your backend if needed

## 🛠 Troubleshooting

### Common Issues:

1. **Build fails**: Check package.json scripts
2. **API calls fail**: Verify environment variables
3. **File upload issues**: Check file size limits on Vercel

### Deployment Commands Reference:

```bash
# Frontend build test
cd Frontend && npm run build

# Backend start test
cd Backend && npm start
```

## 📱 Final Result

- **Frontend**: Beautiful responsive UI for file conversion
- **Backend**: API endpoints for Word to PDF conversion
- **Both deployed**: Fully functional on Vercel with custom domains

---

**Created by: Tarun Varshney**
**Project: PUREPDF - Word to PDF Converter**
