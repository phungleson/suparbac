import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import { envNextPublicSupabaseUrl, envSupabaseServiceRoleKey } from '../env';

export const createSupabaseAdminClient = (): SupabaseClient =>
  createClient(envNextPublicSupabaseUrl(), envSupabaseServiceRoleKey());
