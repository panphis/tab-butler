import { useEffect, useMemo } from "react";

import { useStorageSuspense, searchEnginesStore, SearchEngine } from "@repo/shared";
import { engineStorage } from "@/storage";

export const useSearchEngine = () => {
	// todo
	// createSearchEngine deleteSearchEngine updateSearchEngine 之后如何通知所有页面刷新 searchEngines
	const { searchEngines, createSearchEngine, deleteSearchEngine, updateSearchEngine } = searchEnginesStore.getState();
	console.log('useSearchEngine', searchEngines)
	const searchEnginesMap = useMemo(() => new Map<string, SearchEngine>(searchEngines.map(item => [item.id + '', item])), [searchEngines])
	const currentEngineId = useStorageSuspense(engineStorage);
	const currentEngine = useMemo(() => {
		return searchEnginesMap.get(currentEngineId)!
	}, [currentEngineId])


	return {
		searchEngines,
		currentEngine,
		searchEnginesMap,
		createSearchEngine,
		deleteSearchEngine,
		updateSearchEngine
	}
}