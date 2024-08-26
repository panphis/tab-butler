import { useState, useEffect } from "react";


export const useHistory = (text: string, maxResults: number = 10) => {
	const [history, setHistory] = useState<chrome.history.HistoryItem[]>([]);
	const getHistory = async () => {
		console.log(text, maxResults)
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


