
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


type Props = {
	anchor?: string
};

export function ThemeToggle({ anchor }: Props) {
	const { setTheme, theme } = useContext(ThemeProviderContext);
	const id = useId();
	return (
		<div>
			<Label id={anchor} htmlFor={id}>Theme</Label>
			<RadioGroup
				id={id}
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
		</div>
	);
}
