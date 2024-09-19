import React, { Fragment, type FC, useMemo } from "react";
import { useTopSites, useWebSiteStore } from "@repo/shared";

import { SiteItem, FixedSiteItem } from "./";

export const Sites: FC = () => {
	const topSites = useTopSites();

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
				websites.map(site => <FixedSiteItem site={site} key={site.id} />)
			}
			{
				list.map((site) => <SiteItem site={site} key={site.url} />)
			}
		</div>
	</Fragment>);
};