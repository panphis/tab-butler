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
import { FormFooter } from "@/components";
import { useTranslation } from "react-i18next";



const formSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }).max(255, { message: 'Title is too long' }),
	url: z.string().min(1, { message: 'Url is required' }).max(255, { message: 'Url is too long' }),
})

export type FormValues = z.infer<typeof formSchema>
type FromProps = {
	onSubmit: (data: FormValues) => Promise<void>,
	onCancel?: () => void,
	defaultValues?: FormValues
};
export const SearchEngineFrom: FC<FromProps> = ({ onCancel, onSubmit, defaultValues }) => {

	const { t } = useTranslation();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})
	function handlerCancel() {
		form.reset();
		onCancel?.();
	}

	async function handleSubmit(values: FormValues) {
		await onSubmit(values)
		handlerCancel();
	}

	return (<Fragment>

		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('options.search_engine_create.title')}</FormLabel>
							<FormControl>
								<Input placeholder={t('options.search_engine_create.title_placeholder')} {...field} />
							</FormControl>
							<FormDescription>
								{t('options.search_engine_create.title_description')}
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
							<FormLabel>{t('options.search_engine_create.url')}</FormLabel>
							<FormControl>
								<Textarea
									placeholder={t('options.search_engine_create.url_placeholder')}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{t('options.search_engine_create.url_description')}
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