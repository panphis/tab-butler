import { Fragment, type FC, useMemo } from "react";

import { Tree } from "@repo/ui";
import { useBookMarks } from "@repo/shared";
import { formatBookmark } from "@/utils";

type BookmarksProps = {

};

export const Bookmarks: FC<BookmarksProps> = ({ }) => {

	const bookmarks = useBookMarks()
	console.log(bookmarks)
	const tree = useMemo(() => {
		const tree = formatBookmark(bookmarks)
		return tree
	}, [bookmarks])

	return (<Fragment>
		<Tree treeData={tree} />
	</Fragment>);
};