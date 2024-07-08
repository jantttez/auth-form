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
              response: (data, { appendHeader, request }) => {
                appendHeader('Set-Cookie', 'token=auth-user-token;Max-Age=3600;Path=/;HttpOnly');
                return { ...request.body.email };
              },
            },
          },
        ],
      },
    ],
  },
};

export default mockServerConfig;
