import React, { ReactNode, type FC, type MouseEvent } from "react";
import { Space, Button, cn } from "@repo/ui";

interface ButtonsProps {
	loading?: boolean;
	prefix?: ReactNode;
	className?: string;
	submitText?: string;
	onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
	deleteText?: string;
	onEdit?: (e: MouseEvent<HTMLButtonElement>) => void;
	editText?: string;
	buttonSize?: "sm" | "lg" | "default" | "icon" | null | undefined;
};

export const ButtonGroup: FC<ButtonsProps> = ({
	prefix,
	onDelete,
	onEdit,
	editText = 'Edit',
	buttonSize = "default",
	loading = false,
	className = '',
	deleteText = 'Delete',
	submitText = 'Save',
	...props
}) => {
	return (
		<Space className={cn("justify-end", className)} {...props}>
			{prefix}
			{
				!!onEdit && <Button type="reset" size={buttonSize} variant={'secondary'} loading={loading} disabled={loading} onClick={onEdit}>
					{editText}
				</Button>}
			{
				!!onDelete && <Button type="button" size={buttonSize} variant={'destructive'} loading={loading} disabled={loading} onClick={onDelete}>
					{deleteText}
				</Button>
			}
		</Space >
	)
} 