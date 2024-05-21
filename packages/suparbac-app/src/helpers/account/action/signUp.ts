'use server';

import { SIGN_UP_ERROR, USER_ALREADY_REGISTER } from '../constant';
import { getApiAccountCallback, getRootPath } from '@/helpers/functions/paths';
import { log } from '@/helpers/log';
import { newErrorResult, newOkResult, type Result } from '@/helpers/result/Result';
import { createSupabaseServerClient } from '@/helpers/supabase/createSupabaseServerClient';

/**
 * @returns redirect url if everything proceed successfully, otherwise returns error.
 */
export const signUp = async (formData: FormData): Promise<Result<string>> => {
  const callbackURL = getApiAccountCallback();

  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  const supabase = createSupabaseServerClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL,
    },
  });

  if (error) {
    log.error(signUp.name, error);

    if (error.message == USER_ALREADY_REGISTER) {
      return newErrorResult(USER_ALREADY_REGISTER);
    } else {
      return newErrorResult(SIGN_UP_ERROR);
    }
  } else if (data.session) {
    return newOkResult(getRootPath());
  } else if (data.user) {
    if (data.user.identities && data.user.identities.length == 0) {
      return newErrorResult(USER_ALREADY_REGISTER);
    } else {
      return newOkResult(getRootPath());
    }
  } else {
    return newErrorResult(SIGN_UP_ERROR);
  }
};
