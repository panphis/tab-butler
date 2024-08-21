import { BaseStorage, createStorage, StorageType } from '@repo/storage';
import { Themes, themesEnum } from "..";

type ThemeStorage = BaseStorage<Themes> & {
  setTheme: (theme: Themes) => Promise<void>;
};

const storage = createStorage<Themes>('theme-storage-key', themesEnum.system, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const themeStorage: ThemeStorage = {
  ...storage,
  setTheme: async (theme) => {
    await storage.set(() => theme);
  },
};
