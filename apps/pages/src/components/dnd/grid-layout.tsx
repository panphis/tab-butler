/**
 * https://github.com/meszhan/dnd-kit-grid-sortable/blob/master/src/App.tsx
 */


import React, { useState } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	MouseSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	rectSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from './sortable-item';
import GridContainer from './grid-container';



interface GridLayoutProps<T> {
	list: T[];
	className?: string;
	columns?: number;
	node: (item: T) => React.ReactNode;
	onOrderChange?: (list: T[]) => void;
}

type GridItem = {
	id: number;
	index?: number;
}

const GridLayout = <T extends GridItem>({ list, node, className, columns = 6, onOrderChange }: GridLayoutProps<T>) => {
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 15
			}
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 15
			}
		})
	);


	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active?.id !== over?.id) { 
			const oldIndex = list.findIndex((item) => item.id === Number(active?.id));
			const newIndex = list.findIndex((item) => item.id === Number(over?.id));
			const newItems = arrayMove(list, oldIndex, newIndex).map((item, index) => ({ ...item, index: ++index }));
			onOrderChange?.(newItems);
		}
	}




	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}			
		>
			<SortableContext
				items={list.map(item => item.id)}
				strategy={rectSortingStrategy}
			>
				<GridContainer className={className} columns={columns}>
					{list.map((item) => {
						const { id } = item
						return (
							<SortableItem
								className={`hover:cursor-pointer`}
								key={id}
								id={id}
							>
								{node(item)}
							</SortableItem>
						)
					})}
				</GridContainer>
			</SortableContext>
		</DndContext>
	);
};

export default GridLayout;