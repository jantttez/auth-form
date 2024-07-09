import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onSubmitAction: (e: any) => void;
  className?: string;
}

export const RegisterFrom = ({ children, onSubmitAction, className }: Props) => {
  return (
    <form onSubmit={onSubmitAction} className={className}>
      {children}
    </form>
  );
};
