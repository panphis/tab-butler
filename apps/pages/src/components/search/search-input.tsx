'use client'

import { Fragment, type FC, useState, useEffect } from 'react'
import {
	FormControl,
	FormItem,
	Input,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipPortal,
	Label,
	Space,
	Separator,
	Button,
	ScrollArea
} from '@repo/ui'

import { useHistory, useBookMarkQuery } from "@repo/shared";

import { History, Bookmark } from 'lucide-react'
import type { BookmarkTreeNode, HistoryItem } from '@repo/shared';
import { openTab } from '@/utils';



type SearchInputProps = {
	field: {
		value: string
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	}
};

interface HistoryProps {
	history: HistoryItem[]
}
const HistoryList = ({ history }: HistoryProps) => {
	const onClick = (history: HistoryItem) => {
		openTab({ url: history.url });
	};
	return history.length > 0 && (<Space direction='col' gap={0}>
		<Label className='my-2 px-2 text-inherit'>History</Label>
		<Separator />
		<Fragment>
			{
				history.map((item) => {
					return <Button
						variant="link"
						className='max-w-[100%] text-inherit truncate w-80 flex gap-2 flex-row justify-start items-center'
						title={`${item.title}-${item.url}`}
						key={item.id}
						onClick={() => onClick(item)}
					>
						<History className="h-4 w-4 flex-shrink-0" />
						<span>{item.title}</span>
					</Button>
				})
			}
		</Fragment>
	</Space>
	)
}



interface BookMarkProps {
	bookMarks: BookmarkTreeNode[]
}
const BookMarkList = ({ bookMarks }: BookMarkProps) => {
	const onClick = (bookMark: HistoryItem) => {
		openTab({ url: bookMark.url });
	};
	return bookMarks.length > 0 && <Fragment>
		<Space direction='col' gap={0}>
			<Label className='my-2 px-2 text-inherit'>BookMark</Label>
			<Separator />
			<Fragment>
				{
					bookMarks.map((item) => {
						return <Button
							variant="link"
							className='max-w-[100%] w-80 flex gap-2 flex-row justify-start items-center truncate text-inherit'
							key={item.id}
							title={`${item.title}-${item.url}`}
							onClick={() => onClick(item)}
						>
							<Bookmark className="h-4 w-4 flex-shrink-0" />
							<span>{item.title}</span>
						</Button>
					})
				}
			</Fragment>
		</Space>
	</Fragment>
}




export const SearchInput: FC<SearchInputProps> = ({ field }) => {

	const history = useHistory(field.value, 10)
	const bookMarks = useBookMarkQuery(field.value, 10)
	const [open, setOpen] = useState<boolean>(false)


	useEffect(() => {
		setOpen(history.length > 0 || bookMarks.length > 0)
	}, [history, bookMarks])



	return (<div>
		<Tooltip open={open} delayDuration={100}>
			<TooltipTrigger asChild>
				<FormItem>
					<FormControl>
						<Input
							autoComplete='off'
							className={`bg-transparent placeholder:text-inherit border-none text-center focus-visible:shadow-none focus-visible:ring-color-transparent focus-visible:ring-offset-0 focus-visible:ring-0 text-inherit`}
							placeholder='Search'
							{...field}
						/>
					</FormControl>
				</FormItem>
			</TooltipTrigger>
			<TooltipPortal>
				<TooltipContent onEscapeKeyDown={() => setOpen(false)} side='bottom' className='px-0 border-none bg-transparent text-light/80 shadow-[rgba(0,0,0,0.2)_0_0_10px] backdrop-blur-[10px] backdrop-saturate-150 hover:shadow-[rgba(255,255,255,0.2)_0_0_10px] hover:backdrop-blur-[20px] hover:bg-dark/50 hover:text-light dark:hover:bg-light/50 dark:hover:text-light transition-all
				'>
					<ScrollArea className="h-56">
						<BookMarkList bookMarks={bookMarks} />
						<HistoryList history={history} />
					</ScrollArea>
				</TooltipContent>
			</TooltipPortal>
		</Tooltip>
	</div >);
};
export default SearchInput