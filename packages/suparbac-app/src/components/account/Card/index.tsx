import type { FC, ReactNode } from 'react';
import type { ClassProps } from '@/helpers/react/ClassProps';

type Props = ClassProps & {
  name: string;
  description?: string;
  children: ReactNode;
};

export const Card: FC<Props> = ({ className, name, description, children }) => (
  <div className={className}>
    <div className="space-y-16 px-4 py-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-medium dark:text-slate-300">{name}</h1>
        <p className="text-center text-zinc-500">{description}</p>
      </div>
      {children}
    </div>
  </div>
);
