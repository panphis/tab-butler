"use client";

import React from "react";
import { ThemeProvider, ThemeProviderContext } from "../theme";

import { HTMLAttributes, ReactNode, useContext, useEffect, useState } from "react";
import { Toaster } from "@repo/ui"
import "@/styles/themes.css";

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
	}, [rootClassName, color])


	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty('--radius', `${radius}rem`);
	}, [radius])

	return (
		<main
			className={`w-full min-h-screen h-full`}
			id="layout"
		>
			{children}
		</main>
	);
}

export function Layout({ children }: LayoutProps) {
	return (
		<ThemeProvider>
			<LayoutContainer>{children}</LayoutContainer>
			<Toaster />
		</ThemeProvider>
	);
}
