import { type FC } from "react";


import { useWallpaperStore } from "@/hooks";

import { WallpaperItem, CreateWallpaper } from "./";
import { Space } from "@repo/ui";
import { WallpaperIcon } from "lucide-react";


const Empty = () => {
	return (<Space direction="col" className="items-center justify-center w-full h-full">
		<WallpaperIcon className="w-12 h-12 text-muted-foreground" />
		<p className="font-bold">No wallpaper yet</p>
		<p className="text-sm text-muted-foreground">The wallpaper hasn't been uploaded yet.</p>
		<CreateWallpaper />
	</Space>);
};







type WallpaperListProps = {};




export const WallpaperList: FC<WallpaperListProps> = ({ }) => {


	const { wallpapers, setCurrentWallpaper } = useWallpaperStore()
	return (wallpapers.length > 0 ?
		<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{wallpapers
				.map((wallpaper) => (
					<WallpaperItem
						onSelect={setCurrentWallpaper}
						key={wallpaper.id}
						wallpaper={wallpaper} />
				)
				)}
		</div> :
		< Empty />
	);
}; 