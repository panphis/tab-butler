import { SearchEngine } from "@repo/shared";
import { Space } from "@repo/ui";
import { Fragment, type FC } from "react";
import { Favicon } from "@/components";

type SearchEngineInfoProps = {
	engine: SearchEngine
};

export const SearchEngineInfo: FC<SearchEngineInfoProps> = ({ engine }) => {
	return (<Fragment>
		<Space className="items-center gap-4">
			<Favicon className="w-4 h-4" src={engine.url} title={engine.title} />
			<p>
				{engine.title}
			</p>
		</Space>
	</Fragment>);
}; 