import { Fragment, useState, type FC } from "react";
import { WallpaperList, CreateWallpaper } from ".";
import { Label, Space } from "@repo/ui";
import { useWallpaperStore } from "@/hooks";
import { CreateWallpaperParams } from "@/type";
import { useTranslation } from "react-i18next";

type WallpaperProps = {

	anchor?: string
};

export const Wallpaper: FC<WallpaperProps> = ({ anchor }) => {

	const [open, setOpen] = useState<boolean>(false)

	const { t } = useTranslation();
	const { createWallpaper } = useWallpaperStore()

	const onSubmit = async (values: CreateWallpaperParams) => {
		await createWallpaper(values)
		setOpen(false)
	}

	return (<Fragment>
		<Space className="justify-between">
			<Label id={anchor}>{t('options.wallpaper')}</Label>
			<CreateWallpaper />
		</Space>
		<WallpaperList />
	</Fragment>);
};