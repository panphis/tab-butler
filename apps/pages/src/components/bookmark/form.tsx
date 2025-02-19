import { Fragment, type FC } from "react";
import { BookmarkCreateArg, BookmarkTreeNode } from "@repo/shared";

import { FormFooter } from "@/components/button-group";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea
} from "@repo/ui"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

type Props = {
	item: BookmarkTreeNode | BookmarkCreateArg;
	onSubmit: (data: BookMarkFormValues | BookMarkDirFormValues) => void;
	onDelete?: () => void;
	onCancel?: () => void;
};


const bookMarkFormSchema = z.object({
	title: z.string().min(2, {
		message: "Title is required.",
	}),
	url: z.string().min(2, {
		message: "Url is required.",
	}),
})

type BookMarkFormValues = z.infer<typeof bookMarkFormSchema>



export const BookMarkForm: FC<Props> = ({ item, onSubmit: submit, onDelete, onCancel }) => {

	const form = useForm<BookMarkFormValues>({
		resolver: zodResolver(bookMarkFormSchema),
		defaultValues: {
			url: item.url,
			title: item.title,
		},
	})


	function onSubmit(values: BookMarkFormValues) {
		submit(values)
	}

	function handlerCancel() {
		form.reset();
		onCancel?.();
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
				<FormFooter onDelete={onDelete} onCancel={handlerCancel} />
			</form>
		</Form>
	</Fragment>);
};




const bookMarkDirFormSchema = z.object({
	title: z.string().min(2, {
		message: "Title is required.",
	})
})

type BookMarkDirFormValues = z.infer<typeof bookMarkDirFormSchema>

export const BookMarkDirForm: FC<Props> = ({ item, onSubmit: submit, onCancel, onDelete }) => {
	const form = useForm<BookMarkDirFormValues>({
		resolver: zodResolver(bookMarkDirFormSchema),
		defaultValues: {
			title: item.title,
		},
	})
	function handlerCancel() {
		form.reset();
		onCancel?.();
	}



	async function onSubmit(values: BookMarkDirFormValues) {
		submit(values)
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
				<FormFooter onDelete={onDelete} onCancel={handlerCancel} />
			</form>
		</Form>
	</Fragment >);
};
