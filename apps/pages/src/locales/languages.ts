import { languages } from "@/utils/constant";

export const supportedLngs = [languages.en, languages.zh];

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

export const languageNames: Record<Language, string> = {
	en: 'English',
	zh: '中文',
};

export const LAST_LANGUAGE_KEY = 'lastLanguage';