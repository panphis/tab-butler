
import { Fragment, type FC } from "react";
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
	TreeSelect
} from "@repo/ui"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { BookmarkCreateArg } from "@repo/shared";
import { FormFooter } from "../bookmark";



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

};
export const Context: FC<ContextProps> = () => {

	const form = useForm<BookMarkFormValues>({
		resolver: zodResolver(bookMarkFormSchema),
		defaultValues: {
			url: '',
			title: '',
			parentId: undefined,
		},
	})


	function onSubmit(values: BookmarkCreateArg) {
		console.log(values)
	}

	function onCancel() {
		console.log('cancel')
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
				<FormFooter onCancel={onCancel} />
			</form>
		</Form>
	</Fragment>);
};
