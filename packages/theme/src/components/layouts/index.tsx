"use client"

import React from "react";
import { ThemeProvider, ThemeProviderContext } from "../theme";

import { HTMLAttributes, ReactNode, useContext, useEffect } from "react";

import '../../globals.css';
import "../assets/js/i18n";


interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const getSystemTheme = () =>
	window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function LayoutContainer({ children }: LayoutProps) {
	const {
		theme,
		color,
		radius,
	} = useContext(ThemeProviderContext);




	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		if (theme === "system") {
			const systemTheme = getSystemTheme();
			root.classList.add(systemTheme);
			return;
		} else {
			root.classList.add(theme);
		}

		const darkModeMediaQuery = window.matchMedia(
			"(prefers-color-scheme: dark)"
		);
		darkModeMediaQuery.addEventListener("change", onSystemThemeChange);
		return () => {
			darkModeMediaQuery.removeEventListener("change", onSystemThemeChange);
		};
	}, [theme]);

	const onSystemThemeChange = (e: MediaQueryListEvent) => {
		if (theme === "system") {
			const root = window.document.documentElement;
			const systemTheme = getSystemTheme();
			root.classList.remove("light", "dark");
			root.classList.add(systemTheme);
			return;
		}
	};

	return (
		<div
			className={`theme-${color} w-full min-h-screen`}
			style={
				{
					"--radius": `${radius}rem`,
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	);
}

export function Layout({ children }: LayoutProps) {
	return (
		<ThemeProvider>
			<LayoutContainer>{children}</LayoutContainer>
		</ThemeProvider>
	);
}
