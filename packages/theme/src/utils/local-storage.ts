
import { localStorageKeys } from "./";
export const getItem = (key: keyof typeof localStorageKeys): any => {
	const storage = localStorage.getItem(key);
	const value = storage ? JSON.parse(storage) : null;
	return value;
};

export const setItem = (key: keyof typeof localStorageKeys, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};
