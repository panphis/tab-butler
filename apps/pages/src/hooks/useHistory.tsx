import { HistoryItem } from "@/type";
import { useState, useEffect } from "react";


export const useHistory = (text: string, maxResults: number = 10) => {
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const getHistory = async () => {
		if (!text) {
			return setHistory([])
		}
		const history = await chrome.history.search({
			text: text,
			maxResults: maxResults,
		});
		setHistory(history);
	};
	useEffect(() => {
		getHistory();
	}, [text, maxResults]);


	return history

}


