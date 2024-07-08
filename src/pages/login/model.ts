import { createEvent, createStore } from 'effector';

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const resetForm = createEvent();

export const $email = createStore('').reset(resetForm);
export const $password = createStore('').reset(resetForm);

//подумать сденлать 1 стор с ошибками для всей формы или для ошибки каждого поля свой стор с ошибками
export const $loginFormError = createStore('');

$email.on(emailChanged, (state, data) => {
  state = data;
});

$password.on(passwordChanged, (state, data) => {
  state = data;
});
