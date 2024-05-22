export const envNextPublicSupabaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return process.env.NEXT_PUBLIC_SUPABASE_URL;
  }
  throw new Error(`NEXT_PUBLIC_SUPABASE_URL env is not set`);
};

export const envNextPublicSupabaseAnonKey = (): string => {
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }
  throw new Error(`NEXT_PUBLIC_SUPABASE_ANON_KEY env is not set`);
};

export const envSupabaseServiceRoleKey = (): string => {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
  throw new Error(`SUPABASE_SERVICE_ROLE_KEY env is not set`);
};
