"use client"

import { useMemo } from "react";

import { basePath } from "@/settings/settings";
import type { FC } from "react"

import NextImage from 'next/image'

import type { ImageProps } from 'next/image'



export const Image: FC<ImageProps> = ({ src, ...others }) => {
	const srcWithBaseUrl = useMemo(() => {
		if (!src) {
			throw new Error('图片地址为必传')
		}
		// src 为带协议的图片则直接返回
		if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(src.toString())) {
			return src
		}
		// 如果不是则去掉最前面的 / 并添加页面访问前缀并返回
		return `${basePath}/${src.toString().replace(/^\//, '')}`
	}, [src])
	return (<NextImage
		style={{
			maxHeight: '100%',
			maxWidth: '100%',
			width: 'initial',
			height: 'initial'
		}}
		width={500}
		height={500}
		{...(others as ImageProps)}
		src={srcWithBaseUrl}
	/>);
};
export default Image