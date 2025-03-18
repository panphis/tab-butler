import { Fragment, useState } from "react";
import type { FC, MouseEvent } from "react";
import { SearchEngineFrom } from ".";
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui";
import { Edit } from 'lucide-react';
import { FormValues } from "./search-engine-from";
import { useSearchEngine } from "@/hooks";
import { SearchEngine } from "@/type";
import { useTranslation } from "react-i18next";



type EditSearchEngineProps = {
	engine: SearchEngine
};

export const EditSearchEngine: FC<EditSearchEngineProps> = ({ engine }) => {

	const { t } = useTranslation();
	const [open, setOpen] = useState<boolean>(false)
	const { updateSearchEngine } = useSearchEngine()
	const onSubmit = async (value: FormValues) => {
		const params = {
			...value,
			id: engine.id,
		}
		await updateSearchEngine(params)
		setOpen(false)
	};
	const onCancel = () => {
		setOpen(false)
	};
	const onEdit = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setOpen(true)
	}

	return (<Fragment>
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button onClick={onEdit} size={'sm'} className="gap-1">
					<Edit size={16} />
					{t('options.search_engine_edit.trigger')}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t('options.search_engine_edit.form_title')}</DialogTitle>
				</DialogHeader>
				<SearchEngineFrom defaultValues={engine} onSubmit={onSubmit} onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	</Fragment >);
};