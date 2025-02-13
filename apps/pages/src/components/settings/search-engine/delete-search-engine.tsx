import { useState } from "react";
import type { FC, MouseEvent } from "react";
import {
	Button,
} from "@repo/ui";
import { FormValues } from "./search-engine-from";
import { SearchEngine } from "@repo/shared";

import { Trash2 } from "lucide-react";
import { useSearchEngine } from "@/hooks";



type DeleteSearchEngineProps = {
	engine: SearchEngine
	disabled: boolean
};

export const DeleteSearchEngine: FC<DeleteSearchEngineProps> = ({ engine, disabled }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const { deleteSearchEngine } = useSearchEngine()


	async function onDelete() {
		setLoading(true)
		await deleteSearchEngine(engine.id)
		setLoading(false)
	}

	return (
		<Button loading={loading} disabled={!!engine.selected || disabled} variant={'destructive'} onClick={onDelete} size={'sm'}>
			<Trash2 size={16} />
			Delete
		</Button>);
};