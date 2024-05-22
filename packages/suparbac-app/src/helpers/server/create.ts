'use server';

import { createSupabaseServerClient } from '../supabase/createSupabaseServerClient';
import { POSTS } from '../supabase/tables';
import type { Result } from './result';

export const insert = async (): Promise<Result> => {
  const supabase = createSupabaseServerClient();
  const result = await supabase.from(POSTS).insert({ name: 'Name' }).returns();
  return { status: result.status };
};

export const upsert = async (): Promise<Result> => {
  const supabase = createSupabaseServerClient();
  const result = await supabase.from(POSTS).upsert({ name: 'Name' }).returns();
  return { status: result.status };
};
