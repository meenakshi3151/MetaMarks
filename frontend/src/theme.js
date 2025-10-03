import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#e9f5ff',
    100: '#c9e6ff',
    200: '#9bd1ff',
    300: '#6bb8ff',
    400: '#3a9aff',
    500: '#1f7fff', // primary vibrant blue
    600: '#1864d6',
    700: '#134db0',
    800: '#0f3b8a',
    900: '#0b2c6b',
  },
  accent: {
    500: '#ff5d8f', // vibrant pink accent
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: '10px',
      fontWeight: 600,
    },
    defaultProps: {
      colorScheme: 'brand',
      variant: 'solid',
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: 'brand.500',
      variant: 'filled',
    },
    variants: {
      filled: {
        field: {
          bg: 'whiteAlpha.100',
          _hover: { bg: 'whiteAlpha.200' },
          _focusVisible: { bg: 'whiteAlpha.200' },
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'blackAlpha.500',
        borderWidth: '1px',
        borderColor: 'whiteAlpha.200',
        backdropFilter: 'saturate(150%) blur(6px)',
      },
    },
  },
};

const styles = {
  global: {
    body: {
      bg: '#0b0d12',
      color: 'gray.100',
    },
    a: {
      color: 'brand.400',
      _hover: { color: 'brand.300', textDecoration: 'none' },
    },
  },
};

const fonts = {
  heading: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
};

const theme = extendTheme({ config, colors, components, styles, fonts });

export default theme;


