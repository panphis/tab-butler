import React, { Fragment, type FC } from "react";
import { WallpaperForm, WallpaperList } from ".";
import { Separator } from "@repo/ui";
import { CreateWallpaperParams, useWallpaperStore } from "@repo/shared";

type WallpaperProps = {

};

export const Wallpaper: FC<WallpaperProps> = ({ }) => {


	const { createWallpaper } = useWallpaperStore()

	const onSubmit = async (values: CreateWallpaperParams) => {
		createWallpaper(values)
	}

	return (<Fragment>
		<WallpaperForm onSubmit={onSubmit} />
		<Separator />
		<WallpaperList />
	</Fragment>);
};