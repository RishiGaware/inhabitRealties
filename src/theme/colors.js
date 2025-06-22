/**
 * Global Color System for Inhabit Realties
 * 
 * This file defines all color tokens used throughout the application.
 * Colors are organized by semantic meaning and usage context.
 */

// Primary Brand Colors
export const brandColors = {
  primary: '#6C026B',      // Dark Purple
  secondary: '#1A1A1A',    // Dark Grey
  accent: '#A300A3',       // Lighter Purple
  tertiary: '#4A0149',     // Even Darker Purple
};

// Semantic Colors
export const semanticColors = {
  success: {
    50: '#eef6ee',
    100: '#d5e9d5',
    200: '#bbdcbb',
    300: '#a2d0a2',
    400: '#88c388',
    500: '#6eb66e',
    600: '#4CAF50',        // A more standard, less fluorescent green
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#FFCE55',        // Primary warning color
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#EB5463',        // Primary error color
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#5E9BEB',        // Primary info color
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
};

// Neutral Colors
export const neutralColors = {
  white: '#FFFFFF',
  black: '#000000',
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

// Light Theme Colors
export const lightTheme = {
  // Backgrounds
  background: {
    primary: '#F9FAFB',    // Main app background
    secondary: '#FFFFFF',  // Card backgrounds
    tertiary: '#F3F4F6',   // Section backgrounds
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlays
  },
  
  // Text Colors
  text: {
    primary: '#464646',    // Main text color
    secondary: '#6B7280',  // Secondary text
    muted: '#9CA3AF',      // Muted/disabled text
    inverse: '#FFFFFF',    // Text on dark backgrounds
    link: brandColors.accent, // Link color
  },
  
  // Border Colors
  border: {
    primary: '#E5E7EB',
    secondary: '#D1D5DB',
    focus: brandColors.primary,
  },
  
  // Shadow Colors
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};

// Dark Theme Colors (for future implementation)
export const darkTheme = {
  // Backgrounds
  background: {
    primary: '#111827',
    secondary: '#1F2937',
    tertiary: '#374151',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  // Text Colors
  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    muted: '#9CA3AF',
    inverse: '#111827',
    link: brandColors.accent,
  },
  
  // Border Colors
  border: {
    primary: '#374151',
    secondary: '#4B5563',
    focus: brandColors.accent,
  },
  
  // Shadow Colors
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
  },
};

// Real Estate Specific Colors
export const realEstateColors = {
  property: {
    available: semanticColors.success[600],
    sold: semanticColors.error[600],
    pending: semanticColors.warning[600],
    featured: brandColors.accent,
  },
  status: {
    active: semanticColors.success[600],
    inactive: neutralColors.gray[400],
    pending: semanticColors.warning[600],
    completed: semanticColors.success[600],
    cancelled: semanticColors.error[600],
  },
  priority: {
    high: semanticColors.error[600],
    medium: semanticColors.warning[600],
    low: semanticColors.success[600],
  },
};

// Export all colors for easy access
export const colors = {
  brand: brandColors,
  semantic: semanticColors,
  neutral: neutralColors,
  light: lightTheme,
  dark: darkTheme,
  realEstate: realEstateColors,
};

export default colors; 