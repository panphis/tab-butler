import type { NextConfig } from "next/types"
import { basePath } from "./settings/settings"


const nextConfig: NextConfig = {
	output: "export",

	basePath,
	images: { unoptimized: true },
}

export default nextConfig
