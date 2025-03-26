import React from 'react';

interface GridContainerProps {
	columns: number;
	children: React.ReactNode;
	className?: string;
}

const GridContainer: React.FC<GridContainerProps> = ({ columns, children, className }) => {


	return (
		<div
			className={`grid grid-cols-${columns} gap-4 ${className}`}
			style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }}
		>
			{children}
		</div>
	);
};

export default GridContainer;
