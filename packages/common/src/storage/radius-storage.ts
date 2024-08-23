import { BaseStorage, createStorage, StorageType } from '@repo/storage';


type RadiusStorage = BaseStorage<string> & {
  setRadius: (radius: number | string) => Promise<void>;
};

const storage = createStorage<string>('radius-storage-key', '0.5', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const radiusStorage: RadiusStorage = {
  ...storage,
  setRadius: async (radius) => {
    await storage.set(() => radius.toString());
  },
};
