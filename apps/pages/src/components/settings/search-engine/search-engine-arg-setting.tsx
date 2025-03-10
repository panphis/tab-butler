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
} from "@/type";
import { SearchEngineArgs } from "./";
import { SearchEngineArgsSubmitValues } from "./search-engine-args";
import { SettingsIcon } from "lucide-react";
import { useSearchEngine } from "@/hooks";
import { useTranslation } from "react-i18next";

type SearchEngineArgSettingProps = {
	engine: SearchEngine
};

export const SearchEngineArgSetting: FC<SearchEngineArgSettingProps> = ({ engine }) => {

	const { t } = useTranslation();
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
				<Button variant="outline" size={"sm"} className="gap-1" onClick={() => setOpen(true)}>
					<SettingsIcon size={16} />
					{t('options.search_engine_settings.trigger')}
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-screen top-0 right-0 left-auto mt-0 rounded-none border-none !select-text" >
				<div className="h-screen grow p-5 flex flex-col  min-w-[600px] w-max">
					<DrawerHeader>
						<DrawerTitle>{t('options.search_engine_settings.form_title')}</DrawerTitle>
						<DrawerDescription>
							{t('options.search_engine_settings.form_description.0')}
						</DrawerDescription>
						<DrawerDescription>
							{t('options.search_engine_settings.form_description.1')}
						</DrawerDescription>
					</DrawerHeader>
					<SearchEngineArgs engine={engine} onSubmitArgs={(args) => onSubmitArgs(engine, args)} onCancel={() => setOpen(false)} />
				</div>
			</DrawerContent>
		</Drawer>
	</Fragment>);
}; 