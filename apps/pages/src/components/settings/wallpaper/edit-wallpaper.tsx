import React, { Fragment, type FC, useMemo, useState } from "react";
import { WallpaperForm } from "./wallpaper-form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Button } from "@repo/ui";
import type { Wallpaper } from "@repo/shared";
import { CreateWallpaperParams, useWallpaperStore } from "@repo/shared";


type EditWallpaperProps = {
	wallpaper?: Wallpaper;
};

export const EditWallpaper: FC<EditWallpaperProps> = ({ wallpaper }) => {

	const { updateWallpaper } = useWallpaperStore()

	const onSubmit = async (values: CreateWallpaperParams) => {
		await updateWallpaper({ ...wallpaper, ...values, id: wallpaper?.id! })
		setOpen(false)
	}

	const fileList = useMemo(() => {
		const dataTransfer = new DataTransfer();
		if (Array.isArray(wallpaper?.file)) {
			wallpaper?.file.forEach(file => dataTransfer.items.add(file));
		} else {
			dataTransfer.items.add(wallpaper?.file!);
		}
		return dataTransfer.files;
	}, [wallpaper])


	const [open, setOpen] = useState(false)
	function onOpenChange(open: boolean) {
		setOpen(open)
	}


	return (<Fragment>
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger>
				<Button>Update</Button>
			</DialogTrigger>
			<DialogContent>

				<DialogHeader>
					<DialogTitle>Edit wallpaper</DialogTitle>
				</DialogHeader>
				<WallpaperForm initValues={{
					title: wallpaper?.title,
					files: fileList,
				}} onSubmit={onSubmit} />
			</DialogContent>
		</Dialog>
	</Fragment>);
};
export default EditWallpaper