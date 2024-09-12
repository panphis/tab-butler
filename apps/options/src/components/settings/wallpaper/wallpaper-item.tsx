
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

import { useWallpaperStore } from "@repo/shared";


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

	const previewUrl = URL.createObjectURL(wallpaper.file)

	const { removeWallpaper } = useWallpaperStore()

	const onSelect = () => {
	}

	return <Card className={cn("w-[380px]")} onClick={onSelect} >
		<CardHeader className="p-2">
			<CardTitle>{wallpaper.title}</CardTitle>
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
				<img className='max-w-full max-h-full' src={previewUrl} alt={wallpaper.title} title={wallpaper.title} />
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
