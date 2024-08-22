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
import React from "react";

export function ThemeToggle() {
	const { setTheme, theme } = useContext(ThemeProviderContext);

	return (
		<Fragment>
			<Label className='text-xs'>Theme</Label>
			<br></br>
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
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Fragment>
	);
}
