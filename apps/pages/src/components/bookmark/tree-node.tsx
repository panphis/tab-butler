import { useMemo, type FC } from "react";
import { Favicon } from "..";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@repo/ui";

type TreeNodeProps = {
	item: chrome.bookmarks.BookmarkTreeNode
};


const TreeNodeTrigger = ({ item }: TreeNodeProps) => {
	const { title, children, url } = item;
	const domain = useMemo(() => url ? new URL(url!).hostname : '', [url]);
	if (children) {
		return <div className={`block px-2 py-1 font-semibold text-lg`}>{title}</div>;
	}
	return (
		<a
			className={`flex flex-row gap-2 px-2 py-1`}
			target="_blank"
			rel="noopener noreferrer"
			href={url}
		>
			<Favicon src={url!} title={title} className="w-6 h-6" />
			<div className={`flex flex-col gap-y-1 text-base`}>
				<p className={`font-semibold`}>{title}</p>
				<p className={`font-light`}>{domain}</p>
			</div>
		</a>
	);
};


export const TreeNode: FC<TreeNodeProps> = ({ item }: TreeNodeProps) => {
	return <ContextMenu>
		<ContextMenuTrigger>
			<TreeNodeTrigger item={item} />
		</ContextMenuTrigger>
		<ContextMenuContent>
			<ContextMenuItem>Profile</ContextMenuItem>
			<ContextMenuItem>Billing</ContextMenuItem>
			<ContextMenuItem>Team</ContextMenuItem>
			<ContextMenuItem>Subscription</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>

};



