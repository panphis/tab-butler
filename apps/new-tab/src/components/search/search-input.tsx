'use client'

import { Fragment, type FC } from 'react'
import {
	FormControl,
	FormItem,
	Input
} from '@repo/ui'

import { useHistory } from "@repo/shared";


type SearchInputProps = {
	field: {
		value: string
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	}
};

export const SearchInput: FC<SearchInputProps> = ({ field }) => {

	const history = useHistory('less', 20)
	console.log('history', history)

	return (<Fragment>
		<FormItem>
			<FormControl>
				<Input
					autoComplete='off'
					className={`bg-transparent placeholder:text-background/50 border-none text-center focus-visible:shadow-none focus-visible:ring-color-transparent focus-visible:ring-offset-0 focus-visible:ring-0 text-inherit`}
					placeholder='搜索'
					{...field}
				/>
			</FormControl>
		</FormItem></Fragment>);
};
export default SearchInput