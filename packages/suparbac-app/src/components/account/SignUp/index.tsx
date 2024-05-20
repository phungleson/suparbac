'use client';

import { Label } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { FormButton } from '@/components/common/FormButton';
import { FormTextInput } from '@/components/common/FormTextInput';
import { Link } from '@/components/common/Link';
import { signUp } from '@/helpers/account/action/signUp';
import { getAccountSignInPath, getRootPath } from '@/helpers/functions/paths';
import { createSupabaseClient } from '@/helpers/supabase/createSupabaseClient';

export const SignUp: FC = () => {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    (async () => {
      const result = await supabase.auth.getUser();
      if (result.data.user) {
        return router.push(getRootPath());
      }
    })();
  });

  const action = async (formData: FormData) => {
    const redirectPath = await signUp(formData);
    ref.current?.reset();
    router.push(redirectPath);
  };

  return (
    <div className="space-y-8">
      <form ref={ref} noValidate={true} action={action}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <FormTextInput
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
            <Label htmlFor="password">Password</Label>
            <FormTextInput
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <FormButton type="submit">Sign up</FormButton>
        </div>
      </form>
      <div className="flex flex-col items-center gap-2">
        <Link href={getAccountSignInPath()} className="text-sm text-slate-600">
          Sign in with email and password
        </Link>
      </div>
    </div>
  );
};
