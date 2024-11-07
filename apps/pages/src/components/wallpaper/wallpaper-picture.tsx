
import { Fragment, useEffect, useState } from "react";
import type { FC } from "react"

import { cn } from "@repo/ui";
import { Wallpaper } from "@repo/shared";

type WallpaperPictureProps = {
	wallpaper: Wallpaper;
	children?: React.ReactNode;
	className?: string;
};

export const WallpaperPicture: FC<WallpaperPictureProps> = ({ wallpaper, className, children }) => {
	const { poster: posterFile, file } = wallpaper
	const [imgUrl, setImgUrl] = useState(URL.createObjectURL(posterFile as Blob))
	const [wallpaperName, setWallpaperName] = useState<string>('')
	useEffect(() => {
		const img = new Image()
		const src = URL.createObjectURL(file)
		img.src = src
		img.onload = () => {
			setImgUrl(src)
			setWallpaperName(file.name)
		}
	}, [file])


	return (<Fragment>
		<div className="relative">
			<img src={imgUrl} alt={wallpaperName} className={cn('min-h-dvh min-w-dvw fixed top-0 left-0 right-0 bottom-0 object-cover')} style={{ backgroundSize: `${wallpaper.width}px ${wallpaper.height}px` }} />

			<div className={cn("min-h-dvh min-w-dvw", className)}>
				{children}
			</div>
		</div>
	</Fragment>);
}; 