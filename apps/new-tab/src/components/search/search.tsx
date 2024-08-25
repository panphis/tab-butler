'use client'

import { Fragment, type FC } from 'react'
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
import { searchEngines, searchEnginesMap } from '@/utils'

import { EngineSelect, SearchInput } from "./";

const schema = z.object({
	engine: z.string(),
	keyWords: z.string()
})



export const SearchForm: FC = () => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			engine: searchEngines[0].id,
			keyWords: ''
		}
	})

	function onSubmit(values: z.infer<typeof schema>) {
		const { engine, keyWords } = values
		const searchEngine = searchEnginesMap.get(engine)!
		const url = searchEngine.url + keyWords
		window.open(url)
	}

	return (


		<Fragment>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={`
					flex gap-2 items-center p-1 h-12
					w-max max-w-[80%]
					shadow-[rgba(0,0,0,0.2)_0_0_10px] backdrop-blur-[10px] backdrop-saturate-150 overflow-hidden rounded-full
					hover:shadow-[rgba(255,255,255,0.2)_0_0_10px] hover:backdrop-blur-[20px] 
					text-background/80
					hover:bg-foreground/50 hover:text-background
					dark:hover:bg-background/50 dark:hover:text-foreground
					transition-all
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
							text-background/80 hover:text-inherit
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
