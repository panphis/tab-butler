import { Fragment, type FC, useState } from "react";
import {
	Button,
	cn,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui"; 
import { SiteForm, SiteFormValues, } from "@/components/site";

import { Plus } from 'lucide-react';
import { bg_transparent } from "@/utils";
import { useWebSiteStore } from "@/storage";


type CreateSiteProps = {

};

export const CreateSite: FC<CreateSiteProps> = ({ }) => {

	const [open, setOpen] = useState<boolean>(false)

	const { createOrUpdateWebSite } = useWebSiteStore()
	async function onSubmit(data: SiteFormValues) {
		const params = {
			url: data.url,
			title: data.title,
			createdAt: new Date()
		}
		await createOrUpdateWebSite(params)
		setOpen(false)
	}

	return (<Fragment>

		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setOpen(true)} variant="ghost" className={cn(bg_transparent, "h-24 w-full flex flex-col items-center justify-center group/site rounded-md cursor-pointer")} >
					<Plus size={32} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create website</DialogTitle>
				</DialogHeader>
				<SiteForm onSubmit={onSubmit} onCancel={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	</Fragment>
	);
}; 