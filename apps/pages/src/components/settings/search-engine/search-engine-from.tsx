import { Fragment, type FC } from "react";
import z from "zod";
import { useForm } from "react-hook-form"; import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea
} from "@repo/ui"
import { FormFooter } from "@repo/shared";



const formSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }).max(255, { message: 'Title is too long' }),
	url: z.string().min(1, { message: 'Url is required' }).max(255, { message: 'Url is too long' }),
})

export type FormValues = z.infer<typeof formSchema>
type FromProps = {
	onSubmit: (data: FormValues) => void,
	onCancel?: () => void,
	defaultValues?: FormValues
};
export const SearchEngineFrom: FC<FromProps> = ({ onCancel, onSubmit, defaultValues }) => {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	const handlerCancel = () => {
		form.reset();
		onCancel?.();
	}

	return (<Fragment>

		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Website title" {...field} />
							</FormControl>
							<FormDescription>
								This is website display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Url</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Website url"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is website url.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormFooter onCancel={handlerCancel} />
			</form>
		</Form>
	</Fragment>);
};
export default SearchEngineFrom