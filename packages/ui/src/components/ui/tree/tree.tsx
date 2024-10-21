//eslint-ignore-file

import React, { ReactNode } from "react";
import RCTree from "rc-tree";
import type { TreeProps } from "rc-tree";
import { NodeDragEventParams } from "rc-tree/lib/contextTypes";
import { BasicDataNode, DataNode, EventDataNode } from "rc-tree/lib/interface";
import styles from "./tree.module.css";
import { ChevronRight, GripVertical } from 'lucide-react';



export type Key = React.Key;

export type DropInfo = NodeDragEventParams<TreeDataType> & {
	dragNode: EventDataNode<TreeDataType>;
	dragNodesKeys: Key[];
	dropPosition: number;
	dropToGap: boolean;
}

export interface CheckInfo<TreeDataType extends BasicDataNode = DataNode> {
	event: "check";
	node: EventDataNode<TreeDataType>;
	checked: boolean;
	nativeEvent: MouseEvent;
	checkedNodes: TreeDataType[];
	checkedNodesPositions?: {
		node: TreeDataType;
		pos: string;
	}[];
	halfCheckedKeys?: Key[];
}

export interface SelectInfo {
	event: "select";
	selected: boolean;
	node: EventDataNode<TreeDataType>;
	selectedNodes: TreeDataType[];
	nativeEvent: MouseEvent;
}

export interface TreeDataType {
	key?: Key | number;
	title: string | number;
	disabled?: boolean;
	children?: Array<TreeDataType>;
}

interface TreeComponentProps {
	loading?: boolean;
	loadingText?: ReactNode;
	emptyText?: ReactNode;
	treeData: TreeDataType[];
	checkable?: boolean;
	checked?: Key[] | { checked: Key[]; halfChecked: Key[] };
	selected?: Key[];
	defaultExpandAll?: boolean;
	onCheck?: (keys: Key[], info: CheckInfo<TreeDataType>) => void;
	onSelect?: (keys: Key[], info: SelectInfo) => void;
	draggable?: boolean | React.ReactNode;
	onDrop?: (info: DropInfo) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	allowDrop?: (v: any) => boolean;
	rcTreeProps?: Omit<TreeProps, 'prefixCls'>;
}

export const Tree: React.FC<TreeComponentProps> = ({
	checkable = false,
	treeData = [],
	checked = [],
	onCheck,
	selected = [],
	onSelect,
	defaultExpandAll = true,
	onDrop,
	loading = false,
	draggable = false,
	rcTreeProps,
	allowDrop,
	loadingText,
	emptyText
}) => {

	const handleCheck = (
		checked:
			| Key[]
			| {
				checked: Key[];
				halfChecked: Key[];
			},
		info: CheckInfo<TreeDataType>,
	) => {
		if (onCheck) {
			const keys = Array.isArray(checked) ? checked : checked.checked;
			onCheck(keys, info);
		}
	};

	const handleSelect = (selectedKeys: Key[], info: SelectInfo) => {
		if (onSelect) {
			onSelect(selectedKeys, info);
		}
	};
	const switcherIcon = (obj: any) => {
		if (obj.isLeaf) {
			return;
		}
		// return '中文'
		return <ChevronRight style={{ cursor: "pointer", transform: `rotate(${obj.expanded ? 90 : 0}deg)` }} size={24} className="rc-tree-switcher" />

	};

	const handleDrop = (info: DropInfo) => {
		if (onDrop && draggable) {
			onDrop(info);
		}
	};

	return (
		<div className={styles.container}>
			{loading ? (
				loadingText ?? <div className="flex justify-center items-center h-full">
					<p>加载中...</p>
				</div>
			) : treeData.length === 0 ? (
				emptyText ?? <div className="flex justify-center items-center h-full">
					<p>暂无数据</p>
				</div>
			) : (
				// @ts-ignore
				<RCTree
					{...rcTreeProps}
					checkable={
						checkable ? <span className="rc-tree-checkbox-inner"></span> : false
					}
					autoExpandParent={true}
					onCheck={handleCheck}
					checkedKeys={checked}
					onSelect={handleSelect}
					selectedKeys={selected}
					switcherIcon={switcherIcon}
					multiple={false}
					defaultExpandAll={defaultExpandAll}
					treeData={treeData}
					draggable={
						draggable
							? {
								icon: <GripVertical size={24} />,
							}
							: false
					}
					allowDrop={allowDrop}
					onDrop={handleDrop}
				></RCTree>
			)}
		</div>
	);
};
