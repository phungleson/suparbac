import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { envSupabaseAnonKey, envSupabaseUrl } from '../env';

// Define a function to create a Supabase client for server-side operations
// The function takes a cookie store created with next/headers cookies as an argument
export const createSupabaseServerClient = (headers: Headers): SupabaseClient =>
  createServerClient(
    // Pass Supabase URL and anonymous key from the environment to the client
    envSupabaseUrl(),
    envSupabaseAnonKey(),
    {
      cookies: {},
      db: {
        schema: 'public',
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: { Authorization: headers.get('Authorization') ?? '' },
      },
    },
  );
