import React, { useMemo } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
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
  const initialScreen =
    initialRoute?.screen === 'Details' ? 'Details' : 'Example';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName={initialScreen}>
          <Stack.Screen
            name="Example"
            component={ExampleScreen}
            options={{ title: 'Ody App' }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: '详情' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
