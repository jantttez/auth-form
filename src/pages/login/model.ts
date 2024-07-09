import { attach, createEvent, createStore, sample } from 'effector';
import { formLib } from '@shared/lib';
import * as api from '@shared/api';
import { $user } from '@entities/session';

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

const formValid = () => {
  return !!$emailError && !!$passwordError;
};

$email.on(emailChanged, (_, data) => data);

$password.on(passwordChanged, (_, data) => data);

$loginFormError.on(signInfx.failData, (_, error) => error.response.data.error);

$loginFormError.on(signInfx.done, (_) => null);

$loginFormError.watch((state) => console.log(state));

sample({
  clock: formSubmited,
  source: $email,
  fn: (email) => {
    if (formLib.isEmpty(email)) return 'empty';
    if (!formLib.emailValid(email)) return 'invalid';
    return '';
  },
  target: $emailError,
});

sample({
  clock: formSubmited,
  source: $password,
  fn: (password) => {
    if (formLib.isEmpty(password)) return 'empty';
    if (!formLib.passwordValid(password)) return 'invalid';
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
