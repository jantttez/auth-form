import { RegisterFormModel } from '@features/register';
import { Text } from '@mantine/core';
import { useUnit } from 'effector-react';

export const ErrorRegister = () => {
  const [registerFormError] = useUnit([RegisterFormModel.$registerFormError]);

  if (registerFormError === 'user_exist')
    return <Text c={'red'}>Такой пользователь уже существует</Text>;

  return null;
};
