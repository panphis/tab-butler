import GridLayout from "../dnd/grid-layout";
import { useResponsiveSize, useTopSites } from "@/hooks";
import { WebSite } from "@/type";
import { FC, useMemo } from "react";
import { FixedSiteItem } from "./fixed-site-item";


type DndSiteProps = {
	websites: WebSite[]
	onOrderChange: (websites: WebSite[]) => void
}

export const DndSite: FC<DndSiteProps> = ({ websites, onOrderChange }) => {

	const { breakpoint } = useResponsiveSize();

	const { onRemove } = useTopSites();
	const columns = useMemo(() => {
		switch (breakpoint) {
			case '2xl':
				return 8;
			case 'xl':
				return 6;
			case 'lg':
				return 4;
			case 'md':
				return 4;
			case 'sm':
				return 3;
			default:
				return 6;
		}
	}, [breakpoint]);

	if (websites.length === 0) {
		return <></>
	}


	return (
		<GridLayout<WebSite>
			list={websites}
			columns={Math.min(columns, websites.length)}
			className="w-full h-full"
			onOrderChange={onOrderChange}
			node={(site) => {
				return (<FixedSiteItem site={site} key={site.url} onRemove={onRemove} />);
			}}
		/>
	);
};
