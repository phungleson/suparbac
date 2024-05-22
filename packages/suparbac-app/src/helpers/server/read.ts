'use server';

import { createSupabaseServerClient } from '../supabase/createSupabaseServerClient';
import type { PostRow } from '../supabase/tables';
import { POSTS } from '../supabase/tables';
import type { Result } from './result';

export const select = async (): Promise<Result> => {
  const supabase = createSupabaseServerClient();
  const result = await supabase.from(POSTS).select('*').returns<PostRow>();
  return { status: result.status };
};

export const selectSingle = async (): Promise<Result> => {
  const supabase = createSupabaseServerClient();
  const result = await supabase.from(POSTS).select('*').maybeSingle<PostRow>();
  return { status: result.status };
};

export const count = async (): Promise<Result> => {
  const supabase = createSupabaseServerClient();
  const result = await supabase.from(POSTS).select('id.count()').single<PostRow>();
  return { status: result.status };
};
