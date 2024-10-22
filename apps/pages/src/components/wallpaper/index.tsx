import React, { Fragment, type FC, useMemo, useEffect } from "react";

import defaultWallpaperSrc from "@/assets/images/wallpaper.png";

import { Picture } from "./picture";

import { useWallpaperStore, wallpaperStorage, useStorageSuspense } from "@repo/shared";




type WallpaperProps = {
	src?: string;
	alt?: string;
	type?: 'picture' | 'video';
	children?: React.ReactNode;
	className?: string;
};

export const PictureWallpaper: FC<WallpaperProps> = ({ src = defaultWallpaperSrc, children, className = '' }) => {

	const wallpaper = useStorageSuspense(wallpaperStorage)
	const { currentWallpaper, getCurrentWallpaper } = useWallpaperStore()


	useEffect(() => {
		getCurrentWallpaper()
	}, [wallpaper])

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