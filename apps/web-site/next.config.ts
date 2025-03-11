import type { NextConfig } from "next";



import nextra from 'nextra'




const withNextra = nextra({
	search: true,
	defaultShowCopyCode: true,
	// ... Other Nextra config options
})



// You can include other Next.js configuration options here, in addition to Nextra settings:
const nextConfig: NextConfig = {
	// ... Other Next.js config options
	/* config options here */
};
const nextConfigWithNextra = withNextra(nextConfig)


export default nextConfigWithNextra;
