import { copy } from "@/utils"


interface UesCopyProps {
	text: string,
	onSuccess?: () => void,
	onError?: (error: unknown) => void
}

export function useCopy({ text, onError, onSuccess }: UesCopyProps) {
	return async () => {
		try {
			await copy(text)
			onSuccess?.();
		} catch (error: unknown) {
			onError?.(error);
		}
	}
}


