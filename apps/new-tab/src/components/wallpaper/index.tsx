import React, { Fragment, type FC, useMemo } from "react";

import defaultWallpaperSrc from "@/assets/images/wallpaper.png";

import { Picture } from "./picture";
import { useWallpaperStore } from "@repo/shared";



type WallpaperProps = {
	src?: string;
	alt?: string;
	type?: 'picture' | 'video';
	children?: React.ReactNode;
	className?: string;
};

export const Wallpaper: FC<WallpaperProps> = ({ src = defaultWallpaperSrc, children, className = '' }) => {

	const { currentWallpaper } = useWallpaperStore()
	console.log(currentWallpaper)

	const previewUrl = useMemo(() => {
		if (currentWallpaper?.file) {
			const url = URL.createObjectURL(currentWallpaper.file)
			return url
		}
		return defaultWallpaperSrc
	}, [currentWallpaper])


	return (<Fragment>
		<Picture className={className} src={previewUrl}>{children}</Picture>
	</Fragment>);
};
export default Wallpaper