-- ============================================
-- IMCC Career Hub - Supabase Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Database: Iligan Medical Center College Career Hub
-- ============================================

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS resume_analyses CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    student_number TEXT UNIQUE NOT NULL,
    status TEXT CHECK (status IN ('student', 'alumni')) DEFAULT 'student',
    year_level INTEGER CHECK (year_level >= 1 AND year_level <= 5),
    graduation_year INTEGER,
    program TEXT,
    college TEXT CHECK (college IN ('CBA', 'CRT', 'CMT', 'CNM', 'CCJE', 'CCS', 'CAS', 'CED', 'CHTM')),
    phone TEXT,
    linkedin_url TEXT,
    resume_url TEXT,
    role TEXT CHECK (role IN ('student', 'admin')) DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_student_number ON users(student_number);
CREATE INDEX idx_users_college ON users(college);
CREATE INDEX idx_users_status ON users(status);

-- ============================================
-- 2. JOBS TABLE
-- ============================================
CREATE TABLE jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Internship')) NOT NULL,
    salary_min INTEGER CHECK (salary_min >= 0),
    salary_max INTEGER CHECK (salary_max >= 0),
    description TEXT,
    requirements TEXT[] DEFAULT '{}',
    posted_date DATE DEFAULT CURRENT_DATE,
    deadline DATE,
    source TEXT DEFAULT 'Manual',
    apply_url TEXT,
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster job searches
CREATE INDEX idx_jobs_title ON jobs(title);
CREATE INDEX idx_jobs_company ON jobs(company);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_type ON jobs(type);
CREATE INDEX idx_jobs_posted_date ON jobs(posted_date DESC);
CREATE INDEX idx_jobs_deadline ON jobs(deadline);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
CREATE INDEX idx_jobs_tags ON jobs USING GIN(tags);

-- ============================================
-- 3. APPLICATIONS TABLE
-- ============================================
CREATE TABLE applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')) DEFAULT 'pending',
    cover_letter TEXT,
    notes TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, job_id)
);

-- Index for faster application queries
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_applied_at ON applications(applied_at DESC);

-- ============================================
-- 4. RESUME ANALYSES TABLE
-- ============================================
CREATE TABLE resume_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    resume_text TEXT NOT NULL,
    target_role TEXT,
    ats_score INTEGER CHECK (ats_score >= 0 AND ats_score <= 100),
    keyword_match INTEGER CHECK (keyword_match >= 0 AND keyword_match <= 100),
    formatting_score INTEGER CHECK (formatting_score >= 0 AND formatting_score <= 100),
    strengths TEXT[] DEFAULT '{}',
    improvements TEXT[] DEFAULT '{}',
    ai_summary TEXT,
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster resume analysis queries
CREATE INDEX idx_resume_analyses_user_id ON resume_analyses(user_id);
CREATE INDEX idx_resume_analyses_analyzed_at ON resume_analyses(analyzed_at DESC);

-- ============================================
-- 5. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. SECURITY POLICIES
-- ============================================

-- USERS TABLE POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Users can insert their own profile (during registration)
CREATE POLICY "Users can insert own profile"
    ON users FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users"
    ON users FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can update all users
CREATE POLICY "Admins can update all users"
    ON users FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- JOBS TABLE POLICIES
-- Everyone can view active jobs
CREATE POLICY "Everyone can view active jobs"
    ON jobs FOR SELECT
    USING (is_active = true);

-- Admins can view all jobs (including inactive)
CREATE POLICY "Admins can view all jobs"
    ON jobs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can insert jobs
CREATE POLICY "Admins can insert jobs"
    ON jobs FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can update jobs
CREATE POLICY "Admins can update jobs"
    ON jobs FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can delete jobs
CREATE POLICY "Admins can delete jobs"
    ON jobs FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- APPLICATIONS TABLE POLICIES
-- Users can view their own applications
CREATE POLICY "Users can view own applications"
    ON applications FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own applications
CREATE POLICY "Users can create own applications"
    ON applications FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own applications
CREATE POLICY "Users can update own applications"
    ON applications FOR UPDATE
    USING (auth.uid() = user_id);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
    ON applications FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RESUME ANALYSES TABLE POLICIES
-- Users can view their own resume analyses
CREATE POLICY "Users can view own resume analyses"
    ON resume_analyses FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own resume analyses
CREATE POLICY "Users can create own resume analyses"
    ON resume_analyses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all resume analyses
CREATE POLICY "Admins can view all resume analyses"
    ON resume_analyses FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================
-- 7. HELPER FUNCTIONS
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for jobs table
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for applications table
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. INSERT SAMPLE DATA (Optional)
-- ============================================

-- Insert sample admin user (you can modify this)
-- Note: In production, use Supabase Auth to create users
INSERT INTO users (id, email, full_name, student_number, status, college, role)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@imcc.edu.ph',
    'Dr. Maria Santos',
    'ADMIN-001',
    'alumni',
    'CCS',
    'admin'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample student user
INSERT INTO users (id, email, full_name, student_number, status, year_level, program, college, role)
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'student@imcc.edu.ph',
    'Juan Dela Cruz',
    '2024-001234',
    'student',
    4,
    'BS Computer Science',
    'CCS',
    'student'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample jobs
INSERT INTO jobs (title, company, location, type, salary_min, salary_max, description, requirements, tags) VALUES
(
    'Junior Software Developer',
    'Accenture Philippines',
    'Makati City, Metro Manila',
    'Full-time',
    25000,
    40000,
    'We are looking for a motivated Junior Software Developer to join our growing team.',
    ARRAY['BS Computer Science or IT', 'Knowledge of Java/Python', 'Good communication skills', 'Fresh graduates welcome'],
    ARRAY['CCS', 'Technology', 'Entry Level']
),
(
    'Staff Nurse',
    'Philippine General Hospital',
    'Manila, Metro Manila',
    'Full-time',
    20000,
    35000,
    'Join our nursing team providing quality patient care.',
    ARRAY['BS Nursing graduate', 'Valid PRC license', 'BLS certification', 'Compassionate and detail-oriented'],
    ARRAY['CNM', 'Healthcare', 'Licensed']
),
(
    'Medical Technologist',
    'Iligan Doctors Hospital',
    'Iligan City, Lanao del Norte',
    'Full-time',
    18000,
    30000,
    'Perform laboratory tests and analyses to support patient diagnosis.',
    ARRAY['BS Medical Technology graduate', 'Valid PRC license', 'Experience in clinical laboratory'],
    ARRAY['CMT', 'Healthcare', 'Licensed']
);

-- ============================================
-- 9. VIEWS FOR COMMON QUERIES (Optional)
-- ============================================

-- View for admin dashboard stats
CREATE OR REPLACE VIEW admin_stats AS
SELECT
    (SELECT COUNT(*) FROM users WHERE status = 'student') as total_students,
    (SELECT COUNT(*) FROM users WHERE status = 'alumni') as total_alumni,
    (SELECT COUNT(*) FROM jobs WHERE is_active = true) as active_jobs,
    (SELECT COUNT(*) FROM applications) as total_applications,
    (SELECT COUNT(*) FROM applications WHERE status = 'pending') as pending_applications,
    (SELECT COUNT(*) FROM resume_analyses) as total_resume_analyses;

-- View for user applications with job details
CREATE OR REPLACE VIEW user_applications_detail AS
SELECT
    a.id,
    a.user_id,
    a.job_id,
    a.status,
    a.applied_at,
    j.title as job_title,
    j.company as job_company,
    j.location as job_location,
    j.type as job_type
FROM applications a
JOIN jobs j ON a.job_id = j.id;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Your database is now ready to use.
--
-- Next steps:
-- 1. Get your Supabase URL and anon key from Settings > API
-- 2. Add them to your Vercel environment variables
-- 3. Uncomment the Supabase code in public/app.js
-- 4. Test the connection
-- ============================================
