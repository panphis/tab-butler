import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { supportedLngs } from './languages';
import { languages } from "@/utils/constant";
import en from "./en/translation";
import zh from "./zh/translation";
import { getLastLanguage } from "@/storage/languages-storage";

const lang = await getLastLanguage();

i18n
	.use(initReactI18next)
	.init({
		fallbackLng: lang,
		supportedLngs: supportedLngs,
		debug: true,
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false
		},
		load: 'languageOnly', // 只加载语言代码，不加载区域设置
	});

i18n.addResourceBundle(languages.zh, 'translation', zh);
i18n.addResourceBundle(languages.en, 'translation', en);


export default i18n;