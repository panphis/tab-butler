import type { FC, MouseEvent } from "react";
import { SearchEngine } from "@/type";
import { Space } from "@repo/ui";
import { DeleteSearchEngine, EditSearchEngine, SearchEngineArgSetting } from ".";




type SearchEngineOptionsProps = {
	engine: SearchEngine;
	className?: string
	single: boolean
};
export const SearchEngineOptions: FC<SearchEngineOptionsProps> = ({ engine, className, single }) => {


	function onClick(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
	}


	return (<Space onClick={onClick} className={className}>
		<SearchEngineArgSetting engine={engine} />
		<EditSearchEngine engine={engine} />
		<DeleteSearchEngine engine={engine} disabled={single} />
	</Space>);
}; 