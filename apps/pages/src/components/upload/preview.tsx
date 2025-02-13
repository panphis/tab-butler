import { memo, useMemo } from 'react';
import { AspectRatio, } from '@repo/ui';
import { getFileType } from '@/utils';
import { FileQuestion } from 'lucide-react';
import { Wallpaper } from '@repo/shared';


interface PreviewImageProps {
	wallpaper: Wallpaper
	title?: string
}
const PreviewWallpaperComponent = ({ wallpaper, title }: PreviewImageProps) => {
	const previewUrl = useMemo(() => URL.createObjectURL(wallpaper.file), [wallpaper.id]);
	const type = useMemo(() => getFileType(wallpaper.file), [wallpaper.id])
	const titleStr = useMemo(() => title || wallpaper.file.name, [wallpaper.id, title])
	const name = useMemo(() => wallpaper.file.name, [wallpaper.id])
	const previewDom = useMemo(() => {
		switch (type) {
			case 'picture':
				return <img className='max-w-full max-h-full' src={previewUrl} alt={name} title={titleStr} />
			case 'video':
				return <video className='max-w-full max-h-full' src={previewUrl} title={titleStr} autoPlay muted loop />
			default:
				return <div className='flex flex-col items-center justify-center w-full h-full'>
					<p className='text-lg font-medium'>Unsupported file type</p>
					<p className='text-base text-muted-foreground'><FileQuestion size={16} className='inline' />{name}</p>
				</div>
		}
	}, [previewUrl, type])

	return <AspectRatio ratio={16 / 9} className="bg-muted flex justify-center items-center" >
		{
			previewDom
		}
	</AspectRatio>
}

export const PreviewWallpaper = memo(PreviewWallpaperComponent, (prevProps, nextProps) => {
	return prevProps.wallpaper.file === nextProps.wallpaper.file || prevProps.title === nextProps.title
})