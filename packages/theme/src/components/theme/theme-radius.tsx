import { Button, Label } from "@repo/ui";
import { useContext } from "react";
import { ThemeProviderContext, radius } from ".";
import React from "react";

export function ThemeRadius() {
	const { themeRadius, setThemeRadius } = useContext(ThemeProviderContext);

	return (
		<div className='space-y-1.5'>
			<Label className='text-xs'>Radius</Label>
			<div className='flex gap-2'>
				{radius.map((value) => {
					return (
						<Button
							variant={"outline"}
							size='sm'
							key={value}
							onClick={() => {
								setThemeRadius(value);
							}}
							className={`${themeRadius === value && "border-2 border-primary"}`}
						>
							{value}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
