import { Fragment } from "react";
import {
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui";
import { languages } from "../../utils/constant";
import { Translation } from "../translation";
import { useTranslation } from "react-i18next";
import React from "react";

export function ThemeLanguage() {
	const { t, i18n } = useTranslation();
	const { changeLanguage } = i18n;

	const onValueChange = (value: string) => {
		changeLanguage(value);
	};

	return (
		<Fragment>
			<Label className='text-xs'>Language</Label>
			<Select onValueChange={onValueChange}>
				<SelectTrigger className='w-[280px]'>
					<SelectValue placeholder={<Translation id='select-language' />} />
				</SelectTrigger>
				<SelectContent>
					{languages.map((item) => (
						<SelectItem value={item} key={item}>
							<Translation id={item} />
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</Fragment>
	);
}
