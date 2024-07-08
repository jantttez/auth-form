import { Button, TextInput, Title, PasswordInput, Anchor, Text } from '@mantine/core';
import { routes } from '@shared/constant';

export const RegisterPage = () => {
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-bg-primary'>
      <form className='w-[15%]'>
        <Title style={{ color: 'white' }}>Register</Title>
        <TextInput label='userName' placeholder='userName' required style={{ color: 'white', marginTop: '5px' }} />
        <TextInput label='email' placeholder='email' required style={{ color: 'white', marginTop: '5px' }} />

        <PasswordInput label='password' placeholder='password' required style={{ color: 'white', marginTop: '5px' }} />

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
