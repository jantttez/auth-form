import { PasswordInput } from '@mantine/core';
import { useUnit } from 'effector-react';
import { $password, $passwordError, passwordChanged } from '../model';

const passwordErrorText: Record<string, string> = {
  empty: 'Пароль не может быть пустым',
  invalid: 'Пароль слишком короткий',
};
export const PasswordField = () => {
  const [password, change, passwordError] = useUnit([$password, passwordChanged, $passwordError]);

  return (
    <PasswordInput
      label='password'
      placeholder='password'
      value={password}
      required
      style={{ color: 'white', marginTop: '5px' }}
      onChange={(event) => change(event.target.value)}
      error={passwordError ? passwordErrorText[passwordError] : null}
    />
  );
};
