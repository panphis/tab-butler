import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
	id: number;
	children?: React.ReactNode;
	className?: string;
}

const SortableItem: FC<SortableItemProps> = (({ id, children, className = '' }) => {
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id,
		transition: {
			duration: 150, // milliseconds
			easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
		},
		
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		pointerEvents: isDragging ? 'none' as const : 'auto' as const,
        width: '100%',
        height: '100%'
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className={className}
			style={style}
		>
			{children}
		</div>
	);
});

export default SortableItem;