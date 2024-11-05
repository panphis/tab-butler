
import type { FC } from "react";
import { Space, } from "@repo/ui"
import { useSearchEngine } from "@/hooks";

import { SearchEngineInfo, SearchEngineOptions } from "./";


type SearchEngineListProps = {

};

export const SearchEngineList: FC<SearchEngineListProps> = ({ }) => {

	const { searchEngines, currentEngineId } = useSearchEngine()

	return (<Space direction="col">
		{
			searchEngines.map(engine =>
				<Space key={engine.id} className="justify-between flex-1 items-center cursor-pointer py-2 hover:bg-muted/50">
					<SearchEngineInfo engine={engine} selected={engine.id + '' === currentEngineId + ''} />
					<SearchEngineOptions engine={engine} />
				</Space>
			)
		}
	</Space>);
}; 