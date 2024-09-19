import React, { Fragment, MouseEvent, type FC } from "react";
import { Space, Button } from "@repo/ui";

import { PinOff, Star } from 'lucide-react'
import { Favicon } from "@/components";
import { useWebSiteStore, WebSite } from "@repo/shared";



type FixedSiteIProps = {
	site: WebSite
};

export const FixedSiteItem: FC<FixedSiteIProps> = ({ site }) => {
	const onSiteClick = () => {
		chrome.tabs.create({ url: site.url });
	};

	const { removeWebSite } = useWebSiteStore()

	const unfixedSite = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		removeWebSite(site.id)
	}



	return (<Fragment>
		<Space className="h-24 p-2 flex flex-col items-center justify-center group/site drop-shadow-md hover:drop-shadow-xl rounded-md cursor-pointer shadow-[rgba(0,0,0,0.2)_0_0_10px] backdrop-blur-[4px] backdrop-saturate-150 hover:shadow-[rgba(255,255,255,0.5)_0_0_10px] hover:backdrop-blur-[16px] bg-light/20 transition-all"
			onClick={onSiteClick}
		>
			<Space>
				<Star size={16} className="text-light opacity-0 group-hover/site:opacity-100 transition-all" />
				<Favicon src={site.url} title={site.title} className="rounded-md" />
				<Button asChild className="p-0 w-fit h-fit bg-transparent hover:bg-black/20" onClick={unfixedSite}>
					<PinOff size={16} className="text-light opacity-0 group-hover/site:opacity-100 transition-all" />
				</Button>
			</Space>
			<p className="max-w-[100%] transition-all group-site:text-light leading-7 group-hover/site:text-xl truncate">{site.title}</p>
		</Space>
	</Fragment>);
};