import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zdurydubdpsolydlqmhh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_sgLJolrIFtGMbXABrYDv5w_vX_MkNk9';

export const isSupabaseConfigured = 
  supabaseUrl !== 'https://placeholder-project.supabase.co' && 
  supabaseAnonKey !== 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
