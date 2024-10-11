import { Fragment, useState, type FC } from "react";

// import styles from "./tree.module.css";
import { TreeDataType } from "./tree";
import RCTreeSelect from "rc-tree-select";

import styles from "./tree-select.module.css";
import { Folder, FolderOpen } from 'lucide-react';
import { TreeNodeProps } from "rc-tree";
type TreeSelectProps = {
	loading?: boolean;
	treeData: TreeDataType[];
};

export const TreeSelect: FC<TreeSelectProps> = ({
	treeData = [],
	loading = false,
}) => {

	const [value, setValue] = useState(undefined)

	function onChange(value, ...rest) {
		console.log('onChange', value, rest);
		setValue(value)
	}


	function onSelect(value, ...args) {
		console.log('onSelect:', value, args);
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
				<div className="flex justify-center items-center h-full">
					<p>加载中...</p>
				</div>
			) : treeData.length === 0 ? (
				<div className="flex justify-center items-center h-full">
					<p>暂无数据</p>
				</div>
			) : (
				<RCTreeSelect
					getPopupContainer={triggerNode => triggerNode.parentNode}
					style={{ width: 300 }}
					transitionName="rc-tree-select-dropdown-slide-up"
					choiceTransitionName="rc-tree-select-selection__choice-zoom"
					dropdownStyle={{ maxHeight: 200, overflow: 'auto', zIndex: 1500 }}
					placeholder={'请下拉选择'}
					value={value}
					treeData={treeData}
					treeNodeFilterProp="label"
					filterTreeNode={true}
					onChange={onChange}
					onSelect={onSelect}
					showSearch={true}
					treeIcon={true}
					treeDefaultExpandAll={true}
					treeLine={true}
					switcherIcon={switcherIcon}
					dropdownMatchSelectWidth={false}
				>
				</RCTreeSelect>
			)}
		</div>
	</Fragment >);
}; 