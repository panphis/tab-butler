import { type FC } from "react";


import { Upload } from "@/components";

import {
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
	FormFooter,
	Wallpaper
} from "@repo/shared";

import { createWallpaper } from "@/utils";




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
	onCancel?: () => Promise<void> | void
}
export const WallpaperForm: FC<WallpaperFormProps> = ({ initValues, onSubmit, onCancel }) => {


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
		createWallpaper({
			file,
			callback: async (wallpaper) => {
				const { type, width, height } = wallpaper
				const poster = wallpaper.poster as Wallpaper['poster']
				const params = {
					...initValues,
					type,
					poster,
					title: name,
					file,
					width, height
				}
				await onSubmit(params)
				form.reset()
			}
		})
	}

	function handlerCancel() {
		form.reset()
		onCancel?.()
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
							<FormLabel>File</FormLabel>
							<FormControl>
								<Upload {...field}
									placeholder="Wallpaper file" />
							</FormControl>
						</FormItem>
						)
					}}
				/>
				<FormFooter onCancel={handlerCancel} />
			</form>
		</Form>
	);
};