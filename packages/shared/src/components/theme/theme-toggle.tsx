
import { FC, useContext, useId, Fragment } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import {
	Label,
	RadioGroup, RadioGroupItem
} from "@repo/ui";
import { ThemeProviderContext } from ".";
import { Themes } from "@/types";


const themes: Themes[] = ["light", "dark", "system"];

const ThemeRadioItem: FC<{ value: string }> = ({ value }) => {
	const id = useId();
	return (
		<div className="flex items-center space-x-2">
			<RadioGroupItem value={value} id={id} />
			<Label htmlFor={id}>
				{value === "light" && (
					<Fragment>
						<span className='sr-only'>Light</span>
						<Sun className='h-[1rem] w-[1rem] transition-all' />
					</Fragment>
				)}
				{value === "dark" && (
					<Fragment>
						<span className='sr-only'>Dark</span>
						<Moon className='h-[1rem] w-[1rem] transition-all' />
					</Fragment>
				)}
				{value === "system" && (
					<Fragment>
						<span className='sr-only'>System</span>
						<SunMoon className='h-[1rem] w-[1rem] transition-all' />
					</Fragment>
				)}
			</Label>
		</div >
	);
};


export function ThemeToggle() {
	const { setTheme, theme } = useContext(ThemeProviderContext);

	return (
		<div>
			<Label>Theme</Label>

			<RadioGroup
				onValueChange={setTheme}
				defaultValue={theme}
				className="flex flex-row space-1"
			>
				{
					themes.map((theme) => (
						<ThemeRadioItem key={theme} value={theme} />
					))
				}
			</RadioGroup>
			{/* <DropdownMenu>
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
			</DropdownMenu> */}
		</div>
	);
}
