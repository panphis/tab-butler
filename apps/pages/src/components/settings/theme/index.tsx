import React, { Fragment, type FC } from "react";

import { ThemeToggle, ThemeColors, ThemeRadius } from "@repo/shared";
import { Separator } from "@repo/ui";

type ThemeProps = {

};

export const Theme: FC<ThemeProps> = ({ }) => {
	return (<Fragment>
		<ThemeToggle />
		<Separator />
		<ThemeColors />
		<Separator />
		<ThemeRadius />
		<Separator />
	</Fragment>);
}; 