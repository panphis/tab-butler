'use client'

import { Fragment, type FC, useMemo } from 'react'
import {
	FormControl,
	FormItem,
	Input,
} from '@repo/ui'

import { useHistory, useBookMarks } from "@repo/shared";

import { History, Bookmark } from 'lucide-react'



type SearchInputProps = {
	field: {
		value: string
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	}
};

export const SearchInput: FC<SearchInputProps> = ({ field }) => {

	const history = useHistory(field.value, 20).slice(0, 5)
	const bookMarks = useBookMarks(field.value).slice(0, 5)
	console.log('bookMarks', bookMarks)
	console.log('history', history)
	const open = useMemo(() => {
		return history.length > 0 || bookMarks.length > 0
	}, [history, bookMarks])

	return (<div>

		<FormItem>
			<FormControl>
				<Input
					autoComplete='off'
					className={`bg-transparent placeholder:text-background/50 border-none text-center focus-visible:shadow-none focus-visible:ring-color-transparent focus-visible:ring-offset-0 focus-visible:ring-0 text-inherit`}
					placeholder='搜索'
					{...field}
				/>
			</FormControl>
		</FormItem>
		{
			bookMarks.length > 0 && <Fragment>
				{
					bookMarks.map((bookMark) => {
						return <p key={bookMark.id}>
							{bookMark.title}
						</p>
					})
				}
			</Fragment>
		}
		{
			history.length > 0 && <Fragment>
				{
					history.map((item) => {
						return <p key={item.id}>
							{item.title}
						</p>
					})
				}
			</Fragment>
		}
	</div >);
};
export default SearchInput