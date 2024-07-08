import axios from 'axios';
import { createEffect } from 'effector';

export const api = axios.create({
  baseURL: 'http://localhost:31299/api',
});

interface Request {
  url: string;
  method: 'POST' | 'GET' | 'DELETE';
  body?: unknown;
}

export const requestFx = createEffect<Request, any>((request) => {
  return api({
    url: request.url,
    method: request.method,
    data: request.body,
  });
});
