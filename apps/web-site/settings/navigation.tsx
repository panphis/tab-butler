import { PageRoutes } from "@/lib/pageroutes"

export const Navigations = [
	{
		title: "文档",
		href: `/docs${PageRoutes[0].href}`,
	},
	{
		title: "下载",
		href: "/",
		external: true,
	},
]

export const GitHubLink = {
	href: "https://github.com/panphis/tab-butler",
}
