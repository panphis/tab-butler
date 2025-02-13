import { Fragment, ReactDOM, useState, type FC } from "react";
import { WallpaperForm } from ".";
import { CreateWallpaperParams, useWallpaperStore } from "@repo/shared";
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui";
import { Plus } from "lucide-react";


export const CreateWallpaper: FC = () => {

	const [open, setOpen] = useState<boolean>(false)

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
					Upload wallpaper
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Upload wallpaper</DialogTitle>
				</DialogHeader>
				<WallpaperForm onSubmit={onSubmit} onCancel={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	</Fragment>);
};