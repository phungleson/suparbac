/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { SupabaseClient } from '@supabase/supabase-js';

export const checkUserPermission = async (
  supabase: SupabaseClient,
  userId: string,
  permission: string,
): Promise<boolean> => {
  const result = await supabase
    .from(process.env.SUPABASE_USER_TABLE!)
    .select('id.count()')
    .eq(process.env.SUPABASE_USER_ID_COLUMN!, userId)
    .contains(process.env.SUPABASE_PERMISSION_COLUMN!, permission)
    .single<{ count: number }>();

  if (!result.data) {
    return false;
  }

  return result.data.count > 0;
};
