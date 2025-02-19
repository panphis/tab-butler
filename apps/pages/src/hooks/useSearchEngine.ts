import { useMemo } from "react";

import { SearchEngine, } from "@/type";
import { useSearchEnginesStore } from "@/storage"

export const useSearchEngine = () => {
	const { searchEngines, currentEngine, createSearchEngine, deleteSearchEngine, updateSearchEngine, setCurrentEngine } = useSearchEnginesStore();
	const searchEnginesMap = useMemo(() => new Map<number, SearchEngine>(searchEngines.map(item => [item.id, item])), [searchEngines])

	return {
		searchEngines,
		currentEngine,
		searchEnginesMap,
		createSearchEngine,
		deleteSearchEngine,
		updateSearchEngine,
		setCurrentEngine
	}
}