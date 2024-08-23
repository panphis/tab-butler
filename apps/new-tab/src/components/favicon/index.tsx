import React from 'react';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@repo/ui"
export const Favicon = ({
	title,
	src,
	...others
}: {
	src: string;
	title: string;
}) => {
	const icon = `chrome://favicon/size/128@3x/${src}`;
	// chrome://favicon2/?size=24&scale_factor=1x&show_fallback_monogram=&page_url=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2Fextensions%2F
	const iconTitle = title.trim()[0];
	return (
		<Avatar>
			<AvatarImage {...others} src={icon} alt="@shadcn" />
			<AvatarFallback>{iconTitle}</AvatarFallback>
		</Avatar>
	);
};

