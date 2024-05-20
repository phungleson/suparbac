'use server';

import { getAccountSignUpPath, getApiAccountCallback, getRootPath } from '@/helpers/functions/paths';
import { createSupabaseServerClient } from '@/helpers/supabase/createSupabaseServerClient';

export const signUp = async (formData: FormData): Promise<string> => {
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
    console.error(signUp.name, error);

    if (error.message == 'User already registered') {
      return getAccountSignUpPath();
    } else {
      return getAccountSignUpPath();
    }
  } else if (data.session) {
    return getRootPath();
  } else if (data.user) {
    if (data.user.identities && data.user.identities.length == 0) {
      console.error('Sign up error, user already registered');
      return getAccountSignUpPath();
    } else {
      return getRootPath();
    }
  } else {
    return getAccountSignUpPath();
  }
};
