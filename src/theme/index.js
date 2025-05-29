import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    primary: '#2563eb',    // Blue 600
    secondary: '#1d4ed8',  // Blue 700
    accent: '#3b82f6',     // Blue 500
  },
  light: {
    background: '#ffffff',
    cardBackground: '#ffffff',
    text: '#1f2937',      // Gray 800
    darkText: '#111827',  // Gray 900
    mutedText: '#6b7280', // Gray 500
    success: '#059669',   // Green 600
    danger: '#dc2626',    // Red 600
    warning: '#d97706',   // Amber 600
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

const typography = {
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem' // 30px
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'lg',
    },
    sizes: {
      sm: {
        fontSize: 'sm',
        px: 4,
        py: 2,
      },
      md: {
        fontSize: 'md',
        px: 6,
        py: 2.5,
      },
    },
    variants: {
      primary: {
        bg: 'brand.primary',
        color: 'white',
        _hover: {
          bg: 'brand.secondary',
          _disabled: {
            bg: 'brand.primary',
          },
        },
      },
      secondary: {
        bg: 'gray.100',
        color: 'gray.800',
        _hover: {
          bg: 'gray.200',
        },
      },
      danger: {
        bg: 'light.danger',
        color: 'white',
        _hover: {
          bg: 'red.700',
        },
      },
      outline: {
        borderColor: 'brand.primary',
        color: 'brand.primary',
        _hover: {
          bg: 'brand.primary',
          color: 'white',
        },
      },
    },
    defaultProps: {
      size: 'sm',
      variant: 'primary',
    },
  },
  Text: {
    baseStyle: {
      color: 'light.text',
    },
    variants: {
      pageTitle: {
        fontSize: 'xl',
        fontWeight: 'bold',
        color: 'light.darkText',
      },
      sectionTitle: {
        fontSize: 'lg',
        fontWeight: 'semibold',
        color: 'light.darkText',
      },
      muted: {
        color: 'light.mutedText',
        fontSize: 'sm',
      },
    },
  },
  Table: {
    variants: {
      simple: {
        th: {
          fontSize: 'sm',
          fontWeight: 'semibold',
          py: 3,
          px: 4,
        },
        td: {
          fontSize: 'sm',
          py: 3,
          px: 4,
        },
      },
    },
  },
};

const theme = extendTheme({
  colors,
  ...typography,
  components,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'light.text',
      },
    },
  },
});

export default theme; 