import { Fragment, type FC, useState, MouseEvent } from "react";

import {
	Button,
	Space,
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/ui"
import { ButtonGroup, SearchEngine } from "@repo/shared";


import { useSearchEngine } from "@/hooks";

type SearchEngineListProps = {

};

export const SearchEngineList: FC<SearchEngineListProps> = ({ }) => {

	const { searchEngines } = useSearchEngine()

	const onEdit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, engine: SearchEngine) => {
		e.stopPropagation()
	}

	const onDelete = (e: MouseEvent<HTMLButtonElement, MouseEvent>, engine: SearchEngine) => {
		e.stopPropagation()

	}

	return (<Fragment>
		<Accordion type="multiple" className="w-full">
			<p>asdfasdfas</p>
			{
				searchEngines.map(engine => <AccordionItem key={engine.id} value={engine.id}>
					<AccordionTrigger>
						<Space className="justify-between flex-1 items-center">
							<div>
								{engine.title}
							</div>
							<ButtonGroup buttonSize={'sm'} onEdit={(e) => onEdit(e, engine)} onDelete={(e) => onDelete(e, engine)} />
						</Space>
					</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>)
			}
		</Accordion>
	</Fragment>);
};
export default SearchEngineList