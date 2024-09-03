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
		<Space direction="col" className="text-light justify-center drop-shadow-md hover:drop-shadow-xl h-24" gap={1}>
			<Space className="items-center justify-center group/time h-12" gap={2}>
				<span className="text-4xl group-hover/time:text-6xl transition-all">{time.hours}</span>
				<span className="text-4xl leading-8">:</span>
				<span className="text-4xl group-hover/time:text-6xl transition-all">{time.minutes}</span>
				<span className="text-4xl leading-8">:</span>
				<span className="text-4xl group-hover/time:text-6xl transition-all">{time.seconds}</span>
			</Space>
			<Space className="items-center justify-center group/date  h-12" gap={2}>
				<span className="text-2xl group-hover/date:text-3xl transition-all">{time.year}</span>
				<span className="text-base">/</span>
				<span className="text-2xl group-hover/date:text-3xl transition-all">{time.month}</span>
				<span className="text-base">/</span>
				<span className="text-2xl group-hover/date:text-3xl transition-all">{time.day}</span>
			</Space>
		</Space>
	</Fragment>);
}; 