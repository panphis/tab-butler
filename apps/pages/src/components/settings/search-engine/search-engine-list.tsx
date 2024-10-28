import { Fragment, type FC, MouseEvent } from "react";

import {
	Space,
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/ui"
import { useSearchEngine } from "@/hooks";

import { SearchEngineInfo, SearchEngineOptions } from "./";

type SearchEngineListProps = {

};

export const SearchEngineList: FC<SearchEngineListProps> = ({ }) => {

	const { searchEngines } = useSearchEngine()


	return (<Fragment>
		<Accordion type="multiple" className="w-full">
			{
				searchEngines.map(engine => <AccordionItem key={engine.id} value={engine.id}>
					<AccordionTrigger>
						<Space className="justify-between flex-1 items-center">
							<SearchEngineInfo engine={engine} />
							<SearchEngineOptions engine={engine} />
						</Space>
					</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				)
			}
		</Accordion>
	</Fragment>);
};
export default SearchEngineList