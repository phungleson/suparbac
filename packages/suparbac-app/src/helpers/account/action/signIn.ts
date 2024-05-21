'use server';

import { SIGN_IN_ERROR } from '../constant';
import { getRootPath } from '@/helpers/functions/paths';
import { log } from '@/helpers/log';
import { newErrorResult, newOkResult, type Result } from '@/helpers/result/Result';
import { createSupabaseServerClient } from '@/helpers/supabase/createSupabaseServerClient';

/**
 * @returns redirect url if everything proceed successfully, otherwise returns error.
 */
export const signIn = async (formData: FormData): Promise<Result<string>> => {
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  const supabase = createSupabaseServerClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!data.user) {
    log.error(signIn.name, error);
    return newErrorResult(SIGN_IN_ERROR);
  }

  return newOkResult(getRootPath());
};
