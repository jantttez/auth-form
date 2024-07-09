import { TextInput } from '@mantine/core';
import { useUnit } from 'effector-react';
import { $username, $usernameError, usernameChanged } from '../model';

const usernameErrorText: Record<string, string> = {
  empty: 'username не может быть пустым',
  invalid: 'username слишком короткий',
};

export const UsernameField = () => {
  const [username, change, usernameError] = useUnit([$username, usernameChanged, $usernameError]);
  return (
    <TextInput
      label='username'
      placeholder='username'
      required
      value={username}
      style={{ color: 'white', marginTop: '5px' }}
      onChange={(e) => change(e.target.value)}
      error={usernameError ? usernameErrorText[usernameError] : null}
    />
  );
};
