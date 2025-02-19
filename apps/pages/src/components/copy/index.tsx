import React, { Fragment, type FC } from "react";
import { Button, cn, useToast } from "@repo/ui";
import { useCopy } from "@repo/shared";

type CopyActionProps = {
	text: string,
	className?: string,
	onSuccess?: () => void,
	onError?: () => void,
	showMessage?: boolean,
	children?: React.ReactNode
};

export const CopyAction: FC<CopyActionProps> = ({ text = '', className, onSuccess, onError, showMessage = true, children }) => {
	const { toast } = useToast()

	const handleSuccess = () => {
		onSuccess?.()
		showMessage && toast({
			title: "Copied!",
			description: text
		})
	}

	const handleError = (error: unknown) => {
		let message = ''
		if (error instanceof Error) {
			message == error.message
		} else {
			message = '未知错误'
		}
		onError?.()
		showMessage && toast({
			title: "Copy failed",
			variant: "destructive",
			description: message,
			action: <Button variant="outline" onClick={copy}>Try Again</Button>
		})
	}

	const copy = useCopy({ text, onError: handleError, onSuccess: handleSuccess })



	return (<Fragment>
		{
			children ?
				<span onClick={copy} className={className}>
					{children}
				</span> :
				<Button onClick={copy} className={cn(className)}>Copy</Button>
		}
	</Fragment>);
}; 
