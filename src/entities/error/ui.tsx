import { Text } from '@mantine/core';
import { $loginFormError } from '@pages/login/model';
import { $registerFormError } from '@pages/register/model';
import { useUnit } from 'effector-react';

export const ErrorLogin = () => {
  const [loginFormError] = useUnit([$loginFormError]);

  if ((loginFormError as any) === 'invalid_credentials') return <Text c={'red'}>Invalid Credentials</Text>;
  if ((loginFormError as any) === 'invalid_request') return <Text c={'red'}>invalid request</Text>;

  return null;
};

export const ErrorRegister = () => {
  const [registerFormError] = useUnit([$registerFormError]);

  if (registerFormError === 'user_exist') return <Text c={'red'}>Такой пользователь уже существует</Text>;

  return null;
};
