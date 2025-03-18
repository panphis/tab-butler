'use client'

import { Fragment, type FC, useEffect } from 'react'
import {
	Button,
	Form,
	FormField,
	FormItem,
	cn
} from '@repo/ui'
import { Search } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { openTab } from '@/utils'

import { EngineSelect, SearchInput } from ".";

import { useSearchEngine } from "@/hooks";

import { bg_transparent } from "@/utils";


const schema = z.object({
	engine: z.number(),
	keyWords: z.string()
})



export const SearchForm: FC = () => {
	const { searchEnginesMap, currentEngine, setCurrentEngine } = useSearchEngine()
	const { watch, ...form } = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			engine: currentEngine.id,
			keyWords: ''
		}
	})


	useEffect(() => {
		const subscription = watch((value) => {
			const engine = value?.engine!
			setCurrentEngine(engine)
		})
		return () => subscription.unsubscribe()
	}, [watch])




	function onSubmit(values: z.infer<typeof schema>) {
		const { engine, keyWords } = values
		if (!engine || !keyWords) {
			return;
		}
		const searchEngine = searchEnginesMap.get(engine)!
		const { url, args = '' } = searchEngine
		let result = `${url}${keyWords}`
		result += `${args.toString()}`
		// 去除末尾的 &
		result = result.replace(/&$/, '')
		openTab({ url: result });
	}

	return (
		<Fragment>
			<Form {...form} watch={watch}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn(bg_transparent, `flex gap-2 items-center p-1 h-12 w-max max-w-[80%] rounded-full hover:text-light dark:hover:bg-light/50`)}
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
							hover:text-inherit
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
