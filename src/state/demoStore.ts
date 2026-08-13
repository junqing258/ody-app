import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type DemoState = {
  count: number;
  draft: string;
  increment: () => void;
  setDraft: (draft: string) => void;
  reset: () => void;
};

const initialState = { count: 0, draft: '' };

export const useDemoStore = create<DemoState>()(
  persist(
    set => ({
      ...initialState,
      increment: () => set(state => ({ count: state.count + 1 })),
      setDraft: draft => set({ draft }),
      reset: () => set(initialState),
    }),
    {
      name: 'ody-app.example-store',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ count: state.count, draft: state.draft }),
      migrate: persisted => {
        if (!persisted || typeof persisted !== 'object') return initialState;
        const value = persisted as Partial<Pick<DemoState, 'count' | 'draft'>>;
        return {
          ...initialState,
          count: value.count ?? 0,
          draft: value.draft ?? '',
        };
      },
    },
  ),
);
