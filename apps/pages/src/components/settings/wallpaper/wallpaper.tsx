import { Fragment, useState, type FC } from "react";
import { WallpaperList, CreateWallpaper } from ".";
import { Label, Space } from "@repo/ui";
import { useWallpaperStore } from "@/hooks";
import { CreateWallpaperParams } from "@/type";

type WallpaperProps = {

	anchor?: string
};

export const Wallpaper: FC<WallpaperProps> = ({ anchor }) => {

	const [open, setOpen] = useState<boolean>(false)

	const { createWallpaper } = useWallpaperStore()

	const onSubmit = async (values: CreateWallpaperParams) => {
		await createWallpaper(values)
		setOpen(false)
	}

	return (<Fragment>
		<Space className="justify-between">
			<Label id={anchor}>Wallpaper</Label>
			<CreateWallpaper />
		</Space>
		<WallpaperList />
	</Fragment>);
};