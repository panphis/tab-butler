import React, { Fragment, type FC, useMemo, useState } from "react";
import { WallpaperForm } from "./wallpaper-form";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Button } from "@repo/ui";
import type { Wallpaper, CreateWallpaperParams } from "@/type";
import { useWallpaperStore } from "@/hooks";
import { useTranslation } from "react-i18next";


type EditWallpaperProps = {
	wallpaper?: Wallpaper;
};

export const EditWallpaper: FC<EditWallpaperProps> = ({ wallpaper }) => {

	const { updateWallpaper } = useWallpaperStore()
	const { t } = useTranslation();

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

	const onCancel = () => {
		setOpen(false)
	}


	return (<Fragment>
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger>
				<Button>{t('common.update')}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('options.edit_wallpaper_form.form_title')}</DialogTitle>
				</DialogHeader>
				<WallpaperForm
					initValues={{
						title: wallpaper?.title,
						files: fileList,
					}}
					onSubmit={onSubmit}
					onCancel={onCancel}
				/>
			</DialogContent>
		</Dialog>
	</Fragment>);
};
export default EditWallpaper