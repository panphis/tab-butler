

import { MostVisitedURL, HistoryUrl } from '@/type';
import { useEffect, useState } from 'react';

async function pollTopSites(previousSites: MostVisitedURL[], interval = 50, maxAttempts = 5) {
	let attempts = 0;

	while (attempts < maxAttempts) {
		attempts++;

		try {
			// 等待获取当前 topSites
			const currentSites = await chrome.topSites.get();

			// 如果是第一次执行，初始化 previousSites
			if (previousSites.length === 0) {
				previousSites = currentSites;
			} else {
				// 如果 topSites 发生变化，返回新的 topSites
				if (!arraysEqual(previousSites, currentSites)) {
					return currentSites;
				}
			}
		} catch (error) {
			throw error;
		}

		// 等待指定的时间间隔
		await new Promise(resolve => setTimeout(resolve, interval));
	}

	// 达到最大尝试次数，返回最后一次获取的 topSites
	console.log("Max attempts reached. Returning current topSites.");
	return await chrome.topSites.get()
}

// 辅助函数：比较两个数组是否相等
function arraysEqual(arr1: MostVisitedURL[], arr2: MostVisitedURL[]) {
	if (arr1.length !== arr2.length) { return false };
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i].title !== arr2[i].title || arr1[i].url !== arr2[i].url) {
			return false
		};
	}
	return true;
}


type UseTopSitesProps = {
	onRefresh?: () => Promise<void>;
};
type UseTopSitesReturn = {
	loading: boolean;
	topSites: MostVisitedURL[];
	onRefresh: () => Promise<void>;
	onRemove: (params: HistoryUrl) => Promise<void>;
};
export const useTopSites = (params?: UseTopSitesProps): UseTopSitesReturn => {
	const [topSites, setTopSites] = useState<MostVisitedURL[]>([]);
	const [loading, setLoading] = useState(false);
	const initTopSite = async () => {
		const sites = await getTopSites();
		setTopSites(sites);
	};

	const getTopSites = async () => {
		setLoading(true)
		const list = await chrome.topSites.get();
		setLoading(false)
		return list
	}

	useEffect(() => {
		initTopSite();
	}, []);

	async function handleRefresh() {
		await initTopSite();
		const onRefresh = params?.onRefresh;
		onRefresh?.();
	}

	async function handleRemove(params: HistoryUrl) {
		try {
			await chrome.history.deleteUrl(params);
			setLoading(true)
			const newList = await pollTopSites(topSites)
			setTopSites(newList)
			setLoading(false)

		} catch (error) {
			console.dir(error)
		}
	}



	return {
		loading,
		topSites,
		onRefresh: handleRefresh,
		onRemove: handleRemove,
	};
};


