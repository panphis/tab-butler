import { Fragment, ReactNode, useState, type FC } from "react";

// import styles from "./tree.module.css";
import { TreeDataType } from "./tree";
import RCTreeSelect from "rc-tree-select";

import styles from "./tree-select.module.css";
import { Folder, FolderOpen } from 'lucide-react';
import { TreeNodeProps } from "rc-tree";
type TreeSelectProps = {
	loading?: boolean;
	treeData: TreeDataType[];

	loadingText?: ReactNode;
	emptyText?: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[k: string]: any
};

export const TreeSelect: FC<TreeSelectProps> = ({
	treeData = [],
	loading = false,
	id,
	value,
	onChange,
	loadingText,
	emptyText,
	placeholder
}) => {
	const [searchValue, setSearchValue] = useState('');

	function onSearch(value, ...rest) {
		console.log('onChange', value, rest);
		setSearchValue(value)
	}


	function onSelect(value, ...args) {
		console.log('onSelect:', value, args);
		onChange(value)
	}
	function onClear() {
		onChange(undefined)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const switcherIcon = (obj: TreeNodeProps) => {
		if (obj.isLeaf) {
			return '';
		}
		return obj.expanded ? <FolderOpen /> : <Folder />;
	};


	return (<Fragment>

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
				<RCTreeSelect
					id={id}
					autoClearSearchValue={true}
					getPopupContainer={triggerNode => triggerNode.parentNode}
					style={{ width: '100%' }}
					transitionName="rc-tree-select-dropdown-slide-up"
					choiceTransitionName="rc-tree-select-selection__choice-zoom"
					dropdownStyle={{ maxHeight: 240, overflow: 'auto', zIndex: 1500 }}
					placeholder={placeholder}
					value={value}
					searchValue={searchValue}
					treeData={treeData}
					treeNodeFilterProp="label"
					filterTreeNode={true}
					onSearch={onSearch}
					onSelect={onSelect}
					showSearch={true}
					treeIcon={true}
					treeDefaultExpandAll={true}
					treeLine={true}
					switcherIcon={switcherIcon}
					allowClear={true}
					onClear={onClear}
					dropdownMatchSelectWidth={false}
				>
				</RCTreeSelect>
			)}
		</div>
	</Fragment >);
}; 