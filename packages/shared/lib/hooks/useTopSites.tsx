

import { useEffect, useState } from 'react';

export const useTopSites = () => {
	const [topSites, setTopSites] = useState<chrome.topSites.MostVisitedURL[]>([]);
	const initTopSite = async () => {
		const sites = await chrome.topSites.get();
		setTopSites(sites);
	};


	useEffect(() => {
		initTopSite();
	}, []);

	return topSites;
};


