'use client'

import { Fragment, type FC, useMemo } from 'react'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Space
} from '@repo/ui'
import { Search } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { searchEngines, searchEnginesMap } from '@/utils'
import { Favicon } from '@/components'

const schema = z.object({
	engine: z.string(),
	keyWords: z.string()
})

interface SelectedIconProps {
	value: string
}
const SelectedIcon = ({ value }: SelectedIconProps) => {
	const currentEngine = searchEnginesMap.get(value)!
	return (
		<Favicon
			className='w-4 h-4'
			src={currentEngine.url}
			title={currentEngine.title}
		/>
	)
}

export const SearchForm: FC = () => {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			engine: searchEngines[0].id,
			keyWords: ''
		}
	})

	function onSubmit(values: z.infer<typeof schema>) {
		console.log(values)
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
					text-primary
					shadow-[rgba(0,0,0,0.2)_0_0_10px] backdrop-blur-[10px] backdrop-saturate-150 overflow-hidden rounded-full
					hover:shadow-[rgba(255,255,255,0.2)_0_0_10px] hover:backdrop-blur-[20px] 
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
									<Select
										{...field}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger
												className={`
												bg-transparent border-none text-center
												focus:shadow-none focus:ring-color-transparent
												focus:ring-offset-0 focus:ring-0 text-inherit
												placeholder:text-inherit interactive:bg-transparent
											`}
											>
												<SelectValue asChild>
													<SelectedIcon value={field.value} />
												</SelectValue>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{searchEngines.map(item => (
												<SelectItem key={item.id} value={item.id}>
													<Space
														direction='row'
														className='flex-nowrap items-center'
														gap='2'
													>
														<Favicon
															className='w-4 h-4'
															src={item.url}
															title={item.title}
														/>
														{item.title}
													</Space>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)
						}}
					/>
					<FormField
						control={form.control}
						name='keyWords'
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
										<Input
											autoComplete='off'
											className={`bg-transparent placeholder:text-background/50 border-none text-center
														focus-visible:shadow-none focus-visible:ring-color-transparent
														focus-visible:ring-offset-0 focus-visible:ring-0 
													`}
											placeholder='搜索'
											{...field}
										/>
									</FormControl>
								</FormItem>
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
