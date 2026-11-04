// api/jooble.js - Vercel Serverless Function for Jooble Job Feed
// Fetches real jobs from Jooble API for Philippines

export default async function handler(req, res) {
    // Allow GET and POST
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const apiKey = process.env.JOOBLE_API_KEY;

        if (!apiKey) {
            console.error('JOOBLE_API_KEY not configured');
            return res.status(500).json({
                error: 'Jooble API key not configured',
                fallback: true
            });
        }

        // Get query parameters
        const { keywords, location, page, jobType } = req.method === 'GET'
            ? req.query
            : req.body;

        // Jooble API endpoint for Philippines
        // Format: https://jooble.org/api/{API_KEY}/ph
        const joobleEndpoint = `https://jooble.org/api/${apiKey}/ph`;

        // Build request body
        const requestBody = {
            keywords: keywords || '',
            location: location || 'Philippines',
            page: page || 1,
            pagesize: 20,
        };

        // Add optional filters
        if (jobType) {
            requestBody.job_type = jobType;
        }

        // Fetch from Jooble
        const response = await fetch(joobleEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Jooble API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // Transform Jooble response to our format
        const jobs = transformJoobleJobs(data.jobs || [], data);

        return res.status(200).json({
            success: true,
            total: data.totalCount || jobs.length,
            page: page || 1,
            lastRefreshed: new Date().toISOString(),
            jobs: jobs
        });

    } catch (error) {
        console.error('Jooble API Error:', error);
        return res.status(500).json({
            error: 'Failed to fetch jobs from Jooble',
            details: error.message,
            fallback: true
        });
    }
}

// Transform Jooble job format to our app format
function transformJoobleJobs(joobleJobs, metadata) {
    const today = new Date();

    return joobleJobs
        .filter(job => {
            // Filter out expired jobs (older than 30 days)
            if (job.updated) {
                const jobDate = new Date(job.updated);
                const daysDiff = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));
                if (daysDiff > 30) return false;
            }
            return true;
        })
        .map((job, index) => {
            // Determine college tags based on job content
            const tags = inferCollegeTags(job);

            // Calculate deadline (14 days from posting)
            const postedDate = job.updated ? new Date(job.updated) : new Date();
            const deadline = new Date(postedDate);
            deadline.setDate(deadline.getDate() + 14);

            return {
                id: `jooble-${job.id || index}`,
                title: job.title || 'Untitled Position',
                company: job.company || 'Unknown Company',
                location: job.location || 'Philippines',
                type: inferJobType(job),
                salary_min: null, // Jooble doesn't always provide salary
                salary_max: null,
                description: job.snippet || job.title || '',
                requirements: extractRequirements(job.snippet || ''),
                posted_date: job.updated ? job.updated.split('T')[0] : new Date().toISOString().split('T')[0],
                deadline: deadline.toISOString().split('T')[0],
                source: 'Jooble',
                apply_url: job.link || '#',
                tags: tags,
                isJooble: true,
                daysAgo: job.updated ? getDaysAgo(job.updated) : 0
            };
        });
}

// Infer college tags from job content
function inferCollegeTags(job) {
    const text = `${job.title || ''} ${job.snippet || ''} ${job.company || ''}`.toLowerCase();
    const tags = [];

    const collegeKeywords = {
        'CCS': ['software', 'developer', 'programmer', 'it', 'computer', 'web', 'data', 'tech', 'digital', 'system admin', 'network', 'database'],
        'CNM': ['nurse', 'nursing', 'midwife', 'patient care', 'clinical', 'healthcare', 'medical', 'hospital', 'doctor'],
        'CMT': ['medical technologist', 'medtech', 'laboratory', 'lab tech', 'clinical lab', 'hematology'],
        'CRT': ['radiologic', 'radiology', 'x-ray', 'radiographer', 'imaging', 'sonographer'],
        'CBA': ['accountant', 'finance', 'business', 'marketing', 'analyst', 'management', 'banking', 'audit', 'tax'],
        'CCJE': ['criminology', 'security', 'law enforcement', 'police', 'investigator', 'legal'],
        'CAS': ['psychology', 'communication', 'biology', 'chemistry', 'physics', 'arts', 'science', 'research'],
        'CED': ['teacher', 'education', 'instructor', 'professor', 'tutor', 'academic', 'training'],
        'CHTM': ['hotel', 'hospitality', 'tourism', 'travel', 'restaurant', 'food service', 'chef', 'front desk']
    };

    for (const [college, keywords] of Object.entries(collegeKeywords)) {
        if (keywords.some(kw => text.includes(kw))) {
            tags.push(college);
        }
    }

    // Add general tags
    if (text.includes('entry level') || text.includes('fresh grad') || text.includes('junior')) {
        tags.push('Entry Level');
    }
    if (text.includes('senior') || text.includes('lead') || text.includes('manager')) {
        tags.push('Mid Level');
    }

    return tags.length > 0 ? tags : ['General'];
}

// Infer job type from job data
function inferJobType(job) {
    const text = `${job.title || ''} ${job.snippet || ''}`.toLowerCase();

    if (text.includes('part-time') || text.includes('part time')) return 'Part-time';
    if (text.includes('contract') || text.includes('freelance')) return 'Contract';
    if (text.includes('intern') || text.includes('trainee')) return 'Internship';
    return 'Full-time';
}

// Extract requirements from snippet
function extractRequirements(snippet) {
    if (!snippet) return [];

    // Try to find bullet points or requirements
    const sentences = snippet.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.slice(0, 4).map(s => s.trim());
}

// Calculate days ago
function getDaysAgo(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    return Math.floor((today - date) / (1000 * 60 * 60 * 24));
}
