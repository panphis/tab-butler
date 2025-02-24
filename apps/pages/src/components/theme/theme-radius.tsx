import { Button, Label } from "@repo/ui";
import { useContext, useId } from "react";
import { ThemeProviderContext } from ".";
import { radius } from "@/utils/constant";
import { useTranslation } from "react-i18next";

type Props = {
	anchor?: string
};

export function ThemeRadius({ anchor }: Props) {
	const { radius: currentRadius, setRadius } = useContext(ThemeProviderContext);
	const { t } = useTranslation();
	const id = useId();
	return (
		<div className="space-y-2">
			<Label id={anchor} htmlFor={id}>{t('options.radius')}</Label>
			<div id={id} className='flex gap-2'>
				{radius.map((value) => {
					return (
						<Button
							variant={"outline"}
							size='sm'
							key={value}
							onClick={() => {
								setRadius(value);
							}}
							className={`${currentRadius === value.toString() && "border-2 border-primary"}`}
						>
							{value}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
