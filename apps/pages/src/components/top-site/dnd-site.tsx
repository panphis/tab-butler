import GridLayout from "../dnd/grid-layout";
import { useResponsiveSize } from "@/hooks";
import { WebSite } from "@/type";
import { FC, useMemo } from "react";


type DndSiteProps = {
	websites: WebSite[]
}

export const DndSite: FC<DndSiteProps> = ({ websites }) => {

	const { breakpoint } = useResponsiveSize();
	const columns = useMemo(() => {
		switch (breakpoint) {
			case '2xl':
				return 6;
			case 'xl':
				return 5;
			case 'lg':
				return 4;
			case 'md':
				return 3;
		}
	}, [breakpoint]);




	return (
		<GridLayout<WebSite>
			list={[]}
			columns={columns}
			className="w-full h-full p-4"
			node={(item) => {
				return (
					<a
						href={item.url}
						target="_blank"
					>
						<div className="w-full h-full min-h-16 shadow-md rounded-md flex items-center justify-center">
							<h1>{item.title}</h1>
						</div>
					</a>
				);
			}}
		/>
	);
};
