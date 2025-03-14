import { BaseStorage } from '@/type';
import { createStorage, StorageType } from './base';
import { languages, MessageTypes } from "@/utils/constant";
import i18n from 'i18next';
import { defaultLanguage, Language } from '@/locales/languages';
import { sendMessage } from '@/utils';

type LanguagesStorage = BaseStorage<string> & {
	setLanguage: (lang: string) => Promise<void>;
};

const storage = createStorage<string>('languages-storage-key', languages.en, {
	storageType: StorageType.Local,
	liveUpdate: true,
});



export const languageStorage: LanguagesStorage = {
	...storage,
	setLanguage: async (lang) => {
		await storage.set(() => lang);
		i18n.changeLanguage(lang);

		await sendMessage({ method: MessageTypes.updateCurrentLanguage });
	},
};

export const getLastLanguage = async () => {
	const savedLanguage = await languageStorage.get();
	return (savedLanguage as Language) || defaultLanguage;
}

async function handlerMessage(request: any, sender: chrome.runtime.MessageSender, response: Function) {
	const { method } = request;
	switch (method) {
		case MessageTypes.updateCurrentLanguage:
			const lang = await getLastLanguage();
			i18n.changeLanguage(lang);
			break;
		default:
			break;
	}
}

chrome.runtime.onMessage.addListener(handlerMessage);