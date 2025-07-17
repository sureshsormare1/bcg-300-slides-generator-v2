# GitHub Setup Guide - Personal Access Token Authentication

## 🔐 Why Personal Access Token (PAT)?

GitHub removed password authentication on August 13, 2021. You now need to use a Personal Access Token (PAT) instead of your password for Git operations.

## 📋 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in with your account (`sureshsormare1`)
2. Click the "+" icon in the top right → "New repository"
3. Repository settings:
   - **Repository name**: `bcg-300-slides-generator`
   - **Description**: `BCG-level 297-slide presentation generator with professional styling and 0% deviation from structure`
   - **Visibility**: Public (recommended) or Private
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** check "Add .gitignore" (we already have one)
   - **DO NOT** check "Choose a license" (we already have MIT license)
4. Click "Create repository"

### Step 2: Create Personal Access Token

1. Go to GitHub Settings:
   - Click your profile picture (top right) → "Settings"
   - Scroll down to "Developer settings" (left sidebar)
   - Click "Personal access tokens" → "Tokens (classic)"

2. Generate new token:
   - Click "Generate new token" → "Generate new token (classic)"
   - **Note**: `BCG Slides Generator - Git Operations`
   - **Expiration**: 90 days (or your preference)
   - **Scopes** - Select these permissions:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
     - ✅ `write:packages` (Upload packages to GitHub Package Registry)

3. Click "Generate token"
4. **IMPORTANT**: Copy the token immediately (it won't be shown again)
   - Format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 3: Push to GitHub Using PAT

```bash
# Navigate to project directory
cd /home/ubuntu/bcg-300-slides

# Push to GitHub (use PAT as password)
git push -u origin main
```

When prompted:
- **Username**: `sureshsormare1`
- **Password**: `[PASTE YOUR PERSONAL ACCESS TOKEN HERE]`

## 🚀 Alternative: One-Command Push

You can also embed the token in the URL (less secure but convenient):

```bash
git remote set-url origin https://sureshsormare1:[YOUR_TOKEN]@github.com/sureshsormare1/bcg-300-slides-generator.git
git push -u origin main
```

## ✅ Verification

After successful push, you should see:
```
Enumerating objects: 27, done.
Counting objects: 100% (27/27), done.
Delta compression using up to X threads
Compressing objects: 100% (25/25), done.
Writing objects: 100% (27/27), done.
Total 27 (delta 0), reused 0 (delta 0)
To https://github.com/sureshsormare1/bcg-300-slides-generator.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## 🌐 Access Your Repository

After successful push:
- **Repository URL**: https://github.com/sureshsormare1/bcg-300-slides-generator
- **Live Demo** (if GitHub Pages enabled): https://sureshsormare1.github.io/bcg-300-slides-generator/output/Paclitaxel-300-slides.html

## 🔧 Enable GitHub Pages (Optional)

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" in left sidebar
4. Under "Source":
   - Select "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"
6. Your presentation will be live at: `https://sureshsormare1.github.io/bcg-300-slides-generator/output/Paclitaxel-300-slides.html`

## 🛡️ Security Best Practices

1. **Never share your PAT** - treat it like a password
2. **Set appropriate expiration** - tokens should expire periodically
3. **Use minimal scopes** - only grant necessary permissions
4. **Regenerate if compromised** - create new token if exposed
5. **Store securely** - use password manager or secure notes

## 🆘 Troubleshooting

### Token Expired
- Generate a new token following Step 2
- Update your Git credentials

### Repository Already Exists
- Use a different repository name
- Or delete the existing repository and recreate

### Permission Denied
- Ensure your PAT has `repo` scope
- Verify you're the repository owner

### Authentication Failed
- Double-check username: `sureshsormare1`
- Ensure you're using PAT, not password
- Verify token hasn't expired

## 📞 Need Help?

If you encounter issues:
1. Check GitHub's official documentation: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
2. Verify your token permissions
3. Try regenerating the token
4. Ensure repository name is available

