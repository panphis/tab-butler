import React, { Fragment, type FC } from "react";

import defaultWallpaperSrc from "@/assets/images/wallpaper.png";

import { Picture } from "./picture";

type WallpaperProps = {
	src?: string;
	alt?: string;
	type?: 'picture' | 'video';
	children?: React.ReactNode;
	className?: string;
};

export const Wallpaper: FC<WallpaperProps> = ({ src = defaultWallpaperSrc, children, className = '', type = 'picture' }) => {
	return (<Fragment>
		{
			type === 'picture' && <Picture className={className} src={src}>{children}</Picture>
		}
	</Fragment>);
};
export default Wallpaper