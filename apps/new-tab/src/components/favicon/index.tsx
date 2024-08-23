import React, { useMemo } from 'react';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,

} from "@repo/ui"


interface FaviconProps {
	src: string;
	title: string;
	[k:string]:any
}

export const Favicon = ({
	title,
	src,
	...others
}:FaviconProps) => {
	
	const icon = useMemo(() => {
		const faviconUrl =	new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`);
		faviconUrl.searchParams.append('pageUrl', src);
		faviconUrl.searchParams.append('size', '32');
		return faviconUrl.href;
	}, [src]);

	const iconTitle = useMemo(() => {
		if (title.length < 2) {
			return title.charAt(0).toUpperCase() + title.slice(1);
		}
		return title.slice(0, 2).charAt(0).toUpperCase() + title.slice(1, 2);
	}, [title]);



	return (
		<Avatar {...others}>
			<AvatarImage src={icon} alt="@shadcn" />
			<AvatarFallback>{iconTitle}</AvatarFallback>
		</Avatar>
	);
};

