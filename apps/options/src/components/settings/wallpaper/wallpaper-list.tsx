import { Fragment, type FC } from "react";


import { useWallpaperStore } from "@repo/shared";

import { WallpaperItem } from "./wallpaper-item";
import { Space } from "@repo/ui";


type WallpaperListProps = {

};

export const WallpaperList: FC<WallpaperListProps> = ({ }) => {

	const { wallpapers } = useWallpaperStore()
	console.log(wallpapers)

	return (<Space>
		{
			wallpapers.map((wallpaper) => <WallpaperItem wallpaper={wallpaper} />)
		}
	</Space>);
};
export default WallpaperList