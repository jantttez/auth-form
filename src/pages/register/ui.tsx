import { Button, TextInput, Title, PasswordInput, Anchor, Text } from '@mantine/core';
import { routes } from '@shared/constant';
import { useUnit } from 'effector-react';
import * as model from './model';
import { ErrorRegister } from '@entities/error';

const usernameErrorText: Record<string, string> = {
  empty: 'username не может быть пустым',
  invalid: 'username слишком короткий',
};

const emailErrorText: Record<string, string> = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
};

const passwordErrorText: Record<string, string> = {
  empty: 'Пароль не может быть пустым',
  invalid: 'Пароль слишком короткий',
};

export const RegisterPage = () => {
  const [
    emailChanged,
    passwordChanged,
    usernameChanged,
    username,
    email,
    password,
    emailError,
    passwordError,
    usernameError,
    regFormSubmited,
  ] = useUnit([
    model.emailChanged,
    model.passwordChanged,
    model.usernameChanged,
    model.$username,
    model.$email,
    model.$password,
    model.$emailError,
    model.$passwordError,
    model.$usernameError,
    model.regFormSubmited,
  ]);

  const formhandler = (e: any) => {
    e.preventDefault();
    regFormSubmited();
  };
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-bg-primary'>
      <ErrorRegister />
      <form className='w-[15%]' onSubmit={formhandler}>
        <Title style={{ color: 'white' }}>Register</Title>
        <TextInput
          label='userName'
          placeholder='userName'
          required
          value={username}
          style={{ color: 'white', marginTop: '5px' }}
          onChange={(e) => usernameChanged(e.target.value)}
          error={usernameError ? usernameErrorText[usernameError] : null}
        />
        <TextInput
          label='email'
          placeholder='email'
          required
          value={email}
          style={{ color: 'white', marginTop: '5px' }}
          onChange={(e) => emailChanged(e.target.value)}
          error={emailError ? emailErrorText[emailError] : null}
        />

        <PasswordInput
          label='password'
          placeholder='password'
          required
          value={password}
          style={{ color: 'white', marginTop: '5px' }}
          onChange={(e) => passwordChanged(e.target.value)}
          error={passwordError ? passwordErrorText[passwordError] : null}
        />

        <Text c='dimmed' size='sm' mt={5}>
          Do u have accaount?{' '}
          <Anchor href={routes.login} size='sm'>
            login
          </Anchor>
        </Text>
        <Button fullWidth mt='xl' type='submit'>
          register
        </Button>
      </form>
    </div>
  );
};
