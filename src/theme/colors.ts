// Paleta de colores sincronizada con la versión web
export const colors = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    card: '#ffffff',
    cardForeground: '#0a0a0a',
    primary: '#171717',
    primaryForeground: '#fafafa',
    secondary: '#f5f5f5',
    secondaryForeground: '#171717',
    muted: '#f5f5f5',
    mutedForeground: '#737373',
    accent: '#f5f5f5',
    accentForeground: '#171717',
    destructive: '#ef4444',
    border: '#e5e5e5',
    input: '#e5e5e5',
    ring: '#a3a3a3',
    // Green House palette
    greenHouse: {
      50: '#f3fce9',
      100: '#e4f7d0',
      200: '#cbf0a6',
      300: '#a9e373',
      400: '#8ad447',
      500: '#6bb929',
      600: '#50941c',
      700: '#3e711a',
      800: '#355a1a',
      900: '#2f4e1b',
      950: '#152a09',
    },
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    card: '#171717',
    cardForeground: '#fafafa',
    primary: '#fafafa',
    primaryForeground: '#171717',
    secondary: '#262626',
    secondaryForeground: '#fafafa',
    muted: '#262626',
    mutedForeground: '#a3a3a3',
    accent: '#262626',
    accentForeground: '#fafafa',
    destructive: '#dc2626',
    border: 'rgba(255, 255, 255, 0.1)',
    input: 'rgba(255, 255, 255, 0.15)',
    ring: '#737373',
    // Green House palette (mismos colores)
    greenHouse: {
      50: '#f3fce9',
      100: '#e4f7d0',
      200: '#cbf0a6',
      300: '#a9e373',
      400: '#8ad447',
      500: '#6bb929',
      600: '#50941c',
      700: '#3e711a',
      800: '#355a1a',
      900: '#2f4e1b',
      950: '#152a09',
    },
  },
};

// Tipo para la paleta Green House
export type GreenHousePalette = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

// Tipo para los colores del tema
export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  greenHouse: GreenHousePalette;
};
