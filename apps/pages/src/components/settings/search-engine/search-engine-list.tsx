import { Fragment } from "react";
import type { FC } from "react";
import {
	Space,
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/ui"
import { useSearchEngine } from "@/hooks";

import { SearchEngineInfo, SearchEngineOptions, SearchEngineArgs } from "./";
import { SearchEngine } from "@repo/shared";

type SearchEngineListProps = {

};

export const SearchEngineList: FC<SearchEngineListProps> = ({ }) => {

	const { searchEngines, updateSearchEngine } = useSearchEngine()

	const onSubmitArgs = async (searchEngine: SearchEngine, args: SearchEngine['args'] = []) => {


		const argMap = args.reduce((acc, arg) => {
			const { key, value, connectors, prefix, suffix } = arg
			if (key) {
				acc[key] = `${prefix}${value.join(connectors) || ''}${suffix}`
			}
			return acc
		}, {} as Record<string, string>)
		const addition = new URLSearchParams(argMap)
		const resultStr = `${addition.toString()}`
		const argStr = decodeURIComponent(resultStr)
		const params = {
			...searchEngine,
			args: args,
			argStr: argStr
		}
		await updateSearchEngine(params)
	}

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
						<SearchEngineArgs engine={engine} onSubmitArgs={(args) => onSubmitArgs(engine, args)} />
					</AccordionContent>
				</AccordionItem>
				)
			}
		</Accordion>
	</Fragment>);
}; 