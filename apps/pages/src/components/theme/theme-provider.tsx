"use client"

import React, { createContext, useState } from "react";

import { useStorageSuspense } from '@repo/shared';

import { themesEnum } from "@repo/shared";
import type { Themes } from "@repo/shared";

import { themeStorage, colorStorage, radiusStorage } from "@repo/shared";

type ThemeProviderState = {
	theme: Themes;
	setTheme: (theme: Themes) => void;
	color: string;
	setColor: (key: string) => void;
	radius: string | number;
	setRadius: (radius: string | number) => void;
};

const initialState: ThemeProviderState = {
	theme: themesEnum.system,
	setTheme: () => null,
	color: "zinc",
	setColor: () => null,
	radius: 0.5,
	setRadius: () => null,
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


	const theme = useStorageSuspense(themeStorage);
	const color = useStorageSuspense(colorStorage);
	const radius = useStorageSuspense(radiusStorage);


	const value = {
		theme,
		setTheme: themeStorage.setTheme,
		color,
		setColor: colorStorage.setColor,
		radius,
		setRadius: radiusStorage.setRadius,
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
