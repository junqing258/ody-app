export const themeColors = {
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    muted: '#475569',
    brand: '#2563EB',
    danger: '#DC2626',
  },
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    muted: '#94A3B8',
    brand: '#60A5FA',
    danger: '#F87171',
  },
} as const;

export type ThemeMode = keyof typeof themeColors;
