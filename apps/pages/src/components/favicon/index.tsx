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
		//  部分图标加载不出来
		// https://issuetracker.google.com/issues/334120886
		const location = new URL(src ?? '');
		const url = new URL(chrome.runtime.getURL('/_favicon/'));
		url.searchParams.set('pageUrl', location.origin); // this encodes the URL as well
		url.searchParams.set('size', '32');
		return url.toString();
	}, [src]);

	const iconTitle = useMemo(() => {
		return title?.charAt(0)?.toUpperCase()
	}, [title]);



	return (
		<Avatar {...others} className={cn(className, 'rounded-md')}>
			<AvatarImage className='z-50' src={icon} alt={iconTitle} />
			<AvatarFallback>{iconTitle}</AvatarFallback>
		</Avatar>
	);
};

