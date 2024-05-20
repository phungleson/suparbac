import { Button } from 'flowbite-react';
import type { FC } from 'react';

const Home: FC = () => (
  <main className="h-screen flex items-center justify-center">
    <div className="flex gap-16">
      <Button href="/account/sign-in">Sign In</Button>
      <Button href="/account/sign-up">Sign Up</Button>
    </div>
  </main>
);

export default Home;
