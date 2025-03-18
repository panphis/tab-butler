import { type FC, Fragment } from "react";

import { Separator } from "@repo/ui";

import { WallpaperForm, WallpaperList } from "./index";



export const WallpaperSetting: FC = () => {



	return (
		<Fragment>
			<Separator />
			<WallpaperList />
		</Fragment>
	);
};