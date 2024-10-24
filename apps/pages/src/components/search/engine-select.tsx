'use client'

import {
	cn,
	FormControl,
	FormItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Space
} from '@repo/ui'

import { useSearchEngine } from '@/hooks';
import { Favicon } from '@/components'
import { SelectedEngineIcon } from "./";


interface EngineSelectProps {
	field: {
		value: string
		onChange: (value: string) => void
	}
}
export const EngineSelect = ({ field }: EngineSelectProps) => {
	const { searchEngines } = useSearchEngine()
	return (
		<FormItem>
			<Select
				{...field}
				onValueChange={field.onChange}
				defaultValue={field.value}
			>
				<FormControl>
					<SelectTrigger
						className={cn(`bg-transparent border-none text-center focus:shadow-none focus:ring-color-transparent focus:ring-offset-0 focus:ring-0 text-inherit placeholder:text-inherit interactive:bg-transparent`)}
					>
						<SelectValue asChild>
							<SelectedEngineIcon />
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
}


