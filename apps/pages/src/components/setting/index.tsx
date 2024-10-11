import React, { type FC } from "react";

import { Button } from "@repo/ui";

import { Settings } from 'lucide-react';

export const Setting: FC = () => {

	const openSetting = () => {
		chrome.runtime.openOptionsPage();
	};

	return (<Button
		variant="outline"
		size="icon"
		className="rounded-full fixed top-2 right-2 opacity-20 bg-transparent text-light/80  hover:shadow-[rgba(255,255,255,0.2)_0_0_10px] hover:backdrop-blur-[10px] hover:opacity-100 hover:text-light hover:bg-dark/50"
		onClick={openSetting}
	>
		<Settings />
	</Button>);
};