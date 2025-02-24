
import { Fragment } from "react";
import type { FC } from "react"
import { Translation } from 'react-i18next';


type TranslationWithKeyProps = {
	key: string
};

export const TranslationWithKey: FC<TranslationWithKeyProps> = ({ key }) => {
	console.log(key)
	return (<Translation>
		{(t, { i18n }) => <p>{t(key)}</p>}
	</Translation>);
}; 