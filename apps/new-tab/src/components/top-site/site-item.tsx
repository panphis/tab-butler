import React, { Fragment, type FC } from "react";
import { Space } from "@repo/ui";

import { Favicon } from "@/components";


type SiteItemProps = {
	site: chrome.topSites.MostVisitedURL
};

export const SiteItem: FC<SiteItemProps> = ({ site }) => {
	const onSiteClick = () => {
		chrome.tabs.create({ url: site.url });
	};
	return (<Fragment>
		<Space className="h-24 p-2 flex flex-col items-center justify-center group/site drop-shadow-md hover:drop-shadow-xl rounded-md cursor-pointer shadow-[rgba(0,0,0,0.2)_0_0_10px] backdrop-blur-[4px] backdrop-saturate-150  hover:shadow-[rgba(255,255,255,0.5)_0_0_10px] hover:backdrop-blur-[16px] hover:text-background dark:hover:bg-background/50 dark:hover:text-foreground transition-all"
			onClick={onSiteClick}
		>
			<Favicon src={site.url} title={site.title} />
			<p className="max-w-[100%] transition-all background/80 group-site:text-background leading-7 group-hover/site:text-xl truncate">{site.title}</p>
		</Space>
	</Fragment>);
};
export default SiteItem