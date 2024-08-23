import React, { Fragment, type FC } from "react";
import { Button, Separator, Space } from "@repo/ui";
import { ThemeToggle, ThemeColors, ThemeRadius } from ".";

type ThemeSettingProps = {};

export const ThemeSetting: FC<ThemeSettingProps> = ({}) => {
	return (
		<Fragment>
			<ThemeToggle />
			<Separator />
			<ThemeColors />
			<Separator />
			<ThemeRadius />
			<Separator />
			<Space>
				<Button>测试按钮</Button>
				<Button variant={"secondary"}>测试按钮 secondary</Button>
			</Space>
			<Separator />
		</Fragment>
	);
};
