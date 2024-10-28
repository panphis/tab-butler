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
import { SearchEngine } from "@repo/shared";



type EditSearchEngineProps = {
	engine: SearchEngine
};

export const EditSearchEngine: FC<EditSearchEngineProps> = ({ engine }) => {
	const [open, setOpen] = useState<boolean>(false)
	const { updateSearchEngine } = useSearchEngine()
	const onSubmit = async (value: FormValues) => {
		const params = {
			...value,
			id: engine.id,
		}
		updateSearchEngine(params)
	};
	const onCancel = () => {
		setOpen(false)
	};

	return (<Fragment>
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={'secondary'} onClick={() => setOpen(true)} size={'sm'}>
					<Plus />
					Edit Search Engine
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Search Engine</DialogTitle>
				</DialogHeader>
				<SearchEngineFrom defaultValues={engine} onSubmit={onSubmit} onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	</Fragment >);
};