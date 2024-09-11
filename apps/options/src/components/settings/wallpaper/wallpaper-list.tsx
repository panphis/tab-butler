import { Fragment, type FC } from "react";


import { useWallpaperStore } from "@repo/shared";

import { WallpaperItem } from "./wallpaper-item";


type WallpaperListProps = {

};

export const WallpaperList: FC<WallpaperListProps> = ({ }) => {

	const { wallpapers } = useWallpaperStore()
	console.log(wallpapers)

	return (<Fragment>
		{
			wallpapers.map((wallpaper) => <WallpaperItem wallpaper={wallpaper} />)
		}
	</Fragment>);
};
export default WallpaperList