import { CheckIcon } from "lucide-react";
import { themes, ThemeProviderContext } from ".";
import { Button, Label } from "@repo/ui";
import { useContext } from "react";
import React from "react";

export function ThemeColors() {
	const {
		theme: mode,
		setThemeColor,
		themeColor,
	} = useContext(ThemeProviderContext);

	return (
		<div className='space-y-1.5'>
			<Label className='text-xs'>Color</Label>
			<div className='flex gap-2 p-2 flex-wrap'>
				{themes.map((theme) => {
					const isActive = themeColor === theme.name;

					return (
						<Button
							variant={"outline"}
							size='sm'
							key={theme.name}
							onClick={() => {
								setThemeColor(theme.name);
							}}
							className={`justify-start ${isActive && "border-2 border-primary"}`}
							style={
								{
									"--theme-primary": `hsl(${
										theme?.activeColor[mode === "dark" ? "dark" : "light"]
									})`,
								} as React.CSSProperties
							}
						>
							<span
								className={
									"mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"
								}
							>
								{isActive && <CheckIcon className='h-4 w-4 text-white' />}
							</span>
							{theme.label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
