export const themeColors = {
  light: {
    background: '#F3F5F8',
    surface: '#FFFFFF',
    text: '#2F3A4A',
    muted: '#5F6B7A',
    brand: '#2EC6D6',
    danger: '#EB5757',
  },
  dark: {
    background: '#292929',
    surface: '#303030',
    text: '#F7F8FA',
    muted: '#A4A9B0',
    brand: '#2EC6D6',
    danger: '#EB5757',
  },
} as const;

export type ThemeMode = keyof typeof themeColors;
