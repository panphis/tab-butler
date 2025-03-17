import { PageRoutes } from "@/lib/pageroutes"
import { github, downloadUrl } from "./settings"

export const Navigations = [
	{
		title: "文档",
		href: `/docs${PageRoutes[0].href}`,
	},
	{
		title: "下载",
		href: downloadUrl,
		external: true,
	},
]

export const GitHubLink = {
	href: github
}
