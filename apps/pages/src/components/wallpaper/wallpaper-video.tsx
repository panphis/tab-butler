
import { useMemo } from "react";
import type { FC } from "react"
import { cn } from "@repo/ui";
import { Wallpaper } from "@repo/shared";

type WallpaperVideoProps = {
	wallpaper: Wallpaper;
	children?: React.ReactNode;
	className?: string;
};

export const WallpaperVideo: FC<WallpaperVideoProps> = ({ wallpaper: { poster, file, id }, className, children }) => {

	const imgUrl = useMemo(() => {
		const url = URL.createObjectURL(poster as Blob)
		return url
	}, [id])
	const src = useMemo(() => {
		const url = URL.createObjectURL(file)
		return url
	}, [id])
	return (<div className="relative">
		<video
			className={cn('min-h-dvh w-full fixed top-0 left-0 right-0 bottom-0 object-cover')}
			muted
			autoPlay
			loop
			poster={imgUrl}
			src={src}
		/>
		<div className={cn("min-h-dvh w-full", className)}>
			{children}
		</div>
	</div>);
};