import React, { Fragment, type FC } from "react";
import { WallpaperForm, WallpaperList } from ".";
import { Label, Separator } from "@repo/ui";
import { CreateWallpaperParams, useWallpaperStore } from "@repo/shared";

type WallpaperProps = {

	anchor?: string
};

export const Wallpaper: FC<WallpaperProps> = ({ anchor }) => {


	const { createWallpaper } = useWallpaperStore()

	const onSubmit = async (values: CreateWallpaperParams) => {
		createWallpaper(values)
	}

	return (<Fragment>
		<Label id={anchor}>Wallpaper</Label>
		<WallpaperForm onSubmit={onSubmit} />
		<Separator />
		<WallpaperList />
	</Fragment>);
};