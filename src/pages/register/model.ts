import { createEffect, createStore, sample } from 'effector';

export const $userName = createStore('');
export const $email = createStore('');
export const $password = createStore('');

export const hashPasswdFx = createEffect<string, string, Error>(async (password: string) => {
  return new Promise((resolve) => {
    resolve('');
  });
});

//подумать как с промисами работать
sample({
  source: hashPasswdFx,
  clock: hashPasswdFx.doneData,
  fn: async (hashPasswd: string) => await hashPasswd,
  target: $password,
});
