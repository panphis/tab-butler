import { type FC } from "react";


import { useWallpaperStore, wallpaperStorage } from "@repo/shared";

import { WallpaperItem } from "./";


type WallpaperListProps = {};

export const WallpaperList: FC<WallpaperListProps> = ({ }) => {


	const { wallpapers } = useWallpaperStore()
	return (<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{
			wallpapers.map((wallpaper) => <WallpaperItem onSelect={wallpaperStorage.setWallpaper} key={wallpaper.id} wallpaper={wallpaper} />)
		}
	</div>);
}; 