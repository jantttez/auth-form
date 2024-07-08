import { Text } from '@mantine/core';
import { $loginFormError } from '@pages/login/model';
import { useUnit } from 'effector-react';

export const ErrorPreview = () => {
  const [loginFormError] = useUnit([$loginFormError]);

  if ((loginFormError as any) === 'invalid_credentials') return <Text c={'red'}>Invalid Credentials</Text>;
  if ((loginFormError as any) === 'invalid_request') return <Text c={'red'}>invalid request</Text>;

  return null;
};
