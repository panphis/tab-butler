import { Button, Label } from "@repo/ui";
import { useContext, useId } from "react";
import { ThemeProviderContext, radius } from ".";


type Props = {
	anchor?: string
};

export function ThemeRadius({ anchor }: Props) {
	const { radius: currentRadius, setRadius } = useContext(ThemeProviderContext);
	const id = useId();
	return (
		<div>
			<Label id={anchor} htmlFor={id}>Radius</Label>
			<div id={id} className='flex gap-2'>
				{radius.map((value) => {
					return (
						<Button
							variant={"outline"}
							size='sm'
							key={value}
							onClick={() => {
								setRadius(value);
							}}
							className={`${currentRadius === value.toString() && "border-2 border-primary"}`}
						>
							{value}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
