import React, { Fragment, type FC } from "react";


import { Theme, Wallpaper } from "./";
type ContentProps = {

};

export const SettingsContent: FC<ContentProps> = ({ }) => {
	return (<Fragment>
		<Theme />
		<Wallpaper />
	</Fragment>);
}; 