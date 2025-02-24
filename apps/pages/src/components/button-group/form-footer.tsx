import { ReactNode, type FC } from "react";
import { Space, Button, cn } from "@repo/ui";

import { TranslationWithKey } from "..";
interface FormFooterProps {
	loading?: boolean;
	prefix?: ReactNode;
	className?: string;
	submitText?: ReactNode;
	onDelete?: () => void;
	deleteText?: ReactNode;
	onCancel?: () => void;
	cancelText?: ReactNode;
	buttonSize?: "sm" | "lg" | "default" | "icon" | null | undefined;
};

export const FormFooter: FC<FormFooterProps> = ({
	prefix,
	onDelete,
	onCancel,
	buttonSize = "default",
	loading = false,
	className = '',
	deleteText = <TranslationWithKey key='common.form_footer.delete' />,
	cancelText = <TranslationWithKey key='common.form_footer.cancel' />,
	submitText = <TranslationWithKey key='common.form_footer.save' />,
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