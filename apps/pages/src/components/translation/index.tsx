
import { Fragment } from "react";
import type { FC } from "react"
import { Translation } from 'react-i18next';


type TranslationWithIdProps = {
	id: string
};

export const TranslationWithId: FC<TranslationWithIdProps> = ({ id }) => {
	return (<Translation key={id}>
		{(t, { i18n }) => t(id)}
	</Translation>);
}; 