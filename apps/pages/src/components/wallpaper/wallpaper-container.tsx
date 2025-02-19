import React, { type FC } from "react";


import { Picture } from "./picture";
import { WallpaperPicture } from "./wallpaper-picture";
import { WallpaperVideo } from "./wallpaper-video";


// @ts-ignore
import defaultWallpaperSrc from "@/assets/images/wallpaper.png";
import { useWallpaperStore } from "@/storage";




type WallpaperProps = {
	alt?: string;
	type?: 'picture' | 'video';
	children?: React.ReactNode;
	className?: string;
};

export const WallpaperContainer: FC<WallpaperProps> = ({ children, className = '' }) => {

	const { currentWallpaper } = useWallpaperStore()
	switch (currentWallpaper?.type) {
		case 'picture':
			return <WallpaperPicture className={className} wallpaper={currentWallpaper}>{children}</WallpaperPicture>
		case 'video':
			return <WallpaperVideo className={className} wallpaper={currentWallpaper}>{children}</WallpaperVideo>
		default:
			return <Picture className={className} src={defaultWallpaperSrc}>{children}</Picture>
	}

};