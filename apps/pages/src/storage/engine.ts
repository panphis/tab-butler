import { BaseStorage, createStorage, StorageType, defaultSearchEngines, queryAllSearchEngine } from '@repo/shared';

const initValue = await queryAllSearchEngine()

type EngineStorage = BaseStorage<string> & {
  setEngine: (id: string) => Promise<void>;
};

const storage = createStorage<string>('engine-storage-key', initValue[0].id!, {
  storageType: StorageType.Local,
  liveUpdate: true,
  serialization: {
    serialize: value => JSON.stringify(value),
    deserialize: value => JSON.parse(value)
  }
});

export const engineStorage: EngineStorage = {
  ...storage,
  setEngine: async (id) => {
    await storage.set(() => id);
  },
};
