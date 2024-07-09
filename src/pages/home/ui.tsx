import { $user } from '@entities/session';
import { Button } from '@mantine/core';
import { routes } from '@shared/constant';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [user] = useUnit([$user]);
  const navigate = useNavigate();

  if (!user)
    return (
      <div className='flex w-full h-screen justify-center items-center bg-bg-primary text-white'>
        <Button onClick={() => navigate(routes.login)} className='mr-2'>
          login
        </Button>
        <Button onClick={() => navigate(routes.register)}>register</Button>
      </div>
    );

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center bg-bg-primary'>
      <h1>welcome back</h1>
      <div>
        <span>{user.email}</span>
      </div>
    </div>
  );
};
