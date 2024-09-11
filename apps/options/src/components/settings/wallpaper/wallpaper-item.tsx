import { Fragment } from "react";
import { Wallpaper } from "@repo/shared";
import {
	AspectRatio,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	cn,
} from "@repo/ui";


interface WallpaperItemProps {
	wallpaper: Wallpaper
}
export const WallpaperItem = ({ wallpaper }: WallpaperItemProps) => {

	const previewUrl = URL.createObjectURL(wallpaper.file)

	return <Card className={cn("w-[380px]")} >
		<CardHeader className="p-2">
			<CardTitle>{wallpaper.title}</CardTitle>
			<CardDescription>{wallpaper.file.name}</CardDescription>
		</CardHeader>
		<AspectRatio ratio={16 / 9} className="bg-muted" >
			<img src={previewUrl} alt={wallpaper.title} />
		</AspectRatio>
	</Card>;
};
