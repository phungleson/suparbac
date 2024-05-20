import type { ButtonProps } from 'flowbite-react';
import { Button } from 'flowbite-react';
import type { FC } from 'react';
import { useFormStatus } from 'react-dom';

export const FormButton: FC<ButtonProps> = props => {
  const { pending } = useFormStatus();

  return <Button {...props} disabled={pending} />;
};
