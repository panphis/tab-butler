import { BaseStorage, createStorage, StorageType } from '@repo/storage';
import { searchEngines } from "@/utils";

type EngineStorage = BaseStorage<string> & {
  setEngine: (id: string) => Promise<void>;
};

const storage = createStorage<string>('engine-storage-key',searchEngines[0].id, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const engineStorage: EngineStorage = {
  ...storage,
  setEngine: async (id) => {
    await storage.set(() => id);
  },
};
