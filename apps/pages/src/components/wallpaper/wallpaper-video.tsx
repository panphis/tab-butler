
import { useMemo } from "react";
import type { FC } from "react"
import { cn } from "@repo/ui";
import { Wallpaper } from "@repo/shared";

type WallpaperVideoProps = {
	wallpaper: Wallpaper;
	children?: React.ReactNode;
	className?: string;
};

export const WallpaperVideo: FC<WallpaperVideoProps> = ({ wallpaper: { poster, file }, className, children }) => {

	const imgUrl = useMemo(() => URL.createObjectURL(poster as Blob), [poster])
	const src = useMemo(() => URL.createObjectURL(file), [file])
	return (<div className="relative">
		<video
			className={cn('min-h-dvh min-w-dvw fixed top-0 left-0 right-0 bottom-0 object-cover')}
			muted
			autoPlay
			poster={imgUrl}
			src={src}
		/>
		<div className={cn("min-h-dvh min-w-dvw", className)}>
			{children}
		</div>
	</div>);
};