import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  fonts: {
    body: 'Nunito , sans-serif',
    heading: 'Montserrat, serif',
    mono: 'Menlo, monospace',
  },
});
