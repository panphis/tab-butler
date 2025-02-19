import React, { Fragment, type FC, useState } from "react";
import {
	Button,

	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui";
import { useWebSiteStore, WebSite } from "@repo/shared"


import {
	SiteFormValues,
	SiteForm
} from "@/components/site";

import { Pencil } from 'lucide-react';

type EditSiteProps = {
	website: WebSite
};

export const EditSite: FC<EditSiteProps> = ({ website }) => {

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
			<DialogTrigger>
				<Button onClick={() => setOpen(true)} size={"icon"}>
					<Pencil size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent >
				<DialogHeader>
					<DialogTitle>Edit website</DialogTitle>
				</DialogHeader>
				<SiteForm defaultValues={website} onSubmit={onSubmit} onCancel={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	</Fragment>
	);
}; 