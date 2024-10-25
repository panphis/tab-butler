import { type FC } from "react";
import { AnchorIds } from "../enums";
import { CreateSearchEngine, SearchEngineList } from ".";
import { Label, Space } from "@repo/ui";
export const SearchEngine: FC = ({ }) => {
	return (<div id={AnchorIds.searchEngine}>
		<Space className="justify-between">
			<Label id="searchEngine">Search Engine</Label>
			<CreateSearchEngine />
		</Space>
		<SearchEngineList />
	</div>);
};