import React, { Fragment, type FC, useState } from "react";
import {
	Button,

	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui";
import { SiteForm, SiteFormValues, useWebSiteStore } from "@repo/shared"

import { Plus } from 'lucide-react';

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
				<Button onClick={() => setOpen(true)} variant="ghost" className="h-24 w-full flex flex-col items-center justify-center group/site drop-shadow-md hover:drop-shadow-xl rounded-md cursor-pointer shadow-[rgba(0,0,0,0.2)_0_0_10px] backdrop-blur-[4px] backdrop-saturate-150 hover:shadow-[rgba(255,255,255,0.5)_0_0_10px] hover:backdrop-blur-[16px] bg-light/20 hover:bg-light/40 transition-all" >
					<Plus size={32} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create website</DialogTitle>
				</DialogHeader>
				<SiteForm onSubmit={onSubmit} />
			</DialogContent>
		</Dialog>
	</Fragment>
	);
}; 