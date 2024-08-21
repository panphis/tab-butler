import React, { createContext, useState } from "react";
import { setItem, getItem, localStorageKeys, themesEnum } from "../../utils";
import { Themes } from "../../";

type ThemeProviderState = {
	theme: Themes;
	setTheme: (theme: Themes) => void;
	themeColor: string;
	setThemeColor: (key: string) => void;
	themeRadius: string | number;
	setThemeRadius: (radius: string | number) => void;
};

const initialState: ThemeProviderState = {
	theme: themesEnum.system,
	setTheme: () => null,
	themeColor: "zinc",
	setThemeColor: () => null,
	themeRadius: 0.5,
	setThemeRadius: () => null,
};

export const ThemeProviderContext =
	createContext<ThemeProviderState>(initialState);

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Themes;
	defaultColor?: string;
	defaultRadius?: number;
};
export function ThemeProvider({
	children,
	defaultTheme = "system",
	defaultColor = "zinc",
	defaultRadius = 0.5,
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Themes>(
		() => getItem(localStorageKeys.theme) || defaultTheme
	);

	const [themeColor, setThemeColor] = useState<string>(
		() => getItem(localStorageKeys.color) || defaultColor
	);
	const [themeRadius, setThemeRadius] = useState<number | string>(
		() => getItem(localStorageKeys.radius) || defaultRadius
	);

	const value = {
		theme,
		setTheme: (theme: Themes) => {
			setItem(localStorageKeys.theme, theme);
			setTheme(theme);
		},
		themeColor,
		setThemeColor: (color: string) => {
			setItem(localStorageKeys.color, color);
			setThemeColor(color);
		},
		themeRadius,
		setThemeRadius: (value: number | string) => {
			setItem(localStorageKeys.radius, value);
			setThemeRadius(value);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
