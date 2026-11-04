# API Keys Reference Guide

This document lists the environment variables and API services used by IMCC Career Hub.

> **IMPORTANT**: Never commit your actual API keys or secrets to Git. Store your real values in `.env` (which is gitignored).

---

## 1. Jooble API (`JOOBLE_API_KEY`)
- **Purpose**: Real-time job search feed for Philippines / Iligan City
- **Where to obtain**: https://jooble.org/api/about
- **Cost**: Free tier available

---

## 2. Groq Cloud API (`GROQ_API_KEY`)
- **Purpose**: Fast AI inference for resume analysis, job matching, and cover letter generation
- **Where to obtain**: https://console.groq.com/keys
- **Format**: Starts with `gsk_`
- **Cost**: Free tier available

---

## 3. Cron Secret (`CRON_SECRET`)
- **Purpose**: Secures scheduled cron trigger endpoints (`/api/cron/refresh-jobs`)
- **Where to obtain**: Generate a random 32+ character string (e.g. `openssl rand -hex 32`)

---

## 4. Supabase Database (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
- **Purpose**: PostgreSQL database, authentication, user profiles, saved jobs, and applications
- **Where to obtain**: Supabase Project Dashboard > Settings > API
- **Format**: 
  - `SUPABASE_URL`: `https://<project-ref>.supabase.co`
  - `SUPABASE_ANON_KEY`: Starts with `eyJ...` (JWT format)

---

## 5. Alternative AI Providers (Optional)
- **OpenAI** (`OPENAI_API_KEY`): https://platform.openai.com
- **Google Gemini** (`GEMINI_API_KEY`): https://aistudio.google.com

