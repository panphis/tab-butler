import { useState, useEffect, useMemo } from "react";

import { useStorageSuspense, useSearchEngines, SearchEngine } from "@repo/shared";
import { engineStorage } from "@/storage";

export const useSearchEngine = () => {
	const { searchEngines, createSearchEngines, deleteSearchEngine, updateSearchEngine } = useSearchEngines();
	const searchEnginesMap = useMemo(() => new Map<string, SearchEngine>(searchEngines.map(item => [item.id, item])), [searchEngines])
	const currentEngineId = useStorageSuspense(engineStorage);
	const currentEngine = useMemo(() => searchEnginesMap.get(currentEngineId)!, [currentEngineId])

	return {
		searchEngines,
		currentEngine,
		searchEnginesMap,
	}
}