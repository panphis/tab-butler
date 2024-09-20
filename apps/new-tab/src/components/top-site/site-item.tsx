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
} from "@repo/ui";

import { History, Pin } from 'lucide-react'
import { Favicon } from "@/components";
import { useWebSiteStore, useCopy } from "@repo/shared";

import { bg_transparent } from "@/utils";



type SiteItemProps = {
	site: chrome.topSites.MostVisitedURL
};

export const SiteItem: FC<SiteItemProps> = ({ site }) => {
	const onSiteClick = () => {
		chrome.tabs.create({ url: site.url });
	};

	const { toast } = useToast()

	const { createOrUpdateWebSite } = useWebSiteStore()

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
				<Space className={cn(bg_transparent, "h-24 p-2 flex flex-col items-center justify-center group/site rounded-md cursor-pointer  transition-all")}
					onClick={onSiteClick}
				>
					<Space>
						<span className="p-1 w-fit h-fit opacity-0 group-hover/site:opacity-100  bg-transparent">
							<History size={16} />
						</span>
						<Favicon src={site.url} title={site.title} className="rounded-md" />
						<Button asChild className="p-1 w-fit h-fit bg-transparent hover:bg-black/20" onClick={fixedSite}>
							<Pin size={16} className="text-light opacity-0 group-hover/site:opacity-100 transition-all" />
						</Button>
					</Space>
					<p className="max-w-[100%] transition-all group-site:text-light leading-7 group-hover/site:text-xl truncate">{site.title}</p>
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
			</ContextMenuContent>
		</ContextMenu>
	</Fragment>);
};