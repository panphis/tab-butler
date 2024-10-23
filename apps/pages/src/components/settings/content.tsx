import React, { Fragment, type FC } from "react";


import { Theme, Wallpaper, anchorIds, Sidebar } from "./";
type ContentProps = {

};



const sidebarNavItems = [
	{
		title: "Appearance",
		anchor: anchorIds.appearance,
	},
	{
		title: "Theme",
		anchor: anchorIds.theme,
	},
	{
		title: "Color",
		anchor: anchorIds.color,
	},
	{
		title: "Radius",
		anchor: anchorIds.radius
	},
	{
		title: "Wallpaper",
		anchor: anchorIds.wallpaper
	},
]


export const SettingsContent: FC<ContentProps> = ({ }) => {



	return (<Fragment>


		<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
			<aside className="-mx-4 lg:w-1/5">
				<Sidebar items={sidebarNavItems} />
			</aside>
			<div className="flex-1 lg:max-w-2xl">
				<Theme />
				<Wallpaper />
			</div>
		</div>

	</Fragment>);
}; 