import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

// Define a function to create a Supabase client for client-side operations
export const createSupabaseClient = (): SupabaseClient =>
  createBrowserClient(
    // Pass Supabase URL and anonymous key from the environment to the client
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
