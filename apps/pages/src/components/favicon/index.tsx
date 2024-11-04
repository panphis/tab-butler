import React, { useMemo } from 'react';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	cn
} from "@repo/ui"



interface FaviconProps {
	src: string;
	title: string;
	className?: string;
	[k: string]: any
}

export const Favicon = ({
	title,
	src,
	className,
	...others
}: FaviconProps) => {

	const icon = useMemo(() => {
		const faviconUrl = new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`);
		const location = new URL(src ?? '');
		faviconUrl.searchParams.append('pageUrl', location.origin);
		faviconUrl.searchParams.append('size', '32');
		return faviconUrl.href;
	}, [src]);

	const iconTitle = useMemo(() => {
		return title?.charAt(0)?.toUpperCase()
	}, [title]);



	return (
		<Avatar {...others} className={cn(className, 'rounded-md')}>
			<AvatarImage className='z-50' src={icon} alt="@shadcn" />
			<AvatarFallback>{iconTitle}</AvatarFallback>
		</Avatar>
	);
};

