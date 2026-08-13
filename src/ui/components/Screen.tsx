import React, { type PropsWithChildren } from 'react';
import {
  ScrollView,
  View,
  type ScrollViewProps,
  type ViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{ scroll?: boolean; className?: string }> &
  (ScrollViewProps | ViewProps);

export function Screen({
  children,
  scroll = false,
  className,
  ...props
}: ScreenProps) {
  const content = scroll ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName="gap-6 p-6"
      {...(props as ScrollViewProps)}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={className ?? 'flex-1 p-6'} {...(props as ViewProps)}>
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">{content}</SafeAreaView>
  );
}
