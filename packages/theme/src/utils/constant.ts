import { Themes } from "..";

export type LocalStorageKeys = "theme" | "color" | "radius";


export const themesEnum: Record<Themes, Themes> = {
	light: "light",
	dark: "dark",
	system: "system",
};

export const languages = ["en-US", "zh-CN"];
