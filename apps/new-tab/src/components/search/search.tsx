
"use client"

import React, { Fragment, type FC } from "react";
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { searchEngines } from "@/utils";
import { Favicon } from "@/components";

const schema = z.object({
	engine: z.string(),
	keyWords: z.string(),
})

export const Search: FC = () => {

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			engine: searchEngines[0].id,
			keyWords: '',
		},
	})

	function onSubmit(values: z.infer<typeof schema>) {
		console.log(values)
	}


	return (<Fragment>

		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="keyWords"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="搜索" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="engine"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select  {...field}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Theme" />
									</SelectTrigger>
									<SelectContent>
										{
											searchEngines.map(item => (
												<SelectItem key={item.id} value={item.id}>
													<Favicon src={item.url} title={item.title} />
													{item.title}
												</SelectItem>
											))
										}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	</Fragment>);
};