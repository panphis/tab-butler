"use client"

import React, { useEffect, useState, useMemo, Fragment, type FC } from "react";
import { Space } from "@repo/ui";

export const Clock: FC = () => {

	const [date, setDate] = useState<Date>(new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
			setDate(new Date());
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	}, []);

	const time = useMemo(() => {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return {
			hours, minutes, seconds, year, month, day
		}
	}, [date]);

	return (<Fragment>
		<Space direction="col" className="text-white justify-center drop-shadow-md hover:drop-shadow-xl" gap={1}>
			<Space className="items-end justify-center" gap={2}>
				<span className="text-4xl">{time.hours}</span>
				<span className="text-xl leading-8">:</span>
				<span className="text-4xl">{time.minutes}</span>
				<span className="text-xl leading-8">:</span>
				<span className="text-xl">{time.seconds}</span>
			</Space>
			<Space className="items-center justify-center" gap={2}>
				<span className="text-2xl">{time.year}</span>
				<span className="text-base">/</span>
				<span className="text-2xl">{time.month}</span>
				<span className="text-base">/</span>
				<span className="text-2xl">{time.day}</span>
			</Space>
		</Space>
	</Fragment>);
}; 