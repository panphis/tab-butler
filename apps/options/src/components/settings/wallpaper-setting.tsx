import React, { Fragment, type FC } from "react";


import { Upload } from "@/components";

import {
	Button,
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel
} from '@repo/ui'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const schema = z.object({
	files: z.instanceof(FileList).optional()
})

type FormType = z.infer<typeof schema>

export const WallpaperSetting: FC = () => {

	const form = useForm<FormType>({
		resolver: zodResolver(schema),
		defaultValues: {
			files: undefined,
		}
	})


	const onSubmit = (value: FormType) => {
		const { files } = value;
		if (!files) {
			return
		}
		const file = files[0]
		console.log(file)
		// ! it seems that chrome downloads can only download to system downloads folder can't download to path that relates to the extension folder
		//// need some way to store the file for wallpaper
		// chrome.downloads.download({
		// 	url: URL.createObjectURL(files[0]),
		// 	filename: files[0].name,
		// })
	}


	return (


		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='files'
					render={({ field }) => {
						return (<FormItem>
							<FormLabel>Wallpaper</FormLabel>
							<FormControl>
								<Upload {...field} />
							</FormControl>
						</FormItem>
						)
					}}
				/>
				<Button>Save</Button>
			</form>
		</Form>
	);
};