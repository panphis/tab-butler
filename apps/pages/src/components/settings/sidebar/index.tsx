import { Fragment, useEffect, useMemo, useState } from "react";
import { buttonVariants, cn } from "@repo/ui";
import type { FC, HTMLAttributes } from "react";
import { AnchorIds } from "..";


type SidebarItem = { title: string; anchor: string; children?: SidebarItem[] };
const sidebarNavItems: SidebarItem[] = [
	{
		title: "Appearance",
		anchor: AnchorIds.appearance,
		children: [
			{
				title: "Theme",
				anchor: AnchorIds.theme,
			},
			{
				title: "Color",
				anchor: AnchorIds.color,
			},
			{
				title: "Radius",
				anchor: AnchorIds.radius
			},
			{
				title: "Wallpaper",
				anchor: AnchorIds.wallpaper
			},
		]
	},
	{
		title: "Search Engine",
		anchor: AnchorIds.searchEngine,
	},
]

type SidebarItemProps = {
	item: SidebarItem;
	hash: string
}
const SidebarItem: FC<SidebarItemProps> = ({ item, hash }) => {

	if (item.children) {
		return <Fragment>
			<a
				key={item.anchor}
				href={`#${item.anchor}`}
				className={cn(
					buttonVariants({ variant: "ghost" }),
					hash === `#${item.anchor}`
						? "bg-muted hover:bg-muted"
						: "hover:bg-transparent hover:underline",
					"justify-start"
				)}
			>
				{item.title}
			</a>
			<ul className="list-none ml-8">
				{
					item.children.map((child) => (
						<li key={child.anchor} >
							<SidebarItem item={child} hash={hash} />
						</li>
					))
				}
			</ul>
		</Fragment>

	}

	return <Fragment>
		<a
			key={item.anchor}
			href={`#${item.anchor}`}
			className={cn(
				buttonVariants({ variant: "ghost" }),
				hash === `#${item.anchor}`
					? "bg-muted hover:bg-muted"
					: "hover:bg-transparent hover:underline",
				"justify-start"
			)}
		>
			{item.title}
		</a>
	</Fragment>
}

interface SideBarProps extends HTMLAttributes<HTMLElement> { }
export const Sidebar: FC<SideBarProps> = ({ className, ...props }) => {
	const [hash, setHash] = useState(window.location.hash);
	useEffect(() => {
		const handleHashChange = () => {
			setHash(window.location.hash);
		};
		// 添加事件监听器
		window.addEventListener('hashchange', handleHashChange);
		// 清理函数，移除事件监听器
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	}, []);

	return (<Fragment>
		<nav
			className={cn(
				"flex lg:flex-col sticky top-0 max-h-full overflow-auto lg:overflow-hidden",
				className
			)}
			{...props}
		>
			{sidebarNavItems.map((item) => (
				<SidebarItem key={item.anchor} item={item} hash={hash} />
			))}
		</nav>
	</Fragment>);
}; 