import { createStore } from 'effector';

export interface User {
  email: string;
  password: string;
}

export const $user = createStore<User | null>(null);

export const $registerStatus = createStore<boolean | null>(null, { skipVoid: false });
