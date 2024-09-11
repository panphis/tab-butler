import { type FC } from "react";


import { Upload } from "@/components";

import {
	Button,
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	Input
} from '@repo/ui'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useWallpaperStore } from "@repo/shared";




const schema = z.object({
	title: z.string(),
	files: z.instanceof(FileList).optional()
})

type FormType = z.infer<typeof schema>

export const WallpaperForm: FC = () => {

	const { createWallpaper } = useWallpaperStore()

	const form = useForm<FormType>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			files: undefined
		}
	})


	const onSubmit = (value: FormType) => {
		const { files, title } = value;
		if (!files) {
			return
		}
		const file = files[0]
		const name = title || file.name
		createWallpaper({ title: name, file })


	}


	return (


		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 items-start">
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => {
						return (<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
						)
					}}
				/>
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