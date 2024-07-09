import { $user } from '@entities/session';
import { useUnit } from 'effector-react';

export const HomePage = () => {
  const [user] = useUnit([$user]);

  if (!user)
    return (
      <div className='flex flex-col w-full h-screen justify-center items-center bg-bg-primary text-white'>o now</div>
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
