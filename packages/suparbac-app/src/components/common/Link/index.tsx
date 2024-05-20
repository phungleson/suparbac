'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import type { FC, MouseEvent } from 'react';
import type { ClassProps } from '@/helpers/react/ClassProps';
import type { ChildrenProps } from '@/helpers/react/ChildrenProps';

type Props = ClassProps &
  ChildrenProps & {
    href?: string;
  };

/**
 * Link using router, it behaves similar to `next/link`, but it does not do
 * prefetching as it can be expensive for users.
 */
export const Link: FC<Props> = ({ href, className, children }) => {
  const router = useRouter();

  const onClick = async (event: MouseEvent) => {
    if (!href) {
      return;
    }

    event.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={onClick} className={clsx(className, 'hover:underline')}>
      {children}
    </a>
  );
};
