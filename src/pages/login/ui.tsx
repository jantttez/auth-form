import { Button, TextInput, Title, PasswordInput, Anchor, Text } from '@mantine/core';
import { routes } from '@shared/constant';

export const LoginPage = () => {
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-bg-primary'>
      <form>
        <Title style={{ color: 'white' }}>Welcome back!</Title>
        <TextInput label='email' placeholder='email' required style={{ color: 'white', marginTop: '5px' }} />
        <PasswordInput label='password' placeholder='password' required style={{ color: 'white', marginTop: '5px' }} />

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
