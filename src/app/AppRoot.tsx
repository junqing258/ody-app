import React, { useEffect, useMemo, useState } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DetailsScreen } from '../features/example/DetailsScreen';
import { ExampleScreen } from '../features/example/ExampleScreen';
import type { ExampleStackParamList, InitialRoute } from '../navigation/types';
import { themeColors } from '../ui/theme';

const Stack = createNativeStackNavigator<ExampleStackParamList>();

function navigationTheme(isDark: boolean): Theme {
  const base = isDark ? DarkTheme : DefaultTheme;
  const colors = themeColors[isDark ? 'dark' : 'light'];
  return {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      primary: colors.brand,
    },
  };
}

export function AppRoot({ initialRoute }: { initialRoute?: InitialRoute }) {
  const isDark = useColorScheme() === 'dark';
  const theme = useMemo(() => navigationTheme(isDark), [isDark]);
  const [isRuntimeReady, setIsRuntimeReady] = useState(false);
  const initialScreen =
    initialRoute?.screen === 'Details' ? 'Details' : 'Example';

  // Native-stack and safe-area both emit native layout events while mounting.
  // Mount them on the first post-commit frame, after the RN root has finished
  // registering its callable JS modules. This is especially important when the
  // root is opened on demand by the UIKit host.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsRuntimeReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isRuntimeReady) {
    return <View className="flex-1 bg-background" />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName={initialScreen}
          screenOptions={{ headerShown: true, headerShadowVisible: false }}
        >
          <Stack.Screen
            name="Example"
            component={ExampleScreen}
            options={{ title: 'Ody App', headerBackVisible: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: '详情', headerBackButtonDisplayMode: 'minimal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
