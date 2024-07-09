/** @type {import('mock-config-server').MockServerConfig} */

import { MockServerConfig } from 'mock-config-server';

const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/signin',
        method: 'post',
        routes: [
          {
            data: { error: 'invalid_request' },
            interceptors: {
              response: (data, { setStatusCode }) => {
                setStatusCode(400);
                return data;
              },
            },
          },
          {
            data: { error: 'invalid_credentials' },
            entities: {
              body: {
                email: 'jantttez@gmail.com',
              },
            },
            interceptors: {
              response: (data, { setStatusCode }) => {
                setStatusCode(403);
                return data;
              },
            },
          },
          {
            data: { email: 'jantttez@gmail.com', username: 'jantttez' },
            entities: {
              body: {
                email: 'jantttez@gmail.com',
                password: 'jjjjjj',
              },
            },
            interceptors: {
              response: (data, { appendHeader }) => {
                appendHeader('Set-Cookie', 'token=auth-user-token;Max-Age=3600;Path=/;HttpOnly');
                return data;
              },
            },
          },
        ],
      },
      {
        path: '/register',
        method: 'post',
        routes: [
          {
            entities: {
              body: {
                username: 'jantttez',
                email: 'jantttez@gmail.com', //почему то не работает я сам не могу понять почему, user exist не возвращается когда все филды вот такие, хотя должен.
                password: 'jjjjjj',
              },
            },
            data: { error: 'user_exist' },
            interceptors: {
              response: (data, { setStatusCode }) => {
                setStatusCode(403);
                return data;
              },
            },
          },
          {
            data: { success: true },
            interceptors: {
              response: (data, { appendHeader }) => {
                appendHeader('Set-Cookie', 'token=auth-user-token;Max-Age=3600;Path=/;HttpOnly');
                return data;
              },
            },
          },
        ],
      },
    ],
  },
};

export default mockServerConfig;
