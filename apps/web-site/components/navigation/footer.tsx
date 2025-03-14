import Image from "next/image"
import Link from "next/link"

import { Company, Settings } from "@/lib/meta"

export function Footer() {
	return (
		<footer className="w-full h-16 border-t">
			<div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-0 w-full h-full px-2 sm:py-0 py-3 sm:px-4 lg:px-8 text-sm text-muted-foreground">
				<p className="text-center">
					Copyright &copy; {new Date().getFullYear()}{" "}
					{Company?.link &&
						<Link className="font-semibold" href={Company.link}>
							{Company.name}
						</Link>}
				</p>
				{Company?.branding !== false && (
					<div className="text-center hidden md:block">
						<Link
							className="font-semibold"
							href={Company.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src={Settings.urlimage}
								alt="Logo"
								width={30}
								height={30}
							/>
						</Link>
					</div>
				)}
			</div>
		</footer>
	)
}
