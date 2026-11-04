# 🚀 ACTION PLAN - Deploy Your IMCC Career Hub

## 📋 Overview

This action plan will guide you through deploying your IMCC Career Hub in **15 minutes or less**.

---

## 🎯 Choose Your Path

### Path A: Quick Deploy (5 minutes)
**Without database** - Uses demo data + Jooble jobs + Groq AI

### Path B: Full Deploy (15 minutes)
**With database** - Complete Supabase integration

**Recommendation:** Start with Path A, then add Path B later if needed.

---

## 🅰️ PATH A: Quick Deploy (5 Minutes)

### Step 1: Copy Files (2 minutes)

1. Open your IDE (VS Code, WebStorm, etc.)
2. Create new project folder: `imcc-career-hub`
3. Open `COMPLETE_FILE_LISTING.md`
4. Copy each file into your IDE:
   - `index.html`
   - `.env` (your API keys - NEVER commit!)
   - `.env.example` (template - safe to commit)
   - `.gitignore` (protects your secrets)
   - `public/app.js`
   - `public/styles.css`
   - `public/supabase-client.js`
   - `api/ai.js`
   - `api/jooble.js`
   - `api/cron/refresh-jobs.js`
   - `vercel.json`
   - `package.json`

### Step 2: Get API Keys (2 minutes)

**Jooble API Key:**
1. Go to: https://jooble.org/api/about
2. Fill out the form
3. Receive key via email
4. Copy the key

**Groq API Key:**
1. Go to: https://console.groq.com/keys
2. Sign up with GitHub/Google
3. Click "Create API Key"
4. Copy the key (starts with `gsk_`)

**Generate Cron Secret:**
```bash
# Option 1: Use OpenSSL
openssl rand -hex 32

# Option 2: Use any random string
# Example: imcc_cron_2025_secret_xyz123abc456def789
```

### Step 3: Set Up Environment Variables (1 minute)

1. Open `.env` file in your IDE
2. Fill in your API keys:
   ```env
   JOOBLE_API_KEY=your_actual_jooble_key_here
   GROQ_API_KEY=gsk_your_actual_groq_key_here
   CRON_SECRET=your_random_secret_string_here
   ```
3. Save the file
4. Verify `.env` is in `.gitignore` (it should be)
5. ✅ Your secrets are secure!

### Step 4: Deploy to Vercel (1 minute)

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `imcc-career-hub` repository
5. Add environment variables:
   ```
   JOOBLE_API_KEY = your_jooble_key
   GROQ_API_KEY = gsk_your_groq_key
   CRON_SECRET = imcc_cron_2025_secret_xyz123
   ```
6. Click "Deploy"
7. ✅ **Done!** Your site is live!

### Step 5: Test (Optional)

1. Visit your Vercel URL
2. Test login: `admin@imcc.edu.ph` / any password
3. Browse jobs
4. Test resume analyzer
5. ✅ Everything works!

---

## 🅱️ PATH B: Full Deploy with Database (15 Minutes)

### Step 1: Complete Path A First (5 minutes)
Follow all steps in Path A above.

### Step 2: Create Supabase Project (3 minutes)

1. Go to: https://supabase.com
2. Sign in with GitHub
3. Click "New Project"
4. Fill in:
   - **Name**: `IMCC Career Hub`
   - **Password**: (save this!)
   - **Region**: Singapore or Tokyo
   - **Pricing**: Free
5. Click "Create new project"
6. Wait 2-3 minutes

### Step 3: Run Database Schema (2 minutes)

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Open `supabase-schema.sql` from your project
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click "Run" (or Ctrl+Enter)
7. ✅ Tables created!

### Step 4: Create Storage Bucket (1 minute)

1. Go to **Storage** (left sidebar)
2. Click "New bucket"
3. Name: `resumes`
4. Toggle "Public bucket" ON
5. Click "Create bucket"

### Step 5: Get Supabase Credentials (1 minute)

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

### Step 6: Add to Vercel (1 minute)

1. Go to Vercel project → Settings → Environment Variables
2. Add:
   ```
   SUPABASE_URL = https://xxxxx.supabase.co
   SUPABASE_ANON_KEY = eyJhbGc...
   ```
3. Click "Save"

### Step 7: Enable Supabase in Code (2 minutes)

**In `index.html`**, add before `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-client.js"></script>
```

**In `public/app.js`**, find line ~1226 and uncomment:
```javascript
// Supabase Client Setup - ENABLED
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase connected!');
    window.supabaseClient = supabase;
}
```

### Step 8: Redeploy (1 minute)

```bash
vercel --prod
```

### Step 9: Test Database (2 minutes)

1. Open browser console (F12)
2. Run: `console.log(window.supabaseClient)`
3. Should show Supabase client object
4. Test login with real Supabase users
5. ✅ Database connected!

---

## ✅ Verification Checklist

### After Path A:
- [ ] Site loads at Vercel URL
- [ ] Can login with demo credentials
- [ ] Jobs page shows Jooble jobs
- [ ] Resume analyzer works (Groq AI)
- [ ] Mobile responsive

### After Path B:
- [ ] Supabase client initialized
- [ ] Can create real users
- [ ] Data persists in database
- [ ] Resume uploads work
- [ ] Applications tracked

---

## 🎯 What You Get

### Path A (Quick):
- ✅ Live website
- ✅ Real-time jobs from Jooble
- ✅ AI features (Groq)
- ✅ Demo mode (mock data)
- ✅ **Time: 5 minutes**
- ✅ **Cost: $0**

### Path B (Full):
- ✅ Everything in Path A
- ✅ Real database (Supabase)
- ✅ User authentication
- ✅ Data persistence
- ✅ File storage
- ✅ **Time: 15 minutes**
- ✅ **Cost: $0**

---

## 🔧 Troubleshooting

### "Site not loading"
→ Check Vercel deployment logs
→ Verify all files are copied correctly

### "API not working"
→ Check environment variables in Vercel
→ Verify API keys are correct

### "Database not connecting"
→ Check SUPABASE_URL and SUPABASE_ANON_KEY
→ Verify SQL schema was run
→ Check browser console for errors

### "Jobs not showing"
→ Check JOOBLE_API_KEY
→ Test Jooble API directly
→ Check Vercel function logs

---

## 📚 Need Help?

### Documentation:
- **Quick Start**: `SUPABASE_QUICK_START.md`
- **Full Guide**: `SUPABASE_SETUP_GUIDE.md`
- **API Setup**: `JOOBLE_GROQ_SETUP.md`
- **All Files**: `COMPLETE_FILE_LISTING.md`
- **Summary**: `FINAL_SUMMARY.md`

### External Resources:
- **Supabase**: https://supabase.com/docs
- **Groq**: https://console.groq.com/docs
- **Jooble**: https://jooble.org/api/about
- **Vercel**: https://vercel.com/docs

---

## 🎉 You're Ready!

### Quick Start Command:
```bash
# 1. Copy files from COMPLETE_FILE_LISTING.md
# 2. Get API keys (Jooble + Groq)
# 3. Add to Vercel
# 4. Deploy
vercel --prod
```

### Full Setup Command:
```bash
# 1. Complete Quick Start
# 2. Create Supabase project
# 3. Run supabase-schema.sql
# 4. Add Supabase credentials
# 5. Enable in code
# 6. Redeploy
vercel --prod
```

---

## 📞 Quick Reference

### Demo Login:
- **Admin**: `admin@imcc.edu.ph` / any password
- **Student**: `student@imcc.edu.ph` / any password

### Environment Variables:
```bash
JOOBLE_API_KEY=your_key
GROQ_API_KEY=gsk_your_key
CRON_SECRET=random_string
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
```

### Useful Links:
- **Jooble API**: https://jooble.org/api/about
- **Groq Console**: https://console.groq.com/keys
- **Supabase**: https://supabase.com
- **Vercel**: https://vercel.com

---

## 🚀 Launch!

**You're ready to launch your IMCC Career Hub!**

### Next Steps:
1. ✅ Follow Path A or Path B
2. ✅ Deploy to Vercel
3. ✅ Share with IMCC students
4. ✅ Help them find jobs!

---

**Good luck!** 🎓✨

Your IMCC Career Hub will make a real difference in students' careers!
