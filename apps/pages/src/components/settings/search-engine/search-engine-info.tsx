import { SearchEngine } from "@repo/shared";
import { Button, Space } from "@repo/ui";
import { Fragment, type FC } from "react";
import { Favicon } from "@/components";
import { Check } from "lucide-react";
import { useSearchEngine } from "@/hooks";

type SearchEngineInfoProps = {
	engine: SearchEngine,
	selected: boolean
};

export const SearchEngineInfo: FC<SearchEngineInfoProps> = ({ engine, selected }) => {
	const { setCurrentEngine } = useSearchEngine()


	function onSelectEngine() {
		setCurrentEngine(engine.id)
	}

	return (<Fragment>
		<Button variant="ghost" className="flex-1 p-0" onClick={onSelectEngine}>
			<Space className="items-center gap-4 w-full">
				<div className="w-6 h-6 flex items-center justify-center">
					{selected && <Check size={16} className="text-primary" />}
				</div>
				<Favicon className="w-4 h-4" src={engine.url} title={engine.title} />
				<p>
					{engine.title}
				</p>
				<span>
					<code>{engine.url}</code>
				</span>
			</Space>
		</Button>
	</Fragment>);
}; 