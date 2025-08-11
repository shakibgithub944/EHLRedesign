# Vercel Deployment Guide

This guide will help you deploy the Education Hub application to Vercel.

## Prerequisites

- A Vercel account (free at [vercel.com](https://vercel.com))
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Method 1: GitHub Integration (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project

### Step 3: Configure Build Settings
Vercel should automatically detect the settings, but verify:
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave empty)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`

### Step 4: Set Environment Variables
In your Vercel project dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add the following variables:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://www.ehlcrm.theskyroute.com/api` |

### Step 5: Deploy
Click "Deploy" and wait for the build to complete.

## Method 2: Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N** (for first deployment)
- What's your project's name? **education-hub**
- In which directory is your code located? **.**

### Step 4: Set Environment Variables
```bash
vercel env add VITE_API_URL
```
Enter: `https://www.ehlcrm.theskyroute.com/api`

### Step 5: Redeploy with Environment Variables
```bash
vercel --prod
```

## Configuration Files

The project includes these Vercel-specific files:

### `vercel.json`
- Configures build settings
- Sets up SPA routing
- Handles static assets
- Maps environment variables

### `.vercelignore`
- Excludes unnecessary files from deployment
- Reduces deployment size and time

## Post-Deployment

### Custom Domain (Optional)
1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Configure DNS records as instructed

### Environment Variables Management
- Production: Set in Vercel dashboard
- Preview: Automatically inherits from production
- Development: Use local `.env` file

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Redeploy after adding new variables
- Check variable names match exactly

### Routing Issues
- Verify `vercel.json` routing configuration
- Check that all routes redirect to `index.html`

### API Calls Failing
- Verify `VITE_API_URL` is set correctly
- Check CORS settings on API server
- Test API endpoints directly

## Automatic Deployments

Once connected to GitHub:
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests
- **Development**: Use `vercel dev` for local development

## Performance Optimization

The deployment includes:
- ✅ Static asset optimization
- ✅ Gzip compression
- ✅ CDN distribution
- ✅ Automatic HTTPS
- ✅ Image optimization (for supported formats)

## Monitoring

Monitor your deployment:
- **Analytics**: Available in Vercel dashboard
- **Performance**: Web Vitals tracking
- **Logs**: Real-time function logs
- **Errors**: Automatic error tracking

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Test locally with `npm run build && npm run preview`
4. Contact Vercel support if needed
