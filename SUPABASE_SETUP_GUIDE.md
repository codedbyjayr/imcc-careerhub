# 🗄️ Supabase Database Integration Guide

## Overview

Your IMCC Career Hub is ready to connect to **Supabase** - a free, open-source Firebase alternative that provides:
- ✅ PostgreSQL database
- ✅ Authentication system
- ✅ File storage (for resumes)
- ✅ Real-time subscriptions
- ✅ Row Level Security (RLS)
- ✅ Free tier: 500MB database, 1GB storage, unlimited API requests

The current application uses Supabase Auth for sign-in and registration. Configure
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel and redeploy. The
anon/public key is intended for browser use; never use a `service_role` key.

---

## 📋 What's Already Set Up

### 1. Database Schema (`supabase-schema.sql`)
Complete SQL schema with 4 tables:
- **users** - Student/alumni profiles
- **jobs** - Job listings
- **applications** - Job applications tracking
- **resume_analyses** - AI resume analysis results

### 2. Database Client (`public/supabase-client.js`)
Ready-to-use functions for:
- Authentication (sign up, sign in, sign out)
- User profile management
- Job CRUD operations
- Application tracking
- Resume analysis storage
- Admin dashboard stats

### 3. Row Level Security (RLS)
Secure policies ensure:
- Students can only see/edit their own data
- Everyone can view active jobs
- Admins have full access
- Data isolation between users

---

## 🚀 Setup Instructions (15 Minutes)

### Step 1: Create Supabase Project

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign in with GitHub
4. Click **"New Project"**
5. Fill in:
   - **Name**: `IMCC Career Hub`
   - **Database Password**: (save this somewhere safe!)
   - **Region**: Choose closest to Philippines (Singapore or Tokyo)
   - **Pricing Plan**: Free (perfect for your needs!)
6. Click **"Create new project"**
7. Wait 2-3 minutes for setup

---

### Step 2: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open `supabase-schema.sql` from your project
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: ✅ "Success. No rows returned"

**What this creates:**
- 4 tables (users, jobs, applications, resume_analyses)
- All indexes for fast queries
- Row Level Security policies
- Helper functions and triggers
- Sample admin and student users
- Useful views for admin dashboard

---

### Step 3: Create Storage Bucket (for Resumes)

1. Go to **Storage** (left sidebar)
2. Click **"New bucket"**
3. Name: `resumes`
4. Toggle **"Public bucket"** ON
5. Click **"Create bucket"**

This allows students to upload their resumes.

---

### Step 4: Get Your API Credentials

1. Go to **Settings** → **API** (left sidebar)
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)

**Keep these safe!** You'll need them next.

---

### Step 5: Add to Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

```
Name: VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development

Name: VITE_SUPABASE_ANON_KEY
Value: your anon/public key (never use service_role)
Environments: ✅ Production ✅ Preview ✅ Development
```

4. Click **"Save"**
5. Redeploy the site so Vite can include these build-time settings.

---

### Step 6: Legacy instructions (do not follow)

The next sections contain older manual integration examples. The current app
already bundles the Supabase client and initializes it from Vite environment
variables. Do not add a separate CDN script, uncomment the old snippets, or
restore demo login.

---

### Step 7: Authentication behavior

The sign-in form verifies credentials with Supabase Auth. Registration saves
profile details in Auth metadata and creates the `users` profile after successful
authentication. If email confirmation is enabled, users must confirm their email
before signing in.

---

### Google sign-in setup

1. In Supabase, open **Authentication → Providers → Google** and enable Google.
2. Configure the Google OAuth client ID and secret there.
3. In Google Cloud Console, add Supabase's callback URL
   (`https://<project-ref>.supabase.co/auth/v1/callback`) as an authorized
   redirect URI for the Google OAuth client.
4. In Supabase **Authentication → URL Configuration**, set the deployed app's
   origin as the Site URL and allow that origin as a Redirect URL.

The Career Hub's **Continue with Google** button starts Supabase OAuth and
returns to the current site origin. On first sign-in, users are prompted to
complete their Career Hub profile (name, student number, status, college, and
program); that profile is saved to the `users` table before student features open.

---

### Step 8: Create real Supabase users

Create accounts through the Career Hub registration form or in the Supabase Auth
dashboard. Existing Auth users need a matching `users` profile row, or the
registration metadata required to create one at their next login.

---

### Step 9: Replace Mock Job Loading with Supabase

Find the `loadAllJobs` function in `public/app.js` (~line 350):

**Add Supabase integration:**

```javascript
async function loadAllJobs(filters = {}) {
    let jobs = [];

    // Try Supabase first
    if (window.SupabaseDB) {
        jobs = await window.SupabaseDB.fetchJobs(filters);
    }

    // Fallback to Jooble + local jobs
    if (jobs.length === 0) {
        // Fetch from Jooble
        if (joobleJobs.length === 0) {
            await fetchJoobleJobs({
                keywords: filters.search || '',
                location: 'Iligan City'
            });
        }

        // Combine Jooble + local jobs
        jobs = getAllJobs();
    }

    // Apply client-side filters
    if (filters.college) jobs = jobs.filter(j => j.tags.includes(filters.college));
    if (filters.type) jobs = jobs.filter(j => j.type === filters.type);
    if (filters.search) {
        const s = filters.search.toLowerCase();
        jobs = jobs.filter(j =>
            j.title.toLowerCase().includes(s) ||
            j.company.toLowerCase().includes(s) ||
            j.description.toLowerCase().includes(s)
        );
    }

    // Render jobs
    const list = document.getElementById('jobsList');
    const count = document.getElementById('jobsCount');

    if (jobs.length === 0) {
        list.innerHTML = '<div class="empty-state"><i class="fas fa-briefcase"></i><h3>No positions found</h3><p>Try adjusting your search or filters</p></div>';
    } else {
        list.innerHTML = jobs.map(renderJobListing).join('');
    }

    count.textContent = `${jobs.length} positions available`;
}
```

---

### Step 10: Deploy

```bash
vercel --prod
```

---

## 🧪 Testing Your Database

### Test 1: Check Connection

Open browser console (F12) and run:

```javascript
console.log(window.supabaseClient);
```

Should show: Supabase client object (not undefined)

### Test 2: Query Users

```javascript
const users = await window.SupabaseDB.getAllUsers();
console.log(users);
```

Should show: Array with sample admin and student users

### Test 3: Query Jobs

```javascript
const jobs = await window.SupabaseDB.fetchJobs();
console.log(jobs);
```

Should show: Array with 3 sample jobs

### Test 4: Test Login

1. Go to login page
2. Use: `admin@imcc.edu.ph` / `admin123`
3. Should log in successfully
4. Check console for: "✅ Supabase connected!"

---

## 📊 Database Tables Overview

### users table
Stores student and alumni profiles:
- `id` - UUID (from Supabase Auth)
- `email` - User email
- `full_name` - Full name
- `student_number` - IMCC student number
- `status` - 'student' or 'alumni'
- `year_level` - 1-5 (for students)
- `graduation_year` - Year graduated (for alumni)
- `program` - e.g., 'BS Computer Science'
- `college` - CBA, CRT, CMT, CNM, CCJE, CCS, CAS, CED, CHTM
- `phone` - Contact number
- `linkedin_url` - LinkedIn profile
- `resume_url` - Uploaded resume URL
- `role` - 'student' or 'admin'

### jobs table
Stores job listings:
- `id` - UUID
- `title` - Job title
- `company` - Company name
- `location` - Job location
- `type` - Full-time, Part-time, Contract, Internship
- `salary_min` / `salary_max` - Salary range
- `description` - Job description
- `requirements` - Array of requirements
- `posted_date` - When job was posted
- `deadline` - Application deadline
- `source` - 'Manual', 'Jooble', etc.
- `apply_url` - Application link
- `tags` - Array of tags (college codes, skills)
- `is_active` - Boolean (soft delete)

### applications table
Tracks job applications:
- `id` - UUID
- `user_id` - References users table
- `job_id` - References jobs table
- `status` - pending, reviewed, accepted, rejected
- `cover_letter` - AI-generated cover letter
- `notes` - Admin notes
- `applied_at` - Timestamp

### resume_analyses table
Stores AI resume analysis results:
- `id` - UUID
- `user_id` - References users table
- `resume_text` - Full resume text
- `target_role` - Target job role
- `ats_score` - 0-100
- `keyword_match` - 0-100
- `formatting_score` - 0-100
- `strengths` - Array of strengths
- `improvements` - Array of improvements
- `ai_summary` - AI summary text
- `analyzed_at` - Timestamp

---

## 🔐 Security Features

### Row Level Security (RLS)
All tables have RLS enabled with policies:

**users table:**
- ✅ Users can view their own profile
- ✅ Users can update their own profile
- ✅ Admins can view all users
- ✅ Admins can update all users

**jobs table:**
- ✅ Everyone can view active jobs
- ✅ Only admins can create/update/delete jobs

**applications table:**
- ✅ Users can view their own applications
- ✅ Users can create their own applications
- ✅ Admins can view all applications

**resume_analyses table:**
- ✅ Users can view their own analyses
- ✅ Users can create their own analyses
- ✅ Admins can view all analyses

---

## 💡 Usage Examples

### Create a New Job (Admin)

```javascript
const newJob = {
    title: 'Registered Nurse',
    company: 'Iligan Medical Center',
    location: 'Iligan City, Lanao del Norte',
    type: 'Full-time',
    salary_min: 20000,
    salary_max: 35000,
    description: 'Join our nursing team...',
    requirements: ['BS Nursing', 'PRC License', 'BLS Certification'],
    tags: ['CNM', 'Healthcare', 'Licensed']
};

const result = await window.SupabaseDB.createJob(newJob);
console.log('Job created:', result);
```

### Submit Job Application

```javascript
const userId = currentUser.id;
const jobId = 'job-uuid-here';
const coverLetter = 'Dear Hiring Manager...';

const result = await window.SupabaseDB.submitApplication(userId, jobId, coverLetter);
console.log('Application submitted:', result);
```

### Save Resume Analysis

```javascript
const userId = currentUser.id;
const analysis = {
    resumeText: 'JUAN DELA CRUZ...',
    targetRole: 'Software Developer',
    ats_score: 78,
    keyword_match: 72,
    formatting_score: 85,
    strengths: ['Clear education', 'Relevant skills'],
    improvements: ['Add metrics', 'Include certifications'],
    ai_summary: 'Your resume shows strong potential...'
};

const result = await window.SupabaseDB.saveResumeAnalysis(userId, analysis);
console.log('Analysis saved:', result);
```

### Get Admin Stats

```javascript
const stats = await window.SupabaseDB.getAdminStats();
console.log('Admin stats:', stats);
// { total_students: 150, total_alumni: 500, active_jobs: 45, ... }
```

---

## 🔄 Real-Time Updates (Optional)

Enable real-time updates for live data:

```javascript
// Subscribe to new job postings
const subscription = window.SupabaseDB.subscribeToChanges('jobs', (payload) => {
    console.log('New job posted:', payload.new);
    loadAllJobs(); // Refresh job list
});

// Unsubscribe when done
window.SupabaseDB.unsubscribe(subscription);
```

---

## 📈 Supabase Free Tier Limits

| Resource | Limit | Your Usage |
|----------|-------|------------|
| Database size | 500 MB | ~10 MB (plenty!) |
| Storage | 1 GB | ~100 MB (for resumes) |
| API requests | Unlimited | ✅ No limits |
| Bandwidth | 2 GB/month | ~500 MB |
| Edge functions | 500K invocations | ~10K |
| Auth users | Unlimited | ✅ No limits |

**You'll stay well within free limits!** 🎉

---

## 🛠️ Troubleshooting

### "Supabase not initialized"
**Solution:**
- Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel environment variables
- Redeploy after changing build-time environment variables
- Check browser console for errors

### "relation does not exist"
**Solution:**
- Run `supabase-schema.sql` in Supabase SQL Editor
- Check table names match exactly

### "permission denied"
**Solution:**
- Check RLS policies are enabled
- Verify user is authenticated
- Check user role in users table

### "Invalid API key"
**Solution:**
- Copy anon key (not service_role key) from Supabase
- Make sure there are no extra spaces

---

## 📚 Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **JavaScript Client**: https://supabase.com/docs/reference/javascript/introduction
- **SQL Reference**: https://supabase.com/docs/guides/database
- **RLS Guide**: https://supabase.com/docs/guides/auth/row-level-security

---

## ✅ Checklist

- [ ] Create Supabase project
- [ ] Run `supabase-schema.sql` in SQL Editor
- [ ] Create `resumes` storage bucket
- [ ] Copy Project URL and anon key
- [ ] Add `VITE_SUPABASE_URL` to Vercel
- [ ] Add `VITE_SUPABASE_ANON_KEY` to Vercel
- [ ] Set Supabase Auth site URL and redirect URLs for the deployed domain
- [ ] Create a real account and test sign-in
- [ ] Replace mock job loading with Supabase
- [ ] Test connection in browser console
- [ ] Deploy with `vercel --prod`

---

## 🎉 You're All Set!

Your IMCC Career Hub now has:
- ✅ **Real database** with PostgreSQL
- ✅ **Secure authentication** with Supabase Auth
- ✅ **File storage** for resumes
- ✅ **Row Level Security** for data protection
- ✅ **Real-time updates** (optional)
- ✅ **Free forever** (within generous limits)

**Total cost: $0/month** 🎓✨

---

## 💡 Pro Tips

1. **Backup your database**: Go to Settings → Database → Backups
2. **Monitor usage**: Check Settings → Billing → Usage
3. **Add more indexes**: If queries are slow, add indexes
4. **Use views**: Create views for complex queries (already done!)
5. **Enable 2FA**: For admin accounts in Supabase

---

**Questions?** Check the Supabase docs or the code comments in `public/supabase-client.js`
