import { useMemo, type FC, useState, useRef, useEffect } from "react";
import { Favicon } from "..";
import {
	Dialog,
	DialogContent,
	DialogTrigger
} from "@repo/ui";
import type { BookmarkTreeNode, BookmarkChangesArg } from "@repo/shared";
import { BookMarkForm, BookMarkDirForm } from "./";



const TreeNodeTrigger = ({ item }: { item: BookmarkTreeNode }) => {
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

type TreeNodeProps = {
	item: BookmarkTreeNode,
	deleteBookmark: (id: string) => Promise<void>,
	updateBookmark: (id: string, changes: BookmarkChangesArg) => Promise<void>
};

export const TreeNode: FC<TreeNodeProps> = ({ item, updateBookmark, deleteBookmark }: TreeNodeProps) => {

	const [open, setOpen] = useState(false)
	const trigger = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		function openHandler(e: MouseEvent) {
			e.preventDefault()
			setOpen(true)
		}
		trigger.current?.addEventListener('contextmenu', openHandler)
		return () => {
			trigger.current?.removeEventListener('contextmenu', openHandler)
		}
	}, [])

	async function onSubmit(values: BookmarkChangesArg) {
		try {
			await updateBookmark(item.id, values)
		} catch (error) {
			console.error(error)
		}
		onCancel()
	}

	async function onDelete() {
		await deleteBookmark(item.id)
		onCancel()
	}

	function onCancel() {
		setOpen(false)
	}


	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div ref={trigger}>
					<TreeNodeTrigger item={item} />
				</div>
			</DialogTrigger>
			<DialogContent>
				{
					item.children && !item.url ? (
						<BookMarkDirForm item={item} onCancel={onCancel} onDelete={onDelete} onSubmit={onSubmit} />
					) : (<BookMarkForm item={item} onCancel={onCancel} onDelete={onDelete} onSubmit={onSubmit} />)
				}
			</DialogContent>
		</Dialog >
	)

};



