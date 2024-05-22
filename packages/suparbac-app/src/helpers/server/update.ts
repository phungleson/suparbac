'use server';

import { createSupabaseServerClient } from '../supabase/createSupabaseServerClient';
import { POSTS } from '../supabase/tables';
import type { Result } from './result';

export const update = async (): Promise<Result> => {
  const supabase = createSupabaseServerClient();
  const result = await supabase.from(POSTS).update({ description: 'Description' }).eq('name', 'Name').returns();
  return { status: result.status };
};
