import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

export type SessionSnapshot = {
  isAuthenticated: boolean;
  userId?: string;
};

type AppNavigationModule = {
  closeRN(): Promise<boolean>;
  openNativeRoute(
    route: 'home' | 'settings',
    params?: Record<string, unknown>,
  ): Promise<boolean>;
};

type SessionModule = {
  getSnapshot(): Promise<SessionSnapshot>;
};

type AppInfoModule = {
  appVersion: string;
  buildNumber: string;
  environment: string;
  language: string;
};

const unavailable = (name: string) => {
  throw new Error(`${name} is unavailable on ${Platform.OS}`);
};

export const AppNavigation = (NativeModules.AppNavigationModule ?? {
  closeRN: async () => unavailable('AppNavigationModule.closeRN'),
  openNativeRoute: async () =>
    unavailable('AppNavigationModule.openNativeRoute'),
}) as AppNavigationModule;

export const Session = (NativeModules.SessionModule ?? {
  getSnapshot: async () => ({ isAuthenticated: false }),
}) as SessionModule;

export const AppInfo = (NativeModules.AppInfoModule ?? {
  appVersion: '0.1.0',
  buildNumber: '1',
  environment: __DEV__ ? 'debug' : 'release',
  language: 'en',
}) as AppInfoModule;

export const sessionEvents = new NativeEventEmitter(
  NativeModules.SessionModule ?? {
    addListener: () => undefined,
    removeListeners: () => undefined,
  },
);
