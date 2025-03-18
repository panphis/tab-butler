
import type { FC } from "react";
import { Space, } from "@repo/ui"
import { useSearchEngine } from "@/hooks";

import { SearchEngineInfo, SearchEngineOptions } from ".";


type SearchEngineListProps = {

};

export const SearchEngineList: FC<SearchEngineListProps> = ({ }) => {

	const { searchEngines } = useSearchEngine()

	return (<Space direction="col">
		{
			searchEngines.map(engine =>
				<Space key={engine.id}
					className="justify-between flex-1 items-start cursor-pointer py-2 flex-col hover:bg-muted/50 lg:flex-row "
				>
					<SearchEngineInfo engine={engine} selected={!!engine?.selected || false} />
					<SearchEngineOptions className="self-end" engine={engine} single={searchEngines.length <= 1} />
				</Space>
			)
		}
	</Space>);
}; 