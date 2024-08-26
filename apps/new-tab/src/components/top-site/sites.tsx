import React, { Fragment, type FC } from "react";
import { useTopSites } from "@repo/shared";

import { SiteItem } from "./";

export const Sites: FC = () => {

	const topSites = useTopSites();
	console.log('topSites', topSites);
	return (<Fragment>
		<div className="container mx-auto px-4 mt-8 max-w-lg md:max-w-xl lg:max-w-3xl text-white grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{
				topSites.map((site) => <SiteItem site={site} key={site.url} />)
			}
		</div>
	</Fragment>);
};