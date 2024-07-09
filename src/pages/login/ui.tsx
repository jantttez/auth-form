import { Button, TextInput, Title, PasswordInput, Anchor, Text } from '@mantine/core';
import { routes } from '@shared/constant';
import { useUnit } from 'effector-react';
import * as model from './model.ts';
import { ErrorLogin } from '@entities/error';

const emailErrorText: Record<string, string> = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
};

const passwordErrorText: Record<string, string> = {
  empty: 'Пароль не может быть пустым',
  invalid: 'Пароль слишком короткий',
};

export const LoginPage = () => {
  const [emailChanged, passwordChanged, email, password, emailError, passwordError, formSubmited, resetForm] = useUnit([
    model.emailChanged,
    model.passwordChanged,
    model.$email,
    model.$password,
    model.$emailError,
    model.$passwordError,
    model.formSubmited,
    model.resetForm,
  ]);

  const formhandler = (e: any) => {
    e.preventDefault();
    formSubmited();
  };

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-bg-primary'>
      <ErrorLogin />
      <Title style={{ color: 'white' }}>Welcome back!</Title>
      <form onSubmit={formhandler}>
        <TextInput
          label='email'
          placeholder='email'
          value={email}
          required
          style={{ color: 'white', marginTop: '5px' }}
          onChange={(e) => emailChanged(e.target.value)}
          error={emailError ? emailErrorText[emailError] : null}
        />
        <PasswordInput
          label='password'
          placeholder='password'
          value={password}
          required
          style={{ color: 'white', marginTop: '5px' }}
          onChange={(event) => passwordChanged(event.target.value)}
          error={passwordError ? passwordErrorText[passwordError] : null}
        />

        <Text c='dimmed' size='sm' mt={5}>
          Do not have an account yet?{' '}
          <Anchor href={routes.register} size='sm'>
            Create account
          </Anchor>
        </Text>
        <Button fullWidth mt='xl' type='submit'>
          Sign in
        </Button>
      </form>
    </div>
  );
};
