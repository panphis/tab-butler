
import { Favicon } from '@/components'

import { searchEnginesMap } from '@/utils'

interface SelectedEngineIconProps {
	value: string
}
export const SelectedEngineIcon = ({ value }: SelectedEngineIconProps) => {
	const currentEngine = searchEnginesMap.get(value)!
	return (
		<Favicon
			className='w-4 h-4'
			src={currentEngine.url}
			title={currentEngine.title}
		/>
	)
}