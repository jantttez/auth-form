import { TextInput } from '@mantine/core';
import { useUnit } from 'effector-react';
import { $email, $emailError, emailChanged } from '../model';

const emailErrorText: Record<string, string> = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
};

export const EmailField = () => {
  const [email, change, emailError] = useUnit([$email, emailChanged, $emailError]);
  return (
    <TextInput
      label='email'
      placeholder='email'
      required
      value={email}
      style={{ color: 'white', marginTop: '5px' }}
      onChange={(e) => change(e.target.value)}
      error={emailError ? emailErrorText[emailError] : null}
    />
  );
};
