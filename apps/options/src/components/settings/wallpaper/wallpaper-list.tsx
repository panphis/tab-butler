import { type FC } from "react";


import { useWallpaperStore } from "@repo/shared";

import { WallpaperItem } from "./wallpaper-item";
import { Space } from "@repo/ui";


type WallpaperListProps = {

};

export const WallpaperList: FC<WallpaperListProps> = ({ }) => {

	const { wallpapers } = useWallpaperStore()
	return (<Space className="flex flex-wrap gap-4">
		{
			wallpapers.map((wallpaper) => <WallpaperItem key={wallpaper.id} wallpaper={wallpaper} />)
		}
	</Space>);
};
export default WallpaperList