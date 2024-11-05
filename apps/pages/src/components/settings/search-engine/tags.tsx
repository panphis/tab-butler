import { forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import { Input, Badge, Space, InputProps } from "@repo/ui";

import { generateRandomColorPairs } from "@/utils";




interface TagsRef {
	focus: () => void;
	blur: () => void;
	clear: () => void;
}
interface TagsProps extends Omit<InputProps, 'onChange'> {
	onChange: (tags: string[]) => void;
	onBlur?: () => void;
	value: string[];
	disabled?: boolean;
	name?: string;
}

const Tags = forwardRef<TagsRef, TagsProps>(({ onChange, value, onBlur, disabled, ...inputProps }, ref) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const colorPairs = useMemo(() => generateRandomColorPairs(36), [])

	const tagMap = useMemo(() => {
		return new Set(value)
	}, [value])

	const onSubmit = () => {
		const input = inputRef.current!
		const tag = input.value
		if (!tagMap.has(tag)) {
			onChange?.([...value, tag])
		}
		input.value = ''
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		event.stopPropagation()
		if (event.key === 'Enter' && !event.ctrlKey && !event.altKey) {
			event.preventDefault();
			onSubmit();
		}
	}

	useImperativeHandle(ref, () => ({
		focus: () => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
		},
		blur: () => {
			if (inputRef.current) {
				inputRef.current.blur();
			}
		},
		clear: () => {
			onChange?.([])
		},
		onChange: onChange,
	}));

	return (
		<Space direction="col">
			<Input disabled={disabled} {...inputProps} ref={inputRef} onBlur={onBlur} onKeyDown={handleKeyDown} />

			<Space className="flex-wrap">
				{
					value.map((tag, index) => {
						const { base, lighter, darker } = colorPairs[index]
						const style = {
							'--tw-shadow': `hsl(${base.h},${base.s}%,${base.l}%)`,
							'--tw-shadow-colored': `hsl(${base.h},${base.s}%,${base.l}%)`,
							backgroundColor: `hsla(${lighter.h},${lighter.s}%,${lighter.l}%, 0.5)`,
							borderColor: `hsla(${base.h},${base.s}%,${base.l}%,1)`,
							color: `hsla(${darker.h},${darker.s}%,${darker.l}%,1)`
						}
						return (
							<Badge key={`${tag}`}
								style={style}
							>
								{tag}
							</Badge>
						)
					})
				}
			</Space>
		</Space>
	);
}
);

Tags.displayName = 'Tags';

export { Tags }