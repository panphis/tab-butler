"use client"

import React, { Fragment, useState, type FC } from "react";
import { Button } from "@repo/ui";

type MathContentProps = {

};

export const MathContent: FC<MathContentProps> = ({ }) => {

	const [count, setCount] = useState(0);

	return (<Fragment>
		<p>{count}</p>
		<Button onClick={() => setCount(count + 1)}>add</Button>
		<p className="p-4">test</p>
	</Fragment>);
};
export default MathContent