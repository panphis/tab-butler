import { useMemo } from 'react';
import { AspectRatio, } from '@repo/ui';
import { getFileType } from '@/utils';
import { FileQuestion } from 'lucide-react';


interface PreviewImageProps {
	file: File,
	title?: string
}
export const PreviewWallpaper = ({ file, title }: PreviewImageProps) => {
	const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);
	const type = useMemo(() => getFileType(file), [file])

	const previewDom = useMemo(() => {
		switch (type) {
			case 'picture':
				return <img className='max-w-full max-h-full' src={previewUrl} alt={file.name} title={title || file.name} />
			case 'video':
				return <video className='max-w-full max-h-full' src={previewUrl} title={title || file.name} autoPlay muted loop />
			default:
				return <div className='flex flex-col items-center justify-center w-full h-full'>
					<p className='text-lg font-medium'>Unsupported file type</p>
					<p className='text-base text-muted-foreground'><FileQuestion size={16} className='inline' />{file.name}</p>
				</div>
		}
	}, [previewUrl, type])

	return <AspectRatio ratio={16 / 9} className="bg-muted flex justify-center items-center" >
		{
			previewDom
		}
	</AspectRatio>
}

