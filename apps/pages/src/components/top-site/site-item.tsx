import { Fragment, MouseEvent, type FC } from "react";
import {
	cn,
	Space, Button,
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
	useToast,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@repo/ui";

import { History, Pin, Ellipsis, Trash2 } from 'lucide-react'
import { Favicon } from "@/components";
import { useWebSiteStore, useCopy } from "@repo/shared";

import { bg_transparent, openTab } from "@/utils";

import type { HistoryUrl, MostVisitedURL } from '@repo/shared';



type SiteItemProps = {
	site: MostVisitedURL,
	onRemove: (params: HistoryUrl) => Promise<void>
};

export const SiteItem: FC<SiteItemProps> = ({ site, onRemove }) => {
	const onSiteClick = () => {
		openTab({ url: site.url });
	};

	const { toast } = useToast()

	const { createOrUpdateWebSite } = useWebSiteStore()

	const removeSite = async (e?: MouseEvent<HTMLButtonElement>) => {
		e?.stopPropagation()
		await onRemove({ url: site.url })
	}

	const fixedSite = (e?: MouseEvent<HTMLButtonElement>) => {
		e?.stopPropagation()
		createOrUpdateWebSite({
			url: site.url,
			title: site.title,
			createdAt: new Date()
		})
	}

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



	return (<Fragment>
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<Space className={cn(bg_transparent, "h-24 p-2 flex flex-col items-center justify-center group/site rounded-md cursor-pointer transition-all")}
					onClick={onSiteClick}
				>
					<Space className="items-start">
						<span className="p-1 w-fit h-fit opacity-0 group-hover/site:opacity-100  bg-transparent">
							<History size={16} />
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

									<Button size={'icon'} onClick={fixedSite}>
										<Pin size={16} />
									</Button>
									<Button size={'icon'} onClick={removeSite}>
										<Trash2 size={16} />
									</Button>
								</Space>
							</PopoverContent>
						</Popover>
					</Space>
					<p title={`${site.title}-${site.url}`}
						className="max-w-[100%] transition-all group-site:text-light leading-7 group-hover/site:text-xl truncate">{site.title}</p>
				</Space>
			</ContextMenuTrigger>

			<ContextMenuContent className={cn(bg_transparent, "w-fit")}>
				<ContextMenuItem inset onSelect={() => onSiteClick()}>
					Open
				</ContextMenuItem>
				<ContextMenuItem inset onSelect={() => fixedSite()}>
					Fixed
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem inset onSelect={() => copy()}>
					Copy
				</ContextMenuItem>
				<ContextMenuItem inset onSelect={() => removeSite()}>
					Remove
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	</Fragment>);
};