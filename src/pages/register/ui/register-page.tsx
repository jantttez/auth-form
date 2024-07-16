import {
  EmailField,
  RegisterFormModel,
  RegisterFrom,
  UsernameField,
  PasswordField,
} from '@features/register';

import { Button, Title, Anchor, Text } from '@mantine/core';
import { routes } from '@shared/constant';
import { useUnit } from 'effector-react';
import { ErrorRegister } from './register-error-preview';
import { FormEvent } from 'react';

export const RegisterPage = () => {
  const regFormSubmited = useUnit(RegisterFormModel.regFormSubmited);

  const formhandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    regFormSubmited();
  };

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-bg-primary'>
      <ErrorRegister />

      <Title style={{ color: 'white' }}>Register</Title>
      <RegisterFrom onSubmitAction={formhandler} className='w-[15%] mt-2'>
        <UsernameField />
        <EmailField />
        <PasswordField />
        <Text c='dimmed' size='sm' mt={5}>
          Do u have accaount?{' '}
          <Anchor href={routes.login} size='sm'>
            login
          </Anchor>
        </Text>
        <Button fullWidth mt='xl' type='submit'>
          register
        </Button>
      </RegisterFrom>
    </div>
  );
};
