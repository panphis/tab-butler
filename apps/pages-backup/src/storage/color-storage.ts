import { BaseStorage } from '@/type';
import { createStorage, StorageType } from './base';


type ColorStorage = BaseStorage<string> & {
	setColor: (color: string) => Promise<void>;
};

const storage = createStorage<string>('color-storage-key', 'zinc', {
	storageType: StorageType.Local,
	liveUpdate: true,
});

export const colorStorage: ColorStorage = {
	...storage,
	setColor: async (color) => {
		await storage.set(() => color);
	},
};
