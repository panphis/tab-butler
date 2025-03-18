import { BaseStorage, Themes } from '@/type';
import { createStorage, StorageType } from './base';
import { themesEnum } from '@/utils';



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
