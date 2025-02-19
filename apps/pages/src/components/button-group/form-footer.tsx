import React, { ReactNode, type FC } from "react";
import { Space, Button, cn } from "@repo/ui";

interface FormFooterProps {
	loading?: boolean;
	prefix?: ReactNode;
	className?: string;
	submitText?: string;
	onDelete?: () => void;
	deleteText?: string;
	onCancel?: () => void;
	cancelText?: string;
	buttonSize?: "sm" | "lg" | "default" | "icon" | null | undefined;
};

export const FormFooter: FC<FormFooterProps> = ({
	prefix,
	onDelete,
	onCancel,
	buttonSize = "default",
	loading = false,
	className = '',
	deleteText = 'Delete',
	cancelText = 'Cancel',
	submitText = 'Save',
	...props
}) => {
	return (
		<Space className={cn("justify-end", className)} {...props}>
			{prefix}
			<Button type="submit" loading={loading} size={buttonSize}>
				{submitText}
			</Button>
			{
				!!onDelete && <Button type="button" size={buttonSize} loading={loading} variant={'destructive'} disabled={loading} onClick={onDelete}>
					{deleteText}
				</Button>
			}
			{
				!!onCancel && <Button type="reset" size={buttonSize} loading={loading} variant={'secondary'} disabled={loading} onClick={onCancel}>
					{cancelText}
				</Button>}
		</Space >
	)
} 