
import { Fragment, useMemo, type FC } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea,
	TreeSelect
} from "@repo/ui"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useBookMarks } from "@repo/shared";
import type { BookmarkTreeNode, Tab, BookmarkCreateArg } from "@repo/shared";
import { FormFooter } from "../bookmark";
import { sendMessage, MessageTypes } from "@/utils";


const bookMarkFormSchema = z.object({
	title: z.string().min(2, {
		message: "Title is required.",
	}),
	url: z.string().min(2, {
		message: "Url is required.",
	}),
	parentId: z.string().optional(),
})

type BookMarkFormValues = z.infer<typeof bookMarkFormSchema>


type ContextProps = {
	currentTab: BookmarkTreeNode | Tab
};
export const Context: FC<ContextProps> = ({ currentTab }) => {


	const isBookmarkTreeNode = (tab: BookmarkTreeNode | Tab): tab is BookmarkTreeNode => {
		return (tab as BookmarkTreeNode).parentId !== undefined;
	}

	const { tree, loading, createBookmark } = useBookMarks()
	const form = useForm<BookMarkFormValues>({
		resolver: zodResolver(bookMarkFormSchema),
		defaultValues: {
			url: currentTab.url,
			title: currentTab.title,
			parentId: isBookmarkTreeNode(currentTab) ? currentTab.parentId : undefined,
		},
	})



	const filterFolder = (list: BookmarkTreeNode[]): any[] => {
		// 过滤一下
		const result: any[] = list.reduce((pre, cur) => {
			if (!cur.url) {
				const children = filterFolder(cur?.children! || [])
				if (children) {
					pre.push({
						...cur,
						label: cur.title,
						key: cur.id,
						value: cur.id,
						children
					})
				}
				return pre
			} else {
				return pre
			}
		}, [] as any[])
		return result
	}


	const treeData = useMemo(() => {
		const result = filterFolder(tree)
		return result
	}, [tree])


	async function onSubmit(values: BookmarkCreateArg) {
		await createBookmark(values)
		await onCancel()
	}

	async function onCancel() {
		const payload = { method: MessageTypes.bookMarkClose }
		await sendMessage(payload)
	}


	return (<Fragment>
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="please input title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Url</FormLabel>
							<FormControl>
								<Textarea placeholder="please input url" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="parentId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Folder</FormLabel>
							<FormControl>
								<TreeSelect placeholder="please select folder" loading={loading} treeData={treeData[0]?.children || []} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormFooter loading={loading} onCancel={onCancel} />
			</form>
		</Form>
	</Fragment>);
};
