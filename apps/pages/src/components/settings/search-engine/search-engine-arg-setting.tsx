import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "@repo/ui";
import { Fragment, useState } from "react";

import type { FC } from "react"
import type {
	SearchEngine,
} from "@repo/shared";
import { SearchEngineArgs } from "./";
import { SearchEngineArgsSubmitValues } from "./search-engine-args";
import { SettingsIcon } from "lucide-react";
import { useSearchEngine } from "@/hooks";

type SearchEngineArgSettingProps = {
	engine: SearchEngine
};

export const SearchEngineArgSetting: FC<SearchEngineArgSettingProps> = ({ engine }) => {

	const { updateSearchEngine } = useSearchEngine()
	const [open, setOpen] = useState<boolean>(false)

	const onSubmitArgs = async (searchEngine: SearchEngine, args: SearchEngineArgsSubmitValues) => {
		const params = {
			...searchEngine,
			...args
		}
		await updateSearchEngine(params)
		setOpen(false)
	}

	return (<Fragment>

		<Drawer dismissible={false} key={engine.id} direction="right" open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" size={"sm"} onClick={() => setOpen(true)}>
					<SettingsIcon size={16} />
					Settings
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-screen top-0 right-0 left-auto mt-0 rounded-none border-none !select-text" >
				<div className="h-screen grow p-5 flex flex-col  min-w-[600px] w-max">
					<DrawerHeader>
						<DrawerTitle>Set Search Parameters</DrawerTitle>
						<DrawerDescription>
							Refer to the field names provided by each search engine to configure specific search parameters.
						</DrawerDescription>
						<DrawerDescription>
							Once set, these parameters will be applied to all searches performed on that engine.
						</DrawerDescription>
					</DrawerHeader>
					<SearchEngineArgs engine={engine} onSubmitArgs={(args) => onSubmitArgs(engine, args)} />
				</div>
			</DrawerContent>
		</Drawer>
	</Fragment>);
}; 