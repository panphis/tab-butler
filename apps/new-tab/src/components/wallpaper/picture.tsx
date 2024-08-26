import React, { Fragment, type FC } from "react";

import defaultWallpaperSrc from "@/assets/images/wallpaper.png";
import { cn } from "@repo/ui";

type PictureProps = {
	src: string,
	children?: React.ReactNode;
	className?: string;
};

export const Picture: FC<PictureProps> = ({ src, children, className }) => {
	return (<Fragment>
		<div className={cn('min-h-dvh bg-fixed bg-no-repeat bg-cover', className)}
			style={{
				backgroundImage: `url(${src}), url('${defaultWallpaperSrc}')`
			}}
		>
			{children}
		</div>
	</Fragment>);
}; 