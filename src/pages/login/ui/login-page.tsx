import { Button, Title, Anchor, Text } from '@mantine/core';
import { routes } from '@shared/constant';
import { useUnit } from 'effector-react';
import { LoginFormModel } from '@features/login';
import { EmailField, LoginForm, PasswordField } from '@features/login';
import { LoginErrorPreview } from './login-error-preview';

export const LoginPage = () => {
  const formSubmited = useUnit(LoginFormModel.formSubmited);

  const formhandler = (e: any) => {
    e.preventDefault();
    formSubmited();
  };

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-bg-primary'>
      <LoginErrorPreview />
      <Title style={{ color: 'white' }}>Welcome back!</Title>

      <LoginForm onSubmitAction={formhandler} className='mt-5'>
        <EmailField />
        <PasswordField />

        <Text c='dimmed' size='sm' mt={5}>
          Do not have an account yet?{' '}
          <Anchor href={routes.register} size='sm'>
            Create account
          </Anchor>
        </Text>
        <Button fullWidth mt='xl' type='submit'>
          Sign in
        </Button>
      </LoginForm>
    </div>
  );
};

//хз мб нужно было создать ui папку и в ней двумя файлами сделать ерор превью, но мне в падлу если честно.
