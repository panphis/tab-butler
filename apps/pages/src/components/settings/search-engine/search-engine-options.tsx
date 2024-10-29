import type { FC, MouseEvent } from "react";
import { SearchEngine } from "@repo/shared";
import { Space } from "@repo/ui";
import { DeleteSearchEngine, EditSearchEngine } from "./";




type SearchEngineOptionsProps = {
	engine: SearchEngine;
};

export const SearchEngineOptions: FC<SearchEngineOptionsProps> = ({ engine }) => {

	function onClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
		e.preventDefault()
	}


	return (<Space onClick={onClick}>
		<EditSearchEngine engine={engine} />
		<DeleteSearchEngine engine={engine} />
	</Space>);
}; 