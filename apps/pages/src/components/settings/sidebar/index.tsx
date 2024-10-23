import { buttonVariants, cn } from "@repo/ui";
import React, { Fragment, useMemo } from "react";
import type { HTMLAttributes, FC } from "react";

interface SideBarProps extends HTMLAttributes<HTMLElement> {
	items: {
		anchor: string
		title: string
	}[]
}

export const Sidebar: FC<SideBarProps> = ({ className, items, ...props }) => {

	const hash = useMemo(() => window.location.hash, [window.location.hash]);

	return (<Fragment>
		<nav
			className={cn(
				"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
				className
			)}
			{...props}
		>
			{items.map((item) => (
				<a
					key={item.anchor}
					href={`#/${item.anchor}`}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						hash === item.anchor
							? "bg-muted hover:bg-muted"
							: "hover:bg-transparent hover:underline",
						"justify-start"
					)}
				>
					{item.title}
				</a>
			))}
		</nav>
	</Fragment>);
}; 