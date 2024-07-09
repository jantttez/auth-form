import { attach, createEvent, createStore, EventCallable, sample } from 'effector';
import { formLib } from '@shared/lib';
import * as api from '@shared/api';
import { $user } from '@entities/session';

const signInfx = attach({ effect: api.signInFx });

const createField = <T, Error>(defaultState: T, resetForm?: EventCallable<void>) => {
  const fieldChanged = createEvent<T>();
  const $field = resetForm ? createStore(defaultState).reset(resetForm) : createStore(defaultState);
  const $fieldError = resetForm ? createStore<Error | null>(null).reset(resetForm) : createStore<Error | null>(null);

  $field.on(fieldChanged, (_, data) => data);

  return [$field, fieldChanged, $fieldError] as const;
};

export const resetForm = createEvent();

export const [$email, emailChanged, $emailError] = createField<string, any>('', resetForm);
export const [$password, passwordChanged, $passwordError] = createField<string, any>('', resetForm);

export const formSubmited = createEvent();

export const $loginFormError = createStore<api.SignInError | null>(null);

const formValid = () => {
  return !!$emailError && !!$passwordError;
};

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
