/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { SupabaseClient } from '@supabase/supabase-js';
import { envSupabasePermissionsColumn, envSupabaseUserIdColumn, envSupabaseUsersTable } from '../env';

export const checkUserPermission = async (
  supabase: SupabaseClient,
  userId: string,
  permission: string,
): Promise<boolean> => {
  const result = await supabase
    .from(envSupabaseUsersTable())
    .select('id.count()')
    .eq(envSupabaseUserIdColumn(), userId)
    .contains(envSupabasePermissionsColumn(), permission)
    .single<{ count: number }>();

  if (!result.data) {
    return false;
  }

  return result.data.count > 0;
};
