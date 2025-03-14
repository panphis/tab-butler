import { CheckIcon } from "lucide-react";
import { ThemeProviderContext } from ".";
import { themes } from "@/utils/constant";
import { Button, Label } from "@repo/ui";
import { useContext, useId } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();


	return (
		<div className="space-y-2">
			<Label id={anchor} htmlFor={id}>{t('options.color')}</Label>
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
