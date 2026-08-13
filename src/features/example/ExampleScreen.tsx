import React, { useState } from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { ExampleStackParamList } from '../../navigation/types';
import { AppNavigation } from '../../native/bridge';
import { useDemoStore } from '../../state/demoStore';
import { Button } from '../../ui/components/Button';
import { Dialog } from '../../ui/components/Dialog';
import { Input } from '../../ui/components/Input';
import { Screen } from '../../ui/components/Screen';

type Props = NativeStackScreenProps<ExampleStackParamList, 'Example'>;

export function ExampleScreen({ navigation }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const count = useDemoStore(state => state.count);
  const draft = useDemoStore(state => state.draft);
  const increment = useDemoStore(state => state.increment);
  const setDraft = useDemoStore(state => state.setDraft);

  return (
    <Screen scroll>
      <View className="gap-3">
        <Text className="text-3xl font-bold text-text">RN 示例流程</Text>
        <Text className="text-base leading-6 text-muted">
          这是由 Native 首页按需挂载的 React Native feature root。Native
          仍拥有总导航。
        </Text>
      </View>

      <View className="gap-3 rounded-2xl bg-surface p-4">
        <Text className="text-base font-semibold text-text">
          Zustand feature store
        </Text>
        <Text className="text-muted">计数值：{count}</Text>
        <Button label="增加计数" onPress={increment} />
        <Input
          label="可恢复草稿（非敏感）"
          value={draft}
          onChangeText={setDraft}
        />
      </View>

      <View className="gap-3">
        <Button
          label="进入 RN 子页面"
          variant="secondary"
          onPress={() => navigation.navigate('Details', { itemId: 'demo-001' })}
        />
        <Button
          label="打开 Dialog / Portal 样例"
          variant="ghost"
          onPress={() => setDialogOpen(true)}
        />
        <Button
          label="返回 Native 首页"
          variant="danger"
          onPress={() => AppNavigation.closeRN()}
        />
      </View>

      <Dialog
        open={dialogOpen}
        title="RN 内部浮层"
        onClose={() => setDialogOpen(false)}
      >
        <View className="gap-4">
          <Text className="text-base leading-6 text-muted">
            Feature root 内的浮层由 RN 管理，关闭 RN 容器仍由 Native 执行。
          </Text>
          <Button
            label="关闭"
            size="compact"
            onPress={() => setDialogOpen(false)}
          />
        </View>
      </Dialog>
    </Screen>
  );
}
