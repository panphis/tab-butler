import { Fragment, type FC, useMemo } from "react";

import { SiteItem, FixedSiteItem } from "./";
import { CreateSite } from "./create-site";
import { useWebSiteStore } from "@/hooks";
import { useTopSites } from "@/hooks";


export const Sites: FC = () => {
	const { topSites, onRemove } = useTopSites();

	const { websites } = useWebSiteStore()

	const list = useMemo(() => {
		const websitesUrls: Set<string> = websites.reduce((pre, cur) => {
			pre.add(cur.url)
			return pre
		}, new Set<string>())
		const list = topSites.filter(item => !websitesUrls.has(item.url))
		return list
	}, [websites, topSites])

	return (<Fragment>
		<div className="container mx-auto px-4 mt-8 max-w-lg md:max-w-xl lg:max-w-3xl text-white grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{
				websites.map(site => <FixedSiteItem site={site} key={site.id} onRemove={onRemove} />)
			}
			{
				list.map((site) => <SiteItem site={site} key={site.url} onRemove={onRemove} />)
			}
			<CreateSite />
		</div>
	</Fragment>);
};