import React, { type PropsWithChildren } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

type DialogProps = PropsWithChildren<{
  open: boolean;
  title: string;
  onClose: () => void;
}>;

export function Dialog({ open, title, onClose, children }: DialogProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/40 p-6"
        onPress={onClose}
      >
        <Pressable
          className="w-full gap-4 rounded-2xl bg-surface p-6"
          onPress={event => event.stopPropagation()}
        >
          <Text className="text-lg font-bold text-text">{title}</Text>
          <View>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
