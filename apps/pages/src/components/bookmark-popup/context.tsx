
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
import { useBookMarks } from "@/hooks";
import type { BookmarkTreeNode, Tab, BookmarkCreateArg } from "@/type";
import { MessageTypes } from "@repo/shared";
import { FormFooter } from "@/components";
import { sendMessage } from "@/utils";
import { useTranslation } from "react-i18next";

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

	const { t } = useTranslation()

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
		form.reset()
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
							<FormLabel>{t('bookmark_popup.site_bookmark_form.title')}</FormLabel>
							<FormControl>
								<Input
									placeholder={t('bookmark_popup.site_bookmark_form.title_placeholder')}
									{...field} />
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
							<FormLabel>{t('bookmark_popup.site_bookmark_form.url')}</FormLabel>
							<FormControl>
								<Textarea placeholder={t('bookmark_popup.site_bookmark_form.url_placeholder')} {...field} />
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
							<FormLabel>{t('bookmark_popup.site_bookmark_form.folder')}</FormLabel>
							<FormControl>
								<TreeSelect placeholder={t('bookmark_popup.site_bookmark_form.folder_placeholder')} loading={loading} treeData={treeData[0]?.children || []} {...field} />
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
