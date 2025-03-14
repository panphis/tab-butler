import { useMemo } from "react";


import { ID, Wallpaper, } from "@/type";
import { formatFileSize } from "@/utils";
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

import { useWallpaperStore } from "@/hooks";
import { EditWallpaper } from "./";
import { IconStar } from "@/components";
import { PreviewWallpaper } from "@/components/upload/preview";
import { useTranslation } from "react-i18next";


const FileSize = ({ size }: { size: number }) => {
	const sizeStr = formatFileSize(size)
	return <span className="text-xs text-muted-foreground">
		{sizeStr}
	</span>
}


interface WallpaperItemProps {
	wallpaper: Wallpaper,
	onSelect: (wallpaper: ID) => void
}

export const WallpaperItem = ({ wallpaper, onSelect: onSelectCurrentWallpaper }: WallpaperItemProps) => {

	const isSelectCurrent = useMemo(() => {
		return !!wallpaper.selected
	}, [wallpaper.selected])


	const { t } = useTranslation();
	const { removeWallpaper } = useWallpaperStore()

	const { setCurrentWallpaper } = useWallpaperStore()
	const onSelect = async () => {
		await setCurrentWallpaper(wallpaper.id)
		onSelectCurrentWallpaper(wallpaper.id)
	}



	return <Card className={cn("overflow-hidden cursor-pointer", isSelectCurrent && `border-primary shadow-lg shadow-primary`)} onClick={onSelect} >
		<CardHeader className="p-2 relative overflow-hidden">
			<CardTitle>
				{wallpaper.title}
				{
					isSelectCurrent &&
					<div
						className={`absolute p-1 flex justify-end items-start border-none box-content right-0 top-0 w-8 h-8 bg-primary text-primary-foreground`}
						style={{ clipPath: 'polygon(0 0, calc(100% + 1px) 0, calc(100% + 1px) 100%)' }}>
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
				<PreviewWallpaper wallpaper={wallpaper} title={wallpaper.title} />
			</AspectRatio>
		</CardContent>
		<Separator />
		<CardFooter className="p-2">
			<Space>
				<EditWallpaper wallpaper={wallpaper} />
				<Button variant="outline" onClick={() => removeWallpaper(wallpaper.id)}>{t('common.delete')}</Button>
			</Space>
		</CardFooter>
	</Card >;
};
