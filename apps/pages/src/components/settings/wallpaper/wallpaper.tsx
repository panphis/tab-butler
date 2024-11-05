import { Fragment, useState, type FC } from "react";
import { WallpaperForm, WallpaperList } from ".";
import { Label, Separator, Space } from "@repo/ui";
import { CreateWallpaperParams, useWallpaperStore } from "@repo/shared";
import {
	Button,
	cn,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui";
import { Plus } from "lucide-react";


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
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button onClick={() => setOpen(true)} size={'sm'} >
						<Plus />
						Create wallpaper
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create wallpaper</DialogTitle>
					</DialogHeader>

					<WallpaperForm onSubmit={onSubmit} />
				</DialogContent>
			</Dialog>
		</Space>
		<WallpaperList />
	</Fragment>);
};