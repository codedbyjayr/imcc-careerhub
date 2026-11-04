import { createClient } from '@supabase/supabase-js';
import './public/supabase-client.js';
import './public/app.js';

window.supabase = { createClient };

if (!window.SupabaseDB.init(__SUPABASE_URL__, __SUPABASE_ANON_KEY__)) {
    console.error('[CareerHub] Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the deployment environment.');
}
