import GridLayout from "../dnd/grid-layout";
import { useResponsiveSize } from "@/hooks";
import { useMemo } from "react";


type ListItem = {
	id: number;
	name: string;
	url: string;
	width: number;
	height: number;
};

const list: ListItem[] = [
	{
		id: 1,
		name: 'Item 1',
		width: 1,
		height: 1,
		url: 'https://google.com'
	},
	{
		id: 2,
		name: 'Item 2',
		width: 2,
		height: 2,
		url: 'https://google.com'
	},
	{
		id: 3,
		name: 'Item 3',
		width: 1,
		height: 1,
		url: 'https://google.com'
	},
	{
		id: 4,
		name: 'Item 4',
		width: 1,
		height: 1,
		url: 'https://google.com'
	},
	{
		id: 5,
		name: 'Item 5',
		width: 1,
		height: 1,
		url: 'https://google.com'
	},
	{
		id: 6,
		name: 'Item 6',
		width: 1,
		height: 1,
		url: 'https://google.com'
	},
	{
		id: 7,
		name: 'Item 7',
		width: 1,
		height: 1,
		url: 'https://google.com'
	},
	{
		id: 8,
		name: 'Item 8',
		width: 1,
		height: 1,
		url: 'https://google.com'
	},
];


export const Sites = () => {

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
		<GridLayout<ListItem>
			list={list}
			columns={columns}
			className="w-full h-full p-4"
			node={(item) => {
				return (
					<a
						href={item.url}
						target="_blank"
					>
						<div className="w-full h-full min-h-16 shadow-md rounded-md flex items-center justify-center">
							<h1>{item.name}</h1>
						</div>
					</a>
				);
			}}
		/>
	);
};
