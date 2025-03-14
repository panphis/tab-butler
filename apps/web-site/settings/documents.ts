import { Paths } from "@/lib/pageroutes"

export const Documents: Paths[] = [
	{
		title: "介绍",
		href: "/introduction",
		heading: "起步",
		items: [
			{
				title: "安装",
				heading: "安装",
				href: "/installation",
			},
			{
				title: "设置",
				heading: "设置",
				href: "/setting",
			},
			{
				title: "FAQ",
				heading: "FAQ",
				href: "/faq",
			},
			{
				title: "TODO",
				heading: "TODO",
				href: "/todo",
			},
			{
				title: "更新记录",
				heading: "更新记录",
				href: "/changelog",
			},
			{
				title: "隐私政策",
				heading: "隐私政策",
				href: "/privacy_policy",
			},
		],
	},
	{
		spacer: true,
	},
]
