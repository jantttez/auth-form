import axios from 'axios';
import { createEffect } from 'effector';

export const api = axios.create({
  baseURL: 'http://localhost:31299/api',
});

interface Request {
  body?: unknown;
  url: string;
  method: 'POST' | 'GET' | 'DELETE';
}

export const requestFx = createEffect<Request, any>((request) => {
  return api({
    url: request.url,
    method: request.method,
    data: request.body,
  });
});

export interface User {
  email: string;
  password: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export type SignInError = { error: 'invalid_credentials' } | { error: 'invalid_request' };

export const signInFx = createEffect<SignIn, User | any, SignInError | any>(async (form) => {
  return requestFx({
    method: 'POST',
    url: '/signin',
    body: form,
  });
});
