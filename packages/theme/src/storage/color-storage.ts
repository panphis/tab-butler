import { BaseStorage, createStorage, StorageType } from '@repo/storage';
import { Themes } from "../";

type ColorStorage = BaseStorage<Themes> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<Themes>('theme-storage-key', 'light', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const colorStorage: ColorStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentTheme => {
      return currentTheme
    });
  },
};
