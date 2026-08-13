import type { NavigatorScreenParams } from '@react-navigation/native';

export type ExampleStackParamList = {
  Example: undefined;
  Details: { itemId: string };
};

export type InitialRoute = {
  screen?: keyof ExampleStackParamList;
  params?: NavigatorScreenParams<ExampleStackParamList>;
};

export type AppRoute =
  | {
      kind: 'native';
      name: 'home' | 'settings';
      params?: Record<string, unknown>;
    }
  | {
      kind: 'react-native';
      feature: 'example';
      screen?: keyof ExampleStackParamList;
      params?: Record<string, unknown>;
    };

export function parseAppRoute(value: unknown): AppRoute | null {
  if (!value || typeof value !== 'object') return null;
  const route = value as Record<string, unknown>;

  if (
    route.kind === 'native' &&
    (route.name === 'home' || route.name === 'settings')
  ) {
    return { kind: 'native', name: route.name, params: asParams(route.params) };
  }

  if (route.kind === 'react-native' && route.feature === 'example') {
    const screen =
      route.screen === 'Details' || route.screen === 'Example'
        ? route.screen
        : undefined;
    return {
      kind: 'react-native',
      feature: 'example',
      screen,
      params: asParams(route.params),
    };
  }

  return null;
}

function asParams(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}
