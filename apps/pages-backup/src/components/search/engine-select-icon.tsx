
import { Favicon } from '@/components'
import { useSearchEngine } from "@/hooks";


export const SelectedEngineIcon = () => {
	const { currentEngine } = useSearchEngine()
	return (
		<Favicon
			className='w-4 h-4'
			src={currentEngine?.url}
			title={currentEngine?.title}
		/>
	)
}