import { useMemo } from "react";

import { useStorageSuspense, SearchEngine, useSearchEnginesStore } from "@repo/shared";
import { engineStorage } from "@/storage";

export const useSearchEngine = () => {
	// todo
	// createSearchEngine deleteSearchEngine updateSearchEngine 之后如何通知所有页面刷新 searchEngines
	const { searchEngines, createSearchEngine, deleteSearchEngine, updateSearchEngine } = useSearchEnginesStore();
	const searchEnginesMap = useMemo(() => new Map<string, SearchEngine>(searchEngines.map(item => [item.id + '', item])), [searchEngines])
	const currentEngineId = useStorageSuspense(engineStorage);
	const currentEngine = useMemo(() => {
		return searchEnginesMap.get(currentEngineId)!
	}, [currentEngineId, searchEnginesMap])

	return {
		searchEngines: searchEngines,
		currentEngine,
		searchEnginesMap,
		createSearchEngine,
		deleteSearchEngine,
		updateSearchEngine
	}
}