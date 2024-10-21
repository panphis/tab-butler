import { BaseStorage, createStorage, ID, StorageType } from '../';


type WallpaperStorage = BaseStorage<string> & {
	setWallpaper: (wallpaper: ID) => Promise<void>;
};

const storage = createStorage<string>('wallpaper-storage-key', JSON.stringify(null), {
	storageType: StorageType.Local,
	liveUpdate: true,
});

export const wallpaperStorage: WallpaperStorage = {
	...storage,
	setWallpaper: async (wallpaper: ID) => {
		await storage.set(() => JSON.stringify(wallpaper));
	},
};
