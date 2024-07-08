/** @type {import('mock-config-server').MockServerConfig} */

import { MockServerConfig } from 'mock-config-server';

const mockServerConfig: MockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/user',
        method: 'get',
        routes: [{ data: { emoji: '🦁', name: 'Nursultan' } }],
      },
    ],
  },
};

export default mockServerConfig;
