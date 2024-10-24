import { BaseStorage, createStorage, StorageType, defaultSearchEngines } from '@repo/shared';


type EngineStorage = BaseStorage<string> & {
  setEngine: (id: string) => Promise<void>;
};

const storage = createStorage<string>('engine-storage-key', defaultSearchEngines[0].id, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const engineStorage: EngineStorage = {
  ...storage,
  setEngine: async (id) => {
    await storage.set(() => id);
  },
};
