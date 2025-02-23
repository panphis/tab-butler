import React, { Fragment, useContext, useId, type FC } from "react";
import {
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui";

import { languageNames } from "@/locales/languages";
import { languages } from "@/utils/constant";
import { ThemeProviderContext } from "@/components/theme";

type LanguageSettingProps = {
	anchor?: string
};

export const Language: FC<LanguageSettingProps> = ({ anchor }) => {
	const id = useId();
	const { language, setLanguage } = useContext(ThemeProviderContext);
	const onValueChange = (value: string) => {
		setLanguage(value);
	};

	return (<Fragment>
		<Label id={anchor} htmlFor={id}>Language</Label>
		<Select onValueChange={onValueChange} value={language}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={languages.zh}>{languageNames.zh}</SelectItem>
				<SelectItem value={languages.en}>{languageNames.en}</SelectItem>
			</SelectContent>
		</Select>
	</Fragment>);
};
export default Language