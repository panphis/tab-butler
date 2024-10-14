import { Fragment, type FC, useState } from "react";

import { Tree, Input } from "@repo/ui";
import "@repo/ui/dist/style.css";

import { useBookMarks } from "@repo/shared";
import { TreeNode } from "./";

import { Loading } from "./";


type BookmarksProps = {

};

export const Bookmarks: FC<BookmarksProps> = ({ }) => {

	const [queryStr, setQueryStr] = useState('')
	const { tree, loading, updateOrder } = useBookMarks(queryStr)
	const allowDrop = ({ dropNode, dropPosition }: any) => {
		return (dropNode.children && !dropNode.url) || dropPosition;
	};

	const onDrop = (info: any) => {
		const { node, dragNode, dropPosition, dropToGap } = info;
		const { id } = dragNode;
		const dropPos = info.node.pos.split('-');
		let index = info.dropPosition - Number(dropPos[dropPos.length - 1]);
		const parentId = dropToGap ? node.parentId : node.id;
		if (parentId === dragNode.parentId) {
			if (index >= dragNode.index) {
				index = dropPosition;
			}
		} else {
			index = info.dropPosition - Number(dropPos[dropPos.length - 1]);
		}
		const payload = {
			destination: {
				index,
				parentId,
			},
			id,
		};
		updateOrder(payload)
	};



	return (<Fragment>
		<Input onChange={e => setQueryStr(e.target.value)} />
		<Tree
			loading={loading}
			treeData={tree[0]?.children || []}
			rcTreeProps={{
				fieldNames: {
					key: 'id',
					title: 'title',
					children: 'children',
				},
				// ts-ignore
				titleRender: (node: any) => <TreeNode item={node} />
			}}
			draggable={true}
			allowDrop={allowDrop}
			onDrop={onDrop}
			loadingText={<Loading />}
		/>
	</Fragment>);
};