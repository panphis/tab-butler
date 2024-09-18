import { useMemo } from "react";


import { Wallpaper, formatFileSize } from "@repo/shared";
import {
	AspectRatio,
	Separator,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Space,
	cn,
} from "@repo/ui";

import { useWallpaperStore, IconStar } from "@repo/shared";




const FileSize = ({ size }: { size: number }) => {
	const sizeStr = formatFileSize(size)
	return <span className="text-xs text-muted-foreground">
		{sizeStr}
	</span>
}


interface WallpaperItemProps {
	wallpaper: Wallpaper
}

export const WallpaperItem = ({ wallpaper }: WallpaperItemProps) => {

	const previewUrl = useMemo(() => {
		const url = URL.createObjectURL(wallpaper.file)
		return url
	}, [wallpaper.file])

	const isSelectCurrent = useMemo(() => {
		return wallpaper.selected
	}, [wallpaper.selected])


	const { removeWallpaper } = useWallpaperStore()

	const { setCurrentWallpaper } = useWallpaperStore()
	const onSelect = () => {
		setCurrentWallpaper(wallpaper.id)
	}



	return <Card className={cn("w-[380px] overflow-hidden", isSelectCurrent && `border-primary shadow-2xl shadow-primary`)} onClick={onSelect} >
		<CardHeader className="p-2 relative overflow-hidden">
			<CardTitle>
				{wallpaper.title}
				{
					isSelectCurrent &&
					<div
						className={`absolute p-1 flex justify-end items-start right-0 top-0 w-8 h-8 bg-primary  text-primary-foreground`}
						style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}>
						<IconStar size={'0.8rem'} />
					</div>
				}
			</CardTitle>
			<CardDescription className="flex justify-between">
				<span>
					{wallpaper.file.name}
				</span>
				<FileSize size={wallpaper.file.size} />
			</CardDescription>
		</CardHeader>
		<Separator />
		<CardContent className="p-0">
			<AspectRatio ratio={16 / 9} className="bg-muted flex justify-center items-center" >
				<img className='max-w-full max-h-full' loading="lazy" src={previewUrl} alt={wallpaper.title} title={wallpaper.title} />
			</AspectRatio>
		</CardContent>
		<Separator />
		<CardFooter className="p-2">
			<Space>
				<Button>Update</Button>
				<Button variant="outline" onClick={() => removeWallpaper(wallpaper.id)}>Delete</Button>
			</Space>
		</CardFooter>
	</Card >;
};
