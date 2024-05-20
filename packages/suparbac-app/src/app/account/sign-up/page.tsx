import type { FC } from 'react';
import { Card } from '@/components/account/Card';
import { SignUp } from '@/components/account/SignUp';
import { Link } from '@/components/common/Link';
import { Logo } from '@/components/common/Logo';
import { getRootPath } from '@/helpers/functions/paths';

const SignUpPage: FC = async () => (
  <div className="m-auto flex max-w-sm flex-col justify-between p-4">
    <div className="flex justify-center py-12">
      <Link href={getRootPath()}>
        <Logo className="size-12" />
      </Link>
    </div>
    <Card name="Get started" description="Create a new account">
      <SignUp />
    </Card>
  </div>
);

export default SignUpPage;
