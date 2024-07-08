import { attach, createEvent, createStore, sample } from 'effector';
import * as lib from './lib';
import * as api from '@shared/api';

const signInfx = attach({ effect: api.signInFx });

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();

export const resetForm = createEvent();
export const formSubmited = createEvent();

export const $email = createStore('').reset(resetForm);
export const $emailError = createStore('').reset([resetForm, formSubmited]);

export const $password = createStore('').reset(resetForm);
export const $passwordError = createStore('').reset([resetForm, formSubmited]);

export const $loginFormError = createStore<api.SignInError | null>(null);

export const $user = createStore<api.User | null>(null);
const formValid = () => {
  return !!$emailError && !!$passwordError;
};

$email.on(emailChanged, (_, data) => data);

$password.on(passwordChanged, (_, data) => data);

$loginFormError.on(signInfx.failData, (_, error) => error.response.data.error);

$loginFormError.watch((state) => console.log(state));

$user.watch((state) => console.log(state));

sample({
  clock: formSubmited,
  source: $email,
  fn: (email) => {
    if (lib.isEmpty(email)) return 'empty';
    if (!lib.emailValid(email)) return 'invalid';
    return ''; // опасное место
  },
  target: $emailError,
});

sample({
  clock: formSubmited,
  source: $password,
  fn: (password) => {
    if (lib.isEmpty(password)) return 'empty';
    if (!lib.passwordValid(password)) return 'invalid';
    return ''; //такое же опасно место
  },
  target: $passwordError,
});

sample({
  clock: formSubmited,
  source: { email: $email, password: $password },
  filter: () => formValid(),
  target: signInfx,
});

sample({
  clock: signInfx.doneData,
  source: signInfx.doneData,
  fn: (data) => {
    return { email: data.data.email, password: data.data.username };
  },
  target: $user,
});

sample({
  clock: signInfx.done,
  target: resetForm,
});
