import { type FC } from "react";


import { useWallpaperStore, wallpaperStorage, useStorageSuspense } from "@repo/shared";

import { WallpaperItem } from "./";
import { Space } from "@repo/ui";


type WallpaperListProps = {

};

export const WallpaperList: FC<WallpaperListProps> = ({ }) => {

	const wallpaper = useStorageSuspense(wallpaperStorage)

	const { wallpapers } = useWallpaperStore()
	return (<Space className="flex flex-wrap gap-4">
		{
			wallpapers.map((wallpaper) => <WallpaperItem onSelect={wallpaperStorage.setWallpaper} key={wallpaper.id} wallpaper={wallpaper} />)
		}
	</Space>);
}; 