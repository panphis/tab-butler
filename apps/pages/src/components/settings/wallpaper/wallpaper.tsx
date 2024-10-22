import React, { Fragment, type FC } from "react";
import { WallpaperForm, WallpaperList } from ".";
import { Separator } from "@repo/ui";

type WallpaperProps = {

};

export const Wallpaper: FC<WallpaperProps> = ({ }) => {
	return (<Fragment>
		<WallpaperForm />
		<Separator />
		<WallpaperList />
	</Fragment>);
};