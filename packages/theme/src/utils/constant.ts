export type LocalStorageKeys = "theme" | "color" | "radius";

export const localStorageKeys: Record<LocalStorageKeys, LocalStorageKeys> = {
	theme: "theme",
	color: "color",
	radius: "radius",
};

export type Themes = "light" | "dark" | "system";
export const themesEnum: Record<Themes, Themes> = {
	light: "light",
	dark: "dark",
	system: "system",
};

export const languages = ["en-US", "zh-CN"];
