'use server';

import { getAccountSignInPath, getRootPath } from '@/helpers/functions/paths';
import { createSupabaseServerClient } from '@/helpers/supabase/createSupabaseServerClient';

export const signIn = async (formData: FormData): Promise<string> => {
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  const supabase = createSupabaseServerClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!data.user) {
    console.error(signIn.name, error);
    return getAccountSignInPath();
  }

  return getRootPath();
};
