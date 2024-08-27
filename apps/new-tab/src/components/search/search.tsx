'use client'

import { Fragment, type FC, useEffect } from 'react'
import {
	Button,
	Form,
	FormField,
	FormItem
} from '@repo/ui'
import { Search } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { searchEnginesMap } from '@/utils'

import { EngineSelect, SearchInput } from "./";

import { useStorageSuspense } from '@repo/shared';
import { engineStorage } from "@/storage";


const schema = z.object({
	engine: z.string(),
	keyWords: z.string()
})



export const SearchForm: FC = () => {
	const engine = useStorageSuspense(engineStorage);
	const { watch, ...form } = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			engine: engine,
			keyWords: ''
		}
	})


	useEffect(() => {
		const subscription = watch((value) => {
			const engine = value?.engine!
			engineStorage.setEngine(engine)
		})
		return () => subscription.unsubscribe()
	}, [watch])




	function onSubmit(values: z.infer<typeof schema>) {
		const { engine, keyWords } = values
		const searchEngine = searchEnginesMap.get(engine)!
		const url = searchEngine.url + keyWords
		window.open(url)
	}

	return (
		<Fragment>
			<Form {...form} watch={watch}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={`
					flex gap-2 items-center p-1 h-12 w-max max-w-[80%] rounded-full shadow-[rgba(0,0,0,0.2)_0_0_10px] backdrop-blur-[10px] backdrop-saturate-150 hover:shadow-[rgba(255,255,255,0.2)_0_0_10px] hover:backdrop-blur-[20px] text-light/80 hover:bg-dark/50 hover:text-light dark:hover:bg-light/50 dark:hover:text-light transition-all
				`}
				>
					<FormField
						control={form.control}
						name='engine'
						render={({ field }) => {
							return (
								<FormItem>
									<EngineSelect field={field} />
								</FormItem>
							)
						}}
					/>
					<FormField
						control={form.control}
						name='keyWords'
						render={({ field }) => {
							return (
								<SearchInput field={field} />
							)
						}}
					/>
					<Button
						className={`
							bg-transparent rounded-full hover:shadow-[rgba(255,255,255,0.2)_0_0_10px]
							hover:backdrop-blur-[10px] hover:bg-transparent
							text-light/80 hover:text-inherit
						`}
						variant='ghost'
						size='icon'
						type='submit'
					>
						<Search className='w-4 h-4' />
					</Button>
				</form>
			</Form>
		</Fragment>
	)
}
