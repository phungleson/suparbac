import type { TextInputProps } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import type { FC } from 'react';
import { useFormStatus } from 'react-dom';

export const FormTextInput: FC<TextInputProps> = props => {
  const { pending } = useFormStatus();

  return <TextInput {...props} disabled={pending} />;
};
