import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Space,
	Textarea
} from "@repo/ui";

import type { FC } from "react";
import { SearchEngine } from "@/type";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next";

const schema = z.object({
	args: z.string().optional(),
	keyword: z.string().optional(),
	comment: z.string().optional(),
})

type FormValues = z.infer<typeof schema>


export type SearchEngineArgsSubmitValues = Omit<FormValues, 'keyword'>

type SearchEngineArgsProps = {
	engine: SearchEngine;
	onSubmitArgs: (params: SearchEngineArgsSubmitValues) => void
	onCancel: () => void
};



export const SearchEngineArgs: FC<SearchEngineArgsProps> = ({ engine, onSubmitArgs, onCancel }) => {


	const { t } = useTranslation();
	const args = useMemo<SearchEngine['args']>(() => engine?.args || "", []);
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			args,
			keyword: 'hello world'
		}
	});

	const { control, handleSubmit, watch } = form
	const watchAllFields = watch()
	const urlWithParams = useMemo(() => {
		const keyword = watchAllFields.keyword ?? 'hello world'
		let result = encodeURIComponent(`${engine.url}${keyword}`)
		const args = watchAllFields.args ?? ''
		result += `${args.toString()}`
		result = result.replace(/&$/, '')
		return decodeURIComponent(result)
	}, [watchAllFields, engine])


	const onSubmit = (data: FormValues) => {
		const { args, comment } = data
		onSubmitArgs?.({ args, comment })
	};

	const onTest = () => {
		window.open(urlWithParams, '_blank')
	};


	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
				<FormField
					control={control}
					name={`args`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea className="p-2" placeholder={t('options.search_engine_settings.args_placeholder')} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name={`comment`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea className="p-2" placeholder={t('options.search_engine_settings.comment_placeholder')} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<code className="break-all relative rounded bg-muted px-[0.3rem] font-mono text-sm font-semibold">
						{urlWithParams}
					</code>
				</div>
				<Space direction="row" className="min-w-full justify-end">
					<FormField
						control={control}
						name={`keyword`}
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input className="p-2" placeholder="some kwy word for test" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button variant="outline" type="button" onClick={onTest}>
						{t('common.test')}
					</Button>
					<Button variant="secondary" type="button" onClick={onCancel}>
						{t('common.cancel')}
					</Button>
					<Button type="submit">
						{t('common.submit')}
					</Button>
				</Space>
			</form >
		</Form>
	);
}; 