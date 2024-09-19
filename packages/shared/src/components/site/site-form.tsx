import React, { Fragment, type FC } from "react";

import { z } from "zod"

const formSchema = z.object({
	title: z.string().min(2, ''),
})

type FormValues = z.infer<typeof formSchema>



type SiteFormProps = {
	onSubmit: (data: FormValues) => void
};

export const SiteForm: FC<SiteFormProps> = ({ }) => {
	return (<Fragment></Fragment>);
};
export default SiteForm