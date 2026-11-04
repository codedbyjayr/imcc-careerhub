// api/cron/refresh-jobs.js - Daily job refresh cron job
// Runs automatically every day via Vercel Cron

export default async function handler(req, res) {
    // Verify this is a cron request (Vercel adds this header)
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // For development, allow without auth
        if (process.env.NODE_ENV !== 'development') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    try {
        const apiKey = process.env.JOOBLE_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'JOOBLE_API_KEY not configured' });
        }

        // Fetch fresh jobs from Jooble for Philippines
        const joobleEndpoint = `https://jooble.org/api/${apiKey}/ph`;

        // Search for various categories relevant to IMCC colleges
        const searches = [
            { keywords: 'nurse nursing', location: 'Iligan City' },
            { keywords: 'medical technologist', location: 'Iligan City' },
            { keywords: 'computer science IT developer', location: 'Iligan City' },
            { keywords: 'accounting finance business', location: 'Iligan City' },
            { keywords: 'teacher education', location: 'Iligan City' },
            { keywords: 'criminology security', location: 'Iligan City' },
            { keywords: 'hospitality tourism hotel', location: 'Iligan City' },
            { keywords: 'radiologic technology', location: 'Iligan City' },
            { keywords: 'fresh graduate entry level', location: 'Iligan City' },
            { keywords: '', location: 'Iligan City' }, // General search
        ];

        const allJobs = [];
        const seenIds = new Set();

        for (const search of searches) {
            try {
                const response = await fetch(joobleEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        keywords: search.keywords,
                        location: search.location,
                        page: 1,
                        pagesize: 20
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const jobs = data.jobs || [];

                    for (const job of jobs) {
                        // Deduplicate by job ID
                        if (!seenIds.has(job.id)) {
                            seenIds.add(job.id);
                            allJobs.push(job);
                        }
                    }
                }

                // Small delay to respect rate limits
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (err) {
                console.error(`Error fetching jobs for "${search.keywords}":`, err);
            }
        }

        // Filter out expired jobs (older than 30 days)
        const today = new Date();
        const freshJobs = allJobs.filter(job => {
            if (job.updated) {
                const jobDate = new Date(job.updated);
                const daysDiff = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));
                return daysDiff <= 30;
            }
            return true;
        });

        return res.status(200).json({
            success: true,
            message: 'Jobs refreshed successfully',
            timestamp: new Date().toISOString(),
            totalFetched: allJobs.length,
            afterFilter: freshJobs.length,
            expiredRemoved: allJobs.length - freshJobs.length
        });

    } catch (error) {
        console.error('Cron job error:', error);
        return res.status(500).json({
            error: 'Failed to refresh jobs',
            details: error.message
        });
    }
}
