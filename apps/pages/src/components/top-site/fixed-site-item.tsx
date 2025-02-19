import { Fragment, MouseEvent, useState, type FC } from "react";
import {
	cn,
	Space, Button,
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	useToast,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@repo/ui";

import { PinOff, Star, Ellipsis, Trash2 } from 'lucide-react'
import { Favicon } from "@/components";
import {
	useWebSiteStore, WebSite,
	useCopy,
	HistoryUrl
} from "@repo/shared";



import {
	SiteFormValues,
	SiteForm
} from "@/components/site";
import { EditSite } from "./";
import { bg_transparent, openTab } from "@/utils";



type FixedSiteIProps = {
	site: WebSite;
	onRemove: (params: HistoryUrl) => Promise<void>
};

export const FixedSiteItem: FC<FixedSiteIProps> = ({ site, onRemove }) => {
	const onSiteClick = () => {
		openTab({ url: site.url });
	};

	const { toast } = useToast()
	const { removeWebSite } = useWebSiteStore()
	const copy = useCopy({
		text: site.url,
		onSuccess: () => {
			toast({
				title: "Copied!",
				description: site.url
			})
		},
		onError: () => {
			toast({
				title: "Copy failed",
				variant: "destructive",
				description: site.url,
				action: <Button variant="outline" onClick={copy}>Try Again</Button>
			})
		}
	})



	const removeSite = async (e?: MouseEvent<HTMLButtonElement>) => {
		e?.stopPropagation()
		await onRemove({ url: site.url })
		removeWebSite(site.id)
	}


	const unfixedSite = (e?: MouseEvent<HTMLButtonElement>) => {
		e?.stopPropagation()
		removeWebSite(site.id)
	}
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
		<ContextMenu modal={false}>
			<ContextMenuTrigger asChild>
				<Space className={cn(bg_transparent, "h-24 p-2 flex flex-col items-center justify-center group/site rounded-md cursor-pointer transition-all")}
					onClick={onSiteClick}
				>
					<Space className="items-start">
						<span className="p-1 w-fit h-fit opacity-0 group-hover/site:opacity-100  bg-transparent">
							<Star size={16} />
						</span>
						<Favicon src={site.url} title={site.title} className="rounded-md" />


						<Popover>
							<PopoverTrigger onClick={(e) => { e.stopPropagation() }} >
								<Button className="p-1 w-fit h-fit bg-transparent text-inherit hover:bg-black/20"  >
									<Ellipsis size={16} className="opacity-0 group-hover/site:opacity-100 transition-all" />
								</Button>
							</PopoverTrigger>
							<PopoverContent onClick={(e) => { e.stopPropagation() }} className={cn(bg_transparent, "w-fit h-fit")}>
								<Space direction="col">
									<Button size={'icon'} onClick={unfixedSite}>
										<PinOff size={16} />
									</Button>
									<EditSite website={site} />

									<Button size={'icon'} onClick={removeSite}>
										<Trash2 size={16} />
									</Button>
								</Space>
							</PopoverContent>
						</Popover>
					</Space>
					<p title={`${site.title}-${site.url}`} className="max-w-[100%] transition-all group-site:text-light leading-7 group-hover/site:text-xl truncate">{site.title}</p>
				</Space>
			</ContextMenuTrigger>

			<ContextMenuContent className={cn(bg_transparent, "w-fit")}>
				<ContextMenuItem inset onSelect={() => setOpen(true)}>
					Edit website
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem inset onSelect={() => onSiteClick()}>
					Open website
				</ContextMenuItem>
				<ContextMenuItem inset onSelect={() => unfixedSite()}>
					Unfixed website
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem inset onSelect={() => copy()}>
					Copy website url
				</ContextMenuItem>
				<ContextMenuItem inset onSelect={() => removeSite()}>
					Remove
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="hidden">
				Edit website
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit website</DialogTitle>
				</DialogHeader>
				<SiteForm defaultValues={site} onSubmit={onSubmit} onCancel={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	</Fragment>);
};