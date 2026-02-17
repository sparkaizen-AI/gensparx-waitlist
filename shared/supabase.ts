import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// For client-side operations
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations (admin access)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
