import { CheckIcon } from "lucide-react";
import { themes, ThemeProviderContext } from ".";
import { Button, Label } from "@repo/ui";
import { useContext, useId } from "react";
import React from "react";

type Props = {
	anchor?: string
};
export function ThemeColors({ anchor }: Props) {
	const {
		theme: mode,
		setColor,
		color,
	} = useContext(ThemeProviderContext);
	const id = useId();
	return (
		<div className="space-y-2">
			<Label id={anchor} htmlFor={id}>Color</Label>
			<div id={id} className='flex gap-2 flex-wrap'>
				{themes.map((theme) => {
					const isActive = color === theme.name;
					return (
						<Button
							variant={"outline"}
							size='sm'
							key={theme.name}
							onClick={() => {
								setColor(theme.name);
							}}
							className={`justify-start ${isActive && "border-2 border-primary"}`}
							style={
								{
									"--theme-primary": `hsl(${theme?.activeColor[mode === "dark" ? "dark" : "light"]
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
