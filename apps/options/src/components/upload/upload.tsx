import React, { Fragment, type FC, useState, useMemo } from 'react';
import { Input, AspectRatio, InputProps, cn } from '@repo/ui';

interface PreviewImageProps {
	file: File
}
const PreviewImage = ({ file }: PreviewImageProps) => {
	const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);
	return <AspectRatio ratio={16 / 9} className="bg-muted" >
		<img src={previewUrl} alt="预览" />
	</AspectRatio>
}


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
		<div className='w-max max-w-full h-max min-h-32 bg-black'>

		</div>
		<Input {...others} value={undefined} type="file" className={cn(className, 'w-max max-w-full h-max min-h-32')} onChange={handleFileChange} accept='image/*' />
		{(!!selectedFiles.length && selectedFiles.length > 0) && selectedFiles.map((file, index) => <PreviewImage key={index} file={file} />)}
	</Fragment>);
}; 