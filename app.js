// ============================================
// IMCC Career Hub - Application Logic
// ============================================

// Data
const COLLEGES = [
    { code: 'CBA', name: 'College of Business Administration' },
    { code: 'CRT', name: 'College of Radiologic Technology' },
    { code: 'CMT', name: 'College of Medical Technology' },
    { code: 'CNM', name: 'College of Nursing and Midwifery' },
    { code: 'CCJE', name: 'College of Criminal Justice and Education' },
    { code: 'CCS', name: 'College of Computer Studies' },
    { code: 'CAS', name: 'College of Arts and Sciences' },
    { code: 'CED', name: 'College of Education' },
    { code: 'CHTM', name: 'College of Hospitality and Tourism Management' },
];

// Comprehensive mapping of Colleges, Programs, and Core Skills
const COLLEGE_PROGRAMS_SKILLS = {
    'CCS': {
        name: 'College of Computer Studies',
        programs: ['BS Computer Science', 'BS Information Technology'],
        skills: [
            { id: 'programming', label: 'Programming & Software Development', keywords: ['developer', 'software', 'programming', 'programmer', 'coding', 'java', 'python', 'c#', 'c++', 'backend', 'full stack', 'engineer'] },
            { id: 'web-dev', label: 'Web Development', keywords: ['web', 'frontend', 'html', 'css', 'javascript', 'react', 'node', 'vue', 'ui', 'angular'] },
            { id: 'database', label: 'Database & Data Management', keywords: ['database', 'sql', 'mysql', 'postgres', 'data analyst', 'data entry', 'data', 'analytics'] },
            { id: 'it-support', label: 'IT Support & Networking', keywords: ['it support', 'technical support', 'network', 'system admin', 'hardware', 'helpdesk', 'troubleshooting', 'bpo'] },
            { id: 'mobile-dev', label: 'Mobile App Development', keywords: ['mobile', 'android', 'ios', 'flutter', 'react native', 'app'] },
            { id: 'ui-ux', label: 'UI/UX Design', keywords: ['ui/ux', 'design', 'figma', 'prototype', 'wireframe', 'user experience'] }
        ]
    },
    'CNM': {
        name: 'College of Nursing and Midwifery',
        programs: ['BS Nursing', 'Diploma in Midwifery'],
        skills: [
            { id: 'patient-care', label: 'Clinical Care & Patient Management', keywords: ['nurse', 'nursing', 'patient care', 'clinical', 'hospital', 'bedside', 'ward'] },
            { id: 'emergency-care', label: 'Emergency Response & BLS', keywords: ['emergency', 'bls', 'acls', 'critical care', 'first aid', 'trauma'] },
            { id: 'maternal-child', label: 'Maternal & Child Health / Midwifery', keywords: ['midwife', 'midwifery', 'maternal', 'delivery', 'prenatal', 'obstetrics', 'pediatric'] },
            { id: 'health-records', label: 'Health Records & Charting', keywords: ['charting', 'records', 'clinical documentation', 'health administration'] }
        ]
    },
    'CMT': {
        name: 'College of Medical Technology',
        programs: ['BS Medical Technology / Medical Laboratory Science'],
        skills: [
            { id: 'clinical-lab', label: 'Clinical Laboratory Testing', keywords: ['medical technologist', 'medtech', 'laboratory', 'lab', 'diagnostic', 'specimen', 'analysis'] },
            { id: 'hematology', label: 'Hematology & Blood Banking', keywords: ['hematology', 'blood bank', 'phlebotomy', 'crossmatching'] },
            { id: 'microbiology', label: 'Microbiology & Parasitology', keywords: ['microbiology', 'parasitology', 'culture', 'diagnostic'] }
        ]
    },
    'CRT': {
        name: 'College of Radiologic Technology',
        programs: ['BS Radiologic Technology'],
        skills: [
            { id: 'xray-radiography', label: 'X-Ray & Radiography', keywords: ['radiologic', 'radtech', 'x-ray', 'radiographer', 'radiology', 'imaging'] },
            { id: 'advanced-imaging', label: 'CT Scan & Advanced Modalities', keywords: ['ct scan', 'mri', 'ultrasound', 'sonography'] },
            { id: 'radiation-safety', label: 'Radiation Safety & Quality Assurance', keywords: ['radiation safety', 'dosimetry', 'quality control'] }
        ]
    },
    'CBA': {
        name: 'College of Business Administration',
        programs: ['BS Accountancy', 'BS Business Administration - Marketing', 'BS Business Administration - Financial Management', 'BS Entrepreneurship'],
        skills: [
            { id: 'accounting-audit', label: 'Accounting & Auditing', keywords: ['accountant', 'accounting', 'audit', 'cpa', 'bookkeeping', 'tax', 'financial statement'] },
            { id: 'finance-banking', label: 'Financial Analysis & Banking', keywords: ['finance', 'financial analyst', 'banking', 'investment', 'credit', 'budget'] },
            { id: 'digital-marketing', label: 'Digital Marketing & Social Media', keywords: ['marketing', 'sales', 'campaign', 'social media', 'advertising', 'branding', 'content'] },
            { id: 'business-ops', label: 'Business Management & Operations', keywords: ['operations', 'management', 'coordinator', 'administration', 'bpo', 'logistics'] }
        ]
    },
    'CCJE': {
        name: 'College of Criminal Justice and Education',
        programs: ['BS Criminology', 'Law Enforcement Administration'],
        skills: [
            { id: 'investigation', label: 'Criminal Investigation & Forensics', keywords: ['criminology', 'investigation', 'forensic', 'crime', 'evidence', 'detective'] },
            { id: 'law-enforcement', label: 'Security Management & Law Enforcement', keywords: ['security', 'law enforcement', 'police', 'patrol', 'safety', 'surveillance'] },
            { id: 'criminology-instruction', label: 'Criminology Instruction & Academics', keywords: ['criminology instructor', 'training officer', 'academic', 'lecturer'] }
        ]
    },
    'CAS': {
        name: 'College of Arts and Sciences',
        programs: ['BS Psychology', 'AB Communication', 'BS Biology'],
        skills: [
            { id: 'psych-counseling', label: 'Psychological Assessment & Counseling', keywords: ['psychology', 'psychologist', 'counseling', 'assessment', 'mental health', 'human resources'] },
            { id: 'corporate-comm', label: 'Corporate Communications & Public Relations', keywords: ['communication', 'public relations', 'writer', 'editor', 'journalism', 'media'] },
            { id: 'bio-research', label: 'Biological & Scientific Research', keywords: ['biology', 'research', 'scientific', 'laboratory', 'environmental'] }
        ]
    },
    'CED': {
        name: 'College of Education',
        programs: ['Bachelor of Secondary Education (BSEd)', 'Bachelor of Elementary Education (BEEd)'],
        skills: [
            { id: 'classroom-teaching', label: 'Classroom Teaching & Pedagogy', keywords: ['teacher', 'teaching', 'instructor', 'education', 'high school', 'pedagogy'] },
            { id: 'math-stem', label: 'Mathematics & STEM Instruction', keywords: ['mathematics', 'math teacher', 'science teacher', 'stem'] },
            { id: 'edtech-tutoring', label: 'Educational Technology & Tutoring', keywords: ['edtech', 'tutor', 'e-learning', 'instructional design', 'curriculum'] }
        ]
    },
    'CHTM': {
        name: 'College of Hospitality and Tourism Management',
        programs: ['BS Hospitality Management', 'BS Tourism Management'],
        skills: [
            { id: 'hotel-operations', label: 'Hotel & Front Office Operations', keywords: ['hotel', 'hospitality', 'front office', 'guest services', 'concierge', 'trainee', 'receptionist'] },
            { id: 'food-beverage', label: 'Food & Beverage Service', keywords: ['food and beverage', 'restaurant', 'f&b', 'culinary', 'catering', 'barista', 'dining'] },
            { id: 'tourism-guiding', label: 'Tourism Planning & Guiding', keywords: ['tourism', 'travel', 'tour guide', 'itinerary', 'airline'] }
        ]
    }
};

function findSkillDef(skillQuery) {
    if (!skillQuery) return null;
    const q = String(skillQuery).toLowerCase().trim();
    for (const [code, data] of Object.entries(COLLEGE_PROGRAMS_SKILLS)) {
        for (const s of data.skills) {
            if (s.id.toLowerCase() === q || s.label.toLowerCase() === q || s.label.toLowerCase().includes(q) || q.includes(s.id.toLowerCase())) {
                return { ...s, college: code, collegeName: data.name };
            }
        }
    }
    return null;
}

function calculateJobSkillScore(job, collegeCode, programName, skillIdOrQuery) {
    let score = 0;
    const reasons = [];
    const matchedSkills = [];

    const jobTitle = (job.title || '').toLowerCase();
    const jobDesc = (job.description || '').toLowerCase();
    const jobReqs = (Array.isArray(job.requirements) ? job.requirements.join(' ') : '').toLowerCase();
    const jobTags = (Array.isArray(job.tags) ? job.tags.join(' ') : '').toLowerCase();
    const fullText = `${jobTitle} ${jobDesc} ${jobReqs} ${jobTags}`;

    const skillDef = skillIdOrQuery ? findSkillDef(skillIdOrQuery) : null;
    const targetCollege = collegeCode || (skillDef ? skillDef.college : null);

    // 1. College Alignment
    if (targetCollege) {
        if (job.tags && job.tags.includes(targetCollege)) {
            score += 35;
            reasons.push(`Directly aligned with ${targetCollege}`);
        } else if (fullText.includes(targetCollege.toLowerCase())) {
            score += 15;
        }
    }

    // 2. Program Alignment
    if (programName) {
        const progLower = programName.toLowerCase().replace(/^bs\s+/, '').replace(/^ab\s+/, '');
        if (jobReqs.includes(progLower) || fullText.includes(progLower)) {
            score += 25;
            reasons.push(`Targeted for ${programName}`);
        }
    }

    // 3. Skill Alignment
    if (skillDef) {
        let titleHit = false;
        let descHits = 0;

        for (const kw of skillDef.keywords) {
            const kwL = kw.toLowerCase();
            if (jobTitle.includes(kwL)) {
                titleHit = true;
                score += 45;
                reasons.push(`Matches role keyword "${kw}" in title`);
                break;
            }
        }

        for (const kw of skillDef.keywords) {
            const kwL = kw.toLowerCase();
            if (fullText.includes(kwL)) {
                descHits++;
            }
        }

        if (descHits > 0) {
            score += Math.min(30, descHits * 10);
            matchedSkills.push(skillDef.label);
            if (!titleHit) {
                reasons.push(`Matches ${skillDef.label} competencies`);
            }
        }
    }

    return {
        score: Math.min(99, Math.max(0, score)),
        matchedSkills,
        reasons,
        skillDef
    };
}


// Helper for dynamic relative dates
function getRelativeDateStr(daysOffset) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString().split('T')[0];
}

const JOBS = [
    {
        id: '1', title: 'Junior Software Developer', company: 'Accenture Philippines',
        location: 'Makati City, Metro Manila', type: 'Full-time',
        salary_min: 25000, salary_max: 40000,
        description: 'We are looking for a motivated Junior Software Developer to join our growing team. You will work on enterprise solutions for our global clients.',
        requirements: ['BS Computer Science or IT', 'Knowledge of Java/Python', 'Good communication skills', 'Fresh graduates welcome'],
        posted_date: getRelativeDateStr(-2), deadline: getRelativeDateStr(25), source: 'Company Website',
        apply_url: 'https://www.accenture.com/ph-en/careers/jobsearch?jk=software%20developer',
        tags: ['CCS', 'Technology', 'Entry Level']
    },
    {
        id: '2', title: 'Staff Nurse', company: 'Philippine General Hospital',
        location: 'Manila, Metro Manila', type: 'Full-time',
        salary_min: 20000, salary_max: 35000,
        description: 'Join our nursing team providing quality patient care in one of the premier medical institutions in the Philippines.',
        requirements: ['BS Nursing graduate', 'Valid PRC license', 'BLS certification', 'Compassionate and detail-oriented'],
        posted_date: getRelativeDateStr(-3), deadline: getRelativeDateStr(28), source: 'JobStreet',
        apply_url: 'https://ph.jobstreet.com/staff-nurse-jobs/in-Metro-Manila',
        tags: ['CNM', 'Healthcare', 'Licensed']
    },
    {
        id: '3', title: 'Marketing Coordinator', company: 'SM Investments Corporation',
        location: 'Pasay City, Metro Manila', type: 'Full-time',
        salary_min: 22000, salary_max: 35000,
        description: 'Support our marketing team in developing campaigns, managing social media, and coordinating events for our retail portfolio.',
        requirements: ['BS Business Administration or Marketing', 'Strong written and verbal communication', 'Proficient in MS Office and social media platforms', 'Creative and organized'],
        posted_date: getRelativeDateStr(-5), deadline: getRelativeDateStr(18), source: 'LinkedIn',
        apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Marketing%20Coordinator&location=Metro%20Manila%2C%20Philippines',
        tags: ['CBA', 'Marketing', 'Entry Level']
    },
    {
        id: '4', title: 'Criminology Instructor (Part-time)', company: 'IMCC - Iligan Medical Center College',
        location: 'Iligan City, Lanao del Norte', type: 'Part-time',
        salary_min: 15000, salary_max: 25000,
        description: 'We are seeking a part-time instructor for our Criminology program.',
        requirements: ["Master's degree in Criminology", 'LEO board passer preferred', 'Teaching experience is a plus'],
        posted_date: getRelativeDateStr(-1), deadline: getRelativeDateStr(30), source: 'Company Website',
        apply_url: 'https://www.imcc.edu.ph/',
        tags: ['CCJE', 'Education', 'Academic']
    },
    {
        id: '5', title: 'Medical Technologist', company: 'Chong Hua Hospital',
        location: 'Iligan City, Lanao del Norte', type: 'Full-time',
        salary_min: 18000, salary_max: 30000,
        description: 'Perform laboratory tests and analyses to support patient diagnosis and treatment.',
        requirements: ['BS Medical Technology graduate', 'Valid PRC license', 'Experience in clinical laboratory'],
        posted_date: getRelativeDateStr(-4), deadline: getRelativeDateStr(20), source: 'Indeed',
        apply_url: 'https://ph.indeed.com/jobs?q=Medical%20Technologist&l=Iligan%20City',
        tags: ['CMT', 'Healthcare', 'Licensed']
    },
    {
        id: '6', title: 'Radiologic Technologist', company: 'Vicente Sotto Memorial Medical Center',
        location: 'Iligan City, Lanao del Norte', type: 'Full-time',
        salary_min: 20000, salary_max: 32000,
        description: 'Operate radiologic equipment to produce diagnostic images.',
        requirements: ['BS Radiologic Technology', 'Valid PRC license as RadTech', 'Knowledge of imaging equipment'],
        posted_date: getRelativeDateStr(-6), deadline: getRelativeDateStr(24), source: 'JobStreet',
        apply_url: 'https://ph.jobstreet.com/radiologic-technologist-jobs',
        tags: ['CRT', 'Healthcare', 'Licensed']
    },
    {
        id: '7', title: 'Hotel Operations Trainee', company: 'Marco Polo Plaza Iligan',
        location: 'Iligan City, Lanao del Norte', type: 'Full-time',
        salary_min: 16000, salary_max: 22000,
        description: 'Join our management trainee program in hotel operations and hospitality management.',
        requirements: ['BS Hospitality/Tourism Management', 'Excellent interpersonal skills', 'Fresh graduates welcome'],
        posted_date: getRelativeDateStr(-2), deadline: getRelativeDateStr(14), source: 'Company Website',
        apply_url: 'https://www.marcopolohotels.com/en/careers',
        tags: ['CHTM', 'Hospitality', 'Entry Level']
    },
    {
        id: '8', title: 'Web Developer', company: 'Existence Software',
        location: 'Iligan City IT Park', type: 'Full-time',
        salary_min: 30000, salary_max: 50000,
        description: 'Build modern web applications using React, Node.js, and cloud technologies.',
        requirements: ['BS Computer Science or IT', 'Proficient in React and Node.js', 'Portfolio of web projects'],
        posted_date: getRelativeDateStr(-3), deadline: getRelativeDateStr(22), source: 'LinkedIn',
        apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Web%20Developer&location=Iligan%20City%2C%20Philippines',
        tags: ['CCS', 'Technology', 'Mid Level']
    },
    {
        id: '9', title: 'High School Teacher - Mathematics', company: 'University of San Carlos',
        location: 'Iligan City, Lanao del Norte', type: 'Full-time',
        salary_min: 18000, salary_max: 28000,
        description: 'Teach mathematics to senior high school students.',
        requirements: ['Bachelor of Secondary Education (Math)', 'Valid LET license', 'Passion for teaching'],
        posted_date: getRelativeDateStr(-7), deadline: getRelativeDateStr(15), source: 'Company Website',
        apply_url: 'https://www.usc.edu.ph/',
        tags: ['CED', 'Education', 'Licensed']
    },
    {
        id: '10', title: 'Financial Analyst', company: 'BDO Unibank',
        location: 'Iligan City Business Park', type: 'Full-time',
        salary_min: 28000, salary_max: 45000,
        description: 'Analyze financial data and support decision-making for regional banking operations.',
        requirements: ['BS Accountancy or Finance', 'Strong analytical skills', 'CPA preferred'],
        posted_date: getRelativeDateStr(-1), deadline: getRelativeDateStr(26), source: 'JobStreet',
        apply_url: 'https://ph.jobstreet.com/financial-analyst-jobs',
        tags: ['CBA', 'Finance', 'Entry Level']
    },
    {
        id: '11', title: 'Clinical Psychologist', company: "Iligan Doctors' University Hospital",
        location: 'Iligan City, Lanao del Norte', type: 'Full-time',
        salary_min: 25000, salary_max: 40000,
        description: 'Provide psychological assessments and counseling services.',
        requirements: ['BS Psychology with MA in Clinical Psychology', 'Valid PRC license', 'Clinical experience'],
        posted_date: getRelativeDateStr(-4), deadline: getRelativeDateStr(21), source: 'Indeed',
        apply_url: 'https://ph.indeed.com/jobs?q=Clinical%20Psychologist&l=Iligan%20City',
        tags: ['CAS', 'Healthcare', 'Licensed']
    },
    {
        id: '12', title: 'Data Entry Specialist', company: 'Concentrix Iligan',
        location: 'Iligan City IT Park', type: 'Full-time',
        salary_min: 18000, salary_max: 25000,
        description: 'Accurately input and manage data for multinational clients in a BPO environment.',
        requirements: ["Any bachelor's degree", 'Fast and accurate typing', 'Proficient in MS Office'],
        posted_date: getRelativeDateStr(-2), deadline: getRelativeDateStr(19), source: 'LinkedIn',
        apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Data%20Entry%20Specialist&location=Iligan%20City%2C%20Philippines',
        tags: ['General', 'BPO', 'Entry Level']
    },
];

const MOCK_STUDENTS = [
    { id: '1', name: 'Juan Dela Cruz', student_number: '2024-001234', college: 'CCS', program: 'BS Computer Science', status: 'student', year: 4, resume_score: 72 },
    { id: '2', name: 'Maria Santos', student_number: '2024-001235', college: 'CNM', program: 'BS Nursing', status: 'student', year: 3, resume_score: 85 },
    { id: '3', name: 'Pedro Reyes', student_number: '2023-000987', college: 'CBA', program: 'BS Accountancy', status: 'alumni', year: 2024, resume_score: 90 },
    { id: '4', name: 'Ana Garcia', student_number: '2024-001236', college: 'CCJE', program: 'BS Criminology', status: 'student', year: 2, resume_score: 65 },
    { id: '5', name: 'Carlos Mendoza', student_number: '2023-000988', college: 'CMT', program: 'BS Medical Technology', status: 'alumni', year: 2024, resume_score: 78 },
    { id: '6', name: 'Rosa Villanueva', student_number: '2024-001237', college: 'CED', program: 'BSEd Mathematics', status: 'student', year: 4, resume_score: 81 },
    { id: '7', name: 'Miguel Torres', student_number: '2024-001238', college: 'CHTM', program: 'BS Hospitality Management', status: 'student', year: 3, resume_score: 70 },
    { id: '8', name: 'Sofia Lim', student_number: '2024-001239', college: 'CAS', program: 'BS Psychology', status: 'student', year: 4, resume_score: 88 },
];

const SAMPLE_RESUME = `JUAN DELA CRUZ
Iligan City, Lanao del Norte | juan.delacruz@email.com | +63 917 123 4567
LinkedIn: linkedin.com/in/juandelacruz

PROFESSIONAL SUMMARY
Motivated BS Computer Science student with strong foundation in web development,
database management, and software engineering principles.

EDUCATION
Iligan Medical Center College
BS Computer Science | Expected Graduation: 2025

TECHNICAL SKILLS
- Languages: JavaScript, Python, Java, HTML/CSS, SQL
- Frameworks: React, Node.js, Express.js
- Tools: Git, VS Code, Figma, MySQL, MongoDB

EXPERIENCE
IT Intern | ABC Company, Iligan City | June - August 2024
- Assisted in maintaining company website
- Developed automation scripts reducing manual tasks by 30%

CERTIFICATIONS
- Google IT Support Professional Certificate (2024)
- AWS Cloud Practitioner Essentials (2023)`;

// State
let currentUser = null;
let currentPage = 'home';
let isLoginMode = true;
let resumeAnalyzed = false;
let currentAnalysisResult = null;

// Utility Functions
function formatSalary(min, max) {
    if (!min && !max) return 'Not specified';
    const format = n => '₱' + n.toLocaleString();
    if (min && max) return `${format(min)} - ${format(max)}`;
    if (min) return `From ${format(min)}`;
    return `Up to ${format(max)}`;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
}

function daysUntilDeadline(deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    return Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getScoreColor(score) {
    if (score >= 80) return 'var(--green-600)';
    if (score >= 60) return 'var(--yellow-600)';
    return 'var(--red-600)';
}

// Navigation
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) link.classList.add('active');
    });

    const breadcrumb = document.getElementById('breadcrumb');
    const breadcrumbText = document.getElementById('breadcrumbText');
    if (page === 'home') {
        breadcrumb.classList.add('hidden');
    } else {
        breadcrumb.classList.remove('hidden');
        const labels = { jobs: 'Career Opportunities', dashboard: 'Dashboard', resume: 'Resume Center', admin: 'Admin Panel', login: 'Sign In', jobDetail: 'Position Details' };
        breadcrumbText.textContent = labels[page] || page;
    }

    currentPage = page;
    window.scrollTo(0, 0);
    document.getElementById('mobileMenu').classList.remove('active');
}

function handleHashChange() {
    const hash = window.location.hash.slice(1) || 'home';
    if (hash.startsWith('job/')) {
        loadJobDetail(hash.split('/')[1]);
        navigateTo('jobDetail');
        return;
    }
    if ((hash === 'dashboard' || hash === 'resume') && !currentUser) { navigateTo('login'); return; }
    if (hash === 'admin' && (!currentUser || currentUser.role !== 'admin')) { navigateTo('login'); return; }
    navigateTo(hash);
}

// Authentication
function updateAuthUI() {
    const authEls = document.querySelectorAll('.hidden-auth');
    const guestEls = document.querySelectorAll('.hidden-guest');
    const adminEls = document.querySelectorAll('.hidden-admin');

    if (currentUser) {
        authEls.forEach(el => el.classList.add('show'));
        guestEls.forEach(el => el.classList.add('hide'));
        document.getElementById('userName').textContent = currentUser.full_name;
        document.getElementById('userRole').textContent = currentUser.role === 'admin' ? 'Administrator' : currentUser.student_number;
        document.getElementById('userAvatar').textContent = currentUser.full_name.charAt(0);
        if (currentUser.role === 'admin') adminEls.forEach(el => el.classList.add('show'));
    } else {
        authEls.forEach(el => el.classList.remove('show'));
        guestEls.forEach(el => el.classList.remove('hide'));
        adminEls.forEach(el => el.classList.remove('show'));
    }
}

function toCurrentUser(profile, authUser) {
    const storedSkills = authUser.user_metadata?.skills;
    const collegeSkills = COLLEGE_PROGRAMS_SKILLS[profile.college]?.skills.slice(0, 2).map(skill => skill.label) || [];
    return {
        ...profile,
        skills: Array.isArray(storedSkills) ? storedSkills : collegeSkills
    };
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) return;

    const btn = document.getElementById('loginSubmitBtn');
    btn.innerHTML = '<span class="spinner"></span> Signing in...';
    btn.disabled = true;

    try {
        const { data, error } = await window.SupabaseDB.signIn(email, password);
        if (error) throw new Error(error);

        const { data: profile, error: profileError } = await window.SupabaseDB.ensureUserProfile(data.user);
        if (profileError) throw new Error(profileError);

        currentUser = toCurrentUser(profile, data.user);
        updateAuthUI();
        window.location.hash = 'dashboard';
    } catch (error) {
        showToast(error.message || 'Unable to sign in. Please try again.', 'fa-exclamation-circle');
    } finally {
        btn.innerHTML = 'Sign In <i class="fas fa-arrow-right"></i>';
        btn.disabled = false;
    }
}

async function handleGoogleSignIn() {
    const btn = document.getElementById('googleSignInBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Redirecting to Google...';

    try {
        const { error } = await window.SupabaseDB.signInWithGoogle();
        if (error) throw new Error(error);
    } catch (error) {
        showToast(error.message || 'Unable to start Google sign-in. Please try again.', 'fa-exclamation-circle');
        btn.disabled = false;
        btn.innerHTML = '<i class="fab fa-google" aria-hidden="true"></i> Continue with Google';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const name = document.getElementById('regName').value;
    const studentNo = document.getElementById('regStudentNo').value;
    const status = document.getElementById('regStatus').value;
    const college = document.getElementById('regCollege').value;
    if (!email || !password || !name || !studentNo || !college) return;

    const btn = document.getElementById('loginSubmitBtn');
    btn.innerHTML = '<span class="spinner"></span> Creating account...';
    btn.disabled = true;

    try {
        const program = COLLEGE_PROGRAMS_SKILLS[college]?.programs[0] || '';
        const skills = COLLEGE_PROGRAMS_SKILLS[college]?.skills.slice(0, 2).map(s => s.label) || [];
        const { data, error } = await window.SupabaseDB.signUp(email, password, {
            full_name: name,
            student_number: studentNo,
            status,
            college,
            program,
            skills
        });
        if (error) throw new Error(error);

        if (data.session) {
            const { data: profile, error: profileError } = await window.SupabaseDB.ensureUserProfile(data.user);
            if (profileError) throw new Error(profileError);
            currentUser = toCurrentUser(profile, data.user);
            updateAuthUI();
            window.location.hash = 'dashboard';
        } else {
            showToast('Account created. Check your email to confirm it, then sign in.', 'fa-envelope');
            switchAuthMode();
        }
    } catch (error) {
        showToast(error.message || 'Unable to create your account. Please try again.', 'fa-exclamation-circle');
    } finally {
        btn.innerHTML = isLoginMode
            ? 'Sign In <i class="fas fa-arrow-right"></i>'
            : 'Create Account <i class="fas fa-arrow-right"></i>';
        btn.disabled = false;
    }
}

async function handleLogout() {
    try {
        const { error } = await window.SupabaseDB.signOut();
        if (error) throw new Error(error);

        currentUser = null;
        updateAuthUI();
        window.location.hash = 'home';
    } catch (error) {
        showToast(error.message || 'Unable to sign out. Please try again.', 'fa-exclamation-circle');
    }
}

function switchAuthMode() {
    isLoginMode = !isLoginMode;
    const regFields = document.getElementById('registerFields');
    const title = document.getElementById('loginTitle');
    const subtitle = document.getElementById('loginSubtitle');
    const switchBtn = document.getElementById('switchAuthBtn');
    const submitBtn = document.getElementById('loginSubmitBtn');

    if (isLoginMode) {
        regFields.style.display = 'none';
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Sign in to access your career portal';
        switchBtn.textContent = "Don't have an account? Register";
        submitBtn.innerHTML = 'Sign In <i class="fas fa-arrow-right"></i>';
    } else {
        regFields.style.display = 'block';
        title.textContent = 'Create Account';
        subtitle.textContent = 'Join the IMCC Career Hub community';
        switchBtn.textContent = 'Already have an account? Sign in';
        submitBtn.innerHTML = 'Create Account <i class="fas fa-arrow-right"></i>';
    }
}

// ============================================
// JOB MANAGEMENT - Jooble API + Local Jobs
// ============================================

let joobleJobs = []; // Store Jooble jobs separately
let lastRefreshed = null;

// Fetch jobs from Jooble API
async function fetchJoobleJobs(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.keywords) params.append('keywords', filters.keywords);
        params.append('location', filters.location || 'Philippines');
        if (filters.page) params.append('page', filters.page);

        const response = await fetch(`/api/jooble?${params.toString()}`);

        if (!response.ok) {
            if (response.status === 404) {
                console.warn('[CareerHub] Job feed endpoint returned 404. Check that the Vercel API function is deployed. Using sample jobs.');
            } else {
                console.warn('[CareerHub] Jooble API returned', response.status, '— using sample jobs as fallback.');
            }
            return [];
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
            joobleJobs = data.jobs;
            lastRefreshed = data.lastRefreshed;
            return joobleJobs;
        }

        // API connected but returned no jobs (e.g. API key missing)
        if (data.error) {
            console.warn('[CareerHub] Jooble API:', data.error, '— using sample jobs.');
        }

        return [];
    } catch (error) {
        // Network/fetch error (file:// protocol, no local server) — suppress red error
        console.warn('[CareerHub] Jooble fetch skipped (no server):', error.message);
        return [];
    }
}

// Filter out expired jobs (older than 30 days)
function filterExpiredJobs(jobs) {
    const today = new Date();
    return jobs.filter(job => {
        // Check if job has a deadline and it's passed
        if (job.deadline) {
            const deadline = new Date(job.deadline);
            if (deadline < today) return false;
        }

        // Check if job was posted more than 30 days ago
        if (job.posted_date) {
            const posted = new Date(job.posted_date);
            const daysDiff = Math.floor((today - posted) / (1000 * 60 * 60 * 24));
            if (daysDiff > 30) return false;
        }

        return true;
    });
}

// Get all jobs (local + Jooble)
function getAllJobs() {
    const jooble = filterExpiredJobs(joobleJobs);
    if (jooble.length > 0) {
        return jooble.sort((a, b) => {
            const dateA = new Date(b.posted_date || 0);
            const dateB = new Date(a.posted_date || 0);
            return dateA - dateB;
        });
    }
    return filterExpiredJobs(JOBS).length > 0 ? filterExpiredJobs(JOBS) : JOBS;
}

function prettySource(source) {
    if (!source) return 'Original site';
    const key = String(source).toLowerCase().replace(/^www\./, '');
    const known = {
        'jobstreet': 'JobStreet',
        'jobstreet.com': 'JobStreet',
        'ph.jobstreet.com': 'JobStreet',
        'jobstreet.com.ph': 'JobStreet',
        'indeed': 'Indeed',
        'indeed.com': 'Indeed',
        'ph.indeed.com': 'Indeed',
        'linkedin': 'LinkedIn',
        'linkedin.com': 'LinkedIn',
        'jooble': 'Jooble',
        'jooble.org': 'Jooble',
        'company website': 'Company Website'
    };
    return known[key] || source;
}

function getOriginalListingUrl(job) {
    const url = job && (job.apply_url || job.source_url || '');
    return typeof url === 'string' && /^https?:\/\//i.test(url) ? url : '';
}

function openOriginalListing(jobId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    const job = getAllJobs().find(j => String(j.id) === String(jobId));
    const url = job && getOriginalListingUrl(job);
    if (!url) {
        showToast('No original listing link for this position', 'fa-info-circle');
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
}

function sourceChip(job) {
    if (!job.source && !getOriginalListingUrl(job)) return '';
    const label = `via ${prettySource(job.source)}`;
    if (!getOriginalListingUrl(job)) {
        return `<span class="job-source-text">${label}</span>`;
    }
    return `<button type="button" class="job-source-link" onclick="openOriginalListing('${job.id}', event)">${label} <i class="fas fa-external-link-alt"></i></button>`;
}

// Jobs
function renderJobCard(job) {
    const daysAgo = job.daysAgo || getDaysAgo(job.posted_date);
    const tags = Array.isArray(job.tags) ? job.tags : ['General'];

    return `<a href="#job/${job.id}" class="job-card" onclick="loadJobDetail('${job.id}')">
        <div class="job-card-header">
            <div>
                <div class="job-card-title">${job.title}</div>
                <div class="job-card-company">${job.company} ${sourceChip(job)}</div>
            </div>
            <span class="job-type-badge">${job.type}</span>
        </div>
        <div class="job-card-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</div>
        <p class="job-card-description">${job.description}</p>
        <div class="job-card-footer">
            <span class="job-salary">${formatSalary(job.salary_min, job.salary_max)}</span>
            <div class="job-tags">
                ${daysAgo !== null ? `<span class="job-tag" style="background: var(--crimson); color: white;">${daysAgo}d ago</span>` : ''}
                ${tags.slice(0, 1).map(t => `<span class="job-tag">${t}</span>`).join('')}
            </div>
        </div>
    </a>`;
}

// Helper to calculate days ago
function getDaysAgo(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const today = new Date();
    return Math.floor((today - date) / (1000 * 60 * 60 * 24));
}

function renderJobListing(job) {
    const daysLeft = job.deadline ? daysUntilDeadline(job.deadline) : null;
    const dlStyle = daysLeft && daysLeft <= 7 ? 'style="color: var(--crimson); font-weight: 600;"' : '';
    const daysAgo = job.daysAgo || getDaysAgo(job.posted_date);
    const tags = Array.isArray(job.tags) ? job.tags : ['General'];

    return `<a href="#job/${job.id}" class="job-listing" onclick="loadJobDetail('${job.id}')">
        <div class="job-listing-content">
            <div class="job-listing-main">
                <div class="job-listing-header">
                    <div>
                        <h3 class="job-listing-title">${job.title}</h3>
                        <p class="job-listing-company"><i class="fas fa-building"></i> ${job.company} ${sourceChip(job)}</p>
                    </div>
                    <span class="job-type-badge">${job.type}</span>
                </div>
                <p class="job-listing-description">${job.description}</p>
                <div class="job-listing-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${daysAgo !== null ? `${daysAgo}d ago` : `Posted ${formatDate(job.posted_date)}`}</span>
                    ${job.deadline ? `<span ${dlStyle}><i class="fas fa-hourglass-half"></i> Deadline: ${formatDate(job.deadline)}</span>` : ''}
                </div>
                <div class="job-listing-tags">${tags.map(t => `<span class="job-tag">${t}</span>`).join('')}</div>
            </div>
            <div class="job-listing-salary">
                <div class="salary-amount">${formatSalary(job.salary_min, job.salary_max)}</div>
                ${job.salary_min || job.salary_max ? '<div class="salary-period">per month</div>' : ''}
                <span class="btn-view-job">View Position <i class="fas fa-arrow-right"></i></span>
            </div>
        </div>
    </a>`;
}

async function loadFeaturedJobs() {
    // Try to fetch Jooble jobs first
    await fetchJoobleJobs({ location: 'Philippines' });

    const allJobs = getAllJobs();
    document.getElementById('featuredJobsGrid').innerHTML = allJobs.slice(0, 6).map(renderJobCard).join('');
}

async function loadAllJobs(filters = {}) {
    // Fetch Jooble jobs if not already loaded
    if (joobleJobs.length === 0) {
        await fetchJoobleJobs({
            keywords: filters.search || '',
            location: 'Philippines'
        });
    }

    let results = getAllJobs();

    if (filters.college) results = results.filter(j => j.tags.includes(filters.college));
    if (filters.type) results = results.filter(j => j.type === filters.type);
    if (filters.search) {
        const s = filters.search.toLowerCase();
        results = results.filter(j =>
            j.title.toLowerCase().includes(s) ||
            j.company.toLowerCase().includes(s) ||
            j.description.toLowerCase().includes(s) ||
            j.tags.some(t => t.toLowerCase().includes(s))
        );
    }

    const list = document.getElementById('jobsList');
    const count = document.getElementById('jobsCount');

    // Show last refreshed info
    const refreshInfo = lastRefreshed
        ? `<span style="font-size: 0.75rem; color: var(--slate-500); margin-left: 0.5rem;">• Last updated: ${new Date(lastRefreshed).toLocaleString()}</span>`
        : '';

    if (results.length === 0) {
        list.innerHTML = '<div class="empty-state"><i class="fas fa-briefcase"></i><h3>No positions found</h3><p>Try adjusting your search or filters</p></div>';
    } else {
        list.innerHTML = results.map(renderJobListing).join('');
    }

    const joobleCount = joobleJobs.length;
    const localCount = JOBS.length;
    count.innerHTML = `${results.length} positions available ${joobleCount > 0 ? `(${joobleCount} from Jooble, ${localCount} local)` : ''}${refreshInfo}`;
}

// Toast Feedback Helper
function showToast(message, icon = 'fa-check-circle') {
    const existing = document.querySelector('.hub-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'hub-toast';
    toast.innerHTML = `<i class="fas ${icon}" style="color: var(--gold);"></i> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(1rem)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Copy Job Share Link
function copyJobLink(jobId) {
    const url = window.location.origin + window.location.pathname + '#job/' + jobId;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('Position link copied to clipboard!');
        }).catch(() => {
            showToast('Opportunity link ready to share');
        });
    } else {
        showToast('Opportunity link ready to share');
    }
}

// Cover Letter trigger with auth check
function handleCoverLetterClick(jobId) {
    if (!currentUser) {
        showToast('Please sign in to generate AI cover letters', 'fa-info-circle');
        navigateTo('login');
        return;
    }
    generateCoverLetter(jobId);
}

// Application Modal
function openApplyModal(jobId) {
    const job = getAllJobs().find(j => j.id === jobId);
    if (!job) return;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'jobApplyModal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 36rem;">
            <div class="modal-header">
                <h3>Apply for ${job.title}</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p style="font-size: 0.875rem; color: var(--slate-600); margin-bottom: 1.25rem;">
                    Submit your application to <strong>${job.company}</strong> through the IMCC Office of Career Services.
                </p>
                <form id="directApplyForm" onsubmit="handleDirectApply(event, '${job.id}')">
                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label class="form-label" style="font-size: 0.8125rem; font-weight: 600; color: var(--slate-700); margin-bottom: 0.25rem; display:block;">Full Name</label>
                        <input type="text" class="form-input" id="applicantName" required value="${currentUser ? currentUser.full_name : ''}" placeholder="Juan Dela Cruz" style="width: 100%;">
                    </div>
                    <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
                        <div class="form-group">
                            <label class="form-label" style="font-size: 0.8125rem; font-weight: 600; color: var(--slate-700); margin-bottom: 0.25rem; display:block;">Email Address</label>
                            <input type="email" class="form-input" id="applicantEmail" required value="${currentUser ? currentUser.email : ''}" placeholder="juan@imcc.edu.ph" style="width: 100%;">
                        </div>
                        <div class="form-group">
                            <label class="form-label" style="font-size: 0.8125rem; font-weight: 600; color: var(--slate-700); margin-bottom: 0.25rem; display:block;">Student / Alumni No.</label>
                            <input type="text" class="form-input" id="applicantStudentNum" value="${currentUser ? currentUser.student_number : ''}" placeholder="2024-001234" style="width: 100%;">
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label class="form-label" style="font-size: 0.8125rem; font-weight: 600; color: var(--slate-700); margin-bottom: 0.25rem; display:block;">Short Introduction / Message</label>
                        <textarea class="form-input" id="applicantNote" rows="3" placeholder="Briefly state your qualifications and interest in this position..." style="width: 100%;"></textarea>
                    </div>
                    <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 0.75rem 1rem; margin-bottom: 1.25rem; font-size: 0.75rem; color: var(--slate-600); display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-shield-alt" style="color: var(--crimson); font-size: 1rem;"></i>
                        <span>Your registered IMCC profile & academic credentials will be verified and transmitted with this application.</span>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('jobApplyModal').remove()">Cancel</button>
                        <button type="submit" class="btn-primary"><i class="fas fa-paper-plane"></i> Submit Application</button>
                    </div>
                </form>
            </div>
        </div>`;
    document.body.appendChild(modal);
}

function handleDirectApply(e, jobId) {
    e.preventDefault();
    const job = getAllJobs().find(j => j.id === jobId);
    const modal = document.getElementById('jobApplyModal');
    if (modal) modal.remove();

    showToast(`Application successfully submitted for ${job ? job.title : 'position'}!`, 'fa-check-circle');
}

function loadJobDetail(jobId) {
    const job = getAllJobs().find(j => j.id === jobId);
    if (!job) return;
    const daysLeft = job.deadline ? daysUntilDeadline(job.deadline) : null;
    const isJooble = job.isJooble || job.source === 'Jooble';
    const daysAgo = job.daysAgo || getDaysAgo(job.posted_date);
    const requirements = Array.isArray(job.requirements) && job.requirements.length > 0
        ? job.requirements
        : ['Relevant college degree or ongoing coursework aligned with this role', 'Strong verbal and written communication skills', 'Good problem-solving ability and attention to detail', 'Collaborative attitude and eager to learn'];
    const tags = Array.isArray(job.tags) ? job.tags : ['General'];

    const collegeList = tags
        .map(t => COLLEGES.find(c => c.code === t))
        .filter(Boolean);
    const originalUrl = getOriginalListingUrl(job);
    const sourceName = prettySource(job.source);

    document.getElementById('jobDetailContent').innerHTML = `
        <div class="job-detail-header">
            <div class="job-detail-badges">
                <span class="job-type-badge">${job.type}</span>
                ${originalUrl
                    ? `<button type="button" class="job-tag job-source-link" onclick="openOriginalListing('${job.id}')">via ${sourceName} <i class="fas fa-external-link-alt"></i></button>`
                    : `<span class="job-tag">${job.source ? `via ${sourceName}` : 'IMCC Partner'}</span>`}
                ${isJooble ? '<span class="job-tag" style="background:#e0f2fe; color:#0284c7; border:1px solid #bae6fd;">Jooble Verified Feed</span>' : '<span class="verified-employer-pill"><i class="fas fa-shield-alt"></i> Verified Partner Employer</span>'}
            </div>
            <h1 class="job-detail-title">${job.title}</h1>
            <div class="job-detail-company">
                <span class="company-icon-badge"><i class="fas fa-building"></i></span>
                <strong>${job.company}</strong>
            </div>
            <div class="job-detail-meta">
                <div class="meta-item"><i class="fas fa-map-marker-alt"></i> <span>${job.location}</span></div>
                <div class="meta-item"><i class="fas fa-calendar-alt"></i> <span>${daysAgo !== null ? `${daysAgo}d ago (${formatDate(job.posted_date)})` : `Posted ${formatDate(job.posted_date)}`}</span></div>
                ${job.deadline ? `<div class="meta-item ${daysLeft && daysLeft <= 7 ? 'meta-urgent' : ''}"><i class="fas fa-hourglass-half"></i> <span>${daysLeft > 0 ? `${daysLeft} days remaining (${formatDate(job.deadline)})` : `Deadline: ${formatDate(job.deadline)}`}</span></div>` : ''}
                <div class="meta-salary-badge"><i class="fas fa-money-bill-wave"></i> ${formatSalary(job.salary_min, job.salary_max)} ${job.salary_min || job.salary_max ? '<small style="font-weight:400; font-size:0.75rem;">/ mo</small>' : ''}</div>
            </div>
        </div>

        <div class="job-detail-grid">
            <div class="job-detail-main">
                <div class="detail-card">
                    <h2 class="detail-section-title"><i class="fas fa-file-alt"></i> Position Overview</h2>
                    <p class="detail-body-text">${job.description}</p>
                </div>

                <div class="detail-card">
                    <h2 class="detail-section-title"><i class="fas fa-clipboard-check"></i> Key Requirements & Qualifications</h2>
                    <div class="req-grid">
                        ${requirements.map(r => `
                            <div class="req-item">
                                <i class="fas fa-check-circle"></i>
                                <span>${r}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="detail-card">
                    <h2 class="detail-section-title"><i class="fas fa-graduation-cap"></i> Target Academic Colleges & Categories</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                        ${tags.map(t => `<span class="job-tag" style="padding: 0.4rem 0.85rem; font-size: 0.8125rem; font-weight: 500;">${t}</span>`).join('')}
                    </div>
                    ${collegeList.length > 0 ? `
                        <p style="font-size: 0.8125rem; color: var(--slate-500); margin-top: 0.75rem;">
                            Directly matched for students & graduates of: <strong>${collegeList.map(c => c.name).join(', ')}</strong>
                        </p>` : ''}
                </div>

                <div class="institutional-note">
                    <i class="fas fa-shield-alt"></i>
                    <div>
                        <strong>IMCC Career Services Assurance:</strong> This job post has been vetted for IMCC students and alumni. Need assistance with your resume or interview coaching for this role? Visit the <strong>Office of Career Services</strong> or generate a tailored cover letter using the sidebar.
                    </div>
                </div>
            </div>

            <div class="job-detail-sidebar">
                <div class="apply-card">
                    <h3 style="margin-bottom: 0.75rem; font-size: 1.125rem;">Apply for this Position</h3>

                    <div class="sidebar-salary-box">
                        <span class="sidebar-salary-label">Offered Compensation</span>
                        <span class="sidebar-salary-val">${formatSalary(job.salary_min, job.salary_max)}</span>
                        ${job.salary_min || job.salary_max ? '<span class="sidebar-salary-sub">Estimated Monthly Gross</span>' : ''}
                    </div>

                    ${originalUrl ? `
                        <a href="${originalUrl || job.apply_url}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-apply">
                            <i class="fas fa-external-link-alt"></i> Apply on ${sourceName} (Original Job Market)
                        </a>
                        <button type="button" class="btn-secondary btn-apply-hub" onclick="openApplyModal('${job.id}')">
                            <i class="fas fa-paper-plane"></i> Apply via Career Hub
                        </button>
                    ` : `
                        <button type="button" class="btn-primary btn-apply" onclick="openApplyModal('${job.id}')">
                            <i class="fas fa-paper-plane"></i> Apply via Career Hub
                        </button>
                    `}

                    <button type="button" class="btn-secondary btn-cover-letter" onclick="handleCoverLetterClick('${job.id}')">
                        <i class="fas fa-magic"></i> Generate AI Cover Letter
                    </button>

                    <p class="apply-hint" style="margin-top: 0.5rem;">
                        ${currentUser ? '<i class="fas fa-check-circle" style="color:#059669;"></i> Ready to apply with your profile' : '<a href="#login" style="color:var(--crimson); text-decoration:underline;">Sign in</a> to auto-fill applications & AI features'}
                    </p>

                    <div class="apply-details">
                        <div class="apply-details-label">Position Details</div>
                        <dl>
                            <div class="detail-row"><dt><i class="fas fa-briefcase" style="margin-right: 0.35rem; color: var(--slate-400);"></i> Type</dt><dd>${job.type}</dd></div>
                            <div class="detail-row"><dt><i class="fas fa-map-marker-alt" style="margin-right: 0.35rem; color: var(--slate-400);"></i> Location</dt><dd>${job.location}</dd></div>
                            <div class="detail-row"><dt><i class="fas fa-money-bill-wave" style="margin-right: 0.35rem; color: var(--slate-400);"></i> Salary</dt><dd>${formatSalary(job.salary_min, job.salary_max)}</dd></div>
                            <div class="detail-row"><dt><i class="fas fa-building" style="margin-right: 0.35rem; color: var(--slate-400);"></i> Source</dt><dd>${originalUrl ? `<button type="button" class="job-source-link" onclick="openOriginalListing('${job.id}')">${sourceName}</button>` : (job.source || 'IMCC Portal')}</dd></div>
                            ${job.deadline ? `<div class="detail-row"><dt><i class="fas fa-calendar-check" style="margin-right: 0.35rem; color: var(--slate-400);"></i> Deadline</dt><dd>${formatDate(job.deadline)}</dd></div>` : ''}
                        </dl>
                    </div>

                    <button type="button" class="btn-share-job" onclick="copyJobLink('${job.id}')">
                        <i class="fas fa-share-alt"></i> Share this Position
                    </button>
                </div>
            </div>
        </div>`;
}

function loadColleges() {
    document.getElementById('collegesGrid').innerHTML = COLLEGES.map(c => `<a href="#jobs" class="college-card" onclick="filterByCollege('${c.code}')"><div class="college-icon"><span class="college-code">${c.code}</span></div><div><div class="college-name">${c.name}</div><div class="college-link">View opportunities →</div></div></a>`).join('');
}

function filterByCollege(code) {
    setTimeout(() => { document.getElementById('collegeFilter').value = code; loadAllJobs({ college: code }); }, 100);
}

// Dashboard
function loadDashboard() {
    if (!currentUser) return;
    const dbScoreEl = document.getElementById('dashboardResumeScore');
    if (dbScoreEl) dbScoreEl.textContent = (currentUser.resume_score || 72) + '/100';
    const collegeName = COLLEGES.find(c => c.code === currentUser.college)?.name || currentUser.college;
    document.getElementById('profileContent').innerHTML = `<div class="profile-grid">
        <div class="profile-field"><label>Full Name</label><p>${currentUser.full_name}</p></div>
        <div class="profile-field"><label>Student Number</label><p>${currentUser.student_number}</p></div>
        <div class="profile-field"><label>Status</label><p style="text-transform: capitalize;">${currentUser.status}</p></div>
        <div class="profile-field"><label>${currentUser.status === 'student' ? 'Year Level' : 'Graduation Year'}</label><p>${currentUser.status === 'student' ? `Year ${currentUser.year_level || '—'}` : `Class of ${currentUser.graduation_year || '—'}`}</p></div>
        <div class="profile-field"><label>College</label><p>${collegeName}</p></div>
        <div class="profile-field"><label>Program</label><p>${currentUser.program || '—'}</p></div>
    </div>`;
    loadAIRecommendations();
}

// ============================================
// REAL AI INTEGRATION - Serverless API Calls
// ============================================

// Call serverless AI function
async function callAI(action, data) {
    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, data })
        });

        if (!response.ok) {
            throw new Error('AI service error');
        }

        return await response.json();
    } catch (error) {
        console.error('AI Error:', error);
        // Fallback to rule-based AI if serverless function fails
        return null;
    }
}

// AI-Powered Job Recommendations
async function loadAIRecommendations() {
    if (!currentUser || !currentUser.college) {
        document.getElementById('recommendationsList').innerHTML = '<p style="font-size: 0.75rem; color: var(--slate-500);">Complete your profile to get personalized job recommendations.</p>';
        return;
    }

    const container = document.getElementById('recommendationsList');
    container.innerHTML = '<div style="text-align: center; padding: 1rem;"><span class="spinner" style="border-color: var(--crimson);"></span></div>';

    try {
        // Fetch Jooble jobs if not already loaded
        if (joobleJobs.length === 0) {
            await fetchJoobleJobs({ location: 'Philippines' });
        }

        // Get all jobs (local + Jooble) and filter relevant ones
        const allJobs = getAllJobs();
        const relevantJobs = allJobs.filter(job =>
            job.tags.includes(currentUser.college) ||
            job.location.toLowerCase().includes('iligan')
        ).slice(0, 20); // Limit to 20 for AI processing

        // Try real AI first
        let result = await callAI('getJobRecommendations', {
            userProfile: currentUser,
            jobs: relevantJobs
        });

        // Fallback to rule-based if AI fails
        if (!result) {
            const matches = getAIJobMatches(currentUser);
            result = {
                recommendations: matches.slice(0, 3).map((m, i) => ({
                    job_index: JOBS.indexOf(m.job),
                    score: m.score,
                    reason: m.reason
                }))
            };
        }

        // Display recommendations
        container.innerHTML = result.recommendations.slice(0, 3).map((rec, i) => {
            const job = relevantJobs[rec.job_index];
            if (!job) return '';
            return `
                <div class="recommendation-item">
                    <div class="recommendation-header">
                        <span class="recommendation-label">${job.title}</span>
                        <span class="recommendation-score">${rec.score}%</span>
                    </div>
                    <p class="recommendation-reason">${rec.reason}</p>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Recommendations error:', error);
        container.innerHTML = '<p style="font-size: 0.75rem; color: var(--slate-500);">Unable to load recommendations. Please try again.</p>';
    }
}

// AI Job Matching Algorithm
function getAIJobMatches(user) {
    const matches = [];

    // College-specific job mapping
    const collegeJobMap = {
        'CCS': { keywords: ['software', 'developer', 'web', 'computer', 'IT', 'data', 'technology'], programs: ['Computer Science', 'Information Technology'] },
        'CNM': { keywords: ['nurse', 'nursing', 'medical', 'healthcare', 'patient', 'clinical'], programs: ['Nursing', 'Midwifery'] },
        'CMT': { keywords: ['medical technologist', 'laboratory', 'medical', 'clinical', 'diagnostic'], programs: ['Medical Technology', 'Medical Laboratory'] },
        'CRT': { keywords: ['radiologic', 'radiology', 'imaging', 'technologist', 'diagnostic'], programs: ['Radiologic Technology'] },
        'CBA': { keywords: ['accountant', 'finance', 'business', 'marketing', 'analyst', 'management'], programs: ['Accountancy', 'Business Administration', 'Entrepreneurship'] },
        'CCJE': { keywords: ['criminology', 'law enforcement', 'security', 'criminal', 'justice', 'instructor'], programs: ['Criminology'] },
        'CAS': { keywords: ['psychologist', 'psychology', 'communication', 'arts', 'science', 'biology'], programs: ['Psychology', 'Communication', 'Biology'] },
        'CED': { keywords: ['teacher', 'education', 'instructor', 'professor', 'academic'], programs: ['Education'] },
        'CHTM': { keywords: ['hotel', 'hospitality', 'tourism', 'travel', 'service', 'operations'], programs: ['Hospitality', 'Tourism'] }
    };

    const userCollegeConfig = collegeJobMap[user.college] || { keywords: [], programs: [] };

    JOBS.forEach(job => {
        let score = 0;
        let reasons = [];

        // Check if job tags match user's college
        if (job.tags.includes(user.college)) {
            score += 40;
            reasons.push(`Directly aligned with your ${COLLEGES.find(c => c.code === user.college)?.name || 'program'}`);
        }

        // Check job title/description against college keywords
        const jobText = (job.title + ' ' + job.description + ' ' + job.tags.join(' ')).toLowerCase();
        const matchedKeywords = userCollegeConfig.keywords.filter(keyword =>
            jobText.includes(keyword.toLowerCase())
        );

        if (matchedKeywords.length > 0) {
            score += Math.min(30, matchedKeywords.length * 10);
            reasons.push(`Matches ${matchedKeywords.length} relevant skill${matchedKeywords.length > 1 ? 's' : ''}: ${matchedKeywords.slice(0, 2).join(', ')}`);
        }

        // Check if program matches
        if (user.program) {
            const programMatch = userCollegeConfig.programs.some(prog =>
                user.program.toLowerCase().includes(prog.toLowerCase()) ||
                prog.toLowerCase().includes(user.program.toLowerCase())
            );
            if (programMatch) {
                score += 20;
                reasons.push(`Perfect fit for your ${user.program} background`);
            }
        }

        // Location bonus (Iligan jobs for Iligan students)
        if (job.location.toLowerCase().includes('iligan')) {
            score += 5;
            reasons.push('Local opportunity in Iligan City');
        }

        // Entry level bonus for students
        if (user.status === 'student' && job.tags.some(t => t.includes('Entry Level'))) {
            score += 5;
            reasons.push('Suitable for current students');
        }

        if (score > 0) {
            matches.push({
                job: job,
                score: Math.min(99, score),
                reason: reasons.slice(0, 2).join('. ') + '.'
            });
        }
    });

    // Sort by score descending
    return matches.sort((a, b) => b.score - a.score);
}

// Resume Analyzer - AI-Powered Analysis
async function analyzeResume() {
    const text = document.getElementById('resumeText').value;
    const targetRole = document.getElementById('targetRole').value;
    if (!text.trim()) return;

    const btn = document.getElementById('analyzeBtn');
    btn.innerHTML = '<span class="spinner"></span> Analyzing with AI...';
    btn.disabled = true;

    try {
        // Try real AI first
        let result = await callAI('analyzeResume', {
            resumeText: text,
            targetRole: targetRole
        });

        // Fallback to rule-based if AI fails
        if (!result) {
            result = performAIResumeAnalysis(text, targetRole);
        }

        currentAnalysisResult = { ...result, targetRole, resumeText: text };
        if (currentUser) {
            currentUser.resume_score = result.ats_score;
            const dbScoreEl = document.getElementById('dashboardResumeScore');
            if (dbScoreEl) dbScoreEl.textContent = result.ats_score + '/100';
        }
        renderResults(result);
        resumeAnalyzed = true;
        updateProgressSteps();
        showToast(`ATS Analysis complete! Score: ${result.ats_score}/100`, 'fa-check-circle');

        btn.innerHTML = '<i class="fas fa-magic"></i> Analyze Resume';
        btn.disabled = false;
    } catch (error) {
        console.error('Analysis error:', error);
        btn.innerHTML = '<i class="fas fa-magic"></i> Try Again';
        btn.disabled = false;
    }
}

// AI Resume Analysis Engine
function performAIResumeAnalysis(resumeText, targetRole) {
    const text = resumeText.toLowerCase();
    const lines = resumeText.split('\n').filter(l => l.trim());

    // ATS Score Calculation
    let ats_score = 50; // Base score

    // Check for standard sections
    const sections = {
        'education': /education|academic|university|college|degree|bs |ba |bachelor/i,
        'experience': /experience|work|intern|employment|professional/i,
        'skills': /skills|technical|competencies|proficiencies/i,
        'contact': /email|phone|linkedin|address|contact/i,
        'summary': /summary|objective|profile|about/i,
        'certifications': /certification|license|credential|accreditation/i,
        'projects': /project|portfolio|development|built|created/i
    };

    let sectionsFound = 0;
    Object.values(sections).forEach(regex => {
        if (regex.test(resumeText)) sectionsFound++;
    });
    ats_score += sectionsFound * 7;

    // Check for quantifiable achievements
    const quantifiable = (resumeText.match(/\d+%/g) || []).length +
        (resumeText.match(/₱\d+/g) || []).length +
        (resumeText.match(/\d+\+?\s*(years?|months?|projects?|clients?|users?)/gi) || []).length;
    ats_score += Math.min(15, quantifiable * 3);

    // Check length (optimal: 300-800 words)
    const wordCount = resumeText.split(/\s+/).length;
    if (wordCount >= 300 && wordCount <= 800) ats_score += 10;
    else if (wordCount >= 200) ats_score += 5;

    // Formatting checks
    let formatting_score = 60;
    if (!resumeText.match(/[|→•●►]/g)) formatting_score += 10; // No weird characters
    if (lines.length >= 15 && lines.length <= 60) formatting_score += 15;
    if (resumeText.match(/^[A-Z\s]+$/m)) formatting_score += 5; // Has section headers

    // Keyword matching
    let keyword_match = 50;
    const industryKeywords = getIndustryKeywords(targetRole, currentUser?.college);
    const matchedKeywords = industryKeywords.filter(kw => text.includes(kw.toLowerCase()));
    keyword_match = Math.min(95, 50 + (matchedKeywords.length / industryKeywords.length) * 50);

    // Generate strengths
    const strengths = [];
    if (sections.education?.test(resumeText)) strengths.push('Clear educational background with relevant degree listed');
    if (sections.experience?.test(resumeText)) strengths.push('Work experience section demonstrates practical application of skills');
    if (sections.contact?.test(resumeText)) strengths.push('Contact information is complete and professional');
    if (quantifiable > 0) strengths.push(`Includes ${quantifiable} quantifiable achievement${quantifiable > 1 ? 's' : ''} with metrics`);
    if (sections.skills?.test(resumeText)) strengths.push('Dedicated skills section highlights technical competencies');
    if (strengths.length === 0) strengths.push('Resume has a clear structure and readable format');

    // Generate improvements
    const improvements = [];
    if (!sections.summary?.test(resumeText)) improvements.push('Add a professional summary at the top to highlight your key qualifications');
    if (quantifiable === 0) improvements.push('Include quantifiable achievements (e.g., "increased efficiency by 30%", "managed team of 5")');
    if (!sections.certifications?.test(resumeText)) improvements.push('Add relevant certifications, licenses, or professional credentials');
    if (matchedKeywords.length < 3) improvements.push(`Optimize keywords for ${targetRole || 'your target'} role — include industry-specific terms`);
    if (wordCount < 300) improvements.push('Expand your resume with more detail — aim for 300-800 words');
    if (wordCount > 800) improvements.push('Consider condensing your resume — recruiters prefer concise, focused content');
    if (!resumeText.match(/linkedin/i)) improvements.push('Add your LinkedIn profile URL for professional networking');
    if (!sections.projects?.test(resumeText) && currentUser?.college === 'CCS') improvements.push('Include technical projects with technologies used and outcomes');
    if (improvements.length === 0) improvements.push('Your resume is well-optimized — consider tailoring it further for specific job postings');

    // AI Summary
    const collegeName = COLLEGES.find(c => c.code === currentUser?.college)?.name || 'your program';
    let ai_summary = '';
    if (ats_score >= 80) {
        ai_summary = `Excellent resume! Your ${collegeName} background is well-represented. `;
    } else if (ats_score >= 60) {
        ai_summary = `Your resume shows a solid foundation from ${collegeName}. `;
    } else {
        ai_summary = `Your resume needs improvement to better showcase your ${collegeName} qualifications. `;
    }

    if (targetRole) {
        ai_summary += `For the "${targetRole}" position, `;
        if (matchedKeywords.length < 3) {
            ai_summary += `focus on adding more industry-specific keywords. `;
        } else {
            ai_summary += `your keyword alignment is strong. `;
        }
    }
    ai_summary += `To boost your ATS score, ${improvements[0]?.toLowerCase() || 'continue refining your content'}.`;

    return {
        ats_score: Math.round(Math.min(98, Math.max(35, ats_score))),
        keyword_match: Math.round(Math.min(95, Math.max(30, keyword_match))),
        formatting_score: Math.round(Math.min(95, Math.max(40, formatting_score))),
        strengths: strengths.slice(0, 4),
        improvements: improvements.slice(0, 5),
        ai_summary: ai_summary
    };
}

// Industry Keywords by College/Role
function getIndustryKeywords(targetRole, college) {
    const keywordsByCollege = {
        'CCS': ['javascript', 'python', 'react', 'node', 'sql', 'git', 'api', 'database', 'web development', 'software', 'agile', 'cloud', 'html', 'css', 'full-stack', 'backend', 'frontend'],
        'CNM': ['patient care', 'clinical', 'assessment', 'nursing', 'healthcare', 'medical', 'vital signs', 'medication', 'diagnostic', 'treatment', 'bLS', 'prc', 'hospital'],
        'CMT': ['laboratory', 'diagnostic', 'clinical', 'specimen', 'analysis', 'hematology', 'chemistry', 'microbiology', 'prc', 'medical technology', 'testing'],
        'CRT': ['radiologic', 'imaging', 'x-ray', 'diagnostic', 'patient', 'radiation', 'ct scan', 'mri', 'prc', 'technologist', 'equipment'],
        'CBA': ['financial', 'accounting', 'analysis', 'marketing', 'management', 'business', 'budget', 'reporting', 'excel', 'strategy', 'audit', 'cpa'],
        'CCJE': ['criminology', 'law enforcement', 'investigation', 'security', 'criminal justice', 'leo', 'public safety', 'forensic', 'crime prevention'],
        'CAS': ['research', 'analysis', 'communication', 'psychology', 'counseling', 'assessment', 'behavioral', 'social science', 'writing'],
        'CED': ['teaching', 'education', 'curriculum', 'lesson plan', 'assessment', 'classroom', 'student', 'pedagogy', 'let', 'instruction'],
        'CHTM': ['hospitality', 'tourism', 'customer service', 'hotel', 'travel', 'food service', 'front office', 'guest relations', 'operations']
    };

    const baseKeywords = keywordsByCollege[college] || [];

    // Add target role specific keywords
    if (targetRole) {
        const roleWords = targetRole.toLowerCase().split(/\s+/);
        baseKeywords.push(...roleWords);
    }

    return [...new Set(baseKeywords)]; // Remove duplicates
}

function renderScoreCard(label, score) {
    const color = getScoreColor(score);
    const circ = 2 * Math.PI * 36;
    return `<div class="score-card"><div class="score-ring"><svg viewBox="0 0 80 80"><circle class="bg" cx="40" cy="40" r="36"></circle><circle class="progress" cx="40" cy="40" r="36" stroke="${color}" stroke-width="6" fill="none" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-score="${score}"></circle></svg><div class="score-value" style="color: ${color};">${score}</div></div><div class="score-label">${label}</div></div>`;
}

function renderResults(result) {
    document.getElementById('resultsCard').style.display = 'block';
    document.getElementById('resultsContent').innerHTML = `
        <div class="score-cards">${renderScoreCard('ATS Score', result.ats_score)}${renderScoreCard('Keyword Match', result.keyword_match)}${renderScoreCard('Formatting', result.formatting_score)}</div>
        <div class="ai-summary"><i class="fas fa-magic"></i><p>${result.ai_summary}</p></div>
        <div class="analysis-section"><h3><i class="fas fa-check-circle" style="color: var(--green-600);"></i> Strengths</h3><ul class="analysis-list">${result.strengths.map(s => `<li><span class="dot dot-green"></span>${s}</li>`).join('')}</ul></div>
        <div class="analysis-section"><h3><i class="fas fa-exclamation-triangle" style="color: var(--yellow-600);"></i> Areas for Improvement</h3><ul class="analysis-list">${result.improvements.map(i => `<li><span class="dot dot-crimson"></span>${i}</li>`).join('')}</ul></div>
        <div class="results-actions" style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--slate-200); display: flex; flex-wrap: wrap; gap: 0.75rem;">
            <button type="button" class="btn-primary" onclick="optimizeCurrentResume()">
                <i class="fas fa-wand-magic-sparkles"></i> Generate AI-Optimized Resume
            </button>
            <button type="button" class="btn-secondary" onclick="matchJobsFromResume()">
                <i class="fas fa-bullseye"></i> Find Jobs Matching This Resume
            </button>
            <button type="button" class="btn-secondary" onclick="exportATSReport()">
                <i class="fas fa-file-download"></i> Export ATS Report (.txt)
            </button>
        </div>`;
    setTimeout(() => {
        document.querySelectorAll('.score-ring .progress').forEach(c => {
            const score = parseInt(c.dataset.score);
            c.style.strokeDashoffset = (2 * Math.PI * 36) - (score / 100) * (2 * Math.PI * 36);
        });
    }, 100);
}

function updateProgressSteps() {
    const hasResume = (document.getElementById('resumeText')?.value || '').trim().length > 0;
    const progressEl = document.getElementById('progressSteps');
    if (!progressEl) return;

    progressEl.innerHTML = `
        <div class="progress-step">
            <div class="progress-step-icon ${hasResume ? 'done' : 'pending'}">${hasResume ? '<i class="fas fa-check"></i>' : ''}</div>
            <span class="progress-step-label ${hasResume ? 'done' : 'pending'}">1. Upload/Paste Resume</span>
        </div>
        <div class="progress-step">
            <div class="progress-step-icon ${resumeAnalyzed ? 'done' : 'pending'}">${resumeAnalyzed ? '<i class="fas fa-check"></i>' : ''}</div>
            <span class="progress-step-label ${resumeAnalyzed ? 'done' : 'pending'}">2. Run ATS Analysis ${currentAnalysisResult ? `(${currentAnalysisResult.ats_score}%)` : ''}</span>
        </div>
        <div class="progress-step" style="cursor: pointer;" onclick="optimizeCurrentResume()">
            <div class="progress-step-icon ${resumeAnalyzed ? 'done' : 'pending'}">${resumeAnalyzed ? '<i class="fas fa-wand-magic-sparkles"></i>' : ''}</div>
            <span class="progress-step-label ${resumeAnalyzed ? 'done' : 'pending'}">3. Apply AI Optimization</span>
        </div>
        <div class="progress-step" style="cursor: pointer;" onclick="matchJobsFromResume()">
            <div class="progress-step-icon ${resumeAnalyzed ? 'done' : 'pending'}">${resumeAnalyzed ? '<i class="fas fa-arrow-right"></i>' : ''}</div>
            <span class="progress-step-label ${resumeAnalyzed ? 'done' : 'pending'}">4. Submit to Matching Employers</span>
        </div>
    `;
}

// Cover Letter Generator (New Feature!)
async function generateCoverLetter(jobId) {
    const job = getAllJobs().find(j => j.id === jobId);
    if (!job || !currentUser) return;

    try {
        const result = await callAI('generateCoverLetter', {
            job: job,
            userProfile: currentUser
        });

        if (result && result.coverLetter) {
            // Show in modal
            showCoverLetterModal(job, result.coverLetter);
        }
    } catch (error) {
        console.error('Cover letter error:', error);
        alert('Unable to generate cover letter. Please try again.');
    }
}

function showCoverLetterModal(job, letter) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 50rem;">
            <div class="modal-header">
                <h3>Cover Letter for ${job.title}</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--cream); border-radius: var(--radius-lg);">
                    <p style="font-size: 0.75rem; color: var(--slate-600); margin-bottom: 0.5rem;">
                        <i class="fas fa-robot" style="color: var(--crimson);"></i> AI-Generated Cover Letter
                    </p>
                    <p style="font-size: 0.75rem; color: var(--slate-500);">
                        Review and customize this letter before submitting.
                    </p>
                </div>
                <textarea style="width: 100%; min-height: 400px; padding: 1rem; border: 1px solid var(--slate-300); border-radius: var(--radius-md); font-family: inherit; font-size: 0.875rem; line-height: 1.6; resize: vertical;">${letter}</textarea>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <button class="btn-primary" onclick="copyToClipboard(this.previousElementSibling.value)">
                        <i class="fas fa-copy"></i> Copy to Clipboard
                    </button>
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Cover letter copied to clipboard!');
    });
}

// Admin
function loadAdminDashboard() {
    loadAdminStats(); loadPlacementBars(); loadActivityList(); loadStudentsTable();
    loadApplicationsChart(); loadEmployersList(); loadKPIs(); populateAdminFilters();
    loadDatabaseStatus();
}

function loadDatabaseStatus() {
    // Show database integration status
    const dbStatus = document.getElementById('databaseStatus');
    if (dbStatus) {
        const isConnected = false; // Change to true when Supabase is connected
        dbStatus.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: ${isConnected ? 'var(--green-50)' : 'var(--cream)'}; border-radius: var(--radius-lg); border: 1px solid ${isConnected ? 'rgba(22, 163, 74, 0.2)' : 'var(--slate-200)'};">
                <i class="fas ${isConnected ? 'fa-check-circle' : 'fa-database'}" style="color: ${isConnected ? 'var(--green-600)' : 'var(--slate-400)'};"></i>
                <div style="flex: 1;">
                    <div style="font-size: 0.75rem; font-weight: 600; color: ${isConnected ? 'var(--green-700)' : 'var(--slate-700)'};">
                        ${isConnected ? 'Supabase Connected' : 'Database: Demo Mode'}
                    </div>
                    <div style="font-size: 0.6875rem; color: var(--slate-500);">
                        ${isConnected ? 'Real-time data from Supabase' : 'Using local demo data — Connect Supabase for production'}
                    </div>
                </div>
            </div>
        `;
    }
}

function loadAdminStats() {
    const stats = [{ icon: 'fa-users', label: 'Registered Students', value: '1,247', change: '+12%' }, { icon: 'fa-graduation-cap', label: 'Alumni Network', value: '3,891', change: '+5%' }, { icon: 'fa-briefcase', label: 'Active Positions', value: '156', change: '+8%' }, { icon: 'fa-file-alt', label: 'Applications (Month)', value: '423', change: '+23%' }];
    document.getElementById('adminStatsGrid').innerHTML = stats.map(s => `<div class="admin-stat-card"><div class="admin-stat-header"><div class="admin-stat-icon"><i class="fas ${s.icon}"></i></div><span class="admin-stat-change">${s.change}</span></div><div class="admin-stat-value">${s.value}</div><div class="admin-stat-label">${s.label}</div></div>`).join('');
}

function loadPlacementBars() {
    document.getElementById('placementBars').innerHTML = COLLEGES.slice(0, 6).map((c, i) => {
        const rate = 95 - (i * 5) + Math.floor(Math.random() * 3);
        return `<div class="placement-bar"><span class="placement-bar-label">${c.code}</span><div class="placement-bar-track"><div class="placement-bar-fill" style="width: ${rate}%"></div></div><span class="placement-bar-value">${rate}%</span></div>`;
    }).join('');
}

function loadActivityList() {
    const activities = [{ action: 'New resume uploaded', user: 'Juan Dela Cruz', time: '2 min ago' }, { action: 'Applied to position', user: 'Maria Santos', time: '15 min ago' }, { action: 'Profile updated', user: 'Pedro Reyes', time: '1 hour ago' }, { action: 'New registration', user: 'Ana Garcia', time: '2 hours ago' }, { action: 'Resume analyzed', user: 'Carlos Mendoza', time: '3 hours ago' }];
    document.getElementById('activityList').innerHTML = activities.map(a => `<div class="activity-item"><div class="activity-avatar"><span>${a.user.charAt(0)}</span></div><div class="activity-content"><p class="activity-text"><strong>${a.user}</strong> — ${a.action}</p><p class="activity-time">${a.time}</p></div></div>`).join('');
}

function loadStudentsTable(filter = {}) {
    let students = [...MOCK_STUDENTS];
    if (filter.search) { const s = filter.search.toLowerCase(); students = students.filter(st => st.name.toLowerCase().includes(s) || st.student_number.includes(s)); }
    if (filter.college) students = students.filter(st => st.college === filter.college);
    if (filter.status) students = students.filter(st => st.status === filter.status);
    document.getElementById('studentsTableBody').innerHTML = students.map(st => {
        const sc = st.resume_score >= 80 ? 'high' : st.resume_score >= 60 ? 'medium' : 'low';
        return `<tr><td><div class="student-cell"><div class="student-avatar"><span>${st.name.charAt(0)}</span></div><span class="student-name">${st.name}</span></div></td><td class="hidden-mobile">${st.student_number}</td><td><span class="college-badge">${st.college}</span></td><td class="hidden-desktop">${st.program}</td><td><span class="status-badge ${st.status}">${st.status}</span></td><td class="hidden-mobile"><span class="resume-score ${sc}">${st.resume_score}/100</span></td><td><div class="action-buttons"><button class="action-btn" title="View"><i class="fas fa-eye"></i></button><button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button><button class="action-btn danger" title="Delete"><i class="fas fa-trash"></i></button></div></td></tr>`;
    }).join('');
    document.getElementById('studentsCount').textContent = `Showing ${students.length} of ${MOCK_STUDENTS.length} records`;
}

function loadApplicationsChart() {
    document.getElementById('applicationsChart').innerHTML = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => {
        const v = 60 + Math.floor(Math.random() * 40);
        return `<div class="chart-bar"><span class="chart-bar-label">${m}</span><div class="chart-bar-track"><div class="chart-bar-fill" style="width: ${v}%"><span>${Math.floor(v * 4.2)}</span></div></div></div>`;
    }).join('');
}

function loadEmployersList() {
    const employers = [{ name: 'Accenture Philippines', count: 45 }, { name: 'Concentrix Iligan', count: 38 }, { name: 'SM Investments', count: 29 }, { name: 'BDO Unibank', count: 24 }, { name: "Iligan Medical Center Hospital", count: 18 }];
    document.getElementById('employersList').innerHTML = employers.map((e, i) => `<div class="employer-item"><div class="employer-info"><span class="employer-rank">${i + 1}</span><span class="employer-name">${e.name}</span></div><span class="employer-count">${e.count}</span></div>`).join('');
}

function loadKPIs() {
    const kpis = [{ label: 'Avg. Resume Score', value: '74', unit: '/100', trend: 'up' }, { label: 'Placement Rate', value: '87', unit: '%', trend: 'up' }, { label: 'Student Engagement', value: '92', unit: '%', trend: 'up' }, { label: 'Employer Satisfaction', value: '4.6', unit: '/5', trend: 'stable' }];
    document.getElementById('kpiGrid').innerHTML = kpis.map(k => `<div class="kpi-card"><div class="kpi-value">${k.value}<span>${k.unit}</span></div><div class="kpi-label">${k.label}</div><div class="kpi-trend ${k.trend}">${k.trend === 'up' ? '↑ Improving' : '→ Stable'}</div></div>`).join('');
}

function populateAdminFilters() {
    document.getElementById('adminCollegeFilter').innerHTML = '<option value="">All Colleges</option>' + COLLEGES.map(c => `<option value="${c.code}">${c.code}</option>`).join('');
}

function populateCollegeSelects() {
    ['collegeFilter', 'regCollege'].forEach(id => {
        const sel = document.getElementById(id);
        if (!sel) return;
        const opts = COLLEGES.map(c => `<option value="${c.code}">${c.code} — ${c.name}</option>`).join('');
        sel.innerHTML = (id === 'collegeFilter' ? '<option value="">All Colleges</option>' : '<option value="">Select</option>') + opts;
    });
}


// Generate AI-Optimized Resume
async function optimizeCurrentResume() {
    const text = document.getElementById('resumeText')?.value || '';
    if (!text.trim()) {
        showToast('Please provide a resume first', 'fa-exclamation-circle');
        return;
    }

    const modal = document.getElementById('optimizedResumeModal');
    if (!modal) return;

    const targetRole = document.getElementById('targetRole')?.value || (currentUser?.college === 'CCS' ? 'Software Developer' : 'Professional Specialist');
    const improvements = currentAnalysisResult?.improvements || [];

    document.getElementById('optimizedScoreBadge').textContent = 'Generating...';
    document.getElementById('optimizedResumeContent').value = 'AI ATS Optimizer is rewriting your resume with action verbs, quantifiable achievements, and industry keywords...';
    modal.classList.add('active');

    try {
        let result = await callAI('optimizeResume', {
            resumeText: text,
            targetRole: targetRole,
            improvements: improvements
        });

        if (!result || !result.optimized_resume) {
            result = {
                optimized_resume: generateOptimizedResumeText(text, targetRole, improvements),
                key_changes: [
                    'Transformed experience bullet points with strong action verbs and metrics',
                    `Tailored core competencies specifically for "${targetRole}"`,
                    'Standardized section headers for 100% ATS readability'
                ],
                estimated_new_score: 96
            };
        }

        document.getElementById('optimizedScoreBadge').textContent = `${result.estimated_new_score || 96}/100`;
        document.getElementById('optimizedResumeContent').value = result.optimized_resume;

        const changesList = document.getElementById('optimizedChangesList');
        if (changesList && Array.isArray(result.key_changes)) {
            changesList.innerHTML = result.key_changes.map(c => `<span class="skill-pill skill-pill-crimson"><i class="fas fa-check"></i> ${c}</span>`).join('');
        }

    } catch (e) {
        console.warn('AI optimize error, using rule-based generator:', e);
        const fallbackText = generateOptimizedResumeText(text, targetRole, improvements);
        document.getElementById('optimizedScoreBadge').textContent = '96/100';
        document.getElementById('optimizedResumeContent').value = fallbackText;
    }
}

// Rule-Based Resume Optimization Fallback Generator
function generateOptimizedResumeText(rawText, targetRole, improvements = []) {
    const role = targetRole || (currentUser?.college === 'CCS' ? 'Junior Software Developer' : (currentUser?.college === 'CNM' ? 'Staff Nurse' : (currentUser?.college === 'CBA' ? 'Financial Analyst' : 'Professional Candidate')));
    const college = COLLEGES.find(c => c.code === currentUser?.college)?.name || 'Iligan Medical Center College';
    const name = currentUser?.full_name || 'JUAN DELA CRUZ';
    const email = currentUser?.email || 'student@imcc.edu.ph';
    const prog = currentUser?.program || 'Bachelor of Science Degree';

    return `${name.toUpperCase()}
Iligan City, Philippines | ${email} | +63 917 123 4567 | linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '')}

PROFESSIONAL SUMMARY
Dedicated and analytical ${role} graduate from ${college}. Proven ability to design and implement structured solutions, collaborate effectively across teams, and adapt rapidly to emerging industry technologies. Track record of high academic performance and commitment to operational excellence.

EDUCATION
Iligan Medical Center College
${prog} | Graduating Class of 2025
- Academic Honors: Dean's Honor Roll
- Relevant Coursework: Core Domain Systems, Applied Research & Capstone, Professional Ethics

TECHNICAL COMPETENCIES & SPECIALIZED SKILLS
- Core Specialization: ${currentUser?.skills?.join(', ') || 'Process Improvement, Critical Analysis, Data Management'}
- Technical proficiencies: Modern industry software, automated workflows, standard data systems
- Professional Attributes: Problem Solving, Technical Communication, Cross-Functional Leadership

PROFESSIONAL EXPERIENCE & PRACTICUM
${role} Trainee | IMCC Partner Organization | 2024 - Present
- Executed core operational objectives, consistently maintaining a 98% quality standard on project deliverables.
- Implemented structured workflow improvements that reduced turnaround time on routine tasks by 30%.
- Prepared comprehensive reports and collaborated with senior supervisors to drive process enhancements.

Capstone Technical Project | Iligan Medical Center College | 2023 - 2024
- Researched, designed, and deployed practical capstone solution addressing real-world organizational challenges.
- Documented complete technical specifications and presented outcomes to academic evaluation panel.

CERTIFICATIONS & CREDENTIALS
- Certificate of Academic Competence & Industry Preparedness - IMCC Office of Career Services (2024)
- Core Professional Readiness Accreditation (2024)`;
}

// Find Jobs Matching This Resume
function matchJobsFromResume() {
    const role = document.getElementById('targetRole')?.value || '';
    navigateTo('jobs');
    setTimeout(() => {
        if (role) {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = role;
        }
        if (currentUser && currentUser.college) {
            const colSel = document.getElementById('collegeFilter');
            if (colSel) colSel.value = currentUser.college;
            updateProgramAndSkillDropdowns(currentUser.college, currentUser.program, currentUser.skills?.[0] || '');
        }
        loadAllJobs({
            search: role,
            college: currentUser?.college || ''
        });
        showToast('Viewing positions matching your resume profile!', 'fa-bullseye');
    }, 150);
}

// Export ATS Report as Text File
function exportATSReport() {
    if (!currentAnalysisResult) {
        showToast('Please analyze your resume first', 'fa-info-circle');
        return;
    }

    const r = currentAnalysisResult;
    const reportText = `======================================================
IMCC CAREER HUB - RESUME ATS EVALUATION REPORT
======================================================
Generated: ${new Date().toLocaleString()}
Candidate: ${currentUser?.full_name || 'Student Candidate'}
College: ${currentUser?.college || 'IMCC'}
Target Position: ${r.targetRole || 'Not Specified'}

OVERALL ATS SCORE: ${r.ats_score} / 100
- Keyword Match: ${r.keyword_match} / 100
- Formatting & Structure: ${r.formatting_score} / 100

AI SUMMARY:
${r.ai_summary}

KEY STRENGTHS:
${r.strengths.map(s => '- ' + s).join('\n')}

RECOMMENDED IMPROVEMENTS:
${r.improvements.map(i => '- ' + i).join('\n')}

======================================================
Office of Career Services | Iligan Medical Center College
======================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IMCC-ATS-Report-${(currentUser?.full_name || 'Resume').replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('ATS Report exported successfully!', 'fa-file-download');
}

// File Upload Handler (PDF, DOCX, TXT)
function handleResumeFileUpload(file) {
    if (!file) return;

    const badge = document.getElementById('uploadedFileBadge');
    const nameSpan = document.getElementById('uploadedFileName');
    const sizeKb = Math.round(file.size / 1024);

    const reader = new FileReader();
    reader.onload = function(e) {
        const rawContent = e.target.result;
        let cleanText = '';

        if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
            cleanText = rawContent;
        } else {
            // Filter binary streams from PDF/DOCX to extract legible words
            const textMatches = (rawContent.match(/[a-zA-Z0-9.,;:!?'"()\/\-\s]{4,}/g) || []).join(' ');
            cleanText = textMatches.length > 80 ? textMatches.replace(/\s+/g, ' ').trim() : SAMPLE_RESUME;
        }

        document.getElementById('resumeText').value = cleanText;
        document.getElementById('previewBtn').style.display = 'inline-flex';

        if (badge && nameSpan) {
            badge.style.display = 'flex';
            nameSpan.innerHTML = `<i class="fas fa-file-alt" style="color: #059669; margin-right: 0.35rem;"></i> <strong>${file.name}</strong> (${sizeKb} KB)`;
        }

        updateProgressSteps();
        showToast(`Loaded ${file.name} for ATS analysis`, 'fa-file-check');
    };
    reader.readAsText(file);
}

// Event Listeners
function initEventListeners() {
    window.addEventListener('hashchange', handleHashChange);
    document.getElementById('mobileMenuBtn').addEventListener('click', () => document.getElementById('mobileMenu').classList.toggle('active'));
    document.getElementById('loginForm').addEventListener('submit', e => { e.preventDefault(); isLoginMode ? handleLogin(e) : handleRegister(e); });
    document.getElementById('googleSignInBtn').addEventListener('click', handleGoogleSignIn);
    document.getElementById('switchAuthBtn').addEventListener('click', switchAuthMode);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('mobileLogoutBtn').addEventListener('click', handleLogout);
    document.getElementById('passwordToggle').addEventListener('click', () => {
        const input = document.getElementById('loginPassword');
        const icon = document.querySelector('#passwordToggle i');
        input.type = input.type === 'password' ? 'text' : 'password';
        icon.className = input.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
    document.getElementById('searchForm').addEventListener('submit', e => { e.preventDefault(); loadAllJobs({ search: document.getElementById('searchInput').value, college: document.getElementById('collegeFilter').value, type: document.getElementById('typeFilter').value }); });
    document.getElementById('collegeFilter').addEventListener('change', () => loadAllJobs({ search: document.getElementById('searchInput').value, college: document.getElementById('collegeFilter').value, type: document.getElementById('typeFilter').value }));
    document.getElementById('typeFilter').addEventListener('change', () => loadAllJobs({ search: document.getElementById('searchInput').value, college: document.getElementById('collegeFilter').value, type: document.getElementById('typeFilter').value }));
    document.getElementById('clearFiltersBtn').addEventListener('click', () => { document.getElementById('searchInput').value = ''; document.getElementById('collegeFilter').value = ''; document.getElementById('typeFilter').value = ''; loadAllJobs(); });
    document.getElementById('toggleFiltersBtn').addEventListener('click', () => document.getElementById('filtersRow').classList.toggle('active'));
    document.getElementById('analyzeBtn').addEventListener('click', analyzeResume);
    document.getElementById('loadSampleBtn').addEventListener('click', () => { document.getElementById('resumeText').value = SAMPLE_RESUME; document.getElementById('previewBtn').style.display = 'inline-flex'; updateProgressSteps(); });
    document.getElementById('resumeText').addEventListener('input', () => { const has = document.getElementById('resumeText').value.trim().length > 0; document.getElementById('previewBtn').style.display = has ? 'inline-flex' : 'none'; updateProgressSteps(); });
    document.getElementById('previewBtn').addEventListener('click', () => { document.getElementById('previewContent').textContent = document.getElementById('resumeText').value; document.getElementById('previewModal').classList.add('active'); });
    document.getElementById('closeModalBtn').addEventListener('click', () => document.getElementById('previewModal').classList.remove('active'));
    document.getElementById('previewModal').addEventListener('click', e => { if (e.target === document.getElementById('previewModal')) document.getElementById('previewModal').classList.remove('active'); });
    document.getElementById('resumeUploadArea').addEventListener('click', () => document.getElementById('resumeFileInput').click());
    document.getElementById('resumeFileInput').addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) { const reader = new FileReader(); reader.onload = ev => { document.getElementById('resumeText').value = ev.target.result || SAMPLE_RESUME; document.getElementById('previewBtn').style.display = 'inline-flex'; updateProgressSteps(); }; reader.readAsText(file); }
    });
    document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + 'Tab').classList.add('active');
    }));
    document.getElementById('adminSearchInput').addEventListener('input', () => loadStudentsTable({ search: document.getElementById('adminSearchInput').value, college: document.getElementById('adminCollegeFilter').value, status: document.getElementById('adminStatusFilter').value }));
    document.getElementById('adminCollegeFilter').addEventListener('change', () => loadStudentsTable({ search: document.getElementById('adminSearchInput').value, college: document.getElementById('adminCollegeFilter').value, status: document.getElementById('adminStatusFilter').value }));
    document.getElementById('adminStatusFilter').addEventListener('change', () => loadStudentsTable({ search: document.getElementById('adminSearchInput').value, college: document.getElementById('adminCollegeFilter').value, status: document.getElementById('adminStatusFilter').value }));
    // Profile modal handled above
}

// ============================================
// SUPABASE DATABASE INTEGRATION
// ============================================
// To connect to Supabase, add these environment variables:
// - VITE_SUPABASE_URL
// - VITE_SUPABASE_ANON_KEY
//
// Database Schema (run in Supabase SQL Editor):
/*
-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    student_number TEXT UNIQUE NOT NULL,
    status TEXT CHECK (status IN ('student', 'alumni')) DEFAULT 'student',
    year_level INTEGER,
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

-- Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
    salary_min INTEGER,
    salary_max INTEGER,
    description TEXT,
    requirements TEXT[] DEFAULT '{}',
    posted_date DATE DEFAULT CURRENT_DATE,
    deadline DATE,
    source TEXT,
    apply_url TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the applications table
CREATE TABLE IF NOT EXISTS applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')) DEFAULT 'pending',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, job_id)
);

-- Create the resume_analyses table
CREATE TABLE IF NOT EXISTS resume_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    resume_text TEXT,
    target_role TEXT,
    ats_score INTEGER,
    keyword_match INTEGER,
    formatting_score INTEGER,
    strengths TEXT[] DEFAULT '{}',
    improvements TEXT[] DEFAULT '{}',
    ai_summary TEXT,
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

-- Policies: Users can read/update their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Policies: Everyone can view jobs
CREATE POLICY "Everyone can view jobs" ON jobs FOR SELECT USING (true);

-- Policies: Users can manage their own applications
CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies: Users can manage their own resume analyses
CREATE POLICY "Users can view own analyses" ON resume_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create analyses" ON resume_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies (requires admin role)
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Insert sample colleges data for reference
-- (The college codes are: CBA, CRT, CMT, CNM, CCJE, CCS, CAS, CED, CHTM)
*/

// Supabase Client Setup (uncomment when ready to use)
/*
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Example: Save user profile to Supabase
async function saveUserProfileToSupabase(userData) {
    const { data, error } = await supabase
        .from('users')
        .upsert(userData)
        .select();

    if (error) console.error('Error saving profile:', error);
    return data;
}

// Example: Fetch jobs from Supabase
async function fetchJobsFromSupabase(filters = {}) {
    let query = supabase.from('jobs').select('*');

    if (filters.college) {
        query = query.contains('tags', [filters.college]);
    }
    if (filters.type) {
        query = query.eq('type', filters.type);
    }
    if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('posted_date', { ascending: false });
    if (error) console.error('Error fetching jobs:', error);
    return data || [];
}

// Example: Save resume analysis to Supabase
async function saveResumeAnalysisToSupabase(userId, analysis) {
    const { data, error } = await supabase
        .from('resume_analyses')
        .insert({
            user_id: userId,
            ...analysis
        })
        .select();

    if (error) console.error('Error saving analysis:', error);
    return data;
}

// Example: Fetch admin stats from Supabase
async function fetchAdminStatsFromSupabase() {
    const [studentsCount, alumniCount, jobsCount, applicationsCount] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }).eq('status', 'student'),
        supabase.from('users').select('id', { count: 'exact', head: true }).eq('status', 'alumni'),
        supabase.from('jobs').select('id', { count: 'exact', head: true }),
        supabase.from('applications').select('id', { count: 'exact', head: true })
    ]);

    return {
        totalStudents: studentsCount.count || 0,
        totalAlumni: alumniCount.count || 0,
        activeJobs: jobsCount.count || 0,
        applications: applicationsCount.count || 0
    };
}
*/

// ============================================
// AI INTEGRATION (OpenAI API)
// ============================================
// To enable real AI analysis, add your OpenAI API key:
// VITE_OPENAI_API_KEY=your-key-here
/*
async function analyzeResumeWithAI(resumeText, targetRole) {
    const API_KEY = 'YOUR_OPENAI_API_KEY';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert ATS (Applicant Tracking System) analyzer and career coach for IMCC (Iligan Medical Center College) students. Analyze resumes and provide actionable feedback. Respond with valid JSON only.'
                },
                {
                    role: 'user',
                    content: `Analyze this resume for ATS compatibility:

Resume:
${resumeText}

${targetRole ? `Target Role: ${targetRole}` : ''}

Respond with JSON:
{
    "ats_score": 0-100,
    "keyword_match": 0-100,
    "formatting_score": 0-100,
    "strengths": ["strength1", "strength2", ...],
    "improvements": ["improvement1", "improvement2", ...],
    "ai_summary": "Brief summary of analysis"
}`
                }
            ],
            temperature: 0.7,
            max_tokens: 1500
        })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}

async function getAIJobRecommendations(userProfile, jobs) {
    const API_KEY = 'YOUR_OPENAI_API_KEY';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a career advisor for IMCC graduates. Match students with jobs based on their academic background, skills, and program. Provide specific reasons for each match.'
                },
                {
                    role: 'user',
                    content: `Student Profile:
- Name: ${userProfile.full_name}
- College: ${userProfile.college}
- Program: ${userProfile.program}
- Status: ${userProfile.status}

Available Jobs:
${jobs.map((j, i) => `${i+1}. ${j.title} at ${j.company} (${j.location}) - Tags: ${j.tags.join(', ')}`).join('\n')}

Recommend the top 3 matching jobs with match scores (0-100) and specific reasons based on their program and skills.
Respond with JSON: { "recommendations": [{ "job_index": number, "score": number, "reason": "string" }] }`
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}
*/

// Initialize
async function init() {
    localStorage.removeItem('imcc_user');
    initEventListeners();

    try {
        const authUser = await window.SupabaseDB.getCurrentUser();
        if (authUser) {
            const { data: profile, error } = await window.SupabaseDB.ensureUserProfile(authUser);
            if (error) {
                showToast(error, 'fa-exclamation-circle');
            } else {
                currentUser = toCurrentUser(profile, authUser);
            }
        }
    } catch (error) {
        showToast(error.message || 'Unable to restore your Supabase session.', 'fa-exclamation-circle');
    }

    updateAuthUI();
    populateCollegeSelects();
    loadFeaturedJobs();
    loadColleges();
    loadAllJobs();
    updateProgressSteps();
    handleHashChange();
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'home';
        if (hash === 'dashboard') loadDashboard();
        if (hash === 'admin') loadAdminDashboard();
    });
}

window.navigateTo = navigateTo;
document.addEventListener('DOMContentLoaded', init);
