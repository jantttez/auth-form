import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';

export function UiProvider({ children }: PropsWithChildren) {
  return <MantineProvider>{children}</MantineProvider>;
}
