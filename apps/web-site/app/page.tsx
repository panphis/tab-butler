import Link from "next/link"

import { PageRoutes } from "@/lib/pageroutes"
import { buttonVariants } from "@/components/ui/button"
import { Settings } from "@/lib/meta"

export default function Home() {
	return (
		<div className="min-h-[86.5vh] flex flex-col justify-center items-center text-center px-2 py-8 inset-0 -z-10 size-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
			<h1 className="text-4xl font-bold mb-4 sm:text-7xl">{Settings.title}</h1>
			<p className="max-w-[600px] text-foreground mb-8 sm:text-base">
				一个简单易用的谷歌浏览器 Tab 插件，提供书签搜索和管理功能。支持自定义搜索引擎和搜索参数，满足用户个性化需求。			</p>
			<div className="flex items-center gap-5">
				<Link
					href={`/docs${PageRoutes[0].href}`}
					className={buttonVariants({ className: "px-6", size: "lg" })}
				>
					开始使用
				</Link>
			</div>
		</div>
	)
}
