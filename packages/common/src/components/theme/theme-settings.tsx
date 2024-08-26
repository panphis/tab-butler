import React, { Fragment, type FC } from "react";
import { Separator, Space } from "@repo/ui";
import { ThemeToggle, ThemeColors, ThemeRadius } from ".";

type ThemeSettingProps = {};

export const ThemeSetting: FC<ThemeSettingProps> = ({ }) => {
	return (
		<Fragment>
			<Space direction="col">
				<Separator />
				<ThemeToggle />
				<Separator />
				<ThemeColors />
				<Separator />
				<ThemeRadius />
				<Separator />
			</Space>
		</Fragment>
	);
};
