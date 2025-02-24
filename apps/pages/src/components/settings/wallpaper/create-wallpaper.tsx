import { Fragment, ReactDOM, useState, type FC } from "react";
import { WallpaperForm } from ".";
import { CreateWallpaperParams } from "@/type";
import { useWallpaperStore } from "@/hooks";
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";


export const CreateWallpaper: FC = () => {

	const [open, setOpen] = useState<boolean>(false)

	const { t } = useTranslation();
	const { createWallpaper } = useWallpaperStore()

	const onSubmit = async (values: CreateWallpaperParams) => {
		await createWallpaper(values)
		setOpen(false)
	}

	return (<Fragment>
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setOpen(true)} size={'sm'} >
					<Plus />
					{t('options.upload_wallpaper_form.trigger')}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t('options.upload_wallpaper_form.form_title')}</DialogTitle>
				</DialogHeader>
				<WallpaperForm onSubmit={onSubmit} onCancel={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	</Fragment>);
};