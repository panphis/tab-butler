import React, { Fragment, type FC } from "react";

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { FormFooter } from "@/components/button-group";
import { useTranslation } from "react-i18next";


const formSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }).max(255, { message: 'Title is too long' }),
	url: z.string().min(1, { message: 'Url is required' }).max(255, { message: 'Url is too long' }),
})

export type SiteFormValues = z.infer<typeof formSchema>

type SiteFormProps = {
	onSubmit: (data: SiteFormValues) => void,
	onCancel?: () => void,
	defaultValues?: SiteFormValues
};

export const SiteForm: FC<SiteFormProps> = ({ onCancel, onSubmit, defaultValues }) => {

	const { t } = useTranslation();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})
	return (<Fragment>
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('new_tab.site_form.title')}</FormLabel>
							<FormControl>
								<Input placeholder="Website title" {...field} />
							</FormControl>
							<FormDescription>
								{t('new_tab.site_form.title_description')}
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
							<FormLabel>{t('new_tab.site_form.url')}</FormLabel>
							<FormControl>
								<Textarea
									placeholder={t('new_tab.site_form.url_placeholder')}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								{t('new_tab.site_form.url_description')}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormFooter onCancel={onCancel} />
			</form>
		</Form>
	</Fragment>);
};