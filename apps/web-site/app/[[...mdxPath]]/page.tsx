import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: { params: { mdxPath: string[] } }) {
	const params = props.params
	const { metadata } = await importPage(params.mdxPath)
	return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props: { params: { mdxPath: string[] } }) {
	const params = props.params
	const result = await importPage(params.mdxPath)
	const { default: MDXContent, toc, metadata } = result
	return (
		<Wrapper toc={toc} metadata={metadata}>
			<MDXContent {...props} params={params} />
		</Wrapper>
	)
}