import { Fragment } from "react";
import type { FC } from "react";
import {
	Space,

	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "@repo/ui"
import { useSearchEngine } from "@/hooks";

import { SearchEngineInfo, SearchEngineOptions, SearchEngineArgs } from "./";
import {
	SearchEngine,
} from "@repo/shared";

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

	return (<Space direction="col">

		{
			searchEngines.map(engine =>
				<Drawer key={engine.id} direction="right">
					<DrawerTrigger asChild>
						<Space className="justify-between flex-1 items-center cursor-pointer hover:bg-gray-100">
							<SearchEngineInfo engine={engine} />
							<SearchEngineOptions engine={engine} />
						</Space>
					</DrawerTrigger>
					<DrawerContent className="h-screen top-0 right-0 left-auto mt-0 rounded-none border-none" >
						<div className="h-screen grow p-5 flex flex-col  min-w-[600px] w-max">
							<DrawerHeader>
								<DrawerTitle>Set Search Parameters</DrawerTitle>
								<DrawerDescription>Refer to the field names provided by each search engine to configure specific search parameters. Once set, these parameters will be applied to all searches performed on that engine.</DrawerDescription>
							</DrawerHeader>
							<SearchEngineArgs engine={engine} onSubmitArgs={(args) => onSubmitArgs(engine, args)} />
						</div>
					</DrawerContent>
				</Drawer>
			)
		}
	</Space>);
}; 