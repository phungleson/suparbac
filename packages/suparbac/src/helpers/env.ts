export const envSupabaseUrl = (): string => {
  if (process.env.SUPABASE_URL) {
    return process.env.SUPABASE_URL;
  }
  throw new Error(`SUPABASE_URL env is not set`);
};

export const envSupabaseServiceRoleKey = (): string => {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
  throw new Error(`SUPABASE_SERVICE_ROLE_KEY env is not set`);
};

export const envSupabaseUserTable = (): string => {
  if (process.env.SUPABASE_USER_TABLE) {
    return process.env.SUPABASE_USER_TABLE;
  }
  throw new Error(`SUPABASE_USER_TABLE env is not set`);
};

export const envSupabaseUserIdColumn = (): string => {
  if (process.env.SUPABASE_USER_ID_COLUMN) {
    return process.env.SUPABASE_USER_ID_COLUMN;
  }
  throw new Error(`SUPABASE_USER_ID_COLUMN env is not set`);
};

export const envSupabasePermissionColumn = (): string => {
  if (process.env.SUPABASE_PERMISSION_COLUMN) {
    return process.env.SUPABASE_PERMISSION_COLUMN;
  }
  throw new Error(`SUPABASE_PERMISSION_COLUMN env is not set`);
};
