import React from 'react';
import {
  Text,
  TextInput,
  useColorScheme,
  type TextInputProps,
  View,
} from 'react-native';

import { cn } from '../cn';
import { themeColors } from '../theme';

type InputProps = TextInputProps & { label?: string; error?: string };

export function Input({ label, error, className, ...props }: InputProps) {
  const isDark = useColorScheme() === 'dark';
  const placeholderTextColor =
    themeColors[isDark ? 'dark' : 'light'].muted;

  return (
    <View className="gap-2">
      {label ? (
        <Text className="text-sm font-medium text-text">{label}</Text>
      ) : null}
      <TextInput
        className={cn(
          'min-h-12 rounded-xl border border-slate-300 bg-surface px-4 text-base text-text dark:border-slate-600',
          error && 'border-danger',
          className,
        )}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {error ? <Text className="text-sm text-danger">{error}</Text> : null}
    </View>
  );
}
