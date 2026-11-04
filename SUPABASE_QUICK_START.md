# 🗄️ Supabase Database - Quick Start Guide

## ✅ What's Ready

Your IMCC Career Hub includes a **complete Supabase database integration**:

### Files Created:
1. **`supabase-schema.sql`** - Complete database schema (run in Supabase)
2. **`public/supabase-client.js`** - Database client with all functions
3. **`SUPABASE_SETUP_GUIDE.md`** - Detailed setup instructions
4. **`SUPABASE_QUICK_START.md`** - This quick reference

### Database Tables:
- ✅ **users** - Student/alumni profiles
- ✅ **jobs** - Job listings
- ✅ **applications** - Job applications
- ✅ **resume_analyses** - AI resume analysis results

### Features:
- ✅ Free PostgreSQL database (500MB)
- ✅ Authentication system
- ✅ File storage for resumes (1GB)
- ✅ Row Level Security (RLS)
- ✅ Real-time subscriptions
- ✅ Admin dashboard integration
- ✅ **100% FREE** - No credit card needed!

---

## 🚀 Quick Setup (10 Minutes)

### Step 1: Create Supabase Project
1. Go to **https://supabase.com**
2. Sign in with GitHub
3. Click **"New Project"**
4. Name: `IMCC Career Hub`
5. Set a strong database password
6. Region: Singapore or Tokyo (closest to PH)
7. Wait 2-3 minutes

### Step 2: Run Database Schema
1. Go to **SQL Editor** in Supabase
2. Open `supabase-schema.sql` from your project
3. Copy ALL the SQL code
4. Paste and click **"Run"**
5. ✅ Tables created!

### Step 3: Create Storage Bucket
1. Go to **Storage** → **"New bucket"**
2. Name: `resumes`
3. Toggle **"Public bucket"** ON
4. Click **"Create bucket"**

### Step 4: Get API Credentials
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

### Step 5: Add to Vercel
Go to Vercel → Settings → Environment Variables:

```
SUPABASE_URL = https://xxxxx.supabase.co
SUPABASE_ANON_KEY = eyJhbGc...
```

### Step 6: Enable in Your App

**In `index.html`**, add before `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-client.js"></script>
```

**In `public/app.js`**, uncomment the Supabase initialization code (~line 1226)

### Step 7: Deploy
```bash
vercel --prod
```

---

## 🧪 Test Your Database

Open browser console (F12) and run:

```javascript
// Test connection
console.log(window.supabaseClient);

// Query users
const users = await window.SupabaseDB.getAllUsers();
console.log(users);

// Query jobs
const jobs = await window.SupabaseDB.fetchJobs();
console.log(jobs);
```

---

## 📊 Sample Data Included

The SQL schema includes:
- **Admin user**: `admin@imcc.edu.ph` / `admin123`
- **Student user**: `student@imcc.edu.ph` / `student123`
- **3 sample jobs** from different colleges

---

## 🔐 Security

All tables have **Row Level Security (RLS)** enabled:
- ✅ Students can only see their own data
- ✅ Everyone can view active jobs
- ✅ Admins have full access
- ✅ Data is isolated between users

---

## 💡 Common Operations

### Create a Job (Admin)
```javascript
await window.SupabaseDB.createJob({
    title: 'Registered Nurse',
    company: 'Iligan Medical Center',
    location: 'Iligan City',
    type: 'Full-time',
    salary_min: 20000,
    salary_max: 35000,
    description: 'Join our team...',
    requirements: ['BS Nursing', 'PRC License'],
    tags: ['CNM', 'Healthcare']
});
```

### Submit Application
```javascript
await window.SupabaseDB.submitApplication(
    userId,
    jobId,
    coverLetter
);
```

### Save Resume Analysis
```javascript
await window.SupabaseDB.saveResumeAnalysis(userId, {
    resumeText: '...',
    ats_score: 78,
    keyword_match: 72,
    formatting_score: 85,
    strengths: ['Clear education'],
    improvements: ['Add metrics'],
    ai_summary: 'Strong resume...'
});
```

### Get Admin Stats
```javascript
const stats = await window.SupabaseDB.getAdminStats();
// { total_students: 150, active_jobs: 45, ... }
```

---

## 📈 Free Tier Limits

| Resource | Limit | Status |
|----------|-------|--------|
| Database | 500 MB | ✅ Plenty |
| Storage | 1 GB | ✅ Plenty |
| API requests | Unlimited | ✅ No limits |
| Auth users | Unlimited | ✅ No limits |

**You'll stay free forever!** 🎉

---

## 🛠️ Troubleshooting

### "Supabase not initialized"
→ Check environment variables in Vercel

### "relation does not exist"
→ Run `supabase-schema.sql` in SQL Editor

### "permission denied"
→ Check RLS policies are enabled

---

## 📚 Full Documentation

For detailed instructions, see: **`SUPABASE_SETUP_GUIDE.md`**

---

## ✅ Checklist

- [ ] Create Supabase project
- [ ] Run `supabase-schema.sql`
- [ ] Create `resumes` storage bucket
- [ ] Copy Project URL and anon key
- [ ] Add to Vercel environment variables
- [ ] Add Supabase script to index.html
- [ ] Uncomment Supabase code in app.js
- [ ] Test connection
- [ ] Deploy to production

---

## 🎯 Summary

Your database is **ready to use**! Just:
1. Create Supabase project (2 min)
2. Run SQL schema (1 min)
3. Add credentials to Vercel (1 min)
4. Deploy (1 min)

**Total time: ~5 minutes** 🚀

**Cost: $0/month** 💰

---

**Need help?** Check `SUPABASE_SETUP_GUIDE.md` for detailed instructions!
