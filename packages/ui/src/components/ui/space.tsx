import * as React from "react";

import { cn } from "@/lib/utils";

export interface SpaceProps extends React.InputHTMLAttributes<HTMLDivElement> {
	gap?: number | string;
	direction?: "row" | "col";
}

const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
	({ className, gap = 2, direction = "row", ...props }, ref) => {
		return (
			<div
				className={cn(`flex p-${gap} gap-${gap} flex-${direction}`, className)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Space.displayName = "Space";

export { Space };
