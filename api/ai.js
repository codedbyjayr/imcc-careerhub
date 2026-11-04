// api/ai.js - Vercel Serverless Function for AI Integration (Groq - FREE & FAST!)
// Uses Groq's LPU inference for super-fast AI responses

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { action, data } = req.body;

        // Get API key from environment variables
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            console.error('GROQ_API_KEY not configured');
            return res.status(500).json({ error: 'API key not configured. Please add GROQ_API_KEY to Vercel environment variables.' });
        }

        let result;

        // Route to appropriate AI function
        switch (action) {
            case 'analyzeResume':
                result = await analyzeResume(data.resumeText, data.targetRole, apiKey);
                break;
            case 'getJobRecommendations':
                result = await getJobRecommendations(data.userProfile, data.jobs, apiKey);
                break;
            case 'generateCoverLetter':
                result = await generateCoverLetter(data.job, data.userProfile, apiKey);
                break;
            default:
                return res.status(400).json({ error: 'Invalid action' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('AI API Error:', error);
        return res.status(500).json({ error: 'AI service error', details: error.message });
    }
}

// Groq API call helper (OpenAI-compatible format)
async function callGroq(prompt, systemPrompt, apiKey, maxTokens = 1500) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile', // Fast and powerful
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: maxTokens,
            response_format: { type: 'json_object' }
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Groq API error: ${errorData.error?.message || response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    try {
        return JSON.parse(content);
    } catch (e) {
        // If JSON parsing fails, try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Failed to parse AI response as JSON');
    }
}

// Resume Analysis Function (Using Groq)
async function analyzeResume(resumeText, targetRole, apiKey) {
    const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyzer and career coach for IMCC (Iligan Medical Center College) students. Analyze resumes and provide actionable feedback. Always respond with valid JSON only.`;

    const prompt = `Analyze this resume for ATS compatibility:

Resume:
${resumeText}

${targetRole ? `Target Role: ${targetRole}` : ''}

Respond with this exact JSON structure:
{
  "ats_score": <number 0-100>,
  "keyword_match": <number 0-100>,
  "formatting_score": <number 0-100>,
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3", "improvement4"],
  "ai_summary": "<2-3 sentence summary>"
}`;

    return await callGroq(prompt, systemPrompt, apiKey, 1500);
}

// Job Recommendations Function (Using Groq)
async function getJobRecommendations(userProfile, jobs, apiKey) {
    const systemPrompt = `You are a career advisor for IMCC (Iligan Medical Center College) graduates. Match students with jobs based on their academic background, skills, and program. Provide specific, actionable reasons for each match. Always respond with valid JSON only.`;

    const jobsList = jobs.map((job, i) =>
        `${i + 1}. ${job.title} at ${job.company} (${job.location}) - ${job.type}\n   Tags: ${job.tags.join(', ')}\n   Description: ${job.description.substring(0, 150)}...`
    ).join('\n\n');

    const prompt = `Student Profile:
- Name: ${userProfile.full_name}
- College: ${userProfile.college}
- Program: ${userProfile.program}
- Status: ${userProfile.status}
${userProfile.skills && userProfile.skills.length > 0 ? `- Core Skills: ${Array.isArray(userProfile.skills) ? userProfile.skills.join(', ') : userProfile.skills}` : ''}
${userProfile.year_level ? `- Year Level: ${userProfile.year_level}` : ''}

Available Jobs:
${jobsList}

Recommend the top 3-5 matching jobs with:
- job_index: the number from the list above
- score: match percentage (0-100)
- reason: specific reason why this job matches their background

Respond with this exact JSON structure:
{
  "recommendations": [
    {
      "job_index": <number>,
      "score": <number 0-100>,
      "reason": "<detailed reason>"
    }
  ],
  "career_advice": "<1-2 sentence general career guidance>"
}`;

    return await callGroq(prompt, systemPrompt, apiKey, 1500);
}

// Cover Letter Generator (Using Groq)
async function generateCoverLetter(job, userProfile, apiKey) {
    const systemPrompt = `You are a professional career writer for IMCC (Iligan Medical Center College) students and alumni. Write compelling, professional cover letters that highlight relevant skills and education. Keep it concise (3-4 paragraphs) and tailored to the specific job.`;

    const prompt = `Write a cover letter for:

Job: ${job.title}
Company: ${job.company}
Location: ${job.location}

Applicant: ${userProfile.full_name}
Program: ${userProfile.program}
College: ${userProfile.college}
${userProfile.status === 'student' ? `Status: Current student (Year ${userProfile.year_level})` : `Status: Alumni (Class of ${userProfile.graduation_year})`}

Job Requirements:
${job.requirements ? job.requirements.join('\n') : 'See job description'}

Write a professional cover letter (3-4 paragraphs) that:
1. Introduces the applicant and expresses interest
2. Highlights relevant education and skills
3. Shows enthusiasm for the role and company
4. Ends with a strong call to action

Respond with this exact JSON structure:
{
  "coverLetter": "<the full cover letter text>"
}`;

    return await callGroq(prompt, systemPrompt, apiKey, 1000);
}
