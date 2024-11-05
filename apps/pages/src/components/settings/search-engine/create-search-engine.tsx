import { Fragment, useState, type FC } from "react";
import { SearchEngineFrom } from "./";
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



type CreateSearchEngineProps = {

};


export const CreateSearchEngine: FC<CreateSearchEngineProps> = ({ }) => {
	const [open, setOpen] = useState<boolean>(false)
	const { createSearchEngine } = useSearchEngine()
	const onSubmit = async (value: FormValues) => {
		createSearchEngine(value)
	};
	const onCancel = () => {
		setOpen(false)
	};

	return (<Fragment>
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setOpen(true)} size={'sm'}>
					<Plus />
					Create Search Engine
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Search Engine</DialogTitle>
				</DialogHeader>
				<SearchEngineFrom onSubmit={onSubmit} onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	</Fragment >);
};