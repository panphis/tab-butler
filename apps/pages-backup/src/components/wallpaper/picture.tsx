import React, { type FC } from "react";

import { cn } from "@repo/ui";




type PictureProps = {
	src: string,
	children?: React.ReactNode;
	className?: string;
};

export const Picture: FC<PictureProps> = ({ src, children, className }) => {
	return (<div className={cn('min-h-dvh min-w-dvw bg-fixed bg-no-repeat bg-cover', className)}
		style={{
			backgroundImage: `url(${src})`
		}}
	>
		{children}
	</div>);
}; 