import React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../cn';

const buttonVariants = cva(
  'min-h-12 items-center justify-center rounded-xl px-4 py-3',
  {
    variants: {
      variant: {
        primary: 'bg-brand active:opacity-80',
        secondary: 'bg-slate-200 active:opacity-80 dark:bg-slate-700',
        ghost: 'active:bg-slate-200 dark:active:bg-slate-700',
        danger: 'bg-danger active:opacity-80',
      },
      size: {
        default: 'min-h-12',
        compact: 'min-h-10 px-3 py-2',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
);

type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & { label: string };

export function Button({
  label,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  const isDark = variant === 'primary' || variant === 'danger';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel ?? label}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <Text
        className={cn(
          'text-center text-base font-semibold',
          isDark ? 'text-white' : 'text-text',
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
