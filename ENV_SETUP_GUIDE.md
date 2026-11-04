# 🔐 Environment Variables Setup Guide

## Overview

This guide explains how to set up and manage your API keys and secrets using `.env` files.

---

## 📁 Files Created

### 1. `.env` (Your Actual Secrets)
- Contains your real API keys
- **NEVER commit this to Git**
- Already excluded in `.gitignore`
- Only exists on your local machine

### 2. `.env.example` (Template)
- Shows what variables are needed
- Safe to commit to Git
- No actual secrets
- Helps other developers know what's needed

### 3. `.gitignore` (Security)
- Excludes `.env` from Git
- Includes `.env.example` in Git
- Protects your secrets

---

## 🚀 Quick Setup (2 Minutes)

### Step 1: Copy Template
```bash
# Copy the template to create your .env file
cp .env.example .env
```

### Step 2: Get Your API Keys

#### Jooble API Key
1. Go to: https://jooble.org/api/about
2. Fill out the form
3. Receive key via email
4. Copy the key

#### Groq API Key
1. Go to: https://console.groq.com/keys
2. Sign up with GitHub/Google
3. Click "Create API Key"
4. Copy the key (starts with `gsk_`)

#### Supabase Credentials (Required for account sign-in)
1. Go to: https://supabase.com
2. Create a project
3. Go to Settings → API
4. Copy:
   - Project URL
   - anon/public key (never use the `service_role` key)

#### Generate Cron Secret
```bash
# Generate a random secret (run in terminal)
openssl rand -hex 32
# Or use any random string like: imcc_cron_2025_secret_xyz123abc
```

### Step 3: Fill in `.env`

Open `.env` and replace placeholder values:

```env
# Jooble API
JOOBLE_API_KEY=your_actual_jooble_key_here

# Groq AI
GROQ_API_KEY=gsk_your_actual_groq_key_here

# Supabase client configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_public_anon_key_here

# Cron Security
CRON_SECRET=your_random_secret_string_here
```

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Vercel project's
Environment Variables for Production, Preview, and Development, then redeploy.
The anon key is intended for browser use; never expose a Supabase `service_role` key.

### Step 4: Verify Security

```bash
# Check that .env is ignored by Git
git status
# You should NOT see .env in the list

# Check that .env.example is tracked
git status
# You SHOULD see .env.example in the list
```

---

## 📋 All Environment Variables

### Required Variables

| Variable | Purpose | Where to Get | Format |
|----------|---------|--------------|--------|
| `JOOBLE_API_KEY` | Job feed API | https://jooble.org/api/about | Alphanumeric |
| `GROQ_API_KEY` | AI features | https://console.groq.com/keys | Starts with `gsk_` |
| `CRON_SECRET` | Cron job security | Generate yourself | Random string |

### Optional Variables

| Variable | Purpose | Where to Get | Format |
|----------|---------|--------------|--------|
| `VITE_SUPABASE_URL` | Browser auth/database URL | Supabase Dashboard | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public browser key | Supabase Dashboard | Anon/public key; not `service_role` |
| `OPENAI_API_KEY` | Alternative AI | https://platform.openai.com | Starts with `sk-` |
| `GEMINI_API_KEY` | Alternative AI | https://aistudio.google.com | Starts with `AIzaSy` |

### Development Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `DEBUG` | Debug logging | `false` |

---

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Use `.env` for local development
- ✅ Use Vercel environment variables for production
- ✅ Keep `.env` in `.gitignore`
- ✅ Commit `.env.example` to show what's needed
- ✅ Use strong, random secrets for `CRON_SECRET`
- ✅ Rotate API keys periodically

### ❌ DON'T:
- ❌ Commit `.env` to Git
- ❌ Share API keys publicly
- ❌ Hardcode API keys in code
- ❌ Use weak secrets for `CRON_SECRET`
- ❌ Commit `node_modules/` to Git

---

## 🌍 Environment-Specific Configuration

### Local Development (`.env`)
```env
NODE_ENV=development
DEBUG=true
JOOBLE_API_KEY=test_key
GROQ_API_KEY=test_key
```

### Production (Vercel Dashboard)
```
NODE_ENV=production
DEBUG=false
JOOBLE_API_KEY=production_key
GROQ_API_KEY=production_key
```

### Preview/Staging (Vercel Dashboard)
```
NODE_ENV=preview
DEBUG=true
JOOBLE_API_KEY=staging_key
GROQ_API_KEY=staging_key
```

---

## 🧪 Testing Your Configuration

### Test 1: Check .env is Loaded
```bash
# In your terminal
cat .env
# Should show your actual keys
```

### Test 2: Check .env is Ignored
```bash
git status
# Should NOT show .env
# Should show .env.example
```

### Test 3: Test API Keys
```javascript
// In browser console
console.log('Jooble:', process.env.JOOBLE_API_KEY);
console.log('Groq:', process.env.GROQ_API_KEY);
```

### Test 4: Test Cron Secret
```bash
# Test cron job authentication
curl -H "Authorization: Bearer your_cron_secret" \
  https://your-site.vercel.app/api/cron/refresh-jobs
```

---

## 🔄 Updating API Keys

### Local Development
1. Open `.env`
2. Update the key
3. Restart your dev server
4. Test the feature

### Production (Vercel)
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Update the variable
5. Redeploy: `vercel --prod`

---

## 📚 Using Environment Variables in Code

### In API Functions (Server-side)
```javascript
// api/ai.js
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  return res.status(500).json({ error: 'API key not configured' });
}
```

### In Frontend (Client-side)
```javascript
// public/app.js
// Note: Frontend can't access .env directly
// Use API endpoints instead
const response = await fetch('/api/ai', {
  method: 'POST',
  body: JSON.stringify({ action: 'analyzeResume', data: {...} })
});
```

---

## 🛠️ Troubleshooting

### Issue: "API key not configured"
**Solution:**
1. Check `.env` file exists
2. Verify key is not empty
3. Restart dev server
4. Check for typos

### Issue: ".env committed to Git"
**Solution:**
```bash
# Remove from Git history
git rm --cached .env
git commit -m "Remove .env from tracking"
# Verify .gitignore is correct
```

### Issue: "Cron job unauthorized"
**Solution:**
1. Check `CRON_SECRET` in `.env`
2. Verify same secret in Vercel
3. Test with curl command

### Issue: "Supabase not connecting"
**Solution:**
1. Check `VITE_SUPABASE_URL` format
2. Verify `VITE_SUPABASE_ANON_KEY` is the anon/public key
3. Check Supabase project is active

---

## 📖 Additional Resources

### Environment Variables Documentation
- **Vercel Env Vars**: https://vercel.com/docs/concepts/projects/environment-variables
- **Node.js dotenv**: https://www.npmjs.com/package/dotenv
- **Security Best Practices**: https://owasp.org/www-community/vulnerabilities/Information_exposure_through_query_strings_in_url

### API Key Management
- **Jooble API**: https://jooble.org/api/about
- **Groq Console**: https://console.groq.com/keys
- **Supabase API**: https://supabase.com/docs/guides/api

---

## ✅ Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Get Jooble API key
- [ ] Get Groq API key
- [ ] Generate CRON_SECRET
- [ ] Fill in all values in `.env`
- [ ] Verify `.env` is in `.gitignore`
- [ ] Verify `.env.example` is tracked
- [ ] Test API keys work
- [ ] Add same variables to Vercel
- [ ] Redeploy to production

---

## 🎯 Summary

### What You Have:
- ✅ `.env` - Your actual secrets (local only)
- ✅ `.env.example` - Template for others
- ✅ `.gitignore` - Protects your secrets

### What You Need to Do:
1. Get API keys (Jooble, Groq)
2. Fill in `.env`
3. Add to Vercel environment variables
4. Deploy

### Security:
- ✅ Secrets never committed to Git
- ✅ Template file shows what's needed
- ✅ Production uses Vercel env vars
- ✅ Local uses `.env` file

---

## 🚀 Quick Commands

```bash
# Create .env from template
cp .env.example .env

# Edit .env
nano .env  # or use your favorite editor

# Check Git status
git status

# Verify .env is ignored
git check-ignore .env

# Deploy with new env vars
vercel --prod
```

---

**Your environment variables are now secure!** 🔐

Remember:
- `.env` = Your secrets (never commit)
- `.env.example` = Template (safe to commit)
- Vercel = Production environment variables

**Need help?** Check the troubleshooting section above or refer to the API-specific setup guides.
