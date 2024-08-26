"use client";

import React from "react";
import { ThemeProvider, ThemeProviderContext } from "../theme";

import { HTMLAttributes, ReactNode, useContext, useEffect, useState } from "react";

import "../../globals.css";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const getSystemTheme = () =>
	window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function LayoutContainer({ children }: LayoutProps) {
	const { theme, color, radius } = useContext(ThemeProviderContext);
	const [rootClassName, setRootClassName] = useState(() => getSystemTheme());

	useEffect(() => {
		if (theme === "system") {
			const systemTheme = getSystemTheme();
			setRootClassName(systemTheme);
		} else {
			setRootClassName(theme);
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
			const systemTheme = getSystemTheme();
			setRootClassName(systemTheme);
			return;
		}
	};


	useEffect(() => {
		const html = document.querySelector("html");
		if (html) {
			html.className = `theme-${color} ${rootClassName}`;
		}
	}, [theme, rootClassName])

	return (
		<div
			className={`w-full min-h-screen`}
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
