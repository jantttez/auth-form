import { LoginFormModel } from '@features/login';
import { Text } from '@mantine/core';
import { useUnit } from 'effector-react';

export const LoginErrorPreview = () => {
  const [loginFormError] = useUnit([LoginFormModel.$loginFormError]);

  if ((loginFormError as any) === 'invalid_credentials') return <Text c={'red'}>Invalid Credentials</Text>;
  if ((loginFormError as any) === 'invalid_request') return <Text c={'red'}>invalid request</Text>;

  return null;
};
