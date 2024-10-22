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

import {
	CreateWallpaperParams,
	Wallpaper
} from "@repo/shared";




const schema = z.object({
	title: z.string(),
	files: z.instanceof(FileList).optional()
})

type FormType = z.infer<typeof schema>



type WallpaperFormProps = {
	initValues?: {
		title?: string
		files?: FileList | undefined
	},
	onSubmit: (params: CreateWallpaperParams | Wallpaper) => Promise<void>
}
export const WallpaperForm: FC<WallpaperFormProps> = ({ initValues, onSubmit }) => {


	const form = useForm<FormType>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: initValues?.title || '',
			files: initValues?.files ?? undefined
		}
	})


	const handleSubmit = async (value: FormType) => {
		const { files, title } = value;
		if (!files) {
			return
		}
		const file = files[0]
		const name = title || file.name
		const params = {
			...initValues,
			title: name,
			file
		}
		await onSubmit(params)
		form.reset()
	}


	return (


		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2 items-start">
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => {
						return (<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field}
									placeholder="Wallpaper title"
								/>
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
								<Upload {...field}
									placeholder="Wallpaper file" />
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