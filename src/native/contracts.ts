/**
 * The JS-facing bridge contract. The Objective-C implementation is deliberately
 * allow-listed and returns only non-sensitive session data.
 */
export type NativeErrorCode = 'E_ROUTE_NOT_ALLOWED' | 'E_NATIVE_UNAVAILABLE';

export type NativeBridgeContract = {
  AppNavigationModule: {
    closeRN(): Promise<boolean>;
    openNativeRoute(
      route: 'home' | 'settings',
      params?: Record<string, unknown>,
    ): Promise<boolean>;
  };
  SessionModule: {
    getSnapshot(): Promise<{ isAuthenticated: boolean; userId?: string }>;
    addListener(
      eventName: 'sessionChanged',
      listener: (snapshot: unknown) => void,
    ): { remove(): void };
  };
  AppInfoModule: {
    appVersion: string;
    buildNumber: string;
    environment: string;
    language: string;
  };
};
