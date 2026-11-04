import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env manually for the dev-server plugin
function loadEnv() {
    try {
        const envFile = readFileSync(resolve(process.cwd(), '.env'), 'utf-8');
        const vars = {};
        envFile.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx === -1) return;
            const key = trimmed.slice(0, eqIdx).trim();
            const value = trimmed.slice(eqIdx + 1).trim();
            vars[key] = value;
        });
        return vars;
    } catch {
        return {};
    }
}

// Vite plugin: serve /api/jooble locally (mimics Vercel serverless function)
function localApiPlugin() {
    const env = loadEnv();
    const JOOBLE_API_KEY = env.JOOBLE_API_KEY || process.env.JOOBLE_API_KEY;

    return {
        name: 'local-api',
        configureServer(server) {
            server.middlewares.use('/api/jooble', async (req, res) => {
                res.setHeader('Content-Type', 'application/json');

                if (!JOOBLE_API_KEY) {
                    console.warn('[local-api] JOOBLE_API_KEY not set in .env — returning empty jobs');
                    res.statusCode = 200;
                    res.end(JSON.stringify({ success: false, jobs: [], error: 'No API key' }));
                    return;
                }

                try {
                    // Parse query params
                    const url = new URL(req.url, 'http://localhost');
                    const keywords = url.searchParams.get('keywords') || '';
                    const location = url.searchParams.get('location') || 'Philippines';
                    const page = parseInt(url.searchParams.get('page') || '1', 10);

                    const joobleEndpoint = `https://jooble.org/api/${JOOBLE_API_KEY}`;

                    const joobleRes = await fetch(joobleEndpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify({ keywords, location, page, pagesize: 40 })
                    });

                    if (!joobleRes.ok) {
                        throw new Error(`Jooble responded with ${joobleRes.status}`);
                    }

                    const data = await joobleRes.json();
                    const rawJobs = data.jobs || [];

                    // Transform to app format (same logic as api/jooble.js)
                    const today = new Date();
                    const jobs = rawJobs
                        .filter(job => {
                            if (job.updated) {
                                const days = Math.floor((today - new Date(job.updated)) / 86400000);
                                if (days > 30) return false;
                            }
                            return true;
                        })
                        .map((job, i) => {
                            const text = `${job.title || ''} ${job.snippet || ''}`.toLowerCase();
                            const postedDate = job.updated ? new Date(job.updated) : today;
                            const deadline = new Date(postedDate);
                            deadline.setDate(deadline.getDate() + 14);

                            const type = text.includes('part-time') || text.includes('part time') ? 'Part-time'
                                : text.includes('contract') || text.includes('freelance') ? 'Contract'
                                : text.includes('intern') || text.includes('trainee') ? 'Internship'
                                : 'Full-time';

                            const tags = inferTags(text);

                            return {
                                id: `jooble-${job.id || i}`,
                                title: job.title || 'Untitled Position',
                                company: job.company || 'Unknown Company',
                                location: job.location || 'Philippines',
                                type,
                                salary_min: null,
                                salary_max: null,
                                description: cleanSnippet(job.snippet || job.title || ''),
                                requirements: [],
                                posted_date: job.updated ? job.updated.split('T')[0] : today.toISOString().split('T')[0],
                                deadline: deadline.toISOString().split('T')[0],
                                source: job.source || 'Jooble',
                                apply_url: job.link || '',
                                tags,
                                isJooble: true,
                                daysAgo: job.updated ? Math.floor((today - new Date(job.updated)) / 86400000) : 0
                            };
                        });

                    res.statusCode = 200;
                    res.end(JSON.stringify({
                        success: true,
                        total: data.totalCount || jobs.length,
                        page,
                        lastRefreshed: new Date().toISOString(),
                        jobs
                    }));
                } catch (err) {
                    console.error('[local-api] Jooble error:', err.message);
                    res.statusCode = 200; // Return 200 so app treats as "no jobs" not error
                    res.end(JSON.stringify({ success: false, jobs: [], error: err.message }));
                }
            });
        }
    };
}

function cleanSnippet(snippet) {
    return String(snippet)
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

function inferTags(text) {
    const map = {
        'CCS': ['software', 'developer', 'programmer', 'it', 'computer', 'web', 'data', 'tech', 'digital', 'network', 'database'],
        'CNM': ['nurse', 'nursing', 'midwife', 'patient care', 'clinical', 'healthcare', 'medical', 'hospital'],
        'CMT': ['medical technologist', 'medtech', 'laboratory', 'lab tech'],
        'CRT': ['radiologic', 'radiology', 'x-ray', 'radiographer', 'imaging'],
        'CBA': ['accountant', 'finance', 'business', 'marketing', 'analyst', 'management', 'banking', 'audit'],
        'CCJE': ['criminology', 'security', 'law enforcement', 'police'],
        'CAS': ['psychology', 'communication', 'biology', 'chemistry', 'arts', 'science'],
        'CED': ['teacher', 'education', 'instructor', 'professor', 'tutor'],
        'CHTM': ['hotel', 'hospitality', 'tourism', 'travel', 'restaurant', 'food service', 'chef']
    };
    const tags = [];
    for (const [college, kws] of Object.entries(map)) {
        if (kws.some(kw => text.includes(kw))) tags.push(college);
    }
    if (text.includes('entry level') || text.includes('fresh grad') || text.includes('junior')) tags.push('Entry Level');
    if (text.includes('senior') || text.includes('lead') || text.includes('manager')) tags.push('Mid Level');
    return tags.length > 0 ? tags : ['General'];
}

export default defineConfig({
    root: '.',
    publicDir: false,
    plugins: [localApiPlugin()],
    server: {
        port: 3000,
        open: true
    },
    // Ensure static files are served from root
    build: {
        outDir: 'dist'
    }
});

