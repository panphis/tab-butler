export async function sendMessage(message: any) {
	return await chrome.runtime.sendMessage(message);
}