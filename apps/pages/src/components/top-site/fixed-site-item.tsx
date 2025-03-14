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
	SiteFormValues,
	SiteForm
} from "@/components/site";
import { EditSite } from "./";
import { bg_transparent, openTab } from "@/utils";
import { HistoryUrl, WebSite } from "@/type";
import { useWebSiteStore } from "@/hooks";
import { useCopy } from "@/hooks";
import { useTranslation } from "react-i18next";




type FixedSiteIProps = {
	site: WebSite;
	onRemove: (params: HistoryUrl) => Promise<void>
};

export const FixedSiteItem: FC<FixedSiteIProps> = ({ site, onRemove }) => {
	const onSiteClick = () => {
		openTab({ url: site.url });
	};

	const { t } = useTranslation();
	const { toast } = useToast()
	const { removeWebSite } = useWebSiteStore()
	const copy = useCopy({
		text: site.url,
		onSuccess: () => {
			toast({
				title: t('common.copied'),
				description: site.url
			})
		},
		onError: () => {
			toast({
				title: t('common.copy_failed'),
				variant: "destructive",
				description: site.url,
				action: <Button variant="outline" onClick={copy}>{t('common.try_again')}</Button>
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
					{t('new_tab.edit')}
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem inset onSelect={() => onSiteClick()}>
					{t('new_tab.open')}
				</ContextMenuItem>
				<ContextMenuItem inset onSelect={() => unfixedSite()}>
					{t('new_tab.unfixed')}
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem inset onSelect={() => copy()}>
					{t('new_tab.copy')}
				</ContextMenuItem>
				<ContextMenuItem inset onSelect={() => removeSite()}>
					{t('new_tab.remove')}
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="hidden">
				{t('new_tab.edit_website')}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{t('new_tab.edit_website')}
					</DialogTitle>
				</DialogHeader>
				<SiteForm defaultValues={site} onSubmit={onSubmit} onCancel={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	</Fragment>);
};