// ============================================
// Supabase Client & Database Functions
// ============================================
// This file handles all Supabase database operations
// The build injects the Supabase URL and public anon key from environment variables.
// ============================================

// Initialize Supabase Client
let supabase = null;

function initSupabase(url, anonKey) {
    if (typeof window.supabase === 'undefined') {
        console.error('Supabase library not loaded.');
        return false;
    }

    if (!url || !anonKey) {
        console.warn('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
        return false;
    }

    supabase = window.supabase.createClient(url, anonKey);
    console.log('✅ Supabase initialized successfully');
    return true;
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Sign up new user
async function signUp(email, password, userData) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: userData
        }
    });

    if (error) {
        console.error('Sign up error:', error);
        return { error: error.message };
    }

    return { data, error: null };
}

// Sign in user
async function signIn(email, password) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error('Sign in error:', error);
        return { error: error.message };
    }

    return { data, error: null };
}

async function signInWithGoogle() {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin
        }
    });

    if (error) {
        console.error('Google sign-in error:', error);
        return { error: error.message };
    }

    return { data, error: null };
}

// Sign out user
async function signOut() {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Sign out error:', error);
        return { error: error.message };
    }

    return { error: null };
}

// Get current user
async function getCurrentUser() {
    if (!supabase) return null;

    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Get session error:', error);
        return null;
    }
    return data.session?.user || null;
}

// Get user profile from database
async function getUserProfile(userId) {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Get profile error:', error);
        return null;
    }

    return data;
}

async function ensureUserProfile(authUser) {
    if (!supabase) return { data: null, error: 'Supabase is not initialized.' };

    const { data: existingProfile, error: lookupError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

    if (lookupError) return { data: null, error: lookupError.message };
    if (existingProfile) return { data: existingProfile, error: null };

    const metadata = authUser.user_metadata || {};
    if (!metadata.full_name || !metadata.student_number || !metadata.college) {
        return {
            data: null,
            error: null,
            needsProfile: true
        };
    }

    const profile = {
        id: authUser.id,
        email: authUser.email,
        full_name: metadata.full_name,
        student_number: metadata.student_number,
        status: metadata.status || 'student',
        year_level: metadata.year_level || null,
        graduation_year: metadata.graduation_year || null,
        program: metadata.program || null,
        college: metadata.college,
        role: 'student'
    };

    const { data, error } = await supabase
        .from('users')
        .upsert(profile, { onConflict: 'id' })
        .select()
        .single();

    if (error) return { data: null, error: error.message };
    return { data, error: null };
}

async function completeUserProfile(authUser, profileData) {
    if (!supabase) return { data: null, error: 'Supabase is not initialized.' };

    const profile = {
        id: authUser.id,
        email: authUser.email,
        full_name: profileData.full_name,
        student_number: profileData.student_number,
        status: profileData.status,
        year_level: profileData.status === 'student' ? profileData.year_level : null,
        graduation_year: profileData.status === 'alumni' ? profileData.graduation_year : null,
        program: profileData.program,
        college: profileData.college,
        role: 'student'
    };

    const { data, error } = await supabase
        .from('users')
        .upsert(profile, { onConflict: 'id' })
        .select()
        .single();

    if (error) {
        console.error('Complete profile error:', error);
        return { data: null, error: error.message };
    }

    return { data, error: null };
}

// ============================================
// USER PROFILE FUNCTIONS
// ============================================

// Update user profile
async function updateUserProfile(userId, updates) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select();

    if (error) {
        console.error('Update profile error:', error);
        return { error: error.message };
    }

    return { data: data[0], error: null };
}

// Upload resume to Supabase Storage
async function uploadResume(userId, file) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

    if (uploadError) {
        console.error('Upload error:', uploadError);
        return { error: uploadError.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

    // Update user profile with resume URL
    const { error: updateError } = await supabase
        .from('users')
        .update({ resume_url: publicUrl })
        .eq('id', userId);

    if (updateError) {
        console.error('Update resume URL error:', updateError);
        return { error: updateError.message };
    }

    return { data: { url: publicUrl }, error: null };
}

// ============================================
// JOB FUNCTIONS
// ============================================

// Fetch all active jobs
async function fetchJobs(filters = {}) {
    if (!supabase) return [];

    let query = supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('posted_date', { ascending: false });

    // Apply filters
    if (filters.college) {
        query = query.contains('tags', [filters.college]);
    }
    if (filters.type) {
        query = query.eq('type', filters.type);
    }
    if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Fetch jobs error:', error);
        return [];
    }

    return data || [];
}

// Fetch single job by ID
async function fetchJobById(jobId) {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

    if (error) {
        console.error('Fetch job error:', error);
        return null;
    }

    return data;
}

// Create new job (admin only)
async function createJob(jobData) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select();

    if (error) {
        console.error('Create job error:', error);
        return { error: error.message };
    }

    return { data: data[0], error: null };
}

// Update job (admin only)
async function updateJob(jobId, updates) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase
        .from('jobs')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', jobId)
        .select();

    if (error) {
        console.error('Update job error:', error);
        return { error: error.message };
    }

    return { data: data[0], error: null };
}

// Deactivate job (soft delete)
async function deactivateJob(jobId) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { error } = await supabase
        .from('jobs')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', jobId);

    if (error) {
        console.error('Deactivate job error:', error);
        return { error: error.message };
    }

    return { error: null };
}

// ============================================
// APPLICATION FUNCTIONS
// ============================================

// Submit job application
async function submitApplication(userId, jobId, coverLetter = null) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase
        .from('applications')
        .insert({
            user_id: userId,
            job_id: jobId,
            cover_letter: coverLetter,
            status: 'pending'
        })
        .select();

    if (error) {
        console.error('Submit application error:', error);
        return { error: error.message };
    }

    return { data: data[0], error: null };
}

// Get user's applications
async function getUserApplications(userId) {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('user_applications_detail')
        .select('*')
        .eq('user_id', userId)
        .order('applied_at', { ascending: false });

    if (error) {
        console.error('Get applications error:', error);
        return [];
    }

    return data || [];
}

// Update application status (admin only)
async function updateApplicationStatus(applicationId, status) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase
        .from('applications')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', applicationId)
        .select();

    if (error) {
        console.error('Update application error:', error);
        return { error: error.message };
    }

    return { data: data[0], error: null };
}

// ============================================
// RESUME ANALYSIS FUNCTIONS
// ============================================

// Save resume analysis
async function saveResumeAnalysis(userId, analysis) {
    if (!supabase) return { error: 'Supabase not initialized' };

    const { data, error } = await supabase
        .from('resume_analyses')
        .insert({
            user_id: userId,
            resume_text: analysis.resumeText,
            target_role: analysis.targetRole,
            ats_score: analysis.ats_score,
            keyword_match: analysis.keyword_match,
            formatting_score: analysis.formatting_score,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            ai_summary: analysis.ai_summary
        })
        .select();

    if (error) {
        console.error('Save analysis error:', error);
        return { error: error.message };
    }

    return { data: data[0], error: null };
}

// Get user's resume analyses
async function getUserResumeAnalyses(userId) {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('resume_analyses')
        .select('*')
        .eq('user_id', userId)
        .order('analyzed_at', { ascending: false });

    if (error) {
        console.error('Get analyses error:', error);
        return [];
    }

    return data || [];
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

// Get admin dashboard stats
async function getAdminStats() {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('admin_stats')
        .select('*')
        .single();

    if (error) {
        console.error('Get stats error:', error);
        return null;
    }

    return data;
}

// Get all users (admin only)
async function getAllUsers(filters = {}) {
    if (!supabase) return [];

    let query = supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters.status) {
        query = query.eq('status', filters.status);
    }
    if (filters.college) {
        query = query.eq('college', filters.college);
    }
    if (filters.search) {
        query = query.or(`full_name.ilike.%${filters.search}%,student_number.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Get users error:', error);
        return [];
    }

    return data || [];
}

// Get all applications (admin only)
async function getAllApplications(filters = {}) {
    if (!supabase) return [];

    let query = supabase
        .from('user_applications_detail')
        .select('*')
        .order('applied_at', { ascending: false });

    if (filters.status) {
        query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Get applications error:', error);
        return [];
    }

    return data || [];
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if user is admin
async function isAdmin(userId) {
    if (!supabase) return false;

    const profile = await getUserProfile(userId);
    return profile && profile.role === 'admin';
}

// Subscribe to real-time changes
function subscribeToChanges(table, callback) {
    if (!supabase) return null;

    return supabase
        .channel(`${table}-changes`)
        .on('postgres_changes',
            { event: '*', schema: 'public', table: table },
            callback
        )
        .subscribe();
}

// Unsubscribe from real-time changes
function unsubscribe(channel) {
    if (!supabase || !channel) return;
    supabase.removeChannel(channel);
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

// Make functions available globally
window.SupabaseDB = {
    init: initSupabase,

    // Auth
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    getCurrentUser,
    getUserProfile,
    ensureUserProfile,
    completeUserProfile,

    // User Profile
    updateUserProfile,
    uploadResume,

    // Jobs
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deactivateJob,

    // Applications
    submitApplication,
    getUserApplications,
    updateApplicationStatus,

    // Resume Analysis
    saveResumeAnalysis,
    getUserResumeAnalyses,

    // Admin
    getAdminStats,
    getAllUsers,
    getAllApplications,

    // Utilities
    isAdmin,
    subscribeToChanges,
    unsubscribe
};

console.log('📦 Supabase database functions loaded. Call SupabaseDB.init() to initialize.');
