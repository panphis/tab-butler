import { Fragment, type FC } from "react";

import { ThemeToggle, ThemeColors, ThemeRadius } from "@repo/shared";
import { Label, Separator } from "@repo/ui";

import { AnchorIds } from "../enums";
import { Wallpaper } from "..";

type ThemeProps = {

};

export const Theme: FC<ThemeProps> = ({ }) => {
	return (<Fragment>
		<Label id={AnchorIds.appearance}>Appearance</Label>
		<ThemeToggle anchor={AnchorIds.theme} />
		<Separator />
		<ThemeColors anchor={AnchorIds.color} />
		<Separator />
		<ThemeRadius anchor={AnchorIds.radius} />
		<Separator />
		<Wallpaper anchor={AnchorIds.wallpaper} />
		<Separator />
	</Fragment>);
}; 