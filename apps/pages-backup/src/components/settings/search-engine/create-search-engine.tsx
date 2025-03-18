import { Fragment, useState, type FC } from "react";
import { SearchEngineFrom } from ".";
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui";
import { Plus } from 'lucide-react';
import { FormValues } from "./search-engine-from";
import { useSearchEngine } from "@/hooks";
import { useTranslation } from "react-i18next";



type CreateSearchEngineProps = {

};


export const CreateSearchEngine: FC<CreateSearchEngineProps> = ({ }) => {
	const [open, setOpen] = useState<boolean>(false)
	const { createSearchEngine } = useSearchEngine()
	const onSubmit = async (value: FormValues) => {
		createSearchEngine(value)
	};
	const { t } = useTranslation();
	const onCancel = () => {
		setOpen(false)
	};

	return (<Fragment>
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setOpen(true)} size={'sm'} className="gap-1">
					<Plus />
					{t('options.search_engine_create.trigger')}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t('options.search_engine_create.form_title')}</DialogTitle>
				</DialogHeader>
				<SearchEngineFrom onSubmit={onSubmit} onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	</Fragment >);
};