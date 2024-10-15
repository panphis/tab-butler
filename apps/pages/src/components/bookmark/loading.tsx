import { Fragment, type FC } from "react";
import { Skeleton } from "@repo/ui";

type LoadingProps = {

};

export const Loading: FC<LoadingProps> = ({ }) => {
	return (<Fragment>
		{[1, 2, 3].map(item => {
			return <div key={item} className="flex my-1 items-center space-x-4">
				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
		})}
	</Fragment>);
}; 