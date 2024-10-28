import { Fragment, type FC, MouseEvent } from "react";
import { SearchEngine } from "@repo/shared";
import { EditSearchEngine } from "./";

type SearchEngineOptionsProps = {
	engine: SearchEngine;
};

export const SearchEngineOptions: FC<SearchEngineOptionsProps> = ({ engine }) => {
	const onEdit = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
	}

	const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
	}
	return (<Fragment>
		<EditSearchEngine engine={engine} />

	</Fragment>);
}; 