import { Fragment, type FC } from "react";


import { Theme, Wallpaper, AnchorIds, Sidebar } from "./";
import { Label } from "@repo/ui";
type ContentProps = {

};


export const SettingsContent: FC<ContentProps> = ({ }) => {
	return (<Fragment>
		<div className="flex flex-col lg:flex-row gap-4">
			<aside className="hidden lg:w-1/5 lg:block ">
				<Sidebar />
			</aside>
			<div className="flex flex-1 flex-col gap-4">
				<Label id={AnchorIds.appearance}>Appearance</Label>
				<Theme />
			</div>
		</div>

	</Fragment>);
}; 