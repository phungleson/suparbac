import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { envNextPublicSupabaseAnonKey, envNextPublicSupabaseUrl } from '../env';

// Define a function to create a Supabase client for client-side operations
export const createSupabaseClient = (): SupabaseClient =>
  createBrowserClient(
    // Pass Supabase URL and anonymous key from the environment to the client
    envNextPublicSupabaseUrl(),
    envNextPublicSupabaseAnonKey(),
  );
