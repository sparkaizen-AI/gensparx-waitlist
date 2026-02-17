import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntlmkgbxhnhkzfnfwsnx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_-YHYYnOh8l6QQFAgp3Nxqw_yhUN9LVX'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
