import { $registerStatus } from '@entities/session';
import { registerFx } from '@shared/api';
import { formLib } from '@shared/lib';
import { attach, createEvent, createStore, sample } from 'effector';

const regFx = attach({ effect: registerFx });

const createField = <T, Error>(defaultState: T) => {
  const $field = createStore(defaultState);
  const fieldChanged = createEvent<T>();
  const $fieldError = createStore<Error | any | null>(null);
  return [$field, fieldChanged, $fieldError] as const;
};

export const [$email, emailChanged, $emailError] = createField<string, Error>('');
export const [$username, usernameChanged, $usernameError] = createField<string, Error>('');
export const [$password, passwordChanged, $passwordError] = createField<string, Error>('');

export const resetForm = createEvent();
export const regFormSubmited = createEvent();

$username.reset(resetForm);
$email.reset(resetForm);
$password.reset(resetForm);

export const $registerFormError = createStore<any | null>(null);

$registerFormError.on(regFx.failData, (_, error) => error.response.data.error);

$registerFormError.on(regFx.done, (state) => '');

$registerStatus.on(regFx.doneData, (_, response) => response.data.success);
const formValid = () => {
  return !!$emailError && !!$passwordError && !!$usernameError;
};

$email.on(emailChanged, (_, data) => data);

$password.on(passwordChanged, (_, data) => data);

$username.on(usernameChanged, (_, data) => data);

sample({
  clock: regFormSubmited,
  source: $email,
  fn: (email) => {
    if (formLib.isEmpty(email)) return 'empty';
    if (!formLib.emailValid(email)) return 'invalid';
    return '';
  },
  target: $emailError,
});

sample({
  clock: regFormSubmited,
  source: $password,
  fn: (password) => {
    if (formLib.isEmpty(password)) return 'empty';
    if (!formLib.passwordValid(password)) return 'invalid';
    return '';
  },
  target: $passwordError,
});

sample({
  clock: regFormSubmited,
  source: $username,
  fn: (username) => {
    if (formLib.isEmpty(username)) return 'empty';
    if (!formLib.usernameValid(username)) return 'invalid';
    return '';
  },
  target: $passwordError,
});

sample({
  clock: regFormSubmited,
  source: { username: $username, email: $email, password: $password },
  filter: () => formValid(),
  target: regFx,
});

sample({
  clock: regFx.done,
  target: resetForm,
});
