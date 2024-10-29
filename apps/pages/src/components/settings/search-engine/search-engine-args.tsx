import { Fragment, useMemo } from "react";
import type { FC } from "react";
import { SearchEngine } from "@repo/shared";
import { FolderPlus, Plus } from 'lucide-react';
import { Button, Space } from "@repo/ui";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const Empty = () => {
	return (<Space direction="col" className="items-center justify-center w-full h-full">
		<FolderPlus className="w-12 h-12 text-muted-foreground" />
		<p className="font-bold">No arguments</p>
		<p className="text-sm text-muted-foreground">No search engine arguments</p>
		<Button size={'sm'}>
			<Plus size={16} />
			Create arguments
		</Button>
	</Space>);
};


type SearchEngineArgsProps = {
	engine: SearchEngine;
};


const schema = z.object({
	args: z.array(z.object({
		name: z.string(),
		value: z.string().or(z.array(z.string()))
	}))
})

type FormValues = z.infer<typeof schema>




export const SearchEngineArgs: FC<SearchEngineArgsProps> = ({ engine }) => {
	const args = useMemo(() => engine.args || [], [engine.args]);

	const { control, register } = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			args
		}
	});
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormProvider)
		name: "args", // unique name for your Field Array
	});




	return (<Fragment>
		{args.length > 0 ? (
			<Fragment>
				{
					args?.map((arg, index) => (
						<div className="flex flex-row items-center justify-between w-full" key={index}>
							{arg.name}
						</div>
					))
				}
			</Fragment>
		) : <Empty />}
	</Fragment>);
}; 