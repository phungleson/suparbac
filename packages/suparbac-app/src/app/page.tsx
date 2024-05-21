import { Button } from 'flowbite-react';
import type { FC } from 'react';

const Home: FC = () => (
  <main className="h-screen flex flex-col gap-24 items-center justify-center">
    <h1 className="text-xl">Home</h1>
    <div className="flex gap-16">
      <Button href="/account/sign-in">Sign in</Button>
      <Button href="/account/sign-up">Sign up</Button>
    </div>
  </main>
);

export default Home;
