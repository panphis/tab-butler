import React, { Fragment, type FC } from "react";
import { BookmarkTreeNode } from "@repo/shared";

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea,
	Space
} from "@repo/ui"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProps, useForm } from "react-hook-form"
import { z } from "zod"

type Props = {
	item: BookmarkTreeNode;
	onSubmit: (data: BookMarkFormValues | BookMarkDirFormValues) => void;
	onDelete: () => void;
	onCancel: () => void;
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

const buttonSize = 'sm'


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
				<Space className="justify-end">
					<Button type="button" size={buttonSize} variant={'destructive'} onClick={onDelete}>Delete</Button>
					<Button type="reset" size={buttonSize} variant={'secondary'} onClick={onCancel}>Cancel</Button>
					<Button type="submit" size={buttonSize}>Save</Button>
				</Space >
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


	async function onSubmit(values: BookMarkDirFormValues) {
		console.log('async function onSubmit BookMarkDirForm')
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
				<Space className="justify-end">
					<Button type="button" size={buttonSize} variant={'destructive'} onClick={onDelete}>Delete</Button>
					<Button type="reset" size={buttonSize} variant={'secondary'} onClick={onCancel}>Cancel</Button>
					<Button type="submit" size={buttonSize}>Save</Button>
				</Space >
			</form>
		</Form>
	</Fragment >);
};
