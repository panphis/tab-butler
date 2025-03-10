import { useState } from "react";
import type { FC } from "react";
import { Button } from "@repo/ui";
import { SearchEngine } from "@/type";

import { Trash2 } from "lucide-react";
import { useSearchEngine } from "@/hooks";
import { useTranslation } from "react-i18next";



type DeleteSearchEngineProps = {
	engine: SearchEngine
	disabled: boolean
};

export const DeleteSearchEngine: FC<DeleteSearchEngineProps> = ({ engine, disabled }) => {

	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false)
	const { deleteSearchEngine } = useSearchEngine()


	async function onDelete() {
		setLoading(true)
		await deleteSearchEngine(engine.id)
		setLoading(false)
	}

	return (
		<Button loading={loading} disabled={!!engine.selected || disabled} variant={'destructive'} className="gap-1" onClick={onDelete} size={'sm'}>
			<Trash2 size={16} />
			{t('common.delete')}
		</Button>);
};