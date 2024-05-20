import type { FC } from 'react';
import { Card } from '@/components/account/Card';
import { SignIn } from '@/components/account/SignIn';
import { Link } from '@/components/common/Link';
import { Logo } from '@/components/common/Logo';
import { getRootPath } from '@/helpers/functions/paths';

const SignInPage: FC = async () => (
  <div className="m-auto flex max-w-sm flex-col justify-between p-4">
    <div className="flex justify-center py-12">
      <Link href={getRootPath()}>
        <Logo className="size-12" />
      </Link>
    </div>
    <Card name="Welcome back" description="Sign in to your account">
      <SignIn />
    </Card>
  </div>
);

export default SignInPage;
