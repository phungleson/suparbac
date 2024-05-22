'use server';

import { createSupabaseServerClient } from '../supabase/createSupabaseServerClient';
import { POSTS } from '../supabase/tables';
import type { Result } from './result';

export const delete_ = async (): Promise<Result> => {
  const supabase = createSupabaseServerClient();
  const result = await supabase.from(POSTS).delete().eq('name', 'Post').single();
  return { status: result.status };
};
