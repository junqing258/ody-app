import React from 'react';
import { Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { ExampleStackParamList } from '../../navigation/types';
import { Button } from '../../ui/components/Button';
import { Screen } from '../../ui/components/Screen';

type Props = NativeStackScreenProps<ExampleStackParamList, 'Details'>;

export function DetailsScreen({ navigation, route }: Props) {
  return (
    <Screen className="flex-1 gap-6 p-6">
      <Text className="text-3xl font-bold text-text">RN 子页面</Text>
      <Text className="text-base leading-6 text-muted">
        参数 itemId：{route.params.itemId}
      </Text>
      <Button
        label="返回 RN 上一页"
        variant="secondary"
        onPress={() => navigation.goBack()}
      />
    </Screen>
  );
}
