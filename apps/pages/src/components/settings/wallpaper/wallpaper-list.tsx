import { type FC } from "react";


import { useWallpaperStore } from "@repo/shared";

import { WallpaperItem } from "./";


type WallpaperListProps = {};

export const WallpaperList: FC<WallpaperListProps> = ({ }) => {


	const { wallpapers, setCurrentWallpaper } = useWallpaperStore()
	return (<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{
			wallpapers.map((wallpaper) => <WallpaperItem onSelect={setCurrentWallpaper} key={wallpaper.id} wallpaper={wallpaper} />)
		}
	</div>);
}; 