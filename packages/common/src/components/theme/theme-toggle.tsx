
import React from "react";
import { IconAuto, IconDark, IconLight } from "@/components";
import { Moon, Sun, SunMoon } from "lucide-react";
import { Fragment } from "react";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Label,
} from "@repo/ui";
import { useContext } from "react";
import { ThemeProviderContext } from ".";

export function ThemeToggle() {
	const { setTheme, theme } = useContext(ThemeProviderContext);

	return (
		<div>
			<Label>Theme</Label>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' className='flex gap-2'>
						{theme === "light" && (
							<Sun className='h-[1rem] w-[1rem] transition-all' />
						)}
						{theme === "dark" && (
							<Moon className='h-[1rem] w-[1rem] transition-all' />
						)}
						{theme === "system" && (
							<SunMoon className='h-[1rem] w-[1rem] transition-all' />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={() => setTheme("light")}>
						<Sun className='h-[1rem] w-[1rem] transition-all' />
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						<Moon className='h-[1rem] w-[1rem] transition-all' />
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						<SunMoon className='h-[1rem] w-[1rem] transition-all' />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
