import React, { Fragment, type FC, useMemo } from 'react';
import { Input, InputProps, cn } from '@repo/ui';

import { PreviewWallpaper } from "./preview";

interface UploadProps extends Omit<InputProps, 'onChange' | 'value'> {
	onChange?: (file: FileList | null) => void,
	value?: FileList
};

export const Upload: FC<UploadProps> = ({ onChange, className, ...others }) => {

	const selectedFiles = useMemo<File[]>(() => {
		const files = others?.value ?? [];
		return Array.from(files ?? [])
	}, [others.value]);



	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		onChange?.(files)
	};
	return (<Fragment>
		<Input {...others} value={undefined} type="file" className={cn(className, 'w-max max-w-full')} onChange={handleFileChange} accept='image/*,video/*' />
		<section className='h-max'>
			{(!!selectedFiles.length && selectedFiles.length > 0) && selectedFiles.map((file, index) => <PreviewWallpaper key={index} file={file} />)}
		</section>
	</Fragment>);
}; 