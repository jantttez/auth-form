/** @type {import('mock-config-server').MockServerConfig} */

import { MockServerConfig } from 'mock-config-server';

const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/login',
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
                email: 'sergeysova@gmail.com',
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
            data: { email: 'sergeysova@gmail.com', username: 'sergeysova' },
            entities: {
              body: {
                email: 'sergeysova@gmail.com',
                password: 'qweasd123',
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
        path: '/signup',
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
