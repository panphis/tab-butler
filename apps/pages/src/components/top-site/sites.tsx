import { Fragment, type FC, useMemo } from "react";

import { SiteItem, FixedSiteItem } from "./";
import { CreateSite } from "./create-site";
import { useWebSiteStore } from "@/hooks";
import { useTopSites } from "@/hooks";
import { cn } from "@repo/ui";
import { bg_transparent } from "@/utils";
import { DndSite } from "./";
import { WebSite } from "@/type";


export const Sites: FC = () => {
	const { topSites, onRemove } = useTopSites();

	const { websites, reorderWebSite } = useWebSiteStore();

	const recentSites = useMemo(() => {
		return topSites.slice(0, 3);
	}, [topSites]);

	const onOrderChange = async (websites: WebSite[]) => {
		await reorderWebSite(websites);
	}


	return (<Fragment>
		<div className="container mx-auto px-4 mt-8 max-w-lg md:max-w-xl lg:max-w-3xl text-white grid grid-cols-5 gap-4">
			{/* {
				websites.map(site => <FixedSiteItem site={site} key={site.url} onRemove={onRemove} />)
			} */}
			{
				topSites.map((site) => <SiteItem site={site} key={site.url} onRemove={onRemove} />)
			}
		</div>

		<div
			className={cn(
				bg_transparent,
				"rounded-xl px-6 py-2 sticky bottom-4 backdrop-blur-[18px] hover:backdrop-blur-[36px] container mx-auto mt-auto mb-4 max-w-full w-fit flex items-center gap-4"
			)}>
			<DndSite websites={websites} onOrderChange={onOrderChange} />
			{/* {
				websites.map(site => <FixedSiteItem site={site} key={site.url} onRemove={onRemove} />)
			} */}
			{/* {
				recentSites.map(site => <SiteItem site={site} key={site.url} onRemove={onRemove} />)
			} */}
			<CreateSite />
		</div>
	</Fragment>);
};